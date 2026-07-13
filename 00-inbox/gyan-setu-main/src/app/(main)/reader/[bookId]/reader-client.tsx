"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  List,
  Minus,
  Plus,
  MessageSquare,
} from "lucide-react";
import type { Chapter } from "@/lib/book-parser";
import { TocSidebar } from "@/components/reader/toc-sidebar";
import { BookReader } from "@/components/reader/book-reader";
import { AiCompanion } from "@/components/reader/ai-companion";

interface ReaderClientProps {
  bookId: string;
  bookTitle: string;
  author: string;
  chapters: Chapter[];
  initialChapterIndex: number;
}

export function ReaderClient({
  bookId,
  bookTitle,
  author,
  chapters,
  initialChapterIndex,
}: ReaderClientProps) {
  const [activeChapterIndex, setActiveChapterIndex] =
    useState(initialChapterIndex);
  const [fontSize, setFontSize] = useState(16);
  const [tocOpen, setTocOpen] = useState(true);
  const [companionOpen, setCompanionOpen] = useState(true);

  const activeChapter = chapters[activeChapterIndex];
  const progressPercent = Math.round(
    ((activeChapterIndex + 1) / chapters.length) * 100
  );

  return (
    <div className="-m-6 bg-white flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      {/* Top toolbar */}
      <div className="h-10 shrink-0 flex items-center gap-2 px-3 border-b border-slate-200 bg-white">
        <Link
          href={`/library/${bookId}`}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        <button
          onClick={() => setTocOpen(!tocOpen)}
          className={`p-1.5 rounded transition-colors ${
            tocOpen
              ? "bg-blue-50 text-blue-600"
              : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          }`}
          aria-label="Toggle table of contents"
        >
          <List className="h-4 w-4" />
        </button>

        <div className="flex-1" />

        {/* Font size controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFontSize((s) => Math.max(12, s - 2))}
            disabled={fontSize <= 12}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease font size"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="text-xs text-slate-500 w-6 text-center font-medium">
            {fontSize}
          </span>
          <button
            onClick={() => setFontSize((s) => Math.min(24, s + 2))}
            disabled={fontSize >= 24}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase font size"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        {/* AI companion toggle */}
        <button
          onClick={() => setCompanionOpen(!companionOpen)}
          className={`p-1.5 rounded transition-colors ${
            companionOpen
              ? "bg-blue-50 text-blue-600"
              : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          }`}
          aria-label="Toggle AI Reading Companion"
          title="AI Reading Companion"
        >
          <MessageSquare className="h-4 w-4" />
        </button>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 min-h-0">
        {/* TOC sidebar */}
        {tocOpen && (
          <TocSidebar
            bookTitle={bookTitle}
            author={author}
            chapters={chapters}
            activeChapterIndex={activeChapterIndex}
            onSelectChapter={setActiveChapterIndex}
            onClose={() => setTocOpen(false)}
          />
        )}

        {/* Reading area */}
        <BookReader chapter={activeChapter} fontSize={fontSize} />

        {/* AI Companion panel */}
        {companionOpen && (
          <AiCompanion
            bookId={bookId}
            bookTitle={bookTitle}
            chapterContent={activeChapter.content}
          />
        )}
      </div>

      {/* Bottom progress bar */}
      <div className="h-8 shrink-0 flex items-center gap-3 px-4 border-t border-slate-200 bg-white">
        <span className="text-xs text-slate-500 whitespace-nowrap">
          Chapter {activeChapterIndex + 1} of {chapters.length}
        </span>

        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <span className="text-xs font-medium text-blue-600 whitespace-nowrap">
          {progressPercent}%
        </span>
      </div>
    </div>
  );
}
