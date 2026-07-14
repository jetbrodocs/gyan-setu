---
title: "PRD — Podcast Creation Studio"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/08-podcast-creation-studio.md"
source_observation: "10-observations/08-podcast-creation-studio.md"
---

# Podcast Creation Studio

## Overview
The Podcast Creation Studio lets approved Content Creators (e.g. teachers) record or upload audio
episodes into named series and publish them for citizens to listen to via the Podcasts Library. Most
of this module's status is genuinely unverified rather than confirmed broken — automated testing
couldn't fully exercise live microphone recording, so this PRD's first job is closing that
verification gap before scoping further build work.

## User Roles
- **Content Creator** (teacher, subject expert) — records/uploads and publishes episodes.
- **Citizen/Reader** — consumes published episodes via the separate Podcasts Library (not this
  module; see Out of Scope).

## Functional Requirements

### REQ-001: Creator-only access
The Podcast Creation Studio must only be accessible to accounts with the Content Creator role;
Citizen/Student/Senior accounts must not see this module in navigation or be able to reach it
directly by URL.
- **Acceptance criteria**: Non-creator accounts see no Podcast Studio sidebar entry, and direct
  navigation to the route redirects or shows an access-denied state.
- **Source**: process map trigger condition — role-gating was inferred from the sidebar (creator
  account saw it, reader accounts observed elsewhere in this session did not), but route-level
  enforcement was not explicitly tested. Needs confirmation, not just UI hiding.

### REQ-002: Live audio recording
The system must allow a Creator to record audio directly in the browser using their microphone, with
a visible timer and waveform monitoring during recording.
- **Acceptance criteria**: Clicking record starts capturing microphone input; timer counts up;
  waveform visibly responds to audio input; pause/stop controls work mid-recording.
- **Source**: process map step 3 — **status unverified**, not confirmed broken. This is the top
  priority item for this module: a manual, headed-browser (real device, real microphone) test is
  required before deciding whether this needs fixing or is already working correctly.

### REQ-003: Noise cancellation toggle
The recording interface must provide a noise cancellation toggle that measurably affects recording
quality when enabled.
- **Acceptance criteria**: Toggle state is respected in the resulting audio; needs a real audio
  quality comparison (on/off) to confirm actual effect, not just UI presence.
- **Source**: process map step 3 (UI element present, functional effect unverified).

### REQ-004: AI auto-transcription during recording
The system must produce a real, accurate transcript of the recording, shown live or shortly after
recording completes.
- **Acceptance criteria**: A transcript is generated and associated with the episode; the "Live"
  indicator shown during recording reflects real transcription activity, not a decorative badge.
- **Source**: process map step 3 — status unverified, same caveat as REQ-002.

### REQ-005: Upload existing audio
The system must allow a Creator to upload a pre-recorded audio file as an alternative to live
recording.
- **Acceptance criteria**: File picker accepts common audio formats; uploaded file is processed the
  same way a live recording would be (associated with a series, published the same way).
- **Source**: process map step 3 (present in UI, upload flow not traversed this session).

### REQ-006: Series management
The system must let a Creator create a new named series (with language tagging and description) and
assign episodes to an existing or new series.
- **Acceptance criteria**: "New Series" modal creates a real series available immediately in the
  series dropdown; episodes are correctly associated with their assigned series.
- **Source**: process map steps 4–5 (confirmed working — modal, form, and series creation all
  functional).

### REQ-007: Publish episode
The system must let a Creator publish a recorded/uploaded episode, making it available to citizens in
the Podcasts Library.
- **Acceptance criteria**: Clicking "Publish Episode" completes without error and the episode appears
  in the consumer-facing Podcasts Library within a reasonable time (e.g. under a minute, not
  requiring a manual refresh cycle by an admin).
- **Source**: process map step 6 — **not traversed this session**; publish flow and downstream
  appearance in the consumer module are unconfirmed.

## Extension Opportunities
- **Reuse the AI integration pattern for transcription (REQ-004)**: if the AI Reading Companion fix
  (`prd-03-ebook-reader` REQ-004) restores a working production AI connection, the same
  connection/credentials likely unblock transcription too — worth sequencing the Reading Companion
  fix first and re-testing this module afterward, since both may share one root cause.
- **Creator analytics depth**: the current aggregate stats (listeners, episodes, rating) could extend
  into per-episode analytics (plays over time, completion rate) — reuses the same charting component
  already proven in the citizen-facing Personal Dashboard (`prd-11-user-profile`) reading-activity
  chart.
- **Draft/schedule publishing**: allowing a Creator to save a draft or schedule a future publish time
  is a natural extension once REQ-007's core publish flow is confirmed solid.

## Data Touched
- **Read**: Creator's existing series list and aggregate stats
- **Write**: new series records (REQ-006), new episode records including audio file/transcript
  (REQ-002/004/005), publish-state changes (REQ-007)

## Out of Scope / Deferred
- The consumer-facing Podcasts Library (browsing/listening to published episodes) is covered under
  the platform's broader content-consumption scope, not this module — this PRD covers creation and
  publishing only.
- Content moderation/review workflow before publishing — not observed in the current build; if
  community-scale content creation is a future goal (per the platform's Creator ecosystem ambitions),
  this needs its own scoping pass once the core creation flow (REQ-001–007) is confirmed solid.

## Open Questions
- **Top priority**: does live recording (REQ-002) and transcription (REQ-004) actually work? This
  needs a manual test with a real browser/microphone before any further scoping — automated headless
  testing could not confirm this either way this session.
- Is Creator role access enforced at the route/API level (REQ-001), or only hidden from the sidebar
  UI? A citizen manually navigating to the Podcast Studio URL should be tested directly.
- What happens to a published episode's status in the consumer Podcasts Library — is there a
  processing delay, or does it appear immediately (REQ-007)?
