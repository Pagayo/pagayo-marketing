# Pagayo Marketing - Eleventy

Static marketing site gebouwd met Eleventy (11ty).

## Installatie

```bash
npm install
```

## Development

```bash
npm run dev
```

Dit start de dev server op port 4327: http://localhost:4327/eu/nl/

## Build

```bash
npm run build
```

Output komt in de `dist/` folder.

## Structuur

```
eleventy/
├── src/
│   ├── _data/
│   │   ├── countries.js      # Laadt alle country JSON files
│   │   └── countries/
│   │       └── nl.json       # Nederlandse content
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk      # Base HTML layout
│   │   └── partials/
│   │       ├── header.njk    # Site header
│   │       ├── footer.njk    # Site footer
│   │       ├── hero.njk      # Hero section
│   │       ├── features.njk  # Feature grid
│   │       ├── pricing.njk   # Pricing section
│   │       ├── social-proof.njk
│   │       └── cta.njk       # Call-to-action
│   ├── pages/
│   │   ├── homepage.njk      # Homepage template
│   │   ├── pricing.njk       # Pricing page
│   │   └── features.njk      # Features page
│   ├── styles/
│   │   └── global.css        # GitHub Dark theme CSS
│   └── images/
│       └── favicon.svg
└── dist/                     # Generated output
```

## Nieuwe taal/land toevoegen

1. Maak een nieuwe JSON file in `src/_data/countries/`, bijv. `de.json`
2. Kopieer de structuur van `nl.json` en vertaal de content
3. 11ty genereert automatisch pagina's voor het nieuwe land

## Design System

- GitHub Dark theme kleuren
- --bg: #0d1117
- --bg-secondary: #161b22
- --border: #30363d
- --text: #c9d1d9
- --text-secondary: #8b949e
- --accent: #00ff88
