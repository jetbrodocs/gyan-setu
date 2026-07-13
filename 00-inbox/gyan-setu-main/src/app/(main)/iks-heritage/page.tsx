"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Landmark, Eye, MapPin } from "lucide-react";

interface Manuscript {
  id: string;
  title: string;
  era: string;
  language: string;
  description: string | null;
  contentUrl: string | null;
  coverUrl: string | null;
}

const ERAS = [
  { key: "VEDIC", label: "Vedic", date: "1500 BCE", color: "#D97706" },
  { key: "MAURYAN", label: "Mauryan", date: "300 BCE", color: "#6B7280" },
  { key: "GUPTA", label: "Gupta", date: "320 CE", color: "#B45309" },
  { key: "SOLANKI", label: "Solanki", date: "940 CE", color: "#DC2626" },
  { key: "MUGHAL", label: "Mughal", date: "1526 CE", color: "#059669" },
  { key: "MODERN", label: "Modern", date: "1947 CE", color: "#1E40AF" },
];

const LANGUAGES = ["All", "Sanskrit", "Gujarati", "Hindi", "English"];

const VIRTUAL_TOURS = [
  {
    name: "Modhera Sun Temple",
    location: "Mehsana, Gujarat",
    description:
      "Built in 1026 CE by Bhimdev I of the Solanki dynasty. The temple is renowned for its intricate carvings, the Surya Kund stepwell, and precise solar alignment during equinoxes.",
    image: "/datasets/covers/manuscript-modhera.svg",
  },
  {
    name: "Adalaj Stepwell",
    location: "Adalaj, Gujarat",
    description:
      "A stunning five-storey stepwell (vav) built in 1498, blending Hindu and Islamic architectural styles. Its ornate carvings depict mythological scenes and floral motifs.",
    image: "/datasets/covers/manuscript-saurashtra-folk.svg",
  },
];

export default function IKSHeritagePage() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [activeEra, setActiveEra] = useState("VEDIC");
  const [activeLanguage, setActiveLanguage] = useState("All");
  const [loading, setLoading] = useState(true);
  const [tourMessage, setTourMessage] = useState<string | null>(null);

  const fetchManuscripts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("era", activeEra);
    if (activeLanguage !== "All") {
      params.set("language", activeLanguage);
    }

    try {
      const res = await fetch(`/api/manuscripts?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setManuscripts(data.manuscripts);
    } catch {
      setManuscripts([]);
    } finally {
      setLoading(false);
    }
  }, [activeEra, activeLanguage]);

  useEffect(() => {
    fetchManuscripts();
  }, [fetchManuscripts]);

  const currentEra = ERAS.find((e) => e.key === activeEra)!;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Indian Knowledge Systems
        </h1>
        <p className="text-gray-500 mt-1">
          Explore India&apos;s rich intellectual heritage through manuscripts,
          scriptures, and virtual tours
        </p>
      </div>

      {/* Timeline Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Historical Timeline
        </h2>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200" />

          <div className="relative flex justify-between">
            {ERAS.map((era, index) => {
              const isActive = era.key === activeEra;
              return (
                <button
                  key={era.key}
                  onClick={() => setActiveEra(era.key)}
                  className="flex flex-col items-center gap-2 relative z-10 group"
                >
                  {/* Dot */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? "scale-110 shadow-lg"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: era.color,
                            borderColor: era.color,
                          }
                        : undefined
                    }
                  >
                    <span
                      className={`text-xs font-bold ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <p
                      className={`text-sm font-semibold ${
                        isActive ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {era.label}
                    </p>
                    <p
                      className={`text-xs ${
                        isActive ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {era.date}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Language Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600 mr-2">
          Language:
        </span>
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLanguage(lang)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeLanguage === lang
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={
              activeLanguage === lang
                ? { backgroundColor: currentEra.color }
                : undefined
            }
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Featured Manuscripts */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ScrollText className="h-5 w-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">
            {currentEra.label} Era Manuscripts
          </h2>
          <Badge
            className="text-white text-xs"
            style={{ backgroundColor: currentEra.color }}
          >
            {currentEra.date}
          </Badge>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : manuscripts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <ScrollText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              No manuscripts found for this era and language combination.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manuscripts.map((ms) => (
              <div
                key={ms.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Cover Image */}
                <div className="relative h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {ms.coverUrl ? (
                    <Image
                      src={ms.coverUrl}
                      alt={ms.title}
                      width={180}
                      height={260}
                      className="h-full w-auto object-contain group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <ScrollText className="h-16 w-16 text-gray-300" />
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {ms.title}
                    </h3>
                    <Badge variant="outline" className="text-gray-600 shrink-0 text-xs">
                      {ms.language}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {ms.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: currentEra.color }}
                    >
                      <Eye className="h-4 w-4" />
                      View Manuscript
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 360 Virtual Tours */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="h-5 w-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">
            360° Virtual Tours
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIRTUAL_TOURS.map((tour) => (
            <div
              key={tour.name}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  width={140}
                  height={200}
                  className="h-40 w-auto object-contain opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-semibold text-white text-lg">
                    {tour.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {tour.location}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4">
                  {tour.description}
                </p>
                <button
                  onClick={() => {
                    setTourMessage(tour.name);
                    setTimeout(() => setTourMessage(null), 3000);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
                >
                  <Landmark className="h-4 w-4" />
                  Start 360° Tour
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon toast */}
        {tourMessage && (
          <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-xl text-sm animate-in fade-in slide-in-from-bottom-4 z-50">
            360° Virtual Tour for <strong>{tourMessage}</strong> — Coming Soon!
          </div>
        )}
      </div>
    </div>
  );
}
