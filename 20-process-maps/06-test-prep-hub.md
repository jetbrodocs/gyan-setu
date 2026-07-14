---
title: "Process Map — Test Preparation Hub"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/06-test-prep-hub.md"]
---

# Test Preparation Hub

## Process Overview
- **Purpose**: Citizen practices via a daily question, browses exam categories, and launches a mock test.
- **Frequency**: Any time a citizen wants to practice or check readiness.
- **Trigger**: Sidebar → Test Prep Hub.
- **End condition**: Citizen launches a test (hands off to Mock Test Interface) or navigates away.

## Roles Involved
- Citizen/Reader

## Inputs and Outputs
- **Inputs**: Seeded exam categories/tests, citizen's own performance history, QOTD answer selection
- **Outputs**: QOTD right/wrong feedback; expanded test list; selected test launch

## Process Steps

1. Citizen lands on `/test-prep`.
2. Citizen sees "Question of the Day" — selects an option (A–D) and clicks Submit Answer.
   - System evaluates immediately in-place: correct option turns green (✓), citizen's wrong pick (if any) turns red (✗), banner states the correct answer.
3. Citizen reviews "My Performance": readiness donut (%), tests attempted, avg score, national rank, subject-wise progress bars.
4. Citizen clicks an Exam Category card (Banking & IBPS / GATE Engineering / GPSC Gujarat / JEE-NEET Prep / SSC CGL-CHSL / UPSC Civil Services).
5. Category expands inline (dropdown panel beneath the grid) listing its tests ("Test 1", "Test 2", "Test 3" — generic names, not descriptive titles).
6. Citizen clicks a test → hands off to Mock Test Interface (`20-process-maps/07-mock-test-interface.md`) at `/mock-test/{testId}`.

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar)
- **Feeds into**: `20-process-maps/07-mock-test-interface.md` (via test selection)

## Systems and Tools
- Exam category/test data: seeded, real counts (Users, Tests) displayed per category
- QOTD: real scoring logic, immediate feedback, no page reload

## Known Issues
- Test names within a category are generic ("Test 1"/"Test 2"/"Test 3") rather than descriptive. Traced to `10-observations/06-test-prep-hub.md`.
- Category "Users" counts (e.g. "18k Users") appear to be static display numbers — not confirmed as live aggregates.

## Open Questions
- What does the QOTD's top-right category link (e.g. "UPSC Civil Services") navigate to? [UNVERIFIED]
- Are QOTD questions unique per day, or does the same question reappear on refresh? [UNVERIFIED]
