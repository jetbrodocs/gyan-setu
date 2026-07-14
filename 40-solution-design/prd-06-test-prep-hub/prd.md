---
title: "PRD — Test Preparation Hub"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/06-test-prep-hub.md"
source_observation: "10-observations/06-test-prep-hub.md"
---

# Test Preparation Hub

## Overview
The Test Prep Hub is the citizen's entry point for exam practice: a daily question, exam category
browsing, and personal readiness stats, launching into the Mock Test Interface. This module is
already well-built and working end-to-end — the requirements here are mostly about content depth and
polish rather than fixing broken functionality.

## User Roles
- **Citizen/Reader** (typically an exam aspirant) — the sole user of this module.

## Functional Requirements

### REQ-001: Question of the Day with immediate feedback
The system must present a daily practice question with 4 options, evaluate the citizen's answer
in-place on submission, and reveal the correct answer.
- **Acceptance criteria**: Selecting an option and submitting shows correct/incorrect state
  immediately (green/red), with the correct answer highlighted regardless of the citizen's choice.
- **Source**: process map step 2 (confirmed working, including real scoring logic).

### REQ-002: Personal readiness dashboard
The system must display an overall readiness percentage, tests-attempted count, average score,
estimated national rank, and subject-wise progress bars, all reflecting the citizen's real attempt
history.
- **Acceptance criteria**: Values update after each completed mock test (cross-module consistency
  with `prd-07-mock-test-interface` and `prd-11-user-profile`, already confirmed working this
  session).
- **Source**: process map step 3 (confirmed working).

### REQ-003: Exam category browsing
The system must display exam categories (e.g. Banking & IBPS, GATE Engineering, GPSC Gujarat,
JEE/NEET Prep, SSC CGL/CHSL, UPSC Civil Services) each showing available test count and aspirant
count, expanding inline to show individual tests on click.
- **Acceptance criteria**: Clicking a category expands a list of its tests without a page navigation;
  clicking a test launches the Mock Test Interface (`prd-07-mock-test-interface`).
- **Source**: process map steps 4–5 (confirmed working).

### REQ-004: Descriptive test names
Individual tests within a category must have descriptive, real-world names (e.g. "UPSC Prelims 2025 —
General Studies Paper I") rather than generic placeholders ("Test 1", "Test 2").
- **Acceptance criteria**: No test in any category is labeled with a generic sequential name.
- **Source**: Gap analysis Category 5 (Data/Formatting) — confirmed generic naming in the current
  build.
- **Priority**: Low — cosmetic, but affects how credible/coaching-grade the platform feels.

## Extension Opportunities
- **Grow the question bank via the same AI pipeline used elsewhere on the platform**: Question of the
  Day and mock test questions could be AI-assisted (generated and reviewed) to scale beyond the
  current small seed set faster than manual authoring alone — reuses AI capability already proven
  functional (Digital Library summaries) rather than a new content pipeline.
- **QOTD streaks and history**: since the citizen's reading streak is already tracked and shown
  elsewhere (`prd-11-user-profile`), extending the same streak mechanic to daily-question answering
  would reinforce the existing engagement pattern with no new infrastructure.
- **Category-level leaderboards**: the STEM Innovation Lab already has a working class leaderboard
  (`prd-10-stem-innovation-lab`) — the same component/pattern could extend to exam categories here
  (e.g. "Top UPSC Aspirants This Week"), reusing a proven UI rather than designing a new one.

## Data Touched
- **Read**: exam category/test catalogue, Question of the Day content, citizen's own attempt history
  and readiness stats
- **Write**: QOTD answer submission (records the attempt and correctness)

## Out of Scope / Deferred
- Live/proctored exam simulation (camera monitoring, identity verification during a test) — not
  observed, not requested; the current self-paced mock test format is the intended scope.
- Peer discussion/doubt-solving forums per question — not observed, not requested at this phase.

## Open Questions
- Are the displayed "Users" counts per category (e.g. "18k Users") live aggregates or static seed
  numbers? If they're meant to be real, they need to be wired to actual attempt counts; if
  intentionally illustrative, that should be stated rather than presented as live data.
- What does the Question of the Day's top-right category link actually navigate to? Not confirmed
  this session.
