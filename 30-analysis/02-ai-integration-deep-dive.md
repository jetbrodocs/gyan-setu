---
title: "Analysis — AI Integration Deep-Dive"
created: 2026-07-13
updated: 2026-07-13
status: active
source: ["30-analysis/01-feature-gap-analysis.md", "10-observations/02-digital-library.md", "10-observations/03-ebook-reader.md", "10-observations/10-stem-innovation-lab.md"]
---

# AI Integration Deep-Dive

## Summary

The gap analysis (`30-analysis/01-feature-gap-analysis.md`) found AI-generated content is the weakest category in the current build: of 5 named AI features, only **AI Book Summary** fully works. This deep-dive breaks down what each AI feature actually needs, why the others are gapped, and what it takes to close each gap — so a stakeholder demo can prioritize fixes by effort/impact rather than treating "AI is broken" as one undifferentiated problem.

## Current State of Each AI Feature

| Feature | Module | Status | Root Cause |
|---|---|---|---|
| AI Book Summary | Digital Library (book detail, "Overview" tab) | **Working** | Real, pre-computed per book — likely generated once at seed time and stored, not called live per view (no loading spinner observed) |
| AI Reading Companion | eBook Reader | **Broken — config only** | `POST /api/ai/companion` returns 503. Per DEMO_GUIDE.md, this is a missing API key, not missing code. The chat UI, message thread, and error handling are all real and working — the LLM call itself just isn't authenticated. |
| Mind Map | Digital Library (book detail tab) | **Stub** | "Click to generate... (coming soon)" — no backend call attempted on click (unverified whether any endpoint exists at all) |
| Quiz | Digital Library (book detail tab) | **Stub** | Same pattern as Mind Map |
| AI Auto-Transcription | Podcast Creation Studio | **Unverified** | "Live" badge shown during recording UI, but recording itself couldn't be exercised in headless testing — unclear if transcription is wired to anything real |

## Why This Split Exists (Inference)

The demo PRD's architecture principle states: "Real LLM integration via Agent SDK for AI features (Reading Companion, Mind Maps, Quizzes)" — naming all three as equally in-scope, live-LLM features. But only one pattern is actually load-bearing in the running app:

- **Precomputed/seed-time AI calls** (Book Summary) — cheapest to demo reliably, since the LLM call already happened during data seeding and the result is just a DB read at view time. No API key needed live, no latency risk during a stakeholder demo, no failure mode visible to the audience.
- **Live/on-demand AI calls** (Reading Companion) — most expensive to demo reliably, since it needs a working API key *at the moment of the demo*, network reliability, and graceful handling of latency/rate limits. This is the one that's currently broken.
- **Unbuilt** (Mind Map, Quiz) — no attempt was made to wire these at all, despite being conceptually similar to Book Summary (could plausibly reuse the same precompute-at-seed-time pattern).

This suggests the precompute pattern was deliberately chosen for Book Summary specifically because it's the safest to demo, while the two other "generate on click" features were either intentionally deferred or ran out of build time.

## Options for Closing the Gap

### Option A — Configure the API key only (fixes Reading Companion)
- **Effort**: trivial — supply a working Claude API key as an environment variable to the fly.dev deployment.
- **Impact**: restores the one AI feature that's fully coded but non-functional. No code changes.
- **Risk**: live LLM calls during a demo carry latency/failure risk that precomputed content doesn't — worth testing under real network conditions before relying on it in front of stakeholders.

### Option B — Extend the precompute pattern to Mind Map and Quiz
- **Effort**: moderate — requires generating mind-map/quiz content per book at seed time (same mechanism presumably used for Book Summary) and adding a read-only render for each, replacing the "coming soon" stub.
- **Impact**: closes 2 of the 3 stub gaps with the *lowest-risk* AI pattern (no live call during demo, consistent with how Book Summary already works reliably).
- **Risk**: low technical risk; scope is bounded (finite book catalog, ~25 books based on the Digital Library observation).

### Option C — Leave Mind Map/Quiz as stubs, but make the messaging match Reading Companion's honesty
- **Effort**: trivial.
- **Impact**: doesn't add functionality, but ensures the "coming soon" framing is consistent and doesn't overpromise relative to what a stakeholder will actually see clicked live.
- **Risk**: none — purely a scope/communication decision, not a technical one.

## Recommendation

1. **Do Option A immediately** — it's a config change, not a code change, and directly fixes the platform's single most "AI-driven"-feeling interactive feature (a chat companion while reading).
2. **Do Option B if there's build time before the demo** — reusing the Book Summary's precompute pattern for Mind Map/Quiz is the highest-leverage remaining AI work, since it follows an already-proven, low-risk pattern rather than introducing new live-LLM demo risk.
3. **If B isn't feasible in time, do C** — cheap insurance against the stub reading as a bug rather than a scope decision.

## Open Questions

- Is AI Auto-Transcription (Podcast Studio) real or decorative? Needs a manual (non-headless) test with actual microphone input to confirm — flagged in `10-observations/08-podcast-creation-studio.md`.
- What LLM/provider and prompt structure generated the existing Book Summaries? If Mind Map/Quiz reuse the same pipeline, that's a strong argument for Option B being low-effort; if Book Summary used a one-off manual process, Option B's effort estimate should go up. [UNVERIFIED — needs a source-code check of the seed script's AI-generation step, not observable from the live app alone]
- Does the demo PRD's "Real LLM integration via Agent SDK" architecture principle imply Mind Map/Quiz *must* be live-generated-on-click (matching the PRD's literal wording) rather than precomputed? If stakeholders expect to see live generation happen, Option B's precompute approach may not satisfy the intended demo moment — worth confirming expectations before choosing B over a live-generation build.
