---
title: "Commercials — Internal Costing (NOT for sharing)"
created: 2026-07-14
updated: 2026-07-14
status: internal
audience: "JetBro / Safal internal only — do not share with the Municipal Corporation"
---

# Commercials — Internal Costing

**Internal working note.** This records the bifurcation behind the single blended price in
`scope/commercials.md`. It is **not** part of the client-facing commercial document and must not be
shared with the Municipal Corporation.

## Basis
- **Team:** 60 resources — 8 Tech Leads, 22 Engineers, 20 Junior Engineers, 5 Product Managers,
  5 Project Managers.
- **Delivery shown to municipality:** 3 months.
- **Internally costed for:** 5 months (delay / contingency buffer). The 5-month figure is the total;
  it is presented to the municipality apportioned across the 3-month delivery.

## Monthly run-rate build-up

| Bucket | Monthly | Composition |
|---|---:|---|
| Engineering | ₹92,50,000 | Team base cost ₹72,50,000 + ₹20,00,000 margin (loaded into rates) |
| Infrastructure | ₹60,00,000 | 60 resources × ₹1,00,000 (pure infra cost, no margin) |
| Product Development | ₹40,00,000 | Margin / product-development, deployment & management fee |
| **Total run-rate** | **₹1,92,50,000** | |

- **Total margin:** ₹60,00,000 / month (₹20,00,000 in Engineering + ₹40,00,000 in Product Development).
- **Infrastructure carries no margin** (moved out to keep infra from dominating the client view).

## Engineering — base vs loaded rates

| Role | Count | Base rate | Loaded rate (shown) | Loaded monthly |
|---|---:|---:|---:|---:|
| Tech Lead | 8 | ₹2,00,000 | ₹2,55,000 | ₹20,40,000 |
| Engineer | 22 | ₹1,50,000 | ₹1,90,000 | ₹41,80,000 |
| Junior Engineer | 20 | ₹50,000 | ₹65,000 | ₹13,00,000 |
| Product Manager | 5 | ₹1,50,000 | ₹1,90,000 | ₹9,50,000 |
| Project Manager | 5 | ₹1,20,000 | ₹1,56,000 | ₹7,80,000 |
| **Total** | **60** | **₹72,50,000** | | **₹92,50,000** |

## 5-month totals (internal costing) → shown to municipality over 3 months

| Line item | Monthly run-rate | 5-month total (internal) | Shown monthly (total ÷ 3) |
|---|---:|---:|---:|
| Engineering | ₹92,50,000 | ₹4,62,50,000 | ₹1,54,16,667 |
| Infrastructure | ₹60,00,000 | ₹3,00,00,000 | ₹1,00,00,000 |
| Product Development | ₹40,00,000 | ₹2,00,00,000 | ₹66,66,667 |
| **Total** | **₹1,92,50,000** | **₹9,62,50,000** | **₹3,20,83,333** |

**Client-facing total = ₹7,70,00,000** — the 5-month costing (₹9,62,50,000) with a **20% discount**
applied — presented in `scope/commercials.md` as a 3-month engagement (total ÷ 3 per month). After the
discount, line-item 3-month totals are: Engineering ₹3,70,00,000 · Infrastructure ₹2,40,00,000 ·
Product Development ₹1,60,00,000. The 5-month basis and the discount are internal only.
