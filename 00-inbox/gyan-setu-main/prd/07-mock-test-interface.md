# Module 7: Mock Test Interface

**Reference Screenshot**: `slides/08-mock-test-interface.png`

## Description
Full-screen exam simulation with timer, MCQ questions, answer tracking, and detailed results.

## User Flow
1. Test Prep Hub → Select test → Start
2. Full-screen exam mode with timer
3. Answer questions → Navigate between questions
4. Submit → Detailed results page

## Specifications

### Exam Screen (per screenshot)
- **Header**: Test name, section, marks info (+1.0 correct, -0.33 negative), countdown timer
- **Main Area**: Question number, question text, 4 MCQ options (A/B/C/D) with radio select
- **Right Sidebar**:
  - Student profile (name, ID)
  - Answer summary (Answered, Not Answered, Not Visited, Marked)
  - Color-coded question navigation grid (green=answered, red=marked, orange=skipped)
  - Section dropdown
- **Bottom Actions**: Mark for Review & Next, Clear Response, Save & Next
- **Submit Test** button

### Full End-to-End Flow
- Timer counts down in real time
- Questions load from seeded exam data
- User selections persist as they navigate between questions
- Mark for Review tags questions for later
- Submit calculates score with negative marking

### Results Page (after submission)
- Total score
- Correct / Wrong / Unanswered breakdown
- Negative marking applied
- Subject-wise analysis
- Results persist to database (feeds into Test Prep Hub performance dashboard)
