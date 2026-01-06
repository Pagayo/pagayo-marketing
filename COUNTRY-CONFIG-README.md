# Country Config System - Implementation Guide

## ✅ Status: Proof of Concept Complete

**Geïmplementeerd voor:**
- 🇳🇱 Nederland (nl.json)
- 🇬🇧 United Kingdom (gb.json)
- 🇩🇪 Deutschland (de.json)

**Getest:**
- ✅ Build succeeds (50 pages)
- ✅ NL homepage gebruikt nl.json
- ✅ Footer toont correcte NL vertalingen
- ✅ Year placeholder werkt (© 2026)
- ✅ Paths correct gegenereerd (/eu/nl/features)

---

## 📁 Structuur

```
/src/data/countries/
  nl.json     ← Nederland
  gb.json     ← United Kingdom
  de.json     ← Deutschland
  [100+ more landen...]

/src/utils/
  country.js  ← Helper functions (getBasePath, getFullPath, etc.)

/src/components/
  FooterDynamic.astro   ← Nieuwe dynamische footer (gebruikt country config)
  Footer.astro          ← Oude footer (kan verwijderd na migratie)
```

---

## 🔧 JSON Schema

Elk land heeft exact dezelfde structuur:

```json
{
  "code": "nl",              // ISO country code
  "region": "eu",            // Continent: eu, af, as, am, me, oc
  "name": "Nederland",       // Country name (in eigen taal)
  "locale": "nl-NL",         // BCP 47 locale
  "currency": "EUR",         // ISO currency
  "language": "Nederlands",  // Language name (in eigen taal)
  
  "nav": {
    "features": "Features",
    "pricing": "Prijzen",
    "contact": "Contact"
  },
  
  "footer": {
    "platform": { "title": "...", "links": [...] },
    "general": { "title": "...", "links": [...] },
    "company": { "title": "...", "links": [...] },
    "payments": { "title": "...", "links": [...] },
    "accounting": { "title": "...", "links": [...] },
    "shipping": { "title": "...", "links": [...] },
    "integrations": { "title": "...", "links": [...] },
    "featuresSection": { "title": "...", "links": [...] },
    "legal": { "title": "...", "links": [...] },
    "international": { "title": "...", "links": [...] },
    "copyright": "© {year} Pagayo. Alle rechten voorbehouden."
  },
  
  "meta": {
    "tagline": "Multi-tenant e-commerce platform voor moderne ondernemers."
  }
}
```

**Footer links format:**
```json
{
  "title": "Platform",
  "links": [
    { "label": "Features", "path": "/features" },
    { "label": "Prijzen", "path": "/pricing" }
  ]
}
```

---

## 🚀 Hoe Een Pagina Converteren

### Stap 1: Import country config
```astro
---
import FooterDynamic from '../../../components/FooterDynamic.astro';
import nlCountry from '../../../data/countries/nl.json';

const country = nlCountry;
---
```

### Stap 2: Vervang Footer
```astro
<!-- OUD -->
<Footer />

<!-- NIEUW -->
<FooterDynamic country={country} />
```

### Stap 3: Test build
```bash
npm run build
```

---

## 📋 TODO: Volgende Landen

### Europa (Prioriteit 1 - al directories)
- [ ] at.json (Oostenrijk - Duits)
- [ ] be.json (België - Nederlands/Frans)
- [ ] ch.json (Zwitserland - Duits/Frans/Italiaans)
- [ ] cz.json (Tsjechië - Tsjechisch)
- [ ] dk.json (Denemarken - Deens)
- [ ] es.json (Spanje - Spaans)
- [ ] fi.json (Finland - Fins)
- [ ] fr.json (Frankrijk - Frans)
- [ ] gr.json (Griekenland - Grieks)
- [ ] hu.json (Hongarije - Hongaars)
- [ ] ie.json (Ierland - Engels)
- [ ] it.json (Italië - Italiaans)
- [ ] no.json (Noorwegen - Noors)
- [ ] pl.json (Polen - Pools)
- [ ] pt.json (Portugal - Portugees)
- [ ] ro.json (Roemenië - Roemeens)
- [ ] se.json (Zweden - Zweeds)

### Afrika (Prioriteit 2)
Zie `/src/pages/eu/nl/africa.astro` voor complete lijst (60+ landen)

### Azië (Prioriteit 3)
Zie `/src/pages/eu/nl/asia.astro` voor complete lijst

### Amerika (Prioriteit 4)
Zie `/src/pages/eu/nl/americas.astro` voor complete lijst

### Middle East (Prioriteit 5)
Zie `/src/pages/eu/nl/middle-east.astro` voor complete lijst

### Oceanië (Prioriteit 6)
Zie `/src/pages/eu/nl/oceania.astro` voor complete lijst

---

## ⚠️ Belangrijke Verschillen Per Land

### Payment Methods
```json
// NL
"payments": [
  { "label": "Stripe", "path": "/stripe" },
  { "label": "Mollie", "path": "/mollie" },
  { "label": "PayPal", "path": "/paypal" }
]

// GB (geen Mollie, geen iDEAL)
"payments": [
  { "label": "Stripe", "path": "/stripe" },
  { "label": "PayPal", "path": "/paypal" }
]

// Nigeria (Flutterwave, Paystack)
"payments": [
  { "label": "Flutterwave", "path": "/flutterwave" },
  { "label": "Paystack", "path": "/paystack" }
]
```

### Accounting Software
```json
// NL: Exact, SnelStart, Boekhouden.nl
// GB: Xero, QuickBooks
// DE: DATEV, Lexoffice
```

### Shipping Providers
```json
// NL: PostNL, DHL, SendCloud, MyParcel
// GB: Royal Mail, DHL, DPD
// DE: DHL, DPD, Hermes
```

---

## 🔍 Validatie Checklist

Voor elk nieuw land bestand:

- [ ] `code` = ISO 3166-1 alpha-2 (lowercase)
- [ ] `region` = eu, af, as, am, me, of oc
- [ ] `locale` = BCP 47 format (nl-NL, en-GB, etc.)
- [ ] Alle footer sections aanwezig
- [ ] Links correct vertaald
- [ ] Payment methods relevant voor land
- [ ] Shipping providers lokaal beschikbaar
- [ ] Legal terms correct (Privacy vs Privacy Policy)
- [ ] Copyright vertaald
- [ ] Tagline vertaald

---

## 🛠️ Helper Functions

### getBasePath(country)
Genereert base path zoals `/eu/nl`

### getFullPath(country, path)
Genereert volledige path zoals `/eu/nl/features`

### replacePlaceholders(text)
Vervangt `{year}` met huidige jaar

---

## 📝 Notities

- **Geen TypeScript**: Pure JSON + JavaScript helpers
- **Plat**: Alle config in 1 JSON bestand per land
- **Uniform**: Zelfde structuur voor alle 100+ landen
- **Flexibel**: Elke land kan eigen payments/shipping/legal hebben

---

**Status:** Ready to scale
**Volgende stap:** Sjoerd besluit welke landen prioriteit hebben
