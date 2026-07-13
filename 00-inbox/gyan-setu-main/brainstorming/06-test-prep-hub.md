# Module 6: Test Preparation Hub — Brainstorming ✅ SCOPED

## PRD Reference
- Exam category cards (UPSC, GPSC, SSC, Banking, GATE, JEE/NEET)
- Performance dashboard with readiness donut chart
- Subject-wise progress bars
- Question of the Day

## Questions & Decisions

### Q1: Question data source
**Question:** The PRD mentions 50,000+ test questions across exams like UPSC, GPSC, SSC, etc. Should we source a public exam question dataset, or create a small curated set of sample questions per exam category?

**Answer:** Source a public dataset for exam questions. Use whatever's available.

**Decision:** Find public exam question datasets (likely Kaggle or similar). Categories and volume depend on what's available. Same approach as other modules — dataset-driven.

---

### Q2: Performance dashboard
**Question:** Performance stats computed from real test attempts or static numbers?

**Answer:** Use materialized views in the DB, seeded with pre-computed data. UI loads from those views.

**Decision:** Seed the DB with test attempt history for demo users. Create materialized views for performance stats (readiness %, average score, subject-wise scores, rank). UI reads from these views. No real-time computation needed — the views are pre-seeded.

### Q3: Exam categories
**Question:** Show all 6 PRD categories or adapt to dataset?

**Answer:** Adapt to whatever the dataset provides.

**Decision:** Exam categories driven by dataset. Don't force the PRD's 6 categories — use what the data gives us.
