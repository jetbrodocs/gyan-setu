---
title: "Module Capability Catalogue — Prioritisation Pass"
created: 2026-07-14
updated: 2026-07-14
status: draft
purpose: >
  The single platform-wide prioritisation of the full capability catalogue. Every module's
  capability groups are assigned a delivery phase, judged across all modules together (not in
  isolation). This is the bridge from the catalogues to the exhaustive Detailed Scope of Work.
---

# Prioritisation Pass

This applies one consistent priority across the whole platform, so phases are set *relative to each
other* rather than module-by-module. It reads the [capability catalogues](_index.md) and tags each
capability group with a delivery phase.

## Phases

| Tag | Phase | What it means |
|---|---|---|
| **F** | Foundations | Cross-cutting enablers, built through Phase 1; everything else depends on them. |
| **P1** | Launch (Core) | Every module present and genuinely useful; essential resident journeys work end-to-end. Favours breadth of immediate value and building on what already exists. |
| **P2** | Enrich (Depth & Hardening) | Features that materially deepen each module — richer AI, personalisation, accessibility depth, offline, moderation, content growth. |
| **P3** | Expand (Advanced & Integrations) | Heavy, advanced, or externally-dependent capabilities — phygital lending, immersive heritage, creator ecosystem at scale, native mobile, government/identity integration, deep civic analytics, catalogue scale-up. |

## Criteria (in order)
1. **Resident value & reach** — how many residents benefit, and how central to the mission.
2. **Foundational dependency** — whether other capabilities depend on it.
3. **Build-readiness** — already working in the demo vs. net-new.
4. **External dependency** — content licensing, government APIs, or partnerships push items later.
5. **Complexity / risk.**

---

## F — Cross-Cutting Foundations (built through Phase 1)
These are not owned by a single module; they underpin all of them.

| Foundation | Note |
|---|---|
| Resident accounts, roles & access control | Registration, login, role-based access — every module needs it. |
| Core search & discovery infrastructure | Powers catalogue search and the Home unified search. |
| Multi-language framework (UI + content) | The mechanism for Gujarati/Hindi/English/Sanskrit; four-language content parity targeted at launch (P1). |
| Accessibility baseline (WCAG) | Text size, contrast, screen-reader, keyboard — platform-wide from launch. |
| Content ingestion & catalogue pipeline | How all content types get in, tagged, and managed; licensing is the gating dependency. |
| Cloud hosting (move to always-on for launch) | Removes first-visit wake-up delay; ongoing operating cost. |
| Notifications & activity infrastructure | Feeds Home reminders, achievements, and announcements. |
| Data model designed for growth | Already reserves admin/official roles and analytics capture. |

---

## Per-Module Prioritisation

### Platform-wide

**01 — Dashboard (Home & Discovery)**
| Capability group | Phase |
|---|---|
| Personalised Home; Navigation | P1 |
| Discovery & Trending | P1 |
| Language switcher + accessibility quick settings | P1 |
| Unified cross-content Search | P2 |
| Notifications & Reminders | P2 |
| Announcements & Civic Messaging | P2 |
| Personal shortcuts | P2 |
| Voice search | P3 |

### Pillar 1 — Read & Discover

**02 — Digital Library**
| Capability group | Phase |
|---|---|
| Browse & Discover; basic Search & Filter | P1 |
| Book Detail + AI summary | P1 |
| Read & Access (open in reader) | P1 |
| Bookshelf, reading history, continue-reading | P1 |
| Mind-map, quiz, audio summary | P2 |
| Full-text search inside books | P2 |
| Offline download | P2 |
| Community & reviews | P2 |
| Full four-language content parity | P1 |
| Rights/licensing controls | P2 |
| Kids' / young-readers area | P2 |
| Book clubs / reading circles | P3 |
| Physical copy access (phygital lending) | P1 |
| Physical-catalogue integration | P1 |

**03 — eBook Reader**
| Capability group | Phase |
|---|---|
| Reading experience; Progress & sync | P1 |
| AI Reading Companion (wire for live use) | P1 |
| Persistent annotation (highlights/notes) | P2 |
| Translate; Read-aloud (TTS) | P2 |
| Study tools; accessibility depth | P2 |
| Light social (shared highlights) | P3 |

**04 — Audiobooks**
| Capability group | Phase |
|---|---|
| Browse & Discover; Player | P1 |
| Resume position; listening tools | P2 |
| Offline; AI synopsis; community | P2 |
| Multi-language catalogue growth (content parity) | P1 |
| Reduce third-party streaming dependency | P2 |
| Waveform visualisation | P3 |

**05 — Newspapers & Periodicals**
| Capability group | Phase |
|---|---|
| Newspapers section; Browse & Filter; Full-page reader | P1 |
| Real publisher ingestion pipeline | P1–F |
| Magazines & Journals sections | P2 |
| Full-text search; follows & daily digest | P2 |
| AI summaries & translation; civic gazettes | P2 |

### Pillar 2 — Heritage & Knowledge Systems

**09 — IKS Heritage**
| Capability group | Phase |
|---|---|
| Historical timeline; Manuscripts browse | P1 |
| Full manuscript reading view | P2 |
| Folk & oral traditions | P2 |
| Local heritage; learning & engagement | P2 |
| Translation & transliteration | P2 |
| Immersive 360° / AR heritage | P3 |
| Digitisation partnerships | P2–P3 (external) |

### Pillar 3 — Learn, Prepare & Skill

**06 — Test Preparation Hub**
| Capability group | Phase |
|---|---|
| Exam catalogue; daily practice; readiness dashboard; link to Mock Test | P1 |
| Question-bank sourcing/growth | P1–F (external) |
| Study material; engagement (streaks/badges) | P2 |
| Current affairs; exam notifications/calendar | P2 |
| Personalised/adaptive AI plan; doubt-solving | P3 |

**07 — Mock Test Interface**
| Capability group | Phase |
|---|---|
| Full-length timed test; test experience; basic results; persistence | P1 |
| Deeper solution review | P2 |
| Percentile/comparison; learning loop; accessibility | P2 |
| Sectional/previous-year modes | P2 |
| Adaptive tests; proctoring | P3 |

**10 — STEM Innovation Lab**
| Capability group | Phase |
|---|---|
| Course catalogue; video lessons; badges & leaderboard | P1 |
| Real in-browser code execution sandbox | P2 |
| Certificates; accessibility & language | P2 |
| Projects, simulations, auto-grading | P3 |
| Live workshops booking | P3 |
| Teacher/school tools; career pathways | P3 |

**12 — Video Library**
| Capability group | Phase |
|---|---|
| Catalogue; Discover; Player | P1 |
| Learning tools; personalisation | P2 |
| Self-hosting/rights; content ops | P2 |
| Offline & accessibility depth | P2–P3 |
| Teacher uploads with moderation | P3 |

### Pillar 4 — Create & Contribute

**08 — Podcast Creation Studio**
| Capability group | Phase |
|---|---|
| Recording studio; series & episodes; publish to platform | P1 |
| Listen side (Podcasts Library) | P1 |
| Creator analytics | P2 |
| Editing tools; AI transcription | P2 |
| Governance & moderation workflow | P2 |
| Subscriptions; offline listening | P2 |
| External distribution / RSS; recognition/tips | P3 |

### Pillar 5 — Your Personal Space

**11 — User Profile / My Dashboard**
| Capability group | Phase |
|---|---|
| Profile; Activity & stats; My content; Achievements list | P1 |
| Functional settings (language, dark mode, accessibility, notifications) | P1 |
| Downloadable certificates | P2 |
| Goals & recommendations; data-ownership controls | P2 |
| Aadhaar/DigiLocker identity verification | P1 |

### Pillar 6 — For the Corporation

**14 — Admin & Analytics**
| Capability group | Phase |
|---|---|
| Content management (operate the platform) | P1 |
| User & role management | P1 |
| Platform config & core operations | P1 |
| Creator & moderation tools | P2 |
| Core analytics & KPIs; exports | P2 |
| Announcements & campaigns | P2 |
| Audit logs; data governance | P2 |
| Ward-wise / civic & governance dashboards | P3 |
| Government / identity / physical-library integrations | P1 |

---

## What Each Phase Delivers (at a glance)

- **Phase 1 — Launch (Core):** All 13 modules live and genuinely useful. Residents can browse and read
  books (with AI summaries), listen to audiobooks, read newspapers, explore heritage, prepare for and
  sit mock tests, learn on the STEM lab and video library, listen to and publish podcasts, borrow
  physical books with branch pickup or doorstep delivery, and manage a personal dashboard — on web, in
  a fully four-language, accessible interface, with resident identity verification (Aadhaar/DigiLocker)
  and a minimal admin to run it. Built on the always-on hosting and account/search/ingestion
  foundations.
- **Phase 2 — Enrich (Depth & Hardening):** The full AI layer (mind-maps, quizzes, companion depth,
  TTS, translation), personalisation and community, full-text search, offline, four-language content
  parity, manuscript deep-reading, richer test prep and results, real code execution, creator
  moderation, and the Corporation's core analytics and content-ops tooling.
- **Phase 3 — Expand (Advanced & Integrations):** Immersive 360°/AR heritage, adaptive AI tutoring,
  live STEM workshops and teacher tools, creator ecosystem at scale, native mobile apps, deep
  civic/ward analytics, and catalogue scale-up.

---

## Resolved Calls (2026-07-14)
Prioritisation decisions taken with the client:

1. **Phygital physical-book lending** — **P1** (moved up from P3).
2. **Government integration + resident identity verification (Aadhaar/DigiLocker)** — **P1** (moved up
   from P3).
3. **Four-language content parity** — **P1** (moved up from P2).
4. **Rich AI (mind-maps, quizzes, TTS, translation)** — **P2** (unchanged).
5. **Analytics** — **P2** (unchanged).
6. **Native mobile apps** — **P3** (unchanged).
7. **Minimal Admin (content/user/config) at launch** — **P1**; deeper analytics **P2**.

**Timeline:** the whole platform (P1 + P2 + P3) is to be built within a **3-month period**. The
detailed definition, sequencing, and scheduling of P1/P2/P3 within that window will be finalised in a
subsequent phase plan — not in this pass.
