"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Play, Clock, X, SortAsc } from "lucide-react";

interface Video {
  id: string;
  title: string;
  category: string;
  youtubeUrl: string;
  duration: number;
  thumbnailUrl: string | null;
  description: string | null;
}

interface ApiResponse {
  videos: Video[];
  categories: string[];
}

const CATEGORY_COLORS: Record<string, string> = {
  "Coding & Dev": "bg-blue-100 text-blue-700",
  "AI & ML": "bg-purple-100 text-purple-700",
  Science: "bg-green-100 text-green-700",
  History: "bg-amber-100 text-amber-700",
  Mathematics: "bg-rose-100 text-rose-700",
  "Language Learning": "bg-teal-100 text-teal-700",
};

function extractVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
  );
  return match ? match[1] : null;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getThumbnailUrl(video: Video): string {
  if (video.thumbnailUrl) return video.thumbnailUrl;
  const videoId = extractVideoId(video.youtubeUrl);
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";
}

function getEmbedUrl(video: Video): string {
  const videoId = extractVideoId(video.youtubeUrl);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

export default function VideoLibraryPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"title" | "newest">("title");
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== "All") {
      params.set("category", activeCategory);
    }
    if (search.trim()) {
      params.set("search", search.trim());
    }

    try {
      const res = await fetch(`/api/videos?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ApiResponse = await res.json();
      setVideos(data.videos);
      if (categories.length === 0) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, search, categories.length]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const sortedVideos = [...videos].sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    return 0; // newest — data already ordered
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Video Library</h1>
        <p className="text-sm text-slate-500 mt-1">
          Browse curated educational videos across multiple subjects
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search + sort bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={() => setSort(sort === "title" ? "newest" : "title")}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <SortAsc className="h-4 w-4" />
          {sort === "title" ? "A-Z" : "Newest"}
        </button>

        <span className="text-sm text-slate-500 whitespace-nowrap">
          {videos.length} video{videos.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Video grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
            >
              <div className="aspect-video bg-slate-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-3 bg-slate-100 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Play className="h-12 w-12 mb-3" />
          <p className="text-lg font-medium text-slate-500">No videos found</p>
          <p className="text-sm mt-1">
            Try adjusting your filters or search
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      )}

      {/* Video player modal */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={(open) => !open && setSelectedVideo(null)}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          {selectedVideo && (
            <div>
              {/* YouTube embed */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`${getEmbedUrl(selectedVideo)}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {/* Info below player */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-slate-800">
                    {selectedVideo.title}
                  </h2>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="shrink-0 p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`text-xs ${CATEGORY_COLORS[selectedVideo.category] || "bg-slate-100 text-slate-700"}`}
                  >
                    {selectedVideo.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    {formatDuration(selectedVideo.duration)}
                  </span>
                </div>
                {selectedVideo.description && (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function VideoCard({
  video,
  onClick,
}: {
  video: Video;
  onClick: () => void;
}) {
  const thumbnail = getThumbnailUrl(video);
  const colorClass =
    CATEGORY_COLORS[video.category] || "bg-slate-100 text-slate-700";

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left group w-full"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-slate-100">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
          />
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-5 w-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
          {video.title}
        </h3>
        <Badge className={`text-[11px] ${colorClass}`}>
          {video.category}
        </Badge>
        {video.description && (
          <p className="text-xs text-slate-500 line-clamp-2">
            {video.description}
          </p>
        )}
      </div>
    </button>
  );
}
