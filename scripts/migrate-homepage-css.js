#!/usr/bin/env node
/**
 * Migratie script: Homepage inline styles → shared CSS
 *
 * Dit script:
 * 1. Vindt alle index.astro homepage bestanden
 * 2. Voegt CSS import toe aan frontmatter
 * 3. Verwijdert inline <style> blocks
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '../src/pages');

// Vind alle homepage index.astro bestanden
function findHomepages(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findHomepages(fullPath, files);
    } else if (item === 'index.astro') {
      // Alleen homepages in land-mappen (bijv. eu/nl, am/sv)
      const relativePath = path.relative(pagesDir, fullPath);
      const parts = relativePath.split(path.sep);

      // Skip root index.astro, alleen regionale homepages
      if (parts.length === 3) {
        // region/country/index.astro
        files.push(fullPath);
      }
    }
  }

  return files;
}

// Bereken CSS import path op basis van directory depth
function getCssImportPath(filePath) {
  const relativePath = path.relative(pagesDir, filePath);
  const depth = relativePath.split(path.sep).length; // Aantal directory levels + bestand
  const prefix = '../'.repeat(depth); // Alle levels omhoog naar src/
  return `${prefix}styles/pages/home.css`;
}

// Migreer een homepage bestand
function migrateHomepage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(pagesDir, filePath);

  // Check of het bestand al gemigreerd is
  if (content.includes("import '../") && content.includes('styles/pages/home.css')) {
    console.log(`⏭️  Skip (al gemigreerd): ${relativePath}`);
    return { status: 'skipped', path: relativePath };
  }

  // Check of er een style block is om te verwijderen
  if (!content.includes('<style>')) {
    console.log(`⏭️  Skip (geen inline styles): ${relativePath}`);
    return { status: 'skipped', path: relativePath };
  }

  // 1. Voeg CSS import toe aan frontmatter
  const cssImportPath = getCssImportPath(filePath);
  const importStatement = `import '${cssImportPath}';`;

  // Vind einde van imports in frontmatter (na laatste import statement)

  // Zoek de frontmatter sectie
  let newContent;
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log(`❌ Geen frontmatter gevonden: ${relativePath}`);
    return { status: 'error', path: relativePath, reason: 'no frontmatter' };
  }

  const frontmatter = frontmatterMatch[1];

  // Voeg import toe na laatste import statement of aan einde van frontmatter
  const lastImportIndex = frontmatter.lastIndexOf('import ');
  if (lastImportIndex !== -1) {
    // Vind einde van laatste import regel
    const afterImport = frontmatter.indexOf('\n', lastImportIndex);
    const insertPos = afterImport !== -1 ? afterImport : frontmatter.length;

    const updatedFrontmatter =
      frontmatter.slice(0, insertPos) + '\n' + importStatement + frontmatter.slice(insertPos);

    newContent = content.replace(frontmatterMatch[1], updatedFrontmatter);
  } else {
    // Geen imports, voeg toe aan begin van frontmatter
    newContent = content.replace('---\n', '---\n' + importStatement + '\n');
  }

  // 2. Verwijder inline <style>...</style> block
  // Match <style> block met alle content tot </style>
  const styleRegex = /\s*<style>[\s\S]*?<\/style>\s*/;
  newContent = newContent.replace(styleRegex, '\n\n');

  // Schrijf gemigreerd bestand
  fs.writeFileSync(filePath, newContent, 'utf8');

  // Bereken regels bespaard
  const oldLines = content.split('\n').length;
  const newLines = newContent.split('\n').length;
  const savedLines = oldLines - newLines;

  console.log(`✅ Gemigreerd: ${relativePath} (-${savedLines} regels)`);
  return { status: 'migrated', path: relativePath, savedLines };
}

// Main
console.log('🚀 Homepage CSS Migratie Gestart\n');
console.log(`📁 Zoeken in: ${pagesDir}\n`);

const homepages = findHomepages(pagesDir);
console.log(`📄 Gevonden: ${homepages.length} homepage bestanden\n`);

const results = {
  migrated: 0,
  skipped: 0,
  errors: 0,
  totalLinesSaved: 0,
};

for (const homepage of homepages) {
  const result = migrateHomepage(homepage);

  if (result.status === 'migrated') {
    results.migrated++;
    results.totalLinesSaved += result.savedLines;
  } else if (result.status === 'skipped') {
    results.skipped++;
  } else {
    results.errors++;
  }
}

console.log('\n' + '='.repeat(50));
console.log('📊 RESULTAAT');
console.log('='.repeat(50));
console.log(`✅ Gemigreerd: ${results.migrated} bestanden`);
console.log(`⏭️  Overgeslagen: ${results.skipped} bestanden`);
console.log(`❌ Fouten: ${results.errors} bestanden`);
console.log(`📉 Totaal regels bespaard: ${results.totalLinesSaved}`);
console.log('='.repeat(50));
