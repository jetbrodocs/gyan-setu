# Module 9: Indian Knowledge Systems (IKS Heritage)

**Reference Screenshot**: `slides/11-iks-heritage.png`

## Description
Explore India's heritage through digitized manuscripts, oral traditions, and virtual tours. Content organized by historical era.

## Data Source
- Public manuscripts/scriptures dataset
- Tagged by historical period: Vedic Era (1500 BCE), Mauryan (300 BCE), Gupta (320 CE), Solanki (940 CE), Mughal (1526 CE), Modern (1947 CE)
- Presented as readable articles within each era

## User Flow
1. IKS Heritage → Timeline selector
2. Click era → View manuscripts/articles from that period
3. Click item → Read content

## Specifications

### Timeline (per screenshot)
- Horizontal timeline with 6 eras
- **Functional filter** — clicking an era shows manuscripts from that period
- Visually matches screenshot layout

### Content Area
- Manuscripts/scriptures displayed as articles
- Featured content cards (e.g., Saurashtra Ni Rasdhar with play button)
- Language options shown: English, Gujarati, Sanskrit (English-only functional, consistent with app-wide decision)

### 360° Virtual Tours
- Tour cards displayed (Modhera Sun Temple, Adalaj Stepwell)
- "Start 360° Tour" buttons shown
- **Placeholder functionality** — low priority
- If an off-the-shelf WebXR/panorama library makes it easy, explore it
- Otherwise, defer actual 360° experience

### Folk & Oral Traditions
- Can reuse audiobook player infrastructure if audio content is available in seed data
