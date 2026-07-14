---
title: "PRD — Admin Analytics Dashboard"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/14-admin-analytics-dashboard.md"
source_observation: "10-observations/14-admin-analytics-dashboard.md"
---

# Admin Analytics Dashboard

## Overview
This module does not exist in the current build — no route, no UI, no seeded admin account. Unlike
every other module in this document set, there is no working behavior to formalize; this PRD defines
net-new functionality from the original module concept. One meaningful head start exists: the
underlying data model already reserves `ADMIN` and `OFFICIAL` roles, so this is UI/route/query work
on top of an existing foundation, not a data-model redesign.

## User Roles
- **System Admin** (Corporation platform administrator) — primary user.
- **Government Official** — secondary user, likely a read-focused view of the same reporting rather
  than full administrative control (exact split needs a scope decision — see Open Questions).

## Functional Requirements

### REQ-001: Admin account provisioning
The system must support creating and authenticating admin/official accounts, distinct from the
citizen/creator accounts already in place.
- **Acceptance criteria**: An admin account can log in and is routed to the Admin Analytics Dashboard
  (or a role-appropriate landing screen) rather than the citizen Dashboard.
- **Source**: net-new — the `ADMIN`/`OFFICIAL` roles already exist in the data model (a positive
  starting point), but no account, login flow, or route currently uses them.

### REQ-002: Platform KPI overview
The dashboard must display top-level KPI cards: Active Users, Books Accessed, New Registrations,
Session Time.
- **Acceptance criteria**: Each KPI reflects real, live platform data — not illustrative numbers.
- **Source**: original module concept (`PRD_CONTENTS_SUMMARY.txt` section 4.14, as referenced in this
  session's process map) — no current implementation to build from.

### REQ-003: Usage trend visualizations
The dashboard must show a Daily Active Users trend line (30-day), a content-distribution pie chart,
and a usage-by-time-of-day heatmap.
- **Acceptance criteria**: Charts render real aggregated data; the platform already has a working
  charting library in use elsewhere (Personal Dashboard's reading-activity bar chart, Test Prep Hub's
  readiness donut) — reuse rather than introduce a new charting dependency.
- **Source**: original module concept, net-new implementation.

### REQ-004: Top content and ward-wise reach
The dashboard must show a top-10-most-accessed-content table and a ward-wise geographic distribution
view of platform usage.
- **Acceptance criteria**: Table reflects real access counts; geographic view accurately maps usage to
  the Corporation's actual ward boundaries (requires ward boundary data — see Open Questions).
- **Source**: original module concept, net-new implementation; ward-wise reach is also named in the
  platform's broader "civic insight" value proposition.

### REQ-005: Data export
The dashboard must allow exporting reports in Excel, PDF, and CSV formats.
- **Acceptance criteria**: Each export format produces a correctly formatted file matching the
  on-screen data.
- **Source**: original module concept, net-new implementation.

## Extension Opportunities
- **Reuse existing chart components wherever possible** (REQ-003) — the platform already has proven,
  working chart patterns (bar chart, donut chart) from the citizen-facing Personal Dashboard and Test
  Prep Hub; building this module's visualizations as extensions of those components is faster and more
  consistent than introducing new charting patterns.
- **Ward-wise reach (REQ-004) is a genuinely differentiated civic-insight feature** — worth
  prioritizing within this module if/when it's built, since it's the one KPI here that's specific to
  a *government* platform rather than a generic analytics dashboard, and ties directly into the
  platform's "civic engagement" and "instrument for governance" positioning.

## Data Touched
- **Read**: aggregated platform-wide usage data across every other module (reading, tests, audio,
  video, podcasts), citizen registration records, geographic/ward mapping data (net-new dependency)
- **Write**: none (read-only reporting module); admin account management (REQ-001) writes new user
  records

## Out of Scope / Deferred
- Content moderation tooling (approving/rejecting Creator-submitted content) — related to, but
  distinct from, this analytics module; would belong to a broader "Administration Console" scope if
  the Creator ecosystem (see other modules' Extension Opportunities) expands to need moderation.
- Real-time (sub-daily) analytics refresh — daily/periodic aggregation is assumed sufficient for this
  phase unless the Corporation states a real-time requirement.

## Open Questions
- **Should System Admin and Government Official have the same dashboard, or different views** (e.g.
  Official gets read-only high-level reporting, Admin gets full drill-down and user management)? This
  is a foundational scope decision needed before REQ-001 can be built correctly.
- Where does ward boundary/geographic data come from (REQ-004)? This is likely a Corporation-provided
  dataset, not something the platform can generate — needs to be sourced as an input before this
  requirement can be built.
- Given this module's "Low (deferrable)" priority throughout this project, should it be sequenced
  after the Phase 2 hardening work on the 13 citizen-facing modules, or does the Corporation want
  civic-insight reporting sooner for its own internal reasons? A business priority question, not a
  technical one.
