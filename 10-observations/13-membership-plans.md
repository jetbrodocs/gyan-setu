---
title: "Observation — Membership Plans Module"
created: 2026-07-13
updated: 2026-07-13
status: active
source: "Live demo walkthrough — https://gyan-setu.fly.dev/membership, logged in as rahul@demo.com"
---

# Membership Plans

## Activity
Citizen compares the three membership tiers (Basic/Standard/Gold), sees their current plan, and (in principle) can upgrade.

## Inputs
- Seeded plan/feature data — no live API call observed on this page (no `/api/` requests logged), likely static/hardcoded content
- User click on "Choose BASIC" / "Choose GOLD"

## Outputs
- Static comparison display; upgrade click has no observed effect (see Problems)

## People
- Any logged-in citizen/reader

## Elements on screen
| Element | Detail |
|---|---|
| Header | "Choose Your Knowledge Plan — Unlock unlimited learning with flexible membership options designed for everyone." |
| BASIC (₹0/month) | Digital Catalog Access, 5 eBook Downloads/month, Newspaper Archive (7 days) — ✓; Audiobook Library, Unlimited Mock Tests, AI Book Summaries, Priority Support — ✗ (struck through); button: "Choose BASIC" |
| STANDARD (₹99/month) — "MOST POPULAR" not on this one, marked as user's current plan | Unlimited Digital Reading, Full Audiobook Library, Full Newspaper Archive, 5 Mock Tests/month, Basic AI Summaries — ✓; Priority Support — ✗; button: disabled "Current Plan" |
| GOLD (₹199/month) — "★ MOST POPULAR" banner | All Standard Features, Unlimited Mock Tests & Analysis, Full AI Summaries & Chat, STEM Lab Premium Content, Offline Mode, Priority Support — all ✓; button: "Choose GOLD" |
| Discount banner | "50% Discount for Students & Senior Citizens — Verify your status through DigiLocker or institution ID to unlock discounted rates." |
| Accepted Payment Methods | UPI (GPay, PhonePe, BHIM), Net Banking (all major banks) — visible; more methods likely below fold (not confirmed, page did not scroll further in this pass) |
| Identity Verification | DigiLocker Integration — "Verify your identity seamlessly through DigiLocker for instant membership activation and student/senior discount eligibility." |

## Problems / Limitations Observed
- **"Choose GOLD" button has no observable effect on click** — no modal, no navigation, no confirmation toast. Consistent with the demo PRD's explicit scope note: "No payment gateway integration" — this is expected/by-design for the demo, not a bug, but worth confirming there's at least a "coming soon" or disabled-state affordance rather than a silently dead button (currently looks fully clickable with no feedback).
- No API calls observed loading this page — plan/feature data appears to be hardcoded in the frontend rather than DB-seeded, which would be an exception to the demo PRD's "All data from seeded database via CRUD — no hardcoded UI data" principle. Worth flagging for verification against source (not confirmed via code inspection this pass).
- Payment methods list only partially visible (UPI, Net Banking) — Cards and BBPS mentioned in the PRD were not confirmed visible in the captured viewport.

## Handoffs
- **Before**: Dashboard sidebar → Membership (under "MY ACCOUNT")
- **After**: none functional — "Choose GOLD"/"Choose BASIC" are dead-end buttons in this build

## Raw Notes
- Confirms Rahul Sharma's account tier ("Standard Member," seen on every module's sidebar footer) matches this page's "Current Plan" marker on STANDARD — tier data is consistent across the app.
