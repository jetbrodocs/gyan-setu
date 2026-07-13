import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Calendar, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookDetailTabs } from "./tabs";

const LANG_CODES: Record<string, string> = {
  Gujarati: "GJ",
  Hindi: "HI",
  English: "EN",
  Sanskrit: "SA",
};

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  await requireAuth();
  const { bookId } = await params;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: {
      bookSummary: true,
    },
  });

  if (!book) {
    notFound();
  }

  const langCode = LANG_CODES[book.language] || book.language.slice(0, 2).toUpperCase();

  return (
    <div className="flex gap-8">
      {/* Left panel: book info */}
      <div className="w-[280px] shrink-0 space-y-4">
        {/* Cover */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl overflow-hidden shadow-md">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="280px"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-sm text-blue-300 font-medium text-center px-4">
                {book.title}
              </span>
            </div>
          )}
        </div>

        {/* Title & Author */}
        <div>
          <h1 className="text-xl font-bold text-navy">{book.title}</h1>
          <p className="text-sm text-slate-500 mt-1">by {book.author}</p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-navy text-white text-xs px-2 py-0.5">
            {langCode}
          </Badge>
          <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5">
            {book.format}
          </Badge>
          {book.collection && (
            <Badge variant="outline" className="text-slate-600 text-xs px-2 py-0.5">
              {book.collection}
            </Badge>
          )}
        </div>

        {/* Rating, Year, Page Count */}
        <div className="flex items-center gap-4 text-sm text-slate-600">
          {book.rating > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="text-slate-700 font-medium">{book.rating.toFixed(1)}</span>
            </span>
          )}
          {book.year && (
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="text-slate-700">{book.year}</span>
            </span>
          )}
          {book.pageCount > 0 && (
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-slate-400" />
              <span className="text-slate-700">{book.pageCount} pages</span>
            </span>
          )}
        </div>

        {/* Read Now button */}
        {book.filePath && (
          <Link
            href={`/reader/${book.id}`}
            className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Read Now
          </Link>
        )}
      </div>

      {/* Right panel: tabs */}
      <div className="flex-1 min-w-0">
        <BookDetailTabs
          summaryText={book.bookSummary?.summaryText ?? null}
          description={book.description}
        />
      </div>
    </div>
  );
}
