#!/usr/bin/env node
/**
 * Ensures nl.json (and optionally de.json) contain every key from en.json.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const i18nDir = join(root, 'src/content/i18n');

function collectKeys(obj, prefix = '') {
  const keys = [];
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return keys;
  }
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...collectKeys(value, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

function missingKeys(source, target, prefix = '') {
  const missing = [];
  if (source === null || typeof source !== 'object' || Array.isArray(source)) {
    return missing;
  }
  for (const [key, value] of Object.entries(source)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (!(key in target)) {
      missing.push(path);
      continue;
    }
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      missing.push(...missingKeys(value, target[key], path));
    }
  }
  return missing;
}

const en = JSON.parse(readFileSync(join(i18nDir, 'en.json'), 'utf8'));
const nl = JSON.parse(readFileSync(join(i18nDir, 'nl.json'), 'utf8'));
const de = JSON.parse(readFileSync(join(i18nDir, 'de.json'), 'utf8'));

const enKeys = collectKeys(en);
const nlMissing = missingKeys(en, nl);
const deMissing = missingKeys(en, de);

let failed = false;

console.log(`i18n parity: ${enKeys.length} keys in en.json`);

if (nlMissing.length > 0) {
  failed = true;
  console.error(`\n❌ nl.json missing ${nlMissing.length} key(s):`);
  nlMissing.slice(0, 30).forEach((k) => console.error(`  - ${k}`));
  if (nlMissing.length > 30) console.error(`  … and ${nlMissing.length - 30} more`);
} else {
  console.log('✅ nl.json key parity OK');
}

if (deMissing.length > 0) {
  console.warn(`\n⚠️  de.json missing ${deMissing.length} key(s) (warn-only until DE phase)`);
  deMissing.slice(0, 10).forEach((k) => console.warn(`  - ${k}`));
  if (deMissing.length > 10) console.warn(`  … and ${deMissing.length - 10} more`);
} else {
  console.log('✅ de.json key parity OK');
}

if (failed) process.exit(1);
