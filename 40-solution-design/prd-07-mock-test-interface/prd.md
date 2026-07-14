---
title: "PRD — Mock Test Interface"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/07-mock-test-interface.md"
source_observation: "10-observations/07-mock-test-interface.md"
---

# Mock Test Interface

## Overview
The Mock Test Interface is the platform's most cleanly working module — a full timed exam simulation
with real scoring, confirmed to persist correctly to the citizen's profile. This PRD exists primarily
to formally document a module that already meets a production bar, plus close a small number of edge
cases that weren't exercised during this session's walkthrough.

## User Roles
- **Citizen/Reader** (exam aspirant) — the sole user of this module.

## Functional Requirements

### REQ-001: Timed exam session
The system must present a full-screen exam with a live countdown timer, question panel, and
navigation sidebar.
- **Acceptance criteria**: Timer counts down accurately from the test's configured duration; question
  panel shows one question at a time with 4 lettered options.
- **Source**: process map step 2 (confirmed working).

### REQ-002: Answer, mark, clear, and navigate
The system must support answering a question, marking it for review, clearing a response, and
jumping directly to any question via a numbered grid — in any order, not requiring sequential
completion.
- **Acceptance criteria**: "Save & Next," "Mark for Review & Next," "Clear Response," and direct grid
  navigation all work as expected; the grid visually distinguishes answered/marked/skipped/
  not-visited states in real time.
- **Source**: process map step 3 (confirmed working, including all four question states).

### REQ-003: Submission confirmation
The system must show a confirmation modal before final submission, summarizing answered/unanswered/
marked counts, with an explicit warning that submission is irreversible.
- **Acceptance criteria**: Modal accurately reflects live counts at the moment of submission attempt;
  Cancel returns to the exam with no data loss; Submit proceeds to scoring.
- **Source**: process map steps 5–6 (confirmed working).

### REQ-004: Real-time scoring with subject breakdown
On submission, the system must calculate and display an overall score, correct/incorrect/unanswered
counts, and a subject-wise performance breakdown, applying negative marking for incorrect answers per
the test's stated marking scheme.
- **Acceptance criteria**: Score matches manual calculation given the marking scheme; results persist
  and are immediately reflected in the citizen's Test Prep Hub readiness stats (`prd-06-test-prep-hub`)
  and Profile's Recent Test History (`prd-11-user-profile`).
- **Source**: process map step 7 (confirmed working); negative-marking application specifically was
  not exercised this session (only 1 of 15 questions was answered, correctly) — needs a deliberate
  wrong-answer test to fully confirm.

### REQ-005: Timer expiry behavior
The system must define and implement clear behavior for when the countdown timer reaches zero.
- **Acceptance criteria**: On timer expiry, the test either auto-submits with whatever was answered
  at that point, or locks further input with a clear "time's up" state leading into submission — not
  left ambiguously open.
- **Source**: process map Open Questions — not observed/tested this session; this is a defined gap in
  test coverage, not a confirmed bug, but a genuine production requirement that must be explicit.

### REQ-006: Load-failure handling
If the test fails to load (API error, network issue), the system must show a clear error state
instead of an indefinite "Loading test..." spinner.
- **Acceptance criteria**: A load failure surfaces a retry option or clear error message within a
  bounded timeout (e.g. 10 seconds), never spinning indefinitely.
- **Source**: process map Known Issues — no error/timeout state was observed for the loading spinner;
  flagged as a gap since this is the exam-taking module, where a stuck load is highest-stakes.

## Extension Opportunities
- **This module is the platform's reference implementation for AI-assisted quiz content** (see
  `prd-02-digital-library` REQ-008 and `prd-06-test-prep-hub`'s Extension Opportunities) — its
  question-navigator, scoring, and results UI are proven and reusable wherever else the platform
  needs a timed or scored assessment experience.
- **Detailed Question-wise Review**: the results page already has a "Question-wise Review" accordion
  (observed collapsed, not expanded) — ensuring this shows full per-question explanations (not just
  right/wrong) would turn this into a genuine study tool, not just a scorecard, extending an
  already-built UI element rather than adding a new one.

## Data Touched
- **Read**: test definition (questions, options, correct answers, subject tags, marking scheme,
  duration)
- **Write**: per-question answer/mark state during the attempt, final submission record (score,
  per-question correctness, timestamp) — confirmed this session to correctly propagate to both Test
  Prep Hub and Profile views

## Out of Scope / Deferred
- Proctoring/anti-cheating measures (camera monitoring, tab-switch detection) — not observed, not
  requested; current scope is self-paced honest practice, not certified/monitored examination.
- Multi-attempt comparison analytics beyond the existing Recent Test History list — a possible
  future enhancement, not current scope.

## Open Questions
- Confirmed via REQ-004/005: does negative marking apply correctly, and does timer expiry auto-submit?
  Both need a deliberate test pass before this module can be signed off as fully production-verified,
  despite otherwise being the platform's strongest module.
