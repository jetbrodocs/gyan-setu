# Module 5: Newspapers & Periodicals

**Reference Screenshot**: `slides/06-newspapers-periodicals.png`

## Description
Archive of newspapers, magazines, and journals with full-page newspaper-style viewer.

## Data Source
- Public news API or dataset
- Content presented in newspaper-style full-page layouts (not article cards)
- Need sources that provide page-layout content (PDFs or images)

## User Flow
1. Periodicals section → Browse by category (Newspapers / Magazines / Journals)
2. Apply filters (date, language, city) → Select publication
3. View full-page newspaper layout in reader

## Specifications

### Browse Page (per screenshot)
- **Top Tabs**: Newspapers, Magazines, Journals, Access Archives
- **Filters** (all functional against seeded data):
  - Language filter (Gujarati, Hindi, English)
  - City filter (Gandhinagar, All Gujarat)
  - Date picker (calendar with selectable dates)
- **Publication List**: Thumbnail, name, edition, date, language

### Viewer
- Magazine/document reader library (e.g., PDF viewer, flipbook library)
- Full-page newspaper-style layout — must feel like reading an actual newspaper
- Zoom functionality if framework provides it
- Tools (Clip, Translate, Share, Download PDF): Visual-only for demo
