# BlogCard Component

Magazine-style feature box for blog post previews. Inspired by PC Gamer layouts with bold imagery, full-color category badges, and confident hover states.

## Features

- **Magazine Feature Box Layout**: Bold featured images with gradient overlays
- **Full-Color Category Badges**: Burgundy/Rust/Denim badges that pop
- **Featured Variant**: Enhanced layout for featured posts with larger size and FEATURED ribbon
- **Magazine-Style Hover States**: Card lifts, image zooms, title color changes
- **Responsive Design**: Works across mobile (1 col), tablet (2 cols), desktop (3 cols)
- **Accessibility**: ARIA labels, semantic links, keyboard navigation

## Usage

### Basic Card

```tsx
import { BlogCard } from '@/components/molecules/BlogCard';

<BlogCard post={blogPost} />
```

### Featured Variant

```tsx
<BlogCard post={blogPost} featured />
// or
<BlogCard post={blogPost} variant="featured" />
```

### With Category Badge

```tsx
<BlogCard post={blogPost} showCategory />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `post` | `BlogPostMetadata` | required | Blog post data including title, excerpt, author, etc. |
| `showCategory` | `boolean` | `false` | Show category badge in metadata (when no featured image) |
| `className` | `string` | `undefined` | Additional CSS classes |
| `featured` | `boolean` | `false` | Use featured variant with enhanced styling |
| `variant` | `'default' \| 'featured'` | `'default'` | Layout variant |

## Layout Structure

```
┌─────────────────────────────────┐
│  [Featured Image with Overlay]  │
│  [Category Badge - Full Color]  │
│  [Featured Ribbon (if featured)] │
│  ─────────────────────────────  │
│  BOLD TITLE (Headline Style)    │
│  Excerpt text (2-3 lines)...    │
│  ─────────────────────────────  │
│  [Tag] [Tag]  Author • Date →   │
└─────────────────────────────────┘
```

## Responsive Layouts

### Grid Layout (Home Page)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {posts.map(post => (
    <BlogCard key={post.slug} post={post} />
  ))}
</div>
```

### Magazine Layout (Mixed Sizes)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <BlogCard post={featuredPost} featured className="lg:col-span-2" />
  {regularPosts.map(post => (
    <BlogCard key={post.slug} post={post} />
  ))}
</div>
```

### Stack Layout (Category Pages)

```tsx
<div className="space-y-6 max-w-3xl">
  {posts.map(post => (
    <BlogCard key={post.slug} post={post} showCategory />
  ))}
</div>
```

## Hover States

- **Card Lift**: `translateY(-4px) scale(1.02)`
- **Shadow Increase**: `0 12px 24px rgba(0,0,0,0.15)`
- **Image Zoom**: `scale(1.05)`
- **Title Color Change**: Changes to rust accent
- **Transition**: `0.3s ease-out` for smooth animation

## Category Badge Mapping

| Category | Badge Variant | Color | Label |
|----------|---------------|-------|-------|
| `highlights` | `category-burgundy` | Burgundy (#8B4A6B) | HIGHLIGHTS |
| `articles` | `category-rust` | Rust (#C97D5F) | ARTICLES |
| `logs` | `category-denim` | Denim (#6B8FA3) | LOGS |

## Featured Image Requirements

- Recommended aspect ratio: 16:9 or 2:1
- Minimum width: 800px
- Format: JPG, PNG, WebP
- Optimized with Next.js Image component
- Automatically adds gradient overlay for text readability

## Accessibility

- Semantic HTML: `<article>` with proper ARIA labels
- Keyboard navigable: Focus states on link
- Screen reader friendly: `aria-label` describes full article title
- Proper heading hierarchy: Uses `h3` for titles (adjustable)

## Dependencies

- `@/components/atoms/Text` - Typography component
- `@/components/atoms/Badge` - Category and featured badges
- `@/components/molecules/MetaInfo` - Author, date, reading time display
- `@/components/molecules/TagList` - Tag display with truncation
- `next/link` - Client-side navigation
- `next/image` - Optimized image loading

## Design Philosophy

This component embodies the "magazine feature box" mentality from `/ai_docs/aesthetic/README.md`:

- **Bold, not subtle**: Colors pop, typography is confident
- **PC Gamer influence**: Layout hierarchy, visual punch
- **Warm flannel palette**: Burgundy, rust, denim with high contrast
- **Technical precision**: Clean code, proper accessibility
- **Magazine confidence**: Every post is worth reading

## Examples

See `BlogCard.example.tsx` for interactive examples.
