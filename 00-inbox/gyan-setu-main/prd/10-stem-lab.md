# Module 10: STEM Innovation & Robotics Lab

**Reference Screenshot**: `slides/12-stem-lab.png`

## Description
Learning platform with video lessons, integrated code editor, badges, and leaderboard for STEM education.

## Data Source
- Public tutorial videos (YouTube embeds acceptable)
- Course structure seeded: categories → courses → modules → lessons
- Badges and leaderboard data from seeded materialized views

## User Flow
1. STEM Lab → Browse category tabs
2. Select course → View modules/lessons
3. Watch video + write/run code in sandbox

## Specifications

### Category Tabs (per screenshot)
- Coding & Dev (Python, Java, Scratch)
- Robotics Kits (Arduino, LEGO, Spike)
- AI & ML (TensorFlow, Vision)
- Electronics & IoT (Sensors, Circuits)
- 3D Design (CAD, Printing)
- Atal Innovation Projects

### Lesson View
- **Video Player**: Embedded public tutorial videos (YouTube embeds OK)
- **Code Editor**: Browser-based code editor with "Run Code" button
  - Use existing framework (e.g., Pyodide for Python in browser, CodeMirror for editor)
  - Basic Python execution sufficient for demo
  - Terminal output area below editor
  - Auto-save indicator

### My Badges (right panel)
- Badge icons with names (from seeded materialized views)
- "View All" link

### Class Leaderboard (right panel)
- Student names with XP points
- Seeded data via materialized views

### Live Workshops
- List of upcoming workshops (seeded)
- Visual-only — no booking functionality
