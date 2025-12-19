# itch.io HTML/CSS Support Research

**Source URLs:**
- https://speakthesky.itch.io/itchios-html-basement
- https://itch.io/docs/creators/design
- https://itch.io/docs/creators/css-guide

**Fetch Date:** 2025-12-18

**Context:** Researching HTML/CSS compatibility for itch.io weekly study templates

## Supported HTML Tags

### Always Allowed
- Structural: `<p>`, `<ul>`, `<ol>`, `<li>`, `<pre>`, `<blockquote>`, `<h1>`-`<h6>`
- Text formatting: `<em>`, `<strong>`, `<del>`, `<br>`, `<a>`, `<img>`
- Tables: `<table>` and related elements
- Generic: `<div>`, `<span>`

### Also Supported
- Semantic elements: `<details>`, `<summary>`, `<dl>`, `<dt>`, `<dd>`, `<dfn>`
- Code/computing: `<code>`, `<kbd>`, `<samp>`, `<var>`
- Citations: `<q>`, `<mark>`, `<s>`, `<abbr>`, `<cite>`, `<i>`
- Other: `<time>`, `<figure>`, `<figcaption>`, `<hr>`, `<ruby>`, `<rt>`, `<rp>`
- Styling: `<small>`, `<b>`, `<u>`, `<sub>`, `<sup>`, `<wbr>`

## Blocked/Scrubbed Tags
- Sectioning: `<article>`, `<section>`, `<aside>`, `<nav>`, `<main>`, `<header>`, `<footer>`
- Media/interactive: `<video>`, `<audio>`, `<form>`, `<script>`, `<canvas>`, `<svg>`
- Embeds: `<iframe>` (except whitelisted sources like YouTube, Spotify), `<embed>`, `<object>`

## CSS Guidelines

### Custom Classes
- Must begin with `custom-` prefix or they get stripped
- Example: `class="custom-button"` works, `class="button"` gets removed

### Inline Styles
- Inline styles work but itch.io's sanitizer may modify or strip certain properties
- Avoid complex CSS like `linear-gradient` which may not render properly
- Use simple, well-supported properties

### Custom CSS Access
- Not available by default
- Must contact itch.io support to enable
- All custom rules should be inside `#wrapper` selector

## Best Practices
1. Use inline styles for project descriptions (no custom CSS classes)
2. Stick to basic HTML tags (divs, spans, paragraphs)
3. Avoid advanced CSS features (gradients, transforms, animations)
4. Test rendering on itch.io after making changes
5. Use semantic HTML where possible (`<details>`, `<strong>`, etc.)
6. Keep markup simple and compatible

## Known Issues
- Flexbox (`display: flex`) may have limited support
- Gradients (`linear-gradient`) often don't render
- Advanced positioning may be stripped
- Rich text editor can rewrite custom HTML - edit in HTML mode only

## CRITICAL: Inline CSS Property Whitelist (Verified 2025-12-18)

After testing with live itch.io pages, these are the CSS properties that survive the sanitizer:

### ALLOWED Inline CSS Properties
- `opacity`
- `margin` (all variants: margin-top, margin-bottom, etc.)
- `padding` (all variants)
- `text-align`

### STRIPPED Inline CSS Properties
itch.io's sanitizer removes these properties from inline styles:
- `font-size` - STRIPPED
- `font-weight` - STRIPPED
- `letter-spacing` - STRIPPED
- `text-transform` - STRIPPED
- `background` (all background properties including colors) - STRIPPED
- `border` (all border properties) - STRIPPED
- `border-radius` - STRIPPED
- `box-shadow` - STRIPPED
- `display` (including inline-block, flex) - STRIPPED
- `color` (in many contexts) - STRIPPED

### Editor vs Published Discrepancy
**IMPORTANT**: The itch.io HTML editor preview shows your RAW HTML, but the published page shows the SANITIZED version. This means:
- Editor looks perfect with all your styling
- Published page strips most CSS properties
- Always test on the actual published page (use secret URL for unpublished projects)

### Solution: Use Semantic HTML
Since inline styles are heavily restricted, use semantic HTML elements that inherit itch.io's default styling:
- `<h1>`, `<h2>`, `<h3>` for headings
- `<strong>` for bold text
- `<em>` for emphasized/italic text
- `<blockquote>` for callout boxes
- `<hr>` for dividers
- `<small>` for smaller text
- `<details>` and `<summary>` for collapsible sections

### Alternative: Request Custom CSS Access
For full styling control, contact itch.io support to enable custom CSS for your account
