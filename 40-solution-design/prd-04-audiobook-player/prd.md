---
title: "PRD — Audiobook Player"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/04-audiobook-player.md"
source_observation: "10-observations/04-audiobook-player.md"
---

# Audiobook Player

## Overview
The Audiobook Player lets a citizen find and listen to an audiobook, with standard playback controls
and chapter navigation. The current build genuinely streams real audio (from a public archive, not a
mock), which is a strong foundation — the gaps here are about matching the intended UI richness and
reducing a third-party dependency risk, not about the playback pipeline itself.

## User Roles
- **Citizen/Reader** — the sole user of this module.

## Functional Requirements

### REQ-001: Catalogue browsing, filtering, and search
The system must display the audiobook catalogue with a Language filter and an in-page search across
titles, authors, and narrators.
- **Acceptance criteria**: Filter/search narrows the grid live; result count updates accordingly.
- **Source**: process map step 2 (confirmed working).

### REQ-002: Playback controls
The player must support play/pause, 15-second rewind/forward, and a progress bar showing
elapsed/total time.
- **Acceptance criteria**: Controls work as expected; progress bar accurately reflects playback
  position and updates live during playback.
- **Source**: process map steps 4–5 (confirmed working).

### REQ-003: Playback speed control with full range
The player must support the full advertised playback speed range (0.75x through 2.0x), not just a
single step.
- **Acceptance criteria**: Repeated clicks on the speed control cycle through the full documented
  range (0.75x, 1x, 1.25x, 1.5x, 1.75x, 2x) and wrap or stop sensibly at the end; current playback
  audibly reflects the selected speed.
- **Source**: Gap analysis — only a single step (1x → 1.25x) was confirmed this session; the full
  range needs verification and, if incomplete, needs to be built out to match the platform's stated
  capability.
- **Priority**: Low — core playback already works; this closes a range gap, not a broken feature.

### REQ-004: Chapter list and seek
The player must show a full chapter list with timestamps, and clicking a chapter must seek playback
to that position.
- **Acceptance criteria**: Clicking any chapter entry jumps playback to its timestamp and updates the
  progress bar and elapsed-time display accordingly.
- **Source**: process map step 6 — chapter list display confirmed, but the seek behavior on click was
  not directly verified this session; needs explicit confirmation/build.

### REQ-005: Waveform visualization
The player must display a real waveform visualization reflecting the audio's amplitude, replacing the
current flat progress bar.
- **Acceptance criteria**: A waveform renders across the playback bar, at minimum a static
  precomputed waveform per audiobook (does not need to be real-time amplitude analysis).
- **Source**: Gap analysis Category 4 (Spec Deviation) — the original module concept describes a
  waveform visualization; the current build has a flat bar instead.
- **Priority**: Low — cosmetic; playback and progress are already communicated clearly without it.

### REQ-006: Related-title recommendations
The player must show a "You May Also Like" panel with related audiobook recommendations.
- **Acceptance criteria**: Panel shows real catalogue titles (not hardcoded), each clickable through
  to that title's player.
- **Source**: process map step 7 (confirmed working).

## Extension Opportunities
- **Reduce third-party streaming dependency**: today's audio streams live from an external public
  archive. As the catalogue grows (see the platform's content-sourcing considerations), consider
  caching or self-hosting frequently-played titles to reduce dependency on an external service's
  uptime — directly derisks the single biggest reliability concern found for this module, without
  changing the citizen-facing experience at all.
- **Multi-language catalogue growth**: the current catalogue is 100% English despite the platform's
  4-language scope. Extending into Gujarati/Hindi/Sanskrit audiobooks (even a small curated set)
  would bring this module in line with the multi-language parity already present in the Digital
  Library and Newspapers modules.
- **Reuse the Digital Library's AI Summary pattern**: an AI-generated synopsis per audiobook (same
  mechanism as book summaries) would give citizens the same quick-decision tool before committing to
  a multi-hour listen.

## Data Touched
- **Read**: audiobook catalogue metadata (title, author, narrator, language, duration, chapter list),
  streaming audio source URL
- **Write**: none by the citizen directly at this phase (no bookmarking/resume-position persistence
  confirmed — see Open Questions)

## Out of Scope / Deferred
- Downloadable/offline audiobook access — depends on the mobile app phase.
- Audiobook creation/upload by citizens or creators — this module is consumption-only; content
  creation happens via the Podcast Creation Studio (`prd-08-podcast-creation-studio`), a separate
  audio pathway.

## Open Questions
- Does audiobook playback position persist across sessions (resume where you left off), the way
  eBook reading progress does? Not confirmed this session — if it doesn't, this is a meaningful
  parity gap with the Reader module worth closing.
- What happens if the external audio stream fails to load mid-playback (network issue, source
  unavailable)? No error/fallback state was observed or tested — needs a defined behavior (e.g. retry,
  clear error message, suggest an alternative title) before this is production-ready.
