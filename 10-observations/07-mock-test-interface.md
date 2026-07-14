---
title: "Observation — Mock Test Interface Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/mock-test/{testId}, logged in as rahul@demo.com, test: UPSC Prelims — General Studies Paper I"
---

# Mock Test Interface

## Activity
Citizen takes a full-screen timed mock exam: answers/skips/marks questions, navigates via a question grid, submits, and reviews a detailed scored result.

## Inputs
- Test ID from Test Prep Hub category expansion (`GET /api/tests/{testId}`)
- User's per-question answers, marks, navigation
- Submission triggers scoring (`POST /api/tests/{testId}/submit`)

## Outputs
- Live-updating answer/mark/skip counters during the test
- Submit confirmation modal with answered/unanswered/marked tally
- Scored results page: overall %, correct/incorrect/unanswered counts, subject-wise breakdown, question-wise review (collapsed)

## People
- Any logged-in citizen/reader

## Timing
- Test shows a real countdown timer ("TIME LEFT: 01:59:55", ticking down from 2h)
- Initial load briefly shows a "Loading test..." spinner (~2-3s) before rendering — could look like a hang on slow connections, worth noting

## Elements on screen — Exam mode
| Element | Detail |
|---|---|
| Header | Test title ("UPSC Prelims — General Studies Paper I"), countdown timer top-right |
| Marking scheme | "+1 Marks" / "-0.33 Negative" badges shown persistently |
| Question panel | "Question No. N of 15", section label (e.g. "Section: History"), question text, 4 lettered options (A–D) |
| Bottom actions | Mark for Review & Next, Clear Response, Save & Next |
| Right sidebar | Student card (name, ID e.g. "2026-GMC-882"), live counters (Answered/Not Answered/Not Visited/Marked), question grid (1–15) color-coded: green=answered, orange=marked, red=visited-skipped, gray=not visited; SUBMIT TEST button (bottom) |

## Elements on screen — Results
| Element | Detail |
|---|---|
| Header | Test title + "— Results" |
| Score ring | Percentage (e.g. "7% Score"), fraction ("1 / 15 Total Score") |
| Tally cards | Correct (green), Incorrect (red), Unanswered (gray) |
| Subject-wise Performance | Per-subject bar + "X/Y correct (Z%)" — History, Polity, Geography, Economics observed for this test |
| Question-wise Review | Collapsed accordion, not expanded this pass |
| Exit | "← Back to Test Prep" button |

## Problems / Limitations Observed
- None functionally broken — this module worked cleanly end-to-end: load → answer → mark → jump via grid → submit confirmation → real scored results. Best-functioning module observed so far.
- Minor: "Loading test..." spinner has no timeout/error state visible — if the API call failed, unclear what the user would see (not tested; would need to simulate a network failure).

## Handoffs
- **Before**: Test Prep Hub → category expand → "Test N" link (`/mock-test/{testId}`)
- **After**: "Back to Test Prep" → returns to `/test-prep`

## Raw Notes
- Negative marking (-0.33) is modeled but this run only answered 1 of 15 questions, so negative marking wasn't triggered/observed in the final score — worth a follow-up run answering a wrong option deliberately to confirm the penalty applies.
- Marking scheme and subject sections (History, Polity, Geography, Economics) suggest each test has real per-question subject metadata, not just a flat question list — useful for the "My Performance" subject bars seen in Test Prep Hub.
