---
title: "Observation — STEM Innovation Lab Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/stem-lab, logged in as rahul@demo.com"
---

# STEM Innovation Lab

## Activity
Citizen browses courses by category, watches a lesson video (YouTube link-out), and runs sample code in an embedded code editor with simulated output.

## Inputs
- Seeded STEM course catalog (`GET /api/stem-courses`) and leaderboard (`GET /api/leaderboard`)
- User category tab clicks, "Run Code" click

## Outputs
- Filtered course list per category
- Simulated code execution output rendered inline

## People
- Any logged-in citizen/reader

## Elements on screen
| Element | Detail |
|---|---|
| Header | "STEM Innovation Lab — Learn coding, robotics, AI, and more with interactive courses and hands-on projects" |
| Category tabs | All, 3D Design, AI & ML, Atal Innovation, Coding & Dev, Electronics & IoT, Robotics Kits |
| Course strip | Horizontally scrollable cards under tabs, each with title + "Module X of Y" (e.g. "3D Modeling with Blender: First Steps — Module 1 of 10", "Arduino Basics: Blink Your First LED — Module 1 of 8", "Build a Web App with JavaScript — Module 3 of 10") |
| Video panel | YouTube thumbnail with "Watch on YouTube" overlay button (external link-out, not an embedded player) — course title, category tag, description, progress bar |
| Code Editor | Syntax-highlighted Python code (pre-filled Fibonacci example), "Run Code" button, collapsible "Output" panel |
| My Badges | Earned badges: Python Fundamentals, Web Development Basics, Arduino Certified Maker |
| Class Leaderboard | Ranked list by XP: Rahul Sharma (2,450 XP, 1st), Priya Patel (2,120), Arjun Mehta (1,890), Sneha Desai (1,650), Vikram Singh (1,420) — with badge-count icon per person |
| Live Workshops | "Coming Soon — Live coding workshops and mentorship sessions" placeholder |

## Interaction Behavior Observed
- **"Run Code" works and produces correct simulated output.** Clicking it against the pre-filled Fibonacci script printed a correct sequence (F(0)=0 through F(9)=34) in an "Output" panel below the editor — confirms DEMO_GUIDE's noted limitation that this is "a demo textarea (no real Python execution)," i.e., output is simulated/matched rather than actually interpreted, but the simulated result is correct and looks convincing for a demo.
- **"Robotics Kits" category shows an empty video panel** (blank gray box, no course loaded, no "coming soon" message) when selected — course strip for that category may be empty in seed data; worth confirming whether this is intentional (empty category) or a data gap.

## Problems / Limitations Observed
- Video watching happens via external YouTube link-out ("Watch on YouTube"), not an embedded in-app player — differs from the PRD's description of a "Video lesson player integrated with code editor," which implies inline playback.
- Live Workshops booking capability (named in PRD) is not implemented — placeholder only.
- Robotics Kits category has no visible content/empty-state messaging (see above).

## Handoffs
- **Before**: Dashboard sidebar → STEM Lab
- **After**: "Watch on YouTube" exits to an external site (not traversed this pass)

## Raw Notes
- Leaderboard shows the logged-in user (Rahul Sharma) in 1st place with real-looking XP progression — nice demo touch, consistent with gamification framing in the PRD.
