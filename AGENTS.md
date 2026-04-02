# AGENTS - pagayo-marketing

## Scope van deze repo
`pagayo-marketing` is de publieke marketing site (`www.pagayo.com`) voor positionering, content en conversie.
Geen tenant businesslogica of platform admin functionaliteit in deze repo.

## Leesvolgorde (verplicht)
1. `../AGENTS.md`
2. `../pagayo-vault/PAGAYO-NIVEAU.md` (platform waarheid/copy-context)
3. `./.github/copilot-instructions.md`
4. `./DESIGN-SYSTEM.md`

## Harde grenzen
- Marketing claims moeten kloppen met actuele platformcapaciteiten.
- Geen "shadow API" of business rules in frontend scripts verstoppen.
- Design consistent houden met afgesproken patroon, geen willekeurige maatvoering.

## Implementatieregels
- Gebruik `@pagayo/design` tokens en component patterns.
- Houd locale-content consistent (`nl/de/en`) zonder route-aannames; huidige publieke portalroute is `/` (single-entry).
- Geen hardcoded registratie- of API URL's buiten centrale config-afspraken.

## Verificatie voor oplevering
```bash
npm run lint
npm run type-check
npm run build
```

## Verplichte platform smoke tests
Bij route- of endpointwijzigingen ook onderhouden in:
- `../pagayo-maintenance/tests/smoke/marketing.test.ts`
