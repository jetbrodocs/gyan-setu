import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let user;
  try {
    user = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const recording = await prisma.podcastRecording.findUnique({
    where: { id },
  });

  if (!recording || recording.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.podcastRecording.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.seriesId !== undefined && { seriesId: body.seriesId }),
      ...(body.audioUrl !== undefined && { audioUrl: body.audioUrl }),
    },
  });

  return NextResponse.json({ recording: updated });
}
