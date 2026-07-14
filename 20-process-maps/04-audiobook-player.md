---
title: "Process Map — Audiobook Player"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/04-audiobook-player.md"]
---

# Audiobook Player

## Process Overview
- **Purpose**: Citizen finds and listens to an audiobook.
- **Frequency**: Any time a citizen wants to listen.
- **Trigger**: Sidebar → Audiobooks.
- **End condition**: Citizen stops playback or navigates away.

## Roles Involved
- Citizen/Reader

## Inputs and Outputs
- **Inputs**: Seeded audiobook catalog (`GET /api/audiobooks`); real audio streamed from archive.org/LibriVox
- **Outputs**: Audio playback; progress tracking

## Process Steps

1. Citizen lands on `/audiobooks`, sees a grid of 9 titles (Language filter: English only, in this seed data).
2. Citizen optionally narrows via Language filter or in-page search ("Search audiobooks, authors, narrators...").
3. Citizen clicks a card → navigates to `/audiobooks/{id}`.
4. Player loads: cover, title/author/narrator, meta badges (language, duration, chapter count), flat progress bar, transport controls, chapter list.
5. Citizen clicks play (center button) → audio begins streaming from archive.org (real HTTP range-request streaming, ~2s to start).
6. Citizen optionally:
   - **Adjusts speed** — click cycles 1x → 1.25x → (further steps not confirmed this pass).
   - **Rewinds/forwards 15s** via transport buttons.
   - **Jumps to a chapter** by clicking it in the chapter list (seek behavior not directly confirmed).
7. Citizen finishes or navigates away via "You May Also Like" recommendations or sidebar.

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar)
- **Feeds into**: none — playback is terminal within this module; recommendations link to other audiobook detail pages (same process, different ID)

## Systems and Tools
- `GET /api/audiobooks` (list + detail)
- Real third-party audio streaming: archive.org / LibriVox (302 redirect → 206 partial-content chunks)

## Known Issues
- No waveform visualization, despite PRD/DEMO_GUIDE describing one — actual player shows a flat progress bar. Traced to `10-observations/04-audiobook-player.md`.
- Speed control is a click-to-cycle toggle, not a dropdown/slider — full claimed 0.75x–2x range not confirmed in one pass.
- Third-party streaming dependency (archive.org) is a fragility risk for live demos — no fallback/error state observed or tested.
- Catalog is 100% English despite the platform's 4-language scope — no Gujarati/Hindi/Sanskrit audiobooks seeded.

## Open Questions
- Does clicking a chapter in the list actually seek playback to that timestamp? [UNVERIFIED]
- What is the full speed range reachable by repeated clicks (0.75x–2x per PRD)? [UNVERIFIED — only 1x → 1.25x observed]
