"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  Flag,
  Eraser,
  ChevronRight,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface Option {
  label: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  marks: number;
  negativeMarks: number;
  subject: string | null;
}

interface TestData {
  id: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  examCategory: { name: string; icon: string | null };
  questions: Question[];
}

interface QuestionResult {
  id: string;
  text: string;
  options: Option[];
  correctAnswer: string;
  userAnswer: string | null;
  marks: number;
  negativeMarks: number;
  subject: string | null;
}

interface SubmitResult {
  score: number;
  totalMarks: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  negativeMarksApplied: number;
  subjectBreakdown: Record<
    string,
    { correct: number; incorrect: number; total: number; score: number }
  >;
  questionResults: QuestionResult[];
}

type QuestionStatus = "not-visited" | "answered" | "not-answered" | "marked";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function MockTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;

  const [test, setTest] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Exam state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [statuses, setStatuses] = useState<Record<string, QuestionStatus>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [startedAt] = useState(new Date().toISOString());
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch test data
  useEffect(() => {
    async function fetchTest() {
      try {
        const res = await fetch(`/api/tests/${testId}`);
        if (!res.ok) throw new Error("Test not found");
        const data = await res.json();
        setTest(data.test);
        setTimeLeft(data.test.durationMinutes * 60);

        // Initialize statuses
        const initialStatuses: Record<string, QuestionStatus> = {};
        data.test.questions.forEach((q: Question, i: number) => {
          initialStatuses[q.id] = i === 0 ? "not-answered" : "not-visited";
        });
        setStatuses(initialStatuses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load test");
      } finally {
        setLoading(false);
      }
    }
    fetchTest();
  }, [testId]);

  // Timer countdown
  useEffect(() => {
    if (!test || result) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, result]);

  const handleSubmit = useCallback(async () => {
    if (!test || submitting) return;
    setSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      const res = await fetch(`/api/tests/${testId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, startedAt }),
      });
      if (!res.ok) throw new Error("Submit failed");
      const data: SubmitResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitting(false);
    }
  }, [test, testId, answers, startedAt, submitting]);

  const selectAnswer = (questionId: string, label: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: label }));
    setStatuses((prev) => ({ ...prev, [questionId]: "answered" }));
  };

  const clearResponse = () => {
    if (!test) return;
    const qId = test.questions[currentIndex].id;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setStatuses((prev) => ({ ...prev, [qId]: "not-answered" }));
  };

  const markForReview = () => {
    if (!test) return;
    const qId = test.questions[currentIndex].id;
    setStatuses((prev) => ({ ...prev, [qId]: "marked" }));
    goToNext();
  };

  const goToNext = () => {
    if (!test) return;
    const nextIdx = Math.min(currentIndex + 1, test.questions.length - 1);
    setCurrentIndex(nextIdx);
    const nextQId = test.questions[nextIdx].id;
    setStatuses((prev) => {
      if (prev[nextQId] === "not-visited") {
        return { ...prev, [nextQId]: "not-answered" };
      }
      return prev;
    });
  };

  const goToQuestion = (idx: number) => {
    if (!test) return;
    setCurrentIndex(idx);
    const qId = test.questions[idx].id;
    setStatuses((prev) => {
      if (prev[qId] === "not-visited") {
        return { ...prev, [qId]: "not-answered" };
      }
      return prev;
    });
  };

  // Count statuses
  const statusCounts = test
    ? test.questions.reduce(
        (acc, q) => {
          const s = statuses[q.id] || "not-visited";
          acc[s] = (acc[s] || 0) + 1;
          return acc;
        },
        {} as Record<QuestionStatus, number>
      )
    : { answered: 0, "not-answered": 0, "not-visited": 0, marked: 0 };

  // ── Loading state ──────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            {error || "Test not found"}
          </h2>
          <button
            onClick={() => router.push("/test-prep")}
            className="text-blue-600 hover:underline text-sm"
          >
            Back to Test Prep
          </button>
        </div>
      </div>
    );
  }

  // ── Results page ───────────────────────────────────────────────────────────

  if (result) {
    return <ResultsView test={test} result={result} />;
  }

  // ── Exam interface ─────────────────────────────────────────────────────────

  const currentQuestion = test.questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id];
  const isTimeLow = timeLeft < 300; // less than 5 min

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header bar */}
      <div className="bg-navy text-white px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-sm sm:text-base">
            {test.title}
          </h1>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${
            isTimeLow
              ? "bg-red-600 animate-pulse"
              : "bg-white/10"
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>TIME LEFT: {formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Section + marks info */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center justify-between">
        <span className="text-sm text-blue-600 font-medium">
          Section: {currentQuestion.subject || "General"}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
            +{currentQuestion.marks} Marks
          </span>
          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">
            -{currentQuestion.negativeMarks} Negative
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Question area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Question number */}
            <div className="mb-4">
              <span className="text-sm font-semibold text-red-500">
                Question No. {currentIndex + 1}
              </span>
              <span className="text-xs text-slate-400 ml-2">
                of {test.questions.length}
              </span>
            </div>

            {/* Question text */}
            <p className="text-base text-slate-800 leading-relaxed mb-6">
              {currentQuestion.text}
            </p>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = currentAnswer === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => selectAnswer(currentQuestion.id, opt.label)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold shrink-0 ${
                        isSelected
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-slate-300 text-slate-500"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-sm text-slate-700">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="border-t border-slate-200 bg-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={markForReview}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <Flag className="h-4 w-4" />
                Mark for Review & Next
              </button>
              <button
                onClick={clearResponse}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Eraser className="h-4 w-4" />
                Clear Response
              </button>
            </div>
            <button
              onClick={goToNext}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save & Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right sidebar: question palette */}
        <div className="w-72 bg-white border-l border-slate-200 flex flex-col overflow-y-auto shrink-0 hidden lg:flex">
          {/* Student info */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold">
              RS
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">
                Rahul Sharma
              </div>
              <div className="text-xs text-slate-500">ID: 2026-GMC-882</div>
            </div>
          </div>

          {/* Status legend */}
          <div className="p-4 border-b border-slate-200 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">
                {statusCounts.answered || 0}
              </span>
              <span className="text-slate-600">Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">
                {statusCounts["not-answered"] || 0}
              </span>
              <span className="text-slate-600">Not Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded bg-slate-300 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                {statusCounts["not-visited"] || 0}
              </span>
              <span className="text-slate-600">Not Visited</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded bg-orange-400 text-white flex items-center justify-center text-[10px] font-bold">
                {statusCounts.marked || 0}
              </span>
              <span className="text-slate-600">Marked</span>
            </div>
          </div>

          {/* Summary cards */}
          <div className="p-4 border-b border-slate-200 grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {statusCounts.answered || 0}
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                Answered
              </div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-500">
                {statusCounts.marked || 0}
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                Marked
              </div>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-500">
                {statusCounts["not-answered"] || 0}
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                Skipped
              </div>
            </div>
            <div className="text-center p-2 bg-slate-50 rounded-lg">
              <div className="text-lg font-bold text-slate-500">
                {statusCounts["not-visited"] || 0}
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                Remaining
              </div>
            </div>
          </div>

          {/* Question grid */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="text-xs text-slate-500 font-medium mb-3">
              {test.examCategory.name} (1-{test.questions.length})
            </div>
            <div className="grid grid-cols-5 gap-2">
              {test.questions.map((q, idx) => {
                const status = statuses[q.id] || "not-visited";
                const isCurrent = idx === currentIndex;
                let bgClass = "bg-slate-200 text-slate-600"; // not-visited
                if (status === "answered")
                  bgClass = "bg-green-500 text-white";
                if (status === "not-answered")
                  bgClass = "bg-red-500 text-white";
                if (status === "marked")
                  bgClass = "bg-orange-400 text-white";

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    className={`w-full aspect-square rounded-lg text-xs font-bold flex items-center justify-center transition-all ${bgClass} ${
                      isCurrent ? "ring-2 ring-navy ring-offset-1" : ""
                    } hover:opacity-90`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit button */}
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="w-full py-3 bg-navy text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors uppercase tracking-wide"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar with submit */}
      <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-2 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {statusCounts.answered || 0}/{test.questions.length} answered
        </span>
        <button
          onClick={() => setShowConfirmSubmit(true)}
          className="px-4 py-2 bg-navy text-white font-bold text-xs rounded-lg uppercase"
        >
          Submit Test
        </button>
      </div>

      {/* Confirm submit modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <h3 className="text-lg font-semibold text-slate-800">
                Submit Test?
              </h3>
            </div>
            <div className="text-sm text-slate-600 mb-4 space-y-1">
              <p>
                Answered:{" "}
                <span className="font-semibold text-green-600">
                  {statusCounts.answered || 0}
                </span>
              </p>
              <p>
                Unanswered:{" "}
                <span className="font-semibold text-red-600">
                  {(statusCounts["not-answered"] || 0) +
                    (statusCounts["not-visited"] || 0)}
                </span>
              </p>
              <p>
                Marked for review:{" "}
                <span className="font-semibold text-orange-600">
                  {statusCounts.marked || 0}
                </span>
              </p>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to submit? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  handleSubmit();
                }}
                disabled={submitting}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-slate-800 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Results View Component ───────────────────────────────────────────────────

function ResultsView({
  test,
  result,
}: {
  test: TestData;
  result: SubmitResult;
}) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const scorePct = Math.round((result.score / result.totalMarks) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-navy text-white px-6 py-4">
        <h1 className="font-semibold">{test.title} — Results</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Score card */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center">
          <div className="relative w-36 h-36 mx-auto mb-4">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 120 120"
            >
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
                stroke={scorePct >= 60 ? "#10B981" : scorePct >= 40 ? "#F59E0B" : "#EF4444"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(scorePct / 100) * 314} 314`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-navy">{scorePct}%</span>
              <span className="text-xs text-slate-500">Score</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-navy mb-1">
            {result.score} / {result.totalMarks}
          </h2>
          <p className="text-sm text-slate-500">Total Score</p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">
                  {result.correct}
                </span>
              </div>
              <span className="text-xs text-slate-500">Correct</span>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-lg font-bold text-red-600">
                  {result.incorrect}
                </span>
              </div>
              <span className="text-xs text-slate-500">Incorrect</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-lg font-bold text-slate-500 mb-1">
                {result.unanswered}
              </div>
              <span className="text-xs text-slate-500">Unanswered</span>
            </div>
          </div>

          {result.negativeMarksApplied > 0 && (
            <p className="text-xs text-red-500 mt-3">
              Negative marks applied: -{result.negativeMarksApplied.toFixed(2)}
            </p>
          )}
        </div>

        {/* Subject breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Subject-wise Performance
          </h3>
          <div className="space-y-3">
            {Object.entries(result.subjectBreakdown).map(
              ([subject, data]) => {
                const pct =
                  data.total > 0
                    ? Math.round((data.correct / data.total) * 100)
                    : 0;
                return (
                  <div key={subject}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-700 font-medium">
                        {subject}
                      </span>
                      <span className="text-slate-500">
                        {data.correct}/{data.total} correct ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          pct >= 75
                            ? "bg-green-500"
                            : pct >= 50
                              ? "bg-blue-500"
                              : pct >= 25
                                ? "bg-amber-500"
                                : "bg-red-500"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Question-wise details toggle */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-semibold text-slate-800">
              Question-wise Review
            </h3>
            <ChevronRight
              className={`h-5 w-5 text-slate-400 transition-transform ${showDetails ? "rotate-90" : ""}`}
            />
          </button>

          {showDetails && (
            <div className="mt-4 space-y-4">
              {result.questionResults.map((q, idx) => {
                const isCorrect = q.userAnswer === q.correctAnswer;
                const isUnanswered = !q.userAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border ${
                      isUnanswered
                        ? "border-slate-200 bg-slate-50"
                        : isCorrect
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-xs font-bold text-slate-500 mt-0.5">
                        Q{idx + 1}
                      </span>
                      <p className="text-sm text-slate-800">
                        {q.text}
                      </p>
                    </div>
                    <div className="ml-8 space-y-1">
                      {q.options.map((opt) => {
                        let optClass = "text-slate-600";
                        if (opt.label === q.correctAnswer) {
                          optClass = "text-green-700 font-semibold";
                        } else if (
                          opt.label === q.userAnswer &&
                          opt.label !== q.correctAnswer
                        ) {
                          optClass =
                            "text-red-700 font-semibold line-through";
                        }
                        return (
                          <div
                            key={opt.label}
                            className={`text-xs ${optClass}`}
                          >
                            {opt.label}. {opt.text}
                            {opt.label === q.correctAnswer && " ✓"}
                            {opt.label === q.userAnswer &&
                              opt.label !== q.correctAnswer &&
                              " ✗"}
                          </div>
                        );
                      })}
                      {isUnanswered && (
                        <span className="text-xs text-slate-400 italic">
                          Not attempted
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Back button */}
        <div className="text-center">
          <button
            onClick={() => router.push("/test-prep")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Test Prep
          </button>
        </div>
      </div>
    </div>
  );
}
