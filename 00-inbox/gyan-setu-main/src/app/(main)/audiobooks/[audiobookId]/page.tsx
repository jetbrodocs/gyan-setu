"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Clock,
  ChevronLeft,
  Mic,
} from "lucide-react";

interface Chapter {
  title: string;
  startTime: number;
  duration: number;
}

interface Audiobook {
  id: string;
  title: string;
  author: string | null;
  narrator: string | null;
  language: string;
  coverUrl: string | null;
  audioUrl: string | null;
  totalDuration: number;
  chapters: Chapter[];
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];

const LANG_CODES: Record<string, string> = {
  Gujarati: "GJ",
  Hindi: "HI",
  English: "EN",
  Sanskrit: "SA",
};

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function formatDurationShort(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function AudiobookPlayerPage() {
  const params = useParams();
  const audiobookId = params.audiobookId as string;

  const [audiobook, setAudiobook] = useState<Audiobook | null>(null);
  const [related, setRelated] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch audiobook data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/audiobooks/${audiobookId}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAudiobook(data.audiobook);
        setRelated(data.related || []);
        setDuration(data.audiobook.totalDuration);
      } catch (err) {
        console.error("Error fetching audiobook:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [audiobookId]);

  // Create audio element
  useEffect(() => {
    if (!audiobook?.audioUrl) return;

    const audio = new Audio(audiobook.audioUrl);
    audio.preload = "metadata";
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [audiobook?.audioUrl]);

  // Update current time periodically while playing
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 250);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  // Track active chapter
  useEffect(() => {
    if (!audiobook?.chapters) return;
    const chapters = audiobook.chapters;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentTime >= chapters[i].startTime) {
        setActiveChapterIdx(i);
        return;
      }
    }
    setActiveChapterIdx(0);
  }, [currentTime, audiobook?.chapters]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const skip = useCallback((seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(audioRef.current.currentTime + seconds, audioRef.current.duration || Infinity)
    );
    setCurrentTime(audioRef.current.currentTime);
  }, []);

  const seekTo = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const changeSpeed = useCallback(() => {
    const currentIdx = SPEED_OPTIONS.indexOf(speed);
    const nextIdx = (currentIdx + 1) % SPEED_OPTIONS.length;
    const newSpeed = SPEED_OPTIONS[nextIdx];
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  }, [speed]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const newTime = pct * duration;
      seekTo(newTime);
    },
    [duration, seekTo]
  );

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-100 rounded w-48" />
        <div className="flex gap-8">
          <div className="w-80 h-80 bg-slate-100 rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-slate-100 rounded w-64" />
            <div className="h-4 bg-slate-100 rounded w-48" />
            <div className="h-12 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!audiobook) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <p className="text-lg font-medium">Audiobook not found</p>
        <Link
          href="/audiobooks"
          className="text-blue-500 hover:text-blue-700 mt-2 text-sm"
        >
          Back to Audiobooks
        </Link>
      </div>
    );
  }

  const chapters = audiobook.chapters || [];
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/audiobooks"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Audiobooks
      </Link>

      {/* Main player layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Cover art */}
        <div className="shrink-0">
          <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-blue-50 shadow-lg mx-auto lg:mx-0">
            {audiobook.coverUrl ? (
              <Image
                src={audiobook.coverUrl}
                alt={audiobook.title}
                fill
                className="object-cover"
                sizes="320px"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-lg text-purple-300 font-medium text-center px-4">
                  {audiobook.title}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Center: Info + Controls */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Title / Meta */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-navy mb-1">
              {audiobook.title}
            </h1>
            {audiobook.author && (
              <p className="text-base text-slate-600">by {audiobook.author}</p>
            )}
            {audiobook.narrator && (
              <p className="text-sm text-slate-400 mt-0.5">
                Narrated by {audiobook.narrator}
              </p>
            )}
            <div className="flex items-center gap-3 mt-3">
              <Badge className="bg-navy text-white text-xs px-2 py-0.5">
                {LANG_CODES[audiobook.language] || audiobook.language}
              </Badge>
              <span className="flex items-center gap-1 text-sm text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                {formatDurationShort(audiobook.totalDuration)}
              </span>
              <span className="flex items-center gap-1 text-sm text-slate-500">
                <Mic className="h-3.5 w-3.5" />
                {chapters.length} chapters
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div
              className="w-full h-2 bg-slate-200 rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-blue-500 rounded-full relative transition-all duration-150"
                style={{ width: `${progressPct}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-400">
                {formatTime(currentTime)}
              </span>
              <span className="text-xs text-slate-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Speed control */}
            <button
              onClick={changeSpeed}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors min-w-[52px]"
            >
              {speed}x
            </button>

            {/* Skip back */}
            <button
              onClick={() => skip(-15)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              aria-label="Skip back 15 seconds"
            >
              <div className="relative">
                <SkipBack className="h-6 w-6" />
                <span className="absolute -bottom-1 -right-1 text-[8px] font-bold text-slate-500">
                  15
                </span>
              </div>
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </button>

            {/* Skip forward */}
            <button
              onClick={() => skip(15)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              aria-label="Skip forward 15 seconds"
            >
              <div className="relative">
                <SkipForward className="h-6 w-6" />
                <span className="absolute -bottom-1 -right-1 text-[8px] font-bold text-slate-500">
                  15
                </span>
              </div>
            </button>

            {/* Speed indicator (visual) */}
            <div className="min-w-[52px]" />
          </div>

          {/* Chapter list (scrollable) */}
          <div className="flex-1 min-h-0">
            <h2 className="text-sm font-bold text-navy uppercase tracking-wider mb-3">
              Chapters
            </h2>
            <div className="max-h-[300px] overflow-y-auto space-y-1 pr-1">
              {chapters.map((ch, idx) => {
                const isActive = idx === activeChapterIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => seekTo(ch.startTime)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-2 transition-colors ${
                      isActive
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`text-xs font-mono ${
                          isActive ? "text-blue-600" : "text-slate-400"
                        }`}
                      >
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <span
                        className={`text-sm truncate ${
                          isActive
                            ? "font-semibold text-blue-700"
                            : "text-slate-700"
                        }`}
                      >
                        {ch.title}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">
                      {formatTime(ch.startTime)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-navy mb-4">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((ab) => (
              <Link key={ab.id} href={`/audiobooks/${ab.id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-100 to-blue-50">
                    {ab.coverUrl ? (
                      <Image
                        src={ab.coverUrl}
                        alt={ab.title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-sm text-purple-300 font-medium text-center px-2">
                          {ab.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-navy truncate">
                      {ab.title}
                    </h3>
                    {ab.author && (
                      <p className="text-xs text-slate-500 truncate">
                        {ab.author}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-600">
                        {formatDurationShort(ab.totalDuration)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
