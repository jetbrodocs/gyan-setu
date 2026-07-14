---
title: "Process Map — Indian Knowledge Systems (IKS Heritage)"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/09-iks-heritage.md"]
---

# Indian Knowledge Systems (IKS Heritage)

## Process Overview
- **Purpose**: Citizen explores historical manuscripts by era and language.
- **Frequency**: Any time a citizen wants to browse heritage content.
- **Trigger**: Sidebar → IKS Heritage.
- **End condition**: Citizen opens a manuscript (currently broken — see Known Issues) or navigates away.

## Roles Involved
- Citizen/Reader

## Inputs and Outputs
- **Inputs**: Seeded manuscript catalog per era (`GET /api/manuscripts?era=...`), citizen's era/language selections
- **Outputs**: Filtered manuscript grid

## Process Steps

1. Citizen lands on `/iks-heritage`, default era "Vedic" (1500 BCE) active.
2. Citizen clicks a different era node on the Historical Timeline (Vedic → Mauryan → Gupta → Solanki → Mughal → Modern) → grid refetches (`?era=...`) and re-renders with that era's manuscripts.
3. Citizen optionally applies a Language filter (All/Sanskrit/Gujarati/Hindi/English) → grid refetches (`?era=...&language=...`).
4. Citizen scrolls down to see "360° Virtual Tours" cards below the manuscript grid.
5. Citizen clicks "View Manuscript" on a card → **Exception A: no observed effect**.
6. Citizen clicks a Virtual Tour card → **Exception B: documented placeholder** (per DEMO_GUIDE, not directly retested this pass).

### Exception A: "View Manuscript" Non-Functional
A1. Citizen clicks "View Manuscript" on any manuscript card.
A2. No navigation, modal, or visible state change occurs.
A3. Flow dead-ends; citizen has no way to read the manuscript's full content from this screen.

### Exception B: 360° Virtual Tours Are Placeholders
B1. Citizen clicks a Virtual Tour card (e.g. "Modhera Sun Temple," "Adalaj Stepwell").
B2. Per DEMO_GUIDE.md, these are documented "coming soon" placeholders.

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar)
- **Feeds into**: none currently — "View Manuscript" is a dead end (see Exception A)

## Systems and Tools
- `GET /api/manuscripts?era={ERA}&language={LANG}` — real server-side filtering, confirmed via network log

## Known Issues
- **"View Manuscript" button is non-functional** — highest-severity finding in this module, since it blocks the module's core intended action (reading a manuscript). Traced to `10-observations/09-iks-heritage.md`. Needs a source-level check to confirm broken vs. untriggered.
- 360° Virtual Tours are unbuilt placeholders (documented, expected).
- "Folk & Oral Traditions" section (named in original PRD) was not located on this page — may require more scrolling or may be unbuilt. [UNVERIFIED]

## Open Questions
- Is "View Manuscript" wired to any handler at all, or is it a fully static button? [UNVERIFIED — needs code-level check]
- Does the era timeline's "current era" state persist across a language filter change, or reset? [Behavior observed: state persists — confirmed via combined `?era=MUGHAL&language=Gujarati` query]
