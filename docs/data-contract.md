# Data Contract

This repo uses markdown as the first data layer.

## Required Front Matter

Every destination dossier should start with:

```yaml
---
title:
country:
region:
status: draft
last_checked:
evidence_level: unknown
privacy: private
---
```

## Recommended Sections

- Summary
- Current Fit
- Safety
- Visa and Entry
- Cost and Survival
- Route and Timing
- Serendipity and Spontaneity
- Romance and Intercultural Relationships
- Strange But True Purpose
- Shared Table and Cultural Context
- Contacts and Invitations
- Pattern Notes
- Risks
- Open Questions
- Next Actions
- Source Notes

## Status Values

- `draft`
- `needs-official-check`
- `watch`
- `candidate`
- `shortlist`
- `active-plan`
- `completed`
- `archive`

## Evidence Levels

- `unknown`
- `pattern`
- `strategic`
- `relational`
- `cultural`
- `operational`
- `official`
- `mixed`

## Privacy Values

- `private`
- `redaction-needed`
- `public-safe-summary`

## Decision Record Shape

Every final or near-final decision should include:

- decision
- date
- options considered
- reason
- blockers
- evidence used
- pattern notes considered
- what would reverse the decision
- next check date
