import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let user;
  try {
    user = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const recordings = await prisma.podcastRecording.findMany({
    where: { userId: user.id },
    include: {
      series: { select: { id: true, name: true } },
      podcast: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ recordings });
}

export async function POST(request: NextRequest) {
  let user;
  try {
    user = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, seriesId, audioUrl } = body;

  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const recording = await prisma.podcastRecording.create({
    data: {
      userId: user.id,
      title,
      seriesId: seriesId || null,
      audioUrl: audioUrl || null,
      status: "DRAFT",
    },
  });

  return NextResponse.json({ recording }, { status: 201 });
}
