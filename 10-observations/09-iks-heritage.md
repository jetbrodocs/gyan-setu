---
title: "Observation — Indian Knowledge Systems (IKS Heritage) Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/iks-heritage, logged in as rahul@demo.com"
---

# Indian Knowledge Systems (IKS Heritage)

## Activity
Citizen explores historical manuscripts by era via a timeline selector, filters by language, and (in principle) opens 360° virtual tours of heritage sites.

## Inputs
- Seeded manuscript catalog per era (`GET /api/manuscripts?era=VEDIC` etc.)
- User era-tab and language-filter clicks

## Outputs
- Filtered manuscript grid for the selected era + language
- (Intended) manuscript detail view and virtual tour experience — see Problems

## People
- Any logged-in citizen/reader

## Elements on screen
| Element | Detail |
|---|---|
| Header | "Indian Knowledge Systems — Explore India's rich intellectual heritage through manuscripts, scriptures, and virtual tours" |
| Historical Timeline | 6 era nodes: Vedic (1500 BCE), Mauryan (300 BCE), Gupta (320 CE), Solanki (940 CE), Mughal (1526 CE), Modern (1947 CE) — active era highlighted orange |
| Language filter | Pills: All, Sanskrit, Gujarati, Hindi, English |
| Manuscript grid | Section header "{Era} Era Manuscripts" + era-year badge, cards with cover art, title, language tag, description snippet, "View Manuscript" button |
| 360° Virtual Tours | Section below manuscripts: cards with background image + title (e.g. "Modhera Sun Temple", "Adalaj Stepwell") |

## Problems / Limitations Observed
- **"View Manuscript" button appears non-functional.** Clicked on the Rigveda Samhita card's "View Manuscript" button — no navigation, no modal, no visible state change at all. Either broken or requires a different trigger not identified this pass; worth a follow-up check (e.g. inspect for a silent JS error).
- **BCE years are correctly formatted here** ("1500 BCE", "300 BCE") — unlike the Digital Library book detail page, which showed a raw "-300" for Arthashastra. Confirms the negative-year display bug from `02-digital-library.md` is localized to that one screen, not a systemic data issue.
- 360° Virtual Tours cards were only visually scrolled into view, not clicked — DEMO_GUIDE already documents these as "coming soon placeholders," consistent with pattern seen elsewhere (Mind Map/Quiz, Magazines/Journals) of PRD-listed sub-features being stubbed.
- "Folk & Oral Traditions" section (named in the original PRD module spec) was not observed on this page — may require further scrolling or may not be implemented; flag for follow-up.

## Handoffs
- **Before**: Dashboard sidebar → IKS Heritage
- **After**: "View Manuscript" — intended destination unclear given non-functional button (untested this pass)

## Raw Notes
- Era filter and language filter both trigger real API refetches (`?era=MUGHAL&language=Gujarati`), confirming server-side filtering rather than client-side data slicing.
- Manuscript descriptions are real historical content (e.g. Rigveda Samhita: "The oldest extant text in any Indo-European language, comprising 1,028 hymns (suktas)...") — consistent with the "public datasets" principle seen elsewhere in the app.
