---
title: "PRD — eBook Reader"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/03-ebook-reader.md"
source_observation: "10-observations/03-ebook-reader.md"
---

# eBook Reader

## Overview
The eBook Reader is where a citizen actually reads a book's chapters, with an AI Reading Companion
available to answer questions about the content. This is the platform's highest-value AI touchpoint —
a tutor-like presence beside every reader — and today it's built but non-functional due to a missing
production configuration, not a missing feature.

## User Roles
- **Citizen/Reader** — the sole user of this module.

## Functional Requirements

### REQ-001: Table of contents navigation
The Reader must display a chapter/section table of contents that the citizen can click to jump
directly to any section, with the content pane updating without a full page reload.
- **Acceptance criteria**: Clicking any TOC entry renders that section's text immediately; the
  currently-open section is visually highlighted in the TOC.
- **Source**: process map step 3 (confirmed working).

### REQ-002: Reading progress tracking
The Reader must track and display reading progress (current chapter of total, percentage complete),
persisted per citizen per book, so progress resumes correctly from the Dashboard's Continue Reading
panel (`prd-01-dashboard`, REQ-003) or the Profile's Currently Reading list (`prd-11-user-profile`).
- **Acceptance criteria**: Leaving and re-entering the Reader (or arriving via a Continue Reading
  link) resumes at the last-viewed section, not chapter 1.
- **Source**: process map step 3 (confirmed working); cross-module consistency already validated this
  session (Dashboard and Profile show matching progress).

### REQ-003: Font size adjustment
The Reader must let the citizen increase/decrease reading font size, with the change taking effect
immediately.
- **Acceptance criteria**: +/- controls change text size live; size should have sane min/max bounds
  (not currently confirmed — see Open Questions) and ideally a "reset to default" affordance.
- **Source**: process map step 5 (confirmed working, bounds unconfirmed).

### REQ-004: AI Reading Companion must be live in production
The Reading Companion chat panel must return real, contextual answers to citizen questions about the
currently-open chapter, instead of the current 503 error.
- **Acceptance criteria**: Submitting a question (e.g. "What is this chapter about?", "Explain this
  passage", "Translate this to Hindi") returns a real AI-generated response within a reasonable time
  (a few seconds); a graceful, honest error state (not a generic failure) is shown only for genuine
  transient failures, not as the default experience.
- **Source**: Gap analysis Category 3 (Config-Only Failure) — the integration, chat UI, and error
  handling are already built and working; the endpoint just needs a production AI API key/quota
  provisioned. This is a deployment/config task, not new engineering.
- **Priority**: **Highest priority fix on the entire platform** — per the AI integration deep-dive,
  this is the single cheapest, highest-impact gap to close (config only, zero code change) and it's
  the platform's flagship "AI-driven" citizen-facing moment.

### REQ-005: Text highlighting and notes
The citizen must be able to select text within a chapter, highlight it, and attach a personal note,
retrievable later from a "Notes" view (mentioned in the original module concept but not confirmed
present in the current build).
- **Acceptance criteria**: Selecting text surfaces a highlight/note action; highlights persist per
  citizen per book; notes are viewable in a dedicated panel/tab.
- **Source**: process map Open Questions — not located in the current build; treated here as new
  scope pending confirmation it's genuinely absent (see Open Questions).

### REQ-006: Text-to-speech (TTS)
The citizen must be able to have the current chapter read aloud.
- **Acceptance criteria**: A TTS control starts/stops/pauses audio narration of the visible chapter
  text.
- **Source**: named in the original module concept, not confirmed present in the current build —
  same status as REQ-005.

### REQ-007: Translate selected text
The citizen must be able to select a passage and get an inline translation into another supported
platform language.
- **Acceptance criteria**: Selecting text surfaces a "Translate" action; result appears inline or in
  a side panel without leaving the Reader. Can reuse the same AI integration as REQ-004 (Reading
  Companion already demonstrated translation-style requests in its example prompts).
- **Source**: named in the original module concept, not confirmed present — same status as REQ-005.

## Extension Opportunities
- **REQ-004 unlocks the rest**: fixing the AI Companion's configuration is a prerequisite validation
  step for REQ-007 (Translate) if it's built on the same AI call pattern — worth sequencing REQ-004
  first, then confirming whether REQ-005/006/007 already exist behind an untriggered UI gesture
  before building them as if from scratch (see Open Questions).
- **WCAG accessibility badge**: the original module concept mentions a WCAG compliance badge in the
  reader toolbar — if this exists elsewhere on the platform (design system badge component), reusing
  it here is low-effort and reinforces the platform's stated accessibility commitment.
- **Companion memory across sessions**: once REQ-004 is live, a natural extension is letting the
  Companion recall earlier questions asked about the same book (e.g. "as I mentioned in chapter 2...")
  — a richer tutor-like experience building on the same working integration.

## Data Touched
- **Read**: book chapter content, citizen's reading-progress record, citizen's highlights/notes
  (pending REQ-005)
- **Write**: reading-progress updates (on section navigation), highlights/notes (pending REQ-005),
  AI Companion conversation history (pending confirmation of whether this persists across sessions)

## Out of Scope / Deferred
- Offline reading/download for offline access — named in broader platform ambitions, not this
  module's near-term scope; depends on the mobile app phase.
- Collaborative/social reading features (shared highlights, book clubs) — not requested, not observed.

## Open Questions
- **Do highlight/note, TTS, translate, and the WCAG badge (REQ-005–007) already exist behind a
  text-selection gesture not triggered during this session's walkthrough, or are they genuinely
  unbuilt?** This materially changes these requirements from "build new" to "verify and document
  existing" — needs a manual, deliberate text-selection test before scoping further.
- What are the actual min/max bounds on font size (REQ-003)? Not confirmed this session.
- Does the AI Companion's conversation history persist across sessions, or reset each time the Reader
  is reopened? Affects REQ-004's acceptance criteria and any future memory extension.
