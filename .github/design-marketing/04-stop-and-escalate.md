# Playbook 04 — Stoppen en escaleren (marketing)

Doel: voorkomen dat agents DNS/productie breken, pricing onwaar maken, of marketing per ongeluk via Workers-deploy paden uitrollen.

## Stop en vraag Sjoerd vóór je verder gaat wanneer

- **DNS / custom domain** op `pagayo.com` wijzigen (CNAME naar Pages staat in `pagayo-vault/cloudflare/CLOUDFLARE-CONFIG.md`).
- **Pricing, limieten of juridische claims** wijzigen zonder productgoedkeuring (data in `pricing.json` is commerciële waarheid).
- **Nieuwe taal/locale-structuur** (bijv. `/de/` routes, hreflang-strategie, CMS) — `de.json` bestaat maar heeft nog geen routes.
- **Astro `output` of adapter** wijzigen (nu `static` in `astro.config.mjs`).
- **KV / middleware / wrangler bindings** toevoegen of wijzigen (`wrangler.toml`, `functions/_middleware.ts`).
- **Externe systemen** (form-SaaS, analytics, chat, CRM, tracking scripts, nieuwe mail-backends) — **nooit** zonder expliciete toestemming Sjoerd. Contactformulieren blijven **AWS SES** via `/api/contact` (zie `AGENTS.md`).
- Conflicterende instructies tussen chat, `AGENTS.md`, en `DESIGN-SYSTEM.md` — workspace `AGENTS.md` / expliciete instructie Sjoerd wint.
- Je marketing wilt koppelen aan **storefront design-keten** (`@pagayo/design`, `copy-design`) — dat hoort hier niet; apart besluit.

## Bekende technische schuld (geen blocker, wel transparant)

| Onderwerp | Status |
|-----------|--------|
| Nav/Footer i18n | Alleen `en.json` geïmporteerd |
| NL homepage | `/nl/` is subset van EN homepage |
| `de.json` | Geen `/de/` pages |
| `MarketingLayout` | `lang="en"` vast |
| Secties (o.a. PricingTable) | Deels hardcoded EN in component |
| Content collections schema | `content.config.ts` dekt alleen `nav` — pagina-i18n via direct JSON import |

Verbeteringen in bovenstaande lijst zijn welkom in kleine PR’s; grote IA/i18n-refactors eerst afstemmen.

## Na stop: vervolg

1. Commit-ritueel: `pagayo-vault/.github/release-playbooks/00-pre-commit.md`
2. Push marketing: `01-commit-push.md` (repo `pagayo-marketing`)
3. Deploy-details: `05-deploy.md`

## Niet doen

- `wrangler deploy` (Workers) voor marketing — gebruik **Pages** deploy pad.
- Push naar `main` verwachten zonder te weten dat **production** direct volgt (tenzij workflow handmatig en bewust).
