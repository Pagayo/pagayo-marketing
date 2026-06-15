# Skill 05 — Strategic Red Team (referentie)

Canonieke docs (workspace SSoT):

- `pagayo-docs/strategic-red-team/README.md`
- `pagayo-docs/strategic-red-team/PLAYBOOK.md`
- `pagayo-docs/strategic-red-team/DECISION-REGISTER.md`

## Positie in de skill-keten

| # | Skill | Playbook / doel |
|---|-------|-----------------|
| 00–01 | commit-push | 00 pre-commit, 01 push |
| 02 | staging | Staging deploy |
| 03 | e2e-test-suites | Staging E2E |
| 04 | production | Productie promote |
| **05** | **strategic-red-team** | **Pre-build adversarial review** (geen deploy-playbook) |

Skill **05** volgt **04** in nummering en discoverability. Workflow-timing: red team **vóór** bouw; release skills **00–04** blijven commit/deploy.

## Context-script

```bash
pagayo-maintenance/.github/scripts/red-team-context-pack.sh --repos pagayo-storefront --keyword "topic"
```

## Afbakening

- Plan mode / werkvoorbereiding → na "Ready for implementation"
- thermo-nuclear / CodeReview → na code
- VaultGuard → cadence audit (parallel)
