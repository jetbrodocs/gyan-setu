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
  const creatorId = searchParams.get("creatorId");

  const where: Prisma.PodcastSeriesWhereInput = {};
  if (creatorId) {
    where.creatorId = creatorId;
  }

  const series = await prisma.podcastSeries.findMany({
    where,
    include: {
      _count: { select: { podcasts: true } },
      creator: { select: { id: true, name: true } },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ series });
}

export async function POST(request: NextRequest) {
  let user;
  try {
    user = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, description, language } = body;

  if (!name || !language) {
    return NextResponse.json(
      { error: "Name and language are required" },
      { status: 400 }
    );
  }

  const series = await prisma.podcastSeries.create({
    data: {
      name,
      description: description || null,
      language,
      creatorId: user.id,
    },
    include: {
      _count: { select: { podcasts: true } },
      creator: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json({ series }, { status: 201 });
}
