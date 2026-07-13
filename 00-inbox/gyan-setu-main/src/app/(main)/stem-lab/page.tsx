"use client";

import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Play,
  Trophy,
  Award,
  Users,
  Radio,
  ChevronRight,
  Terminal,
} from "lucide-react";

interface StemCourse {
  id: string;
  title: string;
  moduleNumber: number;
  totalModules: number;
  videoUrl: string;
  description: string | null;
  category: string;
}

interface LeaderboardEntry {
  userId: string;
  xp: number;
  rank: number;
  badgeCount: number;
  user: { name: string; avatarUrl: string | null };
}

const CATEGORY_ICONS: Record<string, string> = {
  "Coding & Dev": "💻",
  "Robotics Kits": "🤖",
  "AI & ML": "🧠",
  "Electronics & IoT": "📡",
  "3D Design": "🎨",
  "Atal Innovation": "💡",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Coding & Dev": "bg-blue-100 text-blue-700 border-blue-200",
  "Robotics Kits": "bg-orange-100 text-orange-700 border-orange-200",
  "AI & ML": "bg-purple-100 text-purple-700 border-purple-200",
  "Electronics & IoT": "bg-green-100 text-green-700 border-green-200",
  "3D Design": "bg-pink-100 text-pink-700 border-pink-200",
  "Atal Innovation": "bg-amber-100 text-amber-700 border-amber-200",
};

const RANK_STYLES = [
  "bg-yellow-100 text-yellow-800 border-yellow-300",
  "bg-gray-100 text-gray-700 border-gray-300",
  "bg-orange-100 text-orange-800 border-orange-300",
];

const DEMO_BADGES = [
  { name: "Python Fundamentals", icon: "🐍" },
  { name: "Web Development Basics", icon: "🌐" },
  { name: "Arduino Certified Maker", icon: "🔧" },
];

const DEMO_CODE = `# Python: Calculate Fibonacci sequence
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
`;

const DEMO_OUTPUT = `F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34`;

function extractVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
  );
  return match ? match[1] : null;
}

export default function STEMLabPage() {
  const [courses, setCourses] = useState<StemCourse[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCourse, setSelectedCourse] = useState<StemCourse | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(DEMO_CODE);
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== "All") {
      params.set("category", activeCategory);
    }

    try {
      const res = await fetch(`/api/stem-courses?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCourses(data.courses);
      setCategories(data.categories);
      if (data.courses.length > 0 && !selectedCourse) {
        setSelectedCourse(data.courses[0]);
      }
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, selectedCourse]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setLeaderboard(data.entries);
    } catch {
      setLeaderboard([]);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const handleRunCode = () => {
    setRunning(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(DEMO_OUTPUT);
      setRunning(false);
    }, 1200);
  };

  const allCategories = ["All", ...categories];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          STEM Innovation Lab
        </h1>
        <p className="text-gray-500 mt-1">
          Learn coding, robotics, AI, and more with interactive courses and
          hands-on projects
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => {
          const isActive = activeCategory === cat;
          const colorClass =
            cat !== "All"
              ? CATEGORY_COLORS[cat] || "bg-gray-100 text-gray-600"
              : "";
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedCourse(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                isActive
                  ? cat === "All"
                    ? "bg-gray-900 text-white border-gray-900"
                    : colorClass + " border-2 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat !== "All" && (
                <span className="mr-1.5">{CATEGORY_ICONS[cat]}</span>
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Course + Editor (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Selection */}
          {loading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Code2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No courses found in this category.
              </p>
            </div>
          ) : (
            <>
              {/* Course List (horizontal scroll) */}
              {courses.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {courses.map((course) => {
                    const isSelected = selectedCourse?.id === course.id;
                    return (
                      <button
                        key={course.id}
                        onClick={() => {
                          setSelectedCourse(course);
                          setOutput(null);
                          setCode(DEMO_CODE);
                        }}
                        className={`flex-shrink-0 px-4 py-3 rounded-lg border text-left transition-all max-w-[280px] ${
                          isSelected
                            ? "bg-blue-50 border-blue-300 shadow-sm"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium truncate ${
                            isSelected ? "text-blue-900" : "text-gray-900"
                          }`}
                        >
                          {course.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Module {course.moduleNumber} of{" "}
                          {course.totalModules}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Video Player */}
              {selectedCourse && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="aspect-video bg-black">
                    {extractVideoId(selectedCourse.videoUrl) ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${extractVideoId(selectedCourse.videoUrl)}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={selectedCourse.title}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Play className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {selectedCourse.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedCourse.description}
                        </p>
                      </div>
                      <Badge
                        className={
                          CATEGORY_COLORS[selectedCourse.category] ||
                          "bg-gray-100 text-gray-600"
                        }
                      >
                        {selectedCourse.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-gray-500">
                        Module {selectedCourse.moduleNumber} of{" "}
                        {selectedCourse.totalModules}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all"
                          style={{
                            width: `${(selectedCourse.moduleNumber / selectedCourse.totalModules) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Code Editor */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-gray-300">
                  Code Editor
                </span>
                <Badge className="bg-green-900/50 text-green-400 text-xs border-green-700">
                  Python
                </Badge>
              </div>
              <button
                onClick={handleRunCode}
                disabled={running}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Play className="h-3.5 w-3.5" />
                {running ? "Running..." : "Run Code"}
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-gray-900 text-green-300 font-mono text-sm p-4 resize-none focus:outline-none min-h-[200px] leading-relaxed"
              spellCheck={false}
            />

            {/* Output Panel */}
            {output !== null && (
              <div className="border-t border-gray-700">
                <div className="px-4 py-2 bg-gray-800">
                  <span className="text-xs font-medium text-gray-400">
                    Output
                  </span>
                </div>
                <pre className="px-4 py-3 text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* My Badges */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-gray-900">My Badges</h3>
            </div>
            <div className="space-y-3">
              {DEMO_BADGES.map((badge) => (
                <div
                  key={badge.name}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-amber-50 border border-amber-100"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {badge.name}
                    </p>
                    <p className="text-xs text-gray-500">Earned</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold text-gray-900">
                Class Leaderboard
              </h3>
            </div>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((entry) => (
                <div
                  key={entry.userId}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border ${
                    entry.rank <= 3
                      ? RANK_STYLES[entry.rank - 1]
                      : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      entry.rank === 1
                        ? "bg-yellow-400 text-yellow-900"
                        : entry.rank === 2
                          ? "bg-gray-400 text-white"
                          : entry.rank === 3
                            ? "bg-orange-400 text-white"
                            : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {entry.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {entry.user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {entry.xp.toLocaleString()} XP
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Award className="h-3.5 w-3.5" />
                    {entry.badgeCount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Workshops */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold text-gray-900">Live Workshops</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-100">
              <Users className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">Coming Soon</p>
              <p className="text-xs text-gray-400 mt-1">
                Live coding workshops and mentorship sessions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
