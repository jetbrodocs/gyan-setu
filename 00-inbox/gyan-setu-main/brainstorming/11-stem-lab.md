# Module 11: STEM Innovation & Robotics Lab — Brainstorming ✅ SCOPED

## PRD Reference
- Category tabs: Coding, Robotics, AI/ML, IoT, 3D Design, Atal Projects
- Video lesson player integrated with code editor
- Code execution sandbox with terminal output
- My Badges achievement section
- Class Leaderboard by XP points
- Live Workshops with booking

## Slide Reference (12-stem-lab.png)
- Tabs: Coding & Dev, Robotics Kits, AI & ML, Electronics & IoT, 3D Design, Atal Innovation
- "Python for Beginners" — Module 3 of 10: Variables & Data Types
- Video player + code editor with Python greeting program
- Terminal shows output with "Run Code" button
- Badges: Scratch Certified, Python Starter, Robotics Lvl 1
- Leaderboard: 4 students with XP
- Live Workshops section

## Questions & Decisions

### Q1: Code execution
**Question:** The slide shows a code editor with a "Run Code" button and terminal output. Should the demo have an actual code execution sandbox (e.g., running Python in the browser or via a backend), or just show pre-loaded code with static output?

**Answer:** Use a ready framework/library for browser-based code execution. Basic is fine for the demo.

**Decision:** Integrate an existing browser-based code editor/runner (e.g., Pyodide, Judge0, CodeMirror + WASM). Basic Python execution is sufficient. Don't build from scratch.

---

### Q2: Video lessons
**Question:** Actual tutorial videos or placeholder player?

**Answer:** Source public tutorial videos — even YouTube embeds are fine.

**Decision:** Embed public tutorial videos (YouTube or similar). Seed course structure with video links per module/lesson.

### Q3: Badges & leaderboard
**Question:** Seeded data or earned through activity?

**Answer:** Seeded materialized views, same approach as test prep performance.

**Decision:** Badges and leaderboard XP are pre-seeded via materialized views in DB. Not dynamically earned during the demo.
