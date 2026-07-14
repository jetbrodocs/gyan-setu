---
title: "PRD — Digital Library"
created: 2026-07-14
updated: 2026-07-14
design_source: "30-analysis/02-ai-integration-deep-dive.md"
status: draft
source_process_map: "20-process-maps/02-digital-library.md"
source_observation: "10-observations/02-digital-library.md"
---

# Digital Library

## Overview
The Digital Library is the citizen's entry point to the eBook catalogue: browse, filter, search, and
sort to find a title, then review its AI-generated summary before deciding to read. This is the
platform's core content-discovery module and feeds directly into the eBook Reader.

## User Roles
- **Citizen/Reader** — browses and reads. No creator/admin interaction with this module at this
  phase (content is seed/admin-managed, not citizen-contributed).

## Functional Requirements

### REQ-001: Catalogue browsing with live filters
The system must display the full eBook catalogue as a grid, filterable by Language, Format, and
Collection (checkbox, multi-select), with live result counts.
- **Acceptance criteria**: Selecting/deselecting any filter combination re-queries and re-renders the
  grid within 1 second, with an accurate "N books" count.
- **Source**: process map steps 1–2 (confirmed working — real server-side filtering, not client-side
  slicing).

### REQ-002: Sort by rating or year
The system must allow sorting the catalogue by Rating or Year.
- **Acceptance criteria**: Sort selection reorders the grid accordingly; default sort is Rating.
- **Source**: process map step 2 (confirmed working).

### REQ-003: In-catalogue search
The system must provide a search box scoped to the Digital Library that matches against book titles
and authors.
- **Acceptance criteria**: Typing a query filters the grid to matching titles/authors within 1
  second; "No books found" state shown when nothing matches.
- **Source**: process map step 2 (confirmed working, but see REQ-004 for a related gap).

### REQ-004: Search should surface thematically relevant results, not just literal matches
The current search only matches literal title/author substrings — a search for "gita" returns
nothing even where thematically relevant, because the exact title isn't a substring match.
- **Acceptance criteria**: A search for a well-known work, concept, or theme returns relevant results
  even when the query isn't a literal substring of the title (e.g. via description/summary text
  matching, or a curated synonym/alias list for well-known titles).
- **Source**: Gap analysis Category 4/observation — confirmed gap, not previously scoped.
- **Priority**: Medium — improves discoverability without changing the browsing/filtering flow.
- **Design (revised for full-development scale — catalogue expected to grow past a hand-curated
  size)**: Hand-curated aliases (demo-scale design, superseded) don't scale once content is
  creator/admin-added on an ongoing basis — a per-book manual alias list becomes unmaintainable.
  Replace with **Postgres full-text search** (`tsvector` + GIN index across title, author, and
  summary; `pg_trgm` extension for fuzzy/typo tolerance) instead of a literal `LIKE`/substring match.
  This stays inside the already-accepted stack (Postgres via Prisma, per
  `30-analysis/05-tech-stack-decision.md`) rather than adding Elasticsearch — that TDR explicitly
  deferred Elasticsearch "without a specific triggering requirement"; Postgres FTS satisfies the
  actual requirement (relevance/thematic matching at scale) without adding a new infra service. Only
  escalate to Elasticsearch later if query volume/relevance needs outgrow Postgres FTS in practice.
  Query becomes: rank by `ts_rank` across title/author/summary weighted (title highest), with
  trigram similarity as a fallback for near-misses/typos.
- **Data model change**: add a generated `tsvector` column (or search index table) covering
  title/author/summary; index via GIN. No manual per-book alias curation required — removes the
  seed/admin-time bottleneck the demo-scale design had.

### REQ-005: Book detail page
Clicking a book must open a detail page showing cover, title, author, tags (language/format/
collection), rating, year, page count, and an AI-generated summary by default.
- **Acceptance criteria**: Detail page loads via a stable, shareable URL per book; summary is
  real/generated content, not placeholder text.
- **Source**: process map steps 3–4 (confirmed working).

### REQ-006: Correct BCE/ancient-year formatting
Books with a BCE-era publication/composition year must display a human-readable format (e.g. "300
BCE"), not a raw negative number.
- **Acceptance criteria**: No book detail page shows a negative number where a year is displayed.
- **Source**: Gap analysis Category 5 (Data/Formatting Bug) — confirmed on at least one title
  (Arthashastra showed "-300"); the same underlying date concept renders correctly elsewhere on the
  platform (IKS Heritage), so this is a display-layer fix, not a data-model fix.
- **Priority**: Low — cosmetic, isolated fix.
- **Design**: Display-layer formatting only, no data-model change — the underlying `year` field stays
  a signed integer (matches how IKS Heritage already stores/reads the same date concept correctly).
  Add a shared `formatYear(year: number)` helper: if `year < 0`, render `${Math.abs(year)} BCE`; else
  render `${year}`. Apply it at every point Digital Library renders a book year (catalogue card,
  detail page). Reuse the same helper in any other module that renders `year` from a shared book/
  content record, so the fix doesn't need repeating.

### REQ-007: Mind Map generation
The Mind Map tab on a book detail page must generate and display a real visual mind map derived from
the book's content, replacing the current "coming soon" placeholder.
- **Acceptance criteria**: Clicking the Mind Map tab (for a book that hasn't had one generated yet)
  triggers generation and renders a visual node/branch structure summarizing the book's key concepts;
  once generated, it's cached/reused on subsequent visits rather than regenerated every time.
- **Source**: Gap analysis Category 1 (Communicated Stub) — currently a static "coming soon" message.
- **Priority**: Medium — extends the same AI pipeline that already powers AI Book Summary; see
  Extension Opportunities.
- **Design (revised for full-development scale)**: Demo-scale design (precompute-all-at-seed) doesn't
  fit a growing, creator/admin-added catalogue — there's no fixed "seed time" to precompute at once
  new books arrive continuously. Switch the trigger to **generate-on-first-click, cache thereafter**
  (this was already noted as the lazy-precompute fallback; it's now the primary path, not a fallback)
  — same LLM pipeline/prompt infra as Book Summary, same cache-once-reuse-after behavior, just
  triggered per-book the first time a citizen opens that tab rather than in bulk at seed. This also
  matches the original inbox PRD's stated intent (`00-inbox/gyan-setu-main/prd/02-digital-library.md`:
  "Generated live by LLM on first click. Cached in database for subsequent visits"). Requires the
  live-LLM-call path to actually work end-to-end (currently blocked — Reading Companion's `503`/
  missing-API-key issue per `30-analysis/02-ai-integration-deep-dive.md` Option A must be fixed
  first, since it's the same call pattern). The tab's current "coming soon" stub is replaced by: (a)
  a loading/"Generating..." state on first click (real generation in flight, not instant), (b) the
  rendered node/branch visual once cached, (c) an error/retry state if the live call fails.
- **Data model addition**: `book.mind_map: { generated_at: timestamp, nodes: object } | null` (cached
  per book, written once on generation).

### REQ-008: Quiz generation
The Quiz tab on a book detail page must generate and display a short comprehension quiz derived from
the book's content, replacing the current "coming soon" placeholder.
- **Acceptance criteria**: Clicking the Quiz tab generates a small set of multiple-choice questions
  about the book; citizen can answer and receive immediate right/wrong feedback (same interaction
  pattern already proven in Test Prep Hub's Question of the Day — see `prd-06-test-prep-hub`).
- **Source**: Gap analysis Category 1 (Communicated Stub).
- **Priority**: Medium.
- **Design (revised for full-development scale)**: Same generate-on-first-click/cache-thereafter
  switch as REQ-007 — bulk seed-time gen doesn't fit a growing catalogue. Quiz questions generate the
  first time a citizen opens the Quiz tab for a given book, via the same live-LLM pipeline as REQ-007
  (Agent SDK with the book's content as context, matching original inbox PRD intent), then cache and
  serve as a read on every later visit. UI reuses the Mock Test Interface's question-navigator/scoring
  components (`prd-07-mock-test-interface`) scaled down to a short set (~5 MCQs), same immediate
  right/wrong feedback pattern proven in Test Prep Hub's Question of the Day. Same live-call
  precondition as REQ-007 (Reading Companion's API-key fix, Option A) applies here.
- **Data model addition**: `book.quiz: { generated_at: timestamp, questions: [{ q, options, answer
  }] } | null` (cached per book, written once on generation).

### REQ-009: Save to Bookshelf
Citizens must be able to save a book to a personal bookshelf from the catalogue card or detail page,
for later reading, without committing to "Read Now" immediately.
- **Acceptance criteria**: A bookmark/save icon on both the catalogue card and detail page toggles
  saved state; saved books persist per citizen and are retrievable outside this module (feeds User
  Profile's bookshelf, `prd-11-user-profile-my-dashboard`); toggling is optimistic (instant UI
  feedback, no visible round-trip wait).
- **Source**: net-new, full-development scope — not in demo build.
- **Priority**: High — cheapest of the three v1 net-new features, and the only one another module
  (User Profile) already expects data from.
- **Design**: `SavedBook` join table (`citizenId`, `bookId`, `savedAt`) — many-to-many, no new fields
  on `book`. Save/unsave is a simple upsert/delete, no business logic. Catalogue card and detail page
  both read saved-state per book for the logged-in citizen to render the icon's toggled state.
- **Data model addition**: `SavedBook { citizenId, bookId, savedAt }` (composite unique on
  citizenId+bookId).
- **Cross-module dependency**: User Profile's bookshelf view (`prd-11-user-profile-my-dashboard`)
  should read from this same table — confirm that PRD reuses it rather than defining its own
  save-mechanism, to avoid two disconnected "saved books" concepts.

### REQ-010: Reviews & Ratings
Citizens must be able to submit a star rating (1–5) and an optional short text review for a book they
have opened, visible to other citizens on that book's detail page.
- **Acceptance criteria**: A citizen can submit one rating+review per book (editable, not duplicable);
  submitted reviews appear on the detail page below the AI summary, newest first; the book's
  displayed aggregate rating (currently a static seed value) becomes the average of citizen ratings
  once at least one exists, falling back to the seed rating when none exist yet.
- **Source**: net-new, full-development scope — explicitly out-of-scope in the demo-scale PRD
  ("not requested"); now requested for full development.
- **Priority**: Medium.
- **Design**: `Review { citizenId, bookId, rating, text, createdAt, updatedAt }`, unique on
  citizenId+bookId (upsert on resubmit, not a new row). Aggregate rating computed as
  `AVG(rating)` over a book's reviews — computed at read time for v1 (catalogue scale doesn't yet
  justify a denormalized/cached aggregate column; revisit if catalogue size makes per-request
  aggregation too slow).
- **Data model addition**: `Review { citizenId, bookId, rating: 1-5, text: string | null, createdAt,
  updatedAt }`.
- **Validation**: rating required (1–5 integer); text optional, reasonable max length
  `[TODO: confirm max length — no source precedent in this module]`; one review per citizen per book.
- **Moderation**: `[Open Question — see below]` no moderation/reporting flow specified yet; citizen-
  generated text content typically needs at least a report/flag mechanism before a public launch.

### REQ-011: Collection-based curated shelves
Dedicated curated landing views for each existing Collection value (e.g. "Public Domain Classics,"
"Sahitya Akademi Picks"), rather than requiring citizens to manually apply the Collection filter.
- **Acceptance criteria**: Each Collection has a dedicated, linkable landing view (e.g.
  `/library/collections/public-domain`) showing that collection's books in the same grid layout as
  the main catalogue; catalogue page links out to these (e.g. a "Browse by Collection" rail or nav
  entry).
- **Source**: Extension Opportunity carried over from demo-scale PRD (see Extension Opportunities) —
  promoted to a scoped v1 requirement.
- **Priority**: Medium — cheapest of the three discovery/engagement features to build, since it
  reuses the existing filtered-grid component with a fixed Collection filter pre-applied.
- **Design**: No new component — the existing catalogue grid component takes a fixed `collection`
  param instead of citizen-selected filters; wrap in a route per collection value plus a shelf title/
  description. No data model change — reads the existing `book.collection` field.

### REQ-012: Full-text search inside book content (fast-follow, not v1)
Search that matches against a book's actual body content, not just title/author/summary metadata.
- **Acceptance criteria**: A search term that appears inside a book's full text (but not in its
  title/author/summary) surfaces that book as a result, distinct from REQ-004's metadata-level match.
- **Source**: net-new, full-development scope. Was "Out of Scope / Deferred" in the demo-scale PRD;
  scoped here as a fast-follow, deliberately after v1 (REQ-009/010/011), not alongside them.
- **Priority**: Low for now — explicitly deferred past v1 per scope decision this session.
- **Design**: Exact/keyword match (not semantic/embedding search, per scope decision) — extends the
  same Postgres full-text search infra from REQ-004 (`tsvector`/GIN) to also cover book body text,
  not a separate search system. Requires book full text to actually be ingested/stored per book,
  which is a **content-sourcing dependency**, not just a search-indexing one — see
  `30-analysis/04-content-data-sourcing-deep-dive.md` for whether full book text is available per
  title at all; this REQ is blocked on that, not just on search design.
- **Data model addition**: `book.fullText: string | null` (or a separate `BookContent` table if body
  text is large/paginated) + `tsvector` index over it.

## Extension Opportunities
- **Reuse the AI Book Summary pipeline for Mind Map/Quiz** (REQ-007, REQ-008): whatever mechanism
  already produces a real, working AI summary per book (confirmed functional this session) is the
  lowest-risk path to closing these two stubs — same content, same trigger point, just a different
  output shape. This avoids introducing a new live-LLM-call pattern when a working one already
  exists.
- **Reuse the Mock Test Interface's question-navigator/scoring UI for the Quiz feature** (REQ-008):
  the Mock Test module already has a proven, well-built pattern for presenting MCQs and scoring them
  — a much smaller quiz variant of the same component avoids building UI from scratch.
- **Personalized recommendations** ("Because you read X") — deferred past this round; needs a
  read-history/interaction data model not yet designed. REQ-009 (Bookshelf) is a natural first step
  toward this, since saved/read signal is exactly what a recommender would consume.
- **Similar-books rail on detail page** — deferred past this round; needs a similarity signal (shared
  tags, or embeddings) that hasn't been decided. Revisit once REQ-012's content indexing exists, since
  the same infrastructure could derive similarity.

## Data Touched
- **Read**: book catalogue (title, author, language, format, collection, rating, year, page count,
  cover), AI-generated summary per book, citizen's saved-books state (REQ-009), other citizens'
  reviews per book (REQ-010)
- **Write**: Mind Map/Quiz generation (REQ-007/008) writes a cached generated-content record per book
  on first generation; save/unsave writes a `SavedBook` row (REQ-009); submitting a review writes/
  updates a `Review` row (REQ-010)

## Out of Scope / Deferred
- ~~Citizen-submitted reviews/ratings~~ — now scoped, see REQ-010.
- ~~Full-text search inside book content~~ — now scoped as a fast-follow, see REQ-012.
- Personalized recommendations, similar-books rail — deferred, see Extension Opportunities.

## Open Questions
- ~~Does the existing AI Book Summary get generated once at seed/publish time, or live per view?~~
  **Superseded**: demo-scale answer was precompute-at-seed (`30-analysis/02-ai-integration-deep-dive.md`
  Option B). For full development at a growing-catalogue scale, REQ-007/008 now use
  generate-on-first-click/cache-thereafter instead (see Design notes on each REQ) — bulk seed-time
  gen doesn't fit content that's added on an ongoing basis. This makes the Reading Companion API-key
  fix (Option A) a **hard precondition**, not just a nice-to-have, since Mind Map/Quiz now depend on
  the same live-call path actually working.
- Should Mind Map/Quiz be available for every book, or gated by membership tier (consistent with the
  Membership Plans page listing "Full AI Summaries & Chat" as a Gold-tier feature)? [Needs a scope
  decision — affects REQ-007/008's access control]
- What moderation/reporting flow applies to citizen-submitted reviews (REQ-010)? Public-facing
  free-text content typically needs at least a flag/report mechanism before launch. [Needs a scope
  decision before REQ-010 is built — not addressed in this pass]
- Does User Profile (`prd-11-user-profile-my-dashboard`) already define its own bookshelf data model,
  or does it not exist yet? REQ-009 assumes Digital Library owns the `SavedBook` table and User
  Profile reads from it — needs confirming against that PRD once it exists, to avoid two competing
  "saved books" concepts. [Cross-module dependency — verify when prd-11 is written/reviewed]
