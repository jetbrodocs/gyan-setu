---
title: "Gyan Setu — Detailed Scope of Work"
subtitle: "Digital Public Library & Knowledge Platform"
tagline: "Empowering Every Citizen with Knowledge"
prepared_for: "[Municipal Corporation]"
prepared_by: "Safal Softcom"
created: 2026-07-14
updated: 2026-07-14
version: "1.0 (detailed)"
---

# Gyan Setu
### *Empowering Every Citizen with Knowledge*

**Detailed Scope of Work — Digital Public Library & Knowledge Platform**

Prepared for **[Municipal Corporation]**
Prepared by **Safal Softcom**
Primary point of contact: **Vishesh Darji** · +91 98257 22409
Date: **14 July 2026** · Version: **1.0 (detailed)**

---

## 1. Purpose of This Document

This document is the detailed companion to the Brief Scope of Work previously shared. Where the
brief document established *what* Gyan Setu is and the breadth of its value, this document sets out
*exactly what is being built*: feature-by-feature functionality for every module, the technical
approach behind the platform, the order in which capability will be delivered, and the assumptions
and dependencies the Corporation should be aware of before sign-off.

This is the document intended for formal scope approval. It defines the boundary of delivery — what
is included, what is explicitly not, and what depends on decisions or inputs from the Corporation.

---

## 2. Platform Objective

Every resident of [Municipal Corporation] — a school student, a competitive-exam aspirant, a
homemaker, a senior citizen, a working professional, a government employee — carries a smartphone,
but not a library. **Gyan Setu ("Knowledge Bridge") places a complete public library in every
resident's pocket and every home** — free at the point of access, available 24×7, in their own
language.

Gyan Setu consolidates capabilities that would otherwise require many separate services — a library,
a newspaper archive, an audiobook service, an exam-preparation portal, a skilling lab, and a
content-creation studio — into a single, Corporation-owned public platform.

---

## 3. Technical Approach

This section explains, in plain terms, how the platform is built and why — so the Corporation
understands what it is receiving beyond the visible features.

- **Web-first, works on any device.** The platform is a modern web application, accessible from any
  browser on any desktop, tablet, or phone — no installation required for the initial release. Native
  Android and iOS apps are planned as a subsequent phase (Section 6), built on the same underlying
  platform so residents' accounts, progress, and content stay in sync across devices once available.
- **Built on modern, industry-standard technology.** The platform uses a current, widely-adopted web
  framework (React/Next.js) for a fast, responsive interface, and a secure, managed relational
  database (PostgreSQL) to store every resident's library, reading progress, test history, and
  content catalogue reliably. This is the same class of technology used by major consumer and
  government digital platforms.
- **Real, working artificial intelligence — not a mock-up.** Book summaries and the in-reader AI
  Reading Companion are powered by a genuine, paid AI service (the same generation of technology
  behind leading AI assistants), not scripted or fake responses. This means the AI features will
  continue to improve as the underlying AI technology improves, without needing to rebuild the
  platform.
- **Cloud-hosted, scalable infrastructure.** The platform runs on cloud infrastructure that can scale
  up automatically as resident usage grows, rather than being limited by a fixed server. The initial
  configuration is cost-optimised (the server "rests" during periods of no traffic and wakes on the
  next visit); an always-on configuration — recommended ahead of public launch to remove any wake-up
  delay for residents — is a small incremental cost, addressed further in Section 8.
- **Initial content sourced to control cost and launch quickly.** To make a broad content library
  available from day one without a large upfront licensing spend, audiobook and educational video
  content initially draws on established, freely available public archives and educational
  publishers. Newspaper archive content, book summaries, and heritage manuscript descriptions are
  generated using the platform's AI capability, styled and formatted to match real publications. This
  approach is addressed in detail under Assumptions & Dependencies (Section 7), since growing the
  catalogue to a large scale over time depends on content partnerships, not just engineering effort.
- **Data model designed for growth.** The underlying system is already designed to support
  administrator and government-official user roles, membership tiers, and role-based access control
  — even where the corresponding screens are not yet built (see Section 6, Pillar 6). This means
  adding the Administration Console in a later phase does not require redesigning how resident data
  is stored.

---

## 4. What Residents Can Do — Modules & Functionalities

The platform brings together, in one place, capabilities organised into five citizen-facing pillars,
plus a sixth pillar for the Corporation. Each module below is described at the feature level.

### Platform-Wide — Home & Discovery

- **Home Dashboard** — every resident's entry point on login: a personalised welcome message, a
  "Continue Reading" panel showing books currently in progress with completion percentage, four
  at-a-glance stat tiles (eBooks read, reading hours, tests taken, certificates earned), a "Trending"
  content grid surfacing popular titles in the resident's city, and a collapsible sidebar providing
  one-click navigation to every module on the platform.
- **Unified platform search** — a single search bar available from every screen, intended to search
  across books, exams, and audiobooks platform-wide.
- **Notifications** — a notification centre for platform updates, reminders, and activity alerts.

### 📚 Pillar 1 — Read & Discover
*Puts a vast, searchable library in every resident's hands — no queue, no distance to travel, no
closing time.*

- **Digital Library** — a searchable eBook catalogue with filtering by language (Gujarati, Hindi,
  English, Sanskrit), format (eBook/PDF), and curated collection (e.g. literary academy collections,
  Corporation-exclusive titles, public-domain classics, university texts); sortable by rating or
  publication year; in-catalogue search by title and author. Each book opens a dedicated page showing
  its cover, author, format, rating, year, and page count, alongside an **AI-generated summary**
  written specifically for that title.
- **eBook Reader** — a full in-browser reading experience: a chapter-by-chapter table of contents for
  navigation, adjustable font size for comfortable reading, and automatic reading-progress tracking
  (page and percentage) that resumes exactly where the resident left off, from any device. An **AI
  Reading Companion** panel sits alongside the text, allowing the resident to ask questions about the
  chapter they're reading and receive contextual answers.
- **Audiobooks** — a browsable, filterable, and searchable audiobook catalogue. The player provides
  play/pause, 15-second skip forward/back, adjustable playback speed, a full chapter list for
  navigation, and "you may also like" recommendations based on the current title.
- **Newspapers & Periodicals** — a date-wise, filterable archive organised into Newspapers, Magazines,
  and Journals sections. Newspapers can be filtered by language, city, and date via a calendar picker,
  and open into a full-page reading view laid out like a real front page, with headline articles and
  a multi-page format.

### 🏛️ Pillar 2 — Heritage & Knowledge Systems
*Brings the region's and India's intellectual and cultural heritage to a wide audience, and preserves
it digitally for future generations.*

- **Indian Knowledge Systems (IKS)** — a historical timeline spanning six eras, from the Vedic period
  (1500 BCE) through the Modern era (1947 CE onward). Residents select an era to browse its associated
  manuscripts and scriptures, filterable by language (Sanskrit, Gujarati, Hindi, English), with each
  entry showing a cover, title, language, and a descriptive summary of the work's historical
  significance.
- **Manuscript reading view** — a dedicated in-depth reading experience for each manuscript,
  equivalent in depth to the eBook Reader (planned enhancement — see Section 6, Phase 2).
- **360° virtual heritage tours** — immersive virtual tours of heritage sites (e.g. Modhera Sun
  Temple, Adalaj Stepwell) — future phase (Section 6).
- **Folk & oral traditions** — a dedicated section preserving regional folk literature and oral
  storytelling traditions (e.g. Saurashtra's folk literature) — future phase (Section 6).

### 🎓 Pillar 3 — Learn, Prepare & Skill
*Gives every aspirant coaching-grade preparation and every student modern skills — regardless of what
their family can afford.*

- **Test Preparation Hub** — structured preparation across six major competitive-exam categories
  (UPSC, GPSC, SSC, Banking, GATE, JEE/NEET), each showing available tests and aspirant counts. A
  **daily practice question** gives immediate right/wrong feedback with the correct answer explained.
  A **personal readiness dashboard** shows an overall readiness percentage, subject-wise progress
  bars, average score, and an estimated national rank based on performance.
- **Mock Test Engine** — a full-screen, timed examination simulation with a live countdown, a
  question-by-question navigator showing answered/marked-for-review/skipped status at a glance, "Save
  & Next," "Mark for Review," and "Clear Response" controls, and standard competitive-exam negative
  marking. On submission, residents receive a detailed scored result: overall percentage, correct/
  incorrect/unanswered counts, and a subject-wise performance breakdown — and every completed attempt
  is recorded permanently in the resident's Personal Dashboard.
- **STEM Innovation Lab** — course content organised into six categories (3D Design, AI & ML, Atal
  Innovation, Coding & Dev, Electronics & IoT, Robotics Kits), combining video lessons with a live,
  in-browser code editor where residents can write and run code and see output immediately. The
  module includes an achievement-badge system, a class leaderboard ranked by experience points, and a
  live workshops section for future instructor-led sessions with booking (Section 6).
- **Video Library** — a curated library of educational videos organised by subject category
  (Mathematics, Science, AI & ML, Coding & Dev, History, Language Learning), with search, sort, and
  in-app video playback.

### 🎙️ Pillar 4 — Create & Contribute
*Makes the platform two-sided — local teachers and residents become creators, building a knowledge
base owned by the community.*

- **Podcast Creation Studio** — a browser-based recording studio for approved content creators
  (teachers, subject experts) with live waveform monitoring, background noise cancellation, and
  automatic AI transcription during recording. Creators organise episodes into named series (with
  language tagging) and publish directly to the platform. A creator analytics panel shows aggregate
  listener counts, episode counts, and average rating across the creator's series.
- **Podcasts Library** — the resident-facing listening experience: published episodes browsable by
  series, with a built-in audio player.
- **Creator ecosystem & moderation** — a governed pathway and review workflow for teachers and
  institutions to contribute courses, tests, videos, and readings — future phase (Section 6).

### 👤 Pillar 5 — Your Personal Space
*A personal knowledge home that remembers where each resident left off and recognises their
progress.*

- **Personal Dashboard** — a single view of the resident's own activity: a 30-day reading-activity
  chart, a "Currently Reading" list with live progress bars, earned certificates (downloadable),
  a saved bookshelf of favourited titles, and a complete history of mock test attempts with scores and
  dates — automatically updated the moment an activity (e.g. a completed test) happens elsewhere on
  the platform.
- **User accounts & access management** — resident registration and secure login (password-based at
  launch), with role-based access distinguishing Citizens, Students, Senior Citizens, and Content
  Creators. Administrator and Government Official roles are reserved in the platform's design for
  Pillar 6 (Section below).
- **Membership tiers** — three tiers (Basic / Standard / Gold), each unlocking a defined set of
  platform features (download limits, audiobook access, mock test allowance, AI feature depth,
  offline mode, priority support), with a stated 50% discount pathway for students and senior
  citizens. Tier comparison and current-plan display are included at launch; **live tier upgrades via
  online payment are a future phase** (Section 6 and Section 7).

### 🏢 Pillar 6 — For the Corporation

Gyan Setu is not only a citizen service — it is an instrument for civic insight and governance.

- **Administration Console** — a unified place for the Corporation's administrators to manage
  content, users, creators, and platform configuration — **future phase** (Section 6). The platform's
  data model already reserves an Administrator role, so this module builds on existing foundations
  rather than requiring structural rework.
- **Analytics & Insight Dashboard** — usage trends, most-accessed content, exam-preparation
  engagement, and ward-wise reach reporting, to help the Corporation understand what residents read
  and learn, and where to invest next — **future phase** (Section 6).
- **Government integration** — optional Aadhaar / DigiLocker-based resident verification, to
  streamline membership sign-up and enable discount eligibility checks — **future phase** (Section 6),
  dependent on government API access approval (Section 7).
- **Owned and branded by the Corporation** — the platform carries the Corporation's identity, and all
  content and resident data remain the Corporation's property.

---

## 5. Who It Serves

| Resident | What Gyan Setu gives them |
|---|---|
| **School & college students** | Books, STEM lab, video lessons, structured learning |
| **Competitive-exam aspirants** | Test prep, mock tests, performance analytics — coaching-grade |
| **Working professionals** | Upskilling, audiobooks, newspapers, learn-on-the-commute |
| **Senior citizens** | Large-text reading, audiobooks, heritage content |
| **General readers** | Regional literature, audiobooks, podcasts in their language |
| **Teachers & content creators** | Tools to publish, teach, and build a local knowledge base |
| **[Municipal Corporation]** | Administration, analytics, and a flagship citizen-first service |

---

## 6. Phased Delivery

Delivery is sequenced into three phases so the Corporation can launch a genuinely useful platform
quickly, then extend it.

### Phase 1 — MVP Launch (in this scope)

All modules and functionality listed in Section 4, Pillars 1 through 5, **except** the items
explicitly marked "future phase" within those pillars. This includes: Home Dashboard, Digital
Library, eBook Reader, Audiobooks, Newspapers & Periodicals, IKS Heritage (era-based browsing),
Test Preparation Hub, Mock Test Engine, STEM Innovation Lab, Video Library, Podcast Creation Studio,
Podcasts Library, Personal Dashboard, user accounts and role-based access, and membership tier
display (without live payment processing).

### Phase 2 — Launch Hardening (immediately following Phase 1)

Functional refinements identified during platform review, prioritised by impact:

- Fully wire the AI Reading Companion for live use (requires production AI service provisioning —
  see Section 7).
- Build the full manuscript reading view for IKS Heritage (currently browse-and-preview only).
- Deliver AI-generated Mind Maps and Quizzes on book detail pages (currently placeholder).
- Make the platform-wide search bar and notification centre fully functional.
- Add clear in-app messaging (e.g. "coming soon") to any control tied to a future-phase feature, so
  residents always understand what is and isn't available yet, rather than encountering an
  unresponsive control.
- Move hosting to an always-on configuration to remove first-visit wake-up delay ahead of public
  launch (see Section 7).

### Phase 3 — Platform Expansion (future phases, to be scoped and costed separately)

- **Administration Console and Analytics & Insight Dashboard** (Pillar 6).
- **Live membership upgrades** via an integrated payment gateway (UPI, Net Banking, Cards).
- **Aadhaar / DigiLocker** identity verification and discount eligibility.
- **360° virtual heritage tours** and **Folk & Oral Traditions** section (Pillar 2).
- **Live Workshops booking** (STEM Innovation Lab).
- **Creator ecosystem and moderation workflow** for broader community content contribution.
- **Native Android and iOS mobile applications**, including offline download support.
- **Expanded multi-language content parity** — growing Hindi and Sanskrit content (currently a
  smaller share of the catalogue than Gujarati and English) to match across all content types.
- **Catalogue scale-up** — growing from an initial curated catalogue toward the platform's long-term
  scale ambitions, gated primarily by content licensing and partnerships (see Section 7), not by
  further engineering.

---

## 7. Assumptions & Dependencies

For this scope to hold, the following must be true or provided by the Corporation (or coordinated by
Safal Softcom on the Corporation's behalf):

- **Content licensing and partnerships.** The initial catalogue is a curated starting set. Growing
  the eBook, newspaper, and question-bank catalogue to a large scale requires securing content rights
  and partnerships — with literary academies, universities, newspaper publishers, and exam-prep
  content providers. This is a licensing and business-development workstream, separate from platform
  engineering, and its pace directly determines how quickly the catalogue can grow beyond the initial
  launch set.
- **Third-party content dependency at launch.** To make audiobook and video content available from
  day one without large upfront licensing costs, initial audiobook and video content is streamed
  from established public archives and educational platforms rather than hosted directly by Gyan
  Setu. This is a reasonable and cost-effective launch strategy, but it means playback for that
  content depends on those external services remaining available. A self-hosted media strategy is a
  future consideration if and when this dependency needs to be reduced (e.g. as part of Phase 3).
- **AI service costs.** The AI-powered features (book summaries, Reading Companion, and the planned
  Mind Map/Quiz generation in Phase 2) run on a paid, usage-based AI service. Ongoing usage costs
  scale with resident activity and must be budgeted for separately from one-time development cost;
  a production API allocation needs to be provisioned ahead of Phase 2 completion.
- **Payment gateway agreement.** Live membership upgrades (Phase 3) require the Corporation to
  establish a commercial relationship with a payment provider (e.g. Razorpay, CCAvenue, or a UPI-
  enabled provider) — a separate procurement process from this scope of work.
- **Government API access.** Aadhaar / DigiLocker integration (Phase 3) requires formal government
  API access approval, which is typically a longer-lead-time process managed at the Corporation
  level, not something Safal Softcom can secure independently.
- **Hosting cost model.** The recommended always-on hosting configuration for public launch (Section
  6, Phase 2) carries a modest, predictable monthly infrastructure cost in addition to one-time
  development cost. The Corporation should budget for ongoing cloud hosting and AI service costs as
  operating expenses, not one-time costs.
- **Administrator and Official accounts.** The platform's data model already reserves roles for
  Corporation administrators and government officials, so Phase 3's Administration Console does not
  require a data redesign — but the console itself, its screens, and its reporting logic are new
  build effort, not a configuration toggle.
- **Content review responsibility.** For the Create & Contribute pillar (Section 4, Pillar 4) to
  operate safely at scale, the Corporation should identify who is responsible for reviewing and
  moderating community-contributed content once the Creator ecosystem (Phase 3) is live.

---

## 8. Scope Boundaries

- **In scope (Phase 1 — MVP):** All modules and functionality described in Section 4, Pillars 1
  through 5, excluding items explicitly marked "future phase" within those pillars. Delivered as a
  web application across four languages (Gujarati, Hindi, English, Sanskrit), built to recognised
  accessibility standards (WCAG).
- **In scope (Phase 2 — Launch Hardening):** The specific functional refinements listed in Section 6,
  Phase 2.
- **Future phase (Phase 3 — not in current commercial scope):** Administration Console, Analytics &
  Insight Dashboard, live payment-based membership upgrades, Aadhaar/DigiLocker integration, 360°
  virtual tours, Folk & Oral Traditions section, Live Workshops booking, Creator ecosystem/moderation,
  native mobile applications, and catalogue scale-up beyond the initial curated content set. These
  are described in this document to establish the platform's direction, but are to be separately
  scoped, timelined, and costed when the Corporation is ready to proceed with them.
- **Not covered by this document:** Detailed timelines with calendar dates, commercial pricing, and
  formal service-level agreements — to be addressed in a separate commercial proposal.

---

## 9. Sign-Off

This Detailed Scope of Work is submitted for review and approval by [Municipal Corporation]. Approval
of this document confirms agreement on the Phase 1 (MVP) and Phase 2 (Launch Hardening) scope
described above, and acknowledgement of the Phase 3 items and dependencies as future, separately-
scoped work.

**For [Municipal Corporation]:**

Name: _____________________________ Designation: _____________________________

Signature: _____________________________ Date: _____________________________

**For Safal Softcom:**

Name: Vishesh Darji Designation: Primary Point of Contact

Signature: _____________________________ Date: _____________________________

---

*Gyan Setu — Empowering Every Citizen with Knowledge · Prepared by Safal Softcom · 14 July 2026*
