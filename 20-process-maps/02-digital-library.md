---
title: "Process Map — Digital Library"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/02-digital-library.md"]
---

# Digital Library

## Process Overview
- **Purpose**: Citizen finds a book via browse/filter/search, reviews its AI summary, and either reads it or leaves.
- **Frequency**: Any time the citizen wants to find a book.
- **Trigger**: Sidebar → Digital Library, or a book cover click from Dashboard.
- **End condition**: Citizen clicks "Read Now" (hands off to eBook Reader) or navigates away.

## Roles Involved
- Citizen/Reader

## Inputs and Outputs
- **Inputs**: Seeded book catalog (`GET /api/books`), citizen's filter/search/sort choices
- **Outputs**: Filtered grid; selected book's detail page with AI summary

## Process Steps

1. Citizen lands on `/library`, sees the full catalog grid (default sort: Rating) with result count.
2. Citizen narrows results using any combination of:
   - **Language filter** (checkbox: Gujarati/Hindi/English/Sanskrit)
   - **Format filter** (checkbox: eBook/PDF)
   - **Collection filter** (checkbox: Sahitya Akademi/GMC Exclusive/Public Domain/University Granth)
   - **In-page search** ("Search books, authors...")
   - **Sort dropdown** (Rating / Year)
   Each selection triggers a live API refetch and re-render; result count updates.
3. Citizen clicks a book card → navigates to `/library/{bookId}`.
4. Book detail page loads: cover, title, author, tags, rating, year, page count, and the "Overview" tab (AI Summary) shown by default.
5. Citizen optionally switches tabs:
   - **Mind Map tab** → **Exception A: placeholder, not implemented**
   - **Quiz tab** → **Exception A: placeholder, not implemented**
6. Citizen clicks "Read Now" → hands off to eBook Reader (`20-process-maps/03-ebook-reader.md`), OR leaves without reading.

### Exception A: Mind Map / Quiz Tabs Are Placeholders
A1. Citizen clicks "Mind Map" or "Quiz" tab.
A2. Screen shows "Click to generate a mind map/quiz using AI (coming soon)" with no interactive behavior.
A3. Citizen returns to Overview tab or leaves the page. Flow does not proceed further.

### Exception B: Search Returns No Results for Valid Topics
B1. Citizen searches a term that isn't a literal book/author title substring (e.g. "gita").
B2. Result: "No books found — Try adjusting your filters or search," even if thematically relevant content exists in the catalog (e.g. Bhagavad Gita as an audiobook, not this eBook catalog).
B3. Citizen must know exact titles/authors, or browse by filters instead.

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar or trending-cover click)
- **Feeds into**: `20-process-maps/03-ebook-reader.md` (via "Read Now")

## Systems and Tools
- `GET /api/books` (list, filterable via query params: `language`, `search`, `sort`)
- Book detail via direct route `/library/{bookId}` (Prisma cuid-style ID)

## Known Issues
- Mind Map and Quiz tabs are non-functional placeholders, despite being named as active AI features in the original PRD. Traced to `10-observations/02-digital-library.md`.
- Search is exact/partial title+author match only — no fuzzy or thematic matching. Traced to `10-observations/02-digital-library.md`.
- BCE-era books show a raw negative year (e.g. "-300" for Arthashastra) instead of formatted "300 BCE" on the detail page. Traced to `10-observations/02-digital-library.md`.

## Open Questions
- Does the in-page search consider description/summary text, or only title+author? [UNVERIFIED — behavior suggests title+author only]
- Is there a way to filter Digital Library by Collection via a shareable URL, or only via UI state? [UNVERIFIED]
