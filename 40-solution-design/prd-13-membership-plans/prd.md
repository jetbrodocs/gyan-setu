---
title: "PRD — Membership Plans"
created: 2026-07-14
updated: 2026-07-14
status: draft
source_process_map: "20-process-maps/13-membership-plans.md"
source_observation: "10-observations/13-membership-plans.md"
---

# Membership Plans

## Overview
The Membership Plans page compares Basic/Standard/Gold tiers and shows the citizen's current plan.
Display is solid; the entire upgrade path is currently a dead end by design (no payment gateway in
the demo scope) but gives no feedback distinguishing that from a bug. This module's real build work —
live payment processing — is explicitly a later phase; this PRD scopes the display layer to
production quality now and defines the payment integration as deferred, separately-scoped work.

## User Roles
- **Citizen/Reader** — views plans and (in a future phase) upgrades.

## Functional Requirements

### REQ-001: Tier comparison display
The system must display all three tiers (Basic ₹0, Standard ₹99, Gold ₹199) with their full feature
checklists and the citizen's current plan clearly marked.
- **Acceptance criteria**: Feature checklist accurately reflects what each tier actually unlocks
  elsewhere in the platform (e.g. Gold's "Unlimited Mock Tests" should match real mock-test access
  behavior — not independently verified this session, see Open Questions); current-plan marker
  matches the citizen's real account tier.
- **Source**: process map step 2 (confirmed working — display and current-plan marker both accurate
  this session).

### REQ-002: Discount and verification messaging
The system must display the 50% student/senior-citizen discount offer and its DigiLocker/institution-
ID verification pathway.
- **Acceptance criteria**: Messaging is present and accurate; the verification flow itself is
  correctly scoped as a future-phase dependency (REQ-004), not implied as currently functional.
- **Source**: process map step 3 (confirmed working as static display).

### REQ-003: Honest feedback on upgrade actions
Clicking "Choose GOLD" or any upgrade action must give the citizen clear feedback about what happens
next, replacing the current silent no-op.
- **Acceptance criteria**: At minimum, clicking an upgrade button shows a message explaining that
  online upgrades are coming soon (or routes to an interim path, e.g. a contact/waitlist form) —
  never a click with zero response.
- **Source**: Gap analysis Category 2 (Silent Dead Control) — confirmed this session; this is a
  near-term fix that doesn't require the full payment integration (REQ-004) to close.
- **Priority**: Medium — cheap fix (messaging only), closes the "looks broken" risk without needing
  the larger payment workstream.

### REQ-004: Live payment-based tier upgrade (deferred)
The system must eventually support a citizen selecting a paid tier and completing payment via an
integrated gateway (UPI, Net Banking, Cards, BBPS), with the account's tier updating immediately on
successful payment.
- **Acceptance criteria**: Payment completes through a real gateway; tier change takes effect
  immediately and is reflected everywhere tier-gated features are checked (e.g. Digital Library's
  planned Gold-tier AI features per `prd-02-digital-library` Open Questions).
- **Source**: named in the original module concept and the demo PRD's explicit "no payment gateway
  integration" scope note — genuinely out of current build scope, not a bug.
- **Priority**: Deferred — requires a separate commercial agreement with a payment provider before
  engineering work can start (see Assumptions).

## Extension Opportunities
- **REQ-003 as a low-cost bridge to REQ-004**: an interim "request upgrade" or waitlist form (email
  capture) could give the Corporation real signal on upgrade demand before the full payment
  integration is built — cheap to build, valuable data, and directly reuses the same button citizens
  already try to click today.
- **Tie discount verification (REQ-002) to a future Aadhaar/DigiLocker integration**: if that broader
  government-integration capability is built (per the platform's future-phase ambitions), the
  student/senior discount pathway here becomes its first concrete use case rather than a standalone
  integration.

## Data Touched
- **Read**: tier definitions and feature matrices, citizen's current tier
- **Write**: tier change record (pending REQ-004); upgrade-interest signal (pending REQ-003
  extension, if a waitlist/request form is built)

## Out of Scope / Deferred
- **Live payment processing (REQ-004)** — requires a commercial agreement with a payment gateway
  provider; not an engineering-only scope item.
- **Aadhaar/DigiLocker-based discount verification** — requires government API access approval, a
  longer-lead-time dependency outside engineering's control.

## Open Questions
- Does the feature checklist shown per tier (REQ-001) actually match real access-control behavior
  elsewhere in the platform (e.g. does a Basic-tier citizen actually get blocked from "Unlimited Mock
  Tests")? Not verified this session — this page's claims need to be checked against real enforcement
  before it can be considered accurate, not just well-displayed.
- Should REQ-003's interim messaging include a firm timeline, or stay generic ("coming soon")? Depends
  on how confident the Corporation/Safal Softcom are in a near-term payment integration date.
