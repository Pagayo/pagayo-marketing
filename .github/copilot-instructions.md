# GitHub Copilot Instructions – Pagayo Marketing

## 🤖 AI MODEL VEREISTE
**VERBODEN MODEL: Claude Haiku mag NOOIT gebruikt worden.**
- Claude Haiku is niet toegestaan voor dit project
- Voor Claude modellen: gebruik minimaal Claude Sonnet 4.5
- GPT modellen zijn toegestaan
- Codex modellen alleen als subagent toegestaan
- Bij twijfel over het model: STOP en vraag Sjoerd

---

## 🎨 DESIGN LEIDRAAD: STRIPE.COM

**KRITIEK: Elk component, elke pagina, elke styling moet Stripe.com niveau zijn.**

### Design Principes
1. **Clarity First** — Clean, minimal, no clutter
2. **Professional & Trustworthy** — Subtle animations, consistent spacing
3. **Performance Obsessed** — Lazy-load, optimized fonts, minimal JS
4. **Mobile-First** — Responsive breakpoints, touch-friendly CTAs

### Stripe.com Pattern Library
```
Hero Section:
├── Large headline (3-4rem)
├── Short subheading (1.25rem)
├── CTA buttons (primary + secondary)
└── Visual (animated product screenshot)

Feature Grid:
├── 3 columns on desktop
├── Icon + heading + description
├── Plenty of whitespace
└── Hover state (card lifts)

Pricing Table:
├── 3-tier layout
├── Elevated cards
├── Clear feature comparison
└── Strong CTA buttons
```

**Gebruik dit als benchmark bij elke component die je maakt.**

---

## 📜 SCRIPTS-FIRST - VERPLICHT

**KRITIEK: Scripts zijn ALTIJD beter dan handmatig tools gebruiken.**

### Verplichte Volgorde:
1. **Is er een script?** → Gebruik het script
2. **Staat in README?** → Volg de docs
3. **Moet ik zelf uitzoeken?** → Vraag eerst of er een betere manier is
4. **Echt geen script?** → Dan pas files lezen/grep/search

### Key Scripts:
```bash
npm run dev          # Dev server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # ESLint
npm run format       # Prettier
```

---

## 🚀 DEPLOYMENT FLOW (KRITIEK!)

**GEEN Docker, GEEN Cloud Run. Dit is een static site.**

**Branch Strategy:**
- `main` branch → Cloudflare Pages trigger → Edge deployment (PRODUCTIE)
- Feature branches → Preview deployments (pr-123.pages.dev)
- **GitHub = code review + version control ONLY**
- **Cloudflare Pages = CI/CD pipeline**

**Push naar main deploy automatisch naar productie!**

---

## 📌 VERPLICHT: eerst Pagayo Beheer Copilot-bestand lezen

**VOORDAT je iets doet in deze repo, moet je eerst het Copilot-instructiebestand van Pagayo Beheer lezen:**

- `/pagayo-beheer/.github/copilot-instructions.md`

**Waarom:** Enterprise mindset, kwaliteit > snelheid, security requirements, Git workflow.

---

## 🌍 INTERNATIONALIZATION (i18n)

### Path-Based Routing
```
www.pagayo.com/nl/prijzen    → Nederlands
www.pagayo.com/de/preise     → Duits
www.pagayo.com/us/pricing    → US English
```

### Language Files
```typescript
// src/locales/nl.json
{
  "nav": { "pricing": "Prijzen" },
  "hero": { "title": "..." }
}

// src/locales/de.json
{
  "nav": { "pricing": "Preise" },
  "hero": { "title": "..." }
}
```

### Harde Regels:
- ❌ GEEN subdomains per taal (nl.pagayo.com)
- ✅ Path-based routing only (`/nl`, `/de`)
- ✅ hreflang tags voor SEO
- ✅ Language switcher in header

---

## 🎯 PERFORMANCE REQUIREMENTS

**KRITIEK: Lighthouse 100/100/100/100 is MANDATORY.**

### Performance Targets
- TTFB: < 50ms (edge deployment)
- FCP: < 800ms
- LCP: < 1.5s
- CLS: < 0.1
- Bundle size: < 100kb JS

### Optimization Checklist
- [ ] Astro Image voor alle images (WebP + lazy-load)
- [ ] Font subsetting (Inter WOFF2, only used glyphs)
- [ ] Minification (HTML, CSS, JS)
- [ ] Cache headers (immutable voor assets)
- [ ] No render-blocking resources

**Bij elke PR: Lighthouse CI check MOET slagen (95+ scores).**

---

## 🏗️ COMPONENT ARCHITECTUUR

### File Structure
```
src/components/
├── layout/
│   ├── Header.astro          # Nav + language switcher
│   ├── Footer.astro          # Footer links
│   └── Breadcrumbs.astro
├── marketing/
│   ├── Hero.astro            # Hero section
│   ├── Features.astro        # Feature grid
│   ├── PricingTable.astro    # Pricing cards
│   └── CTASection.astro      # Call-to-action
├── ui/
│   ├── Button.astro          # Button variants
│   ├── Card.astro            # Card component
│   └── Icon.astro            # SVG icons
└── forms/
    ├── SignupForm.astro      # Email capture
    └── ContactForm.astro     # Contact us
```

### Component Naming
- PascalCase voor files (`Hero.astro`)
- kebab-case voor CSS classes (`hero-title`)
- Descriptive names (`CTASection` not `CTA`)

---

## 🔐 SECURITY & INTEGRATION

### Form Submissions
**ALLE forms POST naar Beheer API:**
```typescript
// SignupForm → beheer.pagayo.com/api/register
// ContactForm → beheer.pagayo.com/api/contact
```

**NOOIT:**
- ❌ Database calls from marketing site
- ❌ Secrets in code (API keys, tokens)
- ❌ Client-side auth logic

**WEL:**
- ✅ Simple forms → POST to Beheer
- ✅ No backend logic in marketing site
- ✅ Static everything

---

## 📊 ANALYTICS & SEO

### Analytics Setup
```html
<!-- Plausible (privacy-friendly, no cookies) -->
<script defer data-domain="pagayo.com" src="https://plausible.io/js/script.js"></script>
```

### SEO Requirements
- [ ] Meta tags all pages (title, description)
- [ ] Open Graph images (og:image)
- [ ] Structured data (Schema.org)
- [ ] Sitemap.xml (auto-generated)
- [ ] Robots.txt
- [ ] hreflang tags (multi-language)

---

## 🚨 VERBODEN PATRONEN

**NOOIT doen:**
- ❌ Next.js features gebruiken (dit is Astro!)
- ❌ Server-side rendering (static only)
- ❌ Database calls (no backend)
- ❌ Docker/containers (static site)
- ❌ Subdomains per taal
- ❌ Client-side routing (use Astro routing)
- ❌ Heavy JavaScript frameworks (React/Vue in islands only)
- ❌ Stock photos (real product screenshots)

**WEL doen:**
- ✅ Static generation (pre-rendered HTML)
- ✅ Astro islands (minimal JS)
- ✅ Path-based i18n
- ✅ Cloudflare Pages deployment
- ✅ Stripe.com design patterns
- ✅ Performance-first mentality

---

## 📦 WERK IN KLEINE STAPPEN

**KRITIEK:** Token limits door te veel tegelijk doen.

**Verplicht:**
- Start met TODO-lijst (>3 stappen)
- Max 1 bestand per keer bewerken
- Max 50 regels code per tool call
- Stop na grote wijziging, rapporteer

**Bij token limit:** STOP, vraag Sjoerd toestemming voor vervolg.

---

## ✅ DEFINITION OF DONE

**Component klaar als:**
- [ ] Stripe.com design niveau
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessible (WCAG AA)
- [ ] Performance optimized
- [ ] TypeScript strict mode
- [ ] Tailwind CSS (no custom CSS)
- [ ] Tested in Chrome, Firefox, Safari

**Page klaar als:**
- [ ] Lighthouse 95+ all scores
- [ ] i18n translations complete (NL, DE, US)
- [ ] SEO meta tags
- [ ] hreflang tags
- [ ] Analytics tracking
- [ ] Cross-browser tested

---

## 🧭 GIT WORKFLOW

- Branches: `feature/<onderwerp>` of `fix/<onderwerp>`
- Elke wijziging via PR
- PR bevat: screenshots, Lighthouse scores, mobile demo
- Commits: atomic, Nederlandse messages

---

## 🚫 WAT IK NOOIT DOE

- Server-side logic in static site
- Dependencies zonder overleg
- Design afwijken van Stripe.com pattern
- Performance sacrifices voor features
- Doorwerken bij twijfel over design
- Nieuwe directories zonder opdracht
- Shortcuts ten koste van kwaliteit

---

## 📚 REFERENTIES

- **Masterplan:** `/pagayo-beheer/AI/plan/open-to-do/PAGAYO-MARKETING-MASTERPLAN.md`
- **Design Inspiration:** https://stripe.com
- **Astro Docs:** https://docs.astro.build
- **Tailwind Docs:** https://tailwindcss.com

---

**Aangemaakt:** 2 januari 2026  
**Laatst Bijgewerkt:** 2 januari 2026
