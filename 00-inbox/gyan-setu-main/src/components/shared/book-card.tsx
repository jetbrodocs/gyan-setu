import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface BookCardProps {
  title: string;
  author?: string;
  language?: string;
  coverUrl?: string | null;
  rating?: number;
  format?: string;
}

const LANG_CODES: Record<string, string> = {
  Gujarati: "GJ",
  Hindi: "HI",
  English: "EN",
  Sanskrit: "SA",
};

export function BookCard({
  title,
  author,
  language,
  coverUrl,
  rating,
  format,
}: BookCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {/* Cover */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="200px"
          />
        ) : (
          <span className="text-sm text-blue-300 font-medium text-center px-2">
            {title}
          </span>
        )}
        {/* Language badge */}
        {language && (
          <Badge className="absolute top-2 left-2 bg-navy text-white text-[10px] px-1.5 py-0.5">
            {LANG_CODES[language] || language.slice(0, 2).toUpperCase()}
          </Badge>
        )}
        {/* Format badge */}
        {format && (
          <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] px-1.5 py-0.5">
            {format}
          </Badge>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-navy truncate">{title}</h3>
        {author && (
          <p className="text-xs text-slate-500 truncate">{author}</p>
        )}
        {rating != null && rating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="text-xs text-slate-600">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
