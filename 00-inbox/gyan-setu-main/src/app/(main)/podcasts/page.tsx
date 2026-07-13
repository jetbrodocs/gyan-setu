"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Play,
  Pause,
  Mic,
  Users,
  Clock,
  Music,
} from "lucide-react";

/* ─── Types ───────────────────────────────────────────────────────── */

interface PodcastSeries {
  id: string;
  name: string;
  language: string;
  subscriberCount: number;
  description: string | null;
  _count: { podcasts: number };
  creator: { id: string; name: string };
}

interface Podcast {
  id: string;
  title: string;
  audioUrl: string;
  duration: number;
  publishedAt: string | null;
  series: {
    id: string;
    name: string;
    language: string;
    subscriberCount: number;
  };
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function fmtDuration(seconds: number): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const LANG_BADGES: Record<string, string> = {
  Gujarati: "bg-orange-100 text-orange-700",
  Hindi: "bg-blue-100 text-blue-700",
  Sanskrit: "bg-purple-100 text-purple-700",
  English: "bg-green-100 text-green-700",
};

/* ─── Audio Player Row ────────────────────────────────────────────── */

function EpisodeRow({ ep }: { ep: Podcast }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurTime] = useState(0);

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  }

  function handleTimeUpdate() {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    setProgress((el.currentTime / el.duration) * 100);
    setCurTime(Math.floor(el.currentTime));
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    el.currentTime = pct * el.duration;
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white hover:shadow-sm transition-shadow border border-slate-100">
      <audio
        ref={audioRef}
        src={ep.audioUrl}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
          setCurTime(0);
        }}
      />

      {/* Play button */}
      <button
        onClick={togglePlay}
        className="h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white flex-shrink-0 transition-colors"
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </button>

      {/* Info + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-slate-800 truncate">{ep.title}</span>
          <Badge
            className={`text-[10px] px-1.5 py-0 border-0 ${
              LANG_BADGES[ep.series.language] || "bg-slate-100 text-slate-600"
            }`}
          >
            {ep.series.language}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
          <span>{ep.series.name}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {ep.duration > 0 ? fmtDuration(ep.duration) : fmtDuration(currentTime)}
          </span>
          {ep.publishedAt && <span>{fmtDate(ep.publishedAt)}</span>}
        </div>

        {/* Progress bar */}
        <div
          className="h-1.5 bg-slate-100 rounded-full cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────── */

export default function PodcastsPage() {
  const [series, setSeries] = useState<PodcastSeries[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSeries = useCallback(async () => {
    try {
      const res = await fetch("/api/podcast-series");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSeries(data.series);
    } catch {
      // silent
    }
  }, []);

  const fetchPodcasts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedSeries) params.set("seriesId", selectedSeries);
    if (search.trim()) params.set("search", search.trim());

    try {
      const res = await fetch(`/api/podcasts?${params.toString()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPodcasts(data.podcasts);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [selectedSeries, search]);

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            className="pl-10 bg-white border-slate-200 text-slate-700"
            placeholder="Search podcasts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Series filter chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !selectedSeries
                ? "bg-blue-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            onClick={() => setSelectedSeries("")}
          >
            All
          </button>
          {series.map((s) => (
            <button
              key={s.id}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedSeries === s.id
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              onClick={() => setSelectedSeries(s.id)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Series cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {series.map((s) => (
          <Card
            key={s.id}
            className="p-5 bg-white border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              setSelectedSeries(selectedSeries === s.id ? "" : s.id)
            }
          >
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 text-sm">{s.name}</div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  {s.description || "No description"}
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Mic className="h-3 w-3" /> {s._count.podcasts} episodes
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {s.subscriberCount.toLocaleString()}
                  </span>
                </div>
                <Badge
                  className={`mt-2 text-[10px] px-1.5 py-0 border-0 ${
                    LANG_BADGES[s.language] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {s.language}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Episode list */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          {selectedSeries
            ? `Episodes — ${series.find((s) => s.id === selectedSeries)?.name || ""}`
            : "All Episodes"}
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-lg bg-white animate-pulse" />
            ))}
          </div>
        ) : podcasts.length === 0 ? (
          <Card className="p-8 bg-white border-0 shadow-sm text-center">
            <Music className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No episodes found.</p>
          </Card>
        ) : (
          <ScrollArea className="max-h-[600px]">
            <div className="space-y-2">
              {podcasts.map((ep) => (
                <EpisodeRow key={ep.id} ep={ep} />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
