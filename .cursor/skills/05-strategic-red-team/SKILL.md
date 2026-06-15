---
name: 05-strategic-red-team
description: Skill 05 in the Pagayo Cursor chain (after 00–04 release playbooks). Adversarial pre-implementation review of strategic or technical decisions before build or deploy. Finds missing info, weak assumptions, hidden risks, pillar conflicts, and go/no-go readiness. Read-only — no code, commits, deploys, or MCP writes. Use when Sjoerd asks for red team review, strategic review, go/no-go before building, or to challenge an architecture/product proposal.
---

# Skill 05 — Strategic Red Team

**Positie:** na release skills `00-01-commit-push`, `02-staging`, `03-e2e-test-suites`, `04-production`.  
**Timing:** **vóór bouw** (niet na productie-deploy). Antwoordt: **"Moeten we dit doen — wat mist er?"** — niet **"Hoe bouwen we het?"**

## Leesvolgorde (verplicht)

1. [pagayo-docs/strategic-red-team/PLAYBOOK.md](/Users/sjoerdoverdiep/my-vscode-workspace/pagayo-docs/strategic-red-team/PLAYBOOK.md)
2. [pagayo-docs/strategic-red-team/templates/REVIEW-OUTPUT.template.md](/Users/sjoerdoverdiep/my-vscode-workspace/pagayo-docs/strategic-red-team/templates/REVIEW-OUTPUT.template.md)
3. Input van user (of [INPUT-BRIEF.template.md](/Users/sjoerdoverdiep/my-vscode-workspace/pagayo-docs/strategic-red-team/templates/INPUT-BRIEF.template.md))

Optioneel context-pack:

```bash
/Users/sjoerdoverdiep/my-vscode-workspace/pagayo-maintenance/.github/scripts/red-team-context-pack.sh --repos REPO1,REPO2 --keyword "search term"
```

Uitgebreide referentie: [reference.md](reference.md)

## Harde grenzen — NOOIT

- Code wijzigen, committen, pushen, deployen
- D1-writes, Stripe-writes, productie-acties via MCP
- Secrets, `.env`, live keys, PII in rapporten
- Confidence scores of percentages
- Readiness interpreteren als deploy-toestemming
- VaultGuard AUDIT-REGISTER standaard meenemen (alleen bij expliciet platform-besluit)

## WEL doen

1. **Begrip-check** — scope, repos, terminologie (geen constructief implementatieplan)
2. **Context sweep** — L1–L8 uit PLAYBOOK; max 1–3 repos; gerichte search
3. **Adversarial pass** — missing info, assumptions, risks, counterarguments, pijlers
4. **Rapport schrijven** naar `pagayo-docs/strategic-red-team/reviews/YYYY-MM-DD-{slug}.md`
5. **DECISION-REGISTER.md** bijwerken — één regel
6. **Stop** — geen implementatie tenzij Sjoerd expliciet vraagt

## Readiness (exact één label)

- **Not ready**
- **Needs more context**
- **Ready for implementation**
- **Ready for staging review** (alleen als implementatie al bestaat)
- **Stop / rethink**

## Acceptatiecriteria

- [ ] Alle secties uit REVIEW-OUTPUT.template.md
- [ ] ≥3 vragen aan Sjoerd of onderbouwde "geen blockers"
- [ ] ≥2 canonieke bronnen geciteerd
- [ ] Disclaimer aanwezig
- [ ] DECISION-REGISTER bijgewerkt

## Skill-keten (Cursor)

| Skill | Wanneer |
|-------|---------|
| 00–01 | Commit / push |
| 02 | Staging deploy |
| 03 | E2E staging |
| 04 | Productie (expliciete Sjoerd-goedkeuring) |
| **05 (deze)** | **Pre-build besluit review** — optioneel vóór werkvoorbereiding |

Gebruik een **aparte chat** als dezelfde agent het voorstel schreef (voorkom self-review).

## Handoff

- **Ready for implementation** → werkvoorbereiding; footer: [WERKVOORBEREIDING-FOOTER.template.md](/Users/sjoerdoverdiep/my-vscode-workspace/pagayo-docs/strategic-red-team/templates/WERKVOORBEREIDING-FOOTER.template.md)
- Overzicht: [README.md](/Users/sjoerdoverdiep/my-vscode-workspace/pagayo-docs/strategic-red-team/README.md)
