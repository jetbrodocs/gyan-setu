# Module 8: Podcast Creation Studio — Brainstorming ✅ SCOPED

## PRD Reference
- Recording studio panel with episode title and timer
- Real-time waveform visualization
- Recording controls with noise cancellation
- AI auto-transcription
- My Podcasts panel with series list
- Podcast statistics (listeners, episodes, rating)

## Questions & Decisions

### Q1: Recording functionality
**Question:** Should the demo actually allow recording audio through the browser microphone, or is this more of a showcase page showing what the studio would look like with pre-seeded podcast content?

**Answer:** Yes, actual recording through browser microphone. Also allow uploading audio. This is a key demo feature — regional teachers should be able to easily upload audio. Full publish flow is possible but low priority — skip heavy validation, keep it simple since it's a super admin feature.

**Decision:** Browser-based audio recording + upload is a must. Full publish flow (record → save → appears in podcast library for consumers) is **REQUIRED** per management feedback (2026-03-17). Keep validation minimal. This is a creator-side feature aimed at regional teachers.

---

### Q2: AI auto-transcription
**Question:** Real speech-to-text integration or skip?

**Answer:** Skip.

**Decision:** No AI transcription for the demo. Can show the UI element but non-functional.

### Q3: Podcast listening
**Question:** Should consumers be able to browse and listen to seeded podcasts?

**Answer:** Yes, seed podcast data so consumers can browse and listen.

**Decision:** Both creator and consumer flows. Seed podcast content (public domain audio or sample recordings). Users can browse, play, and listen to podcasts.
