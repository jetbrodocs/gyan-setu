import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categories = await prisma.examCategory.findMany({
    orderBy: { name: "asc" },
    include: {
      tests: {
        select: { id: true },
      },
    },
  });

  return NextResponse.json({ categories });
}
