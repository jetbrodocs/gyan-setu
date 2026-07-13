import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const test = await prisma.test.findUnique({
    where: { id },
    include: {
      examCategory: { select: { name: true, icon: true } },
      questions: {
        select: {
          id: true,
          text: true,
          options: true,
          marks: true,
          negativeMarks: true,
          subject: true,
        },
        orderBy: { id: "asc" },
      },
    },
  });

  if (!test) {
    return NextResponse.json({ error: "Test not found" }, { status: 404 });
  }

  return NextResponse.json({ test });
}
