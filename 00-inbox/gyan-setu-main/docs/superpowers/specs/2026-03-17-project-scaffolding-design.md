# Gyaan Setu — Project Scaffolding Design

**Date:** 2026-03-17
**Status:** Approved
**Scope:** Full project scaffolding for the Gyaan Setu demo prototype — tech stack, folder structure, database schema, API design, UI patterns, and seeding strategy.

---

## 1. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript | Single app handles UI + API routes; fast for demo; Turbopack default bundler |
| Styling | Tailwind CSS + shadcn/ui | Themeable components, matches design system |
| Database | PostgreSQL + Prisma ORM | Relational data, migrations, seeding built-in |
| AI | Anthropic SDK (Claude API) | AI Reading Companion, mind maps, quizzes |
| eBook Reader | epub.js | EPUB rendering, TOC, highlights, pagination |
| Audio Waveform | wavesurfer.js | Audiobook player + podcast studio waveforms |
| Newspaper Viewer | react-pdf (pdf.js) | Full-page newspaper/magazine rendering |
| Code Editor | CodeMirror 6 | STEM Lab syntax highlighting |
| Code Execution | Pyodide | Browser-based Python — no server needed |
| Charts | Recharts | Dashboard, test prep, profile charts |

## 2. Project Structure

```
gyan-setu/
  src/
    app/
      (auth)/
        login/page.tsx
      (main)/
        layout.tsx                ← sidebar + topbar shell
        dashboard/page.tsx
        library/
          page.tsx                ← catalog/browse
          [bookId]/page.tsx       ← book detail (overview/mind map/quiz tabs)
        reader/[bookId]/page.tsx
        audiobooks/
          page.tsx              ← browse/catalog
          [audiobookId]/page.tsx ← player view
        newspapers/page.tsx
        test-prep/
          page.tsx                ← exam categories + performance
        mock-test/[testId]/
          layout.tsx              ← full-screen layout (no sidebar)
          page.tsx
        podcasts/
          page.tsx              ← consumer browse & listen
        podcast-studio/page.tsx ← creator recording & management
        iks-heritage/page.tsx
        stem-lab/page.tsx
        video-library/page.tsx
        profile/page.tsx
        membership/page.tsx
      api/
        auth/
        books/
        audiobooks/
        newspapers/
        tests/
        podcasts/
        podcast-series/
        podcast-recordings/
        videos/
        manuscripts/
        stem/
        users/
        search/
        ai/
    components/
      layout/                     ← Sidebar, TopBar, AppShell
      ui/                         ← shadcn components
      shared/                     ← BookCard, StatsCard, FilterSidebar, etc.
    lib/
      prisma.ts                   ← Prisma client singleton
      auth.ts                     ← session helpers
      ai.ts                       ← Claude API helpers
  prisma/
    schema.prisma
    seed.ts
    migrations/
  public/
    datasets/                     ← book text, audio, covers, newspapers
  scripts/                        ← PDF generation, utilities
```

### Layout Structure

**App Shell** (all `(main)` routes):
- Left sidebar (navy `#1E293B`): logo, module nav, "My Account" section, user avatar at bottom
- Top bar (white): page title, search bar, language dropdown (EN, non-functional), notification bell
- Content area: module page renders here

**Layout exceptions:**
- **Login** (`(auth)/login`) — standalone dark background, centered card, no sidebar
- **Mock Test** (`mock-test/[testId]`) — full-screen exam mode, own layout with timer header, no sidebar

### Sidebar Navigation Items

1. Dashboard
2. Digital Library
3. Audiobooks
4. Periodicals
5. Test Prep Hub
6. Podcast Studio
7. IKS Heritage
8. STEM Lab
9. Video Library
10. *(separator)*
11. My Analytics (profile)
12. Membership

User card at bottom: avatar, name, membership tier.

## 3. Data Model

### Auth & Users

```
User
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  passwordHash  String
  role          Role     (CITIZEN, STUDENT, SENIOR, CREATOR, ADMIN, OFFICIAL)
  membershipTier Tier    (BASIC, STANDARD, GOLD)
  avatarUrl     String?
  streakDays    Int      @default(0)
  createdAt     DateTime

Session
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
```

### Content (seeded from datasets)

```
Book
  id          String   @id @default(cuid())
  title       String
  author      String
  language    String
  format      String   (EPUB, PDF)  ← audiobooks are separate entities in the Audiobook model
  collection  String?
  year        Int?
  coverUrl    String?
  rating      Float    @default(0)
  description String?
  filePath    String?
  pageCount   Int      @default(0)

Audiobook
  id            String   @id @default(cuid())
  title         String
  narrator      String?
  language      String
  coverUrl      String?
  totalDuration Int      (seconds)
  chapters      Json

Newspaper
  id          String   @id @default(cuid())
  publication String
  edition     String?
  date        DateTime
  language    String
  city        String
  fileUrl     String

PodcastSeries
  id              String @id @default(cuid())
  name            String
  creatorId       String
  description     String?
  language        String
  subscriberCount Int    @default(0)
  coverUrl        String?

Podcast
  id          String    @id @default(cuid())
  title       String
  seriesId    String
  audioUrl    String
  duration    Int       (seconds)
  publishedAt DateTime?

Video
  id           String  @id @default(cuid())
  title        String
  category     String
  youtubeUrl   String
  duration     Int     (seconds)
  thumbnailUrl String?
  description  String?

Manuscript
  id          String  @id @default(cuid())
  title       String
  era         String  (VEDIC, MAURYAN, GUPTA, SOLANKI, MUGHAL, MODERN)
  language    String
  description String?
  contentUrl  String?
  coverUrl    String?

StemCourse
  id           String  @id @default(cuid())
  title        String
  moduleNumber Int
  totalModules Int
  videoUrl     String
  description  String?
  category     String

ExamCategory
  id        String @id @default(cuid())
  name      String
  testCount Int    @default(0)
  userCount Int    @default(0)
  icon      String?

Test
  id              String @id @default(cuid())
  examCategoryId  String
  title           String
  durationMinutes Int
  totalQuestions  Int

Question
  id            String @id @default(cuid())
  testId        String
  text          String
  options       Json   ([{label, text}])
  correctAnswer String
  marks         Float  @default(1)
  negativeMarks Float  @default(0)
  subject       String?
  isQuestionOfDay Boolean @default(false)

MembershipPlan
  id         String @id @default(cuid())
  name       String (BASIC, STANDARD, GOLD)
  price      Int    (monthly price in INR, 0 for BASIC)
  features   Json   ([feature strings])
  isPopular  Boolean @default(false)
  tier       Tier
```

### User Activity (seeded + live)

```
Highlight
  id       String @id @default(cuid())
  userId   String
  bookId   String
  text     String
  position Json
  color    String @default("#F59E0B")

Note
  id       String @id @default(cuid())
  userId   String
  bookId   String
  text     String
  position Json

ReadingProgress
  id          String   @id @default(cuid())
  userId      String
  bookId      String
  currentPage Int
  totalPages  Int
  updatedAt   DateTime
  @@unique([userId, bookId])

TestAttempt
  id          String   @id @default(cuid())
  userId      String
  testId      String
  score       Float
  totalMarks  Float
  answers     Json
  startedAt   DateTime
  completedAt DateTime?

BookshelfItem
  id     String @id @default(cuid())
  userId String
  bookId String
  @@unique([userId, bookId])

PodcastRecording
  id        String   @id @default(cuid())
  userId    String
  title     String
  audioUrl  String?
  seriesId  String?
  podcastId String?  @unique  ← links to Podcast entry once published
  status    RecordingStatus (DRAFT, PUBLISHED)
  createdAt DateTime
```

> **Podcast publish flow:** When a recording is published, a new `Podcast` row is created with `audioUrl` from the recording, and the `PodcastRecording.podcastId` is set to link them. This makes the episode visible in the consumer browse.

### Pre-computed (seeded)

```
UserStats
  userId             String @id
  booksRead          Int    @default(0)
  audiobooksListened Int    @default(0)
  testsTaken         Int    @default(0)
  podcastHours       Float  @default(0)
  certificates       Int    @default(0)

TestPerformance
  userId         String
  examCategoryId String
  readinessPct   Float
  avgScore       Float
  rank           Int
  subjectScores  Json
  @@id([userId, examCategoryId])

LeaderboardEntry
  userId     String @id
  xp         Int
  rank       Int
  badgeCount Int

TrendingContent
  id          String @id @default(cuid())
  contentType String (BOOK, AUDIOBOOK, VIDEO, PODCAST)
  contentId   String  ← polymorphic ref, resolved at app level (no FK constraint)
  title       String
  coverUrl    String?
  metric      String?
  position    Int

Certificate
  id     String @id @default(cuid())
  userId String
  name   String
  icon   String?
  earnedAt DateTime

ReadingActivity
  id     String @id @default(cuid())
  userId String
  date   DateTime
  minutes Int     (reading minutes that day)
  @@unique([userId, date])
```

### AI Cache

```
MindMap
  id        String   @id @default(cuid())
  bookId    String   @unique
  content   Json
  createdAt DateTime

BookSummary
  id          String   @id @default(cuid())
  bookId      String   @unique
  summaryText String
  createdAt   DateTime
```

## 4. Authentication

- Simple cookie-based sessions (no NextAuth — overkill for demo)
- Login: validate email + bcrypt password → create session → set HTTP-only cookie
- Proxy (`src/proxy.ts`, Next.js 16 convention) on `(main)` routes checks session cookie, redirects to login if missing
- API routes check session (except `POST /api/auth/login`)

### Pre-seeded demo accounts

| Name | Email | Tier | Role | Purpose |
|------|-------|------|------|---------|
| Rahul Sharma | rahul@demo.com | STANDARD | CITIZEN | Primary demo user (most screenshots) |
| Mahesh Joshi | mahesh@demo.com | GOLD | CITIZEN | Profile screenshot, gold features |
| Priya Patel | priya@demo.com | BASIC | STUDENT | Student discount, leaderboard |
| Meera Desai | teacher@demo.com | STANDARD | CREATOR | Podcast studio creator flow |

## 5. API Endpoints

```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/search?q=                  ← global search across books, audiobooks, videos, podcasts

GET    /api/books?language=&format=&collection=&year=&sort=&search=
GET    /api/books/[id]
GET    /api/books/[id]/summary
GET    /api/books/[id]/mind-map        ← returns cached or triggers Claude generation
POST   /api/books/[id]/quiz            ← live Claude generation

GET    /api/audiobooks?search=&language=
GET    /api/audiobooks/[id]

GET    /api/newspapers?date=&language=&city=&publication=
GET    /api/newspapers/[id]

GET    /api/exam-categories
GET    /api/tests?categoryId=
GET    /api/tests/[id]                 ← includes questions
POST   /api/tests/[id]/submit          ← score & save attempt

GET    /api/podcast-series?creatorId=
POST   /api/podcast-series             ← create new series
GET    /api/podcasts?seriesId=&search=
GET    /api/podcast-recordings?status=  ← creator's own recordings list
POST   /api/podcast-recordings         ← save draft recording
PATCH  /api/podcast-recordings/[id]    ← update metadata
POST   /api/podcast-recordings/[id]/publish  ← publish: creates Podcast entry, updates status

GET    /api/videos?category=&search=
GET    /api/manuscripts?era=&language=
GET    /api/stem-courses?category=
GET    /api/membership-plans

GET    /api/dashboard/stats            ← platform-wide counts (total books, users, etc.)
GET    /api/users/me/stats
GET    /api/users/me/bookshelf
POST   /api/users/me/bookshelf
DELETE /api/users/me/bookshelf/[bookId]
GET    /api/users/me/test-attempts
GET    /api/users/me/test-performance?examCategoryId=  ← pre-computed readiness, rank, subject scores
GET    /api/users/me/reading-progress
PATCH  /api/users/me/reading-progress/[bookId]
GET    /api/users/me/certificates
GET    /api/users/me/reading-activity  ← 30-day chart data

GET    /api/highlights?bookId=         ← user's highlights for a book
POST   /api/highlights
DELETE /api/highlights/[id]
GET    /api/notes?bookId=              ← user's notes for a book
POST   /api/notes
DELETE /api/notes/[id]

GET    /api/trending
GET    /api/leaderboard

POST   /api/ai/companion
POST   /api/ai/translate
```

## 6. UI Components & Page Patterns

### Shared Components

| Component | Purpose |
|-----------|---------|
| `AppShell` | Sidebar + topbar wrapper |
| `Sidebar` | Navy nav with active state, user card |
| `TopBar` | Page title, search, language dropdown, notifications |
| `BookCard` | Cover, title, author, language tag, rating, format badge |
| `StatsCard` | Icon + number + label |
| `FilterSidebar` | Checkbox groups (language, format, collection, year) |

### Page Layout Patterns

1. **Browse/catalog** (library, audiobooks, newspapers, videos, IKS) — filter sidebar left + content grid right
2. **Full-width** (dashboard, profile, membership, test prep) — cards and sections in main area
3. **Split panel** (eBook reader, podcast studio) — main content left + companion/tools right
4. **Immersive** (mock test) — full-screen, own layout, no app shell

### Module-Specific UI Notes

- **eBook Reader**: TOC sidebar (left, collapsible) + epub.js reader (center) + AI companion chat (right) + progress bar (bottom)
- **Podcast Studio**: Recording interface with waveform (left) + My Podcasts list & series management (right). Full publish flow: record → add title/series → publish → appears in consumer browse
- **Mock Test**: Timer header + question panel (left) + answer navigation grid (right) + submit controls (bottom)
- **STEM Lab**: Video player (top) + CodeMirror editor with terminal (bottom-left) + badges & leaderboard (right)

## 7. Seeding Strategy

### Content Volumes

| Data | Count | Source |
|------|-------|--------|
| Books | 20-30 | Public book datasets (Kaggle, Open Library) |
| Full book text | 5-8 | Project Gutenberg |
| Audiobooks | 8-10 | LibriVox |
| Newspapers | 5-10 | Public news dataset / generated samples |
| Exam categories | 6 | UPSC, GPSC, SSC, Banking, GATE, JEE/NEET |
| Tests | 12-18 | 2-3 per category |
| Questions | 240-900 | 20-50 per test, from public exam datasets |
| Podcasts | 5-10 | Public domain audio samples |
| Videos | 10-15 | YouTube education links |
| Manuscripts | 8-12 | Tagged by 6 eras |
| STEM courses | 5-8 | YouTube tutorial links |

### Pre-computed Seed Data

- User stats, test performance, leaderboard, trending content — all seeded as materialized view tables
- Book summaries pre-generated for all seeded books
- Mind maps pre-cached for 3-4 popular books
- Reading progress, test attempts, bookshelf items for demo accounts

### File Storage

All static assets in `public/datasets/`:
- `books/` — EPUB/text files
- `covers/` — book and audiobook cover images
- `audio/` — audiobook and podcast audio files
- `newspapers/` — PDF newspaper pages

No cloud storage — everything local for demo.

## 8. Design System

| Token | Value |
|-------|-------|
| Navy | `#1E293B` |
| Blue | `#3B82F6` |
| Gold | `#F59E0B` |
| Green | `#10B981` |
| Red | `#EF4444` |
| Light Gray | `#F3F4F6` |
| Font | System default (Arial/sans-serif) |
| Accessibility | WCAG 2.0 AA visual compliance |
| Language | English only; dropdown visible but non-functional |

## 9. Management Decisions (Resolved 2026-03-17)

| Question | Decision |
|----------|----------|
| Multi-language UI | English only, language dropdown as visual placeholder |
| Video Library source | YouTube embeds |
| 360° virtual tours | Placeholder buttons (non-functional) |
| Podcast publish flow | **Required** — full record → edit → publish pipeline |
| Admin Analytics | **Deferred** — not needed for demo day |
