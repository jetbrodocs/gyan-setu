---
title: "Observation — Dashboard Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/dashboard, logged in as rahul@demo.com"
---

# Dashboard

## Activity
User lands on Dashboard as the home screen after login. Shows a personalized welcome, in-progress reading, key usage stats, and trending content for the city.

## Inputs
- Login session (redirected here automatically after successful sign-in at `/login`)
- Seeded user data: name, membership tier, reading history, stats
- Seeded catalog data: trending books for "Gandhinagar"

## Outputs
- Rendered dashboard: welcome banner, "Continue Reading" cards, stat tiles, trending grid
- Navigation entry points into every other module via left sidebar

## People
- Any logged-in citizen/reader (observed as "Rahul Sharma", Standard Member tier)

## Timing
- First screen shown post-login, single load, no polling/refresh observed

## Problems / Limitations Observed
- **Search bar (top) does not show live results.** Typed "atomic" into "Search for books, exams, audiobooks..." — no dropdown, no filtered results, no navigation. Field accepts text but has no visible behavior on this screen.
- **Notification bell has no observable effect on click** — no panel, dropdown, or badge change appeared.
- Sidebar collapse (hamburger icon, top-left) works — collapses to icon-only rail, logo shortens to "G". Confirmed toggle is fully functional.

## Location / Screen
- Route: `/dashboard`
- Layout: fixed left sidebar (13 nav items + My Account section), top bar (search, language selector "EN" with India flag, notification bell, logout icon), main content area

## Equipment / Systems
- Web browser, desktop viewport (1440×900) tested
- Backend: `/api/auth/login` confirmed as real API call (200 response), not mocked

## Elements on screen
| Element | Content observed |
|---|---|
| Welcome banner | "Welcome Back, Rahul! Enhance your knowledge with AI-driven recommendations. You have 25 books to explore!" (purple gradient) |
| Continue Reading | 2 cards: "Atomic Habits" (38%), "Saraswatichandra" (12%) — each with progress bar + arrow link |
| Stat tiles (4) | 25 eBooks · 128.5 Reading Hours · 14 Tests · 3 Certificates |
| Trending in Gandhinagar | 8 book covers (Saraswatichandra, Saurashtra Ni Rasdhar, Godan, Atomic Habits, The Story of My Experiments with Truth, Arthashastra, Wings of Fire, Sapiens) with language tag per cover (Gujarati/Hindi/English/Sanskrit) + "View All" link |
| Sidebar nav | Dashboard, Digital Library, Audiobooks, Periodicals, Test Prep Hub, Podcast Studio, Podcasts, IKS Heritage, STEM Lab, Video Library — then "MY ACCOUNT": My Analytics, Membership |
| User footer | Avatar initials "RS", name "Rahul Sharma", tier "Standard Member" |

## Handoffs
- **Before**: `/login` screen (email/password form, demo account hints shown directly on the form)
- **After**: clicking any sidebar item or "Continue Reading" card navigates to that module (not yet traversed — separate observation per module)

## Raw Notes
- Login form pre-fills placeholder text with actual demo credentials (`rahul@demo.com` / `demo123`) directly in the input placeholders — convenient for demo, would need removing for anything beyond demo use.
- Trending covers are flat-color placeholder blocks with title/author text overlaid, not real cover art (matches known limitation noted in `00-inbox/gyan-setu-main/DEMO_GUIDE.md`).
- App took a few seconds to wake up on first load (scale-to-zero hosting), consistent with DEMO_GUIDE note.
