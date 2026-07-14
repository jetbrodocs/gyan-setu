---
title: "Observation — Digital Library Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/library, logged in as rahul@demo.com"
---

# Digital Library

## Activity
Citizen browses, filters, sorts, and searches the eBook catalog, then opens a book to view its AI-generated summary (merged "AI Book Summaries" feature) before choosing to read it.

## Inputs
- Seeded book catalog, served from real API (`GET /api/books`)
- User filter/search/sort selections
- AI summary content (pre-generated per book, shown on detail page — no loading spinner observed, likely pre-computed not live LLM call)

## Outputs
- Filtered/sorted book grid
- Book detail page: cover, metadata, AI summary, tab content (Mind Map, Quiz)
- Navigation into eBook Reader via "Read Now" (not yet traversed — separate module)

## People
- Any logged-in citizen/reader

## Timing
- Filter/search/sort each trigger a fresh API call and re-render, roughly &lt;1s each (observed via network log)

## Elements on screen — Grid view
| Element | Detail |
|---|---|
| Top search bar | Global search, same one as Dashboard header (separate from in-page search) |
| Filters sidebar | Language (Gujarati 8, Hindi 6, English 8, Sanskrit 3), Format (eBook/EPUB 18, PDF 7), Collection (Sahitya Akademi 8, GMC Exclusive 6, Public Domain 7, University Granth 4) — checkboxes with live counts, "Reset All" link appears once a filter is active |
| In-page search | "Search books, authors..." — separate from top bar search |
| Sort dropdown | "Sort by Rating" / "Sort by Year" |
| Result count | "25 books" updates live with filters |
| Book card | Cover (flat color placeholder + title/author text), language tag (top-left, e.g. "GJ"/"SA"/"HI"/"EN"), format badge (top-right, EPUB/PDF), title, author, star rating |

## Elements on screen — Book Detail
| Element | Detail |
|---|---|
| Cover panel (left) | Cover art, title, author, tags (language, format, collection e.g. "Public Domain"), rating, year, page count, "Read Now" button |
| Tabs (right) | Overview (AI Summary — shown by default), Mind Map, Quiz |
| AI Summary | Short paragraph, e.g. Arthashastra: "An ancient Indian treatise on statecraft, economic policy, and military strategy attributed to Chanakya..." |

## Problems / Limitations Observed
- **Search box returns zero results for valid content not literally in title/author.** Searching "gita" returned "No books found" even though Bhagavad Gita-type content might be expected in an Indic-literature catalog — search appears to be exact/partial string match on title+author only, no fuzzy or content-aware matching.
- **Year field renders raw negative number for BCE dates.** Arthashastra shows "-300" instead of a formatted year (e.g. "300 BCE"). Same issue is likely present anywhere old/ancient texts show a year field (worth checking IKS Heritage timeline too).
- **Mind Map and Quiz tabs are non-functional placeholders** — both show "Click to generate a mind map/quiz using AI (coming soon)" and do nothing on click. These were listed as active features in the original 16-module PRD (AI Book Summaries: Mind Map, Quiz) but are not implemented in this build.
- Book cards are not standard `<a>` navigable via visible text alone in automated testing — underlying `<a href="/library/{id}">` wraps the whole card correctly, click-through works fine for a real user (confirmed via direct href navigation).

## Handoffs
- **Before**: Dashboard (via sidebar) or any "View All" trending link
- **After**: "Read Now" → eBook Reader module (not yet observed)

## Raw Notes
- Book IDs are cuid-style strings (e.g. `cmqhiv4jp000qv90th1nns16n`), consistent with Prisma-generated IDs — confirms real DB-backed CRUD per the demo PRD's "no hardcoded UI data" principle.
- Collection tag "Public Domain" shown as a pill next to language/format badges on detail page but not filterable via URL param directly tested.
