// components/organisms/BlogPost/index.tsx
'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Text } from '@/components/atoms/Text';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { TagList } from '@/components/molecules/TagList';
import { TableOfContents } from './TableOfContents';
import { mdxComponents } from '@/lib/mdx/components';
import type { BlogPostWithContent } from '@/lib/blogs/schema';
import { useEffect, useState } from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

export interface BlogPostProps {
  post: Omit<BlogPostWithContent, 'content'>;
  mdxSource: MDXRemoteSerializeResult;
  className?: string;
}

const categoryConfig = {
  highlights: {
    label: 'HIGHLIGHTS',
    variant: 'teal' as const,
  },
  articles: {
    label: 'ARTICLES',
    variant: 'orange' as const,
  },
  logs: {
    label: 'LOGS',
    variant: 'brown' as const,
  },
};

const authorConfig = {
  walter: {
    label: 'Walter',
  },
  walternate: {
    label: 'Walternate AI',
  },
};

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

  const categoryInfo = categoryConfig[post.category];
  const authorInfo = authorConfig[post.author];
  const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy');

  return (
    <article className={className}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-bg-tertiary">
        <div
          className="h-full bg-teal-base transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Article Header - Magazine Style */}
      <header className="mb-12 max-w-6xl mx-auto">
        {/* Category Badge */}
        <div className="mb-6">
          <Badge variant={categoryInfo.variant} size="md" className="uppercase tracking-wider font-bold">
            {categoryInfo.label}
          </Badge>
        </div>

        {/* Bold Article Title - Magazine Style */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-text-primary mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Subheading/Excerpt - Magazine Style */}
        {post.excerpt && (
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-8 max-w-4xl font-medium">
            {post.excerpt}
          </p>
        )}

        {/* Metadata Bar with Rust Accents */}
        <div className="flex flex-wrap items-center gap-4 py-4 border-y border-teal-dark/30">
          {/* Author */}
          <div className="flex items-center gap-2 font-mono text-sm">
            <Icon icon={User} size="xs" className="text-teal-dark" />
            <span className="text-text-primary font-medium">By {authorInfo.label}</span>
          </div>

          <span className="text-teal-dark font-bold">•</span>

          {/* Date */}
          <div className="flex items-center gap-2 font-mono text-sm">
            <Icon icon={Calendar} size="xs" className="text-teal-dark" />
            <span className="text-text-secondary">{formattedDate}</span>
          </div>

          <span className="text-teal-dark font-bold">•</span>

          {/* Reading Time */}
          <div className="flex items-center gap-2 font-mono text-sm">
            <Icon icon={Clock} size="xs" className="text-teal-dark" />
            <span className="text-text-secondary">{post.readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* Magazine Column Layout: Main Content + Sidebar */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div className="min-w-0">
            {/* Feature Image Treatment - Magazine Cover Style */}
            {post.featuredImage && (
              <div className="relative w-full mb-12 rounded-lg overflow-hidden shadow-lg">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Optional gradient overlay for magazine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/40 via-transparent to-transparent" />
                </div>
              </div>
            )}

            {/* MDX Content with Magazine Typography */}
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-text-primary prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:text-text-primary prose-h3:mt-8 prose-h3:mb-4 prose-p:text-text-secondary prose-p:leading-relaxed prose-code:text-teal-dark prose-code:bg-bg-tertiary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-orange-base prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-text-primary prose-strong:text-text-primary prose-strong:font-bold">
              <MDXRemote {...mdxSource} components={mdxComponents} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-text-muted/10">
                <Text variant="small" color="muted" className="mb-3 uppercase tracking-wide font-bold">
                  Tags
                </Text>
                <TagList tags={post.tags} />
              </div>
            )}

            {/* About the Author */}
            <div className="mt-12 pt-8 border-t border-text-muted/10">
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
            </div>
          </div>

          {/* Sidebar Column (Desktop only) */}
          <aside className="hidden lg:block space-y-6">
            {/* Table of Contents */}
            <TableOfContents />
          </aside>
        </div>
      </div>

      {/* Mobile Tags (shown on mobile, hidden on desktop) */}
      {post.tags.length > 0 && (
        <div className="lg:hidden mt-12 pt-8 border-t border-text-muted/10 max-w-6xl mx-auto">
          <Text variant="small" color="muted" className="mb-3 uppercase tracking-wide font-bold">
            Tags
          </Text>
          <TagList tags={post.tags} />
        </div>
      )}
    </article>
  );
};
