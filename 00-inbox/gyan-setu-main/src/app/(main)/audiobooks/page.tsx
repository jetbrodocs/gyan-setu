"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  FilterSidebar,
  type FilterGroup,
} from "@/components/shared/filter-sidebar";
import { Search, Clock, Mic } from "lucide-react";

interface Audiobook {
  id: string;
  title: string;
  author: string | null;
  narrator: string | null;
  language: string;
  coverUrl: string | null;
  audioUrl: string | null;
  totalDuration: number;
  chapters: unknown[];
}

interface ApiResponse {
  audiobooks: Audiobook[];
  filters: {
    languages: string[];
  };
}

const LANG_CODES: Record<string, string> = {
  Gujarati: "GJ",
  Hindi: "HI",
  English: "EN",
  Sanskrit: "SA",
};

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function AudiobooksPage() {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const filterGroupsLoaded = useRef(false);

  const fetchAudiobooks = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (selected.language?.length) {
      params.set("language", selected.language.join(","));
    }
    if (search.trim()) {
      params.set("search", search.trim());
    }

    try {
      const res = await fetch(`/api/audiobooks?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ApiResponse = await res.json();
      setAudiobooks(data.audiobooks);
    } catch (err) {
      console.error("Error fetching audiobooks:", err);
    } finally {
      setLoading(false);
    }
  }, [selected, search]);

  useEffect(() => {
    fetchAudiobooks();
  }, [fetchAudiobooks]);

  // Fetch filter counts once on mount
  useEffect(() => {
    if (filterGroupsLoaded.current) return;
    async function fetchFilterCounts() {
      try {
        const res = await fetch("/api/audiobooks");
        if (!res.ok) return;
        const data: ApiResponse = await res.json();
        setFilterGroups(buildFilterGroups(data));
        filterGroupsLoaded.current = true;
      } catch {
        // ignore
      }
    }
    fetchFilterCounts();
  }, []);

  function handleFilterChange(key: string, values: string[]) {
    setSelected((prev) => ({ ...prev, [key]: values }));
  }

  function handleReset() {
    setSelected({});
    setSearch("");
  }

  return (
    <div className="flex gap-6 h-full">
      {/* Sidebar */}
      <FilterSidebar
        groups={filterGroups}
        selected={selected}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar: search + count */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search audiobooks, authors, narrators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <span className="text-sm text-slate-500 whitespace-nowrap">
            {audiobooks.length} audiobook{audiobooks.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Audiobook grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="aspect-[3/4] bg-slate-100" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : audiobooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <p className="text-lg font-medium">No audiobooks found</p>
            <p className="text-sm mt-1">
              Try adjusting your filters or search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {audiobooks.map((ab) => (
              <Link key={ab.id} href={`/audiobooks/${ab.id}`}>
                <AudiobookCard audiobook={ab} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AudiobookCard({ audiobook }: { audiobook: Audiobook }) {
  const langCode =
    LANG_CODES[audiobook.language] ||
    audiobook.language.slice(0, 2).toUpperCase();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {/* Cover */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center">
        {audiobook.coverUrl ? (
          <Image
            src={audiobook.coverUrl}
            alt={audiobook.title}
            fill
            className="object-cover"
            sizes="200px"
          />
        ) : (
          <span className="text-sm text-purple-300 font-medium text-center px-2">
            {audiobook.title}
          </span>
        )}
        {/* Language badge */}
        <Badge className="absolute top-2 left-2 bg-navy text-white text-[10px] px-1.5 py-0.5">
          {langCode}
        </Badge>
        {/* Audio badge */}
        <Badge className="absolute top-2 right-2 bg-purple-500 text-white text-[10px] px-1.5 py-0.5">
          <Mic className="h-3 w-3" />
        </Badge>
      </div>
      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-navy truncate">
          {audiobook.title}
        </h3>
        {audiobook.author && (
          <p className="text-xs text-slate-500 truncate">{audiobook.author}</p>
        )}
        {audiobook.narrator && (
          <p className="text-xs text-slate-400 truncate">
            Narrated by {audiobook.narrator}
          </p>
        )}
        <div className="flex items-center gap-1 mt-1">
          <Clock className="h-3 w-3 text-slate-400" />
          <span className="text-xs text-slate-600">
            {formatDuration(audiobook.totalDuration)}
          </span>
        </div>
      </div>
    </div>
  );
}

function buildFilterGroups(data: ApiResponse): FilterGroup[] {
  const langCounts: Record<string, number> = {};

  for (const ab of data.audiobooks) {
    langCounts[ab.language] = (langCounts[ab.language] || 0) + 1;
  }

  return [
    {
      label: "Language",
      key: "language",
      options: data.filters.languages.map((lang) => ({
        value: lang,
        label: lang,
        count: langCounts[lang] || 0,
      })),
    },
  ];
}
