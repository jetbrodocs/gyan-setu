# Module 4: Audiobook Player

**Reference Screenshot**: `slides/05-audiobook-player.png`

## Description
Audio playback for public domain audiobooks with chapter navigation and speed control.

## Data Source
- Public domain audiobooks (e.g., LibriVox)
- Audio files with chapter metadata

## User Flow
1. Audiobooks section → Browse audiobooks
2. Select audiobook → Audiobook Player

## Specifications

### Player Layout (per screenshot)
- Large cover art display
- Chapter info (current chapter, part X of Y)
- Waveform visualization (decorative — real waveform only if framework provides it cheaply)
- Timeline with current position / total duration
- Right sidebar: Chapters queue with timestamps
- Bottom: "You May Also Like" recommendations from seed data

### Playback Controls
- Use existing audio player framework/library
- **Play/Pause**: Functional
- **Rewind/Forward**: Functional (skip back/forward)
- **Speed Control**: 0.75x, 1.0x, 1.25x, 1.5x, 2.0x
- **Chapter Navigation**: Click chapters in sidebar to jump
- **No shuffle** — removed from PRD (doesn't make sense for audiobooks)
- Download, Like, Share buttons: Visual-only
