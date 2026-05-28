# Playbook 03 — Verificatie (marketing)

Doel: technische checks vóór merge/deploy; geen stille broken routes of i18n-gaten.

## 1. Build (verplicht)

In `pagayo-marketing/`:

```bash
npm install
npm run build
```

- Build moet slagen zonder Astro/content errors.
- Output: `dist/` (static HTML).

Optioneel lokaal bekijken:

```bash
npm run dev
# http://localhost:4321/
```

## 2. Pagina-rook (handmatig)

| Route | Check |
|-------|--------|
| `/` | Homepage-secties, geen dubbele nav |
| `/features` | i18n + JSON-LD |
| `/pricing` | Pricing uit JSON, CTA’s werken |
| `/nl/` | NL-copy waar verwacht |
| Nieuwe route | 200, title/description, mobiel menu |

## 3. i18n & URL

- Geen Nederlandse slug op root.
- Nieuwe keys aanwezig in **en, nl, de** als je copy toevoegt.
- Nav/footer: bewust Engels op NL-route? Zo ja, noteer in PR; zo nee, fix locale-import.

## 4. Design

- Geen hardcoded hex buiten `:root` (grep op `#` in `.astro` `<style>`).
- Secties gebruiken bestaande spacing/typography-classes.

## 5. Deploy-trigger (bewustzijn)

- **PR naar `main`:** workflow draait validate-job, **geen** deploy (zie `deploy.yml` `if`).
- **Push `main`:** validate + `wrangler pages deploy` + health check `www.pagayo.com`.

Geen deploy “fixen” via storefront playbooks.

## Rapportage

Noteer: routes gewijzigd, i18n-bestanden, `npm run build` resultaat, en of live deploy verwacht wordt (push `main`).
