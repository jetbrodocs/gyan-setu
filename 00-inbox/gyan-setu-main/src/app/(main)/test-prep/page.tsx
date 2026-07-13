import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TestPrepClient } from "./test-prep-client";

export default async function TestPrepPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userId = session.user.id;

  // Fetch all data in parallel
  const [categories, questionOfDay, performance, attempts] = await Promise.all([
    prisma.examCategory.findMany({
      orderBy: { name: "asc" },
      include: { tests: { select: { id: true } } },
    }),
    prisma.question.findFirst({
      where: { isQuestionOfDay: true },
      include: { test: { select: { examCategory: { select: { name: true } } } } },
    }),
    prisma.testPerformance.findMany({
      where: { userId },
    }),
    prisma.testAttempt.count({
      where: { userId },
    }),
  ]);

  // Compute aggregate performance
  const avgReadiness =
    performance.length > 0
      ? Math.round(
          performance.reduce((sum, p) => sum + p.readinessPct, 0) /
            performance.length
        )
      : 0;
  const avgScore =
    performance.length > 0
      ? Math.round(
          performance.reduce((sum, p) => sum + p.avgScore, 0) /
            performance.length
        )
      : 0;
  const bestRank =
    performance.length > 0
      ? Math.min(...performance.map((p) => p.rank))
      : 0;

  // Merge all subject scores across categories
  const subjectScoresAgg: Record<string, { total: number; count: number }> = {};
  for (const perf of performance) {
    const scores = perf.subjectScores as Record<string, number>;
    for (const [subject, score] of Object.entries(scores)) {
      if (!subjectScoresAgg[subject]) {
        subjectScoresAgg[subject] = { total: 0, count: 0 };
      }
      subjectScoresAgg[subject].total += score;
      subjectScoresAgg[subject].count += 1;
    }
  }
  const subjectScores: Record<string, number> = {};
  for (const [subject, agg] of Object.entries(subjectScoresAgg)) {
    subjectScores[subject] = Math.round(agg.total / agg.count);
  }

  return (
    <TestPrepClient
      categories={categories.map((c) => ({
        id: c.id,
        name: c.name,
        icon: c.icon,
        testCount: c.testCount,
        userCount: c.userCount,
        testIds: c.tests.map((t) => t.id),
      }))}
      questionOfDay={
        questionOfDay
          ? {
              id: questionOfDay.id,
              text: questionOfDay.text,
              options: questionOfDay.options as { label: string; text: string }[],
              correctAnswer: questionOfDay.correctAnswer,
              category: questionOfDay.test.examCategory.name,
            }
          : null
      }
      performanceStats={{
        readinessPct: avgReadiness,
        testsAttempted: attempts,
        avgScore,
        nationalRank: bestRank,
        subjectScores,
      }}
    />
  );
}
