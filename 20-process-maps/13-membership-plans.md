---
title: "Process Map — Membership Plans"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/13-membership-plans.md"]
---

# Membership Plans

## Process Overview
- **Purpose**: Citizen compares Basic/Standard/Gold tiers and (in principle) upgrades.
- **Frequency**: Any time a citizen wants to check or change their plan.
- **Trigger**: Sidebar → Membership (under MY ACCOUNT).
- **End condition**: Currently always a dead end — no working upgrade path in this build.

## Roles Involved
- Citizen/Reader

## Inputs and Outputs
- **Inputs**: Static plan/feature data (no API call observed); citizen's tier click
- **Outputs**: None functional — display only

## Process Steps

1. Citizen clicks "Membership" in the sidebar → lands on `/membership`.
2. Page renders three plan cards: BASIC (₹0), STANDARD (₹99, marked "Current Plan" for this citizen), GOLD (₹199, "MOST POPULAR" banner) — each with a feature checklist (✓/✗).
3. Citizen reviews the "50% Discount for Students & Senior Citizens" banner (verification via DigiLocker or institution ID — not a working flow, informational only).
4. Citizen reviews Accepted Payment Methods (UPI, Net Banking, — more not confirmed) and Identity Verification (DigiLocker Integration) sections.
5. Citizen clicks "Choose GOLD" or "Choose BASIC" → **Exception A: no observed effect**.

### Exception A: Upgrade/Downgrade Buttons Are Dead Ends
A1. Citizen clicks a plan's action button.
A2. No modal, redirect, confirmation, or toast appears.
A3. Flow ends here with no feedback to the citizen — expected per the demo PRD's explicit "No payment gateway integration" scope note, but currently indistinguishable from a broken button (no "coming soon" messaging either).

## Connected Processes
- **Fed by**: `20-process-maps/01-dashboard.md` (sidebar)
- **Feeds into**: none — terminal, by design (no payment integration in demo scope)

## Systems and Tools
- No API calls observed on this page — plan/feature content likely hardcoded rather than DB-seeded (exception to the demo's stated "no hardcoded UI data" principle — unconfirmed without a source check)

## Known Issues
- Upgrade buttons give no feedback on click — by design (no payment gateway), but lacks any messaging to tell the citizen that. Traced to `10-observations/13-membership-plans.md`.
- Plan data appears static/hardcoded rather than seeded — worth a source-level check.

## Open Questions
- Are Cards and BBPS (named in the PRD) actually listed further down the Payment Methods section? [UNVERIFIED — only UPI and Net Banking were visible in the captured viewport]
- Is there any intended "Request Upgrade" or waitlist behavior planned for the button, even without live payment? [UNVERIFIED]
