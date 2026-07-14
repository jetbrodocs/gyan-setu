---
title: "PRD — Dashboard"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/01-dashboard.md"
source_observation: "10-observations/01-dashboard.md"
---

# Dashboard

## Overview
The Dashboard is the citizen's landing screen immediately after login. It orients the citizen with
personalized status (reading progress, stats) and provides the single navigation hub into every
other module on the platform. It must load fast and communicate, at a glance, "here's where you left
off and what's popular."

## User Roles
- **Citizen/Reader** (any authenticated account — Citizen, Student, Senior, Creator) — the only role
  that uses this screen; no role-specific dashboard variants exist or are required at this phase.

## Functional Requirements

### REQ-001: Post-login redirect
The system must redirect an authenticated citizen to the Dashboard immediately after successful
login.
- **Acceptance criteria**: Login with valid credentials → lands on `/dashboard` with no intermediate
  screen.
- **Source**: process map step 2 (confirmed working).

### REQ-002: Personalized welcome banner
The Dashboard must display a welcome banner with the citizen's first name and a summary of available
new content (e.g. "You have N books to explore").
- **Acceptance criteria**: Banner text reflects the logged-in citizen's real name and a real,
  non-hardcoded count.
- **Source**: process map step 3 (confirmed working).

### REQ-003: Continue Reading panel
The Dashboard must show up to N in-progress books with a visual completion percentage, each linking
directly into the eBook Reader at the citizen's last-read position.
- **Acceptance criteria**: Clicking a Continue Reading card opens the eBook Reader for that title,
  resuming at the stored progress point (not from chapter 1).
- **Source**: process map step 3–4 (confirmed working); reader resume behavior confirmed via
  `prd-03-ebook-reader` cross-check.

### REQ-004: Activity stat tiles
The Dashboard must display four live stat tiles: eBooks read, reading hours, tests taken,
certificates earned — each sourced from the citizen's real activity data, matching the same figures
shown on their Personal Dashboard (Profile).
- **Acceptance criteria**: A stat tile's value here and the equivalent value on the Profile page
  (`prd-11-user-profile`) must always agree — they read from the same underlying data, not two
  separately-maintained counters.
- **Source**: process map step 3; cross-module consistency confirmed this session (mock test score
  appeared identically on both Dashboard-adjacent and Profile views).

### REQ-005: Trending content grid
The Dashboard must show a "Trending" grid of popular books in the citizen's city, each linking to its
Digital Library detail page.
- **Acceptance criteria**: Grid shows real catalogue items (not hardcoded), each clickable through to
  `prd-02-digital-library`'s book detail view.
- **Source**: process map step 3 (confirmed working).

### REQ-006: Sidebar navigation
The Dashboard (and every other module, since the sidebar is shared chrome) must provide a persistent
sidebar with links to all in-scope modules, collapsible to an icon-only rail via a toggle control.
- **Acceptance criteria**: Every sidebar item navigates to its correct module; collapse/expand toggle
  works and persists visually for the session.
- **Source**: process map step 4 (confirmed working, including collapse toggle).

### REQ-007: Platform-wide search — must be functional
The search bar in the top navigation (present on every screen, not just Dashboard) must return
relevant results as the citizen types, and allow navigating to a selected result.
- **Acceptance criteria**: Typing a book, exam, or audiobook title/keyword returns a live, filtered
  list of matches across content types within 1 second; selecting a result navigates to it.
- **Source**: Gap analysis Category 2 (Silent Dead Control) — currently accepts text input but
  performs no search. This requirement did not exist in the current build; it is new scope to close
  a confirmed gap.
- **Priority**: High — this is shared chrome present on every screen; its non-function is the most
  visible gap in the entire platform.

### REQ-008: Notification center — must be functional
The notification bell icon (shared chrome, present on every screen) must open a panel showing
platform notifications (e.g. new content, reminders, test results) when clicked.
- **Acceptance criteria**: Clicking the bell opens/closes a panel; unread notifications are visually
  indicated (e.g. a badge count); at minimum, a "No notifications yet" empty state is shown if none
  exist — never a silent no-op.
- **Source**: Gap analysis Category 2 (Silent Dead Control) — currently no-op. New scope.
- **Priority**: Medium — lower visibility than search but same "looks broken" risk.

## Data Touched
- **Read**: citizen profile (name, avatar), reading-progress records (Continue Reading), aggregate
  activity counts (stat tiles), trending catalogue query (city-scoped), notification records (new,
  pending REQ-008)
- **Write**: none directly on this screen (navigation and read-only display only)

## Extension Opportunities
Beyond fixing REQ-007/008, the demo's existing Dashboard is a solid base to extend rather than
rebuild:
- **Personalized recommendations**: swap the city-scoped "Trending" grid for an AI-driven "Recommended
  for You" query using the citizen's own reading/test history — the underlying AI integration already
  exists elsewhere on the platform (Digital Library summaries), so this reuses established capability
  rather than introducing a new one.
- **Streak/motivation surfacing**: the citizen's reading streak is already tracked and shown on the
  Profile page (`prd-11-user-profile`) — surfacing it on the Dashboard banner too would reinforce
  daily engagement at the point of login, using data that already exists.
- **Quick actions**: a "Resume Mock Test" or "Today's Question" shortcut directly on the Dashboard
  (pulling from Test Prep Hub) would reduce clicks for the platform's most-engaged use case, without
  needing new backend work — both data sources already exist.

## Out of Scope / Deferred
- Role-specific dashboard variants (e.g. a distinct Creator or Admin landing view) — not required;
  Creator accounts use the same Dashboard with an additional sidebar item (Podcast Studio) rather
  than a different layout.

## Open Questions
- What should the search bar's scope be exactly — books + audiobooks + exams only (per its
  placeholder text), or platform-wide including newspapers, videos, podcasts, and manuscripts? Needs
  a decision before REQ-007 can be built, since it changes which modules' data the search must query.
- Should notifications be purely informational, or should some require action (e.g. "your mock test
  result is ready" linking directly to results)? Affects REQ-008's data model (read/unread state,
  optional deep-link target per notification).
