#!/usr/bin/env node
/** Merge all partial CSS files into global.css (single SSoT file). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const STYLES = path.join(ROOT, 'src', 'styles');
const GLOBAL = path.join(STYLES, 'global.css');
const PARTIALS_MANIFEST = path.join(STYLES, 'partials.css');
const PARTIALS_DIR = path.join(STYLES, 'partials');

if (!fs.existsSync(PARTIALS_MANIFEST)) {
  console.log('No partials.css — nothing to consolidate.');
  process.exit(0);
}

const imports = fs
  .readFileSync(PARTIALS_MANIFEST, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.startsWith("@import './partials/"))
  .map((line) => line.replace("@import './", '').replace("';", ''));

let globalContent = fs.readFileSync(GLOBAL, 'utf8').trimEnd();
globalContent += '\n\n/* =========================================================\n   COMPONENT & PAGE STYLES (SSoT — do not use <style> in .astro)\n   ========================================================= */\n';

for (const rel of imports) {
  const filePath = path.join(STYLES, rel);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skip missing: ${rel}`);
    continue;
  }
  const body = fs.readFileSync(filePath, 'utf8').trim();
  globalContent += `\n/* --- ${rel} --- */\n${body}\n`;
}

fs.writeFileSync(GLOBAL, globalContent + '\n', 'utf8');

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) rmDir(full);
    else fs.unlinkSync(full);
  }
  fs.rmSync(dir, { recursive: true });
}

rmDir(PARTIALS_DIR);
fs.unlinkSync(PARTIALS_MANIFEST);

const siteCss = '/* Pagayo marketing — single CSS entry (SSoT) */\n@import \'./global.css\';\n';
fs.writeFileSync(path.join(STYLES, 'site.css'), siteCss, 'utf8');

console.log(`Consolidated ${imports.length} partials into global.css`);
