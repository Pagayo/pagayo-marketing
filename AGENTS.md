# AGENTS - pagayo-marketing

## Scope van deze repo
`pagayo-marketing` is de publieke marketing site van Pagayo (`www.pagayo.com`) op Astro + Cloudflare Pages.

## Harde SSOT regels
- Header en footer zijn single source of truth via `src/components/layout/Nav.astro` en `src/components/layout/Footer.astro`.
- Alle terugkerende secties moeten componenten zijn in `src/components/sections/`.
- Content leeft als data in `src/content/*.json` (pricing, features, channels, competitors, trust).
- Styling is gecentraliseerd in `src/styles/global.css`.
- Nieuwe pagina's mogen geen losstaande, gedupliceerde header/footer of pricing-markup bevatten.

## Architectuur
- Layout: `src/layouts/Marketing.astro`
- UI primitives: `src/components/ui/`
- Secties: `src/components/sections/`
- Pagina-routes: `src/pages/`
- Taalroutes: `src/pages/nl/` (uitbreidbaar)

## Kwaliteitseisen
- Pixel-perfect consistentie met het marketing concept.
- Wijzigingen in pricing alleen via `src/content/pricing.json`.
- Geen hardcoded duplicatie van features/competitor-data in pagina's.

## Verificatie
```bash
npm install
npm run build
```
