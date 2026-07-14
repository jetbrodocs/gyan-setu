---
title: "PRD — Video Library"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/12-video-library.md"
source_observation: "10-observations/12-video-library.md"
---

# Video Library

## Overview
The Video Library lets citizens browse curated educational videos and watch them in an embedded
player. This module works well end-to-end with real content and real embedded playback — the gaps
are minor (a couple of broken thumbnails, inconsistent duration formatting). Notably, this module
wasn't part of the original 16-module PRD, so this document is the first formal specification of its
actual behavior.

## User Roles
- **Citizen/Reader** — the sole user of this module.

## Functional Requirements

### REQ-001: Category-based browsing, search, and sort
The system must display the video catalogue filterable by category (AI & ML, Coding & Dev, History,
Language Learning, Mathematics, Science), searchable, and sortable A-Z.
- **Acceptance criteria**: Category tabs, search, and sort all live-filter the grid with an accurate
  result count.
- **Source**: process map step 3 (confirmed working).

### REQ-002: In-app embedded playback
Clicking a video must open an embedded player (not an external redirect) showing the real video
content with standard playback controls.
- **Acceptance criteria**: Video plays inline in a modal/panel without leaving the app; player shows
  real title/channel metadata alongside the app's own description and category tag.
- **Source**: process map step 4 (confirmed working — this is the reference implementation other
  modules should reuse; see `prd-10-stem-innovation-lab` REQ-004).

### REQ-003: Reliable thumbnail loading
Every video card must display its real thumbnail image; no card should permanently fall back to a
generic placeholder icon.
- **Acceptance criteria**: All 14+ catalogue thumbnails load successfully; if a thumbnail source is
  genuinely broken, a retry or alternate-source fallback should resolve it rather than leaving a
  generic icon indefinitely.
- **Source**: Gap analysis Category 5 — 5 console-logged 404 errors this session, corresponding to 1-2
  thumbnails that never resolved.
- **Priority**: Low — cosmetic only, playback unaffected.

### REQ-004: Consistent duration formatting
Video duration must display in a single, consistent format across the entire catalogue.
- **Acceptance criteria**: All durations use the same format (e.g. always `H:MM:SS`, or always
  `MM:SS` with hours spelled out for long-form content) — currently some show `11:30:00` and others
  `51:00` for the same underlying duration field.
- **Source**: Gap analysis Category 5, confirmed this session.
- **Priority**: Low — cosmetic display-layer fix.

## Extension Opportunities
- **This module's embedded player is the platform's proven pattern to reuse elsewhere** — most
  directly for STEM Innovation Lab's video playback (`prd-10-stem-innovation-lab` REQ-004), which
  currently link-outs to YouTube instead of embedding.
- **Watch progress tracking**: unlike eBook Reader and Audiobook Player, this module has no
  confirmed watch-progress tracking. Extending the same progress-persistence pattern already proven
  elsewhere (`prd-03-ebook-reader` REQ-002) would bring this module to parity and let watched videos
  surface correctly on the Personal Dashboard (`prd-11-user-profile`).
- **Related-video recommendations**: the Audiobook Player already has a working "You May Also Like"
  pattern (`prd-04-audiobook-player` REQ-006) — the same component could extend here with minimal new
  work.

## Data Touched
- **Read**: video catalogue metadata (title, channel, category, duration, thumbnail, embed source)

## Out of Scope / Deferred
- Citizen-uploaded or creator-contributed videos — this module is curated-content-only at this phase;
  video creation is not part of the Podcast Creation Studio's current scope either (audio only).

## Open Questions
- Should this module formally join the platform's documented module list (it wasn't part of the
  original 16-module PRD)? Its functionality is solid enough to warrant equal standing — a scope
  decision, not a technical one.
- Does the module track watch progress anywhere currently? Not observed on the Personal Dashboard's
  stat tiles or activity chart this session — needs confirmation before REQ (extension) work begins.
