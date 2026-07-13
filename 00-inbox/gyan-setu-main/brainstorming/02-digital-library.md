# Module 2: Digital Library (eBook Catalog) — Brainstorming ✅ SCOPED

## PRD Reference
- Search and filter functionality (Fiction, Non-Fiction, History, Self-Help, Technology, Kids)
- Sorting: By Relevance, Rating, Downloads, New Arrivals
- Book grid view with cover image, title, author, rating, download/read options
- Collections: Classic Literature, Modern Fiction, Academic Texts, Regional Content in Gujarati, Science & Technology, Business & Economics

## Questions & Decisions

### Q1: Book catalog size
**Question:** How many books should we seed? The PRD mentions 50,000+ but for the demo, do you want a smaller representative set — say 50-100 books across all categories — or do you want it to feel large?

**Answer:** Use a freely available online book dataset for seeding. Size depends on what's available — the bigger the better for demo realism.

**Decision:** Source a public book dataset (e.g., Open Library, Google Books API dump, Kaggle book datasets) for seed data. We'll map the dataset fields to our schema. This applies broadly — we should look for public datasets for other content types too (audiobooks, newspapers, test questions, etc.).

---

### Q2: Category filters
**Question:** Should all category filters be functional? Do we use the exact categories from the slides?

**Answer:** Filters will be functional. Categories come from whatever the dataset provides — we don't need to force the exact slide categories.

**Decision:** Category filters are functional and driven by the dataset's own categories/genres. No need to match the PRD categories exactly — use what the data gives us.

### Q3: Book detail / actions
**Question:** What happens when a user clicks a book card?

**Answer:** Opens a book detail page (cover, description, author, rating etc.), then a "Read" button inside that opens the eBook Reader (Module 3). For now we'll use whatever content the open dataset provides, but the reader could be custom-designed in future.

**Decision:** Flow is: Book Card → Book Detail/Summary Page (includes AI summary, overview, mind map, quiz tabs — see slide 10-ai-book-summaries.png) → "Read" button → eBook Reader. The "AI Book Summaries" from the PRD is NOT a separate module — it's the book detail page within Digital Library. Reader content depends on what the dataset offers for now; custom reader design is a future possibility.

### Q3b: Book Summary Page — Tab behavior
**Question:** The summary page has Overview, Mind Map, and Quiz tabs plus AI Audio Summary. How should each work?

**Answer:**
- **Overview/Summary:** Pre-generated from seed data.
- **Mind Map:** Generated live by LLM on first click, then saved to DB so it's cached for subsequent visits.
- **Quiz:** Generated live by LLM via agent SDK (same pattern as AI Reading Companion — give it the book file, generate 4-5 questions on the fly).
- **AI Audio Summary:** _(not yet discussed — TBD)_

**Decision:** Mixed approach per tab. Overview is seeded. Mind Map is LLM-generated on demand + cached in DB. Quiz is LLM-generated live every time via agent SDK (book file as context, 4-5 MCQs). This gives a good demo of real AI capabilities.

### Q4: Sorting
**Question:** All four sorting options functional or just a couple?

**Answer:** One or two is enough for the demo.

**Decision:** Implement 1-2 sorting options (likely Rating and New Arrivals since those map easily to dataset fields). Show all four in the UI dropdown but only wire up the ones that make sense with our dataset.
