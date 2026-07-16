# AGENTS - pagayo-marketing

## Scope van deze repo

`pagayo-marketing` is de publieke marketing site van Pagayo (`www.pagayo.com`) op **Astro 5 (static)** + **Cloudflare Pages**.

**Cursor playbooks (lees eerst bij elke opdracht):** `.github/design-marketing/README.md` → playbooks `01`–`05` voor fase (lezen, bouwen, verifiëren, escaleren, deploy). Workspace-kopie (lokaal): `pagayo-vault/.github/design-marketing/`.

**Design SSoT:** `DESIGN-SYSTEM.md` + `src/styles/global.css` (alle CSS; `site.css` is enige layout-import).
**Client JS SSoT:** `src/scripts/` — site-breed via `site.ts`; pagina's via `scripts/pages/<slug>.ts`.

## Local source (verplicht)

Volg [`../AGENTS.md`](../AGENTS.md) § Pagayo Project Source. Gebruik Pagayo Project Source (MCP) voor actuele lokale code, branches, dirty state en repository-context. GitHub is remote state — geen primaire lokale implementatiewaarheid.

## Leesvolgorde (verplicht)
Volgt workspace-hiërarchie: WHY → repo-regels (dit bestand) → NIVEAU → taakdocs.

1. `../AGENTS.md`
2. `../pagayo-vault/PAGAYO-WHY.md`
3. Dit bestand + `DESIGN-SYSTEM.md` — marketing site grenzen (geen Workers deploy-pad)
4. `../pagayo-vault/PAGAYO-NIVEAU.md`
5. `.github/design-marketing/README.md` (playbooks `01`–`05`; vault-kopie: `pagayo-vault/.github/design-marketing/`)

## Harde SSOT regels

- Header en footer zijn single source of truth via `src/components/layout/Nav.astro` en `src/components/layout/Footer.astro`.
- Alle terugkerende secties moeten componenten zijn in `src/components/sections/`.
- Content leeft als data in `src/content/*.json` (pricing, features, channels, competitors, trust).
- Alle styling in `src/styles/global.css` — geen `<style>` in `.astro`.
- Client-JS in `src/scripts/` — geen inline scripts in `.astro` (JSON-LD uitgezonderd).
- Nieuwe pagina's mogen geen losstaande, gedupliceerde header/footer of pricing-markup bevatten.

## Architectuur

- Layout: `src/layouts/Marketing.astro`
- UI primitives: `src/components/ui/`
- Secties: `src/components/sections/`
- Pagina-routes: `src/pages/`
- Taalroutes: `src/pages/nl/` (uitbreidbaar; `de.json` bestaat, `/de/` nog niet)

## Taal & URL standaarden (verplicht)

- Standaardcontent in **Engels** op default routes (bijv. `/`, `/features`, `/pricing`, `/partners`, `/gyms`, `/impact`).
- Vertalingen altijd via i18n-bestanden (`src/content/i18n/*.json`), niet via hardcoded copy in pagina's.
- Nieuwe pagina's moeten i18n-keys gebruiken voor zichtbare tekst, SEO-title/description en indien gebruikt structured data taalvelden.
- URL's en slugs altijd **Engels** houden op default routes. Geen Nederlandstalige slugs op default routes.
- Gelokaliseerde content uitsluitend via taalprefix-routes (bijv. `/nl/...`).

## Deploy (apart van storefront)

- **Niet** via storefront `deploy-cloudflare.yml` / staging-batch Workers.
- **Wel:** push naar `main` in deze repo → `.github/workflows/deploy.yml` → `wrangler pages deploy dist --project-name=pagayo-marketing`.
- Details: `.github/design-marketing/05-deploy.md` en (lokaal) `pagayo-vault/cloudflare/CLOUDFLARE-CONFIG.md`.

## Lokaal

```bash
npm install
npm run dev    # http://localhost:4321/
npm run build
```

## Kwaliteitseisen

- Pixel-perfect consistentie met `DESIGN-SYSTEM.md` / `global.css`.
- Wijzigingen in pricing alleen via `src/content/pricing.json`.
- Geen hardcoded duplicatie van features/competitor-data in pagina's.

## Verificatie

```bash
npm install
npm run build
```

Zie ook `.github/design-marketing/03-verify.md`.

## Bekende gaps (verbeteren in kleine PR's)

- Nav/Footer gebruiken alleen `en.json` (ook op `/nl/*`).
- Niet alle secties zijn volledig i18n-gedreven (o.a. pricing-sectie-labels).
- `MarketingLayout` heeft vast `lang="en"`.
