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
  const format = searchParams.get("format");
  const collection = searchParams.get("collection");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "rating";

  const where: Prisma.BookWhereInput = {};

  if (language) {
    where.language = { in: language.split(",") };
  }
  if (format) {
    where.format = { in: format.split(",") };
  }
  if (collection) {
    where.collection = { in: collection.split(",") };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy: Prisma.BookOrderByWithRelationInput =
    sort === "year" ? { year: "desc" } : { rating: "desc" };

  const books = await prisma.book.findMany({ where, orderBy });

  // Get distinct values for filter options
  const [languages, formats, collections] = await Promise.all([
    prisma.book.findMany({ select: { language: true }, distinct: ["language"] }),
    prisma.book.findMany({ select: { format: true }, distinct: ["format"] }),
    prisma.book.findMany({
      select: { collection: true },
      distinct: ["collection"],
      where: { collection: { not: null } },
    }),
  ]);

  return NextResponse.json({
    books,
    filters: {
      languages: languages.map((l) => l.language),
      formats: formats.map((f) => f.format),
      collections: collections.map((c) => c.collection).filter(Boolean),
    },
  });
}
