---
title: "Observation — User Profile / My Dashboard Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/profile, logged in as rahul@demo.com"
---

# User Profile / My Dashboard

## Activity
Citizen reviews their own reading/learning stats, activity history, in-progress items, certificates, saved bookshelf, and recent test scores in one aggregate view.

## Inputs
- User's own historical activity across all other modules (reading, audiobooks, tests, podcasts)
- No user input on this page this pass — purely a read/display view (sidebar mentions "Quick Settings" per PRD, not found — see Problems)

## Outputs
- Aggregate profile dashboard

## People
- Any logged-in citizen/reader (own data only — not tested whether other users' profiles are viewable, likely not)

## Elements on screen
| Element | Detail |
|---|---|
| Route / labels | Sidebar item: "My Analytics"; page header: "My Dashboard"; URL: `/profile` — three different names for the same screen (same naming-inconsistency pattern as Newspapers/Periodicals) |
| Profile card | Avatar initials "RS", name, email, tier badge ("Standard Member"), "CURRENT STREAK — 7 Days" |
| Stat tiles (4) | 23 Books Read, 12 Audiobooks, 14 Tests Taken, 128.5h Podcast Time |
| Reading Activity chart | Bar chart, "Last 30 Days", daily values dated 19–17 (wrapping month), values roughly 0–120 (unit not labeled — pages? minutes?) |
| Currently Reading | 2 items: Atomic Habits (38%, 120/320 Pages), Saraswatichandra (12%, 145/1240 Pages) — "View All" link |
| Earned Certificates | 3 badges shown: Arduino Certified Maker, Web Development Basics, Python Fundamentals (same 3 badges seen in STEM Lab's "My Badges") |
| My Bookshelf (Saved) | 3 saved book covers (Saraswatichandra, Bhavni Bhavai, Malela Jeev), "Manage" link |
| Recent Test History | Table: Test Name, Score — two UPSC Prelims attempts: 7% (13 Jul 2026) and 69% (15 Mar 2026), "View All" link |

## Cross-Module Confirmation
- **The 7% score from the Mock Test Interface observation session appears here dated "13 Jul 2026"** — confirms test results are genuinely persisted per-user and immediately reflected in the profile, not mocked/static. Strong signal of real CRUD wiring per the demo PRD's "no hardcoded UI data" principle.

## Problems / Limitations Observed
- **"Quick Settings" panel (Notifications, Language, Dark Mode) named in the original PRD module spec was not found on this page** — full page captured, no settings controls present. Either not implemented or located elsewhere (not yet found in this session).
- Reading Activity chart has no Y-axis unit label — unclear if bars represent minutes, pages, or a composite score.
- Three different names for this one module (sidebar "My Analytics", header "My Dashboard", route `/profile`) — worth resolving to one consistent name for the glossary/spec.

## Handoffs
- **Before**: Dashboard sidebar → "My Analytics" (under "MY ACCOUNT" section)
- **After**: "View All" links (Currently Reading, Recent Test History) and "Manage" (Bookshelf) not yet traversed

## Raw Notes
- Certificates and badges appear duplicated in concept between this page and STEM Lab — same 3 items shown in both places, suggesting a shared underlying "achievements" data model rather than STEM-specific badges.
