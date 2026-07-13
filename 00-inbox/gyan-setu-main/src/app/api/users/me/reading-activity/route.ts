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

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const activity = await prisma.readingActivity.findMany({
    where: {
      userId: user.id,
      date: { gte: thirtyDaysAgo },
    },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(activity);
}
