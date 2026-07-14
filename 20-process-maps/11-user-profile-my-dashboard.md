---
title: "Process Map — User Profile / My Dashboard"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/11-user-profile-my-dashboard.md"]
---

# User Profile / My Dashboard

## Process Overview
- **Purpose**: Citizen reviews their own aggregate activity — reading, tests, certificates, saved items — in one place.
- **Frequency**: Any time a citizen wants to check their own status/history.
- **Trigger**: Sidebar → "My Analytics" (under MY ACCOUNT).
- **End condition**: Read-only; citizen navigates away or follows a "View All"/"Manage" link.

## Roles Involved
- Citizen/Reader (own data only)

## Inputs and Outputs
- **Inputs**: The citizen's own historical activity, aggregated across every other module (reading progress, audiobook count, test attempts, podcast time)
- **Outputs**: Read-only aggregate dashboard

## Process Steps

1. Citizen clicks "My Analytics" in the sidebar → lands on `/profile` (page header reads "My Dashboard").
2. Page renders: profile card (avatar, name, email, tier, current streak), 4 stat tiles, Reading Activity bar chart (last 30 days), Currently Reading list, Earned Certificates, My Bookshelf (Saved), Recent Test History.
3. Citizen optionally follows a sub-link:
   - **"View All" (Currently Reading)** → not traversed this pass.
   - **"View All" (Recent Test History)** → not traversed this pass.
   - **"Manage" (My Bookshelf)** → not traversed this pass.
   - **Click a "Currently Reading" item** → presumably hands off to eBook Reader mid-progress (same pattern as Dashboard's "Continue Reading" — not directly retested here).

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar, "My Analytics")
- **Fed by (data)**: `20-process-maps/07-mock-test-interface.md` — confirmed a completed mock test attempt (score + date) appears here immediately after submission, proving real per-user persistence across modules.
- **Feeds into**: `20-process-maps/03-ebook-reader.md` (via Currently Reading items, same pattern as Dashboard)

## Systems and Tools
- Aggregated read-only data — no API calls specifically logged for this page in this pass, but content (test history, currently-reading %) is confirmed live/real via cross-module check

## Known Issues
- **"Quick Settings" panel (Notifications, Language, Dark Mode), named in the original PRD module spec, was not found on this page.** Either unbuilt or located elsewhere. Traced to `10-observations/11-user-profile-my-dashboard.md`.
- Three names for one module: sidebar "My Analytics" / page header "My Dashboard" / route `/profile`.
- Reading Activity chart has no Y-axis unit label.

## Open Questions
- Where (if anywhere) do Notifications/Language/Dark Mode settings live in this build? [UNVERIFIED]
- Is this page viewable for other users (e.g. a teacher viewing a student's profile), or strictly self-only? [UNVERIFIED]
