import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");

  const where: Prisma.StemCourseWhereInput = {};

  if (category) {
    where.category = category;
  }

  const [courses, categoriesRaw] = await Promise.all([
    prisma.stemCourse.findMany({ where, orderBy: { title: "asc" } }),
    prisma.stemCourse.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    }),
  ]);

  return NextResponse.json({
    courses,
    categories: categoriesRaw.map((c) => c.category),
  });
}
