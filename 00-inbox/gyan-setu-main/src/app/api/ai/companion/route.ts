import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAnthropicClient } from "@/lib/ai";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message, bookId, chapterContent } = await request.json();

  if (!message || !bookId) {
    return NextResponse.json(
      { error: "Message and bookId required" },
      { status: 400 }
    );
  }

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const anthropic = getAnthropicClient();

  // Use chapter content for context, fall back to file or description
  let context = chapterContent || "";
  if (!context && book.filePath) {
    try {
      const filePath = path.join(process.cwd(), "public", book.filePath);
      const fullText = await fs.readFile(filePath, "utf-8");
      context = fullText.slice(0, 8000);
    } catch {
      context = book.description || "";
    }
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are an AI Reading Companion for "${book.title}" by ${book.author}. You help readers understand the book by answering questions, explaining passages, translating text, and providing context. Be concise and helpful. If asked to translate, translate the passage to the requested language.\n\nCurrent reading context:\n\n${context}`,
      messages: [{ role: "user", content: message }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("AI Companion error:", error);
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
