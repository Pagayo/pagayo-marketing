# Pagayo Marketing Site

Publieke marketing portal voor `www.pagayo.com`.

Doel van deze repo:
- positionering en conversie van Pagayo
- SEO-baseline (`robots`, `sitemap`, metadata)
- consistente CTA-flow naar onboarding/login

Geen tenant businesslogica en geen platform admin-functionaliteit in deze repo.

## Huidige Architectuur (2026-03-30)

- **Framework:** Astro 5.x
- **Runtime:** Cloudflare Pages (`@astrojs/cloudflare`)
- **Pagina-model:** single-entry portal (`src/pages/index.astro`)
- **Content:** JSON-gedreven content + context-varianten via middleware/KV
- **Styling:** `@pagayo/design` + lokale portal styles
- **CTA SSoT:** `src/config/urls.ts`
  - login: `https://start.pagayo.app/login`
  - registratie: `https://start.pagayo.app/register`

## Quick Start

```bash
npm install
npm run dev
```

## Verificatie (verplicht)

```bash
npm run lint
npm run type-check
npm run build
```

## Scripts

- `npm run dev` - lokale Astro devserver (poort 4321)
- `npm run dev:wrangler` - lokaal Pages-runtime pad
- `npm run lint` - ESLint
- `npm run type-check` - Astro type-check (`@astrojs/check`)
- `npm run build` - productiebuild
- `npm run deploy` - build + deploy via Wrangler Pages

## SEO & Infra Baseline

- `public/robots.txt` bevat crawl- en sitemapinstructies
- `@astrojs/sitemap` genereert `sitemap-index.xml`
- `public/_headers` bevat cache- en securityheaders voor Pages

## Design System

- Repo-specifieke designregels: `DESIGN-SYSTEM.md`
- Shared tokens/patterns: `@pagayo/design`

## Smoke Tests

Bij wijziging in marketing routes, redirects, SEO-contracten of CTA-targets ook bijwerken:

- `../pagayo-maintenance/tests/smoke/marketing.test.ts`

## Belangrijke Notities

- Historische voorbeelden met path-based locale routes (`/nl`, `/de`, `/us`) zijn niet langer leidend voor de huidige single-entry portal.
- Gebruik geen hardcoded registratie- of login-URL's in componenten; haal ze uit `src/config/urls.ts`.
