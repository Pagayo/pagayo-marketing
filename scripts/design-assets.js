#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MARKETING_ROOT = path.resolve(__dirname, '..');
const PACKAGE_START_CSS = path.join(
  MARKETING_ROOT,
  'node_modules',
  '@pagayo',
  'design',
  'dist',
  'fresh',
  'start.css'
);
const MARKETING_START_CSS = path.join(MARKETING_ROOT, 'src', 'styles', 'pagayo-design.css');

function log(message) {
  process.stdout.write(`${message}\n`);
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function readFileOrFail(filePath, missingMessage) {
  if (!fs.existsSync(filePath)) {
    fail(missingMessage);
  }

  return fs.readFileSync(filePath);
}

function getPackageCss() {
  return readFileOrFail(
    PACKAGE_START_CSS,
    [
      '[design-assets] Kan @pagayo/design start.css niet vinden in node_modules.',
      'Run: npm install',
    ].join('\n')
  );
}

function getMarketingCss() {
  return readFileOrFail(
    MARKETING_START_CSS,
    [
      '[design-assets] Kan src/styles/pagayo-design.css niet vinden.',
      'Controleer de marketing design asset en run eventueel: npm run design:sync',
    ].join('\n')
  );
}

function check() {
  const packageCss = getPackageCss();
  const marketingCss = getMarketingCss();

  if (!packageCss.equals(marketingCss)) {
    fail(
      [
        '[design-assets] Marketing CSS-kopie is niet in sync met @pagayo/design.',
        'Canonieke bron: node_modules/@pagayo/design/dist/fresh/start.css',
        'Run: npm run design:sync',
      ].join('\n')
    );
  }

  log('[design-assets] Marketing design asset check geslaagd.');
}

function sync() {
  const packageCss = getPackageCss();
  fs.writeFileSync(MARKETING_START_CSS, packageCss);
  log('[design-assets] Marketing design asset gesynchroniseerd vanuit @pagayo/design.');
}

const command = process.argv[2] || 'check';

if (command === 'check') {
  check();
} else if (command === 'sync') {
  sync();
} else {
  fail(`Onbekend commando: ${command}. Gebruik 'check' of 'sync'.`);
}
