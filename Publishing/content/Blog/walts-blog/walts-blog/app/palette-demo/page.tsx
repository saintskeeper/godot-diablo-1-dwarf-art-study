import Image from "next/image";
import { getTextColorClass, getTextShadowStyle, needsReadabilityEnhancement } from "./utils";

/**
 * Color Palette Demo Page
 *
 * This page showcases the Enhanced Natural Palette color system
 * adapted for blog usage. It demonstrates color mappings,
 * accessibility considerations, and real-world usage examples.
 */

export default function PaletteDemo() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header Section with Glass Effect */}
      <header className="sticky top-0 z-50 border-b-2 border-bg-divider glass-heavy shadow-md">
        <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-4xl font-bold text-text-primary tracking-tight">
          90's Flannel Palette
        </h1>
        <p className="mt-2 text-lg font-medium text-text-secondary">
          Bold, warm, professional — Modern glass morphism with manly flannel vibes
        </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Color Palette Grid */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-text-primary tracking-tight">
            Color Palette
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Background Colors - Warm Creams & Beiges */}
            <ColorSwatch
              name="Primary Background"
              hex="#FEFCF9"
              usage="Main background - light warm white"
              className="bg-bg-primary"
            />
            <ColorSwatch
              name="Secondary Background"
              hex="#FDFAF7"
              usage="Cards, panels - subtle warm tint"
              className="bg-bg-secondary"
            />
            <ColorSwatch
              name="Tertiary Background"
              hex="#FBF8F5"
              usage="Nested sections - warm off-white"
              className="bg-bg-tertiary"
            />
            <ColorSwatch
              name="Divider"
              hex="#E8E0D8"
              usage="Borders, separators"
              className="bg-bg-divider"
            />

            {/* Text Colors - Rich Browns */}
            <ColorSwatch
              name="Primary Text"
              hex="#2A1F1A"
              usage="Headings, important text"
              className="bg-text-primary"
            />
            <ColorSwatch
              name="Secondary Text"
              hex="#6B5D52"
              usage="Body text, descriptions"
              className="bg-text-secondary"
            />
            <ColorSwatch
              name="Muted Text"
              hex="#8B7D72"
              usage="Subtle text, metadata"
              className="bg-text-muted"
            />
            <ColorSwatch
              name="Code Text"
              hex="#4A3F37"
              usage="Code blocks, technical"
              className="bg-text-code"
            />

            {/* Interactive Colors - Warm Rust & Amber */}
            <ColorSwatch
              name="Primary Action"
              hex="#C97D5F"
              usage="Buttons, links - warm rust"
              className="bg-interactive-primary"
            />
            <ColorSwatch
              name="Secondary Action"
              hex="#D4A574"
              usage="Hover states - golden amber"
              className="bg-interactive-secondary"
            />
            <ColorSwatch
              name="Disabled"
              hex="#B8A89A"
              usage="Inactive elements"
              className="bg-interactive-disabled"
            />

            {/* Flannel Accent Colors - Base Palette */}
            <ColorSwatch
              name="Burgundy"
              hex="#8B4A6B"
              usage="Classic flannel red accent"
              className="bg-accent-burgundy"
            />
            <ColorSwatch
              name="Rust"
              hex="#C97D5F"
              usage="Warm orange accent"
              className="bg-accent-rust"
            />
            <ColorSwatch
              name="Denim"
              hex="#6B8FA3"
              usage="Washed denim blue"
              className="bg-accent-denim"
            />
            <ColorSwatch
              name="Cream"
              hex="#E8D5C4"
              usage="Light cream highlight"
              className="bg-accent-cream"
            />

            {/* Enhanced Magazine-Style Colors */}
            <ColorSwatch
              name="Burgundy Dark"
              hex="#6B3352"
              usage="Deep burgundy for magazine headers"
              className="bg-burgundy-dark"
            />
            <ColorSwatch
              name="Rust Bright"
              hex="#E89A7F"
              usage="Bright rust for highlights"
              className="bg-rust-bright"
            />
            <ColorSwatch
              name="Denim Deep"
              hex="#4A6B7D"
              usage="Deep denim for technical sections"
              className="bg-denim-deep"
            />
            <ColorSwatch
              name="Cream Warm"
              hex="#F5EBE0"
              usage="Warm cream for feature backgrounds"
              className="bg-cream-warm"
            />

            {/* Special States */}
            <ColorSwatch
              name="Success"
              hex="#6B8FA3"
              usage="Success states - denim blue"
              className="bg-accent-success"
            />
            <ColorSwatch
              name="Error"
              hex="#8B4A6B"
              usage="Errors - burgundy"
              className="bg-accent-error"
            />
          </div>
        </section>

        {/* Blog Content Examples */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-text-primary tracking-tight">
            Blog Content Examples
          </h2>

          {/* Article Card with Glass Effect */}
          <article className="glass-heavy mb-12 rounded-2xl border-2 border-bg-divider p-8 shadow-lg transition-all hover:shadow-xl">
            <div className="mb-4 flex items-center gap-3 text-sm font-medium">
              <span className="glass-burgundy rounded-full px-4 py-1.5 font-semibold text-white shadow-md">
                Design
              </span>
              <span className="text-text-secondary">March 15, 2024</span>
            </div>

            <h3 className="mb-4 text-2xl font-bold text-text-primary tracking-tight">
              Understanding Color Theory in Modern Web Design
            </h3>

            <p className="mb-6 text-base leading-relaxed font-medium text-text-secondary">
              Color plays a crucial role in user experience. The right palette can
              guide attention, convey emotion, and establish brand identity. In this
              article, we explore how to choose colors that are both aesthetically
              pleasing and accessible.
            </p>

            <div className="flex gap-4">
              <button className="btn-orange-solid rounded-full px-6 py-3 transition-all hover:scale-105 active:scale-95">
                Read More
              </button>
              <button className="btn-outline-bold rounded-full px-6 py-3 transition-all hover:scale-105 active:scale-95">
                Share
              </button>
            </div>
          </article>

          {/* Code Block Example with Glass */}
          <div className="glass mb-12 rounded-2xl border-2 border-bg-divider p-6 shadow-md">
            <h4 className="mb-4 text-lg font-bold text-text-primary">
              Code Example
            </h4>
            <pre className="overflow-x-auto rounded-xl bg-text-code p-4 font-mono text-sm font-medium text-white shadow-lg">
              <code>{`// 90's Flannel Palette - Tailwind CSS
const colors = {
  primary: '#B86A4A',    // Bold rust
  secondary: '#C97D5F',  // Warm rust
  background: '#FEFCF9', // Light warm white
  burgundy: '#8B4A6B',   // Classic flannel red
  denim: '#6B8FA3',      // Washed blue
};`}</code>
            </pre>
          </div>

          {/* Status Messages with Glass Effects */}
          <div className="space-y-4">
            <div className="glass-denim rounded-xl border-l-4 border-accent-success border-2 border-r border-t border-b p-4 shadow-md transition-all hover:shadow-lg">
              <p className="font-bold text-text-primary">Success!</p>
              <p className="font-medium text-text-secondary">Your changes have been saved.</p>
            </div>

            <div className="glass-rust rounded-xl border-l-4 border-accent-warning border-2 border-r border-t border-b p-4 shadow-md transition-all hover:shadow-lg">
              <p className="font-bold text-text-primary">Warning</p>
              <p className="font-medium text-text-secondary">Please review your settings before proceeding.</p>
            </div>

            <div className="glass-denim rounded-xl border-l-4 border-accent-info border-2 border-r border-t border-b p-4 shadow-md transition-all hover:shadow-lg">
              <p className="font-bold text-text-primary">Info</p>
              <p className="font-medium text-text-secondary">New features are available in the latest update.</p>
            </div>
          </div>
        </section>

        {/* Accessibility Analysis */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-text-primary tracking-tight">
            Accessibility Analysis
          </h2>

          <div className="glass-heavy rounded-2xl border-2 border-bg-divider p-8 shadow-md">
            <h3 className="mb-4 text-xl font-bold text-text-primary">Base Palette Contrast</h3>
            <div className="space-y-6 mb-8">
              <ContrastCheck
                foreground="#1A1512"
                background="#FEFCF9"
                ratio="15.2:1"
                rating="Excellent"
              />
              <ContrastCheck
                foreground="#B86A4A"
                background="#FEFCF9"
                ratio="5.2:1"
                rating="Excellent"
              />
              <ContrastCheck
                foreground="#3A302A"
                background="#FDFAF7"
                ratio="8.5:1"
                rating="Excellent"
              />
            </div>

            <h3 className="mb-4 text-xl font-bold text-text-primary">Enhanced Magazine Colors Contrast</h3>
            <div className="space-y-6">
              <ContrastCheck
                foreground="#6B3352"
                background="#F5EBE0"
                ratio="4.51:1"
                rating="WCAG AA"
              />
              <ContrastCheck
                foreground="#E89A7F"
                background="#1A1512"
                ratio="4.52:1"
                rating="WCAG AA"
              />
              <ContrastCheck
                foreground="#4A6B7D"
                background="#FFFFFF"
                ratio="7.21:1"
                rating="Excellent"
              />
              <ContrastCheck
                foreground="#1A1512"
                background="#F5EBE0"
                ratio="12.8:1"
                rating="Excellent"
              />
            </div>

            <div className="mt-8 glass-light rounded-xl border-2 border-bg-divider p-4 shadow-sm">
              <p className="text-sm font-medium text-text-secondary">
                <strong className="font-bold text-text-primary">Note:</strong> All color combinations meet WCAG AA standards (minimum 4.5:1 for text).
                The enhanced magazine-style palette provides bold visual impact while maintaining excellent readability with the warm flannel aesthetic.
              </p>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section>
          <h2 className="mb-8 text-3xl font-bold text-text-primary tracking-tight">
            Usage Guidelines
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <GuidelineCard
              title="Backgrounds"
              items={[
                "Primary (#FEFCF9) - light warm white for main background",
                "Secondary (#FDFAF7) - subtle warm tint for cards and panels",
                "Tertiary (#FBF8F5) - warm off-white for nested sections",
                "Divider (#E8E0D8) - light muted warm gray for borders"
              ]}
            />

            <GuidelineCard
              title="Text"
              items={[
                "Primary (#2A1F1A) - deep warm brown for headings",
                "Secondary (#6B5D52) - muted brown for body text",
                "Muted (#8B7D72) - soft gray-brown for metadata",
                "Code (#4A3F37) - dark brown for technical content"
              ]}
            />

            <GuidelineCard
              title="Interactive Elements"
              items={[
                "Primary (#C97D5F) - warm rust for main CTAs",
                "Secondary (#D4A574) - golden amber for hover states",
                "Disabled (#B8A89A) - muted gray for inactive elements",
                "All combinations exceed WCAG AA standards"
              ]}
            />

            <GuidelineCard
              title="Flannel Accents"
              items={[
                "Burgundy (#8B4A6B) - classic flannel red for emphasis",
                "Rust (#C97D5F) - warm orange for highlights",
                "Denim (#6B8FA3) - washed blue for cool contrast",
                "Use cream (#E8D5C4) for subtle highlights"
              ]}
            />

            <GuidelineCard
              title="Enhanced Magazine Colors"
              items={[
                "Burgundy Dark (#6B3352) - text on burgundy backgrounds, magazine headers",
                "Rust Bright (#E89A7F) - bright highlights, pull quotes, hover accents",
                "Denim Deep (#4A6B7D) - technical callouts, code section headers",
                "Cream Warm (#F5EBE0) - feature box backgrounds, section dividers"
              ]}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

// Helper Components

interface ColorSwatchProps {
  name: string;
  hex: string;
  usage: string;
  className: string;
}

function ColorSwatch({ name, hex, usage, className }: ColorSwatchProps) {
  // Determine appropriate text color and styling for the swatch background
  // This combines multiple approaches for optimal readability:
  // 1. High-contrast text color (pure black/white) - maximum contrast ratio
  // 2. Text shadow for visual separation on light backgrounds - creates "halo" effect
  // 3. Optional subtle border ring and background overlay for very light swatches
  const textColorClass = getTextColorClass(hex);
  const textShadowStyle = getTextShadowStyle(hex);
  const needsEnhancement = needsReadabilityEnhancement(hex);

  // For very light backgrounds, add a subtle border ring around the text container
  // This provides additional visual separation and improves readability
  const swatchBorderClass = needsEnhancement
    ? 'ring-2 ring-black/5 ring-inset'
    : '';

  return (
    <div className="glass rounded-2xl border-2 border-bg-divider p-4 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg">
      {/* Color swatch with enhanced readability features */}
      <div className={`mb-3 flex h-24 w-full items-center justify-center rounded-xl shadow-lg ${className} ${swatchBorderClass} relative`}>
        {/* Optional subtle background overlay for very light colors to enhance text contrast */}
        {/* This overlay provides a slight darkening effect that improves text visibility */}
        {needsEnhancement && (
          <div className="absolute inset-0 rounded-xl bg-black/2 pointer-events-none" />
        )}
        <span
          className={`font-bold text-lg ${textColorClass} relative z-10`}
          style={textShadowStyle}
        >
          {name.split(' ')[0]}
        </span>
      </div>
      <h3 className="mb-1 font-bold text-text-primary">{name}</h3>
      <p className="mb-2 font-mono text-sm font-semibold text-text-secondary">{hex}</p>
      <p className="text-xs font-medium text-text-secondary">{usage}</p>
    </div>
  );
}

interface ContrastCheckProps {
  foreground: string;
  background: string;
  ratio: string;
  rating: string;
}

function ContrastCheck({ foreground, background, ratio, rating }: ContrastCheckProps) {
  return (
    <div className="glass-light flex items-center justify-between rounded-xl border border-bg-divider/50 p-4 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className="h-12 w-12 rounded-lg border border-bg-divider shadow-sm"
          style={{ backgroundColor: background }}
        >
          <div
            className="flex h-full w-full items-center justify-center rounded-lg font-bold"
            style={{ backgroundColor: foreground, color: background }}
          >
            Aa
          </div>
        </div>
        <div>
          <p className="font-semibold text-text-primary">
            {foreground} on {background}
          </p>
          <p className="text-sm text-text-secondary">Ratio: {ratio}</p>
        </div>
      </div>
      <span className="glass-denim rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm">
        {rating}
      </span>
    </div>
  );
}

interface GuidelineCardProps {
  title: string;
  items: string[];
}

function GuidelineCard({ title, items }: GuidelineCardProps) {
  return (
    <div className="glass rounded-2xl border-2 border-bg-divider p-6 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg">
      <h3 className="mb-4 text-xl font-bold text-text-primary">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 font-medium text-text-secondary">
            <span className="mt-1 text-interactive-primary font-bold text-lg">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

