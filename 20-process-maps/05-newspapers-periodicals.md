---
title: "Process Map — Newspapers & Periodicals"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/05-newspapers-periodicals.md"]
---

# Newspapers & Periodicals

## Process Overview
- **Purpose**: Citizen browses newspaper editions by date/city/publication/language and reads a full front-page layout.
- **Frequency**: Any time a citizen wants to read a newspaper.
- **Trigger**: Sidebar → "Periodicals."
- **End condition**: Citizen closes/leaves the viewer, or downloads a PDF (untested).

## Roles Involved
- Citizen/Reader

## Inputs and Outputs
- **Inputs**: Seeded newspaper catalog (`GET /api/newspapers`), citizen's filter/tab/issue selections
- **Outputs**: Filtered issue grid; full-page viewer render

## Process Steps

1. Citizen lands on `/newspapers`, default sub-tab "Newspapers" active.
2. Citizen optionally switches sub-tab:
   - **Magazines** → **Exception A: placeholder, not implemented**
   - **Journals** → **Exception A: placeholder, not implemented**
3. Citizen narrows results via Language/City/Publication filters (checkbox) or the mini calendar (only dates with available issues are enabled).
4. Citizen clicks an issue card (button, not a distinct `<a>` link — see Known Issues) → viewer renders in-place on the same `/newspapers` route.
5. Viewer shows: masthead, edition/date/volume line, headline grid with photo placeholders, article snippets.
6. Citizen can switch issues via the left "Available Issues" list without leaving the viewer.
7. Citizen optionally uses header actions: Clip, Translate, Share, PDF (download) — **not functionally tested this pass**.

### Exception A: Magazines / Journals Sub-Tabs Are Placeholders
A1. Citizen clicks "Magazines" or "Journals" tab.
A2. Screen shows "{Section} coming soon — This section is under development."
A3. Citizen must return to "Newspapers" tab to see any real content.

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar, labeled "Periodicals")
- **Feeds into**: none confirmed — PDF download button implies an exit point, untested

## Systems and Tools
- `GET /api/newspapers` (filterable by `city`, `publication`, `language`, `date`)
- Newspaper thumbnails/layouts: real generated SVG images (`/datasets/newspapers/{slug}-{date}.svg`), not flat placeholders

## Known Issues
- Newspaper cards are `<button>` elements, not `<a>` links — no distinct URL per issue, so a specific edition can't be deep-linked or bookmarked. Traced to `10-observations/05-newspapers-periodicals.md`.
- Magazines and Journals sub-tabs are stubbed placeholders. Traced to same observation.
- Photo areas in the viewer are gray placeholder boxes, not real images (known/documented limitation).
- Three names for one module: sidebar "Periodicals" / page title "Newspapers & Periodicals" / route `/newspapers`.

## Open Questions
- Do Clip / Translate / Share / PDF buttons actually work? [UNVERIFIED — flagged for follow-up]
- What does "Access Archives" (top-right link) do — is it distinct from the already-filterable browse view? [UNVERIFIED]
