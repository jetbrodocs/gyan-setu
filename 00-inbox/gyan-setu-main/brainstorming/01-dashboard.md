# Module 1: Dashboard — Brainstorming ✅ SCOPED

## PRD Reference
- Sidebar navigation, top bar search, language selector
- Welcome banner, statistics cards, trending section
- User avatar with membership tier
- AI-driven recommendations

## Questions & Decisions

### Q1: Authentication
**Question:** Should the demo have a login/signup flow, or do we land directly on the dashboard as a pre-logged-in user (e.g., "Mahesh Joshi" from the slides)?

**Answer:** Login flow only — no signup. Pre-seeded user accounts for demo.

**Decision:** Demo will have a login screen. No registration/signup flow. We'll use pre-created demo accounts (e.g., Mahesh Joshi) that are already in the system.

---

### Q2: Navigation & Layout
**Question:** Should the sidebar show all 16 modules or only the ones we build?

**Answer:** Show all modules. Nothing greyed out — it's a demo, everything should look complete.

**Decision:** Sidebar displays all modules as fully active links. Each module will have at least a presentable page/screen, even if the underlying functionality is hardcoded or static.

### Q3: Statistics Cards
**Question:** Hardcoded display numbers or computed from database?

**Answer:** From seed data, not hardcoded. We'll have a seeded database with controlled mock data. Stats should be computed from actual CRUD operations on that seed data.

**Decision:** Stats cards pull real counts from the database. We'll create a well-designed seed dataset so the numbers look impressive and realistic for demo purposes. No hardcoding — if the data changes, the stats change.

### Q4: Trending Section
**Question:** Static list or dynamic carousel for trending content?

**Answer:** Follow the screenshot layout (simple list, not carousel). Data comes from seed. No need for randomization or dynamic updates — the demo is shown on a single day. But it must be powered by seed data, not hardcoded in the UI.

**Decision:** Trending section matches the slide layout. Pulls from seeded data. UI follows screenshots as closely as possible — this is a general rule for all modules.

### Q5: AI Recommendations
**Question:** Actual recommendation logic or curated seed data?

**Answer:** No recommendation logic needed. Use seed data to populate the "recommended for you" section. It just needs to look like AI picked it.

**Decision:** Recommendations section is a curated list from seed data. No AI/ML logic behind it.

### Q6: Language Selector
**Question:** Should switching language actually translate the UI?

**Answer:** No. English only for the demo. Language selector is visible but non-functional. Flagged for management discussion.

**Decision:** Show the language selector in UI but keep everything in English. This is a potential scope addition pending management input.

### Q7: Search Bar
**Question:** Functional search or visual-only?

**Answer:** Functional. Search should work across seeded content.

**Decision:** Global search bar is functional — searches across books, audiobooks, and other seeded content. Results should navigate users to the relevant module/item.
