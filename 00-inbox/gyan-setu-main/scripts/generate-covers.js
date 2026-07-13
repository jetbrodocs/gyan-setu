#!/usr/bin/env node
/**
 * generate-covers.js
 * Creates SVG placeholder book covers for the Gyaan Setu digital library demo.
 * Output: /Users/sharva/Workspaces/gyan-setu/public/datasets/covers/*.svg
 */

const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(
  __dirname,
  "../public/datasets/covers"
);

// ── Colour palettes per language ─────────────────────────────────────────────
const PALETTES = {
  Gujarati: {
    grad1: "#E65100",
    grad2: "#F57C00",
    accent: "#FFD54F",
    border: "#FFB300",
    pattern: "saffron",
  },
  Hindi: {
    grad1: "#1B5E20",
    grad2: "#388E3C",
    accent: "#A5D6A7",
    border: "#66BB6A",
    pattern: "green",
  },
  English: {
    grad1: "#1565C0",
    grad2: "#1E88E5",
    accent: "#90CAF9",
    border: "#42A5F5",
    pattern: "blue",
  },
  Sanskrit: {
    grad1: "#880E4F",
    grad2: "#AD1457",
    accent: "#F48FB1",
    border: "#EC407A",
    pattern: "maroon",
  },
};

// ── Decorative pattern SVG snippets (one per palette type) ───────────────────
function getPattern(type, accent) {
  switch (type) {
    case "saffron":
      // Rangoli-inspired concentric diamonds
      return `
        <g opacity="0.18" stroke="${accent}" stroke-width="1.5" fill="none">
          <polygon points="150,60 200,110 150,160 100,110" />
          <polygon points="150,45 215,110 150,175 85,110" />
          <polygon points="150,30 230,110 150,190 70,110" />
          <line x1="150" y1="30" x2="150" y2="190" />
          <line x1="70" y1="110" x2="230" y2="110" />
        </g>`;
    case "green":
      // Leaf / lotus petal motif
      return `
        <g opacity="0.18" stroke="${accent}" stroke-width="1.5" fill="none">
          <ellipse cx="150" cy="110" rx="50" ry="25" />
          <ellipse cx="150" cy="110" rx="70" ry="35" />
          <ellipse cx="150" cy="110" rx="90" ry="45" transform="rotate(45,150,110)" />
          <ellipse cx="150" cy="110" rx="90" ry="45" transform="rotate(-45,150,110)" />
          <circle cx="150" cy="110" r="12" />
        </g>`;
    case "blue":
      // Subtle grid / circuit lines
      return `
        <g opacity="0.15" stroke="${accent}" stroke-width="1" fill="none">
          ${[0, 1, 2, 3, 4].map((i) => `<line x1="${60 + i * 45}" y1="40" x2="${60 + i * 45}" y2="180" />`).join("")}
          ${[0, 1, 2, 3].map((i) => `<line x1="60" y1="${60 + i * 40}" x2="240" y2="${60 + i * 40}" />`).join("")}
          <circle cx="150" cy="110" r="40" stroke-width="2" />
          <circle cx="150" cy="110" r="25" />
        </g>`;
    case "maroon":
      // Om / mandala-like star
      return `
        <g opacity="0.18" stroke="${accent}" stroke-width="1.5" fill="none">
          ${Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x2 = 150 + Math.cos(angle) * 75;
            const y2 = 110 + Math.sin(angle) * 75;
            return `<line x1="150" y1="110" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" />`;
          }).join("")}
          <circle cx="150" cy="110" r="30" />
          <circle cx="150" cy="110" r="55" />
          <circle cx="150" cy="110" r="75" />
        </g>`;
    default:
      return "";
  }
}

// ── Word-wrap helper (returns array of tspan lines) ───────────────────────────
function wrapTitle(title, maxChars = 16) {
  const words = title.split(" ");
  const lines = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxChars && current.length > 0) {
      lines.push(current.trim());
      current = w;
    } else {
      current = (current + " " + w).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

// ── Main SVG builder ─────────────────────────────────────────────────────────
function buildSVG({ filename, title, author, language }) {
  const pal = PALETTES[language] || PALETTES.English;
  const gradId = `grad_${filename.replace(/[^a-z0-9]/gi, "_")}`;
  const patternSvg = getPattern(pal.pattern, pal.accent);

  const titleLines = wrapTitle(title, 15);
  const titleFontSize = titleLines.length > 2 ? 22 : 26;
  const titleBlockHeight = titleLines.length * (titleFontSize + 6);

  // Centre the title block vertically in upper 55% of cover
  const titleCentreY = 200;
  const titleStartY =
    titleCentreY - (titleBlockHeight / 2) + titleFontSize;

  const tspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="150" dy="${i === 0 ? 0 : titleFontSize + 6}">${escapeXml(line)}</tspan>`
    )
    .join("");

  // Author word-wrap (narrower)
  const authorLines = wrapTitle(author, 20);
  const authorStartY = titleStartY + titleBlockHeight + 18;

  const authorTspans = authorLines
    .map(
      (line, i) =>
        `<tspan x="150" dy="${i === 0 ? 0 : 20}">${escapeXml(line)}</tspan>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="300" height="450">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="${pal.grad1}" />
      <stop offset="100%" stop-color="${pal.grad2}" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="300" height="450" fill="url(#${gradId})" rx="6" ry="6" />

  <!-- Subtle top highlight -->
  <rect width="300" height="80" fill="white" opacity="0.06" rx="6" ry="6" />

  <!-- Decorative pattern (centred, upper area) -->
  ${patternSvg}

  <!-- Outer border frame -->
  <rect x="12" y="12" width="276" height="426" fill="none"
        stroke="${pal.border}" stroke-width="1.5" rx="4" ry="4" opacity="0.7" />
  <!-- Inner border frame -->
  <rect x="18" y="18" width="264" height="414" fill="none"
        stroke="${pal.accent}" stroke-width="0.6" rx="3" ry="3" opacity="0.4" />

  <!-- Horizontal rule above title block -->
  <line x1="36" y1="${titleStartY - 20}" x2="264" y2="${titleStartY - 20}"
        stroke="${pal.accent}" stroke-width="0.8" opacity="0.5" />

  <!-- Book title -->
  <text
    x="150"
    y="${titleStartY}"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${titleFontSize}"
    font-weight="bold"
    fill="white"
    letter-spacing="0.5"
  >${tspans}</text>

  <!-- Horizontal rule below title block -->
  <line x1="36" y1="${titleStartY + titleBlockHeight + 4}" x2="264" y2="${titleStartY + titleBlockHeight + 4}"
        stroke="${pal.accent}" stroke-width="0.8" opacity="0.5" />

  <!-- Author name -->
  <text
    x="150"
    y="${authorStartY}"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="15"
    fill="${pal.accent}"
    letter-spacing="0.3"
  >${authorTspans}</text>

  <!-- Language badge (bottom) -->
  <rect x="90" y="410" width="120" height="22" rx="11" ry="11"
        fill="white" opacity="0.15" />
  <text
    x="150"
    y="425"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="11"
    fill="white"
    opacity="0.9"
    letter-spacing="1"
  >${escapeXml(language.toUpperCase())}</text>

  <!-- Corner ornament dots -->
  <circle cx="30"  cy="30"  r="3" fill="${pal.accent}" opacity="0.5" />
  <circle cx="270" cy="30"  r="3" fill="${pal.accent}" opacity="0.5" />
  <circle cx="30"  cy="420" r="3" fill="${pal.accent}" opacity="0.5" />
  <circle cx="270" cy="420" r="3" fill="${pal.accent}" opacity="0.5" />
</svg>`;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ── Book catalogue ────────────────────────────────────────────────────────────
const BOOKS = [
  // Gujarati
  { filename: "saraswatichandra",         title: "Saraswatichandra",                        author: "Govardhanram Tripathi",     language: "Gujarati" },
  { filename: "bhavni-bhavai",            title: "Bhavni Bhavai",                           author: "Pannalal Patel",            language: "Gujarati" },
  { filename: "malela-jeev",              title: "Malela Jeev",                             author: "Pannalal Patel",            language: "Gujarati" },
  { filename: "saurashtra-ni-rasdhar",    title: "Saurashtra Ni Rasdhar",                   author: "Jhaverchand Meghani",       language: "Gujarati" },
  { filename: "mari-hakikat",             title: "Mari Hakikat",                            author: "Narmad",                    language: "Gujarati" },
  { filename: "karan-ghelo",              title: "Karan Ghelo",                             author: "Nandshankar Mehta",         language: "Gujarati" },
  { filename: "patan-ni-prabhuta",        title: "Patan ni Prabhuta",                       author: "K.M. Munshi",               language: "Gujarati" },
  { filename: "gujarat-no-nath",          title: "Gujarat no Nath",                         author: "K.M. Munshi",               language: "Gujarati" },
  // Hindi
  { filename: "godan",                    title: "Godan",                                   author: "Premchand",                 language: "Hindi" },
  { filename: "madhushala",               title: "Madhushala",                              author: "Harivansh Rai Bachchan",    language: "Hindi" },
  { filename: "raag-darbari",             title: "Raag Darbari",                            author: "Shrilal Shukla",            language: "Hindi" },
  { filename: "pinjar",                   title: "Pinjar",                                  author: "Amrita Pritam",             language: "Hindi" },
  { filename: "rashmirathi",              title: "Rashmirathi",                             author: "Ramdhari Singh Dinkar",     language: "Hindi" },
  { filename: "kamayani",                 title: "Kamayani",                                author: "Jaishankar Prasad",         language: "Hindi" },
  // English
  { filename: "atomic-habits",            title: "Atomic Habits",                           author: "James Clear",               language: "English" },
  { filename: "power-of-subconscious-mind", title: "The Power of Your Subconscious Mind",  author: "Joseph Murphy",             language: "English" },
  { filename: "psychology-of-money",      title: "The Psychology of Money",                 author: "Morgan Housel",             language: "English" },
  { filename: "gandhi-autobiography",     title: "The Story of My Experiments with Truth",  author: "M.K. Gandhi",               language: "English" },
  { filename: "discovery-of-india",       title: "The Discovery of India",                  author: "Jawaharlal Nehru",          language: "English" },
  { filename: "wings-of-fire",            title: "Wings of Fire",                           author: "A.P.J. Abdul Kalam",        language: "English" },
  { filename: "sapiens",                  title: "Sapiens",                                 author: "Yuval Noah Harari",         language: "English" },
  { filename: "era-of-darkness",          title: "An Era of Darkness",                      author: "Shashi Tharoor",            language: "English" },
  // Sanskrit
  { filename: "arthashastra",             title: "Arthashastra",                            author: "Chanakya",                  language: "Sanskrit" },
  { filename: "meghaduta",                title: "Meghaduta",                               author: "Kalidasa",                  language: "Sanskrit" },
  { filename: "abhijnanasakuntalam",      title: "Abhijnanasakuntalam",                     author: "Kalidasa",                  language: "Sanskrit" },
];

// ── Generate all covers ───────────────────────────────────────────────────────
let created = 0;
let errors = 0;

for (const book of BOOKS) {
  const svgContent = buildSVG(book);
  const outPath = path.join(OUTPUT_DIR, `${book.filename}.svg`);
  try {
    fs.writeFileSync(outPath, svgContent, "utf8");
    console.log(`  ✓  ${book.filename}.svg  (${book.language})`);
    created++;
  } catch (err) {
    console.error(`  ✗  ${book.filename}.svg — ${err.message}`);
    errors++;
  }
}

console.log(`\nDone: ${created} covers created, ${errors} errors.`);
console.log(`Output: ${OUTPUT_DIR}`);
