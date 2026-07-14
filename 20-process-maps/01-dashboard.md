---
title: "Process Map — Dashboard"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/01-dashboard.md"]
---

# Dashboard

## Process Overview
- **Purpose**: Landing screen after login — orients the citizen with personalized status and surfaces entry points to every other module.
- **Frequency**: Every session, once per login.
- **Trigger**: Successful login at `/login`.
- **End condition**: Citizen navigates away via sidebar, search, or a content card.

## Roles Involved
- Citizen/Reader (any logged-in account)

## Inputs and Outputs
- **Inputs**: Session/auth token; seeded user profile, reading history, trending catalog data
- **Outputs**: Rendered dashboard; navigation into any other module

## Process Steps

1. Citizen submits email/password on `/login`.
2. System validates credentials via `POST /api/auth/login`.
   - **If valid**: redirect to `/dashboard`. Go to step 3.
   - **If invalid**: [UNVERIFIED] — error state not observed this session.
3. Dashboard loads and renders:
   - Welcome banner with citizen's name and unread/available book count
   - "Continue Reading" cards (in-progress books with % complete)
   - Stat tiles (eBooks, Reading Hours, Tests, Certificates)
   - "Trending in Gandhinagar" grid (8 books)
4. Citizen chooses a next action:
   - **Click a sidebar item** → navigate to that module (Digital Library, Audiobooks, Periodicals, Test Prep Hub, Podcast Studio, Podcasts, IKS Heritage, STEM Lab, Video Library, My Analytics, Membership). Go to that module's process map.
   - **Click a "Continue Reading" card** → jumps to eBook Reader for that book, mid-progress.
   - **Click a trending book cover** → navigates to Digital Library book detail.
   - **Click "View All"** (trending section) → navigates to Digital Library, presumably filtered/sorted (not confirmed).
   - **Use top search bar** → **Exception A: Search has no effect** (see below).
   - **Click notification bell** → **Exception B: No observed effect** (see below).
   - **Click sidebar collapse (hamburger)** → sidebar toggles to icon-only rail; dashboard content unaffected. Cosmetic-only branch, returns to same step.

### Exception A: Top Search Bar Non-Functional
A1. Citizen types a query into "Search for books, exams, audiobooks..." in the top bar.
A2. No dropdown, filtered result, or navigation occurs — field visually accepts text but has no wired behavior.
A3. Citizen must navigate manually via sidebar to search within a specific module (e.g. Digital Library's own in-page search does work — see `20-process-maps/02-digital-library.md`).

### Exception B: Notification Bell Non-Functional
B1. Citizen clicks the bell icon.
B2. No panel, dropdown, or badge-count change is observed.
B3. Flow effectively dead-ends here; citizen must navigate away via another control.

## Connected Processes
- **Feeds into**: every other module's process map (Dashboard is the hub)
- **Fed by**: Login (not yet separately mapped — out of scope unless requested)

## Systems and Tools
- Frontend: Next.js client-rendered dashboard
- Backend: `POST /api/auth/login` (confirmed real, 200 response)
- Data: seeded user + catalog data, no hardcoded UI values observed

## Known Issues
- Top search bar (global, top-of-page) is non-functional — see Exception A. Traced to `10-observations/01-dashboard.md`.
- Notification bell is non-functional — see Exception B. Traced to `10-observations/01-dashboard.md`.

## Open Questions
- What happens on invalid login? [UNVERIFIED]
- Does "View All" on the trending section apply any specific filter, or just open the unfiltered Digital Library? [UNVERIFIED]
