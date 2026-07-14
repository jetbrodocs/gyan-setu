---
title: "Screen Spec — Digital Library Catalogue"
created: 2026-07-14
updated: 2026-07-14
covers_reqs: ["REQ-001", "REQ-002", "REQ-003", "REQ-004", "REQ-009", "REQ-011", "REQ-012"]
status: draft
prd: "prd-02-digital-library/prd.md"
route: "/library"
---

# Screen: Digital Library Catalogue

## Module / PRD
Digital Library — `prd-02-digital-library/prd.md`

## Entry Points
| From | Trigger | Context passed in |
|---|---|---|
| Dashboard | Sidebar → "Digital Library" nav item | none |
| Dashboard | "View All" on a trending-books rail | none |
| Dashboard | Click a book cover on a trending/recommended rail | none (lands on catalogue, not directly on detail — per process map step 1) |
| Book Detail screen | Back navigation / breadcrumb | preserves prior filter/sort/search state if navigated back (not forward) |
| Direct URL | `/library` | none |
| Direct URL w/ query params | `/library?language=...&search=...&sort=...` | pre-applies filter/search/sort from URL — **[Open Question in PRD process map: unverified whether Collection filter is URL-shareable; verify before build]** |

## UX Layout
- **Top bar**: global search (site-wide, shared header component — separate from in-page search; out of scope for this screen's spec)
- **Left sidebar**: Filters panel
  - Language (checkbox, multi-select): Gujarati, Hindi, English, Sanskrit — each with live count
  - Format (checkbox, multi-select): eBook/EPUB, PDF — each with live count
  - Collection (checkbox, multi-select): Sahitya Akademi, GMC Exclusive, Public Domain, University Granth — each with live count
  - "Reset All" link — appears only once ≥1 filter is active
- **Main content area**:
  - Header row: in-page search box ("Search books, authors...") + Sort dropdown (Rating / Year) + result count ("N books")
  - "Browse by Collection" rail (REQ-011) — one entry per Collection value, each linking to that collection's curated shelf screen; sits above or beside the main grid, not inside it
  - Book grid: responsive card grid, one card per book
- **Book card** (repeating unit):
  - Cover (flat-color placeholder + title/author text overlay — no real cover art in current build)
  - Language tag, top-left corner (e.g. "GJ", "HI", "EN", "SA")
  - Format badge, top-right corner (EPUB / PDF)
  - Save/bookmark icon, top-right corner over the cover (REQ-009) — toggled fill state (outline = not saved, filled = saved)
  - Title
  - Author
  - Star rating

## Data Points Displayed
| Label | Value / Format | Source |
|---|---|---|
| Result count | "N books" | count of `GET /api/books` response after filters applied |
| Language tag | 2-letter code (GJ/HI/EN/SA) | `book.language` |
| Format badge | EPUB / PDF | `book.format` |
| Title | text | `book.title` |
| Author | text | `book.author` |
| Rating | star display | `book.rating` — average of citizen `Review.rating` once ≥1 exists (REQ-010), else seed value |
| Filter counts | integer per checkbox option | server-computed count per filter value, live-updated as other filters change |
| Save icon state | filled / outline | `SavedBook` row exists for (citizen, book) → filled (REQ-009) |
| Collection rail entries | one per Collection value + book count | `book.collection` distinct values (REQ-011) |
| "Matched in book content" indicator (REQ-012, search-results only) | badge/label on a result card | shown when a search hit came from `book.fullText` rather than title/author/summary |

## CTAs
| CTA | Behavior |
|---|---|
| Language / Format / Collection checkbox | Toggles that filter value; triggers `GET /api/books` refetch with updated query params; grid + result count re-render within 1s (REQ-001) |
| "Reset All" | Clears all active filters; refetches unfiltered catalogue |
| In-page search box | On input, filters grid to title/author match (REQ-003); after REQ-004 ships, ranks via Postgres full-text search across title/author/summary (`tsvector`+`ts_rank`), with trigram fallback for typos; after REQ-012 ships (fast-follow), the same box also matches inside book full-text content, with a "Matched in book content" indicator on result cards so a title/author/summary hit isn't confused with a body-text hit |
| Sort dropdown | Re-sorts grid by Rating (default) or Year (REQ-002); client-side re-render or refetch with `sort` param, no page reload |
| Book card (click anywhere on card, excluding the save icon) | Navigates to Book Detail screen at `/library/{bookId}` |
| Save/bookmark icon (REQ-009) | Toggles saved state on click; does NOT navigate to detail (event stops propagation); optimistic UI update — icon flips immediately, request fires in background; requires login — if logged out, click opens login prompt instead of saving |
| Collection rail entry (REQ-011) | Navigates to that collection's curated shelf screen (`/library/collections/{collection-slug}`) |

## Validations
- None — this screen has no form input requiring validation; filter/search/sort are all selection or free-text query, not submitted data.

## Conditional States
| State | What the user sees |
|---|---|
| Loading (initial) | Skeleton grid (card-shaped placeholders matching the real card layout) while `GET /api/books` resolves. **[Design decision — not observed in source; standard pattern, confirm before build]** |
| Loading (filter/search/sort change) | No full-screen loader — grid dims slightly (reduced opacity) while refetch is in flight, given sub-1s response time observed. Filters/sort/search stay interactive (no input lock). **[Design decision — not observed]** |
| Empty — no books match filters/search | "No books found — Try adjusting your filters or search" (confirmed text from process map Exception B) |
| Error (API failure) | Inline error banner in the grid area: "Couldn't load books — [Retry]" button re-triggers the same query. Filters/sidebar remain visible and usable. **[Design decision — not observed, needs build-time confirmation]** |
| Default / populated | Full grid per active filter/sort/search state |

## Known Gaps (see PRD for design detail)
- REQ-004: search misses thematic queries (e.g. "gita") — fix detailed in PRD, not yet reflected in this screen's live behavior.
- REQ-009, REQ-011: save icon and Collection rail are net-new — not present in current build at all.
- REQ-012: content-level search is fast-follow, not v1 — blocked on book full-text actually being ingested (see PRD's content-sourcing dependency note). Not present in current build; the "Matched in book content" indicator has no source precedent, standard UX pattern for distinguishing match type. **[Design decision — not observed, confirm before build]**
