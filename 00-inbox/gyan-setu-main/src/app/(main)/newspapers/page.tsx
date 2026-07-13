"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  FilterSidebar,
  type FilterGroup,
} from "@/components/shared/filter-sidebar";
import {
  Scissors,
  Languages,
  Share2,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

interface Newspaper {
  id: string;
  publication: string;
  edition: string | null;
  date: string;
  language: string;
  city: string;
  fileUrl: string;
}

interface ApiResponse {
  newspapers: Newspaper[];
  filters: {
    languages: string[];
    cities: string[];
    publications: string[];
  };
}

const TABS = ["Newspapers", "Magazines", "Journals"] as const;

export default function NewspapersPage() {
  const [newspapers, setNewspapers] = useState<Newspaper[]>([]);
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [selectedDate, setSelectedDate] = useState("");
  const [activeTab, setActiveTab] = useState<string>("Newspapers");
  const [selectedNewspaper, setSelectedNewspaper] = useState<Newspaper | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const filterGroupsLoaded = useRef(false);

  // Calendar state
  const [calendarMonth, setCalendarMonth] = useState(() => {
    // Default to March 2026 (where our data lives)
    return new Date(2026, 2, 1);
  });

  const fetchNewspapers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (selected.language?.length) {
      params.set("language", selected.language.join(","));
    }
    if (selected.city?.length) {
      params.set("city", selected.city.join(","));
    }
    if (selected.publication?.length) {
      params.set("publication", selected.publication.join(","));
    }
    if (selectedDate) {
      params.set("date", selectedDate);
    }

    try {
      const res = await fetch(`/api/newspapers?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ApiResponse = await res.json();
      setNewspapers(data.newspapers);
    } catch (err) {
      console.error("Error fetching newspapers:", err);
    } finally {
      setLoading(false);
    }
  }, [selected, selectedDate]);

  useEffect(() => {
    fetchNewspapers();
  }, [fetchNewspapers]);

  // Fetch filter options once
  useEffect(() => {
    if (filterGroupsLoaded.current) return;
    async function fetchFilterCounts() {
      try {
        const res = await fetch("/api/newspapers");
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
    setSelectedDate("");
    setSelectedNewspaper(null);
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // Available dates from data for calendar highlighting
  const availableDates = new Set(["2026-03-17", "2026-03-18"]);

  return (
    <div className="flex flex-col h-full">
      {/* Top tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
        <button className="ml-auto px-4 py-2 text-sm font-medium text-navy bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors mb-1">
          Access Archives
        </button>
      </div>

      {activeTab !== "Newspapers" ? (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">{activeTab} coming soon</p>
            <p className="text-sm mt-1">
              This section is under development
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 flex-1 min-h-0">
          {/* Left sidebar */}
          <div className="w-[250px] shrink-0 flex flex-col gap-4 overflow-y-auto">
            {/* Filters */}
            <FilterSidebar
              groups={filterGroups}
              selected={selected}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />

            {/* Calendar */}
            <div className="pr-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Date
              </h3>
              <MiniCalendar
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
                selectedDate={selectedDate}
                onDateSelect={(d) => {
                  setSelectedDate(d === selectedDate ? "" : d);
                  setSelectedNewspaper(null);
                }}
                availableDates={availableDates}
              />
            </div>

            {/* Publication list */}
            <div className="pr-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                Available Issues
              </h3>
              <div className="space-y-2">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-2 rounded-lg bg-white animate-pulse"
                    >
                      <div className="w-12 h-14 bg-slate-100 rounded" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-slate-100 rounded w-3/4" />
                        <div className="h-2 bg-slate-100 rounded w-1/2" />
                      </div>
                    </div>
                  ))
                ) : newspapers.length === 0 ? (
                  <p className="text-sm text-slate-400 py-4 text-center">
                    No newspapers found
                  </p>
                ) : (
                  newspapers.map((np) => (
                    <button
                      key={np.id}
                      onClick={() => setSelectedNewspaper(np)}
                      className={`flex gap-3 p-2 rounded-lg w-full text-left transition-colors ${
                        selectedNewspaper?.id === np.id
                          ? "bg-blue-50 ring-1 ring-blue-200"
                          : "bg-white hover:bg-slate-50"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="w-12 h-14 rounded overflow-hidden bg-slate-100 shrink-0 relative">
                        <Image
                          src={np.fileUrl}
                          alt={np.publication}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {np.publication}
                        </p>
                        <p className="text-xs text-slate-500">
                          {np.edition || "Main Edition"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatDate(np.date)} &middot; {np.language}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main viewer area */}
          <div className="flex-1 flex flex-col min-w-0">
            {selectedNewspaper ? (
              <>
                {/* Viewer header */}
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg font-bold text-navy">
                    {selectedNewspaper.publication}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy text-white">
                    {selectedNewspaper.city}
                  </span>
                  {/* Tools */}
                  <div className="flex items-center gap-1 ml-auto">
                    <ToolButton icon={<Scissors className="h-4 w-4" />} label="Clip" />
                    <ToolButton
                      icon={<Languages className="h-4 w-4" />}
                      label="Translate"
                    />
                    <ToolButton icon={<Share2 className="h-4 w-4" />} label="Share" />
                    <ToolButton
                      icon={<Download className="h-4 w-4" />}
                      label="PDF"
                      highlight
                    />
                  </div>
                </div>

                {/* Newspaper viewer */}
                <div className="flex-1 bg-slate-100 rounded-xl overflow-auto relative">
                  <div className="min-h-full flex items-start justify-center p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedNewspaper.fileUrl}
                      alt={`${selectedNewspaper.publication} - ${formatDate(selectedNewspaper.date)}`}
                      className="max-w-full h-auto rounded-lg shadow-lg bg-white"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* No newspaper selected — show grid */
              <div className="flex-1">
                <h2 className="text-lg font-bold text-navy mb-4">
                  {newspapers.length > 0
                    ? "Select a newspaper to read"
                    : "No newspapers available"}
                </h2>
                {!loading && newspapers.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {newspapers.map((np) => (
                      <button
                        key={np.id}
                        onClick={() => setSelectedNewspaper(np)}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left group"
                      >
                        <div className="aspect-[3/4] relative bg-slate-50">
                          <Image
                            src={np.fileUrl}
                            alt={np.publication}
                            fill
                            className="object-cover object-top group-hover:scale-[1.02] transition-transform"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {np.publication}
                          </p>
                          <p className="text-xs text-slate-500">
                            {np.edition || "Main Edition"}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {formatDate(np.date)} &middot; {np.city}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {loading && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
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
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Tool button ---- */

function ToolButton({
  icon,
  label,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
}) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        highlight
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
      }`}
      title={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* ---- Mini Calendar ---- */

function MiniCalendar({
  month,
  onMonthChange,
  selectedDate,
  onDateSelect,
  availableDates,
}: {
  month: Date;
  onMonthChange: (d: Date) => void;
  selectedDate: string;
  onDateSelect: (d: string) => void;
  availableDates: Set<string>;
}) {
  const year = month.getFullYear();
  const m = month.getMonth();

  const firstDay = new Date(year, m, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, m + 1, 0).getDate();

  const monthName = month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => onMonthChange(new Date(year, m - 1, 1));
  const nextMonth = () => onMonthChange(new Date(year, m + 1, 1));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
      {/* Month header */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={prevMonth}
          className="p-1 rounded hover:bg-slate-100 text-slate-500"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-slate-800">
          {monthName}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 rounded hover:bg-slate-100 text-slate-500"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 text-center mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-[10px] font-medium text-slate-400 py-1">
            {d}
          </span>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 text-center gap-y-0.5">
        {cells.map((day, i) => {
          if (day === null) {
            return <span key={i} />;
          }

          const dateStr = `${year}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isAvailable = availableDates.has(dateStr);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={i}
              onClick={() => isAvailable && onDateSelect(dateStr)}
              disabled={!isAvailable}
              className={`text-xs py-1.5 rounded-md transition-colors ${
                isSelected
                  ? "bg-navy text-white font-bold"
                  : isAvailable
                    ? "text-slate-800 font-semibold hover:bg-blue-50 cursor-pointer"
                    : "text-slate-300 cursor-default"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Helpers ---- */

function buildFilterGroups(data: ApiResponse): FilterGroup[] {
  const langCounts: Record<string, number> = {};
  const cityCounts: Record<string, number> = {};

  for (const np of data.newspapers) {
    langCounts[np.language] = (langCounts[np.language] || 0) + 1;
    cityCounts[np.city] = (cityCounts[np.city] || 0) + 1;
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
      label: "City",
      key: "city",
      options: data.filters.cities.map((city) => ({
        value: city,
        label: city,
        count: cityCounts[city] || 0,
      })),
    },
    {
      label: "Publication",
      key: "publication",
      options: data.filters.publications.map((pub) => ({
        value: pub,
        label: pub,
      })),
    },
  ];
}
