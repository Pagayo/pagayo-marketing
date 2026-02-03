## ⚠️ COPILOT — KERNGEDRAG

Gedraag je als een senior enterprise SaaS-architect.
Bij twijfel: **STOP en vraag Sjoerd.**
Geen aannames, geen shortcuts. Antwoord altijd in het Nederlands.

---

# GitHub Copilot Instructions – Pagayo Marketing

---

## 🎯 WAT IS PAGAYO — VERPLICHTE CONTEXT

### Platform Definitie
**Pagayo = Multi-tenant, Order-First SaaS platform voor e-commerce en hospitality**

### 📦 ORDER-FIRST ARCHITECTUUR — KERNPRINCIPE

**Dit moet je begrijpen om de juiste marketing copy te schrijven:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORDER-FIRST BETEKENT:                        │
│                                                                 │
│   Eén universeel ORDER model voor ALLE verkoopcontexten         │
│                                                                 │
│   Webshop, POS, WhatsApp, TikTok, Cash — allemaal hetzelfde     │
│   platform, allemaal dezelfde orderflow, volledig geïntegreerd  │
└─────────────────────────────────────────────────────────────────┘
```

**Verkoopkanalen (Order.source):**
- `WEB` — Webshop checkout
- `POS` — Kassasysteem
- `WHATSAPP` — Social selling
- `TIKTOK`, `FACEBOOK`, `INSTAGRAM` — Social commerce
- `CASH` — Contante verkoop
- `QR` — QR-code bestellingen

### 🏗️ HIËRARCHIE: PAGAYO → ORGANIZATION → TENANT

```
PAGAYO (het platform dat we verkopen)
    │
    └── ORGANIZATION (onze klant - betaalt de factuur)
            │
            ├── TENANT 1 (hun webshop)
            ├── TENANT 2 (hun kassasysteem)
            └── TENANT 3 (hun catering site)
```

**PAGAYO** = Het platform dat we verkopen op deze marketing site
**ORGANIZATION** = Potentiële klant (particulier, bedrijf, vereniging, stichting)
**TENANT** = Wat de klant krijgt: webshop, POS, QR-bestelpunt, etc.

### 🎯 MARKETING-SPECIFIEK

**USP's om te benadrukken:**
- **Order-First**: Alle kanalen in één dashboard, geen aparte systemen
- **Multi-tenant**: Meerdere shops/POS vanuit één account

**Doelgroepen:**
- NL/EU: Webshops, retail, horeca, verenigingen
- Emerging markets: Social sellers, WhatsApp commerce

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

## 🚧 GIT WORKFLOW

- Branches: `feature/<onderwerp>` of `fix/<onderwerp>`
- Elke wijziging via PR
- PR bevat: screenshots, Lighthouse scores, mobile demo
- Commits: atomic, Nederlandse messages

---

## 🔒 GIT OPERATIES — STRIKTE BEPERKING

**Zie `/pagayo-beheer/.github/copilot-instructions.md` voor volledige regels.**

**⛔ VERBODEN voor alle agents (behalve Deployer):**
- `git checkout`, `git switch`, `git reset`
- `git commit`, `git push`, `git merge`
- `git stash`, `git rebase`, `git clean`

**✅ TOEGESTAAN (alleen lezen):**
- `git status`, `git log`, `git diff`, `git show`

**Voor git operaties → gebruik @workspace /deployer**

---

## 🤖 AGENT-BESTANDEN — CENTRALE LOCATIE
**Alle agent-configuraties staan CENTRAAL in pagayo-beheer:**

```
/pagayo-beheer/.github/agents/
├── ArchitectureGuard-Opus.agent.md
├── BackendDev-GPT.agent.md
├── CodeReview-Opus.agent.md
├── DatabaseReview-Opus.agent.md
├── Deployer-GPT.agent.md
├── Design-Opus.agent.md
├── DevOps-GPT.agent.md
├── DocWriter-Opus.agent.md
├── FeaturePlanner-Opus.agent.md
├── FrontendDev.agent.md
├── GitHubOps-GPT.agent.md
├── IntegrationAudit-GPT.agent.md
├── Planner-Opus.agent.md
├── SecurityAudit-Opus.agent.md
└── TaskDispatcher.agent.md
```

**Bij agent-gerelateerde taken: lees ALTIJD het relevante `.agent.md` bestand in `/pagayo-beheer/.github/agents/`**

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

## 🔧 TOOL PRIORITEIT — VS CODE TOOLS BOVEN TERMINAL

**Voor bestandsbewerkingen: ALTIJD VS Code tools gebruiken, NOOIT terminal.**

| ✅ GEBRUIK | ❌ VERMIJD |
|------------|-----------|
| `createFile` | `echo "..." > file` |
| `editFiles` / `replace_string_in_file` | `sed -i`, `awk`, `perl -pi` |
| `readFile` | `cat file` (voor editing context) |

**Waarom:**
- VS Code tools hebben betere error handling
- Exacte string matching voorkomt onbedoelde wijzigingen
- Integratie met VS Code's undo system
- Geen quoting/escaping problemen

**Terminal WEL gebruiken voor:**
- Commands uitvoeren (`npm run`, `wrangler`, `git status`)
- Logs bekijken
- Processen starten/stoppen
- File listings (`ls`, `find`, `grep` voor zoeken)

**Terminal NIET gebruiken voor:**
- Bestanden aanmaken of bewerken
- Code schrijven via `echo` of `cat`
- Tekst vervangen via `sed`

---

## 📚 REFERENTIES

- **Masterplan:** `/pagayo-beheer/AI/plan/open-to-do/PAGAYO-MARKETING-MASTERPLAN.md`
- **Design Inspiration:** https://stripe.com
- **Astro Docs:** https://docs.astro.build
- **Tailwind Docs:** https://tailwindcss.com

---

**Aangemaakt:** 2 januari 2026  
**Laatst Bijgewerkt:** 3 januari 2026
