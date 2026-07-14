---
title: "Observation — Newspapers & Periodicals Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/newspapers, logged in as rahul@demo.com"
---

# Newspapers & Periodicals

## Activity
Citizen browses newspaper editions by date/city/publication/language, selects one, and reads it in a full-page viewer with clip/translate/share/download actions.

## Inputs
- Seeded newspaper catalog (`GET /api/newspapers`), filterable by city/publication/language/date
- User tab, filter, calendar, and card selections

## Outputs
- Filtered newspaper grid
- Full-page newspaper viewer (front-page layout with headlines, photo placeholders)

## People
- Any logged-in citizen/reader

## Timing
- Filter selection triggers immediate API refetch (e.g. `?city=Gandhinagar`, `?publication=Sandesh`), sub-second

## Elements on screen — Browse view
| Element | Detail |
|---|---|
| Route | `/newspapers` (sidebar label reads "Periodicals" but URL/module label is "Newspapers & Periodicals") |
| Sub-tabs | Newspapers (active), Magazines, Journals |
| Filters sidebar | Language (Gujarati 4, Hindi 2, English 4), City (Gandhinagar 5, Ahmedabad 5), Publication (Gujarat Samachar, Sandesh, Divya Bhaskar, Times of India, The Indian Express) |
| Mini calendar | Month view (March 2026), only dates with available issues are enabled (17, 18) |
| Grid cards | Newspaper front-page thumbnail (actual generated layout image, not flat placeholder — `/datasets/newspapers/{slug}-{date}.svg`), title, edition, date · city |
| Top-right | "Access Archives" link (not yet tested) |

## Elements on screen — Viewer
| Element | Detail |
|---|---|
| Left sidebar | Sub-tabs repeated, mini calendar, "Available Issues" list (same issues as grid, clickable to switch) |
| Header | Publication name, edition badge (e.g. "Ahmedabad"), action buttons: Clip, Translate, Share, PDF (download, red button) |
| Main viewer | Full front-page layout: masthead ("SANDESH", est. year, price, page count "Page 1 of 32"), edition/date/volume line, multi-column headline grid with photo placeholders and article snippets |

## Problems / Limitations Observed
- **Newspaper cards are not real `<a>` links** — they're `<button>` elements that trigger client-side state changes (no distinct URL per newspaper/issue; viewer renders in the same `/newspapers` route). This means a newspaper page can't be deep-linked or bookmarked directly.
- **Magazines and Journals sub-tabs are non-functional placeholders** — both show "[Section] coming soon — This section is under development." Consistent with the Digital Library's Mind Map/Quiz gap: sub-features named in the PRD are stubbed, not built.
- Photo areas in the viewer are gray "Photo" placeholder boxes, not real images — consistent with DEMO_GUIDE's noted limitation ("Newspaper pages are sample layouts (not real editions)").
- Clip / Translate / Share / PDF buttons visible but **not tested this pass** — flag for follow-up to confirm which are functional vs. decorative.
- "Access Archives" link visible top-right, not yet tested — unclear if distinct from the date-filtered browse view already shown.

## Handoffs
- **Before**: Dashboard sidebar → "Periodicals"
- **After**: none observed — viewer is terminal; PDF download button implies an exit point (untested)

## Raw Notes
- Headline content is real generated copy relevant to Gandhinagar/Gujarat context (e.g. "International Trade Summit Begins Today at Mahatma Mandir", "Vadodara-Mumbai Expressway 70% Done") — not lorem ipsum, matches the "public datasets" principle from the demo PRD.
- Sidebar nav label ("Periodicals") vs. page title ("Newspapers & Periodicals") vs. route (`/newspapers`) are three different names for the same module — minor naming inconsistency worth flagging for the glossary.
