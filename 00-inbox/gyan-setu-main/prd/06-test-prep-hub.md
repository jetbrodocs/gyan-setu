# Module 6: Test Preparation Hub

**Reference Screenshot**: `slides/07-test-prep-hub.png`

## Description
Exam preparation dashboard with category cards, performance tracking, and question of the day.

## Data Source
- Public exam question datasets (e.g., Kaggle)
- Categories driven by dataset (not forced to PRD's 6 categories)

## User Flow
1. Test Prep Hub → Browse exam categories
2. Select category → View available tests
3. Start test → Mock Test Interface (Module 7)

## Specifications

### Exam Categories (per screenshot)
- Card grid showing exam categories from dataset
- Each card shows: exam name, number of tests, number of users
- "Upcoming Live Mock" banner with countdown (visual/seeded)

### My Performance
- Readiness donut chart (% ready)
- Stats: Tests Attempted, Avg Score, National Rank
- Subject-wise progress bars
- All data from seeded materialized views in database

### Question of the Day
- Single MCQ from seed data
- Submit Answer button (functional)
