'use client';

import { BlogCard } from '@/components/molecules/BlogCard';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { useState, useMemo } from 'react';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

export interface BlogListProps {
  posts: BlogPostMetadata[];
  layout?: 'grid' | 'stack';
  showCategory?: boolean;
  emptyMessage?: string;
  className?: string;
}

type SortOption = 'newest' | 'oldest' | 'reading-time-asc' | 'reading-time-desc';
type FilterOption = 'all' | 'walter' | 'walternate' | 'featured';

export const BlogList = ({
  posts,
  layout = 'grid',
  showCategory = true,
  emptyMessage = 'No blog posts found.',
  className,
}: BlogListProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  // Filter posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Apply filters
    if (filterBy === 'featured') {
      result = result.filter((post) => post.featured);
    } else if (filterBy === 'walter' || filterBy === 'walternate') {
      result = result.filter((post) => post.author === filterBy);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'reading-time-asc':
          return a.readingTime - b.readingTime;
        case 'reading-time-desc':
          return b.readingTime - a.readingTime;
        default:
          return 0;
      }
    });

    return result;
  }, [posts, sortBy, filterBy]);

  const layoutClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    stack: 'space-y-6 max-w-3xl',
  };

  return (
    <div className={className}>
      {/* Filters and Sorting */}
      {posts.length > 0 && (
        <div className="mb-8 glass rounded-2xl p-4 flex flex-wrap items-center gap-4">
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Text variant="small" color="secondary" className="font-medium">
              Filter:
            </Text>
            <div className="flex gap-2">
              {(['all', 'walter', 'walternate', 'featured'] as FilterOption[]).map(
                (option) => (
                  <Button
                    key={option}
                    variant={filterBy === option ? 'orange-solid' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterBy(option)}
                  >
                    {option === 'all' ? 'All' : option === 'featured' ? 'Featured' : option}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-text-muted/20" />

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Text variant="small" color="secondary" className="font-medium">
              Sort:
            </Text>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="glass-light rounded-lg px-3 py-1.5 text-sm text-text-primary border border-text-muted/10 focus:outline-none focus:ring-2 focus:ring-teal-base"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="reading-time-asc">Quick Reads</option>
              <option value="reading-time-desc">Long Reads</option>
            </select>
          </div>

          {/* Results count */}
          <div className="ml-auto">
            <Text variant="small" color="muted">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </Text>
          </div>
        </div>
      )}

      {/* Posts Grid/Stack */}
      {filteredPosts.length > 0 ? (
        <div className={layoutClasses[layout]}>
          {filteredPosts.map((post) => (
            <BlogCard
              key={`${post.category}-${post.slug}`}
              post={post}
              showCategory={showCategory}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass rounded-2xl p-12 text-center">
          <Text variant="h4" color="muted" className="mb-2">
            {emptyMessage}
          </Text>
          {filterBy !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterBy('all')}
              className="mt-4"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
