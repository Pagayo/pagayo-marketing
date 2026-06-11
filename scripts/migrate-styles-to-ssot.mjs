#!/usr/bin/env node
/**
 * One-time migration: extract <style> blocks from .astro files into src/styles/partials/
 * and remove inline styles from components/pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const PARTIALS_DIR = path.join(SRC, 'styles', 'partials');
const STYLE_TAG_RE = /<style(?:\s[^>]*)?>([\s\S]*?)<\/style>\s*/g;

function walkAstroFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAstroFiles(full, acc);
    } else if (entry.name.endsWith('.astro')) {
      acc.push(full);
    }
  }
  return acc;
}

function toPartialPath(astroPath) {
  const rel = path.relative(SRC, astroPath).replace(/\\/g, '/');
  return path.join(PARTIALS_DIR, rel.replace(/\.astro$/, '.css'));
}

function extractStyles(content) {
  const blocks = [];
  let match;
  while ((match = STYLE_TAG_RE.exec(content)) !== null) {
    blocks.push(match[1].trim());
  }
  return blocks;
}

function stripStyles(content) {
  return content.replace(STYLE_TAG_RE, '').trimEnd() + '\n';
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

const astroFiles = walkAstroFiles(SRC);
const importPaths = [];

for (const astroPath of astroFiles) {
  const original = fs.readFileSync(astroPath, 'utf8');
  const blocks = extractStyles(original);
  if (blocks.length === 0) continue;

  const partialPath = toPartialPath(astroPath);
  const relFromStyles = path.relative(path.join(SRC, 'styles'), partialPath).replace(/\\/g, '/');
  const sourceRel = path.relative(SRC, astroPath).replace(/\\/g, '/');

  const header = `/* SSoT partial — migrated from src/${sourceRel} */\n`;
  const body = blocks.join('\n\n');
  ensureDir(partialPath);
  fs.writeFileSync(partialPath, header + body + '\n', 'utf8');
  importPaths.push(relFromStyles);

  const stripped = stripStyles(original);
  fs.writeFileSync(astroPath, stripped, 'utf8');
}

importPaths.sort();

const manifestLines = [
  '/*',
  ' * Pagayo marketing — component & page style partials.',
  ' * Do not add <style> blocks to .astro files; edit the matching file here.',
  ' * Regenerate listing after adding a new partial (see scripts/migrate-styles-to-ssot.mjs).',
  ' */',
  '',
  ...importPaths.map((p) => `@import './${p}';`),
  '',
];

fs.mkdirSync(PARTIALS_DIR, { recursive: true });
fs.writeFileSync(path.join(SRC, 'styles', 'partials.css'), manifestLines.join('\n'), 'utf8');

console.log(`Migrated ${importPaths.length} style blocks into src/styles/partials/`);
