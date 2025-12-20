/**
 * Cozy Forge Theme - WaltMakes Brand Colors
 *
 * A fusion of cassette futurism and wabi-sabi, refined through
 * the Duck Viking mascot's vivid teal-orange palette.
 */

export const cozyForge = {
  colors: {
    // Backgrounds
    parchment: '#F5EDE0',      // Primary background
    warmCream: '#E8E4DC',      // Secondary background
    hornIvory: '#E8DCC8',      // Cards, elevated surfaces

    // Text
    deepInk: '#2A2520',        // Primary text
    furBrown: '#7A5040',       // Secondary text
    steelGray: '#5A6878',      // Tertiary/muted text

    // Accents (Complementary Pair)
    vikingTeal: '#3B8D9A',     // Primary accent, links
    hearthOrange: '#E07040',   // CTA, highlights, warmth

    // Semantic
    forestGreen: '#4E9960',    // Success states
    emberRed: '#C85548',       // Error states
    fog: '#A8A498',            // Disabled, metadata
  },

  fonts: {
    sans: "'Inter', 'IBM Plex Sans', -apple-system, sans-serif",
    mono: "'Space Mono', 'JetBrains Mono', monospace",
  },
} as const;

// Tailwind-compatible color exports
export const colors = cozyForge.colors;
export const fonts = cozyForge.fonts;

// Default theme classes for components
export const defaultTheme = {
  slide: 'bg-parchment text-deep-ink',
  slideAlt: 'bg-warm-cream text-deep-ink',
  accent: 'text-viking-teal',
  cta: 'bg-hearth-orange text-white',
};
