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
- **Public kiosks** — touch-screen, voice-enabled self-service stations for libraries, ward offices,
  community centres, and public spaces, so residents without a personal device can still access the
  platform from launch.
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

- **Personalised Home** — every resident's entry point on login: a welcome by name, a "continue
  reading / listening / resume test" panel showing items in progress with completion percentage, and
  at-a-glance stat tiles (books read, reading hours, tests taken, certificates earned, streak). **(P1)**
- **Discovery & Trending** — trending content in the resident's city/ward, new arrivals across every
  content type, personalised "for you" recommendations spanning books, audiobooks, tests, videos and
  podcasts, editorial/featured collections, and a spotlight on local and heritage content. **(P1)**
- **Navigation** — a collapsible sidebar with one-click access to every module, quick links and
  shortcuts, and recently-visited items. **(P1)**
- **Language switcher & accessibility quick settings** — switch interface language and adjust text size
  and contrast from anywhere on the platform. **(P1)**
- **Unified platform search** — a single search bar, available from every screen, that searches across
  books, audiobooks, newspapers, tests, videos, podcasts and manuscripts, with suggestions, filters,
  and results in the resident's language first. **(P2)**
- **Notifications & reminders** — a notification centre for new content, activity reminders (continue
  reading, test due, book due for return), and achievements. **(P2)**
- **Announcements & civic messaging** — Corporation banners and notices, events, workshops, scheme
  awareness, and public campaigns surfaced to residents. **(P2)**
- **Personal shortcuts** — pinned/favourite modules, saved items, and goals at a glance. **(P2)**
- **Voice search** — spoken search for low-literacy and hands-free use. **(P3)**

### Public Kiosk (Self-Service)
*A touch-screen public access point for residents without a personal device.*

- **Self-service kiosk interface** — a portrait-mode touch UI with large tiles (Browse Books, My
  Account, Borrow/Return Book, Test Prep, Audio & Podcasts, Help Desk), on-screen date/time, and
  Corporation branding. **(P1)**
- **Voice search & assistance** — spoken search and on-screen prompts for low-literacy and hands-free
  use. **(P1)**
- **Library-card sign-in, borrow & return** — tap the digital library card to sign in and to borrow or
  return physical books at the kiosk (ties to phygital lending). **(P1)**
- **Accessibility** — large touch targets, audio guidance, and multi-language for elderly and
  differently-abled residents. **(P1)**
- **Deployment** — kiosks placed in libraries, ward offices, community centres, and public spaces. **(P1)**

---

### 📚 Pillar 1 — Read & Discover

#### Digital Library
*The front door to the Corporation's entire collection of written knowledge.*

- **Browse & Discover** — a visual catalogue of covers; curated collections (classic literature,
  regional Gujarati literature, academic & university texts, science & technology, business &
  economics, children's & young readers, public-domain classics, and Corporation-exclusive /
  local-author collections); themed and seasonal reading lists; dynamic shelves (new arrivals,
  trending in your city, most-read, most-downloaded, staff/librarian picks, award winners);
  personalised "because you read…" recommendations; and author and series pages. **(P1)**
- **Search & Filter** — search by title, author, and narrator; filter by language, format (eBook/PDF),
  subject/genre, collection, reading level, and availability; sort by relevance, rating,
  popularity/downloads, and date; with spelling tolerance ("did you mean…") and results in the
  resident's language first. **(P1)**
- **Book Detail & AI summary** — a dedicated page per title showing cover, author, publisher, edition,
  year, page count, language, format, subject tags and rating, alongside an AI-generated summary
  written specifically for that book. **(P1)**
- **Read & Access** — one-tap "Read Now" into the eBook Reader; cross-format continuity (switch between
  reading and the audiobook without losing place); large-print and PDF formats. **(P1)**
- **Physical copy access (phygital lending)** — where the Corporation holds physical stock: check
  availability, reserve or borrow a physical book, choose branch pickup or home delivery, and manage
  returns, renewals, due dates, and any fines — a digital-to-doorstep bridge to the physical library
  branches. **(P1)**
- **Physical-catalogue integration** — a resident sees whether a physical copy also exists and at which
  branch. **(P1)**
- **Four-language content parity** — the catalogue usable across Gujarati, Hindi, English, and
  Sanskrit. **(P1)**
- **Personal bookshelf & reader tools** — My Bookshelf and personal lists; reading history;
  continue-reading; requests for titles the library doesn't yet hold; and personal reading goals and
  challenges. **(P1)**
- **Deeper AI understanding** — multiple summary depths (quick summary, detailed analysis, key
  concepts), a visual mind-map of the book's ideas, an auto-generated quiz, a spoken (audio) summary,
  on-demand translation into the resident's language, and confidence / "human-verified" trust
  signals. **(P2)**
- **Full-text search inside books** — find a book by a phrase or quote from within its contents. **(P2)**
- **Offline download** — download titles for offline reading (subject to content rights). **(P2)**
- **Community & reviews** — resident ratings and reviews (moderated), popularity signals,
  recommend-and-share, and report errors/content. **(P2)**
- **Rights & licensing controls** — concurrent-access limits, borrowing windows, and download
  permissions per title. **(P2)**
- **Kids' / young-readers area** — a safe, filtered space with age-appropriate content. **(P2)**
- **Book clubs / reading circles** — curated reading groups around a title or theme. **(P3)**

#### eBook Reader
*A comfortable, accessible reading experience with an AI companion.*

- **Reading experience** — a chapter-by-chapter table of contents; adjustable font size, typeface,
  spacing, and reading themes (light/dark/sepia); page or scroll view; and a full-screen,
  distraction-free mode. **(P1)**
- **Progress & sync** — automatic reading-progress tracking (page and percentage) that resumes exactly
  where the resident left off from any device, with reading-time estimates. **(P1)**
- **AI Reading Companion** — a panel alongside the text to ask questions about the current chapter, get
  passages explained, request summaries, define words, and discuss themes — grounded in the book's own
  content. **(P1)**
- **Annotation** — highlights, bookmarks, and personal notes that persist and are searchable within a
  book, with export/share. **(P2)**
- **Translate** — translate passages or whole chapters on demand and read in the resident's
  language. **(P2)**
- **Read-aloud (TTS)** — natural text-to-speech narration with speed control and follow-along
  highlighting. **(P2)**
- **Study tools** — jump to the book's AI summary, mind-map, and quiz; generate flashcards; and
  cite/quote passages. **(P2)**
- **Accessibility** — large-print, high-contrast, and dyslexia-friendly options, screen-reader and
  keyboard navigation, to WCAG standards. **(P2)**
- **Light social** — share a quote and optionally see popular (moderated) highlights. **(P3)**

#### Audiobooks
*Hands-free access for commuters, the visually impaired, and non-readers.*

- **Browse & Discover** — a searchable, filterable catalogue (language, subject, narrator, duration),
  curated collections, and "you may also like" recommendations. **(P1)**
- **Player** — play/pause, 15-second skip forward/back, adjustable playback speed (0.75x–2x), a full
  chapter list with seek, and a sleep timer. **(P1)**
- **Multi-language catalogue (content parity)** — audiobooks across all four languages, including
  regional-language narration. **(P1)**
- **Listening tools & resume** — bookmarks and notes at timestamps, a playback queue, continue-
  listening, and resume position across devices. **(P2)**
- **Offline** — download for offline listening (subject to content rights). **(P2)**
- **AI synopsis & community** — an AI synopsis per audiobook, chapter summaries, ratings / reviews /
  sharing, and a cross-link to the eBook/text version. **(P2)**
- **Accessibility** — visually-impaired-first design and screen-reader support. **(P2)**
- **Reduce third-party streaming dependency** — cache or self-host frequently-played titles to derisk
  external streaming. **(P2)**
- **Waveform visualisation** — a waveform display during playback. **(P3)**

#### Newspapers & Periodicals
*A daily and archival reading room across languages and cities.*

- **Newspapers section, browse & full-page reader** — filter by language, city/edition, publication,
  and date via a calendar picker; open a realistic full-page layout with zoom, page navigation, and
  single-article view; clip and save articles; and browse a deep archive of past editions. **(P1)**
- **Publisher ingestion pipeline** — the pipeline that brings real editions in from publishers
  (foundational to real content). **(P1)**
- **Magazines & Journals sections** — distinct, browsable sections alongside newspapers. **(P2)**
- **Search & personalisation** — full-text article search across editions and archives; follow
  favourite publications; a daily digest; new-edition notifications; and saved/clipped articles with
  reading history. **(P2)**
- **AI & civic content** — article summaries, article translation, topic tracking and a "today in
  brief"; plus Corporation bulletins, official gazettes and notices, and community newsletters. **(P2)**
- **Accessibility** — a reader/reflow mode, read-aloud (TTS), and large-print for comfortable
  reading. **(P2)**

---

### 🏛️ Pillar 2 — Heritage & Knowledge Systems

#### Indian Knowledge Systems (IKS Heritage)
*Preserving and popularising India's and the region's intellectual and cultural heritage.*

- **Historical timeline & manuscripts** — a timeline spanning six eras (Vedic → Mauryan → Gupta →
  Solanki → Mughal → Modern); select an era to browse its digitised manuscripts and scriptures, each
  with cover, title, language, era, and a summary of historical significance; filter by language and
  era. **(P1)**
- **Full manuscript reading view** — an in-depth reading experience for each manuscript, equivalent to
  the eBook Reader, with an AI companion for difficult classical texts. **(P2)**
- **Folk & oral traditions** — regional folk literature, oral storytelling, and songs (e.g.
  Saurashtra's folk literature) with audio, reusing the audiobook experience. **(P2)**
- **Local heritage** — Corporation-specific and local history, monuments, personalities, and archives,
  with contributions from local historians. **(P2)**
- **Learning & engagement** — curated heritage collections, articles, quizzes, a children's heritage
  section, school tie-ins, and events/exhibitions. **(P2)**
- **Translation & transliteration** — translation and transliteration for classical Sanskrit /
  Gujarati / Hindi texts, with a glossary of terms. **(P2)**
- **Immersive heritage** — 360° virtual tours of monuments and sites (Modhera, Adalaj, and more),
  image galleries, audio guides, and AR/VR experiences. **(P3)**

---

### 🎓 Pillar 3 — Learn, Prepare & Skill

#### Test Preparation Hub
*Coaching-grade exam preparation for every aspirant, free.*

- **Exam catalogue & readiness** — major exam categories (UPSC, GPSC, SSC, Banking, GATE, JEE/NEET,
  Railways, Police, Teaching/TET, State PSCs and more), each with sub-exams, syllabus, available tests
  and aspirant counts; a daily practice question with explanation; and a personal readiness dashboard
  (overall readiness %, subject-wise progress, average score, estimated rank/percentile, strengths and
  weaknesses, trend over time); with a direct link into the Mock Test Engine. **(P1)**
- **Question-bank sourcing/growth** — securing and expanding the question content that powers practice
  and tests (foundational, content-dependent). **(P1)**
- **Practice** — topic-wise practice sets, previous-year questions, difficulty levels, and
  flashcards. **(P2)**
- **Study material** — syllabus breakdown, notes, and linked books and videos. **(P2)**
- **Engagement** — streaks, badges, leaderboards, and study groups. **(P2)**
- **Current affairs & notifications** — a current-affairs feed and an exam calendar with dates and
  application windows. **(P2)**
- **Personalised & adaptive plan** — an AI study plan and schedule, adaptive practice targeting weak
  areas, and AI/community doubt-solving. **(P3)**

#### Mock Test Interface
*A realistic, timed exam-hall experience.*

- **Test experience** — a full-screen exam mode with a live countdown timer; a question navigator
  showing answered / marked-for-review / skipped status at a glance; Save & Next, Mark for Review, and
  Clear Response controls; exam-accurate question types; standard negative marking per exam pattern;
  and multi-language question display. **(P1)**
- **Exam modes** — full-length timed mock tests and topic quizzes at launch. **(P1)**
- **Integrity** — an instructions/consent screen and auto-submit on timeout. **(P1)**
- **Results & persistence** — an instant scored result (overall %, correct/incorrect/unanswered,
  subject-wise breakdown), with every attempt saved permanently to the resident's Personal
  Dashboard. **(P1)**
- **Deeper analysis** — full solution review with explanations, time-per-question,
  percentile/comparison/rank, bookmark tough questions, and a targeted learning loop (retake, practise
  weak areas, add wrong questions to revision). **(P2)**
- **Sectional & previous-year modes** — sectional tests, topic quizzes, and previous-year papers. **(P2)**
- **Accessibility** — extra-time settings, large text, and screen-reader support for eligible
  residents. **(P2)**
- **Adaptive tests & proctoring** — adaptive testing and proctoring-lite for high-stakes use. **(P3)**

#### STEM Innovation Lab
*Hands-on modern skills for every student, aligned to NEP and Atal goals.*

- **Course catalogue** — six categories (3D Design, AI & ML, Atal Innovation, Coding & Dev, Electronics
  & IoT, Robotics Kits); structured courses → modules → lessons; beginner-to-advanced levels; and
  age/grade tracks. **(P1)**
- **Learn** — video lessons paired with an in-browser code editor across languages (Python,
  block/Scratch, JavaScript and more), interactive tutorials, and downloadable resources. **(P1)**
- **Recognition** — XP, achievement badges, and a class leaderboard ranked by experience points. **(P1)**
- **Real code-execution sandbox** — write and run code and see output immediately. **(P2)**
- **Certificates & accessibility** — completion certificates, multi-language lessons, and a
  low-bandwidth mode. **(P2)**
- **Practice & build** — guided projects, circuit/robotics simulations, quizzes, auto-graded
  assignments, and a personal project portfolio. **(P3)**
- **Live & social** — live instructor workshops with booking, cohorts/classrooms, mentor Q&A, peer
  showcase, and hackathons/competitions. **(P3)**
- **Teacher/school tools & guidance** — assign to students, track class progress, integrate with Atal
  Tinkering Labs, map to curriculum, plus career and skill pathways. **(P3)**

#### Video Library
*Curated educational video lessons for every subject and level.*

- **Catalogue & discover** — organised by subject (Mathematics, Science, AI & ML, Coding & Dev,
  History, Language Learning and more), level and language; playlists and multi-video courses; search,
  sort and filter; recommendations; trending/new; and teacher/channel pages. **(P1)**
- **Player** — in-app playback with speed control, captions/subtitles, quality settings, resume
  position, a playback queue, and picture-in-picture. **(P1)**
- **Learning tools** — notes at timestamps, bookmarks, attached materials, linked quizzes, transcripts,
  AI video summaries, and translated captions. **(P2)**
- **Personalisation** — watch history, watch-later, continue-watching, and follow subjects/teachers. **(P2)**
- **Self-hosting / rights & content ops** — reduce third-party dependency, manage rights, and
  moderate. **(P2)**
- **Offline & accessibility** — download for offline (rights permitting), low-bandwidth mode, captions,
  screen-reader, and multi-language. **(P2)**
- **Teacher uploads with moderation** — teacher uploads with a review/moderation workflow and
  Corporation-curated playlists. **(P3)**

---

### 🎙️ Pillar 4 — Create & Contribute

#### Podcast Creation Studio
*Turns the platform two-sided — local teachers and residents become creators.*

- **Recording studio** — browser-based recording with live waveform monitoring, background noise
  cancellation, multi-take, and pause/resume; plus upload of existing audio. **(P1)**
- **Series & publishing** — organise episodes into named series with language tags, cover art,
  descriptions and categories; schedule and publish directly to the platform's Podcasts Library. **(P1)**
- **Podcasts Library (listen side)** — residents browse published episodes by series/topic/language
  and play them with a built-in player. **(P1)**
- **Creator analytics** — listeners, plays, completion, ratings, and subscriber counts, per episode
  and series, with trends. **(P2)**
- **Editing & AI transcription** — trim, splice and re-record segments, add intro/outro and background
  music, automatic AI transcription, and auto-generated show notes and captions. **(P2)**
- **Governance & moderation** — creator onboarding/approval, a content review and moderation workflow,
  guidelines, and rights/consent. **(P2)**
- **Subscriptions & offline listening** — subscribe/follow series and download episodes for offline
  listening. **(P2)**
- **External distribution & recognition** — optional external distribution / RSS, and creator
  recognition/tips. **(P3)**

---

### 👤 Pillar 5 — Your Personal Space

#### User Profile / My Dashboard
*A personal knowledge home that recognises progress and gives residents control of their data.*

- **Profile** — avatar, name, contact, reading streak and join date, with edit-profile and privacy
  controls. **(P1)**
- **Activity & stats** — reading/listening/learning activity charts (30-day and longer), totals
  (books, audiobooks, hours, tests, podcasts, courses), and streaks and milestones. **(P1)**
- **My content** — Currently Reading with progress bars, My Bookshelf/favourites, saved/clipped
  articles, playback queues, and downloads for offline use. **(P1)**
- **Achievements** — earned certificates, badges, completed courses, and a full test history with
  scores and dates. **(P1)**
- **Resident identity verification** — Aadhaar / DigiLocker-linked account verification and a digital
  library card. **(P1)**
- **Functional settings** — language, dark mode, text size/accessibility, and notification
  preferences. **(P1)**
- **Downloadable certificates** — download and share earned certificates. **(P2)**
- **Goals & recommendations** — personal goals and challenges, personalised recommendations, and
  reminders. **(P2)**
- **Data-ownership controls** — download my data, delete account, and consent management. **(P2)**

---

### 🏢 Pillar 6 — For the Corporation

#### Admin & Analytics
*The Corporation's control room — manage the platform and understand how residents use it.*

- **Content management** — add, edit and curate every content type (books, audiobooks, newspapers,
  videos, tests, manuscripts, podcasts); build collections, featured shelves and schedules; bulk
  import; metadata and cover enrichment; rights/licensing; and physical-stock/inventory for
  lending. **(P1)**
- **User & role management** — manage residents, students, seniors, creators, admins and government
  officials; roles and permissions (role-based access); institutional/ward accounts; and support
  tools. **(P1)**
- **Platform config & core operations** — languages, feature flags, and home/discovery curation. **(P1)**
- **Government / identity / physical-library integrations** — connect resident identity
  (Aadhaar/DigiLocker) and the physical-library systems that power lending. **(P1)**
- **Creator & moderation tools** — approve creators, review and moderate community content (podcasts,
  reviews, uploads), and handle reports. **(P2)**
- **Core analytics & KPIs** — active users, content accessed, registrations, session time; DAU/MAU
  trends; content distribution; usage by time; top content; exports (Excel/PDF/CSV); and scheduled
  reports. **(P2)**
- **Announcements & campaigns** — publish banners, notifications, civic messages, events, and featured
  content to residents. **(P2)**
- **Audit logs & data governance** — audit logs, data governance and privacy, backups, and
  health/monitoring. **(P2)**
- **Ward-wise / civic & governance dashboards** — literacy and engagement indicators for policy,
  scheme-campaign reach, and equity-of-access views (which wards/groups are underserved). **(P3)**

---

## 7. Delivery Phasing

The full scope above is delivered in three phases, **all within a three-month build period**. This
document establishes *which* capability sits in *which* phase; the detailed definition, sequencing, and
scheduling of each phase within the three months is finalised in a separate phase plan.

- **Phase 1 — Launch (Core).** All thirteen modules live and genuinely useful on web and public self-service kiosks, in a fully
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

- **In scope:** Every module and capability in Section 6, across phases P1–P3, delivered on web and
  public kiosks (with native mobile in P3), in four languages, to WCAG accessibility standards, with
  the Corporation's administration and analytics tooling.
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
