---
title: "Analysis — Feature Gap Analysis Across All 14 Modules"
created: 2026-07-13
updated: 2026-07-13
status: active
source_observations: ["10-observations/01 through 14", "20-process-maps/01 through 14"]
---

# Feature Gap Analysis

## Summary

Across all 14 demo-scope modules, live-walkthrough testing found the app is **substantially real** — most modules are backed by genuine seeded data, real API calls, and working CRUD (not hardcoded UI). But every module has at least one gap between what the PRD describes and what's built. Gaps fall into three distinct categories that need different responses:

1. **Communicated stubs** — features that say "coming soon" — acceptable for a demo, low risk.
2. **Silent dead controls** — buttons/inputs that do nothing with zero feedback — indistinguishable from bugs, high risk for a stakeholder demo (a click that does nothing reads as broken software).
3. **Config-only failures** — real integrations that would work if a setting were fixed — cheapest to resolve before the demo.

## Findings

### Category 1 — Communicated Stubs (low risk, but PRD says these are "active" scope)

| Feature | Module | Message shown |
|---|---|---|
| Mind Map | Digital Library (book detail) | "Click to generate a mind map using AI (coming soon)" |
| Quiz | Digital Library (book detail) | "Click to generate a quiz using AI (coming soon)" |
| Magazines | Newspapers & Periodicals | "Magazines coming soon — This section is under development" |
| Journals | Newspapers & Periodicals | "Journals coming soon — This section is under development" |
| 360° Virtual Tours | IKS Heritage | Placeholder cards (per DEMO_GUIDE) |
| Live Workshops | STEM Innovation Lab | "Coming Soon — Live coding workshops and mentorship sessions" |

**Pattern**: 6 sub-features across 4 modules, all with visible "coming soon" messaging. All 6 were listed as in-scope/active in the original 16-module PRD's module specs. Since the demo-scope PRD (`00-inbox/gyan-setu-main/prd/00-overview.md`) doesn't explicitly re-scope these down to placeholders, there's a mismatch between what the demo-scope PRD implies is built and what's actually built. Not urgent to fix code-wise, but worth updating the demo-scope PRD to explicitly list these as deferred, so a stakeholder reading it isn't surprised.

### Category 2 — Silent Dead Controls (highest demo risk)

| Control | Module | Observed behavior |
|---|---|---|
| **"View Manuscript" button** | IKS Heritage | No modal, no navigation, nothing — blocks the module's *core* action entirely |
| Global search bar (top nav) | Dashboard (and present on every module's header) | Accepts text, does nothing — no dropdown, no navigation |
| Notification bell | Dashboard (and every module's header) | No panel, no state change |
| "Choose GOLD" / "Choose BASIC" | Membership Plans | No modal, no toast, no feedback — arguably by design (no payment gateway in demo scope) but gives no signal to the user that this is intentional |

**Pattern**: These 4 are the riskiest findings in this pass. Unlike Category 1, there is **no messaging** distinguishing "not built yet" from "broken." In a live stakeholder demo, a presenter clicking "View Manuscript" mid-flow with no fallback explanation is the single highest-risk moment found across the whole app — worse than any Category 1 stub, because Category 1 stubs at least tell the viewer what's happening.

**Severity ranking within this category**:
1. **IKS Heritage "View Manuscript"** — CRITICAL. This is the module's primary call-to-action; every manuscript card leads nowhere.
2. **Membership upgrade buttons** — MEDIUM. Expected to be non-functional per scope, but needs a "coming soon" toast or disabled-with-tooltip state to avoid reading as broken.
3. **Global search bar / notification bell** — MEDIUM. Present on every screen (top nav is shared chrome), so this is a repeated, always-visible dead control rather than a one-off — arguably more noticeable than a single broken button, but lower stakes since it's not a primary CTA.

### Category 3 — Config-Only Failures (cheap to fix before demo)

| Feature | Module | Root cause |
|---|---|---|
| AI Reading Companion | eBook Reader | `POST /api/ai/companion` → 503. Per DEMO_GUIDE.md: "requires API key to be configured." The integration code is real and wired — this is purely a missing environment variable/API key in the current deployment, not a code bug. |

**This is the easiest fix in the entire gap list** — no code changes implied, just supplying a working Claude API key to the deployment before any stakeholder demo. Given the demo PRD's "Real LLM integration via Agent SDK for AI features" is a named architecture principle, this is worth prioritizing above all Category 1/2 items.

### Category 4 — Spec Deviations (works, but not as PRD describes)

| Feature | Module | PRD says | Actually built |
|---|---|---|---|
| Video playback | STEM Innovation Lab | "Video lesson player integrated with code editor" | External YouTube link-out ("Watch on YouTube"), not embedded |
| Audiobook waveform | Audiobook Player | Waveform visualization | Flat progress bar |
| Code execution | STEM Innovation Lab | (implied real sandbox via "execution sandbox with terminal output") | Simulated/matched output, not real Python execution (documented limitation) |

**Pattern**: All three are functional workarounds that still deliver the demo experience (video still plays, code still "runs" and shows correct output, audio still has a progress indicator) — lower priority than Categories 1-3, but worth noting if a stakeholder specifically probes for the PRD's described UI.

### Category 5 — Data/Formatting Bugs (cosmetic, low severity)

| Bug | Module | Detail |
|---|---|---|
| Negative BCE year | Digital Library (book detail) | Arthashastra shows "-300" instead of "300 BCE" |
| Same field, correct elsewhere | IKS Heritage | The same BCE-era concept displays correctly as "1500 BCE" — confirms this is a display bug isolated to one screen/component, not the underlying data |
| Thumbnail 404s | Video Library | 1-2 videos never load a real thumbnail, fall back to generic gray icon — cosmetic, playback unaffected |
| Inconsistent duration format | Video Library | Some videos `HH:MM:SS`, others `MM:SS`, same field |
| Generic test names | Test Prep Hub | "Test 1"/"Test 2"/"Test 3" instead of descriptive titles |

### Category 6 — Missing/Unverified (needs follow-up observation, not confirmed broken)

| Item | Module | Why unconfirmed |
|---|---|---|
| Podcast recording | Podcast Creation Studio | Headless browser automation can't fully exercise `getUserMedia` — needs a manual/headed retest before concluding it's broken |
| Highlight / note / translate / TTS / WCAG badge | eBook Reader | Not located in the toolbar observed — may require a text-selection gesture not yet triggered |
| Quick Settings (Notifications, Language, Dark Mode) | User Profile | Named in PRD, not found anywhere on the profile page — may be unbuilt or located elsewhere |
| Robotics Kits category | STEM Innovation Lab | Empty video panel, no course, no messaging — unclear if seed-data gap or intentional cut |
| Folk & Oral Traditions section | IKS Heritage | Named in PRD, not located on the page (may require more scrolling) |

### Category 7 — Not Implemented (by design, acceptable)

| Module | Status |
|---|---|
| Admin Analytics Dashboard | No route, no seeded admin account — cleanly absent, matches its "Low (deferrable)" priority in the demo-scope PRD. Not a bug. Note: the Prisma schema already defines `ADMIN`/`OFFICIAL` roles (correction, added 2026-07-13) — only the seed data, route, and UI are missing, not the data model. |

## Cross-Cutting Patterns

1. **AI-generated content features are the most incomplete category overall.** Of the named AI features (AI Reading Companion, AI Book Summary, Mind Map, Quiz, AI Auto-Transcription): only **AI Book Summary** is fully working. AI Reading Companion is wired but unconfigured (Category 3). Mind Map and Quiz are pure stubs (Category 1). AI Auto-Transcription's "Live" badge was observed but not verified to produce real output (Category 6). If a stakeholder demo leans on "AI-driven" as the platform's headline pitch, this is the biggest exposure area.

2. **Naming inconsistency is systemic, not isolated.** At least 2 modules have three different names across sidebar label / page header / URL route (Newspapers & Periodicals; My Analytics/My Dashboard). Low severity individually, but worth a single glossary pass rather than fixing case-by-case.

3. **Every "coming soon" stub uses consistent, honest messaging** — this is a strength, not a weakness. The problem is specifically the modules/controls that *don't* have this messaging (Category 2).

4. **Real backend integrity is strong.** Nearly every module confirmed live API calls, server-side filtering, and cross-module data persistence (e.g., a Mock Test score submitted during this session appeared correctly on the Profile page moments later). The gaps found are concentrated in a handful of specific interactive features, not systemic to the architecture.

## Recommendations

Priority order for pre-demo fixes, cheapest/highest-impact first:

1. **Configure the AI API key** so the AI Reading Companion stops 503-ing — zero code change, restores the platform's core "AI-driven" pitch for the reader flow. (Category 3)
2. **Fix or hide "View Manuscript"** in IKS Heritage — this is the single highest-risk silent failure; either wire it to a real detail view or replace it with an honest "coming soon" state matching Category 1's pattern. (Category 2, Critical)
3. **Add feedback states to the 3 remaining Category 2 dead controls** (search bar, notification bell, Membership upgrade buttons) — even a simple "coming soon" toast prevents these from reading as bugs during a live demo.
4. **Reconcile the demo-scope PRD with actual build state** for the 6 Category 1 stubs — either scope them out explicitly in the PRD, or prioritize building the highest-visibility one (Mind Map/Quiz, since AI Summary already works and these are adjacent tabs on the same screen).
5. Everything in Categories 4-7 is lower priority — cosmetic or genuinely out of scope; address opportunistically.

## Open Questions

- Is there a reason "View Manuscript" was left unwired while every other stub got a "coming soon" state? Worth a source-level check to see if it's a missing route vs. a missing onClick handler — different fixes, different effort. [UNVERIFIED]
- Is the Membership page's lack of any API call intentional (static marketing content) or an oversight against the "no hardcoded UI data" architecture principle? [UNVERIFIED]
- Should Quick Settings (Notifications/Language/Dark Mode) be added to the demo scope, or was it deliberately cut along with Kiosk UI/Mobile App? [Needs a scope decision, not just a code check]
