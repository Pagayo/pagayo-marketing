# Pagayo Marketing Design System
**Laatst bijgewerkt:** 5 januari 2026

Dit document definieert ALLE design standaarden voor de Pagayo marketing website. Bij elke nieuwe component, pagina of styling MOET je deze standaarden gebruiken.

---

## 🎨 DESIGN FILOSOFIE
**Benchmark: Stripe.com**
- Clarity First — Clean, minimal, no clutter
- Professional & Trustworthy — Subtle animations, consistent spacing
- Performance Obsessed — Lazy-load, optimized fonts, minimal JS
- Mobile-First — Responsive breakpoints, touch-friendly CTAs

---

## 📐 LAYOUT STANDAARDEN

### Container Widths
```css
/* GEBRUIK ALTIJD DEZE WAARDES */
--container-max:     1200px;  /* Main container voor alle pagina's */
--container-narrow:   960px;  /* Pricing, blog overview, narrow content */
--container-article:  800px;  /* Lead paragraphs, intro tekst */
--container-prose:    720px;  /* Body copy, CTA descriptions */
--container-form:     600px;  /* Forms, modals, small content */
```

**Gebruik per pagetype:**
- **Blog posts**: `1200px` (article-container)
- **Landing pages**: `1200px` (page-container)
- **Pricing**: `960px` (smaller grid layout)
- **Forms/API Request**: `600px` (focused content)
- **Intro paragrafen**: `720-820px` (readable line length)

### Padding & Margins
```css
/* Outer page padding */
--page-padding-desktop: 120px 2rem 80px;
--page-padding-mobile:  100px 1rem 60px;

/* Section spacing */
--section-gap-large:  4rem;   /* Between major sections */
--section-gap-medium: 2.5rem; /* Between subsections */
--section-gap-small:  1.5rem; /* Between elements */

/* Content padding (binnen containers) */
--content-padding-desktop: 2rem;
--content-padding-mobile:  1rem;
```

**Harde regel:** NOOIT meer dan `2rem` horizontale padding op desktop, `1rem` op mobile.

---

## 🎯 RESPONSIVE BREAKPOINTS

```css
/* GEBRUIK ALTIJD DEZE BREAKPOINTS */
--breakpoint-desktop:  1024px; /* Desktop layouts */
--breakpoint-tablet:    768px; /* Tablet/iPad */
--breakpoint-mobile:    480px; /* Small phones */
```

**Media query volgorde:**
```css
/* Desktop First (gebruik dit patroon) */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 480px)  { /* Small mobile */ }
```

---

## 🎨 COLOR SYSTEM

```css
/* Primaire kleuren (uit global.css) */
--color-primary-purple: #635BFF;  /* CTAs, links, focus */
--color-dark-blue:      #0A2540;  /* Headings, dark text */
--color-light-gray:     #F6F9FC;  /* Backgrounds, sections */
--color-medium-gray:    #8898AA;  /* Secondary text */

/* Semantic colors */
--color-success-green:  #00D924;  /* Success states */
--color-warning-orange: #FF8A00;  /* Warnings */
--color-error-red:      #DF1B41;  /* Errors */

/* Text hierarchy */
--text-primary:    #0A2540;  /* Headings, primary text */
--text-secondary:  #8898AA;  /* Body, descriptions */
--text-inverse:    #FFFFFF;  /* Text on dark backgrounds */
```

---

## 📝 TYPOGRAPHY SCALE

```css
/* Headings (gebruik clamp voor responsive) */
--font-size-h1:  clamp(2.4rem, 5vw, 3.6rem);  /* Hero titles */
--font-size-h2:  clamp(1.8rem, 4vw, 2.4rem);  /* Section titles */
--font-size-h3:  clamp(1.4rem, 3vw, 1.8rem);  /* Subsection titles */
--font-size-h4:  1.25rem;                     /* Small headings */

/* Body text */
--font-size-lead:    1.25rem;  /* Intro paragraphs (lead) */
--font-size-body:    1rem;     /* Normal body copy */
--font-size-small:   0.875rem; /* Captions, meta info */

/* Line heights */
--line-height-tight:  1.1;  /* Headings */
--line-height-normal: 1.6;  /* Body copy */
--line-height-loose:  1.8;  /* Lead paragraphs */

/* Font weights */
--font-weight-black:    900;  /* Hero titles */
--font-weight-bold:     700;  /* Headings */
--font-weight-semibold: 600;  /* Emphasis */
--font-weight-regular:  400;  /* Body */
```

**Harde regel:** Gebruik ALTIJD `clamp()` voor responsive typography in headings.

---

## 🔘 BUTTON STANDAARDEN

### Button Sizes
```css
/* Primary buttons */
.btn-primary {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
}

/* Ghost/Secondary buttons */
.btn-ghost, .btn-secondary {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  background: transparent;
  border: 1px solid var(--border);
}

/* Small buttons */
.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
```

### Button URLs
**KRITIEK: Alle "Start gratis" buttons gebruiken:**
```html
<a href="https://app.pagayo.com/register/">Start gratis</a>
```

**NOOIT:**
- ❌ `https://beheer.pagayo.com`
- ❌ `/admin`
- ❌ Relatieve paden voor registratie

---

## 📦 COMPONENT PATTERNS

### Blog Post Structure
**GEBRUIK ALTIJD DEZE STRUCTUUR:**
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Header from '@/components/Header.astro';
import Footer from '@/components/Footer.astro';
import Breadcrumbs from '@/components/Breadcrumbs.astro';
---

<BaseLayout 
  title="SEO Title (60-70 chars)"
  description="Meta description (150-160 chars)"
>
  <Header />
  <Breadcrumbs 
    items={[
      { label: 'Blog', href: '/nl/blog' },
      { label: 'Post Title', href: '/nl/blog/slug' }
    ]} 
  />
  
  <main class="page-container">
    <div class="article-container">
      <article class="article">
        <div class="article-header">
          <span class="badge">Badge Category</span>
          <h1>Article Title</h1>
          <p class="lead">Lead paragraph (1-2 sentences intro)</p>
        </div>
        
        <section class="panel">
          <h2>Section Title</h2>
          <p>Content...</p>
        </section>
        
        <section class="cta-section">
          <h2>CTA Title</h2>
          <p>CTA description</p>
          <div class="cta-buttons">
            <a href="/nl/api-request" class="btn-primary">Vraag een demo aan</a>
            <a href="/nl/pricing" class="btn-ghost">Bekijk prijzen</a>
          </div>
        </section>
      </article>
    </div>
  </main>
  
  <Footer />
</BaseLayout>

<style>
  /* Gebruik ALTIJD deze styling voor blog posts */
  .article-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 120px 2rem 2rem;
  }
  
  .article {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .article-header {
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .lead {
    font-size: 1.25rem;
    line-height: 1.8;
    color: var(--text-secondary);
    max-width: 720px;
    margin: 1.5rem auto 0;
  }
  
  .panel {
    margin-bottom: 3rem;
    padding: 2rem;
    background: var(--light-gray);
    border-radius: 12px;
  }
  
  .cta-section {
    margin: 4rem 0 2rem;
    padding: 3rem 2rem;
    background: var(--dark-bg);
    border-radius: 16px;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .article-container {
      padding: 100px 1rem 1rem;
    }
    
    .panel {
      padding: 1.5rem 1rem;
    }
    
    .cta-section {
      padding: 2rem 1rem;
    }
  }
</style>
```

### Regional Page Structure
```astro
<main class="page-container">
  <div class="region-hero">
    <h1>Region Title</h1>
    <p class="lead">Intro text (max-width: 720px)</p>
  </div>
  
  <section class="countries-section">
    <h2>Language Section (e.g., Nederlands)</h2>
    <div class="country-grid">
      {countries.map(country => (
        <div class="country-card">
          <span class="flag">{country.flag}</span>
          <h3>{country.name}</h3>
        </div>
      ))}
    </div>
  </section>
</main>

<style>
  /* Gebruik deze standaard styling */
  .page-container { max-width: 1200px; /* ALTIJD */ }
  .region-hero { max-width: 720px; margin: 0 auto; }
  .country-grid { 
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
</style>
```

---

## 🎭 SHADOWS & BORDERS

```css
/* Shadows */
--shadow-soft:        0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-medium:      0 4px 16px rgba(0, 0, 0, 0.12);
--shadow-strong:      0 8px 24px rgba(0, 0, 0, 0.16);
--shadow-glow-purple: 0 0 24px rgba(99, 91, 255, 0.3);

/* Border radius */
--radius-small:   8px;   /* Buttons, inputs */
--radius-medium:  12px;  /* Cards, panels */
--radius-large:   16px;  /* CTA sections */
--radius-xlarge:  22px;  /* Hero sections */

/* Borders */
--border-color:   #E5E7EB;
--border-width:   1px;
```

---

## 📱 MOBILE OPTIMIZATIONS

### VERPLICHT voor Mobile
```css
@media (max-width: 768px) {
  /* Reduce padding */
  .page-container { padding: 100px 1rem 60px; }
  .container { padding: 0 1rem; }
  
  /* Reduce font sizes */
  h1 { font-size: clamp(2rem, 5vw, 2.8rem); }
  h2 { font-size: clamp(1.6rem, 4vw, 2rem); }
  
  /* Stack grid layouts */
  .grid-2-cols { grid-template-columns: 1fr; }
  
  /* Full-width buttons */
  .btn-primary, .btn-ghost { width: 100%; }
  
  /* Reduce border radius */
  .hero-main { border-radius: 18px; }
  .panel { border-radius: 10px; }
}
```

---

## ✅ CHECKLIST - Voor Elke Nieuwe Pagina

**Voordat je een pagina maakt:**
- [ ] Content width = `1200px` (of `960px` voor pricing)
- [ ] Padding = `120px 2rem 80px` (desktop), `100px 1rem 60px` (mobile)
- [ ] Typography gebruikt `clamp()` voor responsive sizing
- [ ] Breakpoints op `1024px`, `768px`, `480px`
- [ ] "Start gratis" → `https://app.pagayo.com/register/`
- [ ] Lead paragraphs max-width `720px`
- [ ] Sections met `4rem` spacing
- [ ] Mobile: padding `1rem`, font-size gereduceerd
- [ ] Shadows/borders uit design system
- [ ] Colors uit global.css variabelen

**Voor Blog Posts Specifiek:**
- [ ] `article-container` = `1200px` max-width
- [ ] `article` = `1200px` max-width
- [ ] Lead paragraph = `720px` max-width
- [ ] Badge + H1 + lead in `article-header`
- [ ] Sections in `panel` styling
- [ ] CTA section aan einde met 2 buttons
- [ ] Breadcrumbs boven article
- [ ] SEO: title 60-70 chars, description 150-160 chars

---

## 🚫 VERBODEN PATRONEN

**NOOIT doen:**
- ❌ Willekeurige max-width waarden (800px, 900px, 1000px) zonder reden
- ❌ Hardcoded colors (gebruik CSS variabelen)
- ❌ Inconsistente padding (2rem hier, 3rem daar)
- ❌ `beheer.pagayo.com` voor registratie buttons
- ❌ Media queries op rare breakpoints (850px, 920px)
- ❌ Magic numbers zonder uitleg
- ❌ Inline styles (gebruik class names)
- ❌ Different styling per pagina type (DRY principe)

---

## 📚 BRONNEN

**Referentie bestanden:**
- `/src/styles/global.css` - CSS variabelen en utilities
- `/src/components/Header.astro` - Nav + CTA button pattern
- `/src/components/Footer.astro` - Footer structure
- `/src/pages/nl/index.astro` - Homepage reference
- `/src/pages/nl/blog/hotel-kamer-verhuur-amsterdam.astro` - Blog post template

**Design Inspiratie:**
- Stripe.com - Overall design pattern
- Linear.app - Clean UI components
- Vercel.com - Typography & spacing

---

## 🔄 UPDATES LOG

| Datum | Wijziging | Reden |
|-------|-----------|-------|
| 2026-01-05 | Initial creation | Standardize inconsistent widths (800px → 1200px blog posts) |
| 2026-01-05 | Added button URL standard | Ensure all CTAs point to app.pagayo.com/register/ |

---

**Bij twijfel over een design keuze: CHECK DIT BESTAND EERST.**
