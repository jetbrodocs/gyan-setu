---
title: "Process Map — eBook Reader"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/03-ebook-reader.md"]
---

# eBook Reader

## Process Overview
- **Purpose**: Citizen reads a book's chapters and optionally converses with an AI Reading Companion about the content.
- **Frequency**: Any time a citizen opens a book to read.
- **Trigger**: "Read Now" click from a Digital Library book detail page.
- **End condition**: Citizen clicks "Back" or navigates away via sidebar.

## Roles Involved
- Citizen/Reader

## Inputs and Outputs
- **Inputs**: Book ID (`/reader/{bookId}`); seeded chapter text; citizen's TOC/font/chat interactions
- **Outputs**: Rendered chapter text; reading progress; (intended) AI companion replies

## Process Steps

1. Citizen arrives at `/reader/{bookId}` via "Read Now."
2. Reader loads: Table of Contents (left), first/last-read chapter text (center), AI Reading Companion panel (right, pre-seeded greeting message).
3. Citizen reads the current chapter; progress bar and "Chapter N of {total}" update based on which section is open.
4. Citizen navigates via TOC:
   - Clicks any section in the left panel → chapter text updates instantly (no full reload); progress % updates to match section index.
5. Citizen adjusts font size via − / + controls (no confirmed min/max limit).
6. Citizen optionally asks the AI Reading Companion a question:
   - Types into "Ask about this chapter..." and submits.
   - **Exception A: AI Companion is broken in this deployment** (see below).
7. Citizen clicks "Back" → returns to the book's Digital Library detail page (exact destination not reconfirmed).

### Exception A: AI Reading Companion Returns an Error
A1. Citizen submits a question (e.g. "What is this chapter about?").
A2. Client calls `POST /api/ai/companion` → **503 response**.
A3. UI displays: "Sorry, I'm having trouble connecting right now. Please try again in a moment."
A4. Known cause: AI Reading Companion requires an API key not currently configured in this deployment (per `00-inbox/gyan-setu-main/DEMO_GUIDE.md`). The integration itself is real/wired, just not keyed.
A5. Citizen has no working AI assistance this session; must read unassisted.

## Connected Processes
- **Fed by**: `20-process-maps/02-digital-library.md` (via "Read Now")
- **Feeds into**: none confirmed — terminal within this module for this session

## Systems and Tools
- Chapter content: seeded/real translated public-domain text (confirmed real, not lorem ipsum)
- AI Companion: `POST /api/ai/companion` (real endpoint, currently 503 due to missing API key)

## Known Issues
- AI Reading Companion non-functional (503, missing API key configuration). Traced to `10-observations/03-ebook-reader.md`.
- Font size controls have no visible reset-to-default or confirmed min/max bounds.

## Open Questions
- Highlight, note-taking, "ask AI about selected text," translate, TTS, and WCAG badge — all named in the original PRD module spec — were not located in this pass. Do they exist behind a text-selection gesture, or are they unbuilt? [UNVERIFIED — needs follow-up observation]
- What does "Back" navigate to exactly — browser history or a fixed route? [UNVERIFIED]
