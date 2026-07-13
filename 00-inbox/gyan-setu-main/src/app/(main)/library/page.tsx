"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { BookCard } from "@/components/shared/book-card";
import {
  FilterSidebar,
  type FilterGroup,
} from "@/components/shared/filter-sidebar";
import { Search } from "lucide-react";

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

interface ApiResponse {
  books: Book[];
  filters: {
    languages: string[];
    formats: string[];
    collections: string[];
  };
}

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState<"rating" | "year">("rating");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const filterGroupsLoaded = useRef(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (selected.language?.length) {
      params.set("language", selected.language.join(","));
    }
    if (selected.format?.length) {
      params.set("format", selected.format.join(","));
    }
    if (selected.collection?.length) {
      params.set("collection", selected.collection.join(","));
    }
    if (search.trim()) {
      params.set("search", search.trim());
    }
    params.set("sort", sort);

    try {
      const res = await fetch(`/api/books?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ApiResponse = await res.json();
      setBooks(data.books);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  }, [selected, sort, search]);

  // Fetch books whenever filters/sort/search change
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Fetch unfiltered data for filter counts on mount (once)
  useEffect(() => {
    if (filterGroupsLoaded.current) return;
    async function fetchFilterCounts() {
      try {
        const res = await fetch("/api/books");
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
        {/* Top bar: search + sort */}
        <div className="flex items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search books, authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "rating" | "year")}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
          </select>

          {/* Count */}
          <span className="text-sm text-slate-500 whitespace-nowrap">
            {books.length} book{books.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Book grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
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
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <p className="text-lg font-medium">No books found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
      </div>
    </div>
  );
}

function buildFilterGroups(data: ApiResponse): FilterGroup[] {
  // Count books per language/format/collection
  const langCounts: Record<string, number> = {};
  const formatCounts: Record<string, number> = {};
  const collectionCounts: Record<string, number> = {};

  for (const book of data.books) {
    langCounts[book.language] = (langCounts[book.language] || 0) + 1;
    formatCounts[book.format] = (formatCounts[book.format] || 0) + 1;
    if (book.collection) {
      collectionCounts[book.collection] =
        (collectionCounts[book.collection] || 0) + 1;
    }
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
    {
      label: "Format",
      key: "format",
      options: data.filters.formats.map((fmt) => ({
        value: fmt,
        label: fmt === "EPUB" ? "eBook (EPUB)" : fmt,
        count: formatCounts[fmt] || 0,
      })),
    },
    {
      label: "Collection",
      key: "collection",
      options: data.filters.collections.map((col) => ({
        value: col,
        label: col,
        count: collectionCounts[col] || 0,
      })),
    },
  ];
}
