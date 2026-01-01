'use client';

import Link from 'next/link';
import { Text } from '@/components/atoms/Text';
import { trackEvent } from '@/lib/analytics/posthog';

interface NavigationPost {
  title: string;
  slug: string;
  category: string;
}

interface PostNavigationProps {
  previousPost: NavigationPost | null;
  nextPost: NavigationPost | null;
  currentCategory: string;
  currentSlug: string;
}

export function PostNavigation({
  previousPost,
  nextPost,
  currentCategory,
  currentSlug,
}: PostNavigationProps) {
  const handleNavigationClick = (
    direction: 'previous' | 'next',
    targetPost: NavigationPost
  ) => {
    trackEvent('previous_next_navigation', {
      direction,
      from_category: currentCategory,
      from_slug: currentSlug,
      to_category: targetPost.category,
      to_slug: targetPost.slug,
      to_title: targetPost.title,
    });
  };

  return (
    <nav className="max-w-4xl mx-auto mt-16 pt-8 border-t border-text-muted/10">
      <div className="flex justify-between items-center gap-4">
        {previousPost ? (
          <Link
            href={`/${previousPost.category}/${previousPost.slug}`}
            className="glass hover:glass-heavy rounded-2xl p-6 flex-1 transition-all group"
            onClick={() => handleNavigationClick('previous', previousPost)}
          >
            <Text variant="small" color="muted" className="mb-2">
              ← Previous
            </Text>
            <Text
              variant="body"
              color="primary"
              className="font-medium group-hover:text-teal-dark transition-colors"
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
            onClick={() => handleNavigationClick('next', nextPost)}
          >
            <Text variant="small" color="muted" className="mb-2">
              Next →
            </Text>
            <Text
              variant="body"
              color="primary"
              className="font-medium group-hover:text-teal-dark transition-colors"
            >
              {nextPost.title}
            </Text>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}
