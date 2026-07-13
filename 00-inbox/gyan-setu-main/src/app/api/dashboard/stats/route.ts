import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [bookCount, audiobookCount, testCount, videoCount] = await Promise.all([
    prisma.book.count(),
    prisma.audiobook.count(),
    prisma.test.count(),
    prisma.video.count(),
  ]);

  return NextResponse.json({
    totalBooks: bookCount,
    totalAudiobooks: audiobookCount,
    totalTests: testCount,
    totalVideos: videoCount,
  });
}
