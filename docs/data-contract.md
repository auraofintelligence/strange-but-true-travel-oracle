# Data Contract

This repo uses browser-generated markdown as the first data layer.

The preferred flow is to create working `.md` files from the builder pages, then save or import them into AI tools after human review.

## Builder Output Files

- `travel-intake.md`
- `destination-dossier-{place}.md`
- `oracle-run-{date}.md`
- `signal-log-{date}.md`
- `serendipity-map.md`
- `relationship-field.md`
- `shared-table-field-note.md`
- `agent-team-brief.md`

Each builder output includes:

- schema
- status
- privacy
- builder page
- output file name
- generated date
- AI import instructions
- agent handoff
- linked context
- review notes

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
