'use client';

import { Command } from 'cmdk';
import { Icon } from '@/components/atoms/Icon';
import { KeyboardKey } from '@/components/atoms/KeyboardKey';
import { Badge } from '@/components/atoms/Badge';
import { Text } from '@/components/atoms/Text';
import { GlossyFilters } from '@/components/atoms/GlossyFilters';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import {
  Home,
  Sparkles,
  FileText,
  Code2,
  Search,
  ArrowRight,
} from 'lucide-react';
import type { BlogPostMetadata } from '@/lib/blogs/schema';
import { trackEvent } from '@/lib/analytics/posthog';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPostMetadata[];
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/', shortcut: '1' },
  { id: 'highlights', label: 'Highlights', icon: Sparkles, href: '/highlights', shortcut: '2' },
  { id: 'articles', label: 'Articles', icon: FileText, href: '/articles', shortcut: '3' },
  { id: 'logs', label: 'Logs', icon: Code2, href: '/logs', shortcut: '4' },
];

const categoryConfig = {
  highlights: { label: 'Highlights', variant: 'brown' as const },
  articles: { label: 'Articles', variant: 'orange' as const },
  logs: { label: 'Logs', variant: 'teal' as const },
};

export const CommandPalette = ({ isOpen, onClose, posts }: CommandPaletteProps) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track search with debounce to avoid tracking every keystroke
  const handleSearchChange = (value: string) => {
    setSearch(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search tracking (500ms)
    if (value.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        trackEvent('command_palette_search', {
          search_query: value,
          query_length: value.length,
        });
      }, 500);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSearch('');
    }
    // Cleanup timeout on unmount or close
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSelect = (callback: () => void, trackingData?: { type: string; destination: string; label?: string }) => {
    if (trackingData) {
      trackEvent('command_palette_navigation', {
        navigation_type: trackingData.type,
        destination: trackingData.destination,
        destination_label: trackingData.label,
        had_search_query: !!search.trim(),
        search_query: search.trim() || undefined,
      });
    }
    callback();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <GlossyFilters id="command-glossy" intensity="subtle" />
      <div
        className="fixed inset-0 z-[100] bg-text-primary/50 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      >
        <div className="flex items-start justify-center pt-[20vh] px-4">
          <Command
            className="glossy-command glass-heavy rounded-3xl shadow-2xl border border-text-muted/20 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-top-10 duration-200 glossy-optimized"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-text-muted/10">
            <Icon icon={Search} size="md" color="muted" />
            <Command.Input
              value={search}
              onValueChange={handleSearchChange}
              placeholder="Search articles, logs, highlights..."
              className="flex-1 bg-transparent border-none outline-none text-base text-text-primary placeholder:text-text-muted"
              autoFocus
            />
            <div className="flex items-center gap-1">
              <KeyboardKey keyName="esc" size="sm" />
            </div>
          </div>

          {/* Results */}
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-12 text-center">
              <Text variant="body" color="muted">
                No results found for "{search}"
              </Text>
            </Command.Empty>

            {/* Navigation Section */}
            {!search && (
              <Command.Group heading="Navigation" className="mb-2">
                {navigationItems.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.label}
                    onSelect={() => handleSelect(
                      () => router.push(item.href),
                      { type: 'navigation', destination: item.href, label: item.label }
                    )}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl cursor-pointer data-[selected=true]:glass transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon icon={item.icon} size="sm" color="secondary" />
                      <Text variant="body" color="primary">
                        {item.label}
                      </Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <KeyboardKey keyName="cmd" size="sm" />
                      <KeyboardKey keyName={item.shortcut} size="sm" />
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Blog Posts Section */}
            <Command.Group heading="Blog Posts">
              {posts.map((post) => (
                <Command.Item
                  key={`${post.category}-${post.slug}`}
                  value={`${post.title} ${post.excerpt} ${post.tags.join(' ')}`}
                  keywords={[post.category, post.author, ...post.tags]}
                  onSelect={() =>
                    handleSelect(
                      () => router.push(`/${post.category}/${post.slug}`),
                      { type: 'blog_post', destination: `/${post.category}/${post.slug}`, label: post.title }
                    )
                  }
                  className="flex items-start justify-between gap-3 px-4 py-3 rounded-xl cursor-pointer data-[selected=true]:glass transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Text
                        variant="body"
                        color="primary"
                        className="font-medium truncate"
                      >
                        {post.title}
                      </Text>
                      <Badge
                        variant={categoryConfig[post.category].variant}
                        size="sm"
                      >
                        {categoryConfig[post.category].label}
                      </Badge>
                    </div>
                    <Text
                      variant="small"
                      color="muted"
                      className="line-clamp-1"
                    >
                      {post.excerpt}
                    </Text>
                  </div>
                  <Icon icon={ArrowRight} size="sm" color="muted" />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
          </Command>
        </div>
      </div>
    </>
  );
};
