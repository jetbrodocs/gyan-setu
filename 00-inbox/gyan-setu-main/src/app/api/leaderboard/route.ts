import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entries = await prisma.leaderboardEntry.findMany({
    orderBy: { rank: "asc" },
    include: {
      user: {
        select: { name: true, avatarUrl: true },
      },
    },
    take: 10,
  });

  return NextResponse.json({ entries });
}
