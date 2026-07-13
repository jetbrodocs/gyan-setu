import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface SubmitBody {
  answers: Record<string, string>; // questionId -> selected answer label
  startedAt: string;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let user;
  try {
    user = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: testId } = await params;
  const body: SubmitBody = await request.json();
  const { answers, startedAt } = body;

  // Fetch test with questions (including correctAnswer for scoring)
  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: {
      questions: true,
      examCategory: { select: { name: true } },
    },
  });

  if (!test) {
    return NextResponse.json({ error: "Test not found" }, { status: 404 });
  }

  // Calculate score
  let totalScore = 0;
  let totalMarks = 0;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  const subjectBreakdown: Record<
    string,
    { correct: number; incorrect: number; total: number; score: number }
  > = {};

  for (const question of test.questions) {
    const subject = question.subject || "General";
    if (!subjectBreakdown[subject]) {
      subjectBreakdown[subject] = { correct: 0, incorrect: 0, total: 0, score: 0 };
    }
    subjectBreakdown[subject].total += 1;
    totalMarks += question.marks;

    const userAnswer = answers[question.id];
    if (!userAnswer) {
      unanswered += 1;
    } else if (userAnswer === question.correctAnswer) {
      correct += 1;
      totalScore += question.marks;
      subjectBreakdown[subject].correct += 1;
      subjectBreakdown[subject].score += question.marks;
    } else {
      incorrect += 1;
      totalScore -= question.negativeMarks;
      subjectBreakdown[subject].incorrect += 1;
      subjectBreakdown[subject].score -= question.negativeMarks;
    }
  }

  // Ensure score doesn't go below 0
  totalScore = Math.max(0, Math.round(totalScore * 100) / 100);

  // Save attempt
  const attempt = await prisma.testAttempt.create({
    data: {
      userId: user.id,
      testId,
      score: totalScore,
      totalMarks,
      answers,
      startedAt: startedAt ? new Date(startedAt) : new Date(),
      completedAt: new Date(),
    },
  });

  // Build per-question results (for results page)
  const questionResults = test.questions.map((q) => ({
    id: q.id,
    text: q.text,
    options: q.options,
    correctAnswer: q.correctAnswer,
    userAnswer: answers[q.id] || null,
    marks: q.marks,
    negativeMarks: q.negativeMarks,
    subject: q.subject,
  }));

  return NextResponse.json({
    attemptId: attempt.id,
    score: totalScore,
    totalMarks,
    correct,
    incorrect,
    unanswered,
    negativeMarksApplied: Math.round((incorrect * test.questions[0]?.negativeMarks || 0) * 100) / 100,
    subjectBreakdown,
    questionResults,
  });
}
