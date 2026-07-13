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
  const summary = await prisma.bookSummary.findUnique({
    where: { bookId: id },
  });

  if (!summary) {
    return NextResponse.json({ error: "Summary not found" }, { status: 404 });
  }

  return NextResponse.json({ summary });
}
