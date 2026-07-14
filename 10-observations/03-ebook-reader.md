---
title: "Observation — eBook Reader Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/reader/{bookId}, logged in as rahul@demo.com, book: Arthashastra"
---

# eBook Reader

## Activity
Citizen reads a book's text chapter-by-chapter, navigates via table of contents, adjusts font size, and can ask an AI Reading Companion questions about the current chapter.

## Inputs
- Book ID from Digital Library "Read Now" link (route: `/reader/{bookId}`)
- Seeded chapter/section text content per book
- User TOC clicks, font size controls, chat questions to AI companion

## Outputs
- Rendered chapter text, updated per section clicked
- Reading progress bar + percentage (bottom of screen)
- AI companion chat replies (when working)

## People
- Any logged-in citizen/reader

## Timing
- TOC navigation near-instant (client-side state change, no full reload)
- AI companion call took several seconds then returned an error (see Problems)

## Elements on screen
| Element | Detail |
|---|---|
| Left panel | Table of Contents — book title/author header, collapsible (X to close), list of sections (Arthashastra has 10), collapsed panel toggle via list icon top-left |
| Center panel | Chapter heading + body text |
| Top toolbar | Back button, TOC toggle, font size controls (− / number / +), AI companion panel toggle (chat bubble icon, top-right) |
| Right panel | AI Reading Companion — chat thread, input box "Ask about this chapter...", send button |
| Bottom bar | "Chapter N of 10" label, progress bar, percentage (e.g. "30%") |

## Problems / Limitations Observed
- **AI Reading Companion is broken in this deployment.** Asking "What is this chapter about?" triggers `POST /api/ai/companion` → **503 response**, UI shows "Sorry, I'm having trouble connecting right now. Please try again in a moment." Confirms the known limitation from `00-inbox/gyan-setu-main/DEMO_GUIDE.md`: "AI Reading Companion requires API key to be configured." This is a real integration (not mocked), just not wired up with a working key in the current deployment.
- Font size control: clicking the controls repeatedly is easy to overshoot in either direction — no visible min/max limit reached during test (went from 16 → 14 → back), no reset-to-default button observed.
- Highlight/note/"ask AI about selection"/translate/TTS/WCAG badge features mentioned in the original PRD module spec were **not tested this pass** — not visible in the toolbar observed; may require text selection to trigger, or may not be implemented. Flag for follow-up observation.

## Handoffs
- **Before**: Digital Library book detail page → "Read Now" (`href="/reader/{bookId}"`)
- **After**: "Back" button returns to book detail page (not confirmed exact destination — assume browser back or `/library/{bookId}`)

## Raw Notes
- Progress bar and percentage update live and appear tied to which section/chapter is open (30% at section 3 of 10 — roughly section-index-based, not scroll-position-based).
- Chapter text for Arthashastra Section 3 reads: "BOOK I, CHAPTER 1: The Life of the King — Training in Vedic Learning" — real translated public-domain text content, not lorem ipsum.
