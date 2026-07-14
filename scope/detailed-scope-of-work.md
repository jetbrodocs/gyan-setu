---
title: "Gyan Setu — Detailed Scope of Work"
subtitle: "Digital Public Library & Knowledge Platform"
tagline: "Empowering Every Citizen with Knowledge"
prepared_for: "[Municipal Corporation]"
prepared_by: "Safal Softcom"
poc: "Vishesh Darji · +91 98257 22409"
created: 2026-07-14
updated: 2026-07-14
version: "2.0 (detailed — exhaustive)"
---

# Gyan Setu
### *Empowering Every Citizen with Knowledge*

**Detailed Scope of Work — Digital Public Library & Knowledge Platform**

Prepared for **[Municipal Corporation]**
Prepared by **Safal Softcom**
Primary point of contact: **Vishesh Darji** · +91 98257 22409
Date: **14 July 2026** · Version: **2.0 (Detailed — Exhaustive)**

---

## 1. Purpose of This Document

This is the detailed, exhaustive companion to the Brief Scope of Work. Where the brief established
*what* Gyan Setu is and the breadth of its value, this document sets out the **full scope of every
module and functionality** the platform will deliver, how the platform is built and delivered, and the
order in which capability is delivered.

It captures the **complete possibility** of the platform — every capability, across all thirteen
modules — so that nothing is lost between vision and build. Capabilities are tagged by delivery phase
(**P1 / P2 / P3**, defined in Section 7). The entire platform is targeted for delivery within a
**three-month build period**; the detailed definition and scheduling of each phase within that window
is finalised in a separate phase plan.

This document deliberately does **not** cover the commercial and pricing model, membership pricing, or
formal service levels — those are handled separately.

---

## 2. Platform Objective

Every resident of [Municipal Corporation] — a school student, a competitive-exam aspirant, a
homemaker, a senior citizen, a working professional, a government employee — carries a smartphone, but
not a library. **Gyan Setu ("Knowledge Bridge") places a complete public library in every resident's
pocket and every home** — free at the point of access, available 24×7, in their own language.

Gyan Setu consolidates into a single Corporation-owned platform what would otherwise take a dozen
separate services: a library, a newspaper archive, an audiobook service, an exam-preparation portal, a
skilling lab, a heritage archive, and a content-creation studio. The objective is simple — **no
resident should be denied access to knowledge because of cost, distance, language, or ability.**

---

## 3. How the Platform Is Delivered

- **Web portal** — browser-based access on any device, desktop or mobile, at launch.
- **Native mobile applications** — Android and iOS, with offline download support (a later phase).
- **Four languages — Gujarati, Hindi, English, and Sanskrit** — across the interface and the content,
  with four-language content parity targeted from launch.
- **Accessibility** — built to recognised standards (WCAG) so elderly and differently-abled residents
  are not left out: text sizing, high contrast, screen-reader and keyboard support throughout.

---

## 4. How the Platform Is Built

In plain terms, so the Corporation understands what it is receiving beyond the visible features:

- **Modern, industry-standard technology.** A current, widely-adopted web framework (React/Next.js)
  for a fast, responsive interface, and a secure, managed relational database (PostgreSQL) that stores
  every resident's library, reading progress, test history, and the content catalogue reliably — the
  same class of technology used by major consumer and government digital platforms.
- **Real, working artificial intelligence.** Book summaries and the AI Reading Companion are powered
  by a genuine, paid AI service (the same generation of technology behind leading AI assistants), not
  scripted responses — so AI features improve as the underlying technology improves, without rebuilding
  the platform.
- **Cloud-hosted and scalable.** The platform runs on cloud infrastructure that scales with resident
  demand. An always-on configuration is used for public launch so there is no first-visit delay for
  residents.
- **Designed for growth.** The underlying system already supports resident, creator, administrator,
  and government-official roles and role-based access, so later modules build on existing foundations
  rather than requiring redesign.
- **Content sourced to launch quickly, grown through partnerships.** An initial curated catalogue is
  available from day one, drawing on established public archives and educational sources; growing the
  catalogue to full scale is a content-licensing and partnerships workstream (Section 9), not just
  engineering.

---

## 5. Platform Foundations

These cross-cutting foundations underpin every module and are built as part of the core launch:

- **Resident accounts, roles & access control** — registration, secure login, and role-based access
  (Citizen, Student, Senior Citizen, Content Creator, Administrator, Government Official).
- **Resident identity verification** — Aadhaar / DigiLocker-based verification, supporting trusted
  sign-up, library-card issuance, and eligibility checks.
- **Core search & discovery** — the search infrastructure powering both catalogue search and the
  unified platform-wide search.
- **Multi-language framework** — the mechanism delivering all four languages across interface and
  content.
- **Accessibility baseline** — WCAG-standard text sizing, contrast, screen-reader and keyboard support.
- **Content ingestion & catalogue pipeline** — how every content type is brought in, tagged, and
  managed.
- **Notifications & activity infrastructure** — powering reminders, achievements, and announcements.
- **Cloud hosting (always-on for launch)** — reliable, scalable infrastructure with no wake-up delay.

---

## 6. Modules & Functionalities — Full Scope

The platform's full capability, module by module, grouped into six citizen pillars plus a
platform-wide layer. Each capability is tagged with its delivery phase — **(P1)** Launch, **(P2)**
Enrich, **(P3)** Expand.

### Platform-Wide — Home & Discovery
*Every resident's personalised entry point.*

- **Personalised Home** — welcome by name; "continue reading / listening / resume test" panels;
  at-a-glance stat tiles (books read, hours, tests, certificates, streak). **(P1)**
- **Discovery & Trending** — trending in your city/ward; new arrivals across all content types;
  "for you" recommendations spanning books, audiobooks, tests, videos, and podcasts; featured
  collections; spotlight on local and heritage content. **(P1)**
- **Navigation** — collapsible sidebar to every module; quick links, shortcuts, recently visited. **(P1)**
- **Language switcher & accessibility quick settings** — text size and contrast controls. **(P1)**
- **Unified platform search** — a single search bar across every content type (books, audiobooks,
  newspapers, tests, videos, podcasts, manuscripts). **(P2)**
- **Notifications & reminders** — new content, activity reminders (continue reading, test due, book
  due), and achievements. **(P2)**
- **Announcements & civic messaging** — Corporation banners, notices, events, workshops, scheme
  awareness, and public campaigns. **(P2)**
- **Personal shortcuts** — pinned/favourite modules, saved items, goals. **(P2)**
- **Voice search.** **(P3)**

---

### 📚 Pillar 1 — Read & Discover

#### Digital Library
*The front door to the Corporation's entire collection of written knowledge.*

- **Browse & Discover** — visual catalogue of covers; curated collections (classics, regional
  Gujarati, academic, science, business, children's, local-author / Corporation-exclusive); themed and
  seasonal reading lists; dynamic shelves (new arrivals, trending, most-read, staff picks, award
  winners); personalised recommendations; author and series pages. **(P1)**
- **Search & Filter** — search by title, author, and narrator; filter by language, format, subject,
  collection, reading level, and availability; sort by relevance, rating, popularity, and date;
  results in the resident's language first. **(P1)**
- **Book Detail & AI summary** — a rich detail page per title with an AI-generated summary written for
  that book. **(P1)**
- **Read & Access** — one-tap "Read Now" into the eBook Reader; cross-format continuity (switch
  between reading and listening); large-print and PDF formats. **(P1)**
- **Physical copy access (phygital lending)** — where the Corporation holds physical stock: check
  availability, reserve or borrow a physical book, choose branch pickup or home delivery, and manage
  returns, renewals, due dates, and any fines — a digital-to-doorstep bridge to the Corporation's
  physical library branches. **(P1)**
- **Physical-catalogue integration** — a resident sees whether a physical copy also exists and where. **(P1)**
- **Four-language content parity** — the catalogue usable across Gujarati, Hindi, English, and
  Sanskrit. **(P1)**
- **Bookshelf & reader tools** — My Bookshelf and personal lists; reading history; continue-reading;
  requests for titles not yet held; personal reading goals. **(P1)**
- **Deeper AI understanding** — visual mind-map, auto-generated quiz, and spoken (audio) summary per
  title; translation of summaries on demand; confidence/trust signals. **(P2)**
- **Full-text search inside books.** **(P2)**
- **Offline download** (subject to content rights). **(P2)**
- **Community & reviews** — resident ratings and reviews (moderated); popularity signals; recommend
  and share. **(P2)**
- **Rights & licensing controls** — concurrent-access limits, borrowing windows, download
  permissions. **(P2)**
- **Kids' / young-readers area** — a safe, filtered space. **(P2)**
- **Book clubs / reading circles.** **(P3)**

#### eBook Reader
*A comfortable, accessible reading experience with an AI companion.*

- **Reading experience** — chapter table of contents; adjustable font size, typeface, spacing, and
  themes; page or scroll view; full-screen mode. **(P1)**
- **Progress & sync** — automatic progress tracking; resume where left off from any device. **(P1)**
- **AI Reading Companion** — ask questions about the current chapter, explain passages, summarise, and
  discuss themes, grounded in the book's text. **(P1)**
- **Annotation** — highlights, bookmarks, and personal notes that persist and are searchable. **(P2)**
- **Translate & read-aloud (TTS)** — translate passages/chapters on demand; natural narration with
  follow-along highlighting. **(P2)**
- **Study tools** — jump to the book's summary/mind-map/quiz; flashcards; cite and quote. **(P2)**
- **Accessibility depth** — large-print, high-contrast, dyslexia-friendly options beyond the baseline. **(P2)**
- **Light social** — shared, moderated highlights. **(P3)**

#### Audiobooks
*Hands-free access for commuters, the visually impaired, and non-readers.*

- **Browse & Discover** — searchable, filterable catalogue (language, subject, narrator, duration);
  collections; "you may also like" recommendations. **(P1)**
- **Player** — play/pause, 15-second skip, adjustable speed (0.75x–2x), chapter list with seek, sleep
  timer. **(P1)**
- **Multi-language catalogue (content parity)** — audiobooks across all four languages. **(P1)**
- **Listening tools & resume** — bookmarks and notes at timestamps; playback queue; resume position
  across devices. **(P2)**
- **Offline** — download for offline listening (subject to content rights). **(P2)**
- **AI synopsis & community** — AI synopsis per audiobook; ratings, reviews, sharing; cross-link to the
  text version. **(P2)**
- **Reduce third-party streaming dependency** — cache/self-host frequently-played titles. **(P2)**
- **Waveform visualisation.** **(P3)**

#### Newspapers & Periodicals
*A daily and archival reading room across languages and cities.*

- **Newspapers section, browse & full-page reader** — filter by language, city/edition, publication,
  and date via a calendar; realistic full-page layout with zoom, page navigation, and article view;
  a deep archive of past editions. **(P1)**
- **Publisher ingestion pipeline** — how real editions are brought in (foundational). **(P1)**
- **Magazines & Journals sections.** **(P2)**
- **Search & personalisation** — full-text article search; follow favourite publications; daily
  digest; new-edition notifications; saved/clipped articles. **(P2)**
- **AI & civic** — article summaries; translate articles; a "today in brief"; Corporation bulletins,
  official gazettes, and community newsletters. **(P2)**

---

### 🏛️ Pillar 2 — Heritage & Knowledge Systems

#### Indian Knowledge Systems (IKS Heritage)
*Preserving and popularising India's and the region's intellectual and cultural heritage.*

- **Historical timeline & manuscripts** — browse six eras (Vedic → Mauryan → Gupta → Solanki → Mughal
  → Modern); select an era to explore its manuscripts and scriptures, with cover, title, language,
  era, and a summary of significance; filter by language and era. **(P1)**
- **Full manuscript reading view** — an in-depth reading experience for each manuscript, equivalent to
  the eBook Reader. **(P2)**
- **Folk & oral traditions** — regional folk literature, oral storytelling, and songs (e.g.
  Saurashtra's folk literature) with audio. **(P2)**
- **Local heritage** — Corporation-specific and local history, monuments, personalities, and archives,
  with contributions from local historians. **(P2)**
- **Learning & engagement** — curated heritage collections, articles, quizzes, a children's heritage
  section, and school tie-ins. **(P2)**
- **Translation & transliteration** — for classical Sanskrit/Gujarati/Hindi texts. **(P2)**
- **Immersive heritage** — 360° virtual tours of monuments and sites, image galleries, audio guides,
  and AR/VR experiences. **(P3)**

---

### 🎓 Pillar 3 — Learn, Prepare & Skill

#### Test Preparation Hub
*Coaching-grade exam preparation for every aspirant, free.*

- **Exam catalogue & readiness** — major categories (UPSC, GPSC, SSC, Banking, GATE, JEE/NEET,
  Railways, Police, Teaching/TET, State PSCs, and more), each with sub-exams, syllabus, and available
  tests; a daily practice question with explanation; a personal readiness dashboard (overall
  readiness %, subject-wise progress, average score, estimated rank); a direct link into the Mock Test
  Engine. **(P1)**
- **Question-bank sourcing/growth** — securing and expanding question content (foundational,
  content-dependent). **(P1)**
- **Study material & engagement** — syllabus breakdown; notes; linked books and videos; streaks,
  badges, leaderboards, and study groups. **(P2)**
- **Current affairs & notifications** — a current-affairs feed and an exam calendar with dates and
  application windows. **(P2)**
- **Personalised & adaptive plan** — an AI study plan and schedule; adaptive practice targeting weak
  areas; AI and community doubt-solving. **(P3)**

#### Mock Test Interface
*A realistic, timed exam-hall experience.*

- **Full-length timed test & experience** — full-screen mode; live countdown; question navigator
  (answered / marked / skipped); Save & Next, Mark for Review, Clear Response; exam-accurate question
  types; negative marking per exam pattern; multi-language question display. **(P1)**
- **Results & persistence** — instant scored result (overall %, correct/incorrect/unanswered,
  subject-wise breakdown); every attempt saved to the Personal Dashboard. **(P1)**
- **Deeper analysis** — full solution review with explanations; time-per-question; percentile /
  comparison / rank; bookmark tough questions; a targeted learning loop; accessibility settings. **(P2)**
- **Sectional & previous-year modes.** **(P2)**
- **Adaptive tests & proctoring** for high-stakes use. **(P3)**

#### STEM Innovation Lab
*Hands-on modern skills for every student, aligned to NEP and Atal goals.*

- **Course catalogue & lessons** — categories (3D Design, AI & ML, Atal Innovation, Coding & Dev,
  Electronics & IoT, Robotics Kits); structured courses → modules → lessons; video lessons paired with
  an in-browser code editor; badges and a class leaderboard. **(P1)**
- **Real code-execution sandbox** — write and run code with immediate output. **(P2)**
- **Certificates & accessibility** — completion certificates; multi-language lessons; low-bandwidth
  mode. **(P2)**
- **Projects, simulations & grading** — guided projects, circuit/robotics simulations, auto-graded
  assignments, and a project portfolio. **(P3)**
- **Live workshops with booking; teacher/school tools; career pathways.** **(P3)**

#### Video Library
*Curated educational video lessons for every subject and level.*

- **Catalogue, discover & player** — organised by subject, level, and language; playlists and
  multi-video courses; search, sort, filter, recommendations; in-app playback with speed control,
  captions, quality settings, and resume position. **(P1)**
- **Learning tools & personalisation** — notes at timestamps, bookmarks, attached materials, linked
  quizzes, transcripts, AI video summaries, translated captions; watch history, watch-later,
  continue-watching, follow subjects/teachers. **(P2)**
- **Self-hosting / rights & content ops** — reduce third-party dependency; manage rights and
  moderation. **(P2)**
- **Offline & accessibility depth.** **(P2–P3)**
- **Teacher uploads with moderation.** **(P3)**

---

### 🎙️ Pillar 4 — Create & Contribute

#### Podcast Creation Studio
*Turns the platform two-sided — local teachers and residents become creators.*

- **Recording studio, series & publishing** — browser-based recording with live waveform and noise
  cancellation; organise episodes into named series with language tags and cover art; publish directly
  to the platform's Podcasts Library. **(P1)**
- **Podcasts Library (listen side)** — residents browse published episodes by series/topic/language
  and play them with a built-in player. **(P1)**
- **Creator analytics** — listeners, plays, completion, ratings, and subscriber counts, per episode
  and series. **(P2)**
- **Editing & AI transcription** — trim, splice, re-record; intro/outro and music; automatic
  transcription; auto-generated show notes and captions. **(P2)**
- **Governance & moderation workflow** — creator onboarding/approval; content review; guidelines;
  rights and consent. **(P2)**
- **Subscriptions & offline listening.** **(P2)**
- **External distribution / RSS; creator recognition/tips.** **(P3)**

---

### 👤 Pillar 5 — Your Personal Space

#### User Profile / My Dashboard
*A personal knowledge home that recognises progress and gives residents control of their data.*

- **Profile, activity & content** — profile with avatar, reading streak, and join date; activity and
  stats charts; totals across books, audiobooks, hours, tests, podcasts, and courses; Currently
  Reading with progress; My Bookshelf; achievements and a full test history. **(P1)**
- **Resident identity verification** — Aadhaar / DigiLocker-linked account verification and library
  card. **(P1)**
- **Functional settings** — language, dark mode, text size/accessibility, and notification
  preferences. **(P1)**
- **Downloadable certificates.** **(P2)**
- **Goals, recommendations & data-ownership controls** — personal goals and challenges; personalised
  recommendations; download-my-data, delete-account, and consent management. **(P2)**

---

### 🏢 Pillar 6 — For the Corporation

#### Admin & Analytics
*The Corporation's control room — manage the platform and understand how residents use it.*

- **Content management (operate the platform)** — add, edit, and curate every content type; build
  collections and featured shelves; metadata and cover management; physical-stock/inventory for
  lending. **(P1)**
- **User & role management** — manage residents, students, seniors, creators, admins, and government
  officials; roles and permissions; institutional/ward accounts; support tools. **(P1)**
- **Platform config & core operations** — languages, feature flags, and home/discovery curation. **(P1)**
- **Government / identity / physical-library integrations** — connect resident identity
  (Aadhaar/DigiLocker) and the physical-library systems that power lending. **(P1)**
- **Creator & moderation tools** — approve creators; review and moderate community content; handle
  reports. **(P2)**
- **Core analytics & KPIs** — active users, content accessed, registrations, session time; DAU/MAU
  trends; content distribution; top content; exports (Excel/PDF/CSV) and scheduled reports. **(P2)**
- **Announcements & campaigns** — publish banners, notifications, civic messages, and featured
  content. **(P2)**
- **Audit logs & data governance.** **(P2)**
- **Ward-wise / civic & governance dashboards** — literacy and engagement indicators; scheme-campaign
  reach; equity-of-access views. **(P3)**

---

## 7. Delivery Phasing

The full scope above is delivered in three phases, **all within a three-month build period**. This
document establishes *which* capability sits in *which* phase; the detailed definition, sequencing, and
scheduling of each phase within the three months is finalised in a separate phase plan.

- **Phase 1 — Launch (Core).** All thirteen modules live and genuinely useful on web, in a fully
  four-language, accessible interface: reading with AI summaries, audiobooks, newspapers, heritage,
  test prep and mock tests, STEM lab and video library, podcast creation and listening, **physical-book
  lending with branch pickup or doorstep delivery**, a personal dashboard with **Aadhaar/DigiLocker
  identity verification**, and a minimal admin to operate it — on the always-on hosting and
  account/search/ingestion foundations.
- **Phase 2 — Enrich (Depth & Hardening).** The full AI layer (mind-maps, quizzes, Reading Companion
  depth, TTS, translation), personalisation and community, full-text search, offline access, richer
  test-prep and results, real code execution, creator moderation, and the Corporation's core analytics
  and content-operations tooling.
- **Phase 3 — Expand (Advanced).** Immersive 360°/AR heritage, adaptive AI tutoring, live STEM
  workshops and teacher tools, the creator ecosystem at scale, native mobile applications, deep
  civic/ward analytics, and catalogue scale-up.

---

## 8. Who It Serves

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

## 9. Assumptions & Dependencies

For this scope to hold, the following must be true or provided (by the Corporation, or coordinated by
Safal Softcom on its behalf):

- **Content licensing & partnerships.** The initial catalogue is a curated starting set. Growing the
  book, newspaper, audiobook, and question-bank catalogue to full scale — and reaching four-language
  content parity — requires securing content rights and partnerships (literary academies, universities,
  newspaper publishers, exam-prep providers). This is a licensing/business-development workstream that
  paces catalogue growth.
- **AI service costs.** AI features run on a paid, usage-based AI service; ongoing usage costs scale
  with resident activity and are budgeted separately from one-time development.
- **Government API access (identity).** Aadhaar / DigiLocker verification requires formal government
  API access approval — typically a longer-lead-time process managed at the Corporation level. As
  identity is a Phase 1 capability, securing this access early is on the critical path.
- **Physical-library logistics (lending).** Phygital lending (Phase 1) depends on the Corporation
  providing physical-branch stock data and agreeing the fulfilment model for branch pickup and
  doorstep delivery (delivery operations, returns handling, and any fines policy).
- **Hosting & operating costs.** Always-on cloud hosting and AI usage are ongoing operating expenses,
  not one-time costs, and should be budgeted as such.
- **Content review responsibility.** For community-contributed content (podcasts, reviews, uploads),
  the Corporation should identify who is responsible for review and moderation.
- **Three-month timeline.** Delivering the full P1–P3 scope within three months assumes the above
  dependencies (identity API access, content rights, physical-branch data) are unblocked in step with
  the build; delays in these external workstreams affect what lands in each phase.

---

## 10. Scope Boundaries

- **In scope:** Every module and capability in Section 6, across phases P1–P3, delivered on web (with
  native mobile in P3), in four languages, to WCAG accessibility standards, with the Corporation's
  administration and analytics tooling.
- **Not covered by this document:** The commercial and pricing model, membership pricing, formal
  service-level agreements, and calendar-dated timelines — handled separately. The detailed definition
  and scheduling of P1/P2/P3 within the three-month build is finalised in a separate phase plan.

---

## 11. Next Steps

This Detailed Scope of Work defines the full capability of the Gyan Setu platform and the phase in
which each capability is delivered. The next steps are the detailed phase plan (sequencing and
scheduling within the three-month build) and the separate commercial proposal.

For any discussion on this document or the platform, please contact **Vishesh Darji** (Primary Point
of Contact) at **+91 98257 22409**.

---

*Gyan Setu — Empowering Every Citizen with Knowledge · Prepared by Safal Softcom · 14 July 2026*
