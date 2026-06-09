/**
 * Post-build SVG optimiser.
 *
 * Runs after `astro build` and optimises every inline <svg> element found in
 * the generated HTML files inside dist/.
 *
 * Two-step process per SVG:
 *  1. Strip Astro-scoped attributes (data-astro-cid-*). They're boolean HTML
 *     attributes that make the SVG invalid XML, so SVGO chokes on them. The
 *     illustrative SVGs on this site use only inline presentation attributes
 *     (fill, stroke, opacity) — no CSS classes that depend on scope — so
 *     removing the cid attributes is safe and also saves bytes directly.
 *  2. Run SVGO preset-default to clean up path data, numeric precision,
 *     redundant groups, etc.
 */

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { optimize } from 'svgo';

const DIST_DIR = new URL('../dist', import.meta.url).pathname;

const SVGO_CONFIG = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // cleanupIds: false — don't rewrite IDs, CSS/JS may reference them.
          cleanupIds: false,
        },
      },
    },
    // Keep viewBox — required for responsive scaling (not in preset-default).
    { name: 'removeViewBox', active: false },
    'removeComments',
    'removeTitle',
    'removeDesc',
  ],
};

/** Strip Astro scoped-CSS attributes so SVGO can parse as valid XML. */
function stripAstroScoping(svg) {
  return svg.replace(/\s+data-astro-cid-[a-z0-9]+/gi, '');
}

/** Find every <svg…>…</svg> block in an HTML string and optimise it. */
function optimiseInlineSvgs(html) {
  let optimised = 0;
  let savedBytes = 0;

  const result = html.replace(/<svg[\s\S]*?<\/svg>/gi, (match) => {
    try {
      const clean = stripAstroScoping(match);
      const { data } = optimize(clean, SVGO_CONFIG);
      savedBytes += match.length - data.length;
      optimised++;
      return data;
    } catch {
      return match;
    }
  });

  return { html: result, optimised, savedBytes };
}

/** Recursively collect all .html files under a directory. */
async function collectHtmlFiles(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      files.push(...await collectHtmlFiles(full));
    } else if (extname(entry) === '.html') {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await collectHtmlFiles(DIST_DIR);
  let totalOptimised = 0;
  let totalSaved = 0;

  for (const file of files) {
    const original = await readFile(file, 'utf-8');
    const { html, optimised, savedBytes } = optimiseInlineSvgs(original);

    if (savedBytes > 0) {
      await writeFile(file, html, 'utf-8');
      totalOptimised += optimised;
      totalSaved += savedBytes;
      const rel = file.replace(DIST_DIR, '').replace(/^\//, '');
      console.log(`  ✓ ${rel}  (${optimised} SVG${optimised > 1 ? 's' : ''}, -${(savedBytes / 1024).toFixed(1)} KB)`);
    }
  }

  const kb = (totalSaved / 1024).toFixed(1);
  console.log(`\n  SVG optimisation complete: ${totalOptimised} SVGs, -${kb} KB total`);
}

main().catch((err) => { console.error(err); process.exit(1); });
