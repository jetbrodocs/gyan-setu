---
title: "Screen Spec — Digital Library Collection Shelf"
created: 2026-07-14
updated: 2026-07-14
status: draft
prd: "prd-02-digital-library/prd.md"
covers_reqs: ["REQ-011"]
route: "/library/collections/{collection-slug}"
---

# Screen: Digital Library Collection Shelf

## Module / PRD
Digital Library — `prd-02-digital-library/prd.md`

## Entry Points
| From | Trigger | Context passed in |
|---|---|---|
| Catalogue screen | Click a "Browse by Collection" rail entry | `collection-slug` (e.g. `public-domain`, `sahitya-akademi`, `gmc-exclusive`, `university-granth`) |
| Direct URL | `/library/collections/{collection-slug}` | `collection-slug` — stable, shareable, same pattern as book detail (REQ-005) |

## UX Layout
- **Header**: Collection title (e.g. "Public Domain Classics") + short description of the collection
- **Book grid**: same card component and layout as the main catalogue screen, pre-filtered to this
  collection — no filter sidebar (the collection itself IS the filter); optional secondary sort
  dropdown (Rating / Year), reusing REQ-002's behavior
- **Back link**: to main catalogue (`/library`)

## Data Points Displayed
| Label | Value / Format | Source |
|---|---|---|
| Collection title | text (e.g. "Public Domain Classics") | mapped from `collection-slug` |
| Collection description | short text | `[TODO: no source precedent for collection description copy — needs content, not just data]` |
| Book grid | same fields as catalogue card (cover, title, author, tags, rating, save icon) | `book.*` filtered `WHERE collection = {slug}` |
| Result count | "N books in this collection" | count of filtered query |

## CTAs
| CTA | Behavior |
|---|---|
| Book card (click) | Navigates to Book Detail screen at `/library/{bookId}` |
| Save/bookmark icon on card (REQ-009) | Same toggle behavior as catalogue screen |
| Sort dropdown | Re-sorts this collection's grid by Rating (default) or Year |
| Back link | Returns to main catalogue `/library` |

## Validations
- None — read-only browsing screen, no form input.

## Conditional States
| State | What the user sees |
|---|---|
| Loading | Same skeleton-grid pattern as the main catalogue screen |
| Empty — collection has 0 books | "No books in this collection yet" — edge case, unlikely given all 4 current Collection values have books, but must be handled for future collections |
| Invalid `collection-slug` | Same "not found" pattern as an invalid `bookId` on Book Detail — full-page state with a link back to `/library` |
| Default / populated | Filtered grid for this collection |

## Known Gaps (see PRD for design detail)
- REQ-011 is entirely net-new — this screen does not exist in the current build. The "Collection" filter exists today only as a checkbox on the main catalogue (REQ-001); this is a new dedicated landing view per collection value, reusing that same underlying data field.
