---
title: "Observation — Admin Analytics Dashboard Module"
created: 2026-07-13
updated: 2026-07-13
status: active
correction: "2026-07-13 — schema.prisma actually defines ADMIN and OFFICIAL in the Role enum; corrected finding below (previously said no ADMIN role exists at all — that was true only of seed data, not the schema)."
source: "Live demo route probing (rahul@demo.com) + source inspection of 00-inbox/gyan-setu-main/prisma/seed.ts and src/app/"
---

# Admin Analytics Dashboard

## Activity
Not observable — module does not exist in this build.

## Findings
- **No admin account exists in the demo.** DEMO_GUIDE.md lists only 4 login accounts (`rahul@demo.com`, `mahesh@demo.com`, `priya@demo.com`, `teacher@demo.com`); none are an admin/govt-official role.
- **Schema supports ADMIN/OFFICIAL roles; seed data just doesn't use them.** `prisma/schema.prisma`'s `Role` enum defines `CITIZEN, STUDENT, SENIOR, CREATOR, ADMIN, OFFICIAL` — the data model already anticipates admin and government-official roles. But `prisma/seed.ts` only creates the 4 demo users as `Role.CITIZEN`/`STUDENT`/`CREATOR` — no `ADMIN` or `OFFICIAL` user was ever seeded, so there's no account to log in with and no route was built to serve them even if one existed.
- **No admin route exists.** Probed `/admin`, `/admin/analytics`, `/analytics` while logged in as `rahul@demo.com` — all three returned a 404 "This page could not be found." A `grep` for "admin" across `00-inbox/gyan-setu-main/src/app/` found no matching route directory.
- No sidebar link to any admin/analytics-for-admins screen appeared in any of the 13 other modules observed this session (the "My Analytics" sidebar item is the *personal* profile dashboard — see `11-user-profile-my-dashboard.md` — not this module).

## Conclusion
This module is **not implemented** in the current demo build. This is consistent with its "Low (deferrable)" priority in the demo-scope PRD (`00-inbox/gyan-setu-main/prd/00-overview.md`) — it appears to have been deliberately deprioritized/cut for the stakeholder demo, not broken or hidden behind an untested login.

## Handoffs
- N/A — module absent

## Raw Notes
- If this module is picked up later, the original PRD spec (`PRD_CONTENTS_SUMMARY.txt`, section 4.14) describes: KPI cards (Active Users, Books Accessed, New Registrations, Session Time), DAU trend line chart, content distribution pie chart, usage-by-time heatmap, top-10-books table, ward-wise geographic map, and Excel/PDF/CSV export — none of this exists yet to observe.
- A `System Admin` and `Government Official` role are both named in the original 16-module PRD's 8-role user matrix, and — as corrected above — both already exist in the Prisma schema (`ADMIN`, `OFFICIAL`). If this module is prioritized, the data-model work is already done; what's missing is a seeded admin account, an `/admin` route, and the actual dashboard UI/queries.
