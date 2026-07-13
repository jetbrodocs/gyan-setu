# Module 4: Audiobook Player — Brainstorming ✅ SCOPED

## PRD Reference
- Large cover art display
- Audio playback controls (shuffle, rewind, play/pause, forward)
- Speed control: 0.75x to 2.0x
- Waveform visualization
- Chapters queue on right sidebar
- "You May Also Like" recommendations

## Questions & Decisions

### Q1: Audio content source
**Question:** Where does the actual audio come from? Do we use public domain audiobooks (e.g., LibriVox), generate TTS audio from the book texts, or just have a few sample audio files?

**Answer:** Source from publicly available audiobook datasets (e.g., LibriVox). No TTS generation or custom audio files. Whatever size is available is fine.

**Decision:** Use public domain audiobooks as seed content. No need for TTS generation. Size of catalog depends on what's freely available.

---

### Q2: Playback features
**Question:** Which playback features are must-haves? Use existing framework?

**Answer:** Use an existing audio player framework. Play/pause, rewind/forward, speed control are fine. Remove shuffle — it doesn't make sense for audiobooks.

**Decision:** Leverage existing audio player library. Core features: play/pause, rewind/forward, speed control (0.75x–2.0x), chapter navigation. No shuffle. Drop any PRD features that don't make sense for the demo.

### Q3: Waveform visualization
**Question:** Real reactive waveform or decorative?

**Answer:** Decorative is fine.

**Decision:** Waveform is decorative/static. If the audio player framework provides a real waveform cheaply, great — but don't build one from scratch.
