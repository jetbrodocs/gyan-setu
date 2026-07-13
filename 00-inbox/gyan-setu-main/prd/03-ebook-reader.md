# Module 3: eBook Reader

**Reference Screenshot**: `slides/04-ebook-reader.png`

## Description
Full-featured eBook reader with AI Reading Companion. Key demo differentiator — the AI companion actually reads the book and answers questions.

## Content Source
- Public domain book texts (e.g., Project Gutenberg)
- Text-based display (not scanned pages)
- Graphics included where available from source
- Normalization approach TBD during build

## User Flow
1. Book Detail Page → "Read" button → eBook Reader
2. Read book content with interactive tools
3. Optionally interact with AI Reading Companion

## Specifications

### Reader Layout (per screenshot)
- **Left Panel**: Table of Contents sidebar with Chapters, Notes, Marks tabs
- **Main Area**: Book text content with chapter headings
- **Right Panel**: AI Reading Companion chatbot
- **Bottom**: Reading progress bar (page X of Y, chapter, completion %)

### Reader Toolbar
- Depends on available framework — use existing eBook reader library (e.g., epub.js, ReadiumJS)
- If framework provides font size, TTS, bookmarks out of the box, include them
- Don't build complex reader features from scratch

### Text Interactions
- **Highlight**: Functional, persists to database per user
- **Note**: Functional, persists to database per user
- **Ask AI**: Opens/sends to AI Reading Companion panel
- **Translate**: Routes to AI Reading Companion for translation (no separate translation API)

### AI Reading Companion (Key Feature)
- Real LLM integration via Agent SDK
- Architecture: Book text stored as files on server → Agent SDK (Claude) with tool access → searches/greps book content → answers user questions contextually
- Handles both Q&A and translation requests
- Chat-style interface in the right panel
