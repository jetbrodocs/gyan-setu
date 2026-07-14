---
title: "Process Map — STEM Innovation Lab"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/10-stem-innovation-lab.md"]
---

# STEM Innovation Lab

## Process Overview
- **Purpose**: Citizen (typically student) picks a course category, watches a lesson, and practices code in an embedded editor.
- **Frequency**: Any time a citizen wants to learn/practice.
- **Trigger**: Sidebar → STEM Lab.
- **End condition**: Citizen exits to YouTube (video) or leaves the page.

## Roles Involved
- Citizen/Reader (typically Student role, per PRD's user matrix — not separately confirmed via login)

## Inputs and Outputs
- **Inputs**: Seeded course catalog (`GET /api/stem-courses`), leaderboard (`GET /api/leaderboard`), citizen's category selection and code-run clicks
- **Outputs**: Filtered course strip; simulated code execution output

## Process Steps

1. Citizen lands on `/stem-lab`, default tab "All."
2. Citizen selects a category tab (3D Design / AI & ML / Atal Innovation / Coding & Dev / Electronics & IoT / Robotics Kits) → course strip filters.
   - **Exception A: Robotics Kits shows an empty video panel** — no course loads, no messaging.
3. Citizen picks a course from the horizontally scrollable strip → video panel updates to a YouTube thumbnail + "Watch on YouTube" overlay for that course, with title/description/progress bar.
4. Citizen clicks "Watch on YouTube" → exits to external YouTube (link-out, not an embedded in-app player).
5. Citizen scrolls to the Code Editor (pre-filled with a sample script, e.g. Python Fibonacci) and clicks "Run Code."
6. System renders a correct, simulated output in an "Output" panel below the editor (not real Python execution — per DEMO_GUIDE, this is a demo textarea).
7. Citizen reviews "My Badges" (earned achievements) and "Class Leaderboard" (ranked by XP) on the right sidebar.
8. Citizen optionally checks "Live Workshops" panel — **Exception B: placeholder only**.

### Exception A: Robotics Kits Category Empty
A1. Citizen clicks the "Robotics Kits" tab.
A2. Video panel renders as an empty gray box; no course card, no "coming soon" message.
A3. Citizen cannot proceed with this category — likely a seed-data gap rather than an intentional stub (no messaging distinguishes the two).

### Exception B: Live Workshops Are Placeholders
B1. Citizen views the "Live Workshops" panel.
B2. Shows "Coming Soon — Live coding workshops and mentorship sessions," no booking capability (despite being named in the PRD).

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar)
- **Feeds into**: external YouTube (video watching) — outside this project's scope to map further

## Systems and Tools
- `GET /api/stem-courses?category={CATEGORY}` — real filtering
- `GET /api/leaderboard` — real ranked data, logged-in citizen shown in their actual rank position
- Code Editor: client-side simulated execution, not a real sandbox

## Known Issues
- Video watching requires leaving the app (YouTube link-out) rather than the PRD's described "integrated" in-app player. Traced to `10-observations/10-stem-innovation-lab.md`.
- Robotics Kits category has no content and no empty-state messaging.
- Live Workshops booking (named in PRD) is unbuilt.

## Open Questions
- Is the Robotics Kits gap a missing seed-data category, or an intentionally cut category? [UNVERIFIED]
- Does "Run Code" work identically for every course's pre-filled script, or only the one observed (Python Fibonacci)? [UNVERIFIED]
