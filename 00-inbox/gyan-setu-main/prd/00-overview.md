# Gyaan Setu — Demo Prototype PRD

## Document Info
- **Product**: Gyaan Setu (Knowledge Bridge)
- **Client**: Gandhinagar Smart City Development Ltd.
- **Purpose**: Stakeholder demo prototype
- **Date**: March 2026
- **Version**: 1.0

## What This Is
This PRD defines the scope and specifications for a **single-day stakeholder demo** of the Gyaan Setu digital library platform. It is not a production PRD — it prioritizes visual fidelity, key user flows, and impressive demo moments over production-scale infrastructure.

## Platform
- **Web Portal only** (Kiosk UI and Mobile App deferred)
- Responsive desktop-first design

## Key Architecture Principles
- **All data from seeded database via CRUD** — no hardcoded UI data
- **Materialized views** for dashboards and aggregated stats
- **Public datasets** for all content (books, audiobooks, newspapers, exam questions, manuscripts, videos)
- **Real LLM integration** via Agent SDK for AI features (Reading Companion, Mind Maps, Quizzes)
- **Existing frameworks/libraries** wherever possible — don't build from scratch
- **UI follows presentation screenshots** as closely as possible

## User Access
- Login flow only (no signup/registration)
- Pre-seeded demo user accounts
- No payment gateway integration
- Membership tiers pre-assigned in seed data

## Modules In Scope (13 active + 1 low priority)

| # | Module | Priority |
|---|--------|----------|
| 1 | Dashboard | High |
| 2 | Digital Library (eBook Catalog) | High |
| 3 | eBook Reader | High |
| 4 | Audiobook Player | High |
| 5 | Newspapers & Periodicals | High |
| 6 | Test Preparation Hub | High |
| 7 | Mock Test Interface | High |
| 8 | Podcast Creation Studio | High |
| 10 | Indian Knowledge Systems (IKS Heritage) | High |
| 11 | STEM Innovation Lab | High |
| 12 | User Profile / My Dashboard | High |
| 13 | Membership Plans | Medium |
| 17 | Video Library | High |
| 14 | Admin Analytics Dashboard | Low (deferrable) |

## Modules Out of Scope
- **AI Book Summaries** — merged into Digital Library as the book detail/summary page
- **Kiosk UI** — deferred
- **Mobile App** — deferred

## Tech Stack (from original PRD, to be finalized)
- **Frontend**: React.js/Next.js, Tailwind CSS
- **Backend**: Node.js/Express or Python/Django
- **Database**: PostgreSQL (with materialized views)
- **AI/ML**: Claude API via Agent SDK
- **Content Rendering**: Existing reader/player frameworks
- **Search**: To be determined (Elasticsearch or simpler for demo)

## Design System
- **Colors**: Navy `#1E293B`, Blue `#3B82F6`, Gold `#F59E0B`, Green `#10B981`, Red `#EF4444`, Light Gray `#F3F4F6`
- **Typography**: Arial, clear hierarchy
- **Accessibility**: WCAG 2.0 AA (visual compliance, not full audit)
- **Language**: English only (language selector visible but non-functional)
