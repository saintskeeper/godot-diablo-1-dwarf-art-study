CREATE: components/organisms/BlogPost/index.tsx

CONTEXT: Full blog post display with MDX rendering
Renders complete blog post with frontmatter metadata, MDX content, and reading experience optimizations.

DEPENDENCIES (must exist first):
- next-mdx-remote installed
- components/atoms/Text
- components/molecules/MetaInfo
- components/molecules/TagList
- lib/mdx/config (MDX options)
- lib/mdx/components (custom MDX components)

REQUIREMENTS:
- Render MDX content with custom components
- Display post header (title, metadata)
- Show tags
- Table of contents (optional)
- Reading progress indicator
- PC Gamer-inspired typography
- Glass card containers for content sections
- Responsive layout
- TypeScript props interface

COMPONENT CODE:
```tsx
// components/organisms/BlogPost/index.tsx
'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Text } from '@/components/atoms/Text';
import { MetaInfo } from '@/components/molecules/MetaInfo';
import { TagList } from '@/components/molecules/TagList';
import { mdxComponents } from '@/lib/mdx/components';
import type { BlogPostWithContent } from '@/lib/blogs/schema';
import { useEffect, useState } from 'react';

export interface BlogPostProps {
  post: Omit<BlogPostWithContent, 'content'>;
  mdxSource: MDXRemoteSerializeResult;
  className?: string;
}

export const BlogPost = ({ post, mdxSource, className }: BlogPostProps) => {
  const [readingProgress, setReadingProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <article className={`max-w-4xl mx-auto ${className}`}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-bg-tertiary">
        <div
          className="h-full bg-rust-base transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Post Header */}
      <header className="mb-12">
        {/* Title */}
        <Text variant="h1" color="primary" className="mb-6">
          {post.title}
        </Text>

        {/* Metadata */}
        <MetaInfo
          author={post.author}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          category={post.category}
          showCategory
          className="mb-6"
        />

        {/* Excerpt */}
        {post.excerpt && (
          <div className="glass rounded-2xl p-6 mb-6 border-l-4 border-rust-base">
            <Text variant="body" color="secondary" className="text-lg leading-relaxed">
              {post.excerpt}
            </Text>
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-6">
            <TagList tags={post.tags} />
          </div>
        )}
      </header>

      {/* MDX Content */}
      <div className="prose prose-lg max-w-none">
        <MDXRemote {...mdxSource} components={mdxComponents} />
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-text-muted/10">
        <div className="glass rounded-2xl p-6">
          <Text variant="h5" color="primary" className="mb-3">
            About the Author
          </Text>
          <Text variant="body" color="secondary">
            {post.author === 'walter'
              ? "Walter writes about software engineering, development experiences, and technical explorations with a conversational, first-principles approach."
              : "Walternate AI is Walter's AI assistant, providing structured technical logs, documentation, and implementation notes."}
          </Text>
        </div>
      </footer>
    </article>
  );
};
```

PROSE STYLING:
```css
/* Add to globals.css for MDX content typography */
.prose {
  @apply text-text-primary;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply font-bold text-text-primary;
}

.prose h1 {
  @apply text-5xl mt-8 mb-4;
}

.prose h2 {
  @apply text-4xl mt-8 mb-4;
}

.prose h3 {
  @apply text-3xl mt-6 mb-3;
}

.prose p {
  @apply my-4 leading-relaxed;
}

.prose a {
  @apply text-rust-base hover:text-rust-dark underline underline-offset-2;
}

.prose strong {
  @apply font-bold text-text-primary;
}

.prose code {
  @apply font-mono text-sm;
}

.prose pre {
  @apply rounded-xl p-4 overflow-x-auto my-6 glass-light border border-text-muted/10;
}

.prose :not(pre) > code {
  @apply px-1.5 py-0.5 rounded bg-text-muted/20 text-rust-base;
}

.prose ul,
.prose ol {
  @apply my-4 ml-6 space-y-2;
}

.prose ul {
  @apply list-disc;
}

.prose ol {
  @apply list-decimal;
}

.prose li {
  @apply text-text-primary;
}

.prose blockquote {
  @apply my-6 pl-6 border-l-4 border-rust-base glass-light rounded-r-xl py-4 pr-4 italic;
}

.prose img {
  @apply rounded-2xl my-6 w-full;
}

.prose hr {
  @apply my-8 border-text-muted/20;
}

.prose table {
  @apply w-full glass rounded-xl overflow-hidden my-6;
}

.prose th {
  @apply bg-rust-base/10 px-4 py-2 text-left font-semibold border-b border-text-muted/20;
}

.prose td {
  @apply px-4 py-2 border-b border-text-muted/10;
}
```

USAGE IN POST PAGE:
```tsx
// app/[category]/[slug]/page.tsx
import { BlogPost } from '@/components/organisms/BlogPost';
import { getBlogPost } from '@/lib/blogs/utils';
import { serialize } from 'next-mdx-remote/serialize';
import { mdxOptions } from '@/lib/mdx/config';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const post = await getBlogPost(params.category, params.slug);

  if (!post) {
    notFound();
  }

  // Serialize MDX content
  const mdxSource = await serialize(post.content, {
    mdxOptions,
  });

  // Remove content from post object (already in mdxSource)
  const { content, ...postMetadata } = post;

  return (
    <main className="container mx-auto px-4 py-12">
      <BlogPost post={postMetadata} mdxSource={mdxSource} />
    </main>
  );
}
```

TECHNICAL SPECS:
```typescript
interface BlogPostProps {
  post: Omit<BlogPostWithContent, 'content'>;
  mdxSource: MDXRemoteSerializeResult;
  className?: string;
}
```

TABLE OF CONTENTS EXTENSION (Optional):
```tsx
// components/organisms/BlogPost/TableOfContents.tsx
'use client';

import { Text } from '@/components/atoms/Text';
import { useEffect, useState } from 'react';

interface ToCItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'));
    const items: ToCItem[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: parseInt(el.tagName.charAt(1)),
    }));
    setHeadings(items);

    // Track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="glass rounded-2xl p-6 sticky top-24">
      <Text variant="h6" color="primary" className="mb-4">
        Table of Contents
      </Text>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}>
            <a
              href={`#${heading.id}`}
              className={`text-sm block transition-colors ${
                activeId === heading.id
                  ? 'text-rust-base font-medium'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

VERIFICATION:
- MDX content renders correctly
- Custom components work (headings, code, links)
- Reading progress bar updates on scroll
- Post metadata displays
- Tags are clickable
- Prose styling matches PC Gamer inspiration
- Responsive layout works
- Author section displays
