# Coimas Opportunity Engine

A portable, read-only consumer of the public Project Atlas and World Travel Patterns repositories. It is separate from the Oracle's private travel planning, and can move to a dedicated repository without changing its input contracts.

## Source contracts

- Project Atlas: `data/projects.json`, including only current public catalogue records.
- World Travel Patterns: `data/places/spine.json`, `data/vetting/<place>.json` and the eight stay-and-enterprise pattern definitions.
- Stable project identity: GitHub repository numeric ID. Unavailable IDs are explicitly provisional; names are never confused with ownership or legal entities.
- Place identity: the existing place ID; no new geography registry.
- Generated dataset records both upstream Git revisions. No source repository is edited.

The first release is country/territory spine-level. Lower-level legal overrides, registration costs and sector-specific rules require their own evidence, and are not inferred from the national record.

## Build

With Node 22 or newer and the three repositories checked out locally:

```sh
node opportunity-engine/tests.mjs
node opportunity-engine/build.mjs --atlas ../project-atlas --travel ../world-travel-patterns --refresh-ids
python -m http.server 8000
```

Open `http://localhost:8000/opportunity-engine/`. GitHub Pages can also serve the static explorer if the generated dataset is present in the published source. The build uses public data only. GitHub Actions can refresh source data without AI calls.

## What the results mean

The engine supports twelve engagement pathways, project and jurisdiction search, research coverage, source dates, cost items and reviewed project-specific observations. An upstream status of mapped is **not** an eligibility finding. None-found means no evidence found in that pass, not legal ineligibility. Search snapshots and stale information are explicitly marked.

Project tags and suggested pathways are inferred from public descriptions until reviewed. They are not claims about registration, ownership, operational status or a project's mandate. Actual fit is null until the user reviews specific evidence for the chosen project, jurisdiction and pathway. Required gates must be confirmed and at least 60% of weighted criteria reviewed before a result is eligible for ranking. Contradictory evidence fails closed; unknown is never a zero score. Costs are individually sourced, and no automatic all-in total is inferred.

## Private boundary

The public dataset has no personal itinerary, financial circumstances, unpublished entities, private documents, private repositories or personal observations. Browser observations are held in memory and can be exported locally. They are not uploaded. Do not commit private profiles, observation files or personal establishment plans. Custom profiles require the explicit local-only flag and an output path outside the public generated directory. A public repository is not a safe place for private material.

## Next increment

Add reviewed project requirements, jurisdiction-specific sector observations, current cost categories and legal-entity relationship records as independent, source-backed datasets. The public atlas remains the public project directory, not the master record of private projects. Do not rank project-country fit solely on keyword matches or the existence of a registry.
