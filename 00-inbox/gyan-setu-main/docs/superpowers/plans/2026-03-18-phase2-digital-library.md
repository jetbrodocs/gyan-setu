# Phase 2: Digital Library + eBook Reader + AI Companion

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Digital Library catalog (browse, filter, search, book detail with AI summary/mind map/quiz tabs) and the eBook Reader (text rendering, TOC, highlights, notes, AI Reading Companion chatbot).

**Architecture:** Three new pages within the existing (main) layout. Digital Library uses server-side Prisma queries with client-side filter state. Book Detail page has tabs for Overview/Mind Map/Quiz. eBook Reader renders plain text with a custom reader component (not epub.js — our content is .txt files, not .epub). AI Reading Companion uses Claude API via server-side API routes.

**Tech Stack:** Next.js 16, Prisma, Claude API (Anthropic SDK), Recharts (for mind map placeholder)

**Spec:** `docs/superpowers/specs/2026-03-17-project-scaffolding-design.md`
**Visual References:** `slides/03-digital-library.png`, `slides/04-ebook-reader.png`, `slides/10-ai-book-summaries.png`

---

## File Map

### Digital Library
- Replace: `src/app/(main)/library/page.tsx` — catalog page with filters + book grid
- Create: `src/app/(main)/library/[bookId]/page.tsx` — book detail with tabs
- Create: `src/components/shared/filter-sidebar.tsx` — reusable checkbox filter sidebar
- Create: `src/app/api/books/route.ts` — GET books with filters
- Create: `src/app/api/books/[id]/route.ts` — GET single book
- Create: `src/app/api/books/[id]/summary/route.ts` — GET book summary
- Create: `src/app/api/books/[id]/mind-map/route.ts` — GET/generate mind map
- Create: `src/app/api/books/[id]/quiz/route.ts` — POST generate quiz

### eBook Reader
- Create: `src/app/(main)/reader/[bookId]/page.tsx` — reader page
- Create: `src/components/reader/book-reader.tsx` — main reader with text rendering
- Create: `src/components/reader/toc-sidebar.tsx` — table of contents sidebar
- Create: `src/components/reader/ai-companion.tsx` — AI chatbot panel
- Create: `src/components/reader/reading-toolbar.tsx` — highlight/note/font controls
- Create: `src/app/api/ai/companion/route.ts` — POST AI chat
- Create: `src/app/api/highlights/route.ts` — GET/POST highlights
- Create: `src/app/api/notes/route.ts` — GET/POST notes
- Create: `src/app/api/users/me/reading-progress/[bookId]/route.ts` — PATCH progress

### AI Integration
- Create: `src/lib/ai.ts` — Claude API helpers

---

## Task 1: Books API Routes

**Files:**
- Create: `src/app/api/books/route.ts`
- Create: `src/app/api/books/[id]/route.ts`

- [ ] **Step 1: Create `src/app/api/books/route.ts`**

GET /api/books with query params: language, format, collection, year, sort, search

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const language = searchParams.get("language");
  const format = searchParams.get("format");
  const collection = searchParams.get("collection");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "rating";

  const where: Prisma.BookWhereInput = {};

  if (language) {
    where.language = { in: language.split(",") };
  }
  if (format) {
    where.format = { in: format.split(",") };
  }
  if (collection) {
    where.collection = { in: collection.split(",") };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy: Prisma.BookOrderByWithRelationInput =
    sort === "year" ? { year: "desc" } : { rating: "desc" };

  const books = await prisma.book.findMany({ where, orderBy });

  // Get distinct values for filter options
  const [languages, formats, collections] = await Promise.all([
    prisma.book.findMany({ select: { language: true }, distinct: ["language"] }),
    prisma.book.findMany({ select: { format: true }, distinct: ["format"] }),
    prisma.book.findMany({
      select: { collection: true },
      distinct: ["collection"],
      where: { collection: { not: null } },
    }),
  ]);

  return NextResponse.json({
    books,
    filters: {
      languages: languages.map((l) => l.language),
      formats: formats.map((f) => f.format),
      collections: collections.map((c) => c.collection).filter(Boolean),
    },
  });
}
```

- [ ] **Step 2: Create `src/app/api/books/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      bookSummary: true,
      mindMap: true,
    },
  });

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ book });
}
```

- [ ] **Step 3: Verify APIs**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rahul@demo.com","password":"demo123"}' -c /tmp/c.txt

curl "http://localhost:3000/api/books?language=Gujarati" -b /tmp/c.txt
curl "http://localhost:3000/api/books/BOOK_ID_HERE" -b /tmp/c.txt
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/books/
git commit -m "feat: add books API with filters, search, and single book endpoint"
```

---

## Task 2: Digital Library Catalog Page

**Files:**
- Create: `src/components/shared/filter-sidebar.tsx`
- Replace: `src/app/(main)/library/page.tsx`

- [ ] **Step 1: Create `src/components/shared/filter-sidebar.tsx`**

Reusable filter sidebar with checkbox groups. Matches slide 03 layout — left panel with Language, Format, Collection checkboxes and Year range inputs.

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterGroup {
  label: string;
  key: string;
  options: string[];
  counts?: Record<string, number>;
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
  onReset: () => void;
}

export function FilterSidebar({
  groups,
  selected,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  function toggleValue(key: string, value: string) {
    const current = selected[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(key, next);
  }

  return (
    <div className="w-[200px] flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-navy">Filters</h3>
        <Button
          variant="link"
          size="sm"
          onClick={onReset}
          className="text-blue-500 text-xs h-auto p-0"
        >
          Reset All
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.key}>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {group.label}
              </h4>
              <div className="space-y-2">
                {group.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
                  >
                    <Checkbox
                      checked={(selected[group.key] || []).includes(option)}
                      onCheckedChange={() => toggleValue(group.key, option)}
                    />
                    <span className="flex-1">{option}</span>
                    {group.counts?.[option] != null && (
                      <span className="text-xs text-slate-400">
                        {group.counts[option]}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
```

- [ ] **Step 2: Install Checkbox component**

```bash
npx shadcn@latest add checkbox
```

- [ ] **Step 3: Replace `src/app/(main)/library/page.tsx`**

Client component that fetches books from API with filter state. Layout: filter sidebar (left) + book grid (right), matching slide 03.

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { BookCard } from "@/components/shared/book-card";
import { FilterSidebar } from "@/components/shared/filter-sidebar";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  language: string;
  format: string;
  collection: string | null;
  year: number | null;
  coverUrl: string | null;
  rating: number;
  description: string | null;
  pageCount: number;
}

interface Filters {
  languages: string[];
  formats: string[];
  collections: string[];
}

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState<Filters>({
    languages: [],
    formats: [],
    collections: [],
  });
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating");
  const [loading, setLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selected.language?.length) params.set("language", selected.language.join(","));
    if (selected.format?.length) params.set("format", selected.format.join(","));
    if (selected.collection?.length) params.set("collection", selected.collection.join(","));
    if (search) params.set("search", search);
    params.set("sort", sort);

    const res = await fetch(`/api/books?${params}`);
    const data = await res.json();
    setBooks(data.books);
    if (data.filters) setFilters(data.filters);
    setLoading(false);
  }, [selected, search, sort]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filterGroups = [
    { label: "Language", key: "language", options: filters.languages },
    { label: "Format", key: "format", options: filters.formats },
    { label: "Collection", key: "collection", options: filters.collections },
  ];

  return (
    <div className="flex gap-6">
      <FilterSidebar
        groups={filterGroups}
        selected={selected}
        onFilterChange={(key, values) =>
          setSelected((prev) => ({ ...prev, [key]: values }))
        }
        onReset={() => setSelected({})}
      />

      <div className="flex-1 min-w-0">
        {/* Sort & count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            {books.length} book{books.length !== 1 ? "s" : ""}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-slate-200 rounded-md px-2 py-1 bg-white text-slate-700"
          >
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>

        {/* Book grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <Link key={book.id} href={`/library/${book.id}`}>
                <BookCard
                  title={book.title}
                  author={book.author}
                  language={book.language}
                  coverUrl={book.coverUrl}
                  rating={book.rating}
                  format={book.format}
                />
              </Link>
            ))}
          </div>
        )}

        {!loading && books.length === 0 && (
          <div className="text-center text-slate-400 mt-20">
            No books match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify catalog page**

Run dev server, login, navigate to Digital Library. Should see filter sidebar on left, book grid on right with all 27 books. Filter by language (e.g., Gujarati) should show only 8.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/filter-sidebar.tsx src/app/\(main\)/library/page.tsx src/components/ui/
git commit -m "feat: add Digital Library catalog with filters, search, and book grid"
```

---

## Task 3: Book Detail / Summary Page

**Files:**
- Create: `src/app/(main)/library/[bookId]/page.tsx`
- Create: `src/app/api/books/[id]/summary/route.ts`

This is the page shown in slide 10 — book info on the left, tabbed content (Overview/Mind Map/Quiz) on the right. For now, we build Overview tab with pre-seeded summary data. Mind Map and Quiz (AI-powered) come in Tasks 5-6.

- [ ] **Step 1: Add book summaries to seed data**

Create `prisma/data/summaries.ts` with pre-written summaries for all books that have text files (12 books):

```typescript
export const summariesData: Record<string, string> = {
  "Saraswatichandra": "Saraswatichandra is a monumental four-volume novel by Govardhanram Madhavram Tripathi, first published between 1887 and 1901. Set in 19th-century Gujarat, it explores the tension between tradition and modernity through the story of Saraswatichandra, an idealistic young man, and Kumud, a devoted wife trapped in an unhappy marriage. The novel weaves together themes of social reform, duty, love, and philosophical inquiry, offering a panoramic view of Gujarati society during the colonial era. It is considered one of the greatest works of Gujarati literature and has been adapted into films and television series.",
  // ... add entries for each book with filePath
};
```

Actually, for the demo we can generate summaries from the text files. But to keep things simple, let the seed script create summaries using the book descriptions as a starting point — we already have good descriptions in `prisma/data/books.ts`.

Update `prisma/seed.ts` to create BookSummary entries for all books that have a filePath:

```typescript
// After creating books, create summaries for books with text files
for (const book of books) {
  if (book.filePath) {
    await prisma.bookSummary.create({
      data: {
        bookId: book.id,
        summaryText: book.description || `Summary of ${book.title} by ${book.author}.`,
      },
    });
  }
}
```

- [ ] **Step 2: Create `src/app/api/books/[id]/summary/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const summary = await prisma.bookSummary.findUnique({
    where: { bookId: id },
  });

  if (!summary) {
    return NextResponse.json({ error: "Summary not found" }, { status: 404 });
  }

  return NextResponse.json({ summary });
}
```

- [ ] **Step 3: Create `src/app/(main)/library/[bookId]/page.tsx`**

Server component that shows book detail with tabs. Matches slide 10 layout.

```tsx
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Calendar, FileText, Layers } from "lucide-react";
import { BookDetailTabs } from "./tabs";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const session = await getSession();
  if (!session) notFound();

  const { bookId } = await params;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { bookSummary: true, mindMap: true },
  });

  if (!book) notFound();

  const LANG_CODES: Record<string, string> = {
    Gujarati: "GJ", Hindi: "HI", English: "EN", Sanskrit: "SA",
  };

  return (
    <div className="flex gap-8">
      {/* Left: Book info */}
      <div className="w-[280px] flex-shrink-0">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 mb-4">
          {book.coverUrl ? (
            <Image src={book.coverUrl} alt={book.title} fill className="object-cover" sizes="280px" />
          ) : (
            <div className="flex items-center justify-center h-full text-blue-300 font-medium px-4 text-center">
              {book.title}
            </div>
          )}
        </div>
        <h1 className="text-xl font-bold text-navy">{book.title}</h1>
        <p className="text-sm text-slate-500 mt-1">by {book.author}</p>

        <div className="flex items-center gap-2 mt-3">
          <Badge className="bg-navy text-white text-xs">
            {LANG_CODES[book.language] || book.language}
          </Badge>
          <Badge variant="secondary" className="text-xs">{book.format}</Badge>
          {book.collection && (
            <Badge variant="outline" className="text-xs">{book.collection}</Badge>
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {book.rating.toFixed(1)}
          </span>
          {book.year && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {book.year > 0 ? book.year : `${Math.abs(book.year)} BCE`}
            </span>
          )}
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            {book.pageCount} pages
          </span>
        </div>

        {book.filePath && (
          <Link href={`/reader/${book.id}`}>
            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Read Now
            </Button>
          </Link>
        )}
      </div>

      {/* Right: Tabs content */}
      <div className="flex-1 min-w-0">
        <BookDetailTabs
          bookId={book.id}
          summary={book.bookSummary?.summaryText || null}
          mindMap={book.mindMap?.content || null}
          hasTextFile={!!book.filePath}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/app/(main)/library/[bookId]/tabs.tsx`**

Client component with Overview/Mind Map/Quiz tabs.

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, Network, HelpCircle } from "lucide-react";

interface BookDetailTabsProps {
  bookId: string;
  summary: string | null;
  mindMap: unknown | null;
  hasTextFile: boolean;
}

const TABS = [
  { key: "overview", label: "Overview", icon: FileText },
  { key: "mindmap", label: "Mind Map", icon: Network },
  { key: "quiz", label: "Quiz", icon: HelpCircle },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function BookDetailTabs({
  bookId,
  summary,
  mindMap,
  hasTextFile,
}: BookDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-slate-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.key
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="prose prose-slate max-w-none">
          {summary ? (
            <>
              <h3 className="text-lg font-semibold text-navy mb-3">Overview</h3>
              <p className="text-slate-600 leading-relaxed">{summary}</p>
            </>
          ) : (
            <p className="text-slate-400">No summary available for this book.</p>
          )}
        </div>
      )}

      {activeTab === "mindmap" && (
        <div className="text-center py-12">
          <Network className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            {hasTextFile
              ? "Click to generate a mind map using AI (coming soon)"
              : "Mind map not available for this book"}
          </p>
        </div>
      )}

      {activeTab === "quiz" && (
        <div className="text-center py-12">
          <HelpCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            {hasTextFile
              ? "Click to generate a quiz using AI (coming soon)"
              : "Quiz not available for this book"}
          </p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Update seed to create book summaries**

Add to `prisma/seed.ts` after the books creation loop:

```typescript
// === Book Summaries (for books with text files) ===
for (const book of books) {
  if (book.filePath && book.description) {
    await prisma.bookSummary.create({
      data: {
        bookId: book.id,
        summaryText: book.description,
      },
    });
  }
}
```

- [ ] **Step 6: Re-seed and verify**

```bash
npx prisma db seed
```

Navigate to Digital Library → click any book → should see book detail page with cover, info, Overview tab with summary text, Mind Map and Quiz tabs as placeholders.

- [ ] **Step 7: Commit**

```bash
git add src/app/\(main\)/library/ src/app/api/books/ prisma/seed.ts
git commit -m "feat: add book detail page with overview, mind map, and quiz tabs"
```

---

## Task 4: eBook Reader — Text Rendering + TOC

**Files:**
- Create: `src/app/(main)/reader/[bookId]/page.tsx`
- Create: `src/components/reader/book-reader.tsx`
- Create: `src/components/reader/toc-sidebar.tsx`

The reader renders plain text files (not EPUB). We parse chapters from the text content (split by "Chapter" or "---" markers). Layout matches slide 04: TOC left, text center, AI companion right (Task 5).

- [ ] **Step 1: Create `src/lib/book-parser.ts`**

Utility to parse text files into chapters:

```typescript
export interface Chapter {
  id: string;
  title: string;
  content: string;
}

export function parseBookText(text: string): Chapter[] {
  // Split by chapter headings (various patterns)
  const chapterRegex = /^(Chapter\s+\d+[:\.]?\s*.*|CHAPTER\s+\d+[:\.]?\s*.*|={3,}.*={3,})$/gm;
  const lines = text.split("\n");
  const chapters: Chapter[] = [];
  let currentTitle = "Introduction";
  let currentContent: string[] = [];
  let chapterIndex = 0;

  for (const line of lines) {
    if (chapterRegex.test(line.trim())) {
      // Save previous chapter
      if (currentContent.length > 0 || chapterIndex > 0) {
        chapters.push({
          id: `ch-${chapterIndex}`,
          title: currentTitle,
          content: currentContent.join("\n").trim(),
        });
        chapterIndex++;
      }
      currentTitle = line.trim().replace(/^(Chapter\s+\d+[:\.]?\s*)/i, "Chapter " + (chapterIndex + 1) + ": ");
      currentContent = [];
      // Reset regex lastIndex
      chapterRegex.lastIndex = 0;
    } else {
      currentContent.push(line);
    }
    // Reset regex lastIndex for next iteration
    chapterRegex.lastIndex = 0;
  }

  // Push last chapter
  if (currentContent.length > 0) {
    chapters.push({
      id: `ch-${chapterIndex}`,
      title: currentTitle,
      content: currentContent.join("\n").trim(),
    });
  }

  // If no chapters found, treat entire text as one chapter
  if (chapters.length === 0) {
    chapters.push({
      id: "ch-0",
      title: "Full Text",
      content: text.trim(),
    });
  }

  return chapters;
}
```

- [ ] **Step 2: Create `src/components/reader/toc-sidebar.tsx`**

```tsx
"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";
import type { Chapter } from "@/lib/book-parser";

interface TocSidebarProps {
  chapters: Chapter[];
  activeChapterId: string;
  onChapterSelect: (id: string) => void;
  bookTitle: string;
  author: string;
}

export function TocSidebar({
  chapters,
  activeChapterId,
  onChapterSelect,
  bookTitle,
  author,
}: TocSidebarProps) {
  return (
    <div className="w-[240px] bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-4 w-4 text-blue-500" />
          <h2 className="text-sm font-semibold text-navy truncate">{bookTitle}</h2>
        </div>
        <p className="text-xs text-slate-400 truncate">{author}</p>
      </div>

      <div className="px-4 py-2 border-b border-slate-100">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Table of Contents
        </h3>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => onChapterSelect(chapter.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                activeChapterId === chapter.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {chapter.title}
            </button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/reader/book-reader.tsx`**

Main reader component that displays chapter text:

```tsx
"use client";

import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Chapter } from "@/lib/book-parser";

interface BookReaderProps {
  chapter: Chapter;
  fontSize: number;
}

export function BookReader({ chapter, fontSize }: BookReaderProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [chapter.id]);

  return (
    <ScrollArea className="flex-1 h-full" ref={contentRef}>
      <div className="max-w-2xl mx-auto px-8 py-6">
        <h2 className="text-2xl font-bold text-navy mb-6">{chapter.title}</h2>
        <div
          className="text-slate-700 leading-relaxed whitespace-pre-wrap"
          style={{ fontSize: `${fontSize}px` }}
        >
          {chapter.content}
        </div>
      </div>
    </ScrollArea>
  );
}
```

- [ ] **Step 4: Create `src/app/(main)/reader/[bookId]/page.tsx`**

Server component that loads book text and passes to client reader:

```tsx
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseBookText } from "@/lib/book-parser";
import { promises as fs } from "fs";
import path from "path";
import { ReaderClient } from "./reader-client";

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const session = await getSession();
  if (!session) notFound();

  const { bookId } = await params;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book || !book.filePath) notFound();

  // Read text file from public directory
  const filePath = path.join(process.cwd(), "public", book.filePath);
  let text: string;
  try {
    text = await fs.readFile(filePath, "utf-8");
  } catch {
    notFound();
  }

  const chapters = parseBookText(text);

  // Get user's reading progress
  const progress = await prisma.readingProgress.findUnique({
    where: {
      userId_bookId: {
        userId: session.user.id,
        bookId: book.id,
      },
    },
  });

  return (
    <ReaderClient
      book={{
        id: book.id,
        title: book.title,
        author: book.author,
        pageCount: book.pageCount,
      }}
      chapters={chapters}
      initialChapterIndex={progress ? Math.floor((progress.currentPage / progress.totalPages) * chapters.length) : 0}
    />
  );
}
```

- [ ] **Step 5: Create `src/app/(main)/reader/[bookId]/reader-client.tsx`**

Client wrapper that manages reader state:

```tsx
"use client";

import { useState } from "react";
import { TocSidebar } from "@/components/reader/toc-sidebar";
import { BookReader } from "@/components/reader/book-reader";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import type { Chapter } from "@/lib/book-parser";

interface ReaderClientProps {
  book: { id: string; title: string; author: string; pageCount: number };
  chapters: Chapter[];
  initialChapterIndex: number;
}

export function ReaderClient({ book, chapters, initialChapterIndex }: ReaderClientProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(initialChapterIndex);
  const [fontSize, setFontSize] = useState(16);
  const [tocOpen, setTocOpen] = useState(true);

  const activeChapter = chapters[activeChapterIndex];
  const progress = chapters.length > 0 ? Math.round(((activeChapterIndex + 1) / chapters.length) * 100) : 0;

  return (
    <div className="flex h-[calc(100vh-3.5rem)] -m-6 bg-white">
      {/* TOC Sidebar */}
      {tocOpen && (
        <TocSidebar
          chapters={chapters}
          activeChapterId={activeChapter.id}
          onChapterSelect={(id) => {
            const idx = chapters.findIndex((c) => c.id === id);
            if (idx >= 0) setActiveChapterIndex(idx);
          }}
          bookTitle={book.title}
          author={book.author}
        />
      )}

      {/* Main reading area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Reader toolbar */}
        <div className="h-10 border-b border-slate-200 flex items-center px-4 gap-2 flex-shrink-0 bg-slate-50">
          <Link href={`/library/${book.id}`}>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-500">
              <ChevronLeft className="h-3 w-3 mr-1" />
              Back
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setTocOpen(!tocOpen)}
          >
            TOC
          </Button>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setFontSize((s) => Math.max(12, s - 2))}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-xs text-slate-400 w-8 text-center">{fontSize}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setFontSize((s) => Math.min(24, s + 2))}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Book content */}
        <BookReader chapter={activeChapter} fontSize={fontSize} />

        {/* Bottom progress bar */}
        <div className="h-8 border-t border-slate-200 flex items-center px-4 gap-3 flex-shrink-0 bg-slate-50">
          <span className="text-xs text-slate-400">
            Chapter {activeChapterIndex + 1} of {chapters.length}
          </span>
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-slate-400">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create reader layout to remove padding**

Create `src/app/(main)/reader/[bookId]/layout.tsx`:

Note: The reader uses `-m-6` to counteract the main layout's `p-6`. This is intentional so the reader fills the full content area.

- [ ] **Step 7: Verify reader**

Navigate to Digital Library → click a book with text (e.g., Saraswatichandra) → click "Read Now" → should see TOC on left, chapter text in center, progress bar at bottom.

- [ ] **Step 8: Commit**

```bash
git add src/lib/book-parser.ts src/components/reader/ src/app/\(main\)/reader/
git commit -m "feat: add eBook reader with TOC, chapter navigation, and font controls"
```

---

## Task 5: AI Reading Companion

**Files:**
- Create: `src/lib/ai.ts`
- Create: `src/app/api/ai/companion/route.ts`
- Create: `src/components/reader/ai-companion.tsx`
- Modify: `src/app/(main)/reader/[bookId]/reader-client.tsx`

- [ ] **Step 1: Install Anthropic SDK**

```bash
npm install @anthropic-ai/sdk
```

Add to `.env`:
```
ANTHROPIC_API_KEY="your-key-here"
```

Add to `.env.example`:
```
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

- [ ] **Step 2: Create `src/lib/ai.ts`**

```typescript
import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function getAnthropicClient() {
  if (!client) {
    client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return client;
}
```

- [ ] **Step 3: Create `src/app/api/ai/companion/route.ts`**

POST endpoint that takes a message + book context and returns AI response:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAnthropicClient } from "@/lib/ai";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message, bookId, chapterContent } = await request.json();

  if (!message || !bookId) {
    return NextResponse.json({ error: "Message and bookId required" }, { status: 400 });
  }

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const anthropic = getAnthropicClient();

  // Use chapter content if provided, otherwise try to read full text
  let context = chapterContent || "";
  if (!context && book.filePath) {
    try {
      const filePath = path.join(process.cwd(), "public", book.filePath);
      const fullText = await fs.readFile(filePath, "utf-8");
      // Limit context to avoid token overflow
      context = fullText.slice(0, 8000);
    } catch {
      context = book.description || "";
    }
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are an AI Reading Companion for "${book.title}" by ${book.author}. You help readers understand the book by answering questions, explaining passages, translating text, and providing context. Be concise and helpful. If asked to translate, translate the passage to the requested language. Here is the current reading context:\n\n${context}`,
      messages: [{ role: "user", content: message }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("AI Companion error:", error);
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
```

- [ ] **Step 4: Create `src/components/reader/ai-companion.tsx`**

Chat panel for the right side of the reader:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiCompanionProps {
  bookId: string;
  bookTitle: string;
  chapterContent: string;
}

export function AiCompanion({ bookId, bookTitle, chapterContent }: AiCompanionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI Reading Companion for "${bookTitle}". Ask me anything about the book — I can explain passages, answer questions, or translate text.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          bookId,
          chapterContent: chapterContent.slice(0, 4000),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || data.error || "Sorry, I couldn't process that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm temporarily unavailable. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[300px] border-l border-slate-200 flex flex-col h-full bg-white flex-shrink-0">
      {/* Header */}
      <div className="p-3 border-b border-slate-200 flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-navy">AI Reading Companion</h3>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3" ref={scrollRef}>
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="h-3 w-3 text-blue-600" />
                </div>
              )}
              <div
                className={`rounded-lg px-3 py-2 text-sm max-w-[220px] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="h-3 w-3 text-slate-600" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-3 w-3 text-blue-600" />
              </div>
              <div className="bg-slate-100 rounded-lg px-3 py-2 text-sm text-slate-400">
                Thinking...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this book..."
            className="text-sm h-8 bg-slate-50 border-slate-200"
            disabled={loading}
          />
          <Button type="submit" size="icon" className="h-8 w-8 bg-blue-500 hover:bg-blue-600" disabled={loading}>
            <Send className="h-3 w-3" />
          </Button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Update reader-client.tsx to include AI companion**

Add the AiCompanion panel to the right side of the reader layout. Add a toggle button for showing/hiding it.

In `reader-client.tsx`, add state `const [companionOpen, setCompanionOpen] = useState(true);` and add the companion panel after the main reading area div, inside the flex container:

```tsx
{companionOpen && (
  <AiCompanion
    bookId={book.id}
    bookTitle={book.title}
    chapterContent={activeChapter.content}
  />
)}
```

Add a toggle button in the toolbar.

- [ ] **Step 6: Verify AI companion**

This requires a valid ANTHROPIC_API_KEY in `.env`. If not available, the companion should gracefully show "AI service temporarily unavailable".

- [ ] **Step 7: Commit**

```bash
git add src/lib/ai.ts src/app/api/ai/ src/components/reader/ai-companion.tsx src/app/\(main\)/reader/ .env.example
git commit -m "feat: add AI Reading Companion with Claude API integration"
```

---

## Task 6: Highlights & Notes API + Reading Progress

**Files:**
- Create: `src/app/api/highlights/route.ts`
- Create: `src/app/api/notes/route.ts`
- Create: `src/app/api/users/me/reading-progress/[bookId]/route.ts`

- [ ] **Step 1: Create highlights API**

```typescript
// src/app/api/highlights/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  let user;
  try { user = await requireAuth(); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookId = request.nextUrl.searchParams.get("bookId");
  if (!bookId) return NextResponse.json({ error: "bookId required" }, { status: 400 });

  const highlights = await prisma.highlight.findMany({
    where: { userId: user.id, bookId },
  });
  return NextResponse.json({ highlights });
}

export async function POST(request: NextRequest) {
  let user;
  try { user = await requireAuth(); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookId, text, position, color } = await request.json();
  const highlight = await prisma.highlight.create({
    data: { userId: user.id, bookId, text, position, color },
  });
  return NextResponse.json({ highlight });
}
```

- [ ] **Step 2: Create notes API**

Similar to highlights. `src/app/api/notes/route.ts`.

- [ ] **Step 3: Create reading progress API**

```typescript
// src/app/api/users/me/reading-progress/[bookId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  let user;
  try { user = await requireAuth(); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookId } = await params;
  const { currentPage, totalPages } = await request.json();

  const progress = await prisma.readingProgress.upsert({
    where: { userId_bookId: { userId: user.id, bookId } },
    update: { currentPage, totalPages },
    create: { userId: user.id, bookId, currentPage, totalPages },
  });

  return NextResponse.json({ progress });
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/highlights/ src/app/api/notes/ src/app/api/users/
git commit -m "feat: add highlights, notes, and reading progress APIs"
```

---

## Task 7: Deploy + Final Verification

- [ ] **Step 1: Verify all pages locally**

1. Login → Dashboard shows 25 books in trending
2. Digital Library → filter sidebar works, book grid shows all books, filters reduce results
3. Click book → Book detail with cover, info, Overview tab shows summary
4. Click "Read Now" → Reader with TOC, chapter text, font controls, progress bar
5. AI Companion panel on right (works if API key set, graceful error if not)

- [ ] **Step 2: Build check**

```bash
npm run build
```

- [ ] **Step 3: Commit any remaining changes**

```bash
git add -A
git commit -m "chore: Phase 2 cleanup and verification"
```

- [ ] **Step 4: Deploy to Fly.io**

```bash
fly deploy --app gyan-setu
```

- [ ] **Step 5: Re-seed Fly database**

```bash
curl -s -o /dev/null https://gyan-setu.fly.dev/login
fly ssh console --app gyan-setu -C "npx tsx prisma/seed.ts"
```

- [ ] **Step 6: Push to GitHub**

```bash
git push origin main
```

---

## Summary

**Phase 2 delivers:**
- Digital Library catalog with filter sidebar (Language, Format, Collection) + book grid
- Book detail page with Overview/Mind Map/Quiz tabs (Mind Map + Quiz are placeholders for now)
- eBook Reader with TOC sidebar, chapter navigation, font size controls, progress bar
- AI Reading Companion chatbot (Claude API) integrated in reader
- Highlights, Notes, and Reading Progress APIs
- All 27 books browseable and 12 readable
