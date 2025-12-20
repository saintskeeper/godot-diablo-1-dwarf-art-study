CREATE: app/[category]/[slug]/page.tsx

CONTEXT: Individual blog post page with dynamic routing
Display single blog post with MDX rendering, navigation, and related posts.

DEPENDENCIES (must exist first):
- components/organisms/FloatingNav
- components/organisms/BlogPost
- lib/blogs/utils (getBlogPost, getBlogPostsByCategory)
- next-mdx-remote (serialize)
- lib/mdx/config

REQUIREMENTS:
- Dynamic route for [category]/[slug]
- Render full blog post with MDX
- Generate static params for all posts
- 404 for non-existent posts
- Related posts section (optional)
- Previous/Next navigation (optional)
- TypeScript with proper types

BLOG POST PAGE:
```tsx
// app/[category]/[slug]/page.tsx
import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogPost } from '@/components/organisms/BlogPost';
import { BlogCard } from '@/components/molecules/BlogCard';
import { Text } from '@/components/atoms/Text';
import { getBlogPost, getBlogPostsByCategory } from '@/lib/blogs/utils';
import { serialize } from 'next-mdx-remote/serialize';
import { mdxOptions } from '@/lib/mdx/config';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = params;

  // Validate category
  if (!['highlights', 'articles', 'logs'].includes(category)) {
    notFound();
  }

  // Get blog post
  const post = await getBlogPost(category, slug);

  if (!post) {
    notFound();
  }

  // Serialize MDX content
  const mdxSource = await serialize(post.content, {
    mdxOptions,
  });

  // Get related posts (same category, excluding current)
  const categoryPosts = await getBlogPostsByCategory(category);
  const relatedPosts = categoryPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  // Remove content from post object (already serialized)
  const { content, ...postMetadata } = post;

  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Blog Post */}
        <BlogPost post={postMetadata} mdxSource={mdxSource} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto mt-16 pt-16 border-t border-text-muted/10">
            <Text variant="h3" color="primary" className="mb-8">
              More from {category}
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  showCategory={false}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const categories = ['highlights', 'articles', 'logs'];
  const params: { category: string; slug: string }[] = [];

  for (const category of categories) {
    const posts = await getBlogPostsByCategory(category);
    posts.forEach((post) => {
      params.push({
        category,
        slug: post.slug,
      });
    });
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { category, slug } = params;
  const post = await getBlogPost(category, slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Walt's Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author === 'walter' ? 'Walter' : 'Walternate AI'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}
```

WITH PREV/NEXT NAVIGATION:
```tsx
// Add after BlogPost component
{/* Previous/Next Navigation */}
<nav className="max-w-4xl mx-auto mt-16 pt-8 border-t border-text-muted/10">
  <div className="flex justify-between items-center gap-4">
    {previousPost ? (
      <Link
        href={`/${previousPost.category}/${previousPost.slug}`}
        className="glass hover:glass-heavy rounded-2xl p-6 flex-1 transition-all group"
      >
        <Text variant="small" color="muted" className="mb-2">
          ← Previous
        </Text>
        <Text
          variant="body"
          color="primary"
          className="font-medium group-hover:text-rust-base transition-colors"
        >
          {previousPost.title}
        </Text>
      </Link>
    ) : (
      <div className="flex-1" />
    )}

    {nextPost ? (
      <Link
        href={`/${nextPost.category}/${nextPost.slug}`}
        className="glass hover:glass-heavy rounded-2xl p-6 flex-1 transition-all group text-right"
      >
        <Text variant="small" color="muted" className="mb-2">
          Next →
        </Text>
        <Text
          variant="body"
          color="primary"
          className="font-medium group-hover:text-rust-base transition-colors"
        >
          {nextPost.title}
        </Text>
      </Link>
    ) : (
      <div className="flex-1" />
    )}
  </div>
</nav>
```

GET PREVIOUS/NEXT POSTS:
```typescript
// lib/blogs/utils.ts
export async function getPreviousNextPosts(
  category: string,
  slug: string
): Promise<{
  previous: BlogPostMetadata | null;
  next: BlogPostMetadata | null;
}> {
  const posts = await getBlogPostsByCategory(category);
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}
```

LOADING STATE:
```tsx
// app/[category]/[slug]/loading.tsx
import { FloatingNav } from '@/components/organisms/FloatingNav';

export default function Loading() {
  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <article className="max-w-4xl mx-auto animate-pulse">
          {/* Title */}
          <div className="h-16 bg-text-muted/10 rounded-xl mb-6" />

          {/* Metadata */}
          <div className="flex gap-4 mb-6">
            <div className="h-6 w-24 bg-text-muted/10 rounded-full" />
            <div className="h-6 w-32 bg-text-muted/10 rounded-full" />
            <div className="h-6 w-28 bg-text-muted/10 rounded-full" />
          </div>

          {/* Excerpt */}
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="h-6 bg-text-muted/10 rounded-lg mb-2" />
            <div className="h-6 bg-text-muted/10 rounded-lg w-3/4" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="h-4 bg-text-muted/10 rounded-lg" />
            <div className="h-4 bg-text-muted/10 rounded-lg" />
            <div className="h-4 bg-text-muted/10 rounded-lg w-5/6" />
            <div className="h-4 bg-text-muted/10 rounded-lg" />
            <div className="h-4 bg-text-muted/10 rounded-lg w-4/5" />
          </div>
        </article>
      </main>
    </>
  );
}
```

NOT FOUND PAGE:
```tsx
// app/[category]/[slug]/not-found.tsx
import { FloatingNav } from '@/components/organisms/FloatingNav';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="glass rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <Text variant="h1" color="primary" className="mb-4">
            404
          </Text>
          <Text variant="h3" color="secondary" className="mb-6">
            Blog post not found
          </Text>
          <Text variant="body" color="muted" className="mb-8">
            The post you're looking for doesn't exist or has been moved.
          </Text>
          <Link href="/">
            <Button variant="rust-solid">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
```

VERIFICATION:
- Dynamic routing works for all posts
- MDX content renders correctly
- generateStaticParams builds all pages
- 404 page shows for invalid posts
- Related posts display
- Previous/Next navigation works
- Metadata correct for SEO
- Loading states work
