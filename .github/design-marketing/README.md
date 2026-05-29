# Cursor Marketing Playbooks (Pagayo — publieke site)

Canonieke uitvoeringsprotocollen voor **marketing-site-werk in Cursor**: `www.pagayo.com` (Astro, Cloudflare Pages). Dit is **los** van tenant storefront, `@pagayo/design`, en release-playbook staging-batches voor Workers.

**Start:** lees dit bestand, daarna het playbook voor de fase die je uitvoert.

| Playbook | Bestand | Kort |
|----------|---------|------|
| 1 SSoT lezen | [01-ssot-read.md](01-ssot-read.md) | Repo-structuur, i18n, content-JSON, design-tokens vóór code |
| 2 Implementatiecontract | [02-implement-contract.md](02-implement-contract.md) | Nieuwe pagina’s, secties, styling, meertaligheid |
| 3 Verificatie | [03-verify.md](03-verify.md) | `npm run build`, rook-URL’s, SEO/i18n-checks |
| 4 Stop & escaleren | [04-stop-and-escalate.md](04-stop-and-escalate.md) | Domein/DNS, pricing-waarheid, grote IA-wijzigingen |
| 5 Deploy (online) | [05-deploy.md](05-deploy.md) | GitHub Actions → Cloudflare Pages (niet Workers-staging) |

## Referentie-URL’s

| Omgeving | URL | Opmerking |
|----------|-----|-----------|
| Lokaal dev | `http://localhost:4321/` | `npm run dev` in `pagayo-marketing` |
| Production | `https://www.pagayo.com` | Canoniek; `pagayo.com` redirect |
| Preview hostname | `https://preview.pagayo.com` | Custom domain op Pages-project |
| Pages dev URL | `https://pagayo-marketing.pages.dev` | Cloudflare default subdomain |

**Niet verwarren met** tenant staging (`https://demo.staging.pagayo.app`) — dat is storefront, geen marketing.

## SSoT en bronnen (niet dupliceren)

- **Agent-router + harde regels:** `pagayo-marketing/AGENTS.md`
- **Design tokens, typografie, sectie-patronen:** `pagayo-marketing/DESIGN-SYSTEM.md`
- **Implementatie (CSS):** `pagayo-marketing/src/styles/global.css` — wijzig tokens/classes hier; spiegel belangrijke beslissingen in `DESIGN-SYSTEM.md`
- **Cloudflare Pages/DNS/deploy:** `pagayo-vault/cloudflare/CLOUDFLARE-CONFIG.md` (secties Pages + DNS `pagayo.com`)
- **Commit/push-ritueel:** `pagayo-vault/.github/release-playbooks/00-manager-workflow.md`, `01-commit-push.md` (marketing heeft **geen** `deploy-cloudflare.yml` zoals storefront)

**Proactieve SSoT:** structurele wijziging (nieuw sectietype, nieuw content-contract, nieuwe i18n-namespace) → **dezelfde wijziging** in `DESIGN-SYSTEM.md` en waar nodig `AGENTS.md`; playbook alleen als proces, niet als tweede design-spec.

## Wat marketing níet is

- Geen `@pagayo/design` / `pagayo-design` publish-keten.
- Geen `feature/batch-staging-*` + `workflow_dispatch deploy_mode=staging-only` uit storefront-playbooks — marketing deployt via **eigen** `.github/workflows/deploy.yml` op **push naar `main`**.
- Geen D1/Hyperdrive in deze repo (wel KV-bindings in `wrangler.toml` voor toekomstige Astro Cloudflare-features).

## Gerelateerde discipline

- Storefront / tenant UI: [`design-frontend`](../design-frontend/README.md)
- Tenant admin: [`design-admin`](../design-admin/README.md)
- Platform Workers deploy: [`../release-playbooks/`](../release-playbooks/README.md)

## Optioneel: Cursor-rule

`.cursor/rules/pagayo-design-marketing-playbooks.mdc` — activeert bij paden onder `pagayo-marketing/`.
