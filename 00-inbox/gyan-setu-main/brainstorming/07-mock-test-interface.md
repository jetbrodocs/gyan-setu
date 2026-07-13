# Module 7: Mock Test Interface — Brainstorming ✅ SCOPED

## PRD Reference
- Full-screen exam mode
- Header with test info and countdown timer
- MCQ question panel with options (A/B/C/D)
- Right sidebar: Student profile, answer summary, question navigation
- Bottom actions: Mark for Review, Clear Response, Save & Next, Submit
- Marks: +1.0 correct, -0.33 negative marking

## Questions & Decisions

### Q1: Test-taking flow
**Question:** Should a user be able to actually take a full mock test end-to-end — pick a test, answer questions with the timer running, submit, and see results? Or is showing the interface with a few sample questions enough?

**Answer:** Yes, full end-to-end test-taking flow.

**Decision:** User can pick a test, answer MCQs with countdown timer, use Mark for Review / Clear Response / Save & Next, submit, and see results. Full flow powered by seeded question data.

---

### Q2: Results & scoring
**Question:** Detailed results page or just a simple score?

**Answer:** Detailed results page.

**Decision:** After submission, show detailed results: total score, correct/wrong/unanswered breakdown, negative marking applied, subject-wise analysis. Results persist to DB and feed into the Test Prep Hub performance dashboard.
