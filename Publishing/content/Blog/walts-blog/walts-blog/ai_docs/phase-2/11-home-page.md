CREATE: app/page.tsx (home page)

CONTEXT: Homepage with chronological blog feed
Display all blog posts in reverse chronological order with FloatingNav and CommandPalette.

DEPENDENCIES (must exist first):
- components/organisms/FloatingNav
- components/organisms/BlogList
- lib/blogs/utils (getAllBlogPostsMetadata)

REQUIREMENTS:
- Display all posts chronologically
- Show FloatingNav at top
- Hero section with title and description
- BlogList component for posts
- Featured posts section (optional)
- TypeScript with proper types
- Server component for data fetching

HOME PAGE CODE:
```tsx
// app/page.tsx
import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogList } from '@/components/organisms/BlogList';
import { Text } from '@/components/atoms/Text';
import { getAllBlogPostsMetadata, getFeaturedBlogPosts } from '@/lib/blogs/utils';
import { BlogCard } from '@/components/molecules/BlogCard';

export default async function HomePage() {
  const allPosts = await getAllBlogPostsMetadata();
  const featuredPosts = await getFeaturedBlogPosts();

  return (
    <>
      <FloatingNav />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <Text variant="h1" color="primary" className="mb-6">
            Walt's Blog
          </Text>
          <Text variant="body" color="secondary" className="text-lg max-w-2xl mx-auto">
            Technical insights, development logs, and curated highlights from both
            human and AI perspectives. Use <kbd className="glass-light px-2 py-1 rounded font-mono text-sm">CMD+K</kbd> to
            search and navigate.
          </Text>
        </section>

        {/* Featured Posts (if any) */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Text variant="h2" color="primary">
                Featured
              </Text>
              <div className="flex-1 h-px bg-text-muted/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <BlogCard
                  key={`${post.category}-${post.slug}`}
                  post={post}
                  showCategory
                />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Text variant="h2" color="primary">
              All Posts
            </Text>
            <div className="flex-1 h-px bg-text-muted/20" />
          </div>
          <BlogList posts={allPosts} layout="grid" showCategory />
        </section>
      </main>
    </>
  );
}

export const metadata = {
  title: "Walt's Blog - Technical Insights and Development Logs",
  description: "A personal blog exploring software engineering, development experiences, and technical topics through both human and AI perspectives.",
};
```

ALTERNATIVE MINIMAL VERSION:
```tsx
// app/page.tsx (simpler version)
import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogList } from '@/components/organisms/BlogList';
import { getAllBlogPostsMetadata } from '@/lib/blogs/utils';

export default async function HomePage() {
  const posts = await getAllBlogPostsMetadata();

  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <BlogList posts={posts} layout="grid" showCategory />
      </main>
    </>
  );
}
```

WITH STATS SECTION:
```tsx
// Add stats before BlogList
<section className="glass rounded-2xl p-8 mb-16">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
    <div>
      <Text variant="h3" color="rust">{allPosts.length}</Text>
      <Text variant="small" color="secondary">Total Posts</Text>
    </div>
    <div>
      <Text variant="h3" color="burgundy">
        {allPosts.filter(p => p.category === 'highlights').length}
      </Text>
      <Text variant="small" color="secondary">Highlights</Text>
    </div>
    <div>
      <Text variant="h3" color="rust">
        {allPosts.filter(p => p.category === 'articles').length}
      </Text>
      <Text variant="small" color="secondary">Articles</Text>
    </div>
    <div>
      <Text variant="h3" color="denim">
        {allPosts.filter(p => p.category === 'logs').length}
      </Text>
      <Text variant="small" color="secondary">Logs</Text>
    </div>
  </div>
</section>
```

LOADING STATE:
```tsx
// app/loading.tsx
import { BlogListLoading } from '@/components/organisms/BlogList/Loading';
import { FloatingNav } from '@/components/organisms/FloatingNav';

export default function Loading() {
  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-pulse">
          <div className="h-16 bg-text-muted/10 rounded-xl mb-6 max-w-lg mx-auto" />
          <div className="h-6 bg-text-muted/10 rounded-lg mb-3 max-w-2xl mx-auto" />
          <div className="h-6 bg-text-muted/10 rounded-lg max-w-xl mx-auto" />
        </div>
        <BlogListLoading />
      </main>
    </>
  );
}
```

ERROR STATE:
```tsx
// app/error.tsx
'use client';

import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { FloatingNav } from '@/components/organisms/FloatingNav';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="glass rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <Text variant="h2" color="primary" className="mb-4">
            Something went wrong
          </Text>
          <Text variant="body" color="secondary" className="mb-6">
            {error.message || 'Failed to load blog posts. Please try again.'}
          </Text>
          <Button variant="rust-solid" onClick={reset}>
            Try again
          </Button>
        </div>
      </main>
    </>
  );
}
```

VERIFICATION:
- All posts display chronologically
- FloatingNav shows at top
- Hero section renders correctly
- Featured posts highlighted
- BlogList with filtering works
- Metadata correct for SEO
- Loading and error states work
- Responsive layout
