# Module 1: Dashboard

**Reference Screenshot**: `slides/02-dashboard.png`

## Description
The main landing page after login. Provides a personalized overview with stats, trending content, and navigation to all modules.

## User Flow
1. User opens the app → Login page
2. User logs in with pre-seeded credentials → Dashboard

## Specifications

### Login Page
- Simple login form (email/username + password)
- No signup/registration flow
- Pre-seeded demo accounts (e.g., Rahul Sharma - Premium Member, Mahesh Joshi - Gold Member)

### Layout
- **Left Sidebar**: Navigation to all modules — Dashboard, Digital Library, Audiobooks, Periodicals, Test Prep Hub, Podcast Studio, IKS Heritage, STEM Lab, Video Library, My Profile, My Analytics. All items visible and clickable.
- **Top Bar**: Global search bar (functional), language selector (visible, English-only), user avatar with notification bell
- **Main Content Area**: Welcome banner, stats cards, trending section

### Welcome Banner
- "Welcome back! AI-driven recommendations for you"
- "Continue Reading" section
- Recommendations pulled from seed data (no AI logic)

### Statistics Cards
- Total eBooks, Reading Hours, Tests, Certificates
- All values computed from seeded database via CRUD (not hardcoded)

### Trending Section
- "Trending in Gandhinagar" — list of popular books
- Data from seed database
- Layout follows screenshot (list with book cover cards)

### Global Search
- Functional search across all seeded content (books, audiobooks, videos, etc.)
- Results navigate to the relevant module/item
