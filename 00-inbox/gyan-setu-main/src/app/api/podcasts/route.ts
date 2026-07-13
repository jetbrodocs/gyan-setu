import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const seriesId = searchParams.get("seriesId");
  const search = searchParams.get("search");

  const where: Prisma.PodcastWhereInput = {};

  if (seriesId) {
    where.seriesId = seriesId;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { series: { name: { contains: search, mode: "insensitive" } } },
    ];
  }

  // Only show published episodes (those with a publishedAt date)
  where.publishedAt = { not: null };

  const podcasts = await prisma.podcast.findMany({
    where,
    include: {
      series: {
        select: { id: true, name: true, language: true, subscriberCount: true },
      },
    },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json({ podcasts });
}
