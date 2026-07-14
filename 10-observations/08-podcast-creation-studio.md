---
title: "Observation — Podcast Creation Studio Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/podcast-studio, logged in as teacher@demo.com (Meera Desai)"
---

# Podcast Creation Studio

## Activity
Content creator (logged in as teacher account) records/uploads podcast episodes into a named series, and manages their existing series/episode catalog.

## Inputs
- Requires `teacher@demo.com` login — sidebar item does not appear for the standard reader account (`rahul@demo.com`) tested in earlier modules
- Seeded series data (`GET /api/podcast-series`)
- Microphone access (for live recording — not fully testable in headless automation, see Limitations)

## Outputs
- New/updated podcast series and episodes
- Published episodes presumably surface in the consumer-facing Podcasts module (not yet observed)

## People
- Content Creator role (per PRD's 8 user roles) — account "Meera Desai", tier shown as "Standard Member" (same tier label as reader accounts; no distinct "Creator" tier badge observed)

## Elements on screen
| Element | Detail |
|---|---|
| Recording Studio (left panel) | Episode title field (e.g. "Ep. 3 - Rani Ki Vav History"), timer display (00:00:00), waveform visualization bar, transport controls (pause, record/mic — red circular button, stop), Noise Cancellation toggle (on by default), "AI AUTO-TRANSCRIPTION — Live" indicator, Series dropdown (e.g. "Bhagavad Gita Saar"), Publish Episode button, Upload Existing Audio button |
| My Podcasts (right panel) | Aggregate stats: 2,400 Listeners, 10 Episodes, 4.8 Rating; per-series cards (Bhagavad Gita Saar — Sanskrit, 3 episodes, 350 subs; Vigyan Varta — Hindi, 3 episodes, 1,200 subs; Virasat Heritage Talks — Gujarati, 4 episodes, 850 subs) each with a play button; "+ New Series" button; "Upload Existing Audio" button (duplicate of left panel's) |
| Create New Series modal | Series Name (text), Language (dropdown, defaulted to Gujarati), Description (textarea), Create Series button — clean, functional-looking form |

## Problems / Limitations Observed
- **Recording could not be fully verified in this pass.** Clicked the mic/record button with microphone permission granted at the browser level — timer did not appear to start and no visible recording-state change occurred. This may be a genuine limitation of headless browser automation (no real audio device to capture), not necessarily an app bug — **flag for a manual/headed-browser retest** before concluding this is broken.
- Waveform bar appears to be a static/idle visualization when not recording — matches other modules' pattern of only fully populating during live activity.
- Series "Language" values (Sanskrit, Hindi, Gujarati) shown as tags on series cards, but the reader-facing Podcasts module's actual language coverage not yet cross-checked.

## Handoffs
- **Before**: Dashboard sidebar → Podcast Studio (only visible/accessible when logged in as teacher@demo.com — reader accounts likely don't see this nav item, not explicitly reconfirmed this pass)
- **After**: "Publish Episode" → presumably appears in consumer Podcasts module (module 9, not yet observed this session)

## Raw Notes
- This is the first module requiring a non-default login — confirms role-gated navigation exists (Content Creator vs. Citizen/Reader), consistent with the PRD's 8-role user matrix, though only 2 roles have been distinguished in the UI so far (reader vs. teacher/creator).
