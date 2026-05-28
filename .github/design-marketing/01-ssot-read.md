# Playbook 01 — SSoT lezen (vóór marketing-code)

Doel: voordat je pagina’s, secties of styling wijzigt op `www.pagayo.com`, laad je de canonieke context — geen tweede header/footer, geen hardcoded pricing, geen Nederlandse slugs op default routes.

## SSoT (verplichte leesvolgorde)

1. **`pagayo-marketing/AGENTS.md`** — scope, harde regels (layout, content-JSON, i18n, URL’s).
2. **`pagayo-marketing/DESIGN-SYSTEM.md`** — “Dark Luxe Tech”, tokens, typografie, sectie- en UI-patronen.
3. **Relevante bestaande pagina** — kopieer het dichtstbijzijnde voorbeeld:
   - Landingspagina met veel secties: `src/pages/index.astro`
   - Content-gedreven subpagina met i18n + schema: `src/pages/features.astro`
   - Dunne wrapper-pagina: `src/pages/pricing.astro`
   - Gelokaliseerde route: `src/pages/nl/index.astro` (let op: deels afwijkend van EN-homepage)
4. **[05-deploy.md](05-deploy.md)** — alleen als je livegang/CI raakt.

## Repo-structuur (mentaal model)

```
pagayo-marketing/
├── src/
│   ├── layouts/Marketing.astro      # Shell: Nav, slot, Footer, StickyFooter
│   ├── components/
│   │   ├── layout/                  # Nav, Footer, StickyFooter (SSoT chrome)
│   │   ├── sections/                # Herbruikbare marketing-secties
│   │   └── ui/                      # Button, Card, SectionHeader
│   ├── pages/                       # Routes (Engelse slugs op root)
│   │   └── nl/                      # Taalprefix (bijv. /nl/, /nl/prijzen)
│   ├── content/
│   │   ├── i18n/en.json|nl.json|de.json
│   │   ├── pricing.json, features.json, …
│   └── styles/global.css            # Alle styling + :root tokens
├── functions/_middleware.ts         # Cloudflare Pages: pagayo_country cookie
├── .github/workflows/deploy.yml     # CI → wrangler pages deploy
├── wrangler.toml                    # Pages project + KV bindings
└── astro.config.mjs                 # site URL, static output
```

## Classificeer het werk

| Type | Kenmerk | Open eerst |
|------|---------|------------|
| **Nieuwe marketingpagina** | Nieuwe route onder `src/pages/` | Dunne `.astro` + bestaande secties; i18n-keys |
| **Nieuwe sectie** | Herbruikbaar blok op meerdere pagina’s | `src/components/sections/` + `global.css` classes |
| **Pricing / plans** | Bedragen, tiers, limieten | Alleen `src/content/pricing.json` |
| **Feature-/trust-/channel-copy** | Lijsten, tabellen | `src/content/*.json` |
| **Nav / footer / sticky CTA** | Globale chrome | `src/components/layout/*` + i18n `nav` |
| **Styling / tokens** | Kleur, spacing, motion | `global.css` + `DESIGN-SYSTEM.md` |
| **Deploy / DNS** | Livegang | `05-deploy.md`, `pagayo-vault/cloudflare/CLOUDFLARE-CONFIG.md` |

## Meertaligheid (huidige stand)

- **Default routes** (`/`, `/features`, …): Engelse copy; slugs **Engels**.
- **Vertalingen:** `src/content/i18n/{en,nl,de}.json` — geen hardcoded zichtbare strings in pagina’s waar i18n al bestaat.
- **Gelokaliseerde routes:** prefix `src/pages/nl/` → URL `/nl/...` (bijv. `/nl/prijzen` voor pricing).
- **Bekende gap (niet negeren):** `Nav.astro` / `Footer.astro` importeren vandaag **alleen** `en.json`; NL-pagina’s tonen nog Engelse nav-labels tenzij je locale-aware import toevoegt (zie `02-implement-contract.md`).

## Harde regel

Geen losse duplicate van header, footer, pricing-markup of feature-lijsten in een pagina-bestand.

## Stop hier niet

- Geen implementatie zonder **02-implement-contract.md**.
- Live deploy: **05-deploy.md** + expliciete goedkeuring Sjoerd voor productie-impact buiten normale `main`-flow.
