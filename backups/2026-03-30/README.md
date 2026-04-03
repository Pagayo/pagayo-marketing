# 🌟 Pagayo Marketing Site

> **Pagayo** is a multi-tenant, Order-First SaaS platform for e-commerce and hospitality.
> Quality benchmark: Stripe. Enterprise-grade code only.

**Enterprise marketing website for www.pagayo.com**

Static site built with Astro 4.x, optimized for performance and SEO. Multi-language support (NL, DE, US) with Stripe.com-inspired design.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🏗️ Tech Stack

- **Framework:** Astro 4.x (static-first, island architecture)
- **Styling:** `@pagayo/design` (CSS design system, geen Tailwind)
- **TypeScript:** Strict mode
- **Deployment:** Cloudflare Pages (edge, 300+ locations)
- **i18n:** Path-based routing (`/nl`, `/de`, `/us`)
- **Content:** Markdown + MDX (Git-based CMS)

---

## 📁 Project Structure

```
src/
├── assets/              # Images, fonts
├── components/          # Reusable components
│   ├── layout/         # Header, Footer
│   ├── marketing/      # Hero, Features, Pricing
│   ├── ui/             # Button, Card, Badge
│   └── forms/          # SignupForm, ContactForm
├── layouts/            # Page layouts
├── pages/              # Routes (file-based routing)
│   ├── nl/            # Nederlands
│   ├── de/            # Duits
│   └── us/            # US English
├── styles/            # Global CSS
└── utils/             # Helper functions (i18n, SEO)

content/
├── blog/              # Blog posts (Markdown)
└── docs/              # Documentation

public/                # Static assets
```

---

## 🌍 Multi-Language Support

**URL Structure:**
```
www.pagayo.com/nl/prijzen    → Nederlands pricing
www.pagayo.com/de/preise     → Duits pricing
www.pagayo.com/us/pricing    → US English pricing
```

**Add new language:**
1. Create `src/pages/{lang}/` directory
2. Add translations to `src/locales/{lang}.json`
3. Update language switcher in `src/components/layout/LanguageSwitcher.astro`

---

## 🎨 Design System

**Design Leidraad:** Stripe.com

**Styling:** Alle CSS komt uit `@pagayo/design` (Tailwind is verwijderd op 11 feb 2026).
Geladen via: `src/styles/pagayo-design.css` (gebuild door `@pagayo/design`).

Site-specifieke design standaarden staan in `/DESIGN-SYSTEM.md`.

**CSS Tokens (uit `@pagayo/design`):**
```css
/* Kleuren */
var(--accent)           /* Primary accent */
var(--bg-deep)          /* Deepest background */
var(--bg-surface)       /* Card backgrounds */
var(--text-primary)     /* Hoofdtekst */
var(--text-secondary)   /* Ondersteunende tekst */
var(--border)           /* Borders */

/* Spacing (4px grid) */
var(--space-1) t/m var(--space-24)

/* Typography */
var(--text-sm), var(--text-base), var(--text-lg), etc.
var(--font-sans)        /* Inter */
```

**VERBODEN:**
```css
/* ❌ Geen hardcoded kleuren */
color: #635BFF;
background: #0A2540;

/* ✅ Altijd design tokens */
color: var(--accent);
background: var(--bg-deep);
```

**Bronnen:**
- Design tokens: `/pagayo-design/src/tokens/`
- Theme JSON: `/pagayo-design/src/themes/revolutionary.json`
- Site-specifiek: `/DESIGN-SYSTEM.md`

---

## 🔗 Integration met Beheer

**Sign-up Flow:**
```
Marketing Site (form)
    ↓ POST
app.pagayo.com/api/register
    ↓
Organization created
    ↓
Redirect to onboarding
```

**Contact Form:**
```
Marketing Site (form)
    ↓ POST
app.pagayo.com/api/contact
    ↓
Email sent to Sjoerd
```

---

## 📊 Performance Targets

**Lighthouse Scores (all 100):**
- ✅ Performance: 100
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 100

**Core Web Vitals:**
- ✅ LCP: < 1.5s
- ✅ FID: < 100ms
- ✅ CLS: < 0.1

---

## 🚢 Deployment

**Automatic via Cloudflare Pages:**
```
Push to main → GitHub webhook → Cloudflare Pages build → Live in 60s
```

**Preview Deployments:**
- Every PR gets preview URL: `pr-123.pagayo-marketing.pages.dev`

**Production URL:**
- `www.pagayo.com` (via Cloudflare DNS)

---

## 📈 Analytics

- **Plausible Analytics** (privacy-friendly, no cookies)
- **Cloudflare Analytics** (built-in, bandwidth/requests)
- **Lighthouse CI** (automated performance checks)

---

## 🛠️ Development

**Available Scripts:**
```bash
npm run dev          # Start dev server (port 4321)
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
npm run lint         # ESLint check
npm run format       # Prettier format
```

**Add Component:**
```bash
# Create new component
touch src/components/marketing/NewComponent.astro

# Use in page
---
import NewComponent from '@/components/marketing/NewComponent.astro';
---
<NewComponent />
```

**Add Page:**
```bash
# Create new page (becomes route)
touch src/pages/nl/nieuwe-pagina.astro

# Accessible at: /nl/nieuwe-pagina
```

---

## 📚 Resources

- **Masterplan:** `/pagayo-beheer/AI/plan/open-to-do/PAGAYO-MARKETING-MASTERPLAN.md`
- **Astro Docs:** https://docs.astro.build
- **Design System:** `/pagayo-design/` (CSS tokens, components, themes)
- **Design Standaarden:** `/DESIGN-SYSTEM.md` (site-specifieke standaarden)
- **Design Inspiration:** https://stripe.com

---

## ⚠️ IMPORTANT

**NOOIT direct deployen naar productie zonder:**
1. ✅ Lighthouse score 95+
2. ✅ Cross-browser testing (Chrome, Firefox, Safari)
3. ✅ Mobile responsiveness check
4. ✅ Accessibility audit (WCAG AA)
5. ✅ Sjoerd approval

**ALTIJD via PR + staging preview:**
- Feature branch → PR → Preview URL → Review → Merge → Deploy

---

**Aangemaakt:** 2 januari 2026  
**Status:** 🟢 In Development  
**Contact:** Sjoerd (eigenaar & PM)
