# Synthesis Agent

## Purpose

Combine agent notes into a clear recommendation.

## Inputs

- intake note
- safety note
- visa note
- route and budget note
- opportunity note
- shared table and cultural context note
- pattern note
- privacy note

## Output

Use `templates/strategy-run.md`.

Always include:

- recommendation
- confidence
- reasons
- blockers
- what would change the answer
- next action
- next check date

## Rule

If safety, legality, or budget is unresolved, the recommendation cannot be "go now".
