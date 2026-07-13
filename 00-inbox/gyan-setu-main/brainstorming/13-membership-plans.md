# Module 13: Membership Plans — Brainstorming ✅ SCOPED

## PRD Reference
- Tiered pricing: BASIC (₹0), STANDARD (₹99), GOLD (₹199)
- Feature comparison matrix
- Student/Senior Citizen 50% discount
- Payment: UPI, Net Banking, Cards, BBPS
- DigiLocker & Aadhaar verification

## Slide Reference (14-membership-plans.png)
- Three plan cards with feature lists
- "Most Popular" badge on GOLD
- "Current Plan" shown for Basic, "Choose Standard" button
- 50% discount for Students & Senior Citizens
- Payment & verification methods listed

## Questions & Decisions

### Q1: Payment flow
**Question:** Should the demo have an actual payment flow (even a test/sandbox payment gateway), or just show the plans page with plan selection as visual-only?

**Answer:** Visual only. No payment gateway.

**Decision:** Plans page is display-only. No payment flow, no Razorpay/gateway integration for the demo.

---

### Q2: Plan switching
**Question:** Can users switch plans and have it affect their access?

**Answer:** Static.

**Decision:** No plan switching. Demo users have a pre-assigned tier from seed data. The page just displays the plans.
