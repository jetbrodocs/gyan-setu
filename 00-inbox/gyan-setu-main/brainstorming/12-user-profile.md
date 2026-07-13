# Module 12: User Profile / My Dashboard — Brainstorming ✅ SCOPED

## PRD Reference
- User profile card with avatar, email, membership tier, reading streak
- User statistics: Books read, audiobooks, tests, podcast time
- Reading Activity chart (30-day history)
- Currently Reading section with progress
- Earned Certificates with download option
- My Bookshelf (Saved collections)
- Recent Test History
- Quick Settings: Notifications, Language, Dark Mode

## Slide Reference (13-my-dashboard.png)
- Mahesh Joshi, Gold Member, 14-day streak
- Stats: 47 Books Read, 12 Audiobooks, 24 Tests Taken, 8.5h Podcast Time
- Reading Activity bar chart (30 days)
- Currently Reading: Saraswatichandra Vol 1 (45%), Atomic Habits
- Certificates: Python Basics, Robotics Lvl 1, History Expert
- My Bookshelf with saved book covers
- Recent Test History: GPSC Mock 4 (82%)

## Questions & Decisions

### Q1: Data source
**Question:** Should all profile stats (books read, streaks, certificates, test history, reading activity chart) come from seeded materialized views like the other dashboards, or should some be computed live from the user's actual activity in the demo?

**Answer:** Seeded materialized views, same pattern as other modules.

**Decision:** All profile stats, streaks, reading activity chart, test history — all from seeded data. Consistent with the materialized views approach used elsewhere.

---

### Q2: Certificates
**Question:** Downloadable certificate PDFs or just a list?

**Answer:** Just show the list.

**Decision:** Certificates displayed as a list only. No PDF generation or download for the demo.

### Q3: Quick Settings
**Question:** Any settings functional (dark mode, notifications, language)?

**Answer:** Visual only.

**Decision:** Quick Settings toggles are visual-only. No functional dark mode, notifications, or language switching.
