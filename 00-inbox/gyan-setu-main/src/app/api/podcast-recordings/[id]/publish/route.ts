import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let user;
  try {
    user = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const recording = await prisma.podcastRecording.findUnique({
    where: { id },
  });

  if (!recording || recording.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (recording.status === "PUBLISHED") {
    return NextResponse.json(
      { error: "Already published" },
      { status: 400 }
    );
  }

  if (!recording.seriesId) {
    return NextResponse.json(
      { error: "A series must be selected before publishing" },
      { status: 400 }
    );
  }

  // Create the published podcast episode and link it to the recording
  const podcast = await prisma.podcast.create({
    data: {
      title: recording.title,
      seriesId: recording.seriesId,
      audioUrl: recording.audioUrl || "/audio/placeholder.webm",
      duration: 0, // duration tracked client-side for demo
      publishedAt: new Date(),
    },
  });

  await prisma.podcastRecording.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      podcastId: podcast.id,
    },
  });

  return NextResponse.json({ podcast, recording: { ...recording, status: "PUBLISHED", podcastId: podcast.id } });
}
