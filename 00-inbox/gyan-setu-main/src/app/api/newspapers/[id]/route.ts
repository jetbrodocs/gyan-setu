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

  const newspaper = await prisma.newspaper.findUnique({
    where: { id },
  });

  if (!newspaper) {
    return NextResponse.json(
      { error: "Newspaper not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ newspaper });
}
