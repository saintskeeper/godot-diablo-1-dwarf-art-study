/**
 * Cozy Forge Extended Theme - WaltMakes Brand Colors
 *
 * A fusion of cassette futurism and wabi-sabi, refined through
 * the Duck Viking mascot's vivid teal-orange palette.
 *
 * 32 unique colors across 6 palettes
 */

export const cozyForge = {
  // Neutrals (8 shades)
  neutral: {
    50: '#FDFBF7',
    100: '#F5EDE0',
    200: '#E8E4DC',
    300: '#E8DCC8',
    400: '#A8A498',
    500: '#5A6878',
    600: '#3D4550',
    700: '#2A2520',
  },

  // Viking Teal (8 shades)
  teal: {
    50: '#E8F4F6',
    100: '#C5E4E9',
    200: '#8ECAD4',
    300: '#5AABB8',
    400: '#3B8D9A',
    500: '#2E7280',
    600: '#225862',
    700: '#183E45',
  },

  // Hearth Orange (8 shades)
  orange: {
    50: '#FDF0E8',
    100: '#FADAC8',
    200: '#F4B898',
    300: '#EA936A',
    400: '#E07040',
    500: '#C45A30',
    600: '#9A4525',
    700: '#6E301A',
  },

  // Fur Brown (8 shades)
  brown: {
    50: '#F5EBE6',
    100: '#E0CCC0',
    200: '#C4A090',
    300: '#9C7868',
    400: '#7A5040',
    500: '#5E3D30',
    600: '#442C22',
    700: '#2A1C16',
  },

  // Forest Green (4 shades)
  green: {
    50: '#E8F5EB',
    100: '#C2E5CA',
    500: '#3D7A4C',
    600: '#2E5C3A',
  },

  // Ember Red (4 shades)
  red: {
    50: '#FCEAE8',
    100: '#F5CAC5',
    500: '#A84038',
    600: '#82302A',
  },

  fonts: {
    sans: "'Inter', 'IBM Plex Sans', -apple-system, sans-serif",
    mono: "'Space Mono', 'JetBrains Mono', monospace",
  },
} as const;

// Semantic aliases for common use cases
export const semantic = {
  parchment: cozyForge.neutral[100],
  warmCream: cozyForge.neutral[200],
  hornIvory: cozyForge.neutral[300],
  deepInk: cozyForge.neutral[700],
  furBrown: cozyForge.brown[400],
  steelGray: cozyForge.neutral[500],
  vikingTeal: cozyForge.teal[400],
  hearthOrange: cozyForge.orange[400],
  forestGreen: cozyForge.green[500],
  emberRed: cozyForge.red[500],
  fog: cozyForge.neutral[400],
};

// 3D Text effect colors
export const text3DColors = {
  face: cozyForge.neutral[50],
  extrusion: cozyForge.neutral[500],
  extrusionDark: cozyForge.neutral[600],
  background: cozyForge.orange[100],
};

// Default theme classes for components
export const defaultTheme = {
  slide: 'bg-parchment text-deep-ink',
  slideAlt: 'bg-warm-cream text-deep-ink',
  slideBrand: 'bg-orange-100 text-deep-ink',
  accent: 'text-viking-teal',
  cta: 'bg-hearth-orange text-white',
};
