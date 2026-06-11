# Playbook 02 — Implementatiecontract (marketing)

Doel: nieuwe pagina’s en wijzigingen consistent, SEO-vriendelijk en SSoT-conform; geen parallelle design-taal naast `global.css`.

## Wel

- **Layout:** elke pagina gebruikt `MarketingLayout` uit `src/layouts/Marketing.astro`.
- **Chrome:** alleen `Nav.astro`, `Footer.astro`, `StickyFooter.astro` — nooit inline header/footer in pagina’s.
- **Secties:** compose pagina’s uit `src/components/sections/*`; nieuwe herbruikbare blokken daar plaatsen.
- **UI-primitives:** `Button`, `Card`, `SectionHeader` uit `src/components/ui/`.
- **Data:** pricing → `pricing.json`; feature-lijsten → `features.json`; vergelijkbaar voor `channels.json`, `competitors.json`, `trust.json`.
- **i18n:** zichtbare tekst, `<title>`, `description`, structured-data taalvelden via keys in `src/content/i18n/en.json` (+ `nl.json`, `de.json` in dezelfde wijziging).
- **Styling:** alles in `global.css` — **geen** `<style>` in `.astro` (zie `.cursor/rules/pagayo-marketing-styles-scripts-ssot.mdc`).
- **Animatie:** `fade-in` + bestaande scroll/observer in `MarketingLayout` (geen tweede IntersectionObserver zonder reden).
- **CTA’s naar product:** gebruik bestaande URLs (`https://start.pagayo.app/register`, login-links in footer) — geen nieuwe subdomeinen zonder check met `CLOUDFLARE-CONFIG.md`.

## Niet

- Hardcoded prijzen of tier-namen in `.astro` (alleen `pricing.json`).
- Nederlandse slugs op root (`/prijzen` ❌) — wel `/nl/prijzen`.
- Nieuwe kleuren/fonts buiten `DESIGN-SYSTEM.md` / `:root` zonder documentatie.
- `@pagayo/design` of storefront CSS importeren — marketing is visueel **eigen** stack.
- `pagayo-cloudflare-proxy` of storefront deploy-workflows voor marketing-livegang.

## Checklist: nieuwe pagina (Engelse default route)

Voorbeeld: nieuwe pagina `/solutions` (slug Engels).

1. **i18n** — voeg namespace toe, bijv. `solutionsPage` in `en.json`, `nl.json`, `de.json` (title, description, headings, aria-labels).
2. **Pagina** — `src/pages/solutions.astro`:
   ```astro
   ---
   import MarketingLayout from '../layouts/Marketing.astro';
   import i18nEn from '../content/i18n/en.json';
   // import secties…
   const t = i18nEn.solutionsPage;
   ---
   <MarketingLayout title={t.title} description={t.description}>
     <!-- secties, eventueel JSON-LD zoals features.astro -->
   </MarketingLayout>
   ```
3. **Nav** — link in `Nav.astro` + keys in `nav` (alle drie i18n-bestanden).
4. **Footer** — indien van toepassing, zelfde patroon als bestaande links.
5. **Secties** — nieuwe blokken in `components/sections/`; styling in `global.css`.
6. **DESIGN-SYSTEM.md** — alleen bij nieuw visueel patroon (nieuwe card-variant, nieuwe section-label).
7. **Build** — `npm run build` (zie `03-verify.md`).

### Gelokaliseerde variant (`/nl/...`)

1. `src/pages/nl/<engelse-slug-of-afwijkend>.astro` (bijv. `prijzen.astro` → `/nl/prijzen`).
2. Import `nl.json` (of gedeelde helper zodra die bestaat) voor copy.
3. **Zelfde Engelse slug-structuur in URL-pad** waar mogelijk (`/nl/features` nog niet aanwezig — volg bestaande NL-conventie: `prijzen` voor pricing).
4. Plan nav/footer-locale (zie gap in `01-ssot-read.md`).

## Checklist: nieuwe sectie-component

1. Bestand `src/components/sections/MySection.astro`.
2. Props minimaal; data uit JSON of i18n, niet beide inconsistent.
3. Gebruik bestaande classes: `section`, `container`, `section-header`, `section-label`, `headline-lg`, `fade-in`.
4. Documenteer in `DESIGN-SYSTEM.md` onder “Sectiepatronen” als het een nieuw herbruikbaar patroon is.

## SEO / structured data

- Volg `features.astro`: `application/ld+json` met `inLanguage` uit i18n.
- `astro.config.mjs` → `site: "https://www.pagayo.com"` voor canonical context.

## Na codering

Volg **03-verify.md** vóór “klaar”.
