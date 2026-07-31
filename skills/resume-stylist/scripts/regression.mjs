#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SKILL_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const SCRIPTS_DIR = join(SKILL_DIR, "scripts");
const SKINS_DIR = join(SKILL_DIR, "skins");

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}.`);
  }
}

const skins = readdirSync(SKINS_DIR)
  .filter((file) => file.endsWith(".html"))
  .sort()
  .map((file) => join(SKINS_DIR, file));

if (skins.length !== 10) {
  throw new Error(`Expected 10 resume skins, found ${skins.length}.`);
}

const outputDirectory = mkdtempSync(join(tmpdir(), "resume-regression-"));

try {
  run(process.execPath, [join(SCRIPTS_DIR, "check-output.mjs"), "--self-test"]);

  for (const skin of skins) {
    run(process.execPath, [join(SCRIPTS_DIR, "check-output.mjs"), skin, "--contract-only"]);
  }

  for (const skin of skins) {
    const outputPdf = join(outputDirectory, basename(skin, ".html") + ".pdf");
    run(process.execPath, [
      join(SCRIPTS_DIR, "validate-layout.mjs"),
      skin,
      "--pdf",
      outputPdf,
      "--skip-content-check",
    ]);
  }

  console.log(`Release regression passed: ${skins.length} skins, contracts and single-page A4 PDFs verified.`);
} finally {
  rmSync(outputDirectory, { recursive: true, force: true });
}
