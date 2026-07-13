#!/usr/bin/env python3
"""
Generates PDFs from markdown PRD files using Pandoc + Playwright.

Outputs:
1. output/Gyaan_Setu_Demo_PRD.pdf
2. output/Open_Questions.pdf

Requirements:
    - pandoc (brew install pandoc)
    - Node.js with playwright (npx playwright install chromium)

Usage:
    python3 scripts/generate_pdfs.py
"""

import os
import subprocess
import sys
import json

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRD_DIR = os.path.join(PROJECT_ROOT, "prd")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "output")
SCRIPTS_DIR = os.path.join(PROJECT_ROOT, "scripts")
CSS_FILE = os.path.join(SCRIPTS_DIR, "styles.css")

COVER_PRD = """
<div class="cover">
<h1 style="font-size:42px; border:none; page-break-before:avoid;">GYAAN SETU</h1>
<div class="divider"></div>
<div class="subtitle">Demo Prototype — Product Requirements Document</div>
<div class="info">
Gandhinagar Smart City Development Ltd.<br>
March 2026 &nbsp;|&nbsp; Version 1.0<br><br>
Empowering Every Citizen with Knowledge
</div>
</div>
"""

COVER_QUESTIONS = """
<div class="cover">
<h1 style="font-size:42px; border:none; page-break-before:avoid;">GYAAN SETU</h1>
<div class="divider"></div>
<div class="subtitle">Open Questions for Management Team</div>
<div class="info">
Items requiring management decision before development proceeds.<br>
March 2026
</div>
</div>
"""


def check_dependencies():
    """Check that pandoc is available."""
    try:
        subprocess.run(["pandoc", "--version"], capture_output=True, check=True)
    except (FileNotFoundError, subprocess.CalledProcessError):
        print("Error: pandoc is required. Install with: brew install pandoc")
        sys.exit(1)


def md_files_to_combined_md(filenames, cover_html=""):
    """Read and combine multiple markdown files with optional cover page."""
    sections = []
    if cover_html:
        sections.append(cover_html)

    for filename in filenames:
        filepath = os.path.join(PRD_DIR, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            sections.append(f.read())

    return "\n\n".join(sections)


def md_to_html(md_content):
    """Convert markdown to HTML using pandoc."""
    result = subprocess.run(
        ["pandoc", "--from=markdown", "--to=html5", "--wrap=none"],
        input=md_content,
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout


def html_to_pdf_with_playwright(html_content, output_path):
    """Use Playwright via Node.js to generate PDF from HTML."""
    css = open(CSS_FILE, "r").read()

    full_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>{css}</style>
</head>
<body>
{html_content}
</body>
</html>"""

    # Write temp HTML
    temp_html = os.path.join(OUTPUT_DIR, "_temp.html")
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(full_html)

    # Use playwright via node to generate PDF
    node_script = f"""
const {{ chromium }} = require('playwright');
(async () => {{
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('file://{temp_html}', {{ waitUntil: 'networkidle' }});
    await page.pdf({{
        path: '{output_path}',
        format: 'A4',
        margin: {{ top: '60px', bottom: '60px', left: '50px', right: '50px' }},
        printBackground: true,
    }});
    await browser.close();
}})();
"""

    temp_js = os.path.join(OUTPUT_DIR, "_temp_pdf.js")
    with open(temp_js, "w") as f:
        f.write(node_script)

    try:
        result = subprocess.run(
            ["node", temp_js],
            capture_output=True,
            text=True,
            timeout=30,
        )
        if result.returncode != 0:
            raise RuntimeError(f"Playwright PDF failed: {result.stderr}")
    finally:
        # Cleanup temp files
        for f in [temp_html, temp_js]:
            if os.path.exists(f):
                os.remove(f)


def html_to_pdf_with_pandoc_html(html_content, output_path):
    """Fallback: save as self-contained HTML for manual PDF printing."""
    css = open(CSS_FILE, "r").read()
    full_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Gyaan Setu PRD</title>
<style>{css}</style>
</head>
<body>
{html_content}
</body>
</html>"""

    html_path = output_path.replace(".pdf", ".html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(full_html)
    return html_path


def has_playwright():
    """Check if Playwright is available."""
    try:
        result = subprocess.run(
            ["node", "-e", "require('playwright')"],
            capture_output=True,
            timeout=10,
        )
        return result.returncode == 0
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


def generate_pdf(md_content, output_path, cover_html=""):
    """Generate PDF from markdown content."""
    # Combine cover + content
    if cover_html:
        html_content = cover_html + "\n" + md_to_html(md_content)
    else:
        html_content = md_to_html(md_content)

    if has_playwright():
        html_to_pdf_with_playwright(html_content, output_path)
        print(f"  PDF: {output_path}")
    else:
        html_path = html_to_pdf_with_pandoc_html(html_content, output_path)
        print(f"  HTML: {html_path}")
        print(f"  (Open in browser and Cmd+P to save as PDF)")


def generate_prd():
    """Generate combined PRD PDF."""
    prd_files = sorted(
        [f for f in os.listdir(PRD_DIR) if f.endswith(".md") and f != "open-questions.md"]
    )

    combined_md = md_files_to_combined_md(prd_files)
    generate_pdf(combined_md, os.path.join(OUTPUT_DIR, "Gyaan_Setu_Demo_PRD.pdf"), COVER_PRD)


def generate_open_questions():
    """Generate Open Questions PDF."""
    with open(os.path.join(PRD_DIR, "open-questions.md"), "r", encoding="utf-8") as f:
        md_content = f.read()

    generate_pdf(md_content, os.path.join(OUTPUT_DIR, "Open_Questions.pdf"), COVER_QUESTIONS)


if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    check_dependencies()

    use_playwright = has_playwright()
    if use_playwright:
        print("Using Pandoc + Playwright for PDF generation")
    else:
        print("Playwright not found. Generating HTML files instead.")
        print("To enable PDF: npm install playwright && npx playwright install chromium")

    print("\nGenerating PRD...")
    generate_prd()

    print("\nGenerating Open Questions...")
    generate_open_questions()

    print("\nDone!")
