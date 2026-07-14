---
title: "Analysis — Tech Stack Decision (TDR)"
created: 2026-07-13
updated: 2026-07-13
status: approved
source: ["00-inbox/gyan-setu-main/package.json", "00-inbox/gyan-setu-main/prisma/schema.prisma", "00-inbox/gyan-setu-main/Dockerfile", "00-inbox/gyan-setu-main/fly.toml", "30-analysis/01-feature-gap-analysis.md"]
---

# TDR-001: Continue with the Existing Built Stack

**Status:** accepted
**Date:** 2026-07-13

## Context

Gyaan Setu already has a working demo deployed at gyan-setu.fly.dev, built and functioning before this documentation project began (per `00-inbox/`). The original PRD (`PRD_CONTENTS_SUMMARY.txt`) proposed a broad, undecided menu of options (React/Next.js *or* nothing specified for backend "Node.js/Express or Python/Django", PostgreSQL *and* MongoDB, Elasticsearch, Redis, Kubernetes, etc.) — standard for an early planning document, but not an actual decision. Since then, the team has already built and deployed a working, mostly-functional demo (confirmed across all 14 modules in `10-observations/`) on a specific, narrower stack. This TDR records that already-operating stack as the accepted decision, rather than reopening a choice that's already been implemented and validated.

## Options Considered

1. **Continue with the existing stack** (Next.js + Prisma + PostgreSQL + Claude Agent SDK, deployed on Fly.io) — Pros: already built, already deployed, already validated against 14 real module walkthroughs this session (real CRUD, real filtering, real cross-module persistence confirmed). Cons: some of the original PRD's broader stack ambitions (MongoDB, Elasticsearch, Redis, Kubernetes, React Native/Flutter for mobile) are not present — would need to be added later if those specific needs materialize.
2. **Re-platform onto the PRD's full original stack** (add MongoDB, Elasticsearch, Redis, Kubernetes orchestration) — Pros: matches the original PRD's technical requirements section literally. Cons: throws away a working, demo-validated build to chase infrastructure the demo doesn't currently need (no evidence of full-text search complexity, caching bottlenecks, or multi-service orchestration needs at current scale); high effort, high risk, no demonstrated benefit for a stakeholder demo.
3. **Start over on a different framework entirely** — Pros: none identified. Cons: discards a working, tested application for no stated requirement gap; not supported by anything found in this session's observations.

## Decision

**Option 1 — continue with the existing stack**, as follows:

| Layer | Choice | Evidence |
|---|---|---|
| Frontend framework | Next.js 16 (React 19, App Router) | `package.json`: `"next": "^16.1.7"`, `"react": "^19.2.4"` |
| Styling | Tailwind CSS v4 + Radix UI primitives + `class-variance-authority` | `package.json` dependencies |
| Charts | Recharts | `package.json`: `"recharts": "^3.8.0"` — confirmed in use (Reading Activity bar chart, Test Prep readiness donut) |
| ORM / Database | Prisma 6 → PostgreSQL | `prisma/schema.prisma`: `provider = "postgresql"` |
| Auth | Custom (bcryptjs password hashing), session-based via `POST /api/auth/login` | `package.json`: `"bcryptjs"`; confirmed real 200 response during login in `10-observations/01-dashboard.md` |
| AI | Anthropic SDK (Claude), real Agent SDK integration | `package.json`: `"@anthropic-ai/sdk": "^0.79.0"`; confirmed real (if currently unconfigured) call in `10-observations/03-ebook-reader.md` and analyzed in `30-analysis/02-ai-integration-deep-dive.md` |
| Hosting | Fly.io, Docker-based deploy, scale-to-zero | `Dockerfile`, `fly.toml` (`auto_stop_machines = 'stop'`, `min_machines_running = 0`) — risk profile analyzed in `30-analysis/03-hosting-reliability-deep-dive.md` |
| Content rendering | Native `<img>`/SVG for newspapers/manuscripts, native HTML5 `<audio>`/YouTube iframe for media — no PDF.js/WebXR/Three.js found in dependencies | `package.json` has none of these; not observed in any of the 14 modules walked through |
| Testing/automation | Playwright present as a dependency | `package.json`: `"playwright": "^1.58.2"` — same tool used to conduct this session's observations, coincidentally |

**Explicitly not adopted** (present in the original PRD's wish-list but absent from the actual build, and not recommended to add without a specific triggering requirement): MongoDB, Elasticsearch, Redis, Kubernetes, React Native/Flutter, Socket.io/SSE, Razorpay/CCAvenue payment integration, DigiLocker/Aadhaar identity verification (UI mentions DigiLocker on the Membership page, but no working integration was found — see `10-observations/13-membership-plans.md`).

## Rationale

- The demo already works. Reopening the stack choice now would mean discarding a build that this session validated module-by-module as substantially real (genuine CRUD, genuine cross-module data persistence, genuine third-party integrations for audio/video).
- None of the gaps found in `30-analysis/01-feature-gap-analysis.md` trace to a stack limitation. Every broken/stubbed feature found (View Manuscript, Mind Map/Quiz, search, notification bell) is a missing feature or missing wiring within the existing stack, not evidence the stack itself is wrong.
- The original PRD's broader technology list (MongoDB, Elasticsearch, Kubernetes, etc.) was written before any implementation existed and reads as a menu of possibilities for a much larger production system, not a settled decision. Nothing observed in this session's 14-module walkthrough surfaced a real requirement (search complexity, caching bottleneck, multi-region orchestration need) that the current stack can't handle at demo scale.

## Consequences

- **Solution design work should build on top of Next.js/Prisma/PostgreSQL/Claude Agent SDK**, not propose a different foundation.
- **Payment integration (Razorpay/CCAvenue) and identity verification (DigiLocker/Aadhaar)** remain unimplemented and out of the current stack's proven surface area — if these become real requirements (they're currently decorative per `10-observations/13-membership-plans.md`), they are net-new integration work, not a re-platform.
- **Scale-to-zero hosting** is a deliberate current choice (cheap for a demo) but is explicitly the top hosting risk flagged in `30-analysis/03-hosting-reliability-deep-dive.md` — this decision does not resolve that risk, it just confirms Fly.io as the hosting platform; the `min_machines_running` config is a deploy-time tuning knob, not a stack change.
- **Content/data scaling** (per `30-analysis/04-content-data-sourcing-deep-dive.md`) is a licensing/content-ops problem, not a stack problem — this decision doesn't block or resolve that workstream either way.
- Solution design is now unblocked (this document satisfies the `40-solution-design/` entry guard).
