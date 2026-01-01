'use client';

import { Text } from '@/components/atoms/Text';
import { Badge } from '@/components/atoms/Badge';
import { MetaInfo } from '@/components/molecules/MetaInfo';
import { TagList } from '@/components/molecules/TagList';
import Link from 'next/link';
import Image from 'next/image';
import { BlogCardProps, categoryBadgeMap } from './BlogCard.types';
import { getCoverImageUrl } from '@/lib/images/cover-image';
import { trackEvent } from '@/lib/analytics/posthog';

export const BlogCard = ({
  post,
  showCategory = false,
  className,
  featured = false,
  variant = 'default',
}: BlogCardProps) => {
  const postUrl = `/${post.category}/${post.slug}`;
  const categoryConfig = categoryBadgeMap[post.category];
  const isFeaturedVariant = featured || variant === 'featured' || post.featured;
  const coverImageUrl = getCoverImageUrl(post.featuredImage);

  const handleClick = () => {
    trackEvent('blog_post_clicked', {
      post_title: post.title,
      post_slug: post.slug,
      post_category: post.category,
      post_author: post.author,
      is_featured: isFeaturedVariant,
      has_cover_image: !!coverImageUrl,
    });
  };

  return (
    <Link
      href={postUrl}
      className="block group"
      aria-label={`Read article: ${post.title}`}
      onClick={handleClick}
    >
      <article
        className={`
          relative overflow-hidden
          glass-light hover:glass-heavy
          rounded-lg
          transition-all duration-300 ease-out
          hover:scale-[1.02] hover:-translate-y-1
          border border-text-muted/10
          hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]
          ${isFeaturedVariant ? 'lg:row-span-2' : ''}
          ${className}
        `}
        role="article"
      >
        {/* Blurred Cover Photo Background */}
        {coverImageUrl && (
          <>
            {/* Background layer - heavily blurred */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={coverImageUrl}
                alt=""
                fill
                className="object-cover scale-110 blur-3xl opacity-40"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={isFeaturedVariant}
                aria-hidden="true"
              />
            </div>

            {/* Mid layer - medium blur for depth */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={coverImageUrl}
                alt=""
                fill
                className="object-cover scale-105 blur-xl opacity-30"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                aria-hidden="true"
              />
            </div>

            {/* Gradient overlays for cohesion and readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--wm-hearth-orange)]/20 via-transparent to-[var(--wm-viking-teal)]/20" />

            {/* Glass morphism enhancement */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />
          </>
        )}

        {/* Card Content - always uses relative positioning to stay above background */}
        <div className="relative p-6">
          {/* Category badge and featured badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <Badge
              variant={categoryConfig.variant}
              size="md"
              className={coverImageUrl ? 'shadow-lg backdrop-blur-md' : ''}
            >
              {categoryConfig.label}
            </Badge>

            {isFeaturedVariant && (
              <Badge
                variant="featured"
                size="lg"
                className={coverImageUrl ? 'shadow-lg backdrop-blur-md' : ''}
              >
                FEATURED
              </Badge>
            )}
          </div>

          {/* Title - Magazine headline style */}
          <Text
            variant={isFeaturedVariant ? 'subhead' : 'h3'}
            color="primary"
            weight={isFeaturedVariant ? 'black' : 'bold'}
            className={`
              mb-3 line-clamp-2
              transition-colors duration-300
              group-hover:text-[var(--teal-dark)]
              ${isFeaturedVariant ? 'text-[2rem] md:text-[2.25rem]' : ''}
              ${coverImageUrl ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : ''}
            `}
          >
            {post.title}
          </Text>

          {/* Excerpt */}
          <Text
            variant="body"
            color="secondary"
            className={`
              mb-4 line-clamp-3
              ${isFeaturedVariant ? 'text-base md:text-lg' : ''}
              ${coverImageUrl ? 'text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]' : ''}
            `}
          >
            {post.excerpt}
          </Text>

          {/* Divider */}
          <div className={`
            w-full h-px mb-4
            ${coverImageUrl
              ? 'bg-gradient-to-r from-transparent via-white/40 to-transparent'
              : 'bg-gradient-to-r from-transparent via-[var(--wm-viking-teal)]/30 to-transparent'
            }
          `} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-4">
              <TagList
                tags={post.tags}
                maxVisible={isFeaturedVariant ? 5 : 3}
              />
            </div>
          )}

          {/* Metadata */}
          <MetaInfo
            author={post.author}
            publishedAt={post.publishedAt}
            readingTime={post.readingTime}
            category={post.category}
            showCategory={showCategory && !coverImageUrl}
            className={`text-xs ${coverImageUrl ? 'text-white/80' : ''}`}
          />
        </div>
      </article>
    </Link>
  );
};
