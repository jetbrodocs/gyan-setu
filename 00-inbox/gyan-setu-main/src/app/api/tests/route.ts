import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const categoryId = searchParams.get("categoryId");

  const where = categoryId ? { examCategoryId: categoryId } : {};

  const tests = await prisma.test.findMany({
    where,
    orderBy: { title: "asc" },
    include: {
      examCategory: { select: { name: true, icon: true } },
    },
  });

  return NextResponse.json({ tests });
}
