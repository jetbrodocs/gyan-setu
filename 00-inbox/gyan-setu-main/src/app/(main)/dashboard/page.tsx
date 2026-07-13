import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatsCard } from "@/components/shared/stats-card";
import { BookCard } from "@/components/shared/book-card";
import {
  BookOpen,
  Clock,
  FileCheck,
  Award,
  Flame,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  const user = session!.user;

  const [userStats, platformStats, trending, readingProgress] =
    await Promise.all([
      prisma.userStats.findUnique({ where: { userId: user.id } }),
      prisma.book.count(),
      prisma.trendingContent.findMany({ orderBy: { position: "asc" } }),
      prisma.readingProgress.findMany({
        where: { userId: user.id },
        include: { book: true },
        orderBy: { updatedAt: "desc" },
        take: 2,
      }),
    ]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 rounded-xl p-6 text-white overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute right-0 top-0 h-full" viewBox="0 0 400 200" fill="none">
            <circle cx="350" cy="100" r="120" fill="white" />
            <circle cx="280" cy="50" r="80" fill="white" />
            <circle cx="320" cy="160" r="60" fill="white" />
            <rect x="200" y="20" width="150" height="150" rx="20" fill="white" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold">
            Welcome Back, {user.name.split(" ")[0]}!
          </h2>
          <p className="text-indigo-100 text-sm mt-1 max-w-lg">
            Enhance your knowledge with AI-driven recommendations. You have{" "}
            {platformStats.toLocaleString()} books to explore!
          </p>
        </div>
      </div>

      {/* Continue Reading */}
      {readingProgress.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-navy mb-3">Continue Reading</h3>
          <div className="flex gap-4">
            {readingProgress.map((progress) => (
              <Link
                key={progress.id}
                href={`/reader/${progress.bookId}`}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex-1 max-w-sm"
              >
                <div className="h-12 w-9 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-navy truncate">
                    {progress.book.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{
                          width: `${Math.round((progress.currentPage / progress.totalPages) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">
                      {Math.round((progress.currentPage / progress.totalPages) * 100)}%
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard
          icon={BookOpen}
          value={platformStats.toLocaleString()}
          label="eBooks"
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatsCard
          icon={Clock}
          value={userStats?.podcastHours ?? 0}
          label="Reading Hours"
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatsCard
          icon={FileCheck}
          value={userStats?.testsTaken ?? 0}
          label="Tests"
          iconColor="text-amber-600"
          iconBg="bg-amber-100"
        />
        <StatsCard
          icon={Award}
          value={userStats?.certificates ?? 0}
          label="Certificates"
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
      </div>

      {/* Trending Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-navy">
              Trending in Gandhinagar
            </h3>
          </div>
          <Link href="/library">
            <Button variant="link" className="text-blue-500 text-sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {trending.map((item) => (
            <Link key={item.id} href={`/library/${item.contentId}`}>
              <BookCard title={item.title} coverUrl={item.coverUrl} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
