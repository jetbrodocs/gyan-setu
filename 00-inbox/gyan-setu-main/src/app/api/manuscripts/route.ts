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
  const era = searchParams.get("era");
  const language = searchParams.get("language");

  const where: Prisma.ManuscriptWhereInput = {};

  if (era) {
    where.era = era;
  }

  if (language) {
    where.language = language;
  }

  const manuscripts = await prisma.manuscript.findMany({
    where,
    orderBy: { title: "asc" },
  });

  return NextResponse.json({ manuscripts });
}
