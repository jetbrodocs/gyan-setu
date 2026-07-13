# Module 10: Indian Knowledge Systems (IKS Heritage) — Brainstorming ✅ SCOPED

## PRD Reference
- Historical timeline selector (1500 BCE to 1947 CE)
- Language options: English, Gujarati, Sanskrit
- Ancient Scriptures section with downloadable texts
- Virtual Experience Zones: 360° immersive tours
- Folk & Oral Traditions section

## Slide Reference (11-iks-heritage.png)
- Timeline: Vedic Era → Mauryan → Gupta → Solanki (selected) → Mughal → Modern
- Featured: Saurashtra Ni Rasdhar by Jhaverchand Meghani with play button
- 360° Tour cards: Modhera Sun Temple, Adalaj Stepwell
- "Start 360° Tour" buttons

## Questions & Decisions

### Q1: Historical timeline
**Question:** The timeline shows 6 eras. Should clicking an era actually filter/change the content shown below, or is it visual-only?

**Answer:** Functional filters. Source a manuscripts dataset and categorize them by historical period (Vedic, Mauryan, Gupta, Solanki, Mughal, Modern). Clicking an era filters to show manuscripts from that period as articles.

**Decision:** Timeline is functional. Seed a manuscripts dataset tagged by era. Content shown as articles/entries within each period.

---

### Q2: 360° Virtual Tours
**Question:** Real 360° immersive experience or placeholder?

**Answer:** Placeholder for now. If a ready library exists we can explore, but not a priority.

**Decision:** 360° tour cards shown in UI but functionality is placeholder. Low priority — explore if an off-the-shelf library makes it easy, otherwise defer.

### Q3: Content source
**Question:** Covered in Q1 — manuscripts dataset categorized by era. Any additional content types needed beyond manuscripts/articles?

**Answer:** _(covered by Q1 — manuscripts as articles per era)_

**Decision:** Primary content is manuscripts/scriptures seeded by era. Folk & Oral Traditions and audio content (like the Saurashtra Ni Rasdhar play button in the slide) can reuse audiobook infrastructure if available in seed data.
