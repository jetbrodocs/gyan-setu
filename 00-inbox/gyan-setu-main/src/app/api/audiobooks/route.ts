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
  const language = searchParams.get("language");
  const search = searchParams.get("search");

  const where: Prisma.AudiobookWhereInput = {};

  if (language) {
    where.language = { in: language.split(",") };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
      { narrator: { contains: search, mode: "insensitive" } },
    ];
  }

  const audiobooks = await prisma.audiobook.findMany({
    where,
    orderBy: { title: "asc" },
  });

  // Get distinct values for filter options
  const languages = await prisma.audiobook.findMany({
    select: { language: true },
    distinct: ["language"],
  });

  return NextResponse.json({
    audiobooks,
    filters: {
      languages: languages.map((l) => l.language),
    },
  });
}
