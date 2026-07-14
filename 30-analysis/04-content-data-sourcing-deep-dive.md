---
title: "Analysis — Content & Data Sourcing Deep-Dive"
created: 2026-07-13
updated: 2026-07-13
status: active
source: ["10-observations/02 through 12", "00-inbox/gyan-setu-main/prd/00-overview.md", "00-inbox/gyan-setu-main/PRD_CONTENTS_SUMMARY.txt"]
---

# Content & Data Sourcing Deep-Dive

## Summary

The demo's catalog is small and hand-seeded (roughly 25 books, 9 audiobooks, 10 newspaper issues, manuscripts per era, 14 videos). The original PRD's success metrics target a catalog **1,000x larger** (50,000+ eBooks, 12,000+ audiobooks, 50,000+ test questions). This deep-dive looks at how today's seed content was sourced, whether that sourcing strategy scales, and what would actually need to change to grow from demo-scale to the PRD's target scale.

## Findings

### What's Actually in the Demo Catalog Today

| Content Type | Observed Count | Source (per observations) |
|---|---|---|
| eBooks | 25 | Mixed: Public Domain (Gandhi, Kautilya's Arthashastra), Sahitya Akademi, GMC Exclusive, University Granth collections — real texts, real AI-generated summaries |
| Audiobooks | 9 | 100% streamed live from **archive.org / LibriVox** (public domain recordings) |
| Newspapers | 10 issues across 5 publications, 2 cities | Real generated front-page layouts with real Gandhinagar/Gujarat-relevant headline copy — appears to be AI-generated content styled as a newspaper, not scraped from real publications |
| Manuscripts (IKS Heritage) | Multiple per era (6 eras) | Real historical descriptions (Rigveda Samhita, Upanishads, etc.) — likely AI-generated or curated summaries, not full source texts (given "View Manuscript" doesn't open anything — see gap analysis) |
| STEM videos | 14 | Real YouTube videos (3Blue1Brown, NPTEL, etc.) — genuinely public, freely embeddable content |
| Test questions | 15 questions per mock test observed (UPSC Prelims) | Seed-authored, real subject-tagged (History/Polity/Geography/Economics) |

### Sourcing Strategy by Content Type — and Whether It Scales

**1. Public-domain / freely-licensed content (Audiobooks, STEM Videos, some eBooks)**
- **Current approach**: direct hotlinking to archive.org and YouTube — zero storage cost, zero licensing cost, works today.
- **Scales?** Partially. Public-domain audiobook and educational-video supply is large but finite and skews toward older/classic works and generalist STEM topics. This won't get the PRD to "12,000+ audiobooks" or a comprehensive India-specific STEM curriculum without supplementing with licensed or commissioned content.
- **Risk carried forward**: the same third-party dependency risk flagged in `30-analysis/03-hosting-reliability-deep-dive.md` — scaling *up* the reliance on archive.org/YouTube hotlinking scales up that risk too, not just the content count.

**2. AI-generated content (Newspaper front pages, book summaries, manuscript descriptions)**
- **Current approach**: appears to be AI-generated at seed time, styled to look like real periodicals/scholarly content.
- **Scales?** Yes, technically — AI generation cost per unit is low and this is the one strategy that can realistically hit five-figure content counts without a licensing budget.
- **Risk**: this is placeholder/demo content, not real news or real primary manuscript text. Production scope would need to decide whether "newspapers" ever means *real* newspaper partnerships (licensing deals with Gujarat Samachar, Times of India, etc. — a business/legal question, not a technical one) or stays AI-generated indefinitely (a very different product claim).

**3. Licensed/institutional content (Sahitya Akademi, University Granth collections)**
- **Current approach**: named as a "Collection" filter tag on 12 of 25 books — unclear from the live app alone whether these are real licensed texts or placeholder tags mimicking what a real licensing deal would look like.
- **Scales?** Only through actual institutional partnerships — this is the one content category that cannot be solved by more engineering or more AI generation. It requires the client (Gandhinagar Smart City Development Ltd.) to secure rights from Sahitya Akademi, universities, and other rights holders.
- **This is the single biggest gap between demo-scale and the PRD's target scale** — the PRD's 50,000+ eBook target implicitly assumes this licensing work happens; nothing in the current build suggests it has.

**4. Test questions**
- **Current approach**: seed-authored, real subject tagging, real scoring logic already built (`20-process-maps/07-mock-test-interface.md` confirmed this is the most solid module in the app).
- **Scales?** The *engine* scales trivially — the mock test interface already handles arbitrary question counts/subjects/sections correctly. The bottleneck is purely content volume: getting from ~15-45 seed questions to 50,000+ requires either bulk-licensing question banks from exam-prep publishers, or a content pipeline (human-authored or AI-assisted) to generate exam-accurate questions at scale — a content operations problem, not a technical one.

## Cross-Cutting Observation

None of the scaling bottlenecks found here are engineering problems. The app's data model and CRUD architecture (confirmed via cross-module persistence checks throughout this session — e.g., mock test scores immediately reflected on the Profile page) already appear built to handle arbitrary catalog size. The real constraints are:
1. **Licensing/rights acquisition** (books, newspapers, question banks) — a legal/business workstream.
2. **Content operations** (someone/something has to produce or curate 50,000+ of anything) — a staffing/tooling workstream.
3. **Third-party dependency risk at scale** (archive.org/YouTube hotlinking) — an architecture decision about whether to keep hotlinking or move to self-hosted/cached media as volume grows.

## Recommendations

1. Treat "content sourcing/licensing" as its own workstream in solution design — separate from feature development, since it's gated by business/legal decisions the engineering team can't make alone.
2. For production scope, decide early whether Newspapers stays AI-generated-demo-content or requires real publisher partnerships — this materially changes both the legal scope and what "newspaper" means as a product claim.
3. If audiobook/video catalog needs to scale meaningfully beyond public-domain content, budget for either licensing deals or a self-hosted media pipeline (reduces the archive.org/YouTube dependency risk from `30-analysis/03-hosting-reliability-deep-dive.md` as a side benefit).
4. No urgent engineering work needed here for the demo itself — this deep-dive is about post-demo production planning, not demo-day risk.

## Open Questions

- Are the "Sahitya Akademi" and "University Granth" collection tags backed by any real licensing conversation, or are they placeholder categories invented for the demo's filter UI? [OUT OF SCOPE for this project to determine via the live app alone — needs a client-side confirmation]
- Is there a content operations plan (in-house team, vendor, AI pipeline) anywhere in the client's broader project documentation for reaching the PRD's 50,000+ eBook target? [Not found in `00-inbox/` — worth asking the client directly]
- Does the client have an existing relationship with any Gujarati/Hindi/Sanskrit newspaper publisher that could turn today's AI-generated newspaper demo into a real licensed feed? [OUT OF SCOPE — business question]
