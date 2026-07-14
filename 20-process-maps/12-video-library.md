---
title: "Process Map — Video Library"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/12-video-library.md"]
---

# Video Library

## Process Overview
- **Purpose**: Citizen browses curated educational videos and watches one in-app.
- **Frequency**: Any time a citizen wants to watch an educational video.
- **Trigger**: Sidebar → Video Library.
- **End condition**: Citizen closes the video modal or navigates away.

## Roles Involved
- Citizen/Reader

## Inputs and Outputs
- **Inputs**: Seeded video catalog (`GET /api/videos`) with real YouTube video IDs; citizen's category/search/sort/click choices
- **Outputs**: Filtered grid; embedded YouTube playback modal

## Process Steps

1. Citizen lands on `/video-library`, default tab "All," sees a live count ("14 videos").
2. Cards initially render as loading skeletons, then populate with real YouTube thumbnails within a few seconds.
   - **Exception A: 1-2 thumbnails fail to load and stay as generic placeholders** (console-logged 404s).
3. Citizen optionally narrows via category tab (AI & ML / Coding & Dev / History / Language Learning / Mathematics / Science), search box, or A-Z sort.
4. Citizen clicks a video card → modal opens in-place with the real embedded YouTube player (actual video title/channel), playback controls, scrubber, and the app's own metadata (title, category, duration, description) below the player.
5. Citizen watches, then closes the modal (×) → returns to the grid.

### Exception A: Thumbnail Load Failures
A1. A subset of video thumbnails (observed: "History of India," "Learn Gujarati in 30 Minutes") never resolve to their real YouTube thumbnail.
A2. Card instead shows a generic gray play-icon placeholder indefinitely.
A3. Video still plays correctly if clicked — cosmetic only, not a functional block.

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar)
- **Feeds into**: external YouTube (playback happens via embedded iframe; "YouTube" branding link present but exit behavior untested)

## Systems and Tools
- `GET /api/videos?category={CATEGORY}` — real filtering
- Embedded YouTube iframe player (confirmed real content, e.g. 3Blue1Brown's "But what is a neural network?")

## Known Issues
- Console-logged 404 errors for a couple of thumbnails — cosmetic only. Traced to `10-observations/12-video-library.md`.
- Duration format is inconsistent: some videos show `HH:MM:SS` (e.g. "11:30:00" for an 11.5-hour course), others `MM:SS` (e.g. "51:00") — same field, two formats depending on length.
- Module was not part of the original 16-module PRD (per this project's `CLAUDE.md`) — this process map and its source observation are the first documentation of its actual behavior.

## Open Questions
- Does the module track watch progress anywhere (e.g. on the Profile page)? [UNVERIFIED — not seen in Profile's stat tiles]
- Is there a "You May Also Like" or related-videos feature, as seen in Audiobook Player? [UNVERIFIED — not observed this pass]
