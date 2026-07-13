import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  let user;
  try { user = await requireAuth(); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookId = request.nextUrl.searchParams.get("bookId");
  if (!bookId) return NextResponse.json({ error: "bookId required" }, { status: 400 });

  const notes = await prisma.note.findMany({
    where: { userId: user.id, bookId },
    orderBy: { id: "desc" },
  });
  return NextResponse.json({ notes });
}

export async function POST(request: NextRequest) {
  let user;
  try { user = await requireAuth(); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookId, text, position } = await request.json();
  if (!bookId || !text) {
    return NextResponse.json({ error: "bookId and text required" }, { status: 400 });
  }

  const note = await prisma.note.create({
    data: {
      userId: user.id,
      bookId,
      text,
      position: position || {},
    },
  });
  return NextResponse.json({ note });
}
