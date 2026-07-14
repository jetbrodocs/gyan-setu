---
title: "Process Map — Podcast Creation Studio"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/08-podcast-creation-studio.md"]
---

# Podcast Creation Studio

## Process Overview
- **Purpose**: Content Creator records or uploads a podcast episode into a series and publishes it.
- **Frequency**: Any time a creator wants to add an episode.
- **Trigger**: Sidebar → Podcast Studio (only accessible to Creator-role accounts, e.g. `teacher@demo.com`).
- **End condition**: Episode published (hands off to consumer Podcasts module) or creator abandons the recording.

## Roles Involved
- Content Creator (distinct login required — reader accounts were not confirmed to see this nav item)

## Inputs and Outputs
- **Inputs**: Microphone audio, episode title, target series, seeded series data (`GET /api/podcast-series`)
- **Outputs**: New/updated series or episode; (intended) publish to consumer-facing Podcasts module

## Process Steps

1. Creator logs in with a Creator-role account and navigates to `/podcast-studio`.
2. Studio loads: Recording Studio panel (left) pre-filled with a draft episode title, "My Podcasts" panel (right) showing aggregate stats and existing series.
3. Creator either:
   - **Records live**: clicks the mic/record button, speaks, uses pause/stop transport controls, toggles Noise Cancellation, watches "AI AUTO-TRANSCRIPTION — Live" indicator. **[UNVERIFIED — see Known Issues]**
   - **Uploads existing audio**: clicks "Upload Existing Audio" (available in both panels) — file picker flow not traversed this pass.
4. Creator selects a target Series from the dropdown (or creates a new one — step 5).
5. **Optional**: Creator clicks "+ New Series" → modal opens (Series Name, Language dropdown, Description) → "Create Series" adds it to the dropdown/list.
6. Creator clicks "Publish Episode" → **[UNVERIFIED — publish flow and destination not confirmed this pass]**.

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar, Creator-role only)
- **Feeds into**: consumer Podcasts module (episode presumably becomes listenable there) — not yet mapped this session

## Systems and Tools
- `GET /api/podcast-series` (confirmed real API call)
- Recording: browser microphone API (getUserMedia)

## Known Issues
- **Recording could not be confirmed functional in headless browser automation.** Clicking record with mic permission granted showed no visible state change (timer, waveform activity). This may be a testing-environment limitation rather than an app bug — flagged for a manual/headed-browser retest before concluding it's broken. Traced to `10-observations/08-podcast-creation-studio.md`.
- Creator account tier still shows "Standard Member" — no distinct visual badge differentiates a Creator from a Reader account.

## Open Questions
- What happens after "Publish Episode" — does it appear immediately in the consumer Podcasts module? [UNVERIFIED]
- Does the AI Auto-Transcription actually produce a transcript, or is the "Live" badge decorative? [UNVERIFIED]
- Is Podcast Studio access role-gated at the route level, or just hidden from the sidebar for reader accounts? [UNVERIFIED]
