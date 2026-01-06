#!/usr/bin/env node

/**
 * Standardize footer structure across all country configs
 *
 * Converts old structure:
 *   footer.platform, footer.general, footer.company, etc.
 *
 * To new structure:
 *   footer.sections[] array
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Check if config uses old footer structure
 */
function hasOldFooterStructure(config) {
  return (
    config.footer &&
    (config.footer.platform ||
      config.footer.general ||
      config.footer.company ||
      config.footer.payments ||
      config.footer.accounting)
  );
}

/**
 * Convert old footer structure to new sections[] structure
 */
function convertFooterStructure(config) {
  const sections = [];

  // Platform section
  if (config.footer.platform) {
    sections.push({
      title: config.footer.platform.title,
      links: config.footer.platform.links,
    });
  }

  // General section
  if (config.footer.general) {
    sections.push({
      title: config.footer.general.title,
      links: config.footer.general.links,
    });
  }

  // Company section
  if (config.footer.company) {
    sections.push({
      title: config.footer.company.title,
      links: config.footer.company.links,
    });
  }

  // Payments section
  if (config.footer.payments) {
    sections.push({
      title: config.footer.payments.title,
      links: config.footer.payments.links,
    });
  }

  // Accounting section
  if (config.footer.accounting) {
    sections.push({
      title: config.footer.accounting.title,
      links: config.footer.accounting.links,
    });
  }

  // Shipping section (if exists)
  if (config.footer.shipping) {
    sections.push({
      title: config.footer.shipping.title,
      links: config.footer.shipping.links,
    });
  }

  // Integrations section (if exists)
  if (config.footer.integrations) {
    sections.push({
      title: config.footer.integrations.title,
      links: config.footer.integrations.links,
    });
  }

  // Legal section (if exists)
  if (config.footer.legal) {
    sections.push({
      title: config.footer.legal.title,
      links: config.footer.legal.links,
    });
  }

  // International section (if exists)
  if (config.footer.international) {
    sections.push({
      title: config.footer.international.title,
      links: config.footer.international.links,
    });
  }

  // Features section (if exists)
  if (config.footer.featuresSection) {
    sections.push({
      title: config.footer.featuresSection.title,
      links: config.footer.featuresSection.links,
    });
  }

  // Create new footer object with sections
  const newFooter = {
    sections: sections,
    tagline: config.meta?.tagline || `E-commerce made simple for ${config.name}`,
    copyright:
      config.footer.copyright || `© ${new Date().getFullYear()} Pagayo. All rights reserved.`,
  };

  return newFooter;
}

/**
 * Main execution
 */
async function main() {
  console.log('🔄 Standardizing footer configs...\n');

  const countriesDir = path.join(__dirname, '../src/data/countries');
  const files = await fs.readdir(countriesDir);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of jsonFiles) {
    const filePath = path.join(countriesDir, file);
    const countryCode = path.basename(file, '.json');

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const config = JSON.parse(content);

      // Check if needs conversion
      if (!hasOldFooterStructure(config)) {
        console.log(`⏭️  ${countryCode}: Already uses new structure, skipping`);
        skipped++;
        continue;
      }

      // Convert footer structure
      const newFooter = convertFooterStructure(config);

      // Update config
      config.footer = newFooter;

      // Write back
      await fs.writeFile(filePath, JSON.stringify(config, null, 2) + '\n', 'utf-8');

      console.log(`✅ ${countryCode}: Converted to sections[] structure`);
      updated++;
    } catch (error) {
      console.error(`❌ ${countryCode}: Failed - ${error.message}`);
      errors++;
    }
  }

  console.log(`\n✨ Standardization complete!`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${jsonFiles.length}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
