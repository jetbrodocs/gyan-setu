---
title: "Observation — Video Library Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/video-library, logged in as rahul@demo.com"
---

# Video Library

## Activity
Citizen browses curated educational videos by category or search, then watches one in an embedded modal player.

## Inputs
- Seeded video catalog (`GET /api/videos`), real YouTube video IDs/thumbnails
- User category tab, search, sort, and card click

## Outputs
- Filtered video grid
- Embedded YouTube player modal with title, channel, description, category tag, duration

## People
- Any logged-in citizen/reader

## Timing
- Initial thumbnail load is slow — cards render as skeleton placeholders for several seconds before real thumbnails populate; a couple of thumbnails (e.g. "History of India", "Learn Gujarati in 30 Minutes") never resolved and stayed as generic gray play-icon placeholders even after 6+ seconds (see Problems)

## Elements on screen
| Element | Detail |
|---|---|
| Header | "Video Library — Browse curated educational videos across multiple subjects" |
| Category tabs | All, AI & ML, Coding & Dev, History, Language Learning, Mathematics, Science |
| Search + sort | "Search videos..." box, "A-Z" sort toggle, live count ("14 videos") |
| Video cards | Real YouTube thumbnail, duration badge (e.g. "11:30:00", "51:00"), title, category tag, description snippet — content spans Calculus, DSA in Hindi, Indian History, JavaScript, Gujarati language, Linear Algebra, ML (NPTEL), Neural Networks (3Blue1Brown), etc. |
| Video modal (on click) | Embedded YouTube iframe (real video, actual title "But what is a neural network? \| Deep learning chapter 1" by 3Blue1Brown), player controls, "0:00 / 18:40" scrubber, share icon, "YouTube" branding/link, below: app's own title/category/duration/description, close (×) |

## Problems / Limitations Observed
- **Console logged 5× `404` errors on page load** — corresponds to a couple of video thumbnails that never load (stuck as generic gray placeholder icon instead of the real YouTube thumbnail). Cosmetic, not blocking — video still plays correctly.
- Video content is genuinely diverse in source/quality (college lecture, YouTuber tutorial, NPTEL) — good for demo variety but inconsistent duration formatting: some show `HH:MM:SS` (e.g. "11:30:00" for an 11.5-hour course) while others show `MM:SS` (e.g. "51:00") — same field, two different formats depending on video length, worth normalizing.

## Handoffs
- **Before**: Dashboard sidebar → Video Library
- **After**: video modal → external YouTube link/branding present but not tested for exit behavior; close (×) returns to grid

## Raw Notes
- This module is real and functional end-to-end: real thumbnails, real embedded playback, real metadata — one of the stronger-built modules alongside Mock Test Interface.
- Not explicitly named in the original 16-module PRD (per this project's own `CLAUDE.md`: "A 'Video Library' module is planned but not yet documented in the existing files") — this observation is the first documentation of its actual shape.
