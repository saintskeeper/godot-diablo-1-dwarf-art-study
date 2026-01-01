'use client';

import { Text } from '@/components/atoms/Text';
import { BlogCard } from '@/components/molecules/BlogCard';
import { trackEvent } from '@/lib/analytics/posthog';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

interface RelatedPostsProps {
  posts: BlogPostMetadata[];
  category: string;
  currentSlug: string;
}

export function RelatedPosts({ posts, category, currentSlug }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  const handleRelatedPostClick = (post: BlogPostMetadata) => {
    trackEvent('related_post_clicked', {
      from_category: category,
      from_slug: currentSlug,
      to_category: post.category,
      to_slug: post.slug,
      to_title: post.title,
      related_posts_count: posts.length,
    });
  };

  return (
    <section className="max-w-4xl mx-auto mt-16 pt-16 border-t border-text-muted/10">
      <Text variant="h3" color="primary" className="mb-8">
        More from {category}
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((relatedPost) => (
          <div key={relatedPost.slug} onClick={() => handleRelatedPostClick(relatedPost)}>
            <BlogCard
              post={relatedPost}
              showCategory={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
