# Module 8: Podcast Creation Studio

**Reference Screenshot**: `slides/09-podcast-studio.png`

## Description
Two-sided module: creators (teachers) record/upload audio content, consumers browse and listen to podcasts.

## Data Source
- Seeded podcast content (public domain audio or sample recordings)
- Metadata: series name, episode title, subscriber count, language

## User Flow

### Creator Flow
1. Podcast Studio → Recording Studio
2. Record audio via browser microphone OR upload existing audio file
3. (Low priority) Publish flow → appears in My Podcasts

### Consumer Flow
1. Podcast Studio → Browse seeded podcasts
2. Select podcast/episode → Listen

## Specifications

### Recording Studio (per screenshot)
- Episode title input
- Recording timer
- Live waveform visualization (decorative OK)
- **Recording controls**: Pause, Record, Stop — functional via browser microphone
- **Noise Cancellation toggle**: Visual-only
- **Background Music selector**: Visual-only
- **AI Auto-Transcription**: Not functional (skipped for demo)
- **Upload Existing Audio**: Functional file upload

### My Podcasts (right panel)
- Stats: Listeners, Episodes, Rating (from seed)
- Series list with episode count, subscribers, language tags
- "+ New Series" button

### Podcast Listening (consumer side)
- Browse seeded podcasts
- Play episodes (reuse audio player framework from Audiobook module)

### Publish Flow (Low Priority)
- If built: Record → Save → Appears in My Podcasts list
- Minimal validation — this is a super admin/creator feature
- Build only if time permits
