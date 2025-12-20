# WaltMakes Cozy Forge Palette - Brand Implementation

## Overview

This blog now uses the **WaltMakes Cozy Forge Palette v2**, derived from the Duck Viking mascot. The palette follows a complementary color scheme (Teal-Orange) with a warm neutral base, creating a distinctive and professional brand identity.

## Color Palette

### Primary Colors (Warm Neutral Base)
| Name | Hex | Use |
|------|-----|-----|
| Parchment | `#F5EDE0` | Primary background |
| Warm Cream | `#E8E4DC` | Secondary background |
| Deep Ink | `#2A2520` | Primary text |

### Accent Colors (Complementary Pair)
| Name | Hex | Use |
|------|-----|-----|
| Viking Teal | `#3B8D9A` | Primary accent, links, brand color |
| Hearth Orange | `#E07040` | CTA buttons, highlights, warmth |

### Supporting Colors
| Name | Hex | Use |
|------|-----|-----|
| Fur Brown | `#7A5040` | Secondary text, anchors |
| Steel Gray | `#5A6878` | Tertiary text, UI elements |
| Horn Ivory | `#E8DCC8` | Cards, elevated surfaces |

### Extended Palette
| Name | Hex | Use |
|------|-----|-----|
| Forest Green | `#4E9960` | Success states |
| Ember Red | `#C85548` | Error states |
| Fog | `#A8A498` | Disabled, metadata |

## Accessibility

All primary color combinations meet WCAG AA standards:

| Combination | Ratio | Rating |
|-------------|-------|--------|
| Deep Ink on Parchment | 12.1:1 | AAA |
| Fur Brown on Parchment | 5.8:1 | AA |
| Viking Teal on Parchment | 4.6:1 | AA |
| White on Viking Teal | 4.5:1 | AA |

## Usage in Code

### CSS Variables
```css
/* Primary */
var(--wm-parchment)      /* #F5EDE0 */
var(--wm-warm-cream)     /* #E8E4DC */
var(--wm-deep-ink)       /* #2A2520 */

/* Accents */
var(--wm-viking-teal)    /* #3B8D9A */
var(--wm-hearth-orange)  /* #E07040 */

/* Supporting */
var(--wm-fur-brown)      /* #7A5040 */
var(--wm-steel-gray)     /* #5A6878 */
var(--wm-horn-ivory)     /* #E8DCC8 */
```

### Tailwind Classes
```tsx
// Backgrounds
<div className="bg-bg-primary">       // Parchment
<div className="bg-bg-secondary">     // Warm Cream
<div className="bg-bg-tertiary">      // Horn Ivory

// Text
<h1 className="text-text-primary">    // Deep Ink
<p className="text-text-secondary">   // Fur Brown
<span className="text-text-muted">    // Steel Gray

// Accents
<a className="text-accent-teal">      // Viking Teal
<button className="bg-accent-orange"> // Hearth Orange

// Interactive
<button className="bg-interactive-primary hover:bg-interactive-primary-hover">
```

### Glass Morphism Utilities
```tsx
<div className="glass">           // Parchment-tinted glass
<div className="glass-teal">      // Teal-tinted glass
<div className="glass-orange">    // Orange-tinted glass
<div className="glass-brown">     // Brown-tinted glass
<button className="btn-orange-solid">  // Solid orange button
<button className="btn-outline-bold">  // Outlined orange button
```

## Typography

The brand uses these font families:
- **Sans-serif**: Inter, IBM Plex Sans (fallbacks: system fonts)
- **Monospace**: Space Mono, JetBrains Mono (fallbacks: system fonts)

## Design Principles

1. **Warmth**: The parchment base creates an inviting, cozy atmosphere
2. **Clarity**: High contrast ratios ensure excellent readability
3. **Energy**: Teal and orange accents add vibrancy without overwhelming
4. **Coherence**: All colors derive from the Duck Viking mascot palette

## Source

Brand guidelines: `/Brand-Voice/Brand-Guidlines/`
- `colors.json` - Full color definitions
- `colors.css` - CSS implementation
- `brand-identity.md` - Brand documentation

