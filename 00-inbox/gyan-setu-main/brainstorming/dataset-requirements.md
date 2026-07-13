# Dataset Requirements

Track all public datasets needed for seeding the demo. Status updated as datasets are sourced.

## Status Legend
- 🔴 Not sourced
- 🟡 Researching options
- 🟢 Found & confirmed
- ✅ Integrated into seed

## Datasets Needed

| # | Module | Data Type | Notes | Status |
|---|--------|-----------|-------|--------|
| 1 | Digital Library | Books catalog (title, author, category, rating, cover image, description) | 27 books in prisma/data/books.ts, 25 SVG covers in public/datasets/covers/ | ✅ |
| 2 | eBook Reader | Full text of books | 12 sample texts in public/datasets/texts/ (demo excerpts ~2K words each) | ✅ |
| 3 | Audiobook Player | Audio files with chapter metadata | 9 LibriVox audiobooks in prisma/data/audiobooks.ts, 9 SVG covers, streaming via archive.org M4B/MP3 URLs | ✅ |
| 4 | Newspapers & Periodicals | Newspaper-style page layouts (PDFs or images) | 10 newspaper SVGs in public/datasets/newspapers/ (4 Gujarati, 2 Hindi, 4 English), prisma/data/newspapers.ts | ✅ |
| 5 | Test Prep Hub | Exam questions (MCQ with answers, categories, subjects) | Indian competitive exam datasets on Kaggle | 🔴 |
| 6 | Test Prep Hub | User test history + performance stats | Seed/generate for demo users, materialized views | 🔴 |
| 7 | Podcast Studio | Podcast audio files with metadata (title, series, episodes) | Public domain audio or sample recordings | 🔴 |
| 8 | IKS Heritage | Manuscripts/scriptures dataset with historical period tags | Need to categorize by era (Vedic, Mauryan, Gupta, Solanki, Mughal, Modern) | 🔴 |
| 9 | STEM Lab | Tutorial video links + course structure (modules/lessons) | YouTube or public coding tutorials for Python, Scratch, Robotics etc. | 🔴 |
| 10 | Video Library | Educational videos with metadata (title, teacher, subject, category) | 14 YouTube videos in prisma/data/videos.ts across 6 categories, Hindi/English mix | ✅ |
