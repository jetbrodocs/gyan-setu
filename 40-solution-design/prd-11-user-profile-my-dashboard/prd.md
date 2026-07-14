---
title: "PRD — User Profile / My Dashboard"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/11-user-profile-my-dashboard.md"
source_observation: "10-observations/11-user-profile-my-dashboard.md"
---

# User Profile / My Dashboard

## Overview
This module is the citizen's personal aggregate view — reading activity, certificates, saved items,
test history — and it's already confirmed to work correctly with real, live-updating data across
modules (a mock test submitted elsewhere in the platform appeared here immediately, same session).
The main gap is a missing settings panel and some naming cleanup.

## User Roles
- **Citizen/Reader** — views their own data only.

## Functional Requirements

### REQ-001: Profile summary card
The system must display the citizen's avatar, name, email, membership tier, and current activity
streak.
- **Acceptance criteria**: All fields reflect real account data; streak count is accurate.
- **Source**: process map step 2 (confirmed working).

### REQ-002: Activity stat tiles
The system must display four stat tiles (Books Read, Audiobooks, Tests Taken, Podcast Time), matching
the same figures shown on the Dashboard (`prd-01-dashboard` REQ-004).
- **Acceptance criteria**: Values agree exactly with the Dashboard's equivalent tiles — same
  underlying data source, not independently computed.
- **Source**: process map step 2 (confirmed working, cross-module consistency already validated).

### REQ-003: Reading activity chart
The system must display a 30-day reading-activity bar chart with a labeled unit.
- **Acceptance criteria**: Chart renders real daily activity data; Y-axis has a clear unit label
  (currently missing — unclear if bars represent minutes, pages, or a composite score).
- **Source**: process map step 2 (confirmed working, but see the missing unit label as a specific
  fix within this requirement).

### REQ-004: Currently Reading and Bookshelf
The system must show the citizen's in-progress books with live progress, and a saved bookshelf of
favourited titles, each linking through to their respective detail/reader views.
- **Acceptance criteria**: Currently Reading items link into the eBook Reader (`prd-03-ebook-reader`)
  at the correct resume position; bookshelf items link into Digital Library detail pages
  (`prd-02-digital-library`).
- **Source**: process map step 2 (confirmed working).

### REQ-005: Recent Test History
The system must show a list of the citizen's completed mock test attempts with scores and dates,
immediately reflecting any test just completed.
- **Acceptance criteria**: A test submitted via the Mock Test Interface (`prd-07-mock-test-interface`)
  appears here without requiring a manual refresh or delay — confirmed working this session.
- **Source**: process map step 2, cross-module confirmation (strongest evidence of real backend
  integrity found anywhere in the platform this session).

### REQ-006: Earned certificates
The system must display the citizen's earned certificates with a download option.
- **Acceptance criteria**: Certificates shown reflect real earned achievements (confirmed working,
  same badge data also surfaced in STEM Innovation Lab — `prd-10-stem-innovation-lab` REQ-005);
  download action produces a real file.
- **Source**: process map step 2 (display confirmed working; download action not directly tested this
  session).

### REQ-007: Quick Settings panel
The system must provide a Quick Settings panel covering, at minimum, Notification preferences,
Language selection, and Dark Mode toggle.
- **Acceptance criteria**: Settings panel is present and each control has a real, persisted effect
  (e.g. Dark Mode actually changes the app's visual theme; Language changes displayed UI language).
- **Source**: Gap analysis — named in the original module concept, not found anywhere on this page
  during this session's full-page walkthrough. Confirmed absent, not just unobserved.
- **Priority**: Medium — this is the platform's only accessible place for account-level preferences;
  its absence means citizens currently have no way to control notification/language/theme
  preferences anywhere in the app.

### REQ-008: Consistent module naming
This module must be referred to by one consistent name across the sidebar, page header, and any
other reference to it — currently three different labels exist ("My Analytics" in the sidebar, "My
Dashboard" as the page header, `/profile` as the route).
- **Acceptance criteria**: Sidebar label and page header match (route naming is an internal/technical
  concern and doesn't need to match the display label, but the two citizen-visible labels should
  agree).
- **Source**: Gap analysis Category 5 (naming inconsistency), confirmed this session.
- **Priority**: Low — cosmetic, but a one-line fix with no functional risk.

## Extension Opportunities
- **REQ-007's Language setting is a strong lever for the platform's 4-language commitment**: since
  language filtering already exists per-content-type (Digital Library, Audiobooks, Newspapers, IKS
  Heritage), a single account-level Language preference could pre-apply as the default filter across
  all of those modules — reduces repetitive filtering for citizens who consistently read in one
  language, using data (the preference) that REQ-007 would introduce anyway.
- **Personal analytics depth**: the reading-activity chart (REQ-003) could extend into
  per-content-type breakdowns (reading vs. audiobooks vs. test prep time) using the same charting
  component already in place — a richer personal insight view with no new infrastructure.

## Data Touched
- **Read**: citizen profile, aggregate activity stats, reading-progress records, bookshelf/saved
  items, certificate records, test attempt history
- **Write**: settings preferences (pending REQ-007), bookshelf add/remove (via "Manage")

## Out of Scope / Deferred
- Viewing another citizen's profile (e.g. a teacher viewing a student's progress) — not observed, not
  requested at this phase; would need its own access-control model if pursued later.

## Open Questions
- What does "Manage" (My Bookshelf) actually let a citizen do beyond viewing — reorder, remove,
  organize into custom shelves? Not traversed this session.
- Should Dark Mode (REQ-007) apply platform-wide immediately, or is it scoped to specific modules?
  Affects implementation scope.
