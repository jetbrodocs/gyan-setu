# Module 5: Newspapers & Periodicals — Brainstorming ✅ SCOPED

## PRD Reference
- Sub-tabs: Newspapers, Magazines, Journals
- Archive access with date/language/city filters
- Full-page newspaper viewer with zoom
- News articles carousel below viewer
- Featured: Gujarat Samachar, Sandesh, Divya Bhaskar
- Tools: Clip, Translate, Share, Download PDF

## Questions & Decisions

### Q1: Content source
**Question:** Real newspapers have copyright issues. For the demo, should we use sample/mock newspaper layouts with placeholder content, source from a public news API or dataset, or something else?

**Answer:** Pull from a public news API or dataset.

**Decision:** Use a public news API or dataset for content. No real copyrighted newspaper pages. We'll present the content in our own newspaper-style layout.

---

### Q2: Viewer functionality
**Question:** Full-page newspaper viewer with zoom, or simple article-based reading?

**Answer:** Not article-based. Need actual newspaper/magazine-style layout. Source newspaper-style layout datasets and use a magazine reader framework/library to display them.

**Decision:** Use a magazine/document reader library (e.g., PDF viewer, flipbook library) to show newspaper-style full-page layouts. Source content that looks like real newspaper pages. Not an article feed — it should feel like reading an actual newspaper/magazine.

### Q3: Archive & filters
**Question:** Date picker and filters functional or visual-only?

**Answer:** Functional. Filters work against seeded data.

**Decision:** Date picker, language filter, and city filter all functional against seeded newspaper data.
