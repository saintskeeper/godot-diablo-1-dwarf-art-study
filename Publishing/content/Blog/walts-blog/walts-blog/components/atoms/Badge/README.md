# Badge Component

Magazine-style section markers with bold, full-color backgrounds inspired by PC Gamer magazine covers.

## Design Philosophy

Badges serve as **bold category labels** and **section markers**, similar to how magazines organize content sections. They use full background fills (not outlines) with uppercase text and strong contrast for maximum visibility.

## Usage

```tsx
import { Badge } from '@/components/atoms/Badge';

// Magazine category badges (primary use case)
<Badge variant="category-burgundy">Articles</Badge>
<Badge variant="category-rust">Tutorials</Badge>
<Badge variant="category-denim">Technical</Badge>

// Featured content badge with gradient
<Badge variant="featured" size="lg">Featured</Badge>

// With status indicator dot
<Badge variant="category-rust" showDot>New</Badge>
```

## Variants

### Magazine Category Badges (Primary)

**Bold, full-color section markers** - the main use case for the redesign:

- `category-burgundy` - Warm burgundy background, white text
- `category-rust` - Warm rust/orange background, white text
- `category-denim` - Cool denim blue background, white text

These use:
- Full background color fills
- Uppercase text with letter spacing (0.05em)
- Font weight 700 (bold)
- Subtle rounded corners (0.125rem)
- Small shadow for depth

### Featured Badge

**Gradient badge for special content**:

- `featured` - Burgundy-to-rust gradient with enhanced shadow

Perfect for "Editor's Pick" or premium content markers. Includes:
- Linear gradient background
- Box shadow: `0 4px 12px rgba(201, 125, 95, 0.4)`
- Best used with `size="lg"`

### Legacy Variants (Backwards Compatible)

Original pill-style badges preserved for existing usage:

- `rust` - Solid rust background, rounded pill
- `rust-outline` - Outline style with rust border
- `burgundy` - Solid burgundy background, rounded pill
- `burgundy-outline` - Outline style with burgundy border
- `denim` - Solid denim background, rounded pill
- `denim-outline` - Outline style with denim border
- `cream` - Cream background for subtle tags
- `neutral` - Gray background for generic labels

## Sizes

- `sm` (10px) - Tight spacing for small tags
- `md` (12px) - Standard category badge size (default)
- `lg` (14px) - Featured badge size

## Props

```typescript
interface BadgeProps {
  variant?:
    | 'category-burgundy' | 'category-rust' | 'category-denim'
    | 'featured'
    | 'rust' | 'rust-outline' | 'burgundy' | 'burgundy-outline'
    | 'denim' | 'denim-outline' | 'cream' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean; // Optional status indicator dot
  className?: string;
  children: React.ReactNode;
}
```

## Design Specifications

### Typography
- **Text Transform**: Uppercase
- **Letter Spacing**: 0.05em (via `tracking-wide`)
- **Font Weight**: 700 (bold)

### Colors
- **Burgundy**: `var(--accent-burgundy)` (#8B4A6B)
- **Rust**: `var(--accent-rust)` (#C97D5F)
- **Denim**: `var(--accent-denim)` (#6B8FA3)
- **Text**: White for colored backgrounds

### Spacing
- **Padding (md)**: 0.75rem horizontal, 0.25rem vertical
- **Border Radius**: 0.125rem (subtle, magazine-style)
- **Gap**: 0.375rem (when using dot indicator)

## Accessibility

- **Contrast Ratios**: All color combinations meet WCAG AA standards
- **Semantic HTML**: Uses `<span>` with appropriate ARIA attributes
- **Keyboard Navigation**: Supports focus states when used in interactive contexts

## Examples

### Blog Card Categories
```tsx
<Badge variant="category-burgundy">Articles</Badge>
<Badge variant="category-rust">Tutorials</Badge>
<Badge variant="category-denim">Technical Logs</Badge>
```

### Featured Content
```tsx
<Badge variant="featured" size="lg">Featured</Badge>
<Badge variant="featured" size="md">Editor's Pick</Badge>
```

### With Status Indicators
```tsx
<Badge variant="category-rust" showDot>New Post</Badge>
<Badge variant="category-denim" showDot>Updated</Badge>
```

### Multiple Sizes
```tsx
<Badge variant="category-burgundy" size="sm">Tag</Badge>
<Badge variant="category-burgundy" size="md">Category</Badge>
<Badge variant="category-burgundy" size="lg">Feature</Badge>
```

## Design References

- **Aesthetic Guide**: `/aesthetic.md` (lines 286-307)
- **Color System**: `/aesthetic.md` (lines 82-122)
- **Typography**: `/aesthetic.md` (lines 125-204)

## Related Components

- **TagList**: For collections of clickable tags
- **BlogCard**: Primary usage context for category badges
- **MetaInfo**: Complementary metadata display
