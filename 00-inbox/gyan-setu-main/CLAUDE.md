# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Gyaan Setu** ("Knowledge Bridge") is an AI-driven digital library platform for Gandhinagar Smart City Development Ltd. The goal is to build a **stakeholder demo prototype** — not the full production system. The repository currently contains only planning documents; no application code exists yet.

- **Client**: Gandhinagar Smart City Development Ltd.
- **Platforms**: Web Portal (primary for demo), Mobile App (iOS/Android), Digital Kiosk
- **Target Users**: Citizens of Gandhinagar — students, professionals, seniors, government employees
- **Two-sided model**: Content creators publish; consumers browse and consume

## Source Documents

- `Gyaan_Setu_PRD.docx` — Full PRD with 16 module specifications, user roles, technical requirements
- `PRD_CONTENTS_SUMMARY.txt` — Text summary of the PRD (readable without Word)
- `Gyaan_Setu_Presentation.pdf` — 17-slide stakeholder presentation
- `slides/` — Individual slide screenshots from the presentation

## Core Modules (16 total, per PRD)

1. **Dashboard** — Welcome banner, stats cards, trending content, AI recommendations
2. **Digital Library** — eBook catalog with search, filters, book cards with ratings
3. **eBook Reader** — TOC sidebar, AI Reading Companion chatbot, highlights/notes, TTS, WCAG badge
4. **Audiobook Player** — Waveform visualization, speed control (0.75x-2.0x), chapter queue
5. **Newspapers & Periodicals** — Archive with date/language/city filters, full-page viewer
6. **Test Preparation Hub** — Exam categories (UPSC, GPSC, SSC, Banking, GATE, JEE/NEET), performance dashboard
7. **Mock Test Interface** — Full-screen exam mode, countdown timer, MCQ panel, answer navigation
8. **Podcast Creation Studio** — Recording with waveform, noise cancellation, AI auto-transcription
9. **AI Book Summaries** — Confidence scores, Neural TTS, multiple formats (Quick/Detailed/Mind Map/Quiz)
10. **Indian Knowledge Systems (IKS)** — Historical timeline (1500 BCE–1947 CE), 360° virtual tours, scriptures
11. **STEM Innovation Lab** — Code editor + video lessons, execution sandbox, badges, leaderboard
12. **User Profile/Dashboard** — Reading streak, stats, certificates, bookshelf, activity chart
13. **Membership Plans** — BASIC (free), STANDARD (₹99/mo), GOLD (₹199/mo); 50% student/senior discount
14. **Admin Analytics** — KPI cards, DAU trends, content distribution, heatmaps, geographic map, exports
15. **Kiosk UI** — Portrait mode, voice search, 6 large touch tiles
16. **Mobile App** — Offline access, push notifications, cross-device sync

**Note**: A "Video Library" module is planned but not yet documented in the existing files.

## Design System

- **Colors**: Navy `#1E293B`, Blue `#3B82F6`, Gold `#F59E0B`, Green `#10B981`, Red `#EF4444`, Light Gray `#F3F4F6`
- **Typography**: Arial, clear hierarchy
- **Accessibility**: WCAG 2.0 AA compliance required
- **Languages**: English, Gujarati, Hindi, Sanskrit (UI must support all four)

## Technical Stack (from PRD)

- **Frontend**: React.js/Next.js, Redux/Context API, Tailwind CSS/Material-UI
- **Mobile**: React Native or Flutter
- **Backend**: Node.js/Express or Python/Django
- **Database**: PostgreSQL + MongoDB
- **Cache**: Redis
- **Search**: Elasticsearch
- **AI/ML**: TensorFlow, Hugging Face, Google Cloud TTS
- **Content Rendering**: PDF.js, WebXR, Three.js
- **Real-time**: Socket.io, SSE
- **Payments**: Razorpay/CCAvenue; UPI, Net Banking, Cards, BBPS
- **Identity**: DigiLocker & Aadhaar verification
- **Infrastructure**: AWS/GCP/Azure, Kubernetes

## User Roles

8 roles with tiered access: Citizen/Reader (Basic/Standard/Gold), Student, Senior Citizen, Content Creator, System Admin, Government Official. Membership tier gates feature access (e.g., Gold gets unlimited mock tests, full AI summaries, STEM Lab premium, offline mode).

## Key Context for Development

- This is a **demo prototype** — focus on visual fidelity and key user flows, not production-scale infrastructure
- Multiple PRDs may be created as the project evolves; scope will be refined iteratively
- Indian government context: Aadhaar/DigiLocker integration, INR pricing, regional language support are core requirements, not afterthoughts
- Content is heavily India-specific: Gujarati literature (Saraswatichandra, Saurashtra Ni Rasdhar), Indian exam prep (UPSC/GPSC), Indian Knowledge Systems with Sanskrit texts
