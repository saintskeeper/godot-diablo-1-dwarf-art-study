import { Badge } from './index';

/**
 * Badge Component Examples
 *
 * Magazine-style section markers with full-color backgrounds
 */
export default function BadgeExample() {
  return (
    <div className="p-8 space-y-8 bg-[var(--bg-primary)]">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
          Magazine Category Badges
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Bold, full-color section markers inspired by magazine covers
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="category-brown" size="md">Articles</Badge>
          <Badge variant="category-orange" size="md">Tutorials</Badge>
          <Badge variant="category-teal" size="md">Technical</Badge>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
          Featured Badge
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Gradient badge with shadow for featured content
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="featured" size="lg">Featured</Badge>
          <Badge variant="featured" size="md">Editor&apos;s Pick</Badge>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
          All Sizes
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Small (tags), Medium (categories), Large (featured)
        </p>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="category-brown" size="sm">Small</Badge>
            <Badge variant="category-brown" size="md">Medium</Badge>
            <Badge variant="category-brown" size="lg">Large</Badge>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="category-orange" size="sm">Small</Badge>
            <Badge variant="category-orange" size="md">Medium</Badge>
            <Badge variant="category-orange" size="lg">Large</Badge>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="category-teal" size="sm">Small</Badge>
            <Badge variant="category-teal" size="md">Medium</Badge>
            <Badge variant="category-teal" size="lg">Large</Badge>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
          Legacy Variants (Backwards Compatible)
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Original rounded pill styles preserved for existing usage
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="orange">Orange</Badge>
          <Badge variant="orange-outline">Orange Outline</Badge>
          <Badge variant="brown">Brown</Badge>
          <Badge variant="brown-outline">Brown Outline</Badge>
          <Badge variant="teal">Teal</Badge>
          <Badge variant="teal-outline">Teal Outline</Badge>
          <Badge variant="cream">Cream</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
          With Dots
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Optional status indicator dots
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="category-brown" showDot>Live</Badge>
          <Badge variant="category-orange" showDot>New</Badge>
          <Badge variant="category-teal" showDot>Updated</Badge>
          <Badge variant="featured" size="lg" showDot>Trending</Badge>
        </div>
      </section>

      <section className="bg-[var(--text-primary)] p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">
          On Dark Background
        </h2>
        <p className="text-white/70 mb-4">
          Testing contrast and visibility on dark surfaces
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="category-brown">Articles</Badge>
          <Badge variant="category-orange">Tutorials</Badge>
          <Badge variant="category-teal">Technical</Badge>
          <Badge variant="featured" size="lg">Featured</Badge>
        </div>
      </section>
    </div>
  );
}
