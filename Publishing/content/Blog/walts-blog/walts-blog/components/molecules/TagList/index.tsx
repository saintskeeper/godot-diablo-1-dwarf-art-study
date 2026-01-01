'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics/posthog';

export interface TagListProps {
  tags: string[];
  maxVisible?: number;
  onTagClick?: (tag: string) => void;
  className?: string;
}

export const TagList = ({
  tags,
  maxVisible,
  onTagClick,
  className,
}: TagListProps) => {
  const [showAll, setShowAll] = useState(false);

  const displayTags = maxVisible && !showAll ? tags.slice(0, maxVisible) : tags;
  const remainingCount = tags.length - (maxVisible || 0);
  const hasMore = maxVisible && remainingCount > 0 && !showAll;

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {displayTags.map((tag) => (
        <span
          key={tag}
          onClick={() => {
            trackEvent('tag_clicked', {
              tag_name: tag,
              total_tags: tags.length,
              is_clickable: !!onTagClick,
            });
            onTagClick?.(tag);
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && onTagClick) {
              e.preventDefault();
              trackEvent('tag_clicked', {
                tag_name: tag,
                total_tags: tags.length,
                is_clickable: true,
              });
              onTagClick(tag);
            }
          }}
          role={onTagClick ? 'button' : undefined}
          tabIndex={onTagClick ? 0 : undefined}
          className={`
            inline-flex items-center
            text-[var(--text-primary)]
            border border-[var(--wm-fur-brown)]/40
            rounded-[1rem]
            px-[0.875rem] py-[0.375rem]
            font-semibold
            text-sm
            transition-all duration-200 ease-out
            ${onTagClick ? 'cursor-pointer hover:bg-[var(--wm-viking-teal)] hover:border-[var(--wm-viking-teal)] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(59,141,154,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wm-viking-teal)]' : ''}
          `}
        >
          {tag}
        </span>
      ))}

      {hasMore && (
        <span
          onClick={() => setShowAll(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowAll(true);
            }
          }}
          role="button"
          tabIndex={0}
          className="
            inline-flex items-center
            text-[var(--text-primary)]
            border border-[var(--wm-fur-brown)]/40
            rounded-[1rem]
            px-[0.875rem] py-[0.375rem]
            font-semibold
            text-sm
            transition-all duration-200 ease-out
            cursor-pointer
            hover:bg-[var(--wm-viking-teal)]
            hover:border-[var(--wm-viking-teal)]
            hover:text-white
            hover:-translate-y-0.5
            hover:shadow-[0_2px_8px_rgba(59,141,154,0.25)]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[var(--wm-viking-teal)]
          "
        >
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};
