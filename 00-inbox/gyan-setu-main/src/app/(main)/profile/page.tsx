import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatsCard } from "@/components/shared/stats-card";
import { ReadingActivityChart } from "@/components/profile/reading-activity-chart";
import { BookCard } from "@/components/shared/book-card";
import {
  BookOpen,
  Headphones,
  FileCheck,
  Mic,
  Flame,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getSession();
  const user = session!.user;

  const [
    userStats,
    readingActivity,
    readingProgress,
    certificates,
    bookshelfItems,
    testAttempts,
  ] = await Promise.all([
    prisma.userStats.findUnique({ where: { userId: user.id } }),
    prisma.readingActivity.findMany({
      where: { userId: user.id },
      orderBy: { date: "asc" },
    }),
    prisma.readingProgress.findMany({
      where: { userId: user.id },
      include: { book: true },
      orderBy: { updatedAt: "desc" },
      take: 3,
    }),
    prisma.certificate.findMany({
      where: { userId: user.id },
      orderBy: { earnedAt: "desc" },
    }),
    prisma.bookshelfItem.findMany({
      where: { userId: user.id },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            coverUrl: true,
          },
        },
      },
    }),
    prisma.testAttempt.findMany({
      where: { userId: user.id },
      include: {
        test: {
          select: { title: true },
        },
      },
      orderBy: { startedAt: "desc" },
      take: 5,
    }),
  ]);

  const tierColors: Record<string, { bg: string; text: string; label: string }> = {
    BASIC: { bg: "bg-slate-100", text: "text-slate-600", label: "Basic Member" },
    STANDARD: { bg: "bg-blue-100", text: "text-blue-700", label: "Standard Member" },
    GOLD: { bg: "bg-amber-100", text: "text-amber-700", label: "Gold Member" },
  };

  const tier = tierColors[user.membershipTier] || tierColors.BASIC;

  // Initials for avatar
  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* User Header + Stats Row */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* User Profile Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center text-center min-w-[220px]">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-3">
            {initials}
          </div>
          <h2 className="text-lg font-bold text-navy">{user.name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
          <span
            className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-medium ${tier.bg} ${tier.text}`}
          >
            {user.membershipTier === "GOLD" && (
              <span className="text-amber-500">&#9733;</span>
            )}
            {tier.label}
          </span>

          {/* Current Streak */}
          <div className="mt-4 bg-slate-50 rounded-lg px-4 py-3 w-full">
            <div className="flex items-center justify-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Current Streak
                </p>
                <p className="text-xl font-bold text-navy">
                  {user.streakDays} Days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={BookOpen}
            value={userStats?.booksRead ?? 0}
            label="Books Read"
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />
          <StatsCard
            icon={Headphones}
            value={userStats?.audiobooksListened ?? 0}
            label="Audiobooks"
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
          />
          <StatsCard
            icon={FileCheck}
            value={userStats?.testsTaken ?? 0}
            label="Tests Taken"
            iconColor="text-green-600"
            iconBg="bg-green-100"
          />
          <StatsCard
            icon={Mic}
            value={`${userStats?.podcastHours ?? 0}h`}
            label="Podcast Time"
            iconColor="text-amber-600"
            iconBg="bg-amber-100"
          />
        </div>
      </div>

      {/* Reading Activity + Currently Reading */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reading Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-navy mb-4">
            Reading Activity (Last 30 Days)
          </h3>
          {readingActivity.length > 0 ? (
            <ReadingActivityChart
              data={readingActivity.map((a) => ({
                id: a.id,
                date: a.date.toISOString(),
                minutes: a.minutes,
              }))}
            />
          ) : (
            <p className="text-sm text-slate-400 text-center py-10">
              No reading activity yet
            </p>
          )}
        </div>

        {/* Currently Reading */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy">
              Currently Reading
            </h3>
            <Link
              href="/library"
              className="text-xs text-blue-500 hover:text-blue-600 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {readingProgress.length > 0 ? (
              readingProgress.map((progress) => {
                const pct = Math.round(
                  (progress.currentPage / progress.totalPages) * 100
                );
                return (
                  <Link
                    key={progress.id}
                    href={`/reader/${progress.bookId}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
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
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">
                          {pct}%
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {progress.currentPage}/{progress.totalPages} Pages
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 flex-shrink-0" />
                  </Link>
                );
              })
            ) : (
              <p className="text-sm text-slate-400 text-center py-4">
                No books in progress
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Earned Certificates + My Bookshelf + Recent Test History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earned Certificates */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy">
              Earned Certificates
            </h3>
            <span className="text-xs text-slate-400">
              {certificates.length} total
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col items-center text-center p-3 rounded-lg bg-slate-50"
                >
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-lg mb-2">
                    {cert.icon || <Award className="h-5 w-5 text-indigo-500" />}
                  </div>
                  <p className="text-[11px] font-medium text-navy leading-tight">
                    {cert.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-sm text-slate-400 text-center py-4">
                No certificates earned yet
              </p>
            )}
          </div>
        </div>

        {/* My Bookshelf */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy">
              My Bookshelf (Saved)
            </h3>
            <Link
              href="/library"
              className="text-xs text-blue-500 hover:text-blue-600 font-medium"
            >
              Manage
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {bookshelfItems.length > 0 ? (
              bookshelfItems.slice(0, 6).map((item) => (
                <Link key={item.id} href={`/library/${item.book.id}`}>
                  <BookCard
                    title={item.book.title}
                    coverUrl={item.book.coverUrl}
                  />
                </Link>
              ))
            ) : (
              <p className="col-span-3 text-sm text-slate-400 text-center py-4">
                No saved books yet
              </p>
            )}
          </div>
        </div>

        {/* Recent Test History */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy">
              Recent Test History
            </h3>
            <Link
              href="/test-prep"
              className="text-xs text-blue-500 hover:text-blue-600 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-0">
            {/* Table Header */}
            <div className="flex items-center text-[10px] uppercase tracking-wider text-slate-400 font-medium pb-2 border-b border-slate-100">
              <span className="flex-1">Test Name</span>
              <span className="w-16 text-right">Score</span>
            </div>
            {testAttempts.length > 0 ? (
              testAttempts.map((attempt) => {
                const pct = Math.round(
                  (attempt.score / attempt.totalMarks) * 100
                );
                const scoreColor =
                  pct >= 80
                    ? "text-green-600 bg-green-50"
                    : pct >= 50
                      ? "text-amber-600 bg-amber-50"
                      : "text-red-600 bg-red-50";
                return (
                  <div
                    key={attempt.id}
                    className="flex items-center py-2.5 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-navy font-medium truncate">
                        {attempt.test.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(attempt.startedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-md ${scoreColor}`}
                    >
                      {pct}%
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400 text-center py-4">
                No test attempts yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
