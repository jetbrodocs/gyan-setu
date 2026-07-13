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
  const city = searchParams.get("city");
  const date = searchParams.get("date");
  const publication = searchParams.get("publication");

  const where: Prisma.NewspaperWhereInput = {};

  if (language) {
    where.language = { in: language.split(",") };
  }
  if (city) {
    where.city = { in: city.split(",") };
  }
  if (publication) {
    where.publication = { in: publication.split(",") };
  }
  if (date) {
    // Match newspapers on the given date (start of day to end of day)
    const d = new Date(date);
    const nextDay = new Date(d);
    nextDay.setDate(nextDay.getDate() + 1);
    where.date = { gte: d, lt: nextDay };
  }

  const newspapers = await prisma.newspaper.findMany({
    where,
    orderBy: { date: "desc" },
  });

  // Get distinct values for filter options
  const [languages, cities, publications] = await Promise.all([
    prisma.newspaper.findMany({
      select: { language: true },
      distinct: ["language"],
    }),
    prisma.newspaper.findMany({
      select: { city: true },
      distinct: ["city"],
    }),
    prisma.newspaper.findMany({
      select: { publication: true },
      distinct: ["publication"],
    }),
  ]);

  return NextResponse.json({
    newspapers,
    filters: {
      languages: languages.map((l) => l.language),
      cities: cities.map((c) => c.city),
      publications: publications.map((p) => p.publication),
    },
  });
}
