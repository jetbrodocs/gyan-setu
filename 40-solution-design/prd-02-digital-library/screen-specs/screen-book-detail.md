---
title: "Screen Spec — Digital Library Book Detail"
created: 2026-07-14
updated: 2026-07-14
covers_reqs: ["REQ-005", "REQ-006", "REQ-007", "REQ-008", "REQ-009", "REQ-010"]
status: draft
prd: "prd-02-digital-library/prd.md"
route: "/library/{bookId}"
---

# Screen: Digital Library Book Detail

## Module / PRD
Digital Library — `prd-02-digital-library/prd.md`

## Entry Points
| From | Trigger | Context passed in |
|---|---|---|
| Catalogue screen | Click anywhere on a book card | `bookId` (Prisma cuid) |
| Dashboard | Click a book cover on a trending/recommended rail (direct-to-detail variant, if used) | `bookId` |
| Direct URL | `/library/{bookId}` | `bookId` from path — stable, shareable (REQ-005 acceptance criteria) |

## UX Layout
- **Left panel** (cover/metadata column):
  - Cover art
  - Save/bookmark icon, overlaid top-right of cover (REQ-009) — same toggle pattern as the catalogue card
  - Title
  - Author
  - Tag row: language, format, collection (e.g. "Public Domain") as pills
  - Rating (stars) — average of citizen reviews once ≥1 exists (REQ-010)
  - Year
  - Page count
  - "Read Now" button
- **Right panel** (tabbed content):
  - Tab strip: **Overview** (default/active) | **Mind Map** | **Quiz**
  - Overview tab: AI-generated summary paragraph
  - Mind Map tab: see Conditional States (currently stub → REQ-007 design)
  - Quiz tab: see Conditional States (currently stub → REQ-008 design)
- **Reviews section** (REQ-010) — below the tabbed content, not inside a tab (per REQ-010 acceptance
  criteria: "appear on the detail page below the AI summary"):
  - "Write a review" prompt/form (star selector + optional text field + Submit) — replaced by "Edit
    your review" if the citizen already submitted one for this book
  - List of submitted reviews, newest first: reviewer name/avatar, star rating, review text, date

## Data Points Displayed
| Label | Value / Format | Source |
|---|---|---|
| Cover | image/placeholder | `book.cover` |
| Title | text | `book.title` |
| Author | text | `book.author` |
| Language tag | pill | `book.language` |
| Format tag | pill | `book.format` |
| Collection tag | pill (e.g. "Public Domain") | `book.collection` |
| Rating | stars | `book.rating` |
| Year | formatted year — after REQ-006, BCE years render as "N BCE" not "-N" | `book.year` via `formatYear()` helper |
| Page count | integer | `book.pageCount` |
| AI Summary (Overview tab) | paragraph | `book.summary` — precomputed, no loading spinner (per observation) |
| Mind Map (after REQ-007) | node/branch visual | `book.mind_map.nodes`, cached |
| Quiz (after REQ-008) | ~5 MCQs w/ right/wrong feedback | `book.quiz.questions`, cached |
| Save icon state (REQ-009) | filled / outline | `SavedBook` row exists for (citizen, book) → filled |
| Review list (REQ-010) | reviewer, stars, text, date, per review | `Review` rows for this `bookId`, newest first |
| Citizen's own review, if submitted (REQ-010) | pre-filled in the form as "Edit your review" | `Review` row for (citizen, bookId) |

## CTAs
| CTA | Behavior |
|---|---|
| "Read Now" | Navigates to eBook Reader module (`prd-03-ebook-reader`) for this `bookId` |
| Overview tab | Shows AI summary (default active state) |
| Mind Map tab | **Current**: static "coming soon" message, no click behavior. **After REQ-007 (full-dev)**: if `book.mind_map` is null, clicking triggers a real live LLM call — shows "Generating..." while in flight — then caches and renders the visual; on future visits, renders the cached visual directly with no regeneration |
| Quiz tab | **Current**: static "coming soon" message, no click behavior. **After REQ-008 (full-dev)**: if `book.quiz` is null, clicking triggers a real live LLM call — shows "Generating..." while in flight — then caches and renders MCQs using the Mock Test Interface's navigator/scoring component, with immediate right/wrong feedback per question; future visits render the cached set directly |
| Back / breadcrumb | Returns to Catalogue screen, preserving prior filter/sort/search state |
| Save/bookmark icon (REQ-009) | Toggles saved state; optimistic UI; requires login — if logged out, opens login prompt instead of saving |
| "Write a review" / "Edit your review" (REQ-010) | Opens the review form (star selector required, text optional); Submit upserts the citizen's `Review` row for this book and refreshes the review list + aggregate rating |
| Review form Submit | Validates rating is selected (1–5); on success, form collapses back to "Edit your review" state and the new/updated review appears at the top of the list |

## Validations
- Quiz tab (after REQ-008): each MCQ requires a selected option before showing right/wrong feedback — no submission without a selection. Skipping a question without answering is allowed (moves to next, scored as unanswered/incorrect) — matches the ungated, low-stakes nature of the feature (no pass/fail gate). **[Design decision — not observed, confirm before build]**
- Review form (REQ-010): star rating is required (1–5); Submit is disabled until a rating is selected. Text field is optional, `[TODO: max length — no source precedent, confirm before build]`. One review per citizen per book — resubmitting edits the existing review rather than creating a second one.

## Conditional States
| State | What the user sees |
|---|---|
| Loading (initial page load) | Skeleton layout: gray blocks for cover/title/tags on the left, tab strip visible but content area shows a text-line skeleton for Overview. **[Design decision — not observed in source; confirm before build]** |
| Error — invalid/nonexistent `bookId` | Full-page "Book not found" state with a "Back to Digital Library" CTA linking to `/library`. **[Design decision — not observed, standard 404 pattern, needs build-time confirmation]** |
| Overview — populated | AI summary paragraph, real content (confirmed working, not placeholder) |
| Mind Map — current (stub) | "Click to generate a mind map using AI (coming soon)" — no interactive behavior on click |
| Mind Map — after REQ-007, not yet generated | "Generate" affordance shown |
| Mind Map — after REQ-007, generating (first click) | "Generating..." loading state while the live LLM call is in flight — real latency, not instant |
| Mind Map — after REQ-007, generated | Cached visual rendered directly, no regeneration prompt |
| Mind Map — after REQ-007, generation failed | Error state with "Retry" — live-call failure (rate limit, API error) must be visible and recoverable, not silent |
| Quiz — current (stub) | "Click to generate a quiz using AI (coming soon)" — no interactive behavior on click |
| Quiz — after REQ-008, not yet generated | "Generate" affordance shown |
| Quiz — after REQ-008, generating (first click) | "Generating..." loading state while the live LLM call is in flight |
| Quiz — after REQ-008, generated | Cached MCQ set rendered, answerable with immediate feedback |
| Quiz — after REQ-008, generation failed | Error state with "Retry" |
| Year field — current (bug) | Raw negative number for BCE books (e.g. "-300") |
| Year field — after REQ-006 | Formatted (e.g. "300 BCE") |
| Reviews — no reviews yet | Empty state under the form: "No reviews yet — be the first to share your thoughts" |
| Reviews — populated | List of reviews, newest first, no pagination stated **[TODO: confirm pagination/load-more if a book accumulates many reviews]** |
| Reviews — citizen not logged in | Review form replaced by a "Log in to write a review" prompt; existing reviews still visible (read is public, write requires auth) **[Design decision — not observed, confirm before build]** |

## Known Gaps (see PRD for design detail)
- REQ-006: BCE year formatting bug, still live in current build.
- REQ-007 / REQ-008: Mind Map and Quiz tabs are non-functional stubs in current build; full-dev design is generate-on-first-click/cache-thereafter, per the PRD (revised for growing-catalogue scale from the demo-scale precompute-at-seed pattern in `30-analysis/02-ai-integration-deep-dive.md`). Depends on the Reading Companion API-key fix (Option A) as a precondition.
- REQ-009 / REQ-010: save icon and Reviews section are net-new — not present in current build at all. REQ-010 also has an open moderation/reporting question flagged in the PRD, unresolved here.
