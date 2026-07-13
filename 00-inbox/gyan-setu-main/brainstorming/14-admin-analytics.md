# Module 14: Admin Analytics Dashboard — Brainstorming ✅ SCOPED

## PRD Reference
- KPI cards: Active Users, Books Accessed, New Registrations, Session Time
- Daily Active Users Trend (30-day line chart)
- Content Distribution (pie chart)
- Usage by Time of Day (heatmap)
- Top 10 Most Read Books (data table)
- Ward-wise User Distribution (geographic map)
- Export: Excel, PDF, CSV

## Slide Reference (15-admin-analytics.png)
- Separate admin interface with different sidebar (Dashboard, Digital Library, User Mgmt, Analytics, Settings)
- "GMC Library Analytics Dashboard — February 2025"
- KPI cards with trend indicators (+12%, +8%, -2%)
- Line chart, pie chart, heatmap, data table, ward map
- System Admin user, Gandhinagar MC

## Questions & Decisions

### Q1: Separate admin app
**Question:** The slide shows a different sidebar and layout from the user-facing app. Should the admin dashboard be a separate route/section with its own navigation, or integrated into the same app with role-based access?

**Answer:** Same app, role-based. No separate admin login — just accessible as a route within the same logged-in session to keep it simple. Could also be parked/deferred if scope gets tight.

**Decision:** Admin analytics is a route within the same app, accessible from the sidebar (e.g., "My Analytics" item visible in the user sidebar). No separate admin login. Low priority — can be deferred if scope gets tight.

---

### Q2: Charts & data
**Question:** All visualizations or a subset?

**Answer:** Subset is enough.

**Decision:** Priority charts for demo: KPI cards (with trend indicators), Daily Active Users line chart, Content Distribution pie chart. Defer: heatmap, ward map, Top 10 table. All powered by seeded data.

### Q3: Export functionality
**Question:** Export buttons functional or visual-only?

**Answer:** Visual only.

**Decision:** Export buttons (Excel, PDF, CSV) are visual-only. No file generation.
