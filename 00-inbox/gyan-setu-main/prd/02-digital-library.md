# Module 2: Digital Library (eBook Catalog)

**Reference Screenshot**: `slides/03-digital-library.png`, `slides/10-ai-book-summaries.png`

## Description
Browse and search the eBook catalog. Includes the book detail/summary page (formerly "AI Book Summaries" in the original PRD — this is NOT a separate module).

## Data Source
- Public book dataset (e.g., Kaggle, Open Library, Google Books)
- Categories and genres driven by whatever the dataset provides
- Book metadata: title, author, cover image, category, rating, description, format

## User Flow
1. Digital Library page → Browse/search/filter books
2. Click book card → Book Detail/Summary Page
3. Click "Read" → eBook Reader (Module 3)

## Specifications

### Catalog Page
- **Grid view** of book cards matching screenshot layout
- **Filters**: Driven by dataset categories (language, format, collection, year range as shown in screenshot)
- **Sorting**: 1-2 functional options (e.g., Rating, New Arrivals). All options shown in dropdown but only these wired up.
- **Search**: Functional within the library catalog

### Book Card
- Cover image, title, author, language tag, rating, format badge (EPUB/PDF/Audio)
- "Read Now" button

### Book Detail/Summary Page (slides/10-ai-book-summaries.png)
This page is the "AI Book Summaries" view — accessed when clicking a book card.

- **Overview tab**: Pre-generated summary from seed data. Book description, metadata, AI confidence score.
- **Mind Map tab**: Generated live by LLM on first click. Cached in database for subsequent visits.
- **Quiz tab**: Generated live by LLM via Agent SDK. Gives the agent the book file as context, generates 4-5 MCQ questions on the fly.
- **"Read" button**: Opens eBook Reader (Module 3)
- **"Listen to AI Audio Summary" button**: TBD / low priority
