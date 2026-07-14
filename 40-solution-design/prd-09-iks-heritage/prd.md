---
title: "PRD — Indian Knowledge Systems (IKS Heritage)"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/09-iks-heritage.md"
source_observation: "10-observations/09-iks-heritage.md"
---

# Indian Knowledge Systems (IKS Heritage)

## Overview
IKS Heritage lets citizens explore historical manuscripts by era and language along a timeline
spanning Vedic to Modern India. Browsing works well, but this module contains the platform's single
most critical gap: the "View Manuscript" button — the module's entire reason to exist — currently
does nothing.

## User Roles
- **Citizen/Reader** — the sole user of this module.

## Functional Requirements

### REQ-001: Era timeline navigation
The system must display a historical timeline (Vedic, Mauryan, Gupta, Solanki, Mughal, Modern) that
citizens can click through to browse manuscripts from that era.
- **Acceptance criteria**: Selecting an era re-queries and re-renders the manuscript grid for that
  era; the selected era is visually highlighted.
- **Source**: process map step 2 (confirmed working, real server-side filtering).

### REQ-002: Language filtering
The system must let citizens filter manuscripts by language (All/Sanskrit/Gujarati/Hindi/English),
combinable with the era selection.
- **Acceptance criteria**: Language filter narrows the current era's manuscripts; combined
  era+language filtering works correctly (confirmed this session via a combined query).
- **Source**: process map step 3 (confirmed working).

### REQ-003: Manuscript reading view — critical fix
Clicking "View Manuscript" must open a real, readable view of that manuscript's content, replacing
the current non-functional button.
- **Acceptance criteria**: Clicking "View Manuscript" on any card navigates to a dedicated view
  showing the manuscript's full available content (translated text, historical annotations, or
  scanned source pages, depending on what content exists per manuscript) — never a dead click.
- **Source**: Gap analysis Category 2, ranked **Critical** — this is the module's primary
  call-to-action and it is completely non-functional today, with zero user-facing feedback
  distinguishing it from a bug.
- **Priority**: **Highest priority in this module, and one of the top 3 platform-wide fixes** — a
  citizen exploring heritage content hits a dead end at the exact moment of intended engagement.

### REQ-004: Correct era-year formatting
Era labels must display correctly for BCE dates (e.g. "1500 BCE"), which the current build already
does correctly on this screen.
- **Acceptance criteria**: No regression — this page's formatting is correct today and should stay
  that way (contrast with the Digital Library's book-detail formatting bug — `prd-02-digital-library`
  REQ-006 — which is a separate screen with the same underlying data concept, currently broken).
- **Source**: process map — confirmed working, included here to establish it as a regression-tested
  baseline while REQ-006 elsewhere gets fixed.

### REQ-005: 360° Virtual Tours
The Virtual Tours section must offer a real immersive/interactive experience for at least the
featured heritage sites (e.g. Modhera Sun Temple, Adalaj Stepwell), replacing the current placeholder
cards.
- **Acceptance criteria**: Clicking a tour card opens an actual 360° or interactive viewing
  experience, not a static "coming soon" state.
- **Source**: Gap analysis Category 1 (Communicated Stub) — documented as a known limitation.
- **Priority**: Low — this was explicitly deferred in the demo's known limitations, not a surprise
  gap; larger effort than most other fixes (likely needs 360° image/video assets and a viewer
  component).

### REQ-006: Folk & Oral Traditions section
The module must include a dedicated section for regional folk literature and oral storytelling
traditions, as named in the original module concept.
- **Acceptance criteria**: A distinct section (separate from the era-based manuscript browsing)
  presents folk/oral content with appropriate metadata (region, language, tradition type).
- **Source**: process map Open Questions — not located on the page during this session's walkthrough;
  may need more scrolling to confirm absence, or may be genuinely unbuilt.

## Extension Opportunities
- **REQ-003 unlocks AI-assisted engagement**: once manuscripts are actually readable, the same AI
  summary/companion pattern proven in the Digital Library and (once fixed) eBook Reader could offer
  context and explanation for archaic language or historical concepts — a natural extension that
  reuses existing AI capability for a genuinely high-value use case (ancient texts are exactly where
  readers need the most contextual help).
- **Timeline as a shared component**: the era-based timeline UI here is a strong, reusable pattern —
  worth considering for other chronological content (e.g. a "history of Gandhinagar" civic content
  track) if the platform's civic-engagement ambitions develop further.

## Data Touched
- **Read**: manuscript catalogue metadata (title, author/attribution, era, language, description),
  manuscript full content (pending REQ-003 — not currently retrievable even though metadata exists)

## Out of Scope / Deferred
- User-contributed heritage content (citizens submitting local folklore/oral history) — an
  interesting future direction consistent with the platform's "local knowledge economy" ambitions,
  but not current scope; would need its own moderation workflow.

## Open Questions
- **Is "View Manuscript" (REQ-003) missing a route entirely, or missing just the click handler?**
  These are different-effort fixes — a source-level check is needed before estimating REQ-003's
  build effort.
- Does manuscript full-text content exist in the data model already (just not surfaced), or does it
  need to be sourced/digitized first? This significantly affects REQ-003's real scope — a UI fix vs.
  a content-acquisition project.
- Is Folk & Oral Traditions (REQ-006) genuinely absent, or just missed during this session's
  scrolling? Needs a direct re-check.
