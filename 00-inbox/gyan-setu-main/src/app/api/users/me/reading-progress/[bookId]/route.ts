import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  let user;
  try { user = await requireAuth(); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookId } = await params;
  const { currentPage, totalPages } = await request.json();

  if (currentPage == null || totalPages == null) {
    return NextResponse.json({ error: "currentPage and totalPages required" }, { status: 400 });
  }

  const progress = await prisma.readingProgress.upsert({
    where: { userId_bookId: { userId: user.id, bookId } },
    update: { currentPage, totalPages },
    create: { userId: user.id, bookId, currentPage, totalPages },
  });

  return NextResponse.json({ progress });
}
