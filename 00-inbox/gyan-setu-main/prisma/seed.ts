import { PrismaClient, Role, Tier, Book } from "@prisma/client";
import bcrypt from "bcryptjs";
import { booksData } from "./data/books";
import { audiobooksData } from "./data/audiobooks";
import { newspapersData } from "./data/newspapers";
import { videosData } from "./data/videos";
import {
  examCategoriesData,
  testsData,
  questionsData,
  testPerformanceData,
  testAttemptsData,
} from "./data/exams";
import { podcastSeriesData, podcastsData } from "./data/podcasts";
import { manuscriptsData } from "./data/manuscripts";
import {
  stemCoursesData,
  leaderboardData,
  certificatesData,
} from "./data/stem";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.$transaction([
    prisma.readingActivity.deleteMany(),
    prisma.certificate.deleteMany(),
    prisma.trendingContent.deleteMany(),
    prisma.leaderboardEntry.deleteMany(),
    prisma.testPerformance.deleteMany(),
    prisma.userStats.deleteMany(),
    prisma.podcastRecording.deleteMany(),
    prisma.bookshelfItem.deleteMany(),
    prisma.testAttempt.deleteMany(),
    prisma.readingProgress.deleteMany(),
    prisma.note.deleteMany(),
    prisma.highlight.deleteMany(),
    prisma.bookSummary.deleteMany(),
    prisma.mindMap.deleteMany(),
    prisma.question.deleteMany(),
    prisma.test.deleteMany(),
    prisma.examCategory.deleteMany(),
    prisma.podcast.deleteMany(),
    prisma.podcastSeries.deleteMany(),
    prisma.membershipPlan.deleteMany(),
    prisma.stemCourse.deleteMany(),
    prisma.manuscript.deleteMany(),
    prisma.video.deleteMany(),
    prisma.newspaper.deleteMany(),
    prisma.audiobook.deleteMany(),
    prisma.book.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // === Users ===
  const passwordHash = await bcrypt.hash("demo123", 10);

  const rahul = await prisma.user.create({
    data: {
      name: "Rahul Sharma",
      email: "rahul@demo.com",
      passwordHash,
      role: Role.CITIZEN,
      membershipTier: Tier.STANDARD,
      avatarUrl: null,
      streakDays: 7,
    },
  });

  const mahesh = await prisma.user.create({
    data: {
      name: "Mahesh Joshi",
      email: "mahesh@demo.com",
      passwordHash,
      role: Role.CITIZEN,
      membershipTier: Tier.GOLD,
      avatarUrl: null,
      streakDays: 14,
    },
  });

  const priya = await prisma.user.create({
    data: {
      name: "Priya Patel",
      email: "priya@demo.com",
      passwordHash,
      role: Role.STUDENT,
      membershipTier: Tier.BASIC,
      avatarUrl: null,
      streakDays: 3,
    },
  });

  const teacher = await prisma.user.create({
    data: {
      name: "Meera Desai",
      email: "teacher@demo.com",
      passwordHash,
      role: Role.CREATOR,
      membershipTier: Tier.STANDARD,
      avatarUrl: null,
      streakDays: 21,
    },
  });

  // === Books (from prisma/data/books.ts) ===
  const books: Book[] = [];
  for (const bookData of booksData) {
    const book = await prisma.book.create({ data: bookData });
    books.push(book);
  }

  // === Book Summaries (for books with text files) ===
  for (const book of books) {
    if (book.filePath && book.description) {
      await prisma.bookSummary.create({
        data: {
          bookId: book.id,
          summaryText: book.description,
        },
      });
    }
  }

  // === User Stats ===
  // Note: The dashboard shows platform-wide stats (eBooks: 52,430) from /api/dashboard/stats
  // UserStats tracks personal metrics only
  await prisma.userStats.create({
    data: {
      userId: rahul.id,
      booksRead: 23,
      audiobooksListened: 12,
      testsTaken: 14,
      podcastHours: 128.5,
      certificates: 3,
    },
  });

  await prisma.userStats.create({
    data: {
      userId: mahesh.id,
      booksRead: 47,
      audiobooksListened: 12,
      testsTaken: 24,
      podcastHours: 8.5,
      certificates: 3,
    },
  });

  // === Trending Content (pick 8 popular books across languages) ===
  const trendingIndices = [0, 3, 8, 14, 17, 22, 19, 20]; // Saraswatichandra, Saurashtra, Godan, Atomic Habits, Gandhi, Arthashastra, Wings of Fire, Sapiens
  const trendingBooks = trendingIndices
    .map((i) => books[i])
    .filter(Boolean);
  for (let i = 0; i < trendingBooks.length; i++) {
    await prisma.trendingContent.create({
      data: {
        contentType: "BOOK",
        contentId: trendingBooks[i].id,
        title: trendingBooks[i].title,
        coverUrl: trendingBooks[i].coverUrl,
        metric: `${Math.floor(Math.random() * 5000 + 1000)} reads`,
        position: i + 1,
      },
    });
  }

  // === Reading Progress (Rahul is reading Saraswatichandra) ===
  await prisma.readingProgress.create({
    data: {
      userId: rahul.id,
      bookId: books[0].id, // Saraswatichandra
      currentPage: 145,
      totalPages: 1240,
    },
  });

  await prisma.readingProgress.create({
    data: {
      userId: rahul.id,
      bookId: books[14].id, // Atomic Habits
      currentPage: 120,
      totalPages: 320,
    },
  });

  // === Bookshelf ===
  for (const book of books.slice(0, 5)) {
    await prisma.bookshelfItem.create({
      data: { userId: rahul.id, bookId: book.id },
    });
  }

  // === Audiobooks (from prisma/data/audiobooks.ts) ===
  for (const ab of audiobooksData) {
    await prisma.audiobook.create({ data: ab });
  }

  // === Newspapers (from prisma/data/newspapers.ts) ===
  for (const np of newspapersData) {
    await prisma.newspaper.create({ data: np });
  }

  // === Videos (from prisma/data/videos.ts) ===
  for (const vid of videosData) {
    await prisma.video.create({ data: vid });
  }

  // === Podcast Series & Episodes (by Meera Desai) ===
  const podcastSeriesRecords = [];
  for (const seriesData of podcastSeriesData) {
    const series = await prisma.podcastSeries.create({
      data: { ...seriesData, creatorId: teacher.id },
    });
    podcastSeriesRecords.push(series);
  }

  for (const epData of podcastsData) {
    const { seriesIndex, ...rest } = epData;
    await prisma.podcast.create({
      data: { ...rest, seriesId: podcastSeriesRecords[seriesIndex].id },
    });
  }

  // === Exam Categories, Tests, Questions ===
  const examCategories = [];
  for (const catData of examCategoriesData) {
    const cat = await prisma.examCategory.create({ data: catData });
    examCategories.push(cat);
  }

  const tests = [];
  for (const testData of testsData) {
    const { categoryIndex, ...rest } = testData;
    const test = await prisma.test.create({
      data: { ...rest, examCategoryId: examCategories[categoryIndex].id },
    });
    tests.push(test);
  }

  for (const qData of questionsData) {
    const { testIndex, ...rest } = qData;
    await prisma.question.create({
      data: { ...rest, testId: tests[testIndex].id },
    });
  }

  // === Test Performance (Rahul) ===
  for (const perfData of testPerformanceData) {
    const { categoryIndex, ...rest } = perfData;
    await prisma.testPerformance.create({
      data: {
        ...rest,
        userId: rahul.id,
        examCategoryId: examCategories[categoryIndex].id,
      },
    });
  }

  // === Test Attempts (Rahul) ===
  for (const attemptData of testAttemptsData) {
    const { testIndex, ...rest } = attemptData;
    await prisma.testAttempt.create({
      data: {
        ...rest,
        userId: rahul.id,
        testId: tests[testIndex].id,
      },
    });
  }

  // === Manuscripts (from prisma/data/manuscripts.ts) ===
  for (const ms of manuscriptsData) {
    await prisma.manuscript.create({ data: ms });
  }

  // === STEM Courses (from prisma/data/stem.ts) ===
  for (const course of stemCoursesData) {
    await prisma.stemCourse.create({ data: course });
  }

  // === Leaderboard Entries ===
  const leaderboardUsers = [rahul, priya, mahesh, teacher];
  for (const entry of leaderboardData) {
    // Map first two entries to existing users, create placeholder users for the rest
    let userId: string;
    if (entry.rank === 1) {
      userId = rahul.id;
    } else if (entry.rank === 2) {
      userId = priya.id;
    } else if (entry.rank === 3) {
      const arjun = await prisma.user.create({
        data: {
          name: entry.name,
          email: "arjun@demo.com",
          passwordHash,
          role: Role.STUDENT,
          membershipTier: Tier.BASIC,
          streakDays: 5,
        },
      });
      userId = arjun.id;
    } else if (entry.rank === 4) {
      const sneha = await prisma.user.create({
        data: {
          name: entry.name,
          email: "sneha@demo.com",
          passwordHash,
          role: Role.STUDENT,
          membershipTier: Tier.STANDARD,
          streakDays: 10,
        },
      });
      userId = sneha.id;
    } else {
      const vikram = await prisma.user.create({
        data: {
          name: entry.name,
          email: "vikram@demo.com",
          passwordHash,
          role: Role.CITIZEN,
          membershipTier: Tier.BASIC,
          streakDays: 2,
        },
      });
      userId = vikram.id;
    }

    await prisma.leaderboardEntry.create({
      data: {
        userId,
        xp: entry.xp,
        rank: entry.rank,
        badgeCount: entry.badgeCount,
      },
    });
  }

  // === Certificates (for Rahul) ===
  for (const cert of certificatesData) {
    await prisma.certificate.create({
      data: {
        userId: rahul.id,
        name: cert.name,
        icon: cert.icon,
      },
    });
  }

  // === Reading Activity (30 days for Rahul) ===
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const readingMinutesPattern = [
    45, 60, 0, 30, 90, 75, 120, 15, 0, 55,
    80, 40, 0, 65, 100, 35, 0, 50, 70, 95,
    0, 25, 85, 110, 60, 0, 45, 70, 55, 90,
  ];
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (29 - i));
    await prisma.readingActivity.create({
      data: {
        userId: rahul.id,
        date,
        minutes: readingMinutesPattern[i],
      },
    });
  }

  // === Membership Plans ===
  await prisma.membershipPlan.createMany({
    data: [
      {
        name: "BASIC",
        price: 0,
        tier: Tier.BASIC,
        isPopular: false,
        features: [
          "Digital Catalog Access",
          "5 eBook Downloads/month",
          "Newspaper Archive (7 days)",
        ],
      },
      {
        name: "STANDARD",
        price: 99,
        tier: Tier.STANDARD,
        isPopular: false,
        features: [
          "Unlimited Digital Reading",
          "Full Audiobook Library",
          "Full Newspaper Archive",
          "5 Mock Tests/month",
          "Basic AI Summaries",
        ],
      },
      {
        name: "GOLD",
        price: 199,
        tier: Tier.GOLD,
        isPopular: true,
        features: [
          "All Standard Features",
          "Unlimited Mock Tests & Analysis",
          "Full AI Summaries & Chat",
          "STEM Lab Premium Content",
          "Offline Mode",
          "Priority Support",
        ],
      },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
