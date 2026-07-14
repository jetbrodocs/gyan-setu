---
title: "PRD — Newspapers & Periodicals"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/05-newspapers-periodicals.md"
source_observation: "10-observations/05-newspapers-periodicals.md"
---

# Newspapers & Periodicals

## Overview
This module gives citizens a date-wise, filterable newspaper archive with a full-page reading
experience. The Newspapers tab is genuinely well-built (real generated front pages, real filtering);
Magazines and Journals are honest, communicated stubs. The main gaps are closing those two stubs and
making individual issues linkable/bookmarkable.

## User Roles
- **Citizen/Reader** — the sole user of this module.

## Functional Requirements

### REQ-001: Newspaper browsing and filtering
The system must display available newspaper issues filterable by Language, City, and Publication, and
navigable via a calendar restricted to dates with available issues.
- **Acceptance criteria**: Filters and calendar both live-narrow the issue list; calendar disables
  dates with no available issue.
- **Source**: process map steps 1, 3 (confirmed working).

### REQ-002: Full-page newspaper viewer
Selecting an issue must render a full front-page layout: masthead, edition/date/volume line, headline
grid with articles.
- **Acceptance criteria**: Viewer renders real, edition-specific content matching the selected issue;
  switching issues from the "Available Issues" list updates the viewer in place.
- **Source**: process map steps 4–6 (confirmed working).

### REQ-003: Issues must be individually linkable
Each newspaper issue must have its own shareable, bookmarkable URL, rather than rendering as
in-place client state on a shared route.
- **Acceptance criteria**: Opening a specific issue produces a distinct URL that, when visited
  directly or shared, opens that exact issue — not the default browse view.
- **Source**: Gap analysis Category 2/observation — issue cards are currently buttons with no
  distinct URL per issue.
- **Priority**: Medium — affects shareability and deep-linking (e.g. "check today's edition" links
  from outside the app), not core reading.

### REQ-004: Magazines section
The Magazines tab must show a real, browsable magazine catalogue and reading experience, replacing
the current "coming soon" placeholder.
- **Acceptance criteria**: Same interaction pattern as Newspapers (REQ-001/002) — browse, filter,
  full-page/article view — applied to magazine content.
- **Source**: Gap analysis Category 1 (Communicated Stub).
- **Priority**: Medium.

### REQ-005: Journals section
The Journals tab must show a real, browsable journal catalogue and reading experience, replacing the
current "coming soon" placeholder.
- **Acceptance criteria**: Same pattern as REQ-004, applied to journal content (likely a simpler,
  more text-focused layout than the newspaper front-page style, given journals are typically
  article-based rather than page-layout-based).
- **Source**: Gap analysis Category 1 (Communicated Stub).
- **Priority**: Medium.

### REQ-006: Header actions — Clip, Translate, Share, PDF
The four header action buttons on the viewer (Clip, Translate, Share, PDF) must perform real actions.
- **Acceptance criteria**: Clip saves/bookmarks an article or page to the citizen's collection; Share
  produces a shareable link (dependent on REQ-003 existing first); PDF downloads the current issue as
  a PDF file; Translate shows the current content in another supported language.
- **Source**: process map step 7 — buttons are present but were not functionally tested this session;
  treated as requiring confirmation-or-build.
- **Priority**: Medium — these buttons are already visible in the UI, so their non-function (if
  confirmed) carries the same "looks broken" risk as other Category 2 findings.

## Extension Opportunities
- **Reuse the Digital Library's AI Summary/Translate pattern for REQ-006**: Translate and a
  potential "summarize this article" Clip action can build on the same AI integration already proven
  for book summaries and (once fixed) the Reading Companion — avoids a new AI integration pattern.
- **Magazines/Journals (REQ-004/005) can likely reuse most of the Newspapers component**: filtering,
  calendar, and viewer chrome are probably directly reusable, with only the content layout template
  differing — worth building as a shared component with per-type layout variants rather than three
  separate implementations.
- **Newspaper archive as a civic-engagement channel**: once REQ-003 (linkable issues) exists, the
  Corporation could push notifications or links to specific civic-interest editions/articles — ties
  into the platform's broader "civic engagement" ambition without new infrastructure.

## Data Touched
- **Read**: newspaper/magazine/journal issue metadata and content (headlines, articles, layout),
  available-dates-per-publication index
- **Write**: Clip/save actions (REQ-006) would write a citizen-owned saved-content record

## Out of Scope / Deferred
- Citizen comments/discussion on articles — not observed, not requested.
- Real publisher partnerships / licensed real-world newspaper content — a licensing/business
  workstream, not an engineering scope item (see the platform's broader content-sourcing
  considerations); current content is realistic AI-generated demo content, not real publications.

## Open Questions
- Do Clip, Translate, Share, and PDF (REQ-006) already work and simply weren't tested this session,
  or are they unbuilt? Needs a direct functional test before scoping build effort.
- Should Magazines and Journals (REQ-004/005) reuse the newspaper's front-page visual style, or do
  they need a distinct, more article-centric layout given they're structurally different publication
  types? Needs a design decision before REQ-004/005 can be built.
