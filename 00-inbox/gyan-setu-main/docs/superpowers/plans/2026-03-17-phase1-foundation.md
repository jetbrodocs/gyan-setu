# Phase 1: Foundation — Project Setup, Auth, App Shell & Dashboard

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up the Next.js project with Docker PostgreSQL, Prisma schema, cookie-based auth, the app shell (sidebar + topbar), and the Dashboard landing page — all wired to seeded data.

**Architecture:** Single Next.js 16 App Router application. PostgreSQL runs in Docker. Prisma manages schema and seeding. The app shell layout (sidebar + topbar) wraps all authenticated routes. The Dashboard is the first content page, displaying stats and trending content from seeded DB data.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, PostgreSQL (Docker), Prisma ORM, bcrypt

**Spec:** `docs/superpowers/specs/2026-03-17-project-scaffolding-design.md`

**Visual Reference:** `slides/02-dashboard.png` (dashboard layout)

---

## File Map

### Infrastructure
- Create: `docker-compose.yml` — PostgreSQL container
- Create: `.env` — database URL, secrets
- Create: `.env.example` — template without secrets
- Modify: `package.json` — replace with Next.js project deps
- Create: `next.config.ts` — Next.js configuration
- Create: `tsconfig.json` — TypeScript config
- Create: `tailwind.config.ts` — Tailwind with Gyaan Setu design tokens
- Create: `postcss.config.mjs` — PostCSS for Tailwind
- Create: `components.json` — shadcn/ui config
- Modify: `.gitignore` — add Next.js ignores (.next, .env, etc.)

### Prisma
- Create: `prisma/schema.prisma` — full database schema (all models from spec)
- Create: `prisma/seed.ts` — seed script for demo accounts + dashboard data
- Create: `src/lib/prisma.ts` — Prisma client singleton

### Auth
- Create: `src/lib/auth.ts` — session helpers (createSession, getSession, deleteSession)
- Create: `src/proxy.ts` — route protection proxy (Next.js 16 convention, replaces middleware.ts)
- Create: `src/app/(auth)/login/page.tsx` — login page
- Create: `src/app/(auth)/layout.tsx` — auth layout (no sidebar)
- Create: `src/app/api/auth/login/route.ts` — POST login
- Create: `src/app/api/auth/logout/route.ts` — POST logout
- Create: `src/app/api/auth/me/route.ts` — GET current user

### App Shell
- Create: `src/app/(main)/layout.tsx` — sidebar + topbar wrapper
- Create: `src/components/layout/sidebar.tsx` — navy sidebar with nav items
- Create: `src/components/layout/topbar.tsx` — top bar with search + lang dropdown
- Create: `src/components/layout/app-shell.tsx` — client wrapper with dynamic title
- Create: `src/app/globals.css` — Tailwind directives + global styles
- Create: `src/app/layout.tsx` — root layout (html, body, font)

### Dashboard
- Create: `src/app/(main)/dashboard/page.tsx` — dashboard page
- Create: `src/components/shared/stats-card.tsx` — reusable stats card
- Create: `src/components/shared/book-card.tsx` — reusable book card
- Create: `src/app/api/dashboard/stats/route.ts` — platform-wide stats
- Create: `src/app/api/trending/route.ts` — trending content
- Create: `src/app/api/users/me/stats/route.ts` — user stats

### Tests
- Create: `__tests__/api/auth.test.ts` — auth API tests
- Create: `__tests__/api/dashboard.test.ts` — dashboard API tests
- Create: `jest.config.ts` — Jest config for Next.js
- Create: `jest.setup.ts` — test setup with Prisma mock

---

## Task 1: Next.js Project Initialization

**Files:**
- Modify: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`
- Modify: `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

Since the repo already has files, we'll set up Next.js manually rather than using `create-next-app`.

Run:
```bash
cd /Users/sharva/Workspaces/gyan-setu
npm install next@latest react@latest react-dom@latest typescript @types/node @types/react @types/react-dom
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from public datasets
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create tailwind.config.ts with Gyaan Setu design tokens**

```typescript
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1E293B",
        blue: {
          DEFAULT: "#3B82F6",
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        gold: "#F59E0B",
        green: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
        },
        red: {
          DEFAULT: "#EF4444",
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444",
          600: "#DC2626",
        },
        "light-gray": "#F3F4F6",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
```

- [ ] **Step 5: Create postcss.config.mjs**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Step 6: Create src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, Helvetica, sans-serif;
}
```

- [ ] **Step 7: Create src/app/layout.tsx (root layout)**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gyaan Setu — Knowledge City Digital Library",
  description: "AI-Driven Capital Knowledge City Digital Library Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create src/app/page.tsx (root redirect)**

```tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}
```

- [ ] **Step 9: Update package.json scripts**

Add to `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- [ ] **Step 10: Update .gitignore for Next.js**

Append to `.gitignore`:
```
# Next.js
.next/
out/

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 11: Install Tailwind and shadcn/ui dependencies**

Run:
```bash
npm install tailwindcss @tailwindcss/postcss autoprefixer tailwindcss-animate
npm install class-variance-authority clsx tailwind-merge lucide-react
```

- [ ] **Step 12: Create src/lib/utils.ts (shadcn utility)**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 13: Create components.json (shadcn/ui config)**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

- [ ] **Step 14: Verify Next.js starts**

Run:
```bash
npm run dev
```
Expected: Next.js dev server starts on http://localhost:3000, redirects to /dashboard (will 404 — that's fine, the route doesn't exist yet).

- [ ] **Step 15: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 15 project with TypeScript and Tailwind"
```

---

## Task 2: Docker PostgreSQL + Prisma Schema

**Files:**
- Create: `docker-compose.yml`
- Create: `.env`
- Create: `.env.example`
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`

- [ ] **Step 1: Create docker-compose.yml**

```yaml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: gyaansetu
      POSTGRES_PASSWORD: gyaansetu_dev
      POSTGRES_DB: gyaansetu
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

- [ ] **Step 2: Create .env**

```
DATABASE_URL="postgresql://gyaansetu:gyaansetu_dev@localhost:5432/gyaansetu"
SESSION_SECRET="gyaansetu-demo-secret-change-in-prod"
```

- [ ] **Step 3: Create .env.example**

```
DATABASE_URL="postgresql://gyaansetu:gyaansetu_dev@localhost:5432/gyaansetu"
SESSION_SECRET="your-secret-here"
```

- [ ] **Step 4: Start PostgreSQL**

Run:
```bash
docker compose up -d
```
Expected: PostgreSQL container starts on port 5432.

- [ ] **Step 5: Install Prisma**

Run:
```bash
npm install prisma --save-dev
npm install @prisma/client
```

- [ ] **Step 6: Create prisma/schema.prisma**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// === Enums ===

enum Role {
  CITIZEN
  STUDENT
  SENIOR
  CREATOR
  ADMIN
  OFFICIAL
}

enum Tier {
  BASIC
  STANDARD
  GOLD
}

enum RecordingStatus {
  DRAFT
  PUBLISHED
}

// === Auth & Users ===

model User {
  id             String   @id @default(cuid())
  name           String
  email          String   @unique
  passwordHash   String
  role           Role     @default(CITIZEN)
  membershipTier Tier     @default(BASIC)
  avatarUrl      String?
  streakDays     Int      @default(0)
  createdAt      DateTime @default(now())

  sessions          Session[]
  highlights        Highlight[]
  notes             Note[]
  readingProgress   ReadingProgress[]
  testAttempts      TestAttempt[]
  bookshelfItems    BookshelfItem[]
  podcastRecordings PodcastRecording[]
  podcastSeries     PodcastSeries[]
  userStats         UserStats?
  leaderboardEntry  LeaderboardEntry?
  certificates      Certificate[]
  readingActivity   ReadingActivity[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// === Content ===

model Book {
  id          String  @id @default(cuid())
  title       String
  author      String
  language    String
  format      String  // EPUB, PDF
  collection  String?
  year        Int?
  coverUrl    String?
  rating      Float   @default(0)
  description String?
  filePath    String?
  pageCount   Int     @default(0)

  highlights      Highlight[]
  notes           Note[]
  readingProgress ReadingProgress[]
  bookshelfItems  BookshelfItem[]
  bookSummary     BookSummary?
  mindMap         MindMap?
}

model Audiobook {
  id            String @id @default(cuid())
  title         String
  narrator      String?
  language      String
  coverUrl      String?
  totalDuration Int    // seconds
  chapters      Json   // [{title, startTime, duration}]
}

model Newspaper {
  id          String   @id @default(cuid())
  publication String
  edition     String?
  date        DateTime
  language    String
  city        String
  fileUrl     String   // relative path in public/datasets/newspapers/
}

model PodcastSeries {
  id              String  @id @default(cuid())
  name            String
  creatorId       String
  description     String?
  language        String
  subscriberCount Int     @default(0)
  coverUrl        String?

  creator    User               @relation(fields: [creatorId], references: [id])
  podcasts   Podcast[]
  recordings PodcastRecording[]
}

model Podcast {
  id          String    @id @default(cuid())
  title       String
  seriesId    String
  audioUrl    String
  duration    Int       // seconds
  publishedAt DateTime?

  series    PodcastSeries    @relation(fields: [seriesId], references: [id])
  recording PodcastRecording?
}

model Video {
  id           String  @id @default(cuid())
  title        String
  category     String
  youtubeUrl   String
  duration     Int     // seconds
  thumbnailUrl String?
  description  String?
}

model Manuscript {
  id          String  @id @default(cuid())
  title       String
  era         String  // VEDIC, MAURYAN, GUPTA, SOLANKI, MUGHAL, MODERN
  language    String
  description String?
  contentUrl  String?
  coverUrl    String?
}

model StemCourse {
  id           String  @id @default(cuid())
  title        String
  moduleNumber Int
  totalModules Int
  videoUrl     String
  description  String?
  category     String
}

model ExamCategory {
  id        String @id @default(cuid())
  name      String
  testCount Int    @default(0)
  userCount Int    @default(0)
  icon      String?

  tests Test[]
}

model Test {
  id              String @id @default(cuid())
  examCategoryId  String
  title           String
  durationMinutes Int
  totalQuestions  Int

  examCategory ExamCategory  @relation(fields: [examCategoryId], references: [id])
  questions    Question[]
  testAttempts TestAttempt[]
}

model Question {
  id              String  @id @default(cuid())
  testId          String
  text            String
  options         Json    // [{label: "A", text: "..."}]
  correctAnswer   String
  marks           Float   @default(1)
  negativeMarks   Float   @default(0)
  subject         String?
  isQuestionOfDay Boolean @default(false)

  test Test @relation(fields: [testId], references: [id])
}

model MembershipPlan {
  id        String  @id @default(cuid())
  name      String
  price     Int     // monthly INR, 0 for BASIC
  features  Json    // [feature strings]
  isPopular Boolean @default(false)
  tier      Tier
}

// === User Activity ===

model Highlight {
  id       String @id @default(cuid())
  userId   String
  bookId   String
  text     String
  position Json
  color    String @default("#F59E0B")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)
}

model Note {
  id       String @id @default(cuid())
  userId   String
  bookId   String
  text     String
  position Json

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)
}

model ReadingProgress {
  id          String   @id @default(cuid())
  userId      String
  bookId      String
  currentPage Int
  totalPages  Int
  updatedAt   DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@unique([userId, bookId])
}

model TestAttempt {
  id          String    @id @default(cuid())
  userId      String
  testId      String
  score       Float
  totalMarks  Float
  answers     Json
  startedAt   DateTime  @default(now())
  completedAt DateTime?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  test Test @relation(fields: [testId], references: [id])
}

model BookshelfItem {
  id     String @id @default(cuid())
  userId String
  bookId String

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@unique([userId, bookId])
}

model PodcastRecording {
  id        String          @id @default(cuid())
  userId    String
  title     String
  audioUrl  String?
  seriesId  String?
  podcastId String?         @unique
  status    RecordingStatus @default(DRAFT)
  createdAt DateTime        @default(now())

  user    User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  series  PodcastSeries? @relation(fields: [seriesId], references: [id])
  podcast Podcast?       @relation(fields: [podcastId], references: [id])
}

// === Pre-computed (seeded) ===

model UserStats {
  userId             String @id
  booksRead          Int    @default(0)
  audiobooksListened Int    @default(0)
  testsTaken         Int    @default(0)
  podcastHours       Float  @default(0)
  certificates       Int    @default(0)

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model TestPerformance {
  userId         String
  examCategoryId String
  readinessPct   Float
  avgScore       Float
  rank           Int
  subjectScores  Json

  @@id([userId, examCategoryId])
}

model LeaderboardEntry {
  userId     String @id
  xp         Int
  rank       Int
  badgeCount Int

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model TrendingContent {
  id          String @id @default(cuid())
  contentType String // BOOK, AUDIOBOOK, VIDEO, PODCAST — polymorphic, resolved at app level
  contentId   String
  title       String
  coverUrl    String?
  metric      String?
  position    Int
}

model Certificate {
  id       String   @id @default(cuid())
  userId   String
  name     String
  icon     String?
  earnedAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model ReadingActivity {
  id      String   @id @default(cuid())
  userId  String
  date    DateTime
  minutes Int

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, date])
}

// === AI Cache ===

model MindMap {
  id        String   @id @default(cuid())
  bookId    String   @unique
  content   Json
  createdAt DateTime @default(now())

  book Book @relation(fields: [bookId], references: [id])
}

model BookSummary {
  id          String   @id @default(cuid())
  bookId      String   @unique
  summaryText String
  createdAt   DateTime @default(now())

  book Book @relation(fields: [bookId], references: [id])
}
```

- [ ] **Step 7: Run initial migration**

Run:
```bash
npx prisma migrate dev --name init
```
Expected: Migration created and applied. All tables created in PostgreSQL.

- [ ] **Step 8: Create src/lib/prisma.ts**

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 9: Verify Prisma connects to DB**

Run:
```bash
npx prisma studio
```
Expected: Prisma Studio opens in browser showing all tables (empty). Close it after verifying.

- [ ] **Step 10: Commit**

```bash
git add docker-compose.yml .env.example prisma/ src/lib/prisma.ts
git commit -m "feat: add Docker PostgreSQL and Prisma schema with all models"
```

> Note: `.env` is in `.gitignore` and should NOT be committed.

---

## Task 3: Seed Script — Demo Accounts + Dashboard Data

**Files:**
- Create: `prisma/seed.ts`
- Modify: `package.json` (add prisma seed config)

- [ ] **Step 1: Install bcrypt for password hashing**

Run:
```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs tsx
```

- [ ] **Step 2: Create prisma/seed.ts**

```typescript
import { PrismaClient, Role, Tier } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.$transaction([
    prisma.readingActivity.deleteMany(),
    prisma.certificate.deleteMany(),
    prisma.trendingContent.deleteMany(),
    prisma.leaderboardEntry.deleteMany(),
    prisma.testPerformance.deleteMany(),
    prisma.userStats.deleteMany(),
    prisma.podcastRecording.deleteMany(),
    prisma.bookshelfItem.deleteMany(),
    prisma.testAttempt.deleteMany(),
    prisma.readingProgress.deleteMany(),
    prisma.note.deleteMany(),
    prisma.highlight.deleteMany(),
    prisma.bookSummary.deleteMany(),
    prisma.mindMap.deleteMany(),
    prisma.question.deleteMany(),
    prisma.test.deleteMany(),
    prisma.examCategory.deleteMany(),
    prisma.podcast.deleteMany(),
    prisma.podcastSeries.deleteMany(),
    prisma.membershipPlan.deleteMany(),
    prisma.stemCourse.deleteMany(),
    prisma.manuscript.deleteMany(),
    prisma.video.deleteMany(),
    prisma.newspaper.deleteMany(),
    prisma.audiobook.deleteMany(),
    prisma.book.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // === Users ===
  const passwordHash = await bcrypt.hash("demo123", 10);

  const rahul = await prisma.user.create({
    data: {
      name: "Rahul Sharma",
      email: "rahul@demo.com",
      passwordHash,
      role: Role.CITIZEN,
      membershipTier: Tier.STANDARD,
      avatarUrl: null,
      streakDays: 7,
    },
  });

  const mahesh = await prisma.user.create({
    data: {
      name: "Mahesh Joshi",
      email: "mahesh@demo.com",
      passwordHash,
      role: Role.CITIZEN,
      membershipTier: Tier.GOLD,
      avatarUrl: null,
      streakDays: 14,
    },
  });

  const priya = await prisma.user.create({
    data: {
      name: "Priya Patel",
      email: "priya@demo.com",
      passwordHash,
      role: Role.STUDENT,
      membershipTier: Tier.BASIC,
      avatarUrl: null,
      streakDays: 3,
    },
  });

  const teacher = await prisma.user.create({
    data: {
      name: "Meera Desai",
      email: "teacher@demo.com",
      passwordHash,
      role: Role.CREATOR,
      membershipTier: Tier.STANDARD,
      avatarUrl: null,
      streakDays: 21,
    },
  });

  // === Books (sample set for dashboard) ===
  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: "Saraswatichandra",
        author: "Govardhanram Tripathi",
        language: "Gujarati",
        format: "EPUB",
        collection: "Sahitya Akademi",
        year: 1887,
        coverUrl: "/datasets/covers/saraswatichandra.jpg",
        rating: 4.8,
        description: "A classic Gujarati novel exploring love, duty, and social reform in 19th century Gujarat.",
        pageCount: 300,
      },
    }),
    prisma.book.create({
      data: {
        title: "Bhavni Bhavai",
        author: "Pannalal Patel",
        language: "Gujarati",
        format: "EPUB",
        collection: "Sahitya Akademi",
        year: 1947,
        coverUrl: "/datasets/covers/bhavni-bhavai.jpg",
        rating: 4.5,
        description: "A powerful novel depicting the life of untouchables in rural Gujarat.",
        pageCount: 250,
      },
    }),
    prisma.book.create({
      data: {
        title: "Malela Jeev",
        author: "Pannalal Patel",
        language: "Gujarati",
        format: "EPUB",
        collection: "GMC Exclusive",
        year: 1941,
        coverUrl: "/datasets/covers/malela-jeev.jpg",
        rating: 4.3,
        description: "A story of love and sacrifice set in the tribal regions of Gujarat.",
        pageCount: 220,
      },
    }),
    prisma.book.create({
      data: {
        title: "Saurashtra Ni Rasdhar",
        author: "Jhaverchand Meghani",
        language: "Gujarati",
        format: "EPUB",
        collection: "Sahitya Akademi",
        year: 1923,
        coverUrl: "/datasets/covers/saurashtra-ni-rasdhar.jpg",
        rating: 4.7,
        description: "A collection of folk tales from the Saurashtra region of Gujarat.",
        pageCount: 350,
      },
    }),
    prisma.book.create({
      data: {
        title: "Atomic Habits",
        author: "James Clear",
        language: "English",
        format: "EPUB",
        year: 2018,
        coverUrl: "/datasets/covers/atomic-habits.jpg",
        rating: 4.9,
        description: "An easy and proven way to build good habits and break bad ones.",
        pageCount: 320,
      },
    }),
    prisma.book.create({
      data: {
        title: "The Power of Your Subconscious Mind",
        author: "Joseph Murphy",
        language: "English",
        format: "PDF",
        year: 1963,
        coverUrl: "/datasets/covers/subconscious-mind.jpg",
        rating: 4.4,
        description: "A classic self-help book on harnessing the power of your subconscious.",
        pageCount: 280,
      },
    }),
    prisma.book.create({
      data: {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        language: "English",
        format: "EPUB",
        year: 2020,
        coverUrl: "/datasets/covers/psychology-of-money.jpg",
        rating: 4.6,
        description: "Timeless lessons on wealth, greed, and happiness.",
        pageCount: 256,
      },
    }),
    prisma.book.create({
      data: {
        title: "Arthashastra",
        author: "Chanakya (Kautilya)",
        language: "Sanskrit",
        format: "PDF",
        collection: "University Granth",
        year: -300,
        coverUrl: "/datasets/covers/arthashastra.jpg",
        rating: 4.8,
        description: "Ancient Indian treatise on statecraft, economics, and military strategy.",
        pageCount: 500,
      },
    }),
  ]);

  // === User Stats ===
  // Note: The dashboard shows platform-wide stats (eBooks: 52,430) from /api/dashboard/stats
  // UserStats tracks personal metrics only
  await prisma.userStats.create({
    data: {
      userId: rahul.id,
      booksRead: 23,
      audiobooksListened: 12,
      testsTaken: 14,
      podcastHours: 128.5,
      certificates: 3,
    },
  });

  await prisma.userStats.create({
    data: {
      userId: mahesh.id,
      booksRead: 47,
      audiobooksListened: 12,
      testsTaken: 24,
      podcastHours: 8.5,
      certificates: 3,
    },
  });

  // === Trending Content ===
  const trendingBooks = [books[0], books[4], books[5], books[6], books[3], books[7], books[1], books[2]];
  for (let i = 0; i < trendingBooks.length; i++) {
    await prisma.trendingContent.create({
      data: {
        contentType: "BOOK",
        contentId: trendingBooks[i].id,
        title: trendingBooks[i].title,
        coverUrl: trendingBooks[i].coverUrl,
        metric: `${Math.floor(Math.random() * 5000 + 1000)} reads`,
        position: i + 1,
      },
    });
  }

  // === Reading Progress (Rahul is reading Saraswatichandra) ===
  await prisma.readingProgress.create({
    data: {
      userId: rahul.id,
      bookId: books[0].id, // Saraswatichandra
      currentPage: 45,
      totalPages: 300,
    },
  });

  await prisma.readingProgress.create({
    data: {
      userId: rahul.id,
      bookId: books[4].id, // Atomic Habits
      currentPage: 120,
      totalPages: 320,
    },
  });

  // === Bookshelf ===
  for (const book of books.slice(0, 5)) {
    await prisma.bookshelfItem.create({
      data: { userId: rahul.id, bookId: book.id },
    });
  }

  // === Membership Plans ===
  await prisma.membershipPlan.createMany({
    data: [
      {
        name: "BASIC",
        price: 0,
        tier: Tier.BASIC,
        isPopular: false,
        features: [
          "Digital Catalog Access",
          "5 eBook Downloads/month",
          "Newspaper Archive (7 days)",
        ],
      },
      {
        name: "STANDARD",
        price: 99,
        tier: Tier.STANDARD,
        isPopular: false,
        features: [
          "Unlimited Digital Reading",
          "Full Audiobook Library",
          "Full Newspaper Archive",
          "5 Mock Tests/month",
          "Basic AI Summaries",
        ],
      },
      {
        name: "GOLD",
        price: 199,
        tier: Tier.GOLD,
        isPopular: true,
        features: [
          "All Standard Features",
          "Unlimited Mock Tests & Analysis",
          "Full AI Summaries & Chat",
          "STEM Lab Premium Content",
          "Offline Mode",
          "Priority Support",
        ],
      },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 3: Add prisma seed config to package.json**

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "npx prisma db seed",
    "db:push": "npx prisma db push",
    "db:studio": "npx prisma studio",
    "db:reset": "npx prisma migrate reset"
  }
}
```

> Merge these scripts with the existing `dev`, `build`, `start`, `lint` scripts from Task 1.

- [ ] **Step 4: Run seed**

Run:
```bash
npx prisma db seed
```
Expected: "Seeding complete!" — 4 users, 8 books, trending content, user stats, reading progress, membership plans created.

- [ ] **Step 5: Verify seed data**

Run:
```bash
npx prisma studio
```
Expected: Prisma Studio shows populated tables. Check User (4 rows), Book (8 rows), TrendingContent (8 rows), UserStats (2 rows).

- [ ] **Step 6: Commit**

```bash
git add prisma/seed.ts package.json
git commit -m "feat: add seed script with demo accounts, books, and dashboard data"
```

---

## Task 4: Authentication — Login API + Session Middleware

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/middleware.ts`
- Create: `src/app/api/auth/login/route.ts`
- Create: `src/app/api/auth/logout/route.ts`
- Create: `src/app/api/auth/me/route.ts`

- [ ] **Step 1: Create src/lib/auth.ts**

> Simple DB session tokens with cookies — no JWT needed for a demo.

```typescript
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { randomBytes } from "crypto";

const SESSION_COOKIE = "gyaansetu_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const session = await prisma.session.create({
    data: { userId, token, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return session;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } });
    }
    return null;
  }

  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
    cookieStore.delete(SESSION_COOKIE);
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
```

- [ ] **Step 2: Create src/app/api/auth/login/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  await createSession(user.id);

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      membershipTier: user.membershipTier,
      avatarUrl: user.avatarUrl,
      streakDays: user.streakDays,
    },
  });
}
```

- [ ] **Step 3: Create src/app/api/auth/logout/route.ts**

```typescript
import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST() {
  await deleteSession();
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 4: Create src/app/api/auth/me/route.ts**

```typescript
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { user } = session;
  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      membershipTier: user.membershipTier,
      avatarUrl: user.avatarUrl,
      streakDays: user.streakDays,
    },
  });
}
```

- [ ] **Step 5: Create src/proxy.ts (Next.js 16 — replaces middleware.ts)**

```typescript
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/api/auth/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/datasets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check session cookie exists (actual validation happens in API/page)
  const sessionToken = request.cookies.get("gyaansetu_session")?.value;
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 6: Verify auth flow manually**

Run dev server:
```bash
npm run dev
```

Test login API:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rahul@demo.com","password":"demo123"}' \
  -c cookies.txt

curl http://localhost:3000/api/auth/me -b cookies.txt
```

Expected: Login returns user JSON. /me returns the same user.

- [ ] **Step 7: Commit**

```bash
git add src/lib/auth.ts src/proxy.ts src/app/api/auth/
git commit -m "feat: add cookie-based auth with login, logout, and route proxy"
```

---

## Task 5: Login Page UI

**Files:**
- Create: `src/app/(auth)/layout.tsx`
- Create: `src/app/(auth)/login/page.tsx`

- [ ] **Step 1: Install shadcn/ui button and input components**

Run:
```bash
npx shadcn@latest add button input card label
```

- [ ] **Step 2: Create src/app/(auth)/layout.tsx**

```tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create src/app/(auth)/login/page.tsx**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-blue-500">GYAAN SETU</h1>
        <p className="text-sm text-muted-foreground">
          Knowledge City Digital Library
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="rahul@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="demo123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mt-4">
              Demo accounts: rahul@demo.com, mahesh@demo.com, priya@demo.com, teacher@demo.com
              <br />
              Password: demo123
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 4: Verify login page**

Run dev server and open http://localhost:3000/login

Expected: Navy background, centered white card with Gyaan Setu branding, email/password fields, demo credentials hint. Login with rahul@demo.com / demo123 should redirect to /dashboard (will be empty for now).

- [ ] **Step 5: Commit**

```bash
git add src/app/\(auth\)/
git commit -m "feat: add login page with dark background and demo credentials"
```

---

## Task 6: App Shell — Sidebar + TopBar + Dynamic Title

**Files:**
- Create: `src/components/layout/sidebar.tsx`
- Create: `src/components/layout/topbar.tsx`
- Create: `src/components/layout/app-shell.tsx`
- Create: `src/app/(main)/layout.tsx`

- [ ] **Step 1: Install shadcn dependencies for sidebar**

Run:
```bash
npx shadcn@latest add separator avatar badge tooltip scroll-area
```

- [ ] **Step 2: Create src/components/layout/sidebar.tsx**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Headphones,
  Newspaper,
  GraduationCap,
  Mic,
  Landmark,
  FlaskConical,
  Video,
  BarChart3,
  CreditCard,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Digital Library", href: "/library", icon: BookOpen },
  { label: "Audiobooks", href: "/audiobooks", icon: Headphones },
  { label: "Periodicals", href: "/newspapers", icon: Newspaper },
  { label: "Test Prep Hub", href: "/test-prep", icon: GraduationCap },
  { label: "Podcast Studio", href: "/podcast-studio", icon: Mic },
  { label: "IKS Heritage", href: "/iks-heritage", icon: Landmark },
  { label: "STEM Lab", href: "/stem-lab", icon: FlaskConical },
  { label: "Video Library", href: "/video-library", icon: Video },
];

const accountNav = [
  { label: "My Analytics", href: "/profile", icon: BarChart3 },
  { label: "Membership", href: "/membership", icon: CreditCard },
];

interface SidebarProps {
  user: {
    name: string;
    membershipTier: string;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const tierColors: Record<string, string> = {
    BASIC: "text-gray-400",
    STANDARD: "text-blue-400",
    GOLD: "text-gold",
  };

  return (
    <aside className="w-[220px] bg-navy text-white flex flex-col h-screen flex-shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-700">
        <div className="text-lg font-bold text-blue-400">GYAAN SETU</div>
        <div className="text-xs text-slate-400">Knowledge City</div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="space-y-0.5 px-2">
          {mainNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-3 bg-slate-700 mx-4" />

        <div className="px-5 mb-1">
          <span className="text-[10px] uppercase tracking-wider text-slate-500">
            My Account
          </span>
        </div>
        <nav className="space-y-0.5 px-2">
          {accountNav.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User card */}
      <div className="px-4 py-3 border-t border-slate-700 flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-blue-500 text-white text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{user.name}</div>
          <div
            className={cn(
              "text-xs capitalize",
              tierColors[user.membershipTier] || "text-slate-400"
            )}
          >
            {user.membershipTier.toLowerCase()} Member
          </div>
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Create src/components/layout/topbar.tsx**

```tsx
"use client";

import { Search, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 gap-4 flex-shrink-0">
      <h1 className="text-base font-semibold text-navy">{title}</h1>

      <div className="flex-1 max-w-md ml-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search for books, exams, audiobooks..."
            className="pl-9 bg-slate-50 border-none h-9 text-sm"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Badge
          variant="secondary"
          className="cursor-pointer text-xs font-normal"
        >
          EN ▾
        </Badge>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Create src/components/layout/app-shell.tsx**

```tsx
"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/library": "Digital Library",
  "/audiobooks": "Audiobooks",
  "/newspapers": "Newspapers & Periodicals",
  "/test-prep": "Test Preparation Hub",
  "/podcast-studio": "Podcast Creation Studio",
  "/podcasts": "Podcasts",
  "/iks-heritage": "Indian Knowledge Systems",
  "/stem-lab": "STEM Innovation Lab",
  "/video-library": "Video Library",
  "/profile": "My Dashboard",
  "/membership": "Membership Plans",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  for (const [path, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(path)) return title;
  }
  return "Gyaan Setu";
}

interface AppShellProps {
  user: {
    name: string;
    membershipTier: string;
  };
  children: React.ReactNode;
}

export function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto bg-light-gray p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create src/app/(main)/layout.tsx**

```tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <AppShell
      user={{
        name: user.name,
        membershipTier: user.membershipTier,
      }}
    >
      {children}
    </AppShell>
  );
}
```

- [ ] **Step 6: Create src/app/(main)/loading.tsx**

```tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
}
```

- [ ] **Step 8: Create temporary dashboard placeholder**

Create `src/app/(main)/dashboard/page.tsx`:
```tsx
export default function DashboardPage() {
  return (
    <div className="text-center text-slate-500 mt-20">
      Dashboard content coming next...
    </div>
  );
}
```

- [ ] **Step 9: Verify app shell**

Run dev server. Login with rahul@demo.com / demo123.

Expected: Navy sidebar on left with all nav items and dynamic active state. Top bar shows "Dashboard" title, search bar, EN badge. Light gray content area. TopBar title should change when clicking different sidebar links (routes will 404 but title updates).

- [ ] **Step 10: Commit**

```bash
git add src/components/layout/ src/app/\(main\)/
git commit -m "feat: add app shell with sidebar, topbar, dynamic title, and main layout"
```

---

## Task 7: Dashboard API Routes

**Files:**
- Create: `src/app/api/dashboard/stats/route.ts`
- Create: `src/app/api/trending/route.ts`
- Create: `src/app/api/users/me/stats/route.ts`

- [ ] **Step 1: Create src/app/api/dashboard/stats/route.ts**

```typescript
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [bookCount, audiobookCount, testCount, videoCount] = await Promise.all([
    prisma.book.count(),
    prisma.audiobook.count(),
    prisma.test.count(),
    prisma.video.count(),
  ]);

  return NextResponse.json({
    totalBooks: bookCount,
    totalAudiobooks: audiobookCount,
    totalTests: testCount,
    totalVideos: videoCount,
  });
}
```

- [ ] **Step 2: Create src/app/api/trending/route.ts**

```typescript
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trending = await prisma.trendingContent.findMany({
    orderBy: { position: "asc" },
  });

  return NextResponse.json({ trending });
}
```

- [ ] **Step 3: Create src/app/api/users/me/stats/route.ts**

```typescript
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let user;
  try {
    user = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await prisma.userStats.findUnique({
    where: { userId: user.id },
  });

  if (!stats) {
    return NextResponse.json({
      booksRead: 0,
      audiobooksListened: 0,
      testsTaken: 0,
      podcastHours: 0,
      certificates: 0,
    });
  }

  return NextResponse.json(stats);
}
```

- [ ] **Step 4: Verify APIs with curl**

```bash
# Login first
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rahul@demo.com","password":"demo123"}' \
  -c cookies.txt

# Dashboard stats
curl http://localhost:3000/api/dashboard/stats -b cookies.txt

# User stats
curl http://localhost:3000/api/users/me/stats -b cookies.txt

# Trending
curl http://localhost:3000/api/trending -b cookies.txt
```

Expected: All return JSON with seeded data.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/dashboard/ src/app/api/trending/ src/app/api/users/
git commit -m "feat: add dashboard stats, trending, and user stats API routes"
```

---

## Task 8: Dashboard Page UI

**Files:**
- Create: `src/components/shared/stats-card.tsx`
- Create: `src/components/shared/book-card.tsx`
- Modify: `src/app/(main)/dashboard/page.tsx`

- [ ] **Step 1: Create src/components/shared/stats-card.tsx**

```tsx
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconColor?: string;
  iconBg?: string;
}

export function StatsCard({
  icon: Icon,
  value,
  label,
  iconColor = "text-blue-500",
  iconBg = "bg-blue-50",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
      <div
        className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center",
          iconBg
        )}
      >
        <Icon className={cn("h-5 w-5", iconColor)} />
      </div>
      <div>
        <div className="text-xl font-bold text-navy">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create src/components/shared/book-card.tsx**

```tsx
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface BookCardProps {
  title: string;
  author?: string;
  language?: string;
  coverUrl?: string | null;
  rating?: number;
  format?: string;
}

const LANG_CODES: Record<string, string> = {
  Gujarati: "GJ",
  Hindi: "HI",
  English: "EN",
  Sanskrit: "SA",
};

export function BookCard({
  title,
  author,
  language,
  coverUrl,
  rating,
  format,
}: BookCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {/* Cover */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="200px"
          />
        ) : (
          <span className="text-sm text-blue-300 font-medium text-center px-2">
            {title}
          </span>
        )}
        {/* Language badge */}
        {language && (
          <Badge className="absolute top-2 left-2 bg-navy text-white text-[10px] px-1.5 py-0.5">
            {LANG_CODES[language] || language.slice(0, 2).toUpperCase()}
          </Badge>
        )}
        {/* Format badge */}
        {format && (
          <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] px-1.5 py-0.5">
            {format}
          </Badge>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-navy truncate">{title}</h3>
        {author && (
          <p className="text-xs text-slate-500 truncate">{author}</p>
        )}
        {rating != null && rating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="text-xs text-slate-600">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update src/app/(main)/dashboard/page.tsx**

```tsx
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatsCard } from "@/components/shared/stats-card";
import { BookCard } from "@/components/shared/book-card";
import {
  BookOpen,
  Clock,
  FileCheck,
  Award,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  // Session is guaranteed by (main)/layout.tsx — no redundant check needed
  const session = await getSession();
  const user = session!.user;

  const [userStats, platformStats, trending, readingProgress] =
    await Promise.all([
      prisma.userStats.findUnique({ where: { userId: user.id } }),
      prisma.book.count(),
      prisma.trendingContent.findMany({ orderBy: { position: "asc" } }),
      prisma.readingProgress.findMany({
        where: { userId: user.id },
        include: { book: true },
        orderBy: { updatedAt: "desc" },
        take: 2,
      }),
    ]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold">
          Welcome Back, {user.name.split(" ")[0]}!
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Enhance your knowledge with AI-driven recommendations. You have{" "}
          {platformStats.toLocaleString()} books to explore!
        </p>
        {readingProgress.length > 0 && (
          <Link href={`/reader/${readingProgress[0].bookId}`}>
            <Button
              variant="secondary"
              size="sm"
              className="mt-3 bg-white text-blue-600 hover:bg-blue-50"
            >
              Continue Reading
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards — eBooks is platform-wide, rest are personal */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard
          icon={BookOpen}
          value={platformStats.toLocaleString()}
          label="eBooks"
          iconColor="text-blue-500"
          iconBg="bg-blue-50"
        />
        <StatsCard
          icon={Clock}
          value={userStats?.podcastHours ?? 0}
          label="Reading Hours"
          iconColor="text-green"
          iconBg="bg-green-50"
        />
        <StatsCard
          icon={FileCheck}
          value={userStats?.testsTaken ?? 0}
          label="Tests"
          iconColor="text-gold"
          iconBg="bg-amber-50"
        />
        <StatsCard
          icon={Award}
          value={userStats?.certificates ?? 0}
          label="Certificates"
          iconColor="text-red"
          iconBg="bg-red-50"
        />
      </div>

      {/* Trending Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red" />
            <h3 className="text-lg font-semibold text-navy">
              Trending in Gandhinagar
            </h3>
          </div>
          <Link href="/library">
            <Button variant="link" className="text-blue-500 text-sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {trending.map((item) => (
            <Link key={item.id} href={`/library/${item.contentId}`}>
              <BookCard
                title={item.title}
                coverUrl={item.coverUrl}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify dashboard page**

Run dev server. Login. Dashboard should show:
1. Blue gradient welcome banner with user name and "Continue Reading" button
2. Four stats cards (eBooks, Reading Hours, Tests, Certificates) with values from seed
3. "Trending in Gandhinagar" grid with book cards

Expected: Layout matches `slides/02-dashboard.png` — stats row, trending grid, sidebar nav, top bar.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/ src/app/\(main\)/dashboard/
git commit -m "feat: add dashboard page with stats cards, welcome banner, and trending grid"
```

---

## Task 9: Placeholder Pages for All Sidebar Routes

Create minimal placeholder pages so sidebar navigation works without 404s.

**Files:**
- Create: `src/app/(main)/library/page.tsx`
- Create: `src/app/(main)/audiobooks/page.tsx`
- Create: `src/app/(main)/newspapers/page.tsx`
- Create: `src/app/(main)/test-prep/page.tsx`
- Create: `src/app/(main)/podcast-studio/page.tsx`
- Create: `src/app/(main)/podcasts/page.tsx`
- Create: `src/app/(main)/iks-heritage/page.tsx`
- Create: `src/app/(main)/stem-lab/page.tsx`
- Create: `src/app/(main)/video-library/page.tsx`
- Create: `src/app/(main)/profile/page.tsx`
- Create: `src/app/(main)/membership/page.tsx`

- [ ] **Step 1: Create a placeholder component**

Create `src/components/shared/placeholder-page.tsx`:

```tsx
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({
  title,
  description = "This module will be implemented in an upcoming phase.",
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <Construction className="h-12 w-12 text-slate-300 mb-4" />
      <h2 className="text-xl font-semibold text-navy">{title}</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-md">{description}</p>
    </div>
  );
}
```

- [ ] **Step 2: Create all placeholder pages**

Each page follows this pattern — create all 11 files:

`src/app/(main)/library/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function LibraryPage() {
  return <PlaceholderPage title="Digital Library" />;
}
```

`src/app/(main)/audiobooks/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function AudiobooksPage() {
  return <PlaceholderPage title="Audiobooks" />;
}
```

`src/app/(main)/newspapers/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function NewspapersPage() {
  return <PlaceholderPage title="Newspapers & Periodicals" />;
}
```

`src/app/(main)/test-prep/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function TestPrepPage() {
  return <PlaceholderPage title="Test Preparation Hub" />;
}
```

`src/app/(main)/podcast-studio/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function PodcastStudioPage() {
  return <PlaceholderPage title="Podcast Creation Studio" />;
}
```

`src/app/(main)/iks-heritage/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function IKSHeritagePage() {
  return <PlaceholderPage title="Indian Knowledge Systems" />;
}
```

`src/app/(main)/stem-lab/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function StemLabPage() {
  return <PlaceholderPage title="STEM Innovation Lab" />;
}
```

`src/app/(main)/video-library/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function VideoLibraryPage() {
  return <PlaceholderPage title="Video Library" />;
}
```

`src/app/(main)/profile/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function ProfilePage() {
  return <PlaceholderPage title="My Dashboard" />;
}
```

`src/app/(main)/membership/page.tsx`:
```tsx
import { PlaceholderPage } from "@/components/shared/placeholder-page";
export default function MembershipPage() {
  return <PlaceholderPage title="Membership Plans" />;
}
```

- [ ] **Step 3: Verify all sidebar links work**

Run dev server. Click every sidebar item. Each should show the placeholder page with correct title in both the content area and the topbar.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/placeholder-page.tsx src/app/\(main\)/
git commit -m "feat: add placeholder pages for all sidebar routes"
```

---

## Task 10: Final Verification & Cleanup

- [ ] **Step 1: Full smoke test**

1. Start Docker: `docker compose up -d`
2. Run migrations: `npx prisma migrate dev`
3. Seed: `npx prisma db seed`
4. Start dev: `npm run dev`
5. Open http://localhost:3000 → should redirect to /login
6. Login with rahul@demo.com / demo123 → should redirect to /dashboard
7. Dashboard shows: welcome banner, 4 stats cards, trending grid
8. Click all sidebar items → each shows placeholder with correct title
9. TopBar title updates per route
10. Logout button works → returns to login

- [ ] **Step 2: Verify build succeeds**

Run:
```bash
npm run build
```
Expected: Build completes without errors.

- [ ] **Step 3: Commit any remaining changes**

```bash
git status
# If any uncommitted changes:
git add -A
git commit -m "chore: cleanup and verify Phase 1 build"
```

- [ ] **Step 4: Push to GitHub**

```bash
git push origin main
```

---

## Summary

**Phase 1 delivers:**
- Next.js 15 project with TypeScript, Tailwind CSS, shadcn/ui
- Docker PostgreSQL with full Prisma schema (all models for all 13 modules)
- Cookie-based auth with 4 seeded demo accounts
- App shell: navy sidebar (12 nav items) + dynamic topbar + light gray content area
- Login page with dark background
- Dashboard page: welcome banner, stats cards, trending grid (all from seeded DB)
- Placeholder pages for all 11 remaining sidebar routes
- All sidebar navigation functional

**Next phases (separate plans):**
- Phase 2: Digital Library + eBook Reader + AI Companion
- Phase 3: Audiobooks + Newspapers
- Phase 4: Test Prep + Mock Test
- Phase 5: Podcast Studio (full publish flow)
- Phase 6: IKS Heritage + STEM Lab + Video Library
- Phase 7: User Profile + Membership
