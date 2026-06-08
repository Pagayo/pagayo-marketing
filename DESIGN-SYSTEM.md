# Pagayo Marketing — Design System (SSoT)

**Repo:** `pagayo-marketing` · **Stack:** Astro 5 (static) · **Richting:** “Dark Luxe Tech” (Linear + Cloudflare + Stripe inspiratie)

**Proces voor agents:** `.github/design-marketing/README.md` (playbooks 01–05).

**Implementatie van tokens en component-classes:** `src/styles/global.css` — bij token-wijzigingen dit document in dezelfde PR bijwerken.

---

## Kleuren (CSS custom properties)

Gebruik **altijd** variabelen; geen losse hex in componenten.

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `--bg-deep` | `#09090b` | Pagina-achtergrond |
| `--bg-card` | `#18181b` | Kaarten |
| `--bg-card-hover` | `#1f1f23` | Hover states |
| `--bg-elevated` | `#27272a` | Verhoogde vlakken |
| `--bg-surface` | `#0f0f12` | Sectie-alt |
| `--border` | `#27272a` | Standaard rand |
| `--border-subtle` | `#1e1e22` | Subtiele scheiding |
| `--text-primary` | `#fafafa` | Koppen, body |
| `--text-secondary` | `#a1a1aa` | Intro, subtitels |
| `--text-muted` | `#71717a` | Meta, labels |
| `--pagayo-purple` | `#635BFF` | Primair merk |
| `--pagayo-purple-light` | `#818cf8` | Hover/accent |
| `--gym-green` | `#00d4aa` | Gym-motor |
| `--ngo-amber` | `#fbbf24` | Impact/NGO |
| `--partner-violet` | `#a855f7` | Partner-motor |

Gradients: `--gradient-hero`, `--gradient-purple-blue`, `--gradient-card-border`.

## Typografie

- **Font:** Inter (Google Fonts, geladen in `Marketing.astro`).
- **Schalen (classes):** `headline-xl`, `headline-lg`, `headline-md`, `text-lg`, `text-gradient`.
- **Sectielabels:** `section-label` (uppercase tracking, muted).

## Layout

| Token / class | Waarde / gedrag |
|---------------|-----------------|
| `--max-width` | `1200px` — `.container` |
| `--nav-height` | `72px` |
| `.section` | Verticale sectie-padding (zie `global.css`) |
| `.section-divider` | Gradient-lijn tussen homepage-blokken |
| `.fade-in` | Scroll-reveal; `.visible` via layout-script |

**Homepage vs subpagina:** `Marketing.astro` zet `body.standard-sections-ssot` op niet-home routes voor consistente sectie-spacing.

## UI-primitives (`src/components/ui/`)

| Component | Variants / notities |
|-----------|---------------------|
| `Button.astro` | `primary`, `secondary`, `gym`, `ngo`, `partner`; sizes `md`, `lg` |
| `Card.astro` | Kaart met border/radius tokens |
| `SectionHeader.astro` | Label + titel + optionele intro |

## Sectiepatronen (`src/components/sections/`)

Compose pagina’s uit bestaande secties vóór je nieuwe bouwt:

| Sectie | Typisch gebruik |
|--------|-----------------|
| `Hero` | Homepage hero |
| `TrustBar`, `TrustSecurity` | Social proof |
| `ProductPreview`, `FeaturesGrid`, `ChannelStrip` | Product |
| `MotorsGrid` | Verticals (gym, partner, …) |
| `CompetitorTable` | Vergelijking |
| `PricingTable` | **Data:** `content/pricing.json` |
| `StepsGrid`, `FinalCta` | Conversie |
| `ImpactSection`, `PartnerCalc` | Programma’s |
| `GymsHero`, `GymsOpsShowcase` | `/gyms` |

### Blog (`/blog`, `/blog/[slug]`)

| Element | Class / component | Notities |
|---------|-------------------|----------|
| Index hero | `blog-hero`, `section-label`, `headline-xl` | i18n: `blogPage` in `i18n/*.json` |
| Featured cards | `BlogCard.astro` variant `featured` + `BlogIllustration.astro` | Content links; SVG illustration on the right (Stripe-style) |
| Post list | `.blog-featured-grid` / `.blog-grid` | Single-column stack of horizontal cards; illustration stacks below on mobile |
| Illustrations | `BlogIllustration.astro` | Inline SVG per slug or category fallback; same visual language as giant/partner pages |
| Category pill | `.blog-category-pill` | Zelfde accent als build-log markers |
| Article prose | `.blog-prose` | 680px measure; 19px body, 1.85 line-height; Geist stack; generous heading/paragraph spacing |
| Backdrop | `PageBackdrop` variant `blog` | Subtle purple wash |

Nieuwe posts: markdown in `src/content/blog/` met frontmatter (title, description, category, author, pubDate, featured, draft).

Nieuwe sectie: zelfde BEM-achtige class-namen als in `global.css`; `fade-in` op sectie-root.

## Chrome (niet dupliceren)

- `Nav.astro` — primaire navigatie
- `Footer.astro` — links, legal
- `StickyFooter.astro` — mobiele CTA-balk

## Content-SSoT (geen copy in pagina’s)

| Bestand | Inhoud |
|---------|--------|
| `src/content/pricing.json` | Plannen, prijzen, features |
| `src/content/features.json` | Feature-lijsten |
| `src/content/channels.json` | Kanalen |
| `src/content/competitors.json` | Concurrentietabel |
| `src/content/trust.json` | Trust/security items |
| `src/content/i18n/*.json` | UI-strings, pagina-meta, nav |
| `src/content/blog/*.md` | Blogposts (Astro content collection) |

## Meertaligheid

- Root routes: Engels, Engelse slugs.
- `src/pages/nl/*` → `/nl/...`
- Voeg keys toe in **en, nl, de** tegelijk.
- Nav/footer: momenteel alleen `en.json` — zie playbook `01-ssot-read` voor locale-gap.

## Motion & interactie

- Nav scroll: class `scrolled` op `#nav`
- Mobiel menu: `.nav.open`, toggle ARIA
- Pricing toggle (indien aanwezig): `.pricing-switch.annual`
- Country label: cookie `pagayo_country` + timezone fallback (`Marketing.astro` inline script)

## Wat hier níet hoort

- `@pagayo/design` tokens of storefront admin/workspace patterns.
- Tenant theme/skin (`THEME-SKIN-MODEL.md`).

---

*Canonieke playbooks in deze repo: `.github/design-marketing/`.*
