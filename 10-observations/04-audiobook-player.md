---
title: "Observation — Audiobook Player Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/audiobooks, logged in as rahul@demo.com, title: Bhagavad Gita"
---

# Audiobook Player

## Activity
Citizen browses audiobook catalog, opens a title, plays audio, adjusts playback speed, jumps between chapters.

## Inputs
- Seeded audiobook catalog (`GET /api/audiobooks`)
- Real audio files streamed from **archive.org / LibriVox** (public domain), confirmed via network log: `archive.org/download/bhagavad_gita_0803_librivox/...m4b` → 302 redirect → 206 partial-content streaming from archive.org CDN
- User play/pause, speed, chapter-jump interactions

## Outputs
- Audio playback
- Progress bar + elapsed/total time display
- Highlighted "currently playing" chapter in list

## People
- Any logged-in citizen/reader

## Timing
- Audio begins streaming within ~2s of clicking play (multiple 206 partial-content requests observed — standard HTTP range-request streaming)

## Elements on screen — List view
| Element | Detail |
|---|---|
| Filters sidebar | Language only (English — 9 of 9, no other language present in this catalog) |
| In-page search | "Search audiobooks, authors, narrators..." |
| Result count | "9 audiobooks" |
| Cards | 9 titles: Autobiography of a Yogi, Bhagavad Gita, Freedom's Battle, Gitanjali, Hind Swaraj, Meditations, Sadhana, Siddhartha, The Home and the World — each shows cover (flat color placeholder), narrator, duration |

## Elements on screen — Player
| Element | Detail |
|---|---|
| Cover art (left) | Large placeholder cover |
| Title/author/narrator block | e.g. "Bhagavad Gita — by trans. Sir Edwin Arnold — Narrated by Chris Masterson & others" |
| Meta badges | Language (EN), duration (2h 54m), chapter count (19 chapters) |
| Progress bar | Flat horizontal bar, elapsed/total time labels below |
| Controls | Speed toggle (cycles 1x → 1.25x → ... on click, no dropdown menu), rewind-15s, play/pause (large center button), forward-15s |
| Chapters list | 19 chapters with timestamp, currently-playing chapter highlighted |
| "You May Also Like" | Recommendation row below, 4 more covers |

## Problems / Limitations Observed
- **No waveform visualization** — PRD/DEMO_GUIDE both describe a waveform display; actual player shows a plain flat progress bar instead.
- **Speed control is a click-to-cycle toggle, not a dropdown/slider** — clicking "1x" advanced directly to "1.25x" with no visible menu of options (0.75x–2x range claimed in PRD; only one step observed, full range not confirmed).
- Filter sidebar shows only "Language" facet (no Narrator/Duration/Collection filters despite in-page search mentioning narrators).
- Catalog is 100% English — despite Gyaan Setu's stated 4-language scope, no Gujarati/Hindi/Sanskrit audiobooks are seeded.

## Handoffs
- **Before**: Dashboard sidebar → Audiobooks, or list card click (`href="/audiobooks/{id}"`)
- **After**: none — playback is terminal within this module; "You May Also Like" links to other audiobook detail pages

## Raw Notes
- Real third-party streaming dependency (archive.org) is a demo fragility risk — if archive.org rate-limits, blocks hotlinking, or a specific file 404s, playback breaks. Worth a fallback/error-state check in a later pass.
- Chapter timestamps are static seed data (e.g. Introduction 00:00:00, Ch1 00:09:00) — clicking a chapter presumably seeks; not yet tested whether click actually jumps playback position.
