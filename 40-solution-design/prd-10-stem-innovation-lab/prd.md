---
title: "PRD — STEM Innovation Lab"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/10-stem-innovation-lab.md"
source_observation: "10-observations/10-stem-innovation-lab.md"
---

# STEM Innovation Lab

## Overview
The STEM Innovation Lab combines video lessons with an in-browser code editor, badges, and a
leaderboard. The gamification layer (badges, leaderboard) and code-run simulation both work well; the
gaps are a content hole in one category, video playback not being truly in-app, and an unbuilt
workshop-booking feature.

## User Roles
- **Citizen/Reader** (typically Student role) — the sole user of this module.

## Functional Requirements

### REQ-001: Category-based course browsing
The system must display courses organized into categories (3D Design, AI & ML, Atal Innovation,
Coding & Dev, Electronics & IoT, Robotics Kits), filterable via tabs.
- **Acceptance criteria**: Selecting a category filters the course strip; each category with content
  shows real courses.
- **Source**: process map step 2 (confirmed working for 5 of 6 categories — see REQ-002).

### REQ-002: Robotics Kits content gap
The Robotics Kits category must show real course content (or, at minimum, a clear "coming soon"
message), replacing the current silent empty panel.
- **Acceptance criteria**: Selecting Robotics Kits either shows real courses matching the pattern of
  other categories, or — if content genuinely isn't ready — shows explicit messaging rather than a
  blank gray box.
- **Source**: Gap analysis Category 6 (Unverified/Empty) — confirmed empty this session with no
  distinguishing message between "no content" and "broken."
- **Priority**: Medium — same "looks broken" risk pattern as other silent gaps found platform-wide.

### REQ-003: Embedded code editor with run output
The system must provide a live code editor pre-filled with a sample script, and a "Run Code" action
that produces correct output.
- **Acceptance criteria**: Editing and running code shows accurate output for the given script; this
  is confirmed working today via simulated (not fully sandboxed) execution — acceptable for the
  platform's current teaching-focused scope (see Extension Opportunities for real execution).
- **Source**: process map step 5–6 (confirmed working, correct Fibonacci output verified this
  session).

### REQ-004: In-app embedded video playback
Course videos must play within the app in an embedded player, rather than linking out to an external
site.
- **Acceptance criteria**: Clicking a course's video plays it inline (embedded player), matching the
  in-app playback pattern already proven in the platform's Video Library module
  (`prd-12-video-library`) — no external tab/redirect required.
- **Source**: Gap analysis Category 4 (Spec Deviation) — current build links out to YouTube via
  "Watch on YouTube" rather than embedding; the original module concept describes an integrated
  player. The Video Library module already solves this exact problem for a different content set —
  this is a reuse opportunity, not new engineering (see Extension Opportunities).
- **Priority**: Medium — current link-out still delivers the content, just not the intended in-app
  experience.

### REQ-005: Achievement badges
The system must award and display real achievement badges (e.g. course completions, milestones) tied
to the citizen's actual activity.
- **Acceptance criteria**: Badges shown reflect real, earned accomplishments — confirmed working this
  session (Python Fundamentals, Web Development Basics, Arduino Certified Maker all shown for the
  logged-in citizen).
- **Source**: process map step 7 (confirmed working).

### REQ-006: Class leaderboard
The system must display a leaderboard ranking citizens by experience points (XP), showing the
logged-in citizen's real position.
- **Acceptance criteria**: Leaderboard reflects real XP data; the current citizen's own entry is
  visually distinguishable — confirmed working this session.
- **Source**: process map step 7 (confirmed working).

### REQ-007: Live Workshops booking
The Live Workshops panel must allow citizens to view scheduled workshops and book a seat, replacing
the current "coming soon" placeholder.
- **Acceptance criteria**: Real, dated workshop listings are shown with a working booking action
  (e.g. reserve a seat, receive a confirmation).
- **Source**: Gap analysis Category 1 (Communicated Stub).
- **Priority**: Low — larger effort (implies scheduling/capacity logic, possibly instructor-side
  tooling), lower urgency than content and playback gaps.

## Extension Opportunities
- **REQ-004 is a direct reuse of the Video Library's embedded player** (`prd-12-video-library`) —
  that module already has a working embedded YouTube player pattern; applying it here closes this
  gap with minimal new engineering.
- **Reuse the Mock Test Interface's scoring UI for coding challenges**: badges/leaderboard already
  gamify learning — adding scored coding challenges (beyond the current free-form "Run Code" sample)
  could reuse the proven question/scoring pattern from `prd-07-mock-test-interface`, extended for
  code-based answers.
- **Real code execution sandbox**: the current "Run Code" is simulated output, not a real sandbox.
  If the platform's ambitions extend toward genuine coding certification/skilling outcomes, a real
  execution backend (e.g. containerized code runner) is a natural, valuable extension — larger effort,
  flagged here for future consideration rather than immediate scope.

## Data Touched
- **Read**: course catalogue per category, citizen's badge/achievement records, leaderboard XP data,
  workshop schedule (pending REQ-007)
- **Write**: code editor state (ephemeral, not persisted), workshop booking record (pending REQ-007)

## Out of Scope / Deferred
- Real containerized code execution (vs. current simulated output) — see Extension Opportunities;
  valuable but larger-effort, not near-term scope.
- Instructor/teacher-side workshop management tooling — a prerequisite for REQ-007 at scale, but not
  this module's citizen-facing scope.

## Open Questions
- Is the Robotics Kits content gap (REQ-002) a missing seed-data category or an intentional cut? Needs
  a decision before building REQ-002's content.
- Does "Run Code" (REQ-003) behave correctly for every course's pre-filled script, or only the one
  example verified this session (Python Fibonacci)? Needs broader verification across the catalogue.
