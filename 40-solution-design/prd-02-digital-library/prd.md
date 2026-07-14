---
title: "PRD — Digital Library"
created: 2026-07-14
updated: 2026-07-14
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

### REQ-007: Mind Map generation
The Mind Map tab on a book detail page must generate and display a real visual mind map derived from
the book's content, replacing the current "coming soon" placeholder.
- **Acceptance criteria**: Clicking the Mind Map tab (for a book that hasn't had one generated yet)
  triggers generation and renders a visual node/branch structure summarizing the book's key concepts;
  once generated, it's cached/reused on subsequent visits rather than regenerated every time.
- **Source**: Gap analysis Category 1 (Communicated Stub) — currently a static "coming soon" message.
- **Priority**: Medium — extends the same AI pipeline that already powers AI Book Summary; see
  Extension Opportunities.

### REQ-008: Quiz generation
The Quiz tab on a book detail page must generate and display a short comprehension quiz derived from
the book's content, replacing the current "coming soon" placeholder.
- **Acceptance criteria**: Clicking the Quiz tab generates a small set of multiple-choice questions
  about the book; citizen can answer and receive immediate right/wrong feedback (same interaction
  pattern already proven in Test Prep Hub's Question of the Day — see `prd-06-test-prep-hub`).
- **Source**: Gap analysis Category 1 (Communicated Stub).
- **Priority**: Medium.

## Extension Opportunities
- **Reuse the AI Book Summary pipeline for Mind Map/Quiz** (REQ-007, REQ-008): whatever mechanism
  already produces a real, working AI summary per book (confirmed functional this session) is the
  lowest-risk path to closing these two stubs — same content, same trigger point, just a different
  output shape. This avoids introducing a new live-LLM-call pattern when a working one already
  exists.
- **Reuse the Mock Test Interface's question-navigator/scoring UI for the Quiz feature** (REQ-008):
  the Mock Test module already has a proven, well-built pattern for presenting MCQs and scoring them
  — a much smaller quiz variant of the same component avoids building UI from scratch.
- **Collection-based curation surfaces**: the existing Collection filter (Sahitya Akademi, GMC
  Exclusive, Public Domain, University Granth) could become dedicated curated landing shelves (e.g. a
  "Public Domain Classics" showcase), reusing the same filtered-grid component already built for the
  main catalogue.

## Data Touched
- **Read**: book catalogue (title, author, language, format, collection, rating, year, page count,
  cover), AI-generated summary per book
- **Write**: none by the citizen directly; Mind Map/Quiz generation (REQ-007/008) would write a
  cached generated-content record per book on first generation

## Out of Scope / Deferred
- Citizen-submitted reviews/ratings — not observed in the current build; not requested.
- Full-text search inside book content — current search is metadata-only (title/author); a
  content-level search would be a larger, separate feature.

## Open Questions
- Does the existing AI Book Summary get generated once at seed/publish time, or live per view? This
  determines whether REQ-007/008 should follow the same "generate once, cache" pattern or need to
  support live regeneration. [Needs a source-level confirmation before REQ-007/008 are built]
- Should Mind Map/Quiz be available for every book, or gated by membership tier (consistent with the
  Membership Plans page listing "Full AI Summaries & Chat" as a Gold-tier feature)? [Needs a scope
  decision — affects REQ-007/008's access control]
