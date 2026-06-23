# AGENTS - pagayo-marketing

## Scope van deze repo

`pagayo-marketing` is de publieke marketing site van Pagayo (`www.pagayo.com`) op **Astro 5 (static)** + **Cloudflare Pages**.

**Cursor playbooks (lees eerst bij elke opdracht):** `.github/design-marketing/README.md` → playbooks `01`–`05` voor fase (lezen, bouwen, verifiëren, escaleren, deploy). Workspace-kopie (lokaal): `pagayo-vault/.github/design-marketing/`.

**Design SSoT:** `DESIGN-SYSTEM.md` + `src/styles/global.css` (alle CSS; `site.css` is enige layout-import).
**Client JS SSoT:** `src/scripts/` — site-breed via `site.ts`; pagina's via `scripts/pages/<slug>.ts`.

## Harde SSOT regels

- Header en footer zijn single source of truth via `src/components/layout/Nav.astro` en `src/components/layout/Footer.astro`.
- Alle terugkerende secties moeten componenten zijn in `src/components/sections/`.
- Content leeft als data in `src/content/*.json` (pricing, features, channels, competitors, trust).
- Alle styling in `src/styles/global.css` — geen `<style>` in `.astro`.
- Client-JS in `src/scripts/` — geen inline scripts in `.astro` (JSON-LD uitgezonderd).
- Nieuwe pagina's mogen geen losstaande, gedupliceerde header/footer of pricing-markup bevatten.

## Contactformulieren (verplicht — AWS SES)

Alle contactformulieren op de marketing site **moeten** via de interne Pages Function **`/api/contact`** (`functions/api/contact.ts`) lopen. Die route verstuurt notificaties via **AWS SES** (`noreply@pagayo.email` → `info@pagayo.com`, regio standaard `eu-north-1`).

| Route | Client | Handler |
|-------|--------|---------|
| `/contact` | `src/scripts/pages/contact.ts` → `initContactForm` | `/api/contact` |
| `/impact-contact` | `src/scripts/pages/impact-contact.ts` → `initContactForm` | `/api/contact` |
| `/powered-by-contact`, `/nl/powered-by-contact` | `src/scripts/pages/powered-by-contact.ts` | `/api/contact` (`form_type: powered-by`) |

**Wel bij nieuw contactformulier**

- Geen `action` naar externe URL; submit via `fetch('/api/contact')` (hergebruik `initContactForm` waar mogelijk).
- Honeypot-veld `website` (hidden).
- Success/error UI op de pagina; fallback `mailto:info@pagayo.com` in fouttekst.
- Optionele velden uitbreiden in `functions/api/contact.ts` + e-mailtemplate — niet een tweede backend.

**Niet**

- Formspree, Getform, Netlify Forms, HubSpot embeds, Typeform, of andere **externe form-/mail-SaaS**.
- Nieuwe `/api/*` mail-endpoints zonder expliciete afstemming.

Secrets staan in Cloudflare Pages (zie `wrangler.toml` kopcomment + `05-deploy.md`).

## Externe systemen (harde gate — Sjoerd)

Voeg **nooit** zonder **expliciete toestemming van Sjoerd** toe, koppelt of embedt:

- Externe form-, analytics-, chat-, CRM-, A/B-test- of tracking-diensten (inclusief third-party scripts op marketingpagina's).
- Nieuwe SaaS-integraties voor e-mail, support, of lead capture.
- Alternatieve deploy- of hosting-paden naast Cloudflare Pages voor deze site.

Bij twijfel: **stoppen** (playbook `04-stop-and-escalate.md`) en escaleren vóór implementatie.

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
