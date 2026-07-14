---
title: "Observation — Test Preparation Hub Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/test-prep, logged in as rahul@demo.com"
---

# Test Preparation Hub

## Activity
Citizen answers a daily practice question, browses exam categories, expands a category to see its available tests, and reviews personal readiness/performance stats.

## Inputs
- Seeded exam categories, tests, and Question-of-the-Day content
- User's own performance history (attempted tests, scores, subject-wise stats)
- User click on QOTD option + Submit, category expand click

## Outputs
- Immediate right/wrong feedback on QOTD with correct-answer reveal
- Expanded inline test list per category
- Static performance dashboard (no interaction beyond display, this pass)

## People
- Any logged-in citizen/reader

## Elements on screen
| Element | Detail |
|---|---|
| Header | "Test Preparation Hub — Practice with mock tests for India's top competitive exams" |
| Exam Categories (6 cards) | Banking & IBPS (2 Tests, 18k Users), GATE Engineering (2 Tests, 5.2k Users), GPSC Gujarat (3 Tests, 12k Users), JEE/NEET Prep (2 Tests, 22k Users), SSC CGL/CHSL (2 Tests, 15k Users), UPSC Civil Services (3 Tests, 8.5k Users) — each color-coded with icon |
| Question of the Day panel | Category tag link (e.g. "UPSC Civil Services"), question text, 4 lettered options (A–D), Submit Answer button |
| My Performance | Donut chart "Overall Readiness" (63%), Tests Attempted (3), Avg. Score (67%), National Rank (#1,850), subject-wise progress bars (Science 80%, Polity 78%, History 75%, Economics 68%, Reasoning 68%, Geography 64%) |

## Interaction Behavior Observed
- **QOTD answers in place, no navigation.** Selecting "Mohenjo-daro" (wrong) then Submit: wrong option turns red with ✕, correct option (Dholavira) turns green with ✓, banner reads "Incorrect. The correct answer is B." — clean, real feedback logic, not just static.
- **Category cards expand inline on click** (not a page navigation) — clicking "UPSC Civil Services" opened a dropdown-style panel beneath the grid listing "Test 1", "Test 2", "Test 3", each with a chevron (presumably leads into Mock Test Interface, not yet traversed).

## Problems / Limitations Observed
- Test names within a category are generic ("Test 1", "Test 2", "Test 3") — no descriptive titles (e.g. "UPSC Prelims 2025 Mock") as might be expected for a stakeholder demo.
- QOTD category link (top-right, "UPSC Civil Services") — purpose/destination not tested this pass.

## Handoffs
- **Before**: Dashboard sidebar → Test Prep Hub
- **After**: expanding a category → "Test N" links (chevron) presumably lead into Mock Test Interface — separate observation needed

## Raw Notes
- Numbers (18k Users, 5.2k Users, etc.) look like static/seeded display counters, not live aggregates — worth confirming against `Admin Analytics` module later.
