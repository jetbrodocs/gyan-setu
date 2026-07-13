"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  Trophy,
  Target,
  Hash,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: string | null;
  testCount: number;
  userCount: number;
  testIds: string[];
}

interface QuestionOfDay {
  id: string;
  text: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  category: string;
}

interface PerformanceStats {
  readinessPct: number;
  testsAttempted: number;
  avgScore: number;
  nationalRank: number;
  subjectScores: Record<string, number>;
}

interface Props {
  categories: Category[];
  questionOfDay: QuestionOfDay | null;
  performanceStats: PerformanceStats;
}

function formatUserCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k Users`;
  return `${count} Users`;
}

const CATEGORY_BG: Record<string, string> = {
  "Banking & IBPS": "bg-blue-50 border-blue-200",
  "GATE Engineering": "bg-orange-50 border-orange-200",
  "GPSC Gujarat": "bg-emerald-50 border-emerald-200",
  "JEE / NEET Prep": "bg-purple-50 border-purple-200",
  "SSC CGL / CHSL": "bg-amber-50 border-amber-200",
  "UPSC Civil Services": "bg-red-50 border-red-200",
};

export function TestPrepClient({
  categories,
  questionOfDay,
  performanceStats,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQodResult, setShowQodResult] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleSubmitQod = () => {
    if (!selectedAnswer) return;
    setShowQodResult(true);
  };

  const isQodCorrect = selectedAnswer === questionOfDay?.correctAnswer;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Test Preparation Hub</h1>
        <p className="text-sm text-slate-500 mt-1">
          Practice with mock tests for India&apos;s top competitive exams
        </p>
      </div>

      {/* Main grid: Categories + Right panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Exam Categories */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Exam Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const bgClass =
                CATEGORY_BG[cat.name] || "bg-slate-50 border-slate-200";
              return (
                <div key={cat.id} className="relative">
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === cat.id ? null : cat.id
                      )
                    }
                    className={`w-full text-left p-5 rounded-xl border ${bgClass} hover:shadow-md transition-shadow`}
                  >
                    <div className="text-3xl mb-3">{cat.icon}</div>
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {cat.testCount} Tests
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {formatUserCount(cat.userCount)}
                      </span>
                    </div>
                  </button>

                  {/* Expanded: show tests */}
                  {expandedCategory === cat.id && cat.testIds.length > 0 && (
                    <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-slate-200 p-2">
                      {cat.testIds.map((testId, idx) => (
                        <Link
                          key={testId}
                          href={`/mock-test/${testId}`}
                          className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <span>Test {idx + 1}</span>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Question of the Day */}
        <div className="space-y-4">
          {questionOfDay && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">
                  Question of the Day
                </h3>
                <span className="text-xs text-blue-600 font-medium">
                  {questionOfDay.category}
                </span>
              </div>
              <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                {questionOfDay.text}
              </p>
              <div className="space-y-2">
                {questionOfDay.options.map((opt) => {
                  let optionClass =
                    "border-slate-200 hover:border-blue-400 hover:bg-blue-50";
                  if (showQodResult) {
                    if (opt.label === questionOfDay.correctAnswer) {
                      optionClass =
                        "border-green-500 bg-green-50 text-green-800";
                    } else if (
                      opt.label === selectedAnswer &&
                      opt.label !== questionOfDay.correctAnswer
                    ) {
                      optionClass = "border-red-500 bg-red-50 text-red-800";
                    } else {
                      optionClass = "border-slate-200 opacity-60";
                    }
                  } else if (selectedAnswer === opt.label) {
                    optionClass = "border-blue-500 bg-blue-50";
                  }

                  return (
                    <button
                      key={opt.label}
                      onClick={() => {
                        if (!showQodResult) setSelectedAnswer(opt.label);
                      }}
                      disabled={showQodResult}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg border transition-colors ${optionClass}`}
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current text-xs font-semibold shrink-0">
                        {opt.label}
                      </span>
                      <span className="text-left">{opt.text}</span>
                      {showQodResult &&
                        opt.label === questionOfDay.correctAnswer && (
                          <CheckCircle2 className="h-4 w-4 ml-auto text-green-600 shrink-0" />
                        )}
                      {showQodResult &&
                        opt.label === selectedAnswer &&
                        opt.label !== questionOfDay.correctAnswer && (
                          <XCircle className="h-4 w-4 ml-auto text-red-600 shrink-0" />
                        )}
                    </button>
                  );
                })}
              </div>
              {!showQodResult && (
                <button
                  onClick={handleSubmitQod}
                  disabled={!selectedAnswer}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Answer
                </button>
              )}
              {showQodResult && (
                <div
                  className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
                    isQodCorrect
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  {isQodCorrect
                    ? "Correct! Well done."
                    : `Incorrect. The correct answer is ${questionOfDay.correctAnswer}.`}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* My Performance */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">My Performance</h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Readiness donut */}
            <div className="flex flex-col items-center justify-center lg:col-span-1">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(performanceStats.readinessPct / 100) * 314} 314`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-navy">
                    {performanceStats.readinessPct}%
                  </span>
                  <span className="text-xs text-slate-500 uppercase tracking-wide">
                    Ready
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 mt-2">
                Overall Readiness
              </span>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4 lg:col-span-2">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50">
                <Target className="h-5 w-5 text-blue-600 mb-1" />
                <span className="text-xl font-bold text-navy">
                  {performanceStats.testsAttempted}
                </span>
                <span className="text-xs text-slate-500 text-center">
                  Tests Attempted
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50">
                <Trophy className="h-5 w-5 text-gold mb-1" />
                <span className="text-xl font-bold text-navy">
                  {performanceStats.avgScore}%
                </span>
                <span className="text-xs text-slate-500 text-center">
                  Avg. Score
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50">
                <Hash className="h-5 w-5 text-green-600 mb-1" />
                <span className="text-xl font-bold text-navy">
                  #{performanceStats.nationalRank.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 text-center">
                  National Rank
                </span>
              </div>
            </div>

            {/* Subject-wise progress bars */}
            <div className="lg:col-span-2 space-y-3">
              {Object.entries(performanceStats.subjectScores)
                .sort(([, a], [, b]) => b - a)
                .map(([subject, score]) => (
                  <div key={subject}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-700 font-medium">
                        {subject}
                      </span>
                      <span className="text-slate-500">{score}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          score >= 75
                            ? "bg-green-500"
                            : score >= 60
                              ? "bg-blue-500"
                              : score >= 40
                                ? "bg-amber-500"
                                : "bg-red-500"
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
