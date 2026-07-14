---
title: "Analysis — Hosting & Reliability Deep-Dive"
created: 2026-07-13
updated: 2026-07-13
status: active
source: ["10-observations/01-dashboard.md", "10-observations/04-audiobook-player.md", "00-inbox/gyan-setu-main/DEMO_GUIDE.md", "00-inbox/gyan-setu-main/fly.toml"]
---

# Hosting & Reliability Deep-Dive

## Summary

The demo runs on fly.dev with scale-to-zero hosting and depends on two live third-party services (archive.org for audiobook streaming, YouTube for STEM/Video Library content) that this project does not control. Both are acceptable risks for casual browsing but become live-demo risks — a cold start or a third-party outage mid-presentation is the kind of failure a stakeholder audience notices immediately. This deep-dive catalogs the specific failure points and what to do about each before a real presentation.

## Findings

### 1. Scale-to-Zero Cold Start (fly.dev)
- **Observed**: DEMO_GUIDE.md documents "App may take ~5 seconds to wake up on first visit (scale-to-zero hosting)" — confirmed during this session's first page load.
- **Risk**: A presenter opening the app cold, live, in front of stakeholders eats a 5-second dead-air moment before anything renders. Not fatal, but avoidable.
- **Mitigation options**:
  - **Pre-warm before the demo** — load the app (and ideally hit a few key routes) 1-2 minutes before presenting, keeping the instance warm through the actual demo window.
  - **Disable scale-to-zero for the demo window** — fly.io supports `min_machines_running` config; setting this to 1 during the presentation slot removes the cold-start risk entirely at the cost of continuous (small) compute billing.
  - **Do nothing, but brief the presenter** — least effort; acceptable if the presenter knows to open the app early and narrate through the wait if it happens live.

### 2. archive.org Third-Party Streaming Dependency (Audiobook Player)
- **Observed**: Real audio streams via `archive.org/download/{item}/...m4b` → 302 redirect → 206 partial-content chunks from a CDN subdomain (`dn710607.ca.archive.org`). Confirmed genuinely working, not mocked.
- **Risk**: This project has zero control over archive.org's uptime, rate limiting, or hotlink policy. If archive.org throttles, blocks the demo's IP, or has an outage during the presentation, every audiobook in the catalog fails simultaneously — this is a shared failure point across all 9 seeded audiobooks, not an isolated one.
- **No fallback/error state was observed or tested this session** — unclear what a citizen sees if a stream fails (untested, flagged as an open question below).
- **Mitigation options**:
  - **Test the specific audiobook(s) you plan to demo, shortly before presenting** — confirms the exact stream URL is currently reachable.
  - **Have a backup**: know which audiobook to fall back to if the primary one fails live, since a second archive.org item is an independent request and may succeed even if the first didn't.
  - **Longer-term (post-demo)**: consider whether production scope should self-host/cache audio rather than depend on live archive.org calls per playback — out of scope for the demo itself, but worth flagging for `40-solution-design/`.

### 3. YouTube Dependency (STEM Innovation Lab, Video Library)
- **Observed**: STEM Lab links out to YouTube ("Watch on YouTube"); Video Library embeds a real YouTube iframe player in-app.
- **Risk**: Lower than archive.org's risk — YouTube's uptime/CDN is far more robust than archive.org's, and the embedded player (Video Library) degrades more gracefully (YouTube's own player UI handles most error states). The STEM Lab link-out doesn't even risk breaking the app itself — worst case, an external tab fails to load, which is a familiar/forgivable failure mode for any audience.
- **Mitigation**: no specific action needed beyond normal pre-demo connectivity checks.

### 4. Newspaper/Manuscript Image Assets
- **Observed**: Newspaper thumbnails are real generated SVGs served from the app's own `/datasets/newspapers/` path (self-hosted, not third-party) — low risk. Video Library had a couple of thumbnail 404s (`10-observations/12-video-library.md`) but these are cosmetic (playback unaffected) and self-contained (no cascading failure).

### 5. AI API Dependency (Claude API, per `30-analysis/02-ai-integration-deep-dive.md`)
- Cross-referenced here because it's also a live third-party dependency once the API key is configured (see that doc's Option A). Once fixed, this becomes another live-call-during-demo risk similar in shape to archive.org, though with a different failure mode (503/error message rather than total silence).

## Risk Ranking (for demo-day prep)

| Risk | Likelihood | Blast radius | Prep effort to mitigate |
|---|---|---|---|
| Cold start (fly.dev) | High (happens every time the instance was idle) | Low (5s delay, self-resolves) | Trivial — pre-warm |
| archive.org outage/throttle | Low-medium (out of project's control) | High (breaks all audiobook playback at once) | Low — test the specific demo path beforehand, have a backup title |
| AI API failure (once key is configured) | Low-medium (rate limits, latency) | Medium (breaks one feature, not the whole app) | Low — test the Reading Companion flow beforehand |
| YouTube failure | Very low | Low (isolated to one module/link) | None needed |

## Recommendations

1. Pre-warm the fly.dev instance 1-2 minutes before any live demo (cheapest fix for the highest-likelihood risk).
2. Before presenting, manually test the exact audiobook and AI Companion interactions planned for the demo script — both depend on live external services this project doesn't control.
3. Identify a backup audiobook title in case the primary one's archive.org stream is unavailable live.
4. No action needed for YouTube-dependent features — acceptable risk as-is.

## Open Questions

- What does the Audiobook Player actually show if an archive.org stream fails to load? [UNVERIFIED — not tested this session, worth a deliberate failure-injection test, e.g. temporarily blocking archive.org in dev tools]
- ~~Does `fly.toml` currently have `min_machines_running` set to 0?~~ **Confirmed**: `fly.toml` has `auto_stop_machines = 'stop'`, `auto_start_machines = true`, `min_machines_running = 0` — scale-to-zero is explicitly configured, not a platform default. Setting `min_machines_running = 1` before a demo window requires a `fly deploy` (config is in the repo, not a dashboard-only toggle), so this mitigation needs a deploy lead time, not a last-minute flip.
- Is there a rate limit on archive.org's CDN for repeated/simultaneous streaming from the same IP that could bite during a demo with multiple presenters testing beforehand? [UNVERIFIED]
