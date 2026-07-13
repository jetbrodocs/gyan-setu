# Module 11: User Profile / My Dashboard

**Reference Screenshot**: `slides/13-my-dashboard.png`

## Description
Personal dashboard showing user stats, reading activity, certificates, bookshelf, and test history.

## Data Source
- All stats from seeded materialized views
- No live computation from demo activity

## Specifications

### Profile Card (per screenshot)
- User avatar, name, email
- Membership tier badge (Basic/Standard/Gold)
- "Valid till" date
- Current streak (days)

### Statistics Row
- Books Read, Audiobooks, Tests Taken, Podcast Time
- All from seeded materialized views

### Reading Activity Chart
- Bar chart showing last 30 days of activity
- Seeded data

### Currently Reading
- List of books in progress with completion percentage and page count
- From seed data

### Earned Certificates
- List display only (icons + names)
- No PDF download/generation
- "View All" link

### My Bookshelf
- Saved/bookmarked book covers
- From seed data

### Recent Test History
- Test name, date, score
- From seed data

### Quick Settings
- Notifications, Language, Dark Mode toggles
- **Visual-only** — no functional toggling
