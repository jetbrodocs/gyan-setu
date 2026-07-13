import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseBookText } from "@/lib/book-parser";
import { ReaderClient } from "./reader-client";

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const session = await getSession();
  if (!session) {
    notFound();
  }

  const { bookId } = await params;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book || !book.filePath) {
    notFound();
  }

  // Read text file
  const filePath = path.join(process.cwd(), "public", book.filePath);
  let text: string;
  try {
    text = await fs.readFile(filePath, "utf-8");
  } catch {
    notFound();
  }

  // Parse into chapters
  const chapters = parseBookText(text);

  // Get user's reading progress
  const progress = await prisma.readingProgress.findUnique({
    where: {
      userId_bookId: {
        userId: session.user.id,
        bookId: book.id,
      },
    },
  });

  // ReadingProgress.currentPage currently stores page numbers from seeded data.
  // Convert to chapter index: if currentPage < chapters.length, use it directly;
  // otherwise estimate chapter from page/totalPages ratio.
  let initialChapter = 0;
  if (progress && progress.totalPages > 0) {
    const fraction = progress.currentPage / progress.totalPages;
    initialChapter = Math.max(
      0,
      Math.min(Math.floor(fraction * chapters.length), chapters.length - 1)
    );
  }

  return (
    <ReaderClient
      bookId={book.id}
      bookTitle={book.title}
      author={book.author}
      chapters={chapters}
      initialChapterIndex={initialChapter}
    />
  );
}
