#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { basename } from "node:path";

const DEMO_VALUES = [
  "陈砚舟",
  "沈亦楠",
  "chenyanzhou@example.com",
  "shenyinan@example.com",
  "138-****-7261",
  "137-****-4820",
  "chenyanzhou.dev",
  "yinanshen.design",
  "github.com/yanzhou-chen",
  "linkedin.com/in/yanzhouchen",
  "behance.net/yinan-shen",
  "星澜科技",
  "蓝鲸互娱",
  "云帆软件",
  "未山设计",
  "澜图科技",
  "llm-eval-kit",
  "城市呼吸",
  "野径",
];

const PLACEHOLDER_PATTERNS = [
  ["示例域名 example.com", /\bexample\.com\b/i],
  ["掩码星号", /\*{3,}|＊{3,}/],
  ["待补充标记", /\[待补充[^\]]*\]/],
  ["TODO 标记", /\bTODO\b/i],
  ["PLACEHOLDER 标记", /\bPLACEHOLDER\b/i],
];

function decodeHtml(value) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
  ).trim();
}

function parseAttributes(tag) {
  const attributes = {};
  const pattern = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const match of tag.matchAll(pattern)) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attributes;
}

function normalizePhone(value) {
  return value.replace(/\D/g, "");
}

function findMeta(html, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    if ((attributes.name ?? "").toLowerCase() === name) return attributes.content ?? "";
  }
  return null;
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => ({
    raw: match[0],
    attributes: parseAttributes(match[0]),
  }));
}

function hasClass(attributes, className) {
  return (attributes.class ?? "").split(/\s+/).includes(className);
}

function checkContract(html) {
  const errors = [];
  const articleResumes = tags(html, "article").filter((tag) => hasClass(tag.attributes, "resume"));
  if (articleResumes.length !== 1) errors.push(`必须恰好存在一个 article.resume，当前为 ${articleResumes.length} 个。`);

  const requiredClasses = ["r-header", "r-name", "r-title", "r-contacts"];
  const allTags = [...html.matchAll(/<[a-z][^>]*>/gi)].map((match) => parseAttributes(match[0]));
  for (const className of requiredClasses) {
    if (!allTags.some((attributes) => hasClass(attributes, className))) errors.push(`缺少语义 class .${className}。`);
  }

  const sectionTags = tags(html, "section");
  const semanticSections = sectionTags.filter((tag) => hasClass(tag.attributes, "r-section"));
  for (const section of semanticSections) {
    if (!section.attributes["data-section"]) errors.push("存在缺少 data-section 的 section.r-section。");
  }
  const sectionNames = new Set(semanticSections.map((section) => section.attributes["data-section"]).filter(Boolean));
  for (const required of ["summary", "experience", "skills", "education"]) {
    if (!sectionNames.has(required)) errors.push(`缺少核心 data-section="${required}"。`);
  }

  if (allTags.some((attributes) => Object.hasOwn(attributes, "style"))) errors.push("存在 style= 内联样式。");
  if (/<script\b/i.test(html)) errors.push("存在 <script>；简历 HTML 不允许 JavaScript。");
  if (/<link\b[^>]*\brel\s*=\s*["']?stylesheet/i.test(html)) errors.push("存在外部 stylesheet link。");
  if (/@import\b/i.test(html)) errors.push("CSS 中存在 @import。");
  if (!/@page\b[\s\S]*?size\s*:\s*a4/i.test(html)) errors.push("缺少 @page A4 声明。");
  if (!/@media\s+print\b/i.test(html)) errors.push("缺少 @media print。");

  for (const match of html.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
    const value = match[2].trim();
    if (value && !value.startsWith("data:") && !value.startsWith("#")) errors.push(`CSS 包含非内嵌资源：url(${value.slice(0, 120)})。`);
  }

  for (const tagName of ["img", "source", "audio", "video", "iframe", "embed", "object"]) {
    for (const tag of tags(html, tagName)) {
      for (const attribute of ["src", "poster", "data"]) {
        const value = tag.attributes[attribute];
        if (value && !value.startsWith("data:")) errors.push(`<${tagName}> 的 ${attribute} 不是 data: 内嵌资源。`);
      }
    }
  }
  for (const link of tags(html, "link")) {
    const href = link.attributes.href ?? "";
    if (href && !href.startsWith("data:")) errors.push(`<link> 资源不是 data: 内嵌资源：${href}。`);
  }

  return [...new Set(errors)];
}

function checkHtml(html, options) {
  const errors = checkContract(html);
  const warnings = [];
  const text = visibleText(html);
  const lowerHtml = html.toLowerCase();
  const fileName = basename(options.fileName ?? "");

  const htmlTag = html.match(/<html\b[^>]*>/i);
  const lang = htmlTag ? parseAttributes(htmlTag[0]).lang : null;
  if (!lang) errors.push("缺少 <html lang>。");

  const title = decodeHtml(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  if (!title) {
    errors.push("缺少 <title>。");
  } else {
    if (!title.includes(options.name)) errors.push(`<title> 未包含姓名“${options.name}”。`);
    if (options.role && !title.includes(options.role)) errors.push(`<title> 未包含意向岗位“${options.role}”。`);
  }

  const author = findMeta(html, "author");
  const description = findMeta(html, "description");
  if (author === null) errors.push('缺少 <meta name="author">。');
  else if (author.trim() !== options.name) errors.push(`author 不是姓名“${options.name}”。`);
  if (description === null) errors.push('缺少 <meta name="description">。');
  else {
    if (!description.includes(options.name)) errors.push("description 未包含候选人姓名。");
    if (options.role && !description.includes(options.role)) errors.push("description 未包含意向岗位。");
  }

  if (!text.includes(options.name)) errors.push(`页面正文未包含姓名“${options.name}”。`);
  if (fileName && !fileName.includes(options.name)) errors.push(`文件名未包含姓名“${options.name}”。`);
  if (options.role && fileName && !fileName.includes(options.role)) errors.push(`文件名未包含意向岗位“${options.role}”。`);
  if (fileName && !fileName.includes("简历")) errors.push("文件名未包含“简历”。");
  if (options.style && fileName && !fileName.includes(options.style)) errors.push(`文件名未包含风格名“${options.style}”。`);

  const expectedValues = [options.name, options.email, options.phone].filter(Boolean).map((value) => value.toLowerCase());
  for (const value of DEMO_VALUES) {
    if (expectedValues.includes(value.toLowerCase())) continue;
    if (lowerHtml.includes(value.toLowerCase())) errors.push(`发现皮肤示例残留：“${value}”。`);
  }

  for (const [label, pattern] of PLACEHOLDER_PATTERNS) {
    if (!pattern.test(html)) continue;
    const message = `发现${label}。`;
    if (options.allowPlaceholders) warnings.push(message);
    else errors.push(message);
  }

  if (options.email) {
    if (!lowerHtml.includes(options.email.toLowerCase())) errors.push(`未找到邮箱“${options.email}”。`);
  }
  if (options.phone) {
    const expectedPhone = normalizePhone(options.phone);
    if (!normalizePhone(text).includes(expectedPhone)) errors.push(`未找到手机号“${options.phone}”。`);
  }

  for (const match of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)) {
    const attributes = parseAttributes(match[0]);
    const href = (attributes.href ?? "").trim();
    const linkText = visibleText(match[1]);
    if (!href || href === "#" || /^javascript:/i.test(href)) {
      errors.push(`无效链接：“${linkText || "无文本"}” → “${href || "空"}”。`);
      continue;
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(linkText)) {
      const expectedHref = `mailto:${linkText}`.toLowerCase();
      if (href.toLowerCase() !== expectedHref) errors.push(`邮箱链接与显示文本不一致：“${linkText}” → “${href}”。`);
    }
    if (/^(?:https?:\/\/|www\.)/i.test(linkText) && !/^https?:\/\//i.test(href)) {
      errors.push(`网站链接不是 http(s) 地址：“${linkText}” → “${href}”。`);
    }
  }

  return { errors: [...new Set(errors)], warnings: [...new Set(warnings)] };
}

function parseCli(argv) {
  if (argv.includes("--self-test")) return { selfTest: true };
  const fileName = argv[0];
  const options = { fileName, allowPlaceholders: false, contractOnly: false };
  for (let index = 1; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--contract-only") {
      options.contractOnly = true;
      continue;
    }
    if (argument === "--allow-placeholders") {
      options.allowPlaceholders = true;
      continue;
    }
    if (["--name", "--role", "--style", "--email", "--phone"].includes(argument)) {
      const value = argv[index + 1];
      if (!value) throw new Error(`${argument} 缺少值。`);
      options[argument.slice(2)] = value;
      index += 1;
      continue;
    }
    throw new Error(`未知参数：${argument}`);
  }
  if (!fileName || (!options.contractOnly && (!options.name || !options.role || !options.style))) throw new Error("用法：check-output.mjs <HTML> --name <姓名> --role <岗位> --style <风格名> [--email <邮箱>] [--phone <手机>] [--allow-placeholders]；或 check-output.mjs <HTML> --contract-only");
  return options;
}

function selfTest() {
  const valid = `<!doctype html><html lang="zh-CN"><head><title>李明 · 产品经理 · 简历</title><meta name="author" content="李明"><meta name="description" content="李明 · 产品经理简历"><style>@page{size:A4;margin:0}@media print{body{margin:0}}</style></head><body><article class="resume"><header class="r-header"><h1 class="r-name">李明</h1><p class="r-title">产品经理</p><ul class="r-contacts"><li><a href="mailto:li@example.cn">li@example.cn</a></li><li>13800138000</li></ul></header><section class="r-section" data-section="summary">职业摘要</section><section class="r-section" data-section="experience">工作经历</section><section class="r-section" data-section="skills">专业技能</section><section class="r-section" data-section="education">教育背景</section><a href="https://liming.cn">https://liming.cn</a></article></body></html>`;
  const validResult = checkHtml(valid, { fileName: "李明-产品经理-简历-互联网简洁.html", name: "李明", role: "产品经理", style: "互联网简洁", email: "li@example.cn", phone: "13800138000", allowPlaceholders: false });
  if (validResult.errors.length) throw new Error(`有效样例未通过：${validResult.errors.join("；")}`);
  const wrongStyleResult = checkHtml(valid, { fileName: "李明-产品经理-简历-经典纸质.html", name: "李明", role: "产品经理", style: "互联网简洁", allowPlaceholders: false });
  if (!wrongStyleResult.errors.some((error) => error.includes("风格名"))) throw new Error("文件名风格检查没有拦截错误风格名。");

  const masked = valid.replace("13800138000", "138****8000");
  const strictMaskedResult = checkHtml(masked, { fileName: "李明-产品经理-简历-互联网简洁.html", name: "李明", role: "产品经理", email: "li@example.cn", allowPlaceholders: false });
  if (!strictMaskedResult.errors.some((error) => error.includes("掩码星号"))) throw new Error("严格模式没有拒绝脱敏占位符。");
  const allowedMaskedResult = checkHtml(masked, { fileName: "李明-产品经理-简历-互联网简洁.html", name: "李明", role: "产品经理", email: "li@example.cn", allowPlaceholders: true });
  if (allowedMaskedResult.errors.length || !allowedMaskedResult.warnings.length) throw new Error("允许占位符模式的错误/警告行为不正确。");

  const invalid = `<!doctype html><html><head><title>陈砚舟 · 简历</title><link rel="stylesheet" href="https://example.com/resume.css"></head><body><h1 style="color:red">张华</h1><a href="#">chenyanzhou@example.com</a><p>星澜科技 TODO</p><script>alert(1)</script></body></html>`;
  const invalidResult = checkHtml(invalid, { fileName: "resume.html", name: "张华", role: "研发工程师", allowPlaceholders: false });
  if (invalidResult.errors.length < 5) throw new Error("无效样例没有触发足够的检查项。");
  const allowedInvalidResult = checkHtml(invalid, { fileName: "resume.html", name: "张华", role: "研发工程师", allowPlaceholders: true });
  if (!allowedInvalidResult.errors.some((error) => error.includes("皮肤示例残留"))) throw new Error("允许占位符模式错误地放过了皮肤示例残留。");
  console.log(`Self-test passed: ${invalidResult.errors.length} invalid conditions detected.`);
}

try {
  const options = parseCli(process.argv.slice(2));
  if (options.selfTest) {
    selfTest();
    process.exit(0);
  }
  const html = readFileSync(options.fileName, "utf8");
  const result = options.contractOnly ? { errors: checkContract(html), warnings: [] } : checkHtml(html, options);
  for (const warning of result.warnings) console.warn(`[WARN] ${warning}`);
  for (const error of result.errors) console.error(`[ERROR] ${error}`);
  if (result.errors.length) {
    console.error(`Content check failed: ${result.errors.length} error(s).`);
    process.exit(1);
  }
  console.log(`${options.contractOnly ? "Contract" : "Content"} check passed: ${options.fileName}`);
} catch (error) {
  console.error(`[ERROR] ${error.message}`);
  process.exit(1);
}
