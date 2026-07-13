import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let user;
  try {
    user = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const performance = await prisma.testPerformance.findMany({
    where: { userId: user.id },
  });

  const attempts = await prisma.testAttempt.findMany({
    where: { userId: user.id },
    include: {
      test: {
        select: {
          title: true,
          examCategory: { select: { name: true } },
        },
      },
    },
    orderBy: { startedAt: "desc" },
  });

  return NextResponse.json({ performance, attempts });
}
