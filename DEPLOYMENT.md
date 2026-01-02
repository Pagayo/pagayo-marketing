# Pagayo Marketing - Deployment Instructies

## ✅ PREVIEW LOKAAL BESCHIKBAAR

De site draait nu lokaal op: **http://localhost:4321/**

Je kunt de volgende pagina's bekijken:
- http://localhost:4321/ (redirect naar /nl)
- http://localhost:4321/nl (Nederlands homepage)
- http://localhost:4321/nl/features
- http://localhost:4321/nl/pricing
- http://localhost:4321/nl/contact
- http://localhost:4321/de (Duits homepage)
- http://localhost:4321/us (Engels homepage)

---

## 🚀 DEPLOYMENT NAAR CLOUDFLARE PAGES

### Stap 1: GitHub Repository Aanmaken

```bash
# In terminal (in pagayo-marketing directory):
gh repo create Pagayo/pagayo-marketing --public --source=. --remote=origin --push
```

Of handmatig via GitHub.com:
1. Ga naar https://github.com/new
2. Repository naam: `pagayo-marketing`
3. Owner: `Pagayo`
4. Public repository
5. **Niet** "Initialize with README" (we hebben al code)
6. Create repository

Dan lokaal:
```bash
git remote add origin git@github.com:Pagayo/pagayo-marketing.git
git branch -M main
git push -u origin main
```

### Stap 2: Cloudflare Pages Setup

1. **Login bij Cloudflare Dashboard**
   - Ga naar: https://dash.cloudflare.com/
   - Login met je Cloudflare account

2. **Connect GitHub Repository**
   - Klik op "Workers & Pages" in de sidebar
   - Klik op "Create Application"
   - Kies "Pages" tab
   - Klik "Connect to Git"
   - Selecteer "GitHub"
   - Authorize Cloudflare (first time)
   - Selecteer de `Pagayo/pagayo-marketing` repository

3. **Build Configuration**
   ```
   Project name:           pagayo-marketing
   Production branch:      main
   Build command:          npm run build
   Build output directory: dist
   Root directory:         / (leave empty)
   ```

4. **Environment Variables**
   Geen environment variables nodig voor nu (static site).

5. **Deploy**
   - Klik "Save and Deploy"
   - Cloudflare Pages gaat nu:
     1. npm install
     2. npm run build
     3. Deploy naar edge (300+ locaties wereldwijd)
   
   **⏱️ Eerste deployment duurt ~2-3 minuten.**

### Stap 3: Custom Domain Setup

Na succesvolle deployment:

1. **Cloudflare Pages geeft je een URL:**
   ```
   https://pagayo-marketing.pages.dev
   ```

2. **Custom Domain toevoegen:**
   - In Cloudflare Pages project dashboard
   - Ga naar "Custom domains" tab
   - Klik "Set up a custom domain"
   - Voer in: `www.pagayo.com`
   - Cloudflare configureert automatisch:
     - DNS records
     - SSL certificate (automatic)
     - HTTPS redirect

3. **DNS Configuratie (als pagayo.com al in Cloudflare is):**
   Cloudflare doet dit automatisch. Anders:
   ```
   CNAME www → pagayo-marketing.pages.dev
   ```

4. **Root domain redirect (optional):**
   ```
   Redirect pagayo.com → www.pagayo.com
   ```

---

## 🔄 CONTINUOUS DEPLOYMENT

**Elke push naar `main` branch triggert automatische deployment:**

```bash
# Maak wijzigingen
git add .
git commit -m "Update homepage"
git push origin main

# Cloudflare Pages deployt automatisch binnen 1-2 minuten
```

**Preview Deployments:**
- Elke PR krijgt automatisch een preview URL
- Voorbeeld: `https://abc123.pagayo-marketing.pages.dev`

---

## 📊 PERFORMANCE & MONITORING

**Na deployment check:**

1. **Lighthouse Score:**
   - Open Chrome DevTools
   - Lighthouse tab
   - Generate report
   - **Target: 95+ voor alle metrics**

2. **Cloudflare Analytics:**
   - Cloudflare Dashboard → Analytics
   - Real-time visitors
   - Geography breakdown
   - Response time metrics

3. **Custom Domain Check:**
   ```bash
   curl -I https://www.pagayo.com
   # Verwacht: HTTP/2 200, CF-Cache-Status: HIT
   ```

---

## 🌍 GEO-IP TESTING

**Lokaal testen (development):**
```
http://localhost:4321/en/pricing?mock_country=NG  # Nigeria
http://localhost:4321/en/pricing?mock_country=KE  # Kenya
http://localhost:4321/en/pricing?mock_country=ZA  # Zuid-Afrika
```

**Production testen:**
- Gebruik VPN (NordVPN, ExpressVPN)
- Of: https://www.browserling.com/ (test from different countries)

---

## 🛠️ TROUBLESHOOTING

**Build Failed op Cloudflare Pages:**
1. Check build log in Cloudflare Dashboard
2. Verify `package.json` scripts
3. Test build lokaal: `npm run build`
4. Check Node version (Cloudflare uses Node 20 by default)

**Custom Domain SSL Issues:**
- Wacht 5-10 minuten (SSL provisioning)
- Check DNS propagation: https://www.whatsmydns.net/
- Verify CNAME record points to `.pages.dev` domain

**404 Errors:**
- Check `dist/` folder na build
- Verify routes in Astro pages
- Check Cloudflare Pages routing (should handle `/nl`, `/de`, `/us`)

---

## 📈 VOLGENDE STAPPEN

1. ✅ GitHub repo aanmaken en pushen
2. ✅ Cloudflare Pages connecten
3. ✅ Custom domain configureren (www.pagayo.com)
4. ⏳ Geo-IP middleware implementeren (na deployment)
5. ⏳ Analytics setup (Plausible/Cloudflare Analytics)
6. ⏳ Blog content toevoegen
7. ⏳ Documentation site

---

**Deployment Status:** 🟢 Ready to Deploy!

**Geschatte tijd tot live:** 15-20 minuten (GitHub setup + Cloudflare deployment + DNS)

**Contact voor vragen:** Sjoerd (repository owner)
