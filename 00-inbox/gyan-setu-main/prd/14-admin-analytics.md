# Module 14: Admin Analytics Dashboard (Low Priority)

**Reference Screenshot**: `slides/15-admin-analytics.png`

## Description
Analytics dashboard for administrators. Accessible as a route within the same app (no separate admin login). This module is **low priority and deferrable**.

## Data Source
- Seeded data for all charts and KPIs

## Specifications

### Layout
- Same app, different route (e.g., /analytics)
- Role-based visibility (accessible from sidebar "My Analytics")
- Different visual treatment from user-facing pages (per screenshot)

### Priority Charts (build these)
- **KPI Cards**: Active Users, Books Accessed, New Registrations, Avg Session Time — with trend indicators (+/-%)
- **Daily Active Users Trend**: 30-day line chart
- **Content Distribution**: Pie chart (eBooks, Audiobooks, Test Prep, Podcasts)

### Deferred Charts
- Usage by Time of Day heatmap
- Top 10 Most Read Books table
- Ward-wise User Distribution map

### Export Buttons
- Excel, Report PDF, CSV buttons
- **Visual-only** — no file generation
