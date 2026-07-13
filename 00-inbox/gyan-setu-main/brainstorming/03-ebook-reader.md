# Module 3: eBook Reader — Brainstorming ✅ SCOPED

## PRD Reference
- Table of Contents sidebar with Chapters, Notes, Marks tabs
- Reader toolbar: Font size, TTS, WCAG badge, bookmark, share
- Text interaction: Highlight, Note, Ask AI, Translate
- AI Reading Companion chatbot panel
- Reading progress bar with time estimates

## Questions & Decisions

### Q1: Actual reading content
**Question:** Since we're using a public dataset, the reader needs something to display. Should we use public domain book texts (e.g., from Project Gutenberg) so the reader actually shows real book pages, or just show lorem ipsum / placeholder text?

**Answer:** Not real book pages — show text content (and graphics if available). Need to find a way to normalize content from public domain sources. Open to exploring options during build phase.

**Decision:** Reader displays text-based content (not scanned pages). We'll source public domain text (e.g., Project Gutenberg) and normalize it into a readable format. Graphics included where available. Exact approach TBD during build — depends on what content sources offer.

---

### Q2: Reader features
**Question:** Which toolbar features should be functional — font size, TTS, bookmark, share, WCAG badge?

**Answer:** If there's a ready-made reader framework/library that provides these features out of the box, use it and get everything. If not, reduce features to what's practical to build.

**Decision:** Research existing eBook reader frameworks (e.g., epub.js, Foliate, ReadiumJS) during build. If a framework covers font size, TTS, bookmarks etc., use it. Otherwise, implement a minimal reader with reduced features. Don't build complex reader features from scratch.

### Q3: AI Reading Companion
**Question:** Actual LLM integration or skip/mock it?

**Answer:** Yes, integrate a real LLM. Plan is an agent SDK approach — book text lives as files on the server, and an AI agent (e.g., Claude) uses tools to search/grep the book content and answer user questions contextually.

**Decision:** AI Reading Companion is a real feature, not mocked. Architecture: book text stored as files on server → agent SDK (Claude or similar) with tool access (bash/file search) → finds relevant passages → answers user questions about the book. This is a key demo differentiator.

### Q4: Text interactions
**Question:** Should Highlight, Note, Ask AI, Translate all work? Should highlights/notes persist?

**Answer:** Highlights and Notes persist to DB. Translate and Ask AI both route to the AI Reading Companion — tapping Translate on selected text sends it to the companion for translation. No separate translation service needed.

**Decision:** Highlight and Note are functional and persist per user in the DB. Translate and Ask AI both open/send to the AI Reading Companion chatbot panel. The AI companion handles both Q&A and translation. No standalone translation API needed.
