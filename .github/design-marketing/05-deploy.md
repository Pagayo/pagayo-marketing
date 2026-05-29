# Playbook 05 — Online brengen (marketing)

Doel: correct begrijpen hoe `pagayo-marketing` live komt — **anders** dan storefront/api-stack Workers.

## Kort antwoord (SSoT)

Marketing gaat **niet** via `deploy-cloudflare.yml` + `deploy_mode=staging-only` zoals `pagayo-storefront`. Het pad is:

```
git push origin main  (pagayo-marketing repo)
    → GitHub Actions: .github/workflows/deploy.yml
    → npm run build  → dist/
    → npx wrangler pages deploy dist --project-name=pagayo-marketing
    → Cloudflare Pages project
    → https://www.pagayo.com (+ pagayo.com, preview.pagayo.com)
```

**PR’s** naar `main`: alleen **validate** (build checks); **geen** deploy (zie `if:` op deploy-job).

**Handmatig:** `workflow_dispatch` met environment `production` of `preview` (input in workflow).

## Cloudflare Pages project

| Eigenschap | Waarde |
|------------|--------|
| Projectnaam | `pagayo-marketing` |
| Pages URL | `pagayo-marketing.pages.dev` |
| Production branch (dashboard) | `main` |
| Build output | `dist/` (`pages_build_output_dir` in `wrangler.toml`) |
| Compatibility date | `2026-01-02` (mag nieuwer dan Workers-stack; zie `CLOUDFLARE-CONFIG.md` kop) |

### Custom domains (DNS)

Vanuit `pagayo-vault/cloudflare/CLOUDFLARE-CONFIG.md`:

| Host | Doel |
|------|------|
| `pagayo.com` (@) | CNAME → `pagayo-marketing.pages.dev` |
| `www.pagayo.com` | idem |
| `preview.pagayo.com` | idem |

Ingress/redirects voor `*.pagayo.com` zitten in **`pagayo-cloudflare-proxy`**, niet in deze repo.

## GitHub secrets (repo `pagayo-marketing`)

| Secret | Gebruik |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | `wrangler pages deploy` |
| `CLOUDFLARE_ACCOUNT_ID` | account in workflow `env` |
| `GITHUB_TOKEN` | `npm ci` (indien private packages — nu mainly public) |

Geen `DIRECT_DATABASE_URL` voor marketing build.

## Workflow-stappen (deploy.yml)

1. **stack-check** — reusable workflow `pagayo-maintenance` (`reusable-check-stack.yml`)
2. **validate** — `npm ci`, optioneel `design:check`, `type-check`, `lint`
3. **deploy** (alleen push `main` of `workflow_dispatch`) — build + `wrangler pages deploy`
4. **summary** — link naar `www.pagayo.com` en Cloudflare dashboard

Health check na deploy: `curl` naar `https://www.pagayo.com` (warnings non-fatal).

## Lokaal Pages-achtig testen

```bash
cd pagayo-marketing
npm run build
npx wrangler pages dev dist   # of astro preview na build
```

Country cookie: `functions/_middleware.ts` zet `pagayo_country` (CF `cf-ipcountry`); lokaal vaak leeg — nav valt terug op timezone-map in `MarketingLayout` script.

## Relatie tot workspace deploy-policy

- Workspace `AGENTS.md`: geen push naar `main` zonder expliciete goedkeuring Sjoerd — geldt ook voor marketing.
- Marketing heeft **geen** aparte `feature/batch-staging-*` branch-policy in CI; staging van content is lokaal (`localhost:4321`) of `preview.pagayo.com` na bewuste Pages-preview deploy.
- Storefront staging URL (`demo.staging.pagayo.app`) test **geen** marketing-wijzigingen.

## Handmatige Pages deploy (nood)

Alleen met token en na afstemming:

```bash
npm run build
npx wrangler pages deploy dist --project-name=pagayo-marketing
```

## Verder lezen

- `pagayo-vault/cloudflare/CLOUDFLARE-CONFIG.md` — Pages-tabel, wrangler-locaties, GitHub Actions overzicht
- `pagayo-marketing/wrangler.toml` — KV bindings (`SESSION`, `CONTENT_KV`)
- `pagayo-vault/.github/release-playbooks/02-staging.md` — vermeldt marketing als “eigen pad”
