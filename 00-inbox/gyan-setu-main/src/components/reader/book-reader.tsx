"use client";

import { useEffect, useRef } from "react";
import type { Chapter } from "@/lib/book-parser";

interface BookReaderProps {
  chapter: Chapter;
  fontSize: number;
}

export function BookReader({ chapter, fontSize }: BookReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when chapter changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [chapter.id]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-white px-8 py-6 md:px-16 lg:px-24"
    >
      <div className="max-w-3xl mx-auto">
        {/* Chapter heading */}
        <h1
          className="font-bold text-navy mb-6 pb-4 border-b border-slate-200"
          style={{ fontSize: fontSize + 6 }}
        >
          {chapter.title}
        </h1>

        {/* Chapter text */}
        <div
          className="text-slate-700 leading-relaxed whitespace-pre-line"
          style={{ fontSize }}
        >
          {chapter.content}
        </div>
      </div>
    </div>
  );
}
