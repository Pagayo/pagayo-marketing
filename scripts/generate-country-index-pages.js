#!/usr/bin/env node

/**
 * Bulk generate index.astro pages for all 167 countries
 *
 * Creates complete landing pages with:
 * - HeaderDynamic + FooterDynamic components
 * - Localized hero section
 * - Feature grid
 * - Social proof
 * - Pricing table
 * - CTA section
 * - Proper i18n structure
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Regions with their page prefix
const REGIONS = {
  eu: 'Europa',
  af: 'Afrika',
  as: 'Azië',
  am: 'Amerika',
  me: 'Midden-Oosten',
  oc: 'Oceanië',
};

/**
 * Get all country config files
 */
async function getAllCountryConfigs() {
  const countriesDir = path.join(__dirname, '../src/data/countries');
  const files = await fs.readdir(countriesDir);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));

  const configs = [];
  for (const file of jsonFiles) {
    const content = await fs.readFile(path.join(countriesDir, file), 'utf-8');
    const config = JSON.parse(content);
    configs.push({ code: path.basename(file, '.json'), ...config });
  }

  return configs;
}

/**
 * Find country directory in pages structure
 */
async function findCountryDirectory(countryCode) {
  const pagesDir = path.join(__dirname, '../src/pages');

  for (const [regionCode] of Object.entries(REGIONS)) {
    const regionPath = path.join(pagesDir, regionCode);
    try {
      const dirs = await fs.readdir(regionPath);
      if (dirs.includes(countryCode)) {
        return path.join(regionPath, countryCode);
      }
    } catch (error) {
      // Region directory doesn't exist, skip
    }
  }

  return null;
}

/**
 * Generate index.astro content for a country
 */
function generateIndexPage(country, regionCode) {
  const countryCode = country.code;
  const countryName = country.name;

  // Language code from locale (e.g., "nl-NL" -> "nl")
  const lang = country.locale ? country.locale.split('-')[0] : 'en';

  // Build title and description from available data
  const title = `Pagayo - E-commerce Platform ${countryName}`;
  const description =
    country.meta?.tagline ||
    `Multi-tenant e-commerce platform for modern entrepreneurs in ${countryName}.`;

  // Relative paths from region/country/index.astro to root
  const relativeToRoot = '../../../';

  return `---
import BaseLayout from '${relativeToRoot}layouts/BaseLayout.astro';
import HeaderDynamic from '${relativeToRoot}components/HeaderDynamic.astro';
import FooterDynamic from '${relativeToRoot}components/FooterDynamic.astro';
import ${countryCode}Country from '${relativeToRoot}data/countries/${countryCode}.json';

const country = ${countryCode}Country;

// Schema.org structured data
const structuredData = [
  {
    type: 'Organization',
    data: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pagayo',
      url: 'https://pagayo.com',
      logo: 'https://pagayo.com/og-image.svg',
      description: '${description}',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'support@pagayo.com',
        availableLanguage: ['${lang}']
      }
    }
  },
  {
    type: 'WebSite',
    data: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Pagayo',
      url: 'https://pagayo.com',
      description: '${description}',
      inLanguage: '${lang}'
    }
  }
];
---

<BaseLayout 
  title="${title}" 
  description="${description}" 
  lang="${lang}"
  structuredData={structuredData}
>
  <HeaderDynamic country={country} />
  
  <style>
    /* Page-specific styles - shared styles in global.css */
    
    .social-proof {
      max-width: 1200px;
      margin: 0 auto 4rem;
      padding: 3rem 2rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 22px;
    }

    .social-proof-content {
      max-width: 900px;
      margin: 0 auto;
      text-align: center;
    }

    .social-proof h3 {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2rem;
    }

    .trust-badges {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      flex-wrap: wrap;
    }

    .trust-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .trust-number {
      font-size: 2rem;
      font-weight: 800;
      color: var(--accent);
    }

    .trust-label {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .pricing {
      padding: 6rem 2rem;
      background: linear-gradient(180deg, #0a0a0a 0%, #0f1513 100%);
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: 1fr;
      max-width: 900px;
      margin: 0 auto;
    }

    .pricing-card {
      background: linear-gradient(180deg, #0f1513 0%, #0a0a0a 100%);
      border: 2px solid var(--border);
      border-radius: 20px;
      padding: 0;
      position: relative;
      transition: all 0.3s ease;
      box-shadow: 0 8px 24px rgba(0, 255, 136, 0.1);
    }

    .pricing-card:hover {
      border-color: var(--accent);
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(0, 255, 136, 0.2);
    }

    .pricing-badge {
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, var(--accent) 0%, #00e077 100%);
      color: var(--bg);
      padding: 0.4rem 1.5rem;
      border-radius: 100px;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
    }

    .pricing-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
    }

    .pricing-column {
      padding: 3rem 2.5rem;
    }

    .pricing-column.features {
      border-left: 1px solid var(--border);
      background: rgba(0, 255, 136, 0.02);
    }

    .pricing-column h4 {
      color: var(--accent);
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 2rem;
      font-weight: 700;
    }

    .pricing-tier {
      display: flex;
      align-items: baseline;
      gap: 1rem;
      padding: 1.25rem 0;
      border-bottom: 1px solid rgba(26, 51, 42, 0.5);
    }

    .pricing-tier:last-child {
      border-bottom: none;
    }

    .pricing-tier .percentage {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--accent);
      line-height: 1;
      min-width: 80px;
    }

    .pricing-tier .range {
      color: var(--text-secondary);
      font-size: 1rem;
    }

    .pricing-footer {
      padding: 2.5rem 2.5rem 3rem;
      border-top: 1px solid var(--border);
      background: rgba(0, 255, 136, 0.02);
    }

    .pricing-footer p {
      color: var(--text);
      margin-bottom: 1.5rem;
      text-align: center;
      font-size: 1.05rem;
    }

    .pricing-footer .btn {
      width: 100%;
      justify-content: center;
      padding: 1.2rem 2rem;
      font-size: 1.05rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: var(--text);
      padding: 1rem 0;
      border-bottom: 1px solid rgba(26, 51, 42, 0.5);
      font-size: 1rem;
    }

    .feature-item:last-child {
      border-bottom: none;
    }

    .feature-item .checkmark {
      font-size: 1.5rem;
      color: var(--accent);
      font-weight: 700;
      line-height: 1;
      min-width: 24px;
    }

    @media (max-width: 1024px) {
      .hero-main {
        grid-template-columns: 1fr;
        gap: 3rem;
        padding: calc(3rem + 80px) 2rem 3rem;
      }

      .hero__content {
        max-width: 100%;
      }

      .hero__panels {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .pricing-columns {
        grid-template-columns: 1fr;
      }

      .pricing-column.features {
        border-left: none;
        border-top: 1px solid var(--border);
      }
    }

    @media (max-width: 768px) {
      .btn-group {
        flex-direction: column;
        gap: 0.8rem;
        width: 100%;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }

      .feature-card {
        padding: 1.5rem;
      }

      .section {
        padding: 4rem 1.5rem;
      }

      .section-title {
        font-size: clamp(1.75rem, 5vw, 2.5rem);
      }

      .section-subtitle {
        font-size: 1rem;
      }

      .social-proof {
        padding: 3rem 1.5rem;
      }

      .trust-badges {
        flex-direction: column;
        gap: 2rem;
      }

      .pricing {
        padding: 4rem 1.5rem;
      }

      .pricing-card {
        border-radius: 16px;
      }

      .pricing-badge {
        font-size: 0.75rem;
        padding: 0.3rem 1rem;
      }

      .pricing-column {
        padding: 2rem 1.5rem;
      }

      .pricing-tier {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem 0;
      }

      .pricing-tier .percentage {
        font-size: 2rem;
        min-width: auto;
      }

      .pricing-tier .range {
        font-size: 0.9rem;
      }

      .feature-item {
        font-size: 0.9rem;
        padding: 0.8rem 0;
      }

      .pricing-footer {
        padding: 2rem 1.5rem;
      }

      .pricing-footer p {
        font-size: 1rem;
      }
    }

    @media (max-width: 480px) {
      .hero-badge {
        font-size: 0.75rem;
        padding: 0.4rem 0.8rem;
      }

      .hero h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .hero-subtitle {
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }

      .stat-number {
        font-size: 1.75rem;
      }

      .stat-label {
        font-size: 0.85rem;
      }

      .btn {
        padding: 0.8rem 1.5rem;
        font-size: 0.95rem;
      }

      .section {
        padding: 3rem 1rem;
      }

      .section-header {
        margin-bottom: 2.5rem;
      }

      .feature-card {
        padding: 1.25rem;
      }

      .feature-icon {
        width: 40px;
        height: 40px;
        margin-bottom: 1rem;
      }

      .feature-card h3 {
        font-size: 1.1rem;
      }

      .feature-card p {
        font-size: 0.9rem;
      }

      .social-proof {
        margin: 0 1rem 3rem;
        padding: 2rem 1rem;
        border-radius: 18px;
      }

      .pricing {
        padding: 3rem 1rem;
      }

      .pricing-column {
        padding: 1.5rem 1rem;
      }

      .pricing-tier .percentage {
        font-size: 1.75rem;
      }

      .feature-item {
        font-size: 0.85rem;
        gap: 0.75rem;
      }

      .feature-item .checkmark {
        font-size: 1.25rem;
      }
    }
  </style>

  <main class="page-container">
    <!-- HERO -->
    <section class="hero-main">
      <div class="hero__content">
        <p class="eyebrow">Platform</p>
        <h1>E-commerce without hassle</h1>
        <p class="lead">${description}</p>
        <div class="hero__actions">
          <a class="btn btn-primary" href="https://app.pagayo.com/register/">${country.nav.cta}</a>
          <a class="btn btn-ghost" href="/${regionCode}/${countryCode}/pricing">${country.nav.pricing}</a>
        </div>
        <div class="hero__meta">
          <span class="pill">99.98% uptime</span>
          <span class="pill">&lt;150ms response time</span>
        </div>
      </div>

      <div class="hero__panel">
        <div class="stat-card">
          <p class="stat-label">Unlimited stores</p>
          <p class="stat-value">Your business</p>
          <p class="stat-footnote">As many webshops, hotels, and POS systems as you need</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">API connections</p>
          <p class="stat-value">100+</p>
          <p class="stat-footnote">Integrations with payment providers, shipping, and more</p>
        </div>
        <div class="stat-card">
          <p class="stat-label">Trusted by</p>
          <p class="stat-value">5,000+</p>
          <p class="stat-footnote">Businesses use Pagayo every day</p>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">${country.nav.features}</h2>
        <p class="section-subtitle">A modern platform for your growing business</p>
      </div>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">💳</div>
          <h3>Stripe payments</h3>
          <p>iDEAL, Bancontact, cards and wallets with smart retries.</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🪙</div>
          <h3>Mollie payments</h3>
          <p>Popular payment methods activated instantly, including local preferences.</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🧮</div>
          <h3>Checkout & VAT</h3>
          <p>Choose standard checkout or custom design. VAT and shipping calculated correctly per country.</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">📡</div>
          <h3>Payment tracking</h3>
          <p>Every step of a payment is logged. If there are issues, we retry and notify you.</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🧾</div>
          <h3>POS & online sync</h3>
          <p>Inventory, orders and returns stay in sync between POS and webshop.</p>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF -->
    <section class="social-proof">
      <div class="social-proof-content">
        <h3>Trusted by e-commerce entrepreneurs</h3>
        <div class="trust-badges">
          <div class="trust-item">
            <div class="trust-number">50+</div>
            <div class="trust-label">Active webshops</div>
          </div>
          <div class="trust-item">
            <div class="trust-number">99.9%</div>
            <div class="trust-label">Historical uptime</div>
          </div>
          <div class="trust-item">
            <div class="trust-number">24/7</div>
            <div class="trust-label">Support available</div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section class="pricing" id="pricing">
      <div class="section-header">
        <h2 class="section-title">Simple, scalable pricing</h2>
        <p class="section-subtitle">Pay only for your success. The more you earn, the less you pay.</p>
      </div>
      <div class="pricing-grid">
        <div class="pricing-card">
          <div class="pricing-badge">Pagayo Platform</div>
          <div class="pricing-columns">
            <div class="pricing-column">
              <h4>Pricing</h4>
              <div class="pricing-tier">
                <span class="percentage">1%</span>
                <span class="range">up to ${country.currency}5,000/month</span>
              </div>
              <div class="pricing-tier">
                <span class="percentage">0.8%</span>
                <span class="range">${country.currency}5,000-${country.currency}10,000</span>
              </div>
              <div class="pricing-tier">
                <span class="percentage">0.6%</span>
                <span class="range">${country.currency}10,000-${country.currency}50,000</span>
              </div>
              <div class="pricing-tier">
                <span class="percentage">0.5%</span>
                <span class="range">${country.currency}50,000-${country.currency}100,000</span>
              </div>
            </div>
            
            <div class="pricing-column features">
              <h4>What you get</h4>
              <div class="feature-item">
                <span class="checkmark">✓</span> Unlimited webshops
              </div>
              <div class="feature-item">
                <span class="checkmark">✓</span> Unlimited hotels
              </div>
              <div class="feature-item">
                <span class="checkmark">✓</span> Unlimited subscriptions
              </div>
              <div class="feature-item">
                <span class="checkmark">✓</span> Unlimited rentals
              </div>
              <div class="feature-item">
                <span class="checkmark">✓</span> Unlimited POS systems
              </div>
              <div class="feature-item">
                <span class="checkmark">✓</span> Custom domains
              </div>
            </div>
          </div>
          
          <div class="pricing-footer">
            <p>Start free - no trial period</p>
            <a href="https://app.pagayo.com/register/" class="btn btn-primary">
              ${country.nav.cta}
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 1l6 6-6 6"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Ready to start?</h2>
        <p class="section-subtitle">
          Start immediately and get your own environment within 30 seconds. Need help? We're here.
        </p>
      </div>
      <div class="btn-group">
        <a href="https://app.pagayo.com/register/" class="btn btn-primary">
          ${country.nav.cta}
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 1l6 6-6 6"/>
          </svg>
        </a>
        <a href="/${regionCode}/${countryCode}/contact" class="btn btn-ghost">
          ${country.nav.contact}
        </a>
      </div>
    </section>
  </main>

  <FooterDynamic country={country} />
</BaseLayout>
`;
}

/**
 * Main execution
 */
async function main() {
  console.log('🌍 Generating index.astro for all 167 countries...\n');

  const countries = await getAllCountryConfigs();
  console.log(`📋 Found ${countries.length} country configs\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const country of countries) {
    const countryDir = await findCountryDirectory(country.code);

    if (!countryDir) {
      console.log(`⚠️  ${country.code}: Directory not found, skipping`);
      skipped++;
      continue;
    }

    const indexPath = path.join(countryDir, 'index.astro');

    // Check if file already exists
    try {
      await fs.access(indexPath);
      console.log(`⏭️  ${country.code}: index.astro already exists, skipping`);
      skipped++;
      continue;
    } catch {
      // File doesn't exist, we can create it
    }

    // Determine region code from directory path
    const regionCode = countryDir.split(path.sep).slice(-2)[0];

    try {
      const content = generateIndexPage(country, regionCode);
      await fs.writeFile(indexPath, content, 'utf-8');
      console.log(`✅ ${country.code}: Created index.astro (${country.name})`);
      created++;
    } catch (error) {
      console.error(`❌ ${country.code}: Failed to create index.astro - ${error.message}`);
      errors++;
    }
  }

  console.log(`\n✨ Generation complete!`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${countries.length}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
