"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Mic,
  Pause,
  Square,
  Play,
  Upload,
  Plus,
  Users,
  Radio,
  Star,
  Settings,
} from "lucide-react";

/* ─── Types ───────────────────────────────────────────────────────── */

interface PodcastSeries {
  id: string;
  name: string;
  language: string;
  subscriberCount: number;
  description: string | null;
  _count: { podcasts: number };
}

/* ─── Helper ──────────────────────────────────────────────────────── */

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function fmtTimer(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

const LANG_BADGES: Record<string, string> = {
  Gujarati: "bg-orange-100 text-orange-700",
  Hindi: "bg-blue-100 text-blue-700",
  Sanskrit: "bg-purple-100 text-purple-700",
  English: "bg-green-100 text-green-700",
};

/* ─── Component ───────────────────────────────────────────────────── */

export default function PodcastStudioPage() {
  // --- Series data ---
  const [series, setSeries] = useState<PodcastSeries[]>([]);
  const [loadingSeries, setLoadingSeries] = useState(true);

  // --- Recording state ---
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [micActive, setMicActive] = useState(false);
  const [noiseCancellation, setNoiseCancellation] = useState(true);
  const [episodeTitle, setEpisodeTitle] = useState("Ep. 3 - Rani Ki Vav History");
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState<string | null>(null);

  // --- New series dialog ---
  const [newSeriesOpen, setNewSeriesOpen] = useState(false);
  const [newSeriesName, setNewSeriesName] = useState("");
  const [newSeriesLang, setNewSeriesLang] = useState("Gujarati");
  const [newSeriesDesc, setNewSeriesDesc] = useState("");
  const [creatingSeries, setCreatingSeries] = useState(false);

  // --- Refs ---
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // --- Computed stats ---
  const totalListeners = series.reduce((s, x) => s + x.subscriberCount, 0);
  const totalEpisodes = series.reduce((s, x) => s + x._count.podcasts, 0);

  /* ── Fetch series ─────────────────────────────────────────────── */

  const fetchSeries = useCallback(async () => {
    setLoadingSeries(true);
    try {
      const res = await fetch("/api/podcast-series");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSeries(data.series);
      // Default selection to first series
      if (data.series.length && !selectedSeriesId) {
        setSelectedSeriesId(data.series[0].id);
      }
    } catch {
      // silent
    } finally {
      setLoadingSeries(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  /* ── Timer ────────────────────────────────────────────────────── */

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  /* ── Recording controls ───────────────────────────────────────── */

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      };

      recorder.start(250); // collect data every 250ms
      setIsRecording(true);
      setIsPaused(false);
      setMicActive(true);
      setElapsed(0);
      setAudioBlob(null);
      setPublishMsg(null);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Microphone permission is required to record a podcast.");
    }
  }

  function pauseRecording() {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    } else if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsPaused(false);
    setMicActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  /* ── Publish flow ─────────────────────────────────────────────── */

  async function handlePublish() {
    if (!episodeTitle.trim()) {
      alert("Please enter an episode title.");
      return;
    }
    if (!selectedSeriesId) {
      alert("Please select a series.");
      return;
    }

    setPublishing(true);
    setPublishMsg(null);

    try {
      // 1. Create draft recording
      const draftRes = await fetch("/api/podcast-recordings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: episodeTitle.trim(),
          seriesId: selectedSeriesId,
          audioUrl: audioBlob ? URL.createObjectURL(audioBlob) : null,
        }),
      });
      if (!draftRes.ok) throw new Error("Failed to save recording");
      const { recording } = await draftRes.json();

      // 2. Publish
      const pubRes = await fetch(`/api/podcast-recordings/${recording.id}/publish`, {
        method: "POST",
      });
      if (!pubRes.ok) {
        const err = await pubRes.json();
        throw new Error(err.error || "Publish failed");
      }

      setPublishMsg("Published successfully! Episode is now live.");
      setEpisodeTitle("");
      setAudioBlob(null);
      setElapsed(0);
      fetchSeries(); // refresh counts
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Publish failed";
      setPublishMsg(`Error: ${message}`);
    } finally {
      setPublishing(false);
    }
  }

  /* ── Create new series ────────────────────────────────────────── */

  async function handleCreateSeries() {
    if (!newSeriesName.trim()) return;
    setCreatingSeries(true);
    try {
      const res = await fetch("/api/podcast-series", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSeriesName.trim(),
          language: newSeriesLang,
          description: newSeriesDesc.trim() || null,
        }),
      });
      if (!res.ok) throw new Error();
      const { series: created } = await res.json();
      setSeries((prev) => [...prev, created]);
      setSelectedSeriesId(created.id);
      setNewSeriesOpen(false);
      setNewSeriesName("");
      setNewSeriesDesc("");
    } catch {
      alert("Failed to create series");
    } finally {
      setCreatingSeries(false);
    }
  }

  /* ── Waveform bars (decorative, animated) ─────────────────────── */

  function WaveformBars() {
    const barCount = 40;
    return (
      <div className="flex items-center justify-center gap-[3px] h-24 bg-slate-800 rounded-xl px-4">
        {Array.from({ length: barCount }).map((_, i) => {
          const animating = isRecording && !isPaused;
          return (
            <div
              key={i}
              className="w-[5px] rounded-full bg-blue-400"
              style={{
                height: animating ? undefined : `${12 + Math.sin(i * 0.5) * 10}px`,
                animation: animating
                  ? `waveBar 0.${3 + (i % 5)}s ease-in-out infinite alternate`
                  : undefined,
                animationDelay: animating ? `${(i % 7) * 0.05}s` : undefined,
              }}
            />
          );
        })}
        <style>{`
          @keyframes waveBar {
            0% { height: 8px; }
            100% { height: ${56 + Math.random() * 20}px; }
          }
        `}</style>
      </div>
    );
  }

  /* ── Render ───────────────────────────────────────────────────── */

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* ──────────────── LEFT: Recording Studio ──────────────── */}
      <Card className="lg:col-span-3 p-6 bg-white border-0 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-slate-800">Recording Studio</h2>
          </div>
          <div className="flex items-center gap-3">
            {micActive && (
              <Badge className="bg-green-100 text-green-700 border-0 gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Microphone Active
              </Badge>
            )}
            <Settings className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Episode title */}
        <div className="text-center mb-4">
          <Input
            className="text-center text-lg font-medium text-slate-800 border-0 bg-transparent focus-visible:ring-0 placeholder:text-slate-400"
            value={episodeTitle}
            onChange={(e) => setEpisodeTitle(e.target.value)}
            placeholder="Episode title..."
          />
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <span className="text-4xl font-mono font-bold tracking-wider text-red-500">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 mr-2 align-middle" />
            {fmtTimer(elapsed)}
          </span>
        </div>

        {/* Waveform */}
        <div className="mb-6">
          <WaveformBars />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* Pause */}
          <button
            onClick={pauseRecording}
            disabled={!isRecording}
            className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition-colors"
          >
            {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          </button>

          {/* Record */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`h-16 w-16 rounded-full flex items-center justify-center transition-colors ${
              isRecording
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isRecording ? (
              <Mic className="h-7 w-7 animate-pulse" />
            ) : (
              <Mic className="h-7 w-7" />
            )}
          </button>

          {/* Stop */}
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition-colors"
          >
            <Square className="h-5 w-5" />
          </button>
        </div>

        {/* Noise cancellation & Upload */}
        <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-medium">Noise Cancellation</span>
            <button
              onClick={() => setNoiseCancellation(!noiseCancellation)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                noiseCancellation ? "bg-blue-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  noiseCancellation ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>AI AUTO-TRANSCRIPTION</span>
            <span className="flex items-center gap-1 text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Live
            </span>
          </div>
        </div>

        {/* Series selector + Publish */}
        <div className="border-t border-slate-100 pt-4 mt-2 space-y-3">
          <div className="flex items-center gap-3">
            <Label className="text-slate-700 text-sm whitespace-nowrap">Series</Label>
            <select
              className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              value={selectedSeriesId}
              onChange={(e) => setSelectedSeriesId(e.target.value)}
            >
              <option value="">Select a series...</option>
              {series.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              disabled={publishing || (!audioBlob && elapsed === 0)}
              onClick={handlePublish}
            >
              {publishing ? "Publishing..." : "Publish Episode"}
            </Button>
            <Button variant="outline" className="text-slate-600 border-slate-200">
              <Upload className="h-4 w-4 mr-1" /> Upload Existing Audio
            </Button>
          </div>

          {publishMsg && (
            <p
              className={`text-sm text-center ${
                publishMsg.startsWith("Error") ? "text-red-500" : "text-green-600"
              }`}
            >
              {publishMsg}
            </p>
          )}
        </div>
      </Card>

      {/* ──────────────── RIGHT: My Podcasts ──────────────────── */}
      <Card className="lg:col-span-2 p-6 bg-white border-0 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-800">My Podcasts</h2>
          <Dialog open={newSeriesOpen} onOpenChange={setNewSeriesOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white gap-1">
                <Plus className="h-3.5 w-3.5" /> New Series
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="text-slate-800">Create New Series</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <div>
                  <Label className="text-slate-700">Series Name</Label>
                  <Input
                    value={newSeriesName}
                    onChange={(e) => setNewSeriesName(e.target.value)}
                    placeholder="e.g. Gujarat History Talks"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-700">Language</Label>
                  <select
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700"
                    value={newSeriesLang}
                    onChange={(e) => setNewSeriesLang(e.target.value)}
                  >
                    <option>Gujarati</option>
                    <option>Hindi</option>
                    <option>Sanskrit</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <Label className="text-slate-700">Description</Label>
                  <textarea
                    className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 min-h-[60px]"
                    value={newSeriesDesc}
                    onChange={(e) => setNewSeriesDesc(e.target.value)}
                    placeholder="What is this series about?"
                  />
                </div>
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={!newSeriesName.trim() || creatingSeries}
                  onClick={handleCreateSeries}
                >
                  {creatingSeries ? "Creating..." : "Create Series"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-800">
              {totalListeners.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide">Listeners</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-slate-800">{totalEpisodes}</div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide">Episodes</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-slate-800 flex items-center justify-center gap-0.5">
              4.8 <Star className="h-3.5 w-3.5 text-gold fill-gold" />
            </div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide">Rating</div>
          </div>
        </div>

        {/* Series list */}
        <ScrollArea className="h-[360px]">
          {loadingSeries ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-lg bg-slate-50 animate-pulse" />
              ))}
            </div>
          ) : series.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">
              No series yet. Create one to get started!
            </p>
          ) : (
            <div className="space-y-3">
              {series.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  {/* Icon placeholder */}
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mic className="h-5 w-5 text-blue-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-800 text-sm truncate">
                      {s.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{s._count.podcasts} Episodes</span>
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {s.subscriberCount.toLocaleString()} Subs
                      </span>
                    </div>
                    <Badge
                      className={`mt-1 text-[10px] px-1.5 py-0 border-0 ${
                        LANG_BADGES[s.language] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {s.language}
                    </Badge>
                  </div>

                  {/* Play button */}
                  <button className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 hover:bg-blue-600 transition-colors">
                    <Play className="h-4 w-4 ml-0.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Upload existing */}
        <Button
          variant="outline"
          className="w-full mt-4 text-slate-600 border-slate-200 gap-2"
        >
          <Upload className="h-4 w-4" /> Upload Existing Audio
        </Button>
      </Card>
    </div>
  );
}
