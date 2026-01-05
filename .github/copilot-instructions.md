# GitHub Copilot Instructions – Pagayo Marketing

## 🤖 AI MODEL VEREISTE & AGENT HIËRARCHIE

**KRITIEK: Agent Rolverdeling**
- **Claude Sonnet 4.5** = HOOFDAGENT (altijd gesprekspartner van Sjoerd)
- **Codex 5.1** = SUBAGENT ONLY (alleen voor website development taken)

**Harde Regels:**
1. ✅ Sonnet voert ALLE communicatie met Sjoerd
2. ✅ Sonnet behoudt controle over het gehele proces
3. ✅ Codex wordt ALLEEN ingezet via runSubagent tool voor:
   - Nieuwe pagina's bouwen (Hero, Features, Pricing, etc.)
   - Componenten ontwikkelen (Cards, Buttons, Forms)
   - Styling & layout aanpassingen
   - Stripe.com niveau design implementaties
4. ❌ Codex mag NOOIT direct met Sjoerd communiceren
5. ❌ Codex mag NOOIT de hoofdagent zijn

**Waarom deze verdeling:**
- Codex = excellent in website development & design
- Sonnet = excellent in instructies volgen & communicatie
- Beste resultaat = Sonnet als orchestrator, Codex als uitvoerder

**Workflow Voorbeeld:**
```
Sjoerd → Sonnet → analyseert taak → runSubagent(Codex) → Sonnet → rapporteert aan Sjoerd
```

**VERBODEN MODELLEN:**
- ❌ Claude Haiku mag NOOIT gebruikt worden
- ❌ GPT modellen niet als hoofdagent

**Bij twijfel over het model: STOP en vraag Sjoerd**

---

## 📐 DESIGN SYSTEM — VERPLICHT LEZEN

**KRITIEK: VOORDAT je iets codeert, lees ALTIJD `/DESIGN-SYSTEM.md`**

**Dit bestand bevat ALLE standaarden:**
- Container widths (1200px blog posts, 960px pricing, etc.)
- Padding & margins (2rem desktop, 1rem mobile)
- Typography scale (clamp() voor responsive)
- Responsive breakpoints (1024px, 768px, 480px)
- Button URLs (https://app.pagayo.com/register/)
- Component patterns (blog post structure, regional pages)
- Mobile optimizations
- Shadows, borders, colors

**Harde regel:**
- ❌ NOOIT willekeurige max-width waarden (800px, 900px, 1000px)
- ❌ NOOIT `app.pagayo.com` voor registratie buttons
- ❌ NOOIT inconsistente padding zonder reden
- ✅ CHECK design system EERST bij elke nieuwe pagina/component

**Waarom dit kritiek is:**
- Voorkomt inconsistenties (zoals 800px blog posts die 1200px moeten zijn)
- Nieuwe sessies gebruiken dezelfde standaarden
- Sjoerd hoeft niet telkens dezelfde dingen te corrigeren

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

## ⚠️ STOP VOORDAT JE BEGINT

**Bij ELKE taak, vraag jezelf af:**
- "Begrijp ik 100% wat Sjoerd bedoelt?"
- "Heb ik de bestaande code gelezen?"
- "Zijn mijn aannames gevalideerd?"

**STOP en vraag Sjoerd als:**
- ❌ Je twijfelt of het een nieuwe pagina of sectie is
- ❌ Je niet weet of je bestaande code moet aanpassen of nieuwe maken
- ❌ Je 2+ manieren ziet om iets te implementeren
- ❌ De opdracht onduidelijk is ("maak dit mooier" = te vaag)
- ❌ Je een inconsistentie ziet in de codebase

**GEEN aannames, GEEN gokken. Bij 1% twijfel = STOP.**

### Backups vóór elke wijziging (VERPLICHT)
- Maak voordat je een bestand wijzigt een kopie in `backups/<datum>/` met dezelfde bestandsnaam (bijv. `backups/2026-01-03/index.astro`).
- Werk altijd vanuit de kopie als je moet terugrollen; raak het origineel niet zonder backup.
- Doe dit voor elk bestand dat je aanpast in deze repo, zodat design/inhoud snel hersteld kan worden.

---

## 🔍 ARCHITECTURE CONSISTENCY - VERPLICHT

**VOORDAT je iets codeert, check ALTIJD:**

### Pre-Code Checklist (MANDATORY)
1. **Bestaat er al een vergelijkbare component/pagina?**
   - Zoek naar patterns: `ls src/components/`, `ls src/pages/nl/`
   - Lees minimaal 1 vergelijkbaar bestand volledig
   
2. **Welke architectuur gebruikt de codebase?**
   - Inline code of shared components?
   - Welke layout/styling pattern?
   - Waar komen nav/footer vandaan?

3. **Is dit een nieuwe pagina of sectie op bestaande pagina?**
   - Bij twijfel: STOP en vraag Sjoerd expliciet
   - "Wil je een nieuwe /prijzen pagina of prijzen sectie op homepage?"

4. **Zijn mijn wijzigingen consistent met bestaande code?**
   - Gebruik ik dezelfde components als andere pages?
   - Gebruik ik dezelfde styling approach?
   - Breek ik een bestaand pattern?

### VERBODEN Gedrag:
❌ Direct beginnen met coden zonder bestaande code te lezen
❌ Aannames maken over wat Sjoerd bedoelt
❌ Nieuwe patterns introduceren zonder check
❌ Inconsistenties creëren tussen pagina's

### VERPLICHT Gedrag:
✅ Lees minimaal 1 vergelijkbaar bestand VOLLEDIG
✅ Vraag expliciet bij onduidelijkheid
✅ Verifieer consistency na elke wijziging
✅ Proactief inconsistenties signaleren

---

## 📜 CONTEXT GATHERING - STRIKTE VOLGORDE

**ELKE taak begint met context, NIET met code:**

### Fase 1: Scripts (10 sec)
```bash
ls scripts/              # Wat is er beschikbaar?
cat README.md            # Wat staat in docs?
```

### Fase 2: Bestaande Code (30 sec)
```bash
ls src/pages/nl/         # Welke pages bestaan er?
ls src/components/       # Welke components zijn er?
```

### Fase 3: Lezen (1-2 min)
- Lees **VOLLEDIG** minimaal 1 vergelijkbaar bestand
- Niet scannen, LEZEN - elke import, elke class
- Zoek naar patterns en consistency

### Fase 4: Validatie (10 sec)
- "Begrijp ik de architectuur?"
- "Weet ik zeker wat Sjoerd wil?"
- NEE op 1 vraag = STOP en vraag

**ALLEEN NA Fase 4 mag je beginnen met coden.**

### Key Scripts:
```bash
npm run dev          # Dev server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # ESLint
npm run format       # Prettier
```

---

## ✅ SELF-CHECK PROTOCOL

**NA elke wijziging, verplichte checks:**

### 1. Consistency Check:
```bash
# Check of alle pages dezelfde components gebruiken
grep -r "<Header" src/pages/nl/
grep -r "<Footer" src/pages/nl/
```

### 2. Pattern Check:
- Gebruik ik dezelfde imports als andere pages?
- Gebruik ik dezelfde styling approach?
- Zijn mijn class names consistent?

### 3. Impact Check:
- Welke andere files gebruiken deze component?
- Breek ik iets voor andere pages?
- Moet ik andere pages ook updaten?

**Als 1 check faalt → STOP en meld aan Sjoerd.**

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
// SignupForm → app.pagayo.com/api/register
// ContactForm → app.pagayo.com/api/contact
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
**Laatst Bijgewerkt:** 3 januari 2026
