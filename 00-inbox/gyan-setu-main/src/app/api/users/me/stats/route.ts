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

  const stats = await prisma.userStats.findUnique({
    where: { userId: user.id },
  });

  if (!stats) {
    return NextResponse.json({
      booksRead: 0,
      audiobooksListened: 0,
      testsTaken: 0,
      podcastHours: 0,
      certificates: 0,
    });
  }

  return NextResponse.json(stats);
}
