#!/usr/bin/env python3
"""
PDF Chapter Chunker
Splits PDFs into separate chapter files based on TOC/bookmarks or text patterns.
"""

import argparse
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF


def get_toc(doc: fitz.Document) -> list:
    """Extract table of contents from PDF."""
    return doc.get_toc()


def detect_structure(pdf_path: str) -> dict:
    """Analyze PDF structure and report findings."""
    doc = fitz.open(pdf_path)

    info = {
        "filename": Path(pdf_path).name,
        "page_count": len(doc),
        "toc": get_toc(doc),
        "metadata": doc.metadata,
    }

    doc.close()
    return info


def print_detection_report(info: dict):
    """Print a readable report of PDF structure."""
    print(f"\n{'='*60}")
    print(f"PDF Analysis: {info['filename']}")
    print(f"{'='*60}")
    print(f"Total Pages: {info['page_count']}")

    if info['metadata']:
        print(f"\nMetadata:")
        for key, value in info['metadata'].items():
            if value:
                print(f"  {key}: {value}")

    toc = info['toc']
    if toc:
        print(f"\nTable of Contents ({len(toc)} entries):")
        for level, title, page in toc:
            indent = "  " * level
            print(f"{indent}[Page {page}] {title}")
    else:
        print("\nNo Table of Contents/Bookmarks found.")
        print("Will need to use pattern matching for chapter detection.")

    print(f"\n{'='*60}\n")


def find_chapters_by_pattern(doc: fitz.Document, pattern: str) -> list:
    """Find chapter starts by searching for text patterns."""
    chapters = []
    regex = re.compile(pattern, re.IGNORECASE)

    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()

        matches = regex.findall(text)
        if matches:
            for match in matches:
                title = match if isinstance(match, str) else match[0] if match else f"Chapter at page {page_num + 1}"
                chapters.append({
                    "title": title.strip(),
                    "page": page_num + 1,  # 1-indexed for display
                    "page_idx": page_num,  # 0-indexed for extraction
                })

    return chapters


def find_chapters_by_toc(doc: fitz.Document, level: int = 1) -> list:
    """Extract chapters from TOC at specified level."""
    toc = get_toc(doc)
    chapters = []

    for entry_level, title, page in toc:
        if entry_level <= level:
            chapters.append({
                "title": title,
                "page": page,
                "page_idx": page - 1,  # 0-indexed
            })

    return chapters


def sanitize_filename(title: str) -> str:
    """Convert title to safe filename."""
    # Remove or replace unsafe characters
    safe = re.sub(r'[<>:"/\\|?*]', '', title)
    safe = re.sub(r'\s+', '_', safe)
    safe = safe.strip('._')
    return safe[:100]  # Limit length


def split_pdf(pdf_path: str, chapters: list, output_dir: str, prefix: str = ""):
    """Split PDF into separate files based on chapter list."""
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # Sort chapters by page
    chapters = sorted(chapters, key=lambda x: x['page_idx'])

    # Add end pages for each chapter
    for i, chapter in enumerate(chapters):
        if i + 1 < len(chapters):
            chapter['end_idx'] = chapters[i + 1]['page_idx'] - 1
        else:
            chapter['end_idx'] = total_pages - 1

    created_files = []

    for i, chapter in enumerate(chapters):
        start = chapter['page_idx']
        end = chapter['end_idx']
        title = chapter['title']

        # Create new PDF with chapter pages
        new_doc = fitz.open()
        new_doc.insert_pdf(doc, from_page=start, to_page=end)

        # Generate filename
        safe_title = sanitize_filename(title)
        filename = f"{prefix}{i+1:02d}_{safe_title}.pdf" if prefix else f"{i+1:02d}_{safe_title}.pdf"
        filepath = output_path / filename

        new_doc.save(str(filepath))
        new_doc.close()

        page_range = f"pages {start+1}-{end+1}" if start != end else f"page {start+1}"
        print(f"  Created: {filename} ({page_range})")
        created_files.append(filepath)

    doc.close()
    return created_files


def main():
    parser = argparse.ArgumentParser(
        description="Split PDFs into chapters based on TOC or text patterns",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Detect PDF structure
  python chunk_pdf.py --detect "book.pdf"

  # Split using TOC (default)
  python chunk_pdf.py "book.pdf" --output ./chapters/

  # Split using custom pattern
  python chunk_pdf.py "book.pdf" --pattern "Chapter\\s+\\d+" --output ./chapters/

  # Split using TOC level 2 (include subsections)
  python chunk_pdf.py "book.pdf" --toc-level 2 --output ./chapters/
        """
    )

    parser.add_argument("pdf", help="Path to the PDF file")
    parser.add_argument("--detect", action="store_true",
                        help="Only analyze and report PDF structure")
    parser.add_argument("--output", "-o", default="./output",
                        help="Output directory for split PDFs (default: ./output)")
    parser.add_argument("--pattern", "-p",
                        help="Regex pattern to find chapter titles")
    parser.add_argument("--toc-level", type=int, default=1,
                        help="TOC depth level to use for splitting (default: 1)")
    parser.add_argument("--prefix", default="",
                        help="Prefix for output filenames")
    parser.add_argument("--list-only", action="store_true",
                        help="List detected chapters without splitting")

    args = parser.parse_args()

    pdf_path = args.pdf

    if not Path(pdf_path).exists():
        print(f"Error: File not found: {pdf_path}", file=sys.stderr)
        sys.exit(1)

    # Detection mode
    if args.detect:
        info = detect_structure(pdf_path)
        print_detection_report(info)
        return

    # Open document for splitting
    doc = fitz.open(pdf_path)

    # Find chapters
    if args.pattern:
        print(f"Searching for pattern: {args.pattern}")
        chapters = find_chapters_by_pattern(doc, args.pattern)
    else:
        toc = get_toc(doc)
        if toc:
            print(f"Using Table of Contents (level {args.toc_level})")
            chapters = find_chapters_by_toc(doc, args.toc_level)
        else:
            print("No TOC found. Please provide a --pattern for chapter detection.")
            print("Run with --detect to analyze the PDF structure first.")
            doc.close()
            sys.exit(1)

    if not chapters:
        print("No chapters found matching criteria.")
        doc.close()
        sys.exit(1)

    print(f"\nFound {len(chapters)} chapters:")
    for ch in chapters:
        print(f"  Page {ch['page']}: {ch['title']}")

    doc.close()

    # List only mode
    if args.list_only:
        return

    # Split the PDF
    print(f"\nSplitting PDF into {args.output}/")
    created = split_pdf(pdf_path, chapters, args.output, args.prefix)
    print(f"\nDone! Created {len(created)} files.")


if __name__ == "__main__":
    main()
