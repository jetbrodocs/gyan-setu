import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trending = await prisma.trendingContent.findMany({
    orderBy: { position: "asc" },
  });

  return NextResponse.json({ trending });
}
