import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const audiobook = await prisma.audiobook.findUnique({
    where: { id },
  });

  if (!audiobook) {
    return NextResponse.json(
      { error: "Audiobook not found" },
      { status: 404 }
    );
  }

  // Also fetch other audiobooks for "You May Also Like"
  const related = await prisma.audiobook.findMany({
    where: { id: { not: id } },
    take: 4,
  });

  return NextResponse.json({ audiobook, related });
}
