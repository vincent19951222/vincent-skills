#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;
const A4_WIDTH_CSS_PX = 210 / 25.4 * 96;
const A4_HEIGHT_CSS_PX = 297 / 25.4 * 96;
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

function run(command, args, options = {}) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", rejectPromise);
    child.on("close", (code) => {
      const result = { code, stdout, stderr };
      if (code === 0 || options.allowFailure) resolvePromise(result);
      else rejectPromise(new Error(`${command} ${args.join(" ")} failed (${code})\n${stderr || stdout}`));
    });
  });
}

async function requireCommand(command, installHint, versionArgs = ["--version"]) {
  const result = await run(command, versionArgs, { allowFailure: true });
  if (result.code !== 0) throw new Error(`缺少命令 ${command}。${installHint}`);
}

function parseArguments(argv) {
  const options = {
    html: argv[0],
    allowPlaceholders: false,
    skipContentCheck: false,
  };
  for (let index = 1; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--allow-placeholders") {
      options.allowPlaceholders = true;
      continue;
    }
    if (argument === "--skip-content-check") {
      options.skipContentCheck = true;
      continue;
    }
    if (["--pdf", "--preview", "--name", "--role", "--style", "--email", "--phone"].includes(argument)) {
      const value = argv[index + 1];
      if (!value) throw new Error(`${argument} 缺少值。`);
      options[argument.slice(2)] = value;
      index += 1;
      continue;
    }
    throw new Error(`未知参数：${argument}`);
  }
  if (!options.html || !options.pdf) {
    throw new Error("用法：validate-layout.mjs <HTML> --pdf <PDF> --name <姓名> --role <岗位> --style <风格名> [--email <邮箱>] [--phone <手机>] [--preview <PNG>] [--allow-placeholders] [--skip-content-check]");
  }
  if (!options.skipContentCheck && (!options.name || !options.role || !options.style)) throw new Error("运行成品检查时必须提供 --name、--role 和 --style；仅验证皮肤布局可使用 --skip-content-check。");
  options.html = resolve(options.html);
  options.pdf = resolve(options.pdf);
  if (options.preview) options.preview = resolve(options.preview);
  if (!existsSync(options.html) || extname(options.html).toLowerCase() !== ".html") throw new Error(`HTML 文件不存在或扩展名不正确：${options.html}`);
  if (basename(options.html, extname(options.html)) !== basename(options.pdf, extname(options.pdf))) {
    throw new Error("HTML 与 PDF 必须使用相同基名。");
  }
  if (!options.skipContentCheck && dirname(options.html) !== dirname(options.pdf)) throw new Error("最终 HTML 与 PDF 必须位于同一目录。");
  return options;
}

function parseRawResult(stdout) {
  const trimmed = stdout.trim();
  const candidates = [trimmed, ...trimmed.split("\n").reverse()];
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      return typeof parsed === "string" ? JSON.parse(parsed) : parsed;
    } catch {
      // Try the next candidate.
    }
  }
  throw new Error(`无法解析 Playwright 指标：${trimmed.slice(-1000)}`);
}

function createHtmlServer(html) {
  const server = createServer((request, response) => {
    if (request.url === "/resume.html") {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      response.end(html);
      return;
    }
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  });
  return new Promise((resolvePromise, rejectPromise) => {
    server.once("error", rejectPromise);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolvePromise({ server, url: `http://127.0.0.1:${address.port}/resume.html` });
    });
  });
}

async function runContentCheck(options) {
  if (options.skipContentCheck) return;
  const args = [join(SCRIPT_DIR, "check-output.mjs"), options.html, "--name", options.name];
  for (const key of ["role", "style", "email", "phone"]) {
    if (options[key]) args.push(`--${key}`, options[key]);
  }
  if (options.allowPlaceholders) args.push("--allow-placeholders");
  const result = await run(process.execPath, args);
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
}

function buildBrowserCode(pdfPath) {
  return `async page => {
    await page.setViewportSize({ width: 794, height: 1123 });
    await page.emulateMedia({ media: "print" });
    let fontTimedOut = false;
    await Promise.race([
      page.evaluate(() => document.fonts.ready),
      page.waitForTimeout(10000).then(() => { fontTimedOut = true; })
    ]);
    const metrics = await page.evaluate(() => {
      const resume = document.querySelector(".resume");
      const resumeRect = resume?.getBoundingClientRect();
      const contentBlocks = [...document.querySelectorAll(".r-header,[data-section]")];
      const contentBottom = contentBlocks.length ? Math.max(...contentBlocks.map(element => element.getBoundingClientRect().bottom)) : 0;
      const contentFillPct = resumeRect?.height ? Math.round((contentBottom - resumeRect.top) / resumeRect.height * 1000) / 10 : 0;
      const criticalSelector = ".resume,.r-section,.r-job,.r-project,.r-summary,.r-bullets";
      const criticalOverflow = [...document.querySelectorAll(criticalSelector)].flatMap(element => {
        const style = getComputedStyle(element);
        const vertical = ["hidden", "clip"].includes(style.overflowY) && element.scrollHeight > element.clientHeight + 2;
        const horizontal = ["hidden", "clip"].includes(style.overflowX) && element.scrollWidth > element.clientWidth + 2;
        if (!vertical && !horizontal) return [];
        return [{ tag: element.tagName.toLowerCase(), className: element.className, vertical, horizontal }];
      });
      const outOfResume = resumeRect ? [...document.querySelectorAll(".r-header,[data-section]")].flatMap(element => {
        const rect = element.getBoundingClientRect();
        const outside = rect.left < resumeRect.left - 2 || rect.right > resumeRect.right + 2 || rect.top < resumeRect.top - 2 || rect.bottom > resumeRect.bottom + 2;
        return outside ? [{ tag: element.tagName.toLowerCase(), section: element.getAttribute("data-section"), className: element.className }] : [];
      }) : [];
      const fontFaces = [];
      document.fonts.forEach(face => fontFaces.push({ family: face.family, status: face.status }));
      const pageRules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.cssText.trim().toLowerCase().startsWith("@page")) pageRules.push(rule.cssText);
          }
        } catch {}
      }
      return {
        url: location.href,
        bodyTextLength: document.body.innerText.trim().length,
        name: document.querySelector(".r-name")?.textContent.trim() ?? "",
        hasResume: Boolean(resume),
        bodyScrollHeight: document.body.scrollHeight,
        bodyScrollWidth: document.body.scrollWidth,
        documentScrollHeight: document.documentElement.scrollHeight,
        documentScrollWidth: document.documentElement.scrollWidth,
        contentFillPct,
        criticalOverflow,
        outOfResume,
        pageRules,
        fontStatus: document.fonts.status,
        fontFaces,
      };
    });
    await page.pdf({ path: ${JSON.stringify(pdfPath)}, format: "A4", printBackground: true, preferCSSPageSize: false, margin: { top: "0", right: "0", bottom: "0", left: "0" } });
    return { ...metrics, fontTimedOut };
  }`;
}

function validateBrowserMetrics(metrics, options) {
  const errors = [];
  if (!metrics.url?.startsWith("http://127.0.0.1:")) errors.push("浏览器没有加载本地 HTTP 页面。");
  if (!metrics.hasResume) errors.push("页面缺少 .resume 根元素。");
  if (!metrics.name) errors.push("页面缺少非空 .r-name。");
  if (options.name && !metrics.name.includes(options.name)) errors.push(`页面姓名“${metrics.name}”与预期“${options.name}”不一致。`);
  if (metrics.bodyTextLength < 50) errors.push(`正文文本过短（${metrics.bodyTextLength}），可能打印了空白页。`);
  if (metrics.contentFillPct < 85) errors.push(`内容填充率仅 ${metrics.contentFillPct}%，必须达到至少 85%。`);
  if (!metrics.pageRules.some((rule) => /size\s*:\s*a4/i.test(rule))) errors.push("CSS @page 未声明 A4。");
  if (metrics.fontTimedOut) errors.push("等待 document.fonts.ready 超时。");
  if (metrics.fontStatus !== "loaded") errors.push(`document.fonts.status=${metrics.fontStatus}。`);
  const failedFonts = metrics.fontFaces.filter((face) => face.status !== "loaded");
  if (failedFonts.length) errors.push(`字体未加载：${failedFonts.map((face) => `${face.family}(${face.status})`).join(", ")}。`);
  if (metrics.bodyScrollHeight > A4_HEIGHT_CSS_PX + 4 || metrics.documentScrollHeight > A4_HEIGHT_CSS_PX + 4) {
    errors.push(`页面纵向超过 A4：body=${metrics.bodyScrollHeight}px, document=${metrics.documentScrollHeight}px。`);
  }
  if (metrics.bodyScrollWidth > A4_WIDTH_CSS_PX + 4 || metrics.documentScrollWidth > A4_WIDTH_CSS_PX + 4) {
    errors.push(`页面横向超过 A4：body=${metrics.bodyScrollWidth}px, document=${metrics.documentScrollWidth}px。`);
  }
  if (metrics.criticalOverflow.length) errors.push(`关键容器可能被裁切：${JSON.stringify(metrics.criticalOverflow)}。`);
  if (metrics.outOfResume.length) errors.push(`header/section 超出 .resume：${JSON.stringify(metrics.outOfResume)}。`);
  if (errors.length) throw new Error(`浏览器布局检查失败：\n- ${errors.join("\n- ")}`);
}

function parsePdfInfo(output) {
  const pages = Number(output.match(/^Pages:\s+(\d+)/m)?.[1] ?? NaN);
  const pageSize = output.match(/^Page size:\s+([\d.]+) x ([\d.]+) pts/m);
  return {
    pages,
    width: Number(pageSize?.[1] ?? NaN),
    height: Number(pageSize?.[2] ?? NaN),
  };
}

async function validatePdf(options) {
  const infoResult = await run("pdfinfo", [options.pdf]);
  const info = parsePdfInfo(infoResult.stdout);
  const errors = [];
  if (info.pages !== 1) errors.push(`PDF 页数为 ${info.pages}，必须为 1。`);
  if (!Number.isFinite(info.width) || !Number.isFinite(info.height)) errors.push("无法读取 PDF 页面尺寸。");
  else if (Math.abs(info.width - A4_WIDTH_PT) > 3 || Math.abs(info.height - A4_HEIGHT_PT) > 3) {
    errors.push(`PDF 尺寸为 ${info.width} × ${info.height} pt，不是 A4 纵向。`);
  }
  const textResult = await run("pdftotext", [options.pdf, "-"]);
  const pdfText = textResult.stdout.replace(/\s+/g, " ").trim();
  if (pdfText.length < 30) errors.push(`PDF 可提取文本过短（${pdfText.length}），可能为空白或不可访问。`);
  if (options.name && !pdfText.includes(options.name)) errors.push(`PDF 可提取文本中没有姓名“${options.name}”。`);
  if (errors.length) throw new Error(`PDF 检查失败：\n- ${errors.join("\n- ")}`);
  return { ...info, textLength: pdfText.length };
}

async function renderPreview(options) {
  if (!options.preview) return null;
  const prefix = options.preview.toLowerCase().endsWith(".png") ? options.preview.slice(0, -4) : options.preview;
  await run("pdftoppm", ["-png", "-f", "1", "-singlefile", "-r", "144", options.pdf, prefix]);
  return `${prefix}.png`;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  await requireCommand("npx", "请安装 Node.js/npm。");
  await requireCommand("pdfinfo", "请安装 Poppler。", ["-v"]);
  await requireCommand("pdftotext", "请安装 Poppler。", ["-v"]);
  if (options.preview) await requireCommand("pdftoppm", "请安装 Poppler。", ["-v"]);
  await runContentCheck(options);

  const html = readFileSync(options.html, "utf8");
  const tempDirectory = mkdtempSync(join(tmpdir(), "resume-layout-"));
  const session = `resume-layout-${process.pid}-${Date.now()}`;
  const cli = ["--yes", "playwright", "cli", `-s=${session}`];
  const { server, url } = await createHtmlServer(html);
  let opened = false;
  try {
    const openResult = await run("npx", [...cli, "open", url], { cwd: tempDirectory, allowFailure: true });
    if (openResult.code !== 0) {
      throw new Error(`Playwright 浏览器启动失败。可先运行 npx playwright install chromium。\n${openResult.stderr || openResult.stdout}`);
    }
    opened = true;
    const code = buildBrowserCode(options.pdf);
    const metricsResult = await run("npx", [...cli, "run-code", code, "--raw"], { cwd: tempDirectory });
    const metrics = parseRawResult(metricsResult.stdout);
    validateBrowserMetrics(metrics, options);
    const pdf = await validatePdf(options);
    const preview = await renderPreview(options);
    console.log(`Layout check passed: ${basename(options.html)}`);
    console.log(`PDF: ${options.pdf}`);
    console.log(`Page: ${pdf.pages} × A4 (${pdf.width} × ${pdf.height} pt)`);
    console.log(`Text: ${pdf.textLength} extracted characters`);
    console.log(`Fill: ${metrics.contentFillPct}% of .resume height`);
    console.log(`Fonts: ${metrics.fontFaces.length || "system-only"} declared face(s), all loaded`);
    if (preview) console.log(`Preview: ${preview}`);
  } finally {
    if (opened) await run("npx", [...cli, "close"], { cwd: tempDirectory, allowFailure: true });
    await new Promise((resolvePromise) => server.close(resolvePromise));
    rmSync(tempDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`[ERROR] ${error.message}`);
  process.exit(1);
});
