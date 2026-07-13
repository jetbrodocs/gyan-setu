// Podcast seed data — 3 series, 10 episodes
// All created by Meera Desai (teacher@demo.com, CREATOR role)

export const podcastSeriesData = [
  {
    name: "Virasat Heritage Talks",
    description:
      "Exploring Gujarat's rich cultural heritage through stories of monuments, art, and traditions passed down through generations.",
    language: "Gujarati",
    subscriberCount: 850,
    coverUrl: null,
  },
  {
    name: "Vigyan Varta",
    description:
      "Hindi science podcast making complex scientific concepts accessible to everyday listeners — from space to biology.",
    language: "Hindi",
    subscriberCount: 1200,
    coverUrl: null,
  },
  {
    name: "Bhagavad Gita Saar",
    description:
      "Verse-by-verse exploration of the Bhagavad Gita in Sanskrit with clear commentary and practical life lessons.",
    language: "Sanskrit",
    subscriberCount: 350,
    coverUrl: null,
  },
];

// Episodes reference their series by index (0, 1, 2)
export const podcastsData = [
  // ── Virasat Heritage Talks (seriesIndex: 0) ───────────────────────────
  {
    seriesIndex: 0,
    title: "Rani Ki Vav — The Inverted Temple",
    audioUrl:
      "https://archive.org/download/gitanjali_1002_librivox/gitanjali_01_tagore_64kb.mp3",
    duration: 1245, // ~20 min
    publishedAt: new Date("2025-11-10"),
  },
  {
    seriesIndex: 0,
    title: "Adalaj Stepwell — Geometry in Stone",
    audioUrl:
      "https://archive.org/download/gitanjali_1002_librivox/gitanjali_02_tagore_64kb.mp3",
    duration: 980, // ~16 min
    publishedAt: new Date("2025-11-24"),
  },
  {
    seriesIndex: 0,
    title: "Modhera Sun Temple — Tracking the Solstice",
    audioUrl:
      "https://archive.org/download/gitanjali_1002_librivox/gitanjali_03_tagore_64kb.mp3",
    duration: 1560, // ~26 min
    publishedAt: new Date("2025-12-08"),
  },
  {
    seriesIndex: 0,
    title: "Champaner-Pavagadh — A Forgotten Capital",
    audioUrl:
      "https://archive.org/download/gitanjali_1002_librivox/gitanjali_04_tagore_64kb.mp3",
    duration: 1100, // ~18 min
    publishedAt: new Date("2025-12-22"),
  },

  // ── Vigyan Varta (seriesIndex: 1) ─────────────────────────────────────
  {
    seriesIndex: 1,
    title: "Chandrayaan-3 — Bharat Ka Chand Par Kadam",
    audioUrl:
      "https://archive.org/download/sadhana_realisation_librivox/sadhana_01_tagore_64kb.mp3",
    duration: 1800, // 30 min
    publishedAt: new Date("2025-10-15"),
  },
  {
    seriesIndex: 1,
    title: "DNA Se Davai — Gene Therapy Kya Hai?",
    audioUrl:
      "https://archive.org/download/sadhana_realisation_librivox/sadhana_02_tagore_64kb.mp3",
    duration: 1350, // ~22 min
    publishedAt: new Date("2025-11-01"),
  },
  {
    seriesIndex: 1,
    title: "Quantum Computing — Aam Bhasha Mein",
    audioUrl:
      "https://archive.org/download/sadhana_realisation_librivox/sadhana_03_tagore_64kb.mp3",
    duration: 1620, // 27 min
    publishedAt: new Date("2025-11-18"),
  },

  // ── Bhagavad Gita Saar (seriesIndex: 2) ───────────────────────────────
  {
    seriesIndex: 2,
    title: "Adhyaya 1 — Arjuna Vishada Yoga",
    audioUrl:
      "https://archive.org/download/bhagavad_gita_0803_librivox/bhagavadgita_01_arnold_64kb.mp3",
    duration: 900, // 15 min
    publishedAt: new Date("2026-01-05"),
  },
  {
    seriesIndex: 2,
    title: "Adhyaya 2 — Sankhya Yoga",
    audioUrl:
      "https://archive.org/download/bhagavad_gita_0803_librivox/bhagavadgita_02_arnold_64kb.mp3",
    duration: 1080, // 18 min
    publishedAt: new Date("2026-01-19"),
  },
  {
    seriesIndex: 2,
    title: "Adhyaya 3 — Karma Yoga",
    audioUrl:
      "https://archive.org/download/bhagavad_gita_0803_librivox/bhagavadgita_03_arnold_64kb.mp3",
    duration: 960, // 16 min
    publishedAt: new Date("2026-02-02"),
  },
];
