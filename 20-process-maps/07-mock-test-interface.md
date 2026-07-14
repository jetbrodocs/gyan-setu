---
title: "Process Map — Mock Test Interface"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/07-mock-test-interface.md", "10-observations/11-user-profile-my-dashboard.md"]
---

# Mock Test Interface

## Process Overview
- **Purpose**: Citizen takes a full timed mock exam and receives a scored result.
- **Frequency**: Any time a citizen starts a test from Test Prep Hub.
- **Trigger**: Test selected from an expanded exam category in Test Prep Hub.
- **End condition**: Citizen submits the test and views results, or abandons mid-test (behavior on abandon untested).

## Roles Involved
- Citizen/Reader

## Inputs and Outputs
- **Inputs**: Test ID (`GET /api/tests/{testId}`); citizen's per-question answers/marks/navigation
- **Outputs**: Submission (`POST /api/tests/{testId}/submit`); scored results; a Recent Test History entry visible on the citizen's Profile

## Process Steps

1. Citizen arrives at `/mock-test/{testId}` from Test Prep Hub.
2. Brief "Loading test..." spinner (~2-3s), then the exam UI renders: header (test title, live countdown timer), marking scheme badges (+1 / -0.33), question panel, right sidebar (student card, live answer counters, question grid, Submit Test button).
3. For each question, citizen chooses one of:
   - **Answer + Save & Next**: selects an option, clicks "Save & Next" → counted as Answered (green in grid), advances to next question.
   - **Mark for Review & Next**: flags without necessarily answering → counted as Marked (orange in grid), advances.
   - **Clear Response**: clears a selected answer on the current question.
   - **Jump via question grid**: clicks any numbered cell (1–N) to go directly to that question, regardless of order.
4. Citizen repeats step 3 until ready to finish (does not need to visit every question).
5. Citizen clicks "SUBMIT TEST" (sidebar, always visible).
6. Confirmation modal appears: "Submit Test?" with live tallies (Answered / Unanswered / Marked for review) and a warning "This action cannot be undone."
   - **Cancel** → returns to the exam, no data lost.
   - **Submit** → proceeds to step 7.
7. System calls `POST /api/tests/{testId}/submit`; results page renders in place of the exam UI: score ring (%), fraction (correct/total), tally cards (Correct/Incorrect/Unanswered), Subject-wise Performance bars, collapsed "Question-wise Review" accordion.
8. Citizen clicks "← Back to Test Prep" → returns to `/test-prep`.
9. **Downstream**: the completed attempt's score and date appear in the citizen's Profile under "Recent Test History" (confirmed cross-module — see `10-observations/11-user-profile-my-dashboard.md`).

## Connected Processes
- **Fed by**: `20-process-maps/06-test-prep-hub.md` (test selection)
- **Feeds into**: `20-process-maps/11-user-profile-my-dashboard.md` (Recent Test History reflects the new attempt)
- **Returns to**: `20-process-maps/06-test-prep-hub.md` ("Back to Test Prep")

## Systems and Tools
- `GET /api/tests/{testId}` (test load)
- `POST /api/tests/{testId}/submit` (real scoring, confirmed persisted)
- Question grid color legend: green = answered, orange = marked, red = visited-but-skipped, gray = not visited

## Known Issues
- None functionally broken — this is the most cleanly working module observed across the whole app. Traced to `10-observations/07-mock-test-interface.md`.
- "Loading test..." spinner has no visible timeout/error state if the load fails — untested, but a UX gap if the API call errors.

## Open Questions
- Does negative marking (-0.33) actually apply to a wrong answer? Only 1 of 15 questions was answered correctly in the test run observed — a run with a deliberate wrong answer is needed to confirm. [UNVERIFIED]
- What happens if the countdown timer reaches zero — auto-submit, or does the test just sit open? [UNVERIFIED]
