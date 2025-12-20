CREATE: components/molecules/BlogCard/index.tsx

CONTEXT: Blog post preview card molecule
Glass morphism card displaying post excerpt with metadata, tags, and click navigation.

DEPENDENCIES (must exist first):
- components/atoms/Text
- components/molecules/MetaInfo
- components/molecules/TagList
- Next.js Link component

REQUIREMENTS:
- Glass morphism card with hover effects
- Post title (h3 heading)
- Post excerpt (truncated)
- MetaInfo display (author, date, reading time)
- TagList display (limited to 3 tags)
- Click to navigate to full post
- Featured indicator badge
- Hover scale and glass-heavy transition
- TypeScript props interface

COMPONENT CODE:
```tsx
// components/molecules/BlogCard/index.tsx
import { Text } from '@/components/atoms/Text';
import { Badge } from '@/components/atoms/Badge';
import { MetaInfo } from '@/components/molecules/MetaInfo';
import { TagList } from '@/components/molecules/TagList';
import Link from 'next/link';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

export interface BlogCardProps {
  post: BlogPostMetadata;
  showCategory?: boolean;
  className?: string;
}

export const BlogCard = ({
  post,
  showCategory = false,
  className,
}: BlogCardProps) => {
  const postUrl = `/${post.category}/${post.slug}`;

  return (
    <Link href={postUrl} className="block group">
      <article
        className={`
          glass-light hover:glass-heavy
          rounded-2xl p-6
          transition-all duration-300 ease-out
          hover:scale-[1.02] hover:-translate-y-1
          border border-text-muted/10
          ${className}
        `}
      >
        {/* Header: Title + Featured Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <Text
            variant="h3"
            color="primary"
            className="group-hover:text-rust-base transition-colors line-clamp-2"
          >
            {post.title}
          </Text>

          {post.featured && (
            <Badge variant="rust" size="sm" showDot>
              Featured
            </Badge>
          )}
        </div>

        {/* Excerpt */}
        <Text
          variant="body"
          color="secondary"
          className="mb-4 line-clamp-3"
        >
          {post.excerpt}
        </Text>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-4">
            <TagList tags={post.tags} maxVisible={3} />
          </div>
        )}

        {/* Metadata */}
        <MetaInfo
          author={post.author}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          category={post.category}
          showCategory={showCategory}
        />
      </article>
    </Link>
  );
};
```

TECHNICAL SPECS:
```typescript
interface BlogCardProps {
  post: BlogPostMetadata; // From lib/blogs/schema
  showCategory?: boolean; // Show category badge in MetaInfo
  className?: string;
}

// BlogPostMetadata shape
type BlogPostMetadata = {
  slug: string;
  title: string;
  excerpt: string;
  author: 'walter' | 'walternate';
  category: 'highlights' | 'articles' | 'logs';
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  readingTime: number;
};
```

USAGE EXAMPLES:
```tsx
import { BlogCard } from '@/components/molecules/BlogCard';

// In blog list
const posts = await getAllBlogPostsMetadata();

return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {posts.map((post) => (
      <BlogCard key={post.slug} post={post} showCategory />
    ))}
  </div>
);

// Single category page (no category badge needed)
const articles = await getBlogPostsByCategory('articles');

return (
  <div className="space-y-4">
    {articles.map((post) => (
      <BlogCard key={post.slug} post={post} />
    ))}
  </div>
);
```

RESPONSIVE LAYOUTS:
```tsx
// Grid layout (home page)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {posts.map(post => <BlogCard key={post.slug} post={post} />)}
</div>

// Stack layout (category pages)
<div className="space-y-6 max-w-3xl">
  {posts.map(post => <BlogCard key={post.slug} post={post} />)}
</div>

// Magazine-style layout (mixed sizes)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <BlogCard post={featured} className="lg:col-span-2 lg:row-span-2" />
  {other.map(post => <BlogCard key={post.slug} post={post} />)}
</div>
```

CSS UTILITIES USED:
```css
/* Tailwind utilities */
.line-clamp-2 /* Truncate title to 2 lines */
.line-clamp-3 /* Truncate excerpt to 3 lines */
.glass-light /* Base glass effect */
.glass-heavy /* Hover glass effect */
.hover:scale-[1.02] /* Subtle scale on hover */
.hover:-translate-y-1 /* Lift on hover */
```

VERIFICATION:
- Card displays all post metadata
- Hover effects work (scale, translate, glass-heavy)
- Title color transitions to rust on hover
- Featured badge displays when applicable
- Tags limited to 3 visible
- Click navigates to correct post URL
- Line clamping works for title and excerpt
- Responsive in grid and stack layouts
