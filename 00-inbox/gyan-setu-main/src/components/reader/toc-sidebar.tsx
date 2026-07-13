"use client";

import { BookOpen, X } from "lucide-react";
import type { Chapter } from "@/lib/book-parser";

interface TocSidebarProps {
  bookTitle: string;
  author: string;
  chapters: Chapter[];
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  onClose: () => void;
}

export function TocSidebar({
  bookTitle,
  author,
  chapters,
  activeChapterIndex,
  onSelectChapter,
  onClose,
}: TocSidebarProps) {
  return (
    <aside className="w-[260px] shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-navy truncate">{bookTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate">by {author}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close table of contents"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chapter label */}
      <div className="px-4 py-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Table of Contents
          </span>
        </div>
      </div>

      {/* Chapter list */}
      <nav className="flex-1 overflow-y-auto py-1">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            onClick={() => onSelectChapter(index)}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
              index === activeChapterIndex
                ? "bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-500"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            {chapter.title}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 text-center">
        <span className="text-xs text-slate-400">
          {chapters.length} chapter{chapters.length !== 1 ? "s" : ""}
        </span>
      </div>
    </aside>
  );
}
