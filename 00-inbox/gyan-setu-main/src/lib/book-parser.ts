export interface Chapter {
  id: string;
  title: string;
  content: string;
}

/**
 * Normalize a chapter title to title case, e.g. "CHAPTER 1: THE PARTING" -> "Chapter 1: The Parting"
 */
function titleCase(str: string): string {
  // Split into words, capitalize first letter of each word
  // but preserve apostrophes (don't capitalize after them)
  return str
    .toLowerCase()
    .replace(/(?:^|\s)\w/g, (c) => c.toUpperCase());
}

/**
 * Strip leading divider lines (─── or ===) from content.
 */
function stripDividers(str: string): string {
  return str.replace(/^[─━═\-=]{3,}\s*/gm, "").trim();
}

export function parseBookText(text: string): Chapter[] {
  // Strategy 1: Look for divider-surrounded CHAPTER headings (our dataset format).
  // These look like:
  //   ───────────────────
  //   CHAPTER 1: Title
  //   ───────────────────
  // We match only CHAPTER headings that are preceded by a divider line,
  // which distinguishes them from TOC listing entries.
  const dividerChapterPattern =
    /(?:^[─━═\-=]{3,}\s*\n)(CHAPTER\s+[\dIVXLCDM]+[:\.\s].*)/gim;

  const matches: { index: number; title: string }[] = [];
  let match;
  while ((match = dividerChapterPattern.exec(text)) !== null) {
    // Use the position of the CHAPTER heading itself
    const headingStart = text.indexOf(match[1], match.index);
    matches.push({ index: headingStart, title: titleCase(match[1].trim()) });
  }

  if (matches.length >= 2) {
    return buildChapters(text, matches);
  }

  // Strategy 2: Generic chapter heading pattern (no divider required).
  // Only match at start of line with substantial content after.
  const chapterPattern =
    /^(CHAPTER\s+[\dIVXLCDM]+[:\.\s].*)/gim;

  while ((match = chapterPattern.exec(text)) !== null) {
    matches.push({ index: match.index, title: titleCase(match[1].trim()) });
  }

  // Deduplicate: if we have both TOC entries (short lines) and real headings,
  // keep only the ones followed by substantial content (>200 chars before next match).
  if (matches.length >= 2) {
    const filtered = matches.filter((m, i) => {
      const nextIndex =
        i + 1 < matches.length ? matches[i + 1].index : text.length;
      const sectionLength = nextIndex - m.index;
      return sectionLength > 200;
    });
    if (filtered.length >= 2) {
      return buildChapters(text, filtered);
    }
    return buildChapters(text, matches);
  }

  // Strategy 3: Mixed-case "Chapter N:" headings
  const mixedPattern = /^(Chapter\s+[\dIVXLCDM]+[:\.\s].*)/gm;
  while ((match = mixedPattern.exec(text)) !== null) {
    matches.push({ index: match.index, title: match[1].trim() });
  }
  if (matches.length >= 2) {
    const filtered = matches.filter((m, i) => {
      const nextIndex =
        i + 1 < matches.length ? matches[i + 1].index : text.length;
      return nextIndex - m.index > 200;
    });
    if (filtered.length >= 2) {
      return buildChapters(text, filtered);
    }
  }

  // Strategy 4: Split by section dividers
  const sections = text.split(/\n[─━═\-=]{3,}\n/);
  if (sections.length >= 3) {
    return sections
      .filter((s) => s.trim().length > 50)
      .map((section, i) => ({
        id: `ch-${i}`,
        title: `Section ${i + 1}`,
        content: stripDividers(section),
      }));
  }

  // Strategy 5: Split into ~3000 char chunks
  const chunkSize = 3000;
  const chunks: Chapter[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    let end = Math.min(i + chunkSize, text.length);
    if (end < text.length) {
      const newlinePos = text.lastIndexOf("\n\n", end);
      if (newlinePos > i + chunkSize / 2) end = newlinePos;
    }
    chunks.push({
      id: `ch-${chunks.length}`,
      title: `Part ${chunks.length + 1}`,
      content: text.slice(i, end).trim(),
    });
    if (end !== i + chunkSize) i = end - chunkSize;
  }
  return chunks.length > 0
    ? chunks
    : [{ id: "ch-0", title: "Full Text", content: text.trim() }];
}

function buildChapters(
  text: string,
  matches: { index: number; title: string }[]
): Chapter[] {
  const chapters: Chapter[] = [];

  // Add intro if there's meaningful content before first chapter
  const introText = text.slice(0, matches[0].index).trim();
  if (introText.length > 100) {
    // Clean up intro: remove divider lines
    chapters.push({
      id: "ch-intro",
      title: "Introduction",
      content: stripDividers(introText),
    });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    const rawContent = text.slice(start, end).trim();

    // Remove the chapter heading line from the content
    const firstNewline = rawContent.indexOf("\n");
    const body =
      firstNewline > 0 ? rawContent.slice(firstNewline).trim() : rawContent;

    chapters.push({
      id: `ch-${i}`,
      title: matches[i].title,
      content: stripDividers(body),
    });
  }

  return chapters;
}
