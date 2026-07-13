# Gyaan Setu — Demo Scope Progress

## Purpose
Track module-by-module decisions for what goes into the demo prototype vs. what's deferred.

## Status Legend
- 🔴 Not started — needs discussion
- 🟡 In discussion — questions pending
- 🟢 Scope agreed — ready to build
- ✅ Built

## Modules

| # | Module | Status | Demo Scope |
|---|--------|--------|------------|
| 1 | Dashboard | 🟢 | Login flow (no signup), all modules in sidebar, stats from seed DB, trending from seed, recommendations from seed (no AI logic), language selector visible but English-only, functional global search |
| 2 | Digital Library (eBook Catalog) | 🟢 | Public dataset for seed, dataset-driven categories & filters, 1-2 sorting options functional, book card → summary page (overview seeded, mind map LLM+cached, quiz LLM live via agent SDK) → reader flow |
| 3 | eBook Reader | 🟢 | Text-based content (not page scans), use existing reader framework if available, real LLM-powered AI Reading Companion (agent SDK + file-based retrieval), highlights & notes persist to DB, translate routes to AI companion |
| 4 | Audiobook Player | 🟢 | Public domain audiobooks (e.g., LibriVox), existing audio player framework, play/pause/rewind/forward/speed control/chapters — no shuffle, decorative waveform |
| 5 | Newspapers & Periodicals | 🟢 | Public news dataset, newspaper-style full-page layout with magazine reader framework, functional date/language/city filters against seed data |
| 6 | Test Preparation Hub | 🟢 | Public exam question dataset, categories from dataset, performance dashboard via seeded materialized views in DB |
| 7 | Mock Test Interface | 🟢 | Full end-to-end test flow (pick test, answer MCQs, timer, submit), detailed results page (score, breakdown, negative marking, subject-wise), results persist to DB |
| 8 | Podcast Creation Studio | 🟢 | Browser mic recording + upload (key demo feature for regional teachers), **full publish flow REQUIRED** (record → edit → publish), no AI transcription, consumer-side browse & listen with seeded podcast data |
| 9 | AI Book Summaries | 🟢 | NOT a separate module — it's the book detail/summary page within Digital Library flow (Book Card → Summary Page → Reader) |
| 10 | Indian Knowledge Systems (IKS) | 🟢 | Manuscripts dataset tagged by era, functional timeline filter, 360° tours placeholder (low priority), folk/oral traditions reuse audiobook infra |
| 11 | STEM Innovation Lab | 🟢 | Browser-based code editor/runner (existing library), public tutorial videos (YouTube embeds OK), badges & leaderboard via seeded materialized views |
| 12 | User Profile / My Dashboard | 🟢 | All stats from seeded materialized views, certificates list only (no PDF download), quick settings visual-only |
| 13 | Membership Plans | 🟢 | Display-only plans page, no payment gateway, no plan switching, user tier pre-assigned in seed |
| 14 | Admin Analytics Dashboard | 🟢 | **DEFERRED** per management (2026-03-17) — not needed for demo day |
| 15 | Kiosk UI | 🟢 | DEFERRED — out of scope for demo |
| 16 | Mobile App | 🟢 | DEFERRED — out of scope for demo |
| 17 | Video Library (new module) | 🟢 | Browse & watch seeded videos (YouTube embeds approved), simple embed player, no upload flow, search & filter like Digital Library |

## Decision Log
_(Decisions will be recorded here as we work through each module)_
