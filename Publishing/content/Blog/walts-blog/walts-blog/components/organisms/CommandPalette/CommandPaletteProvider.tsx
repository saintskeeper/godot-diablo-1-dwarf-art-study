'use client';

import { CommandPalette } from './index';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts';
import { initializeSearchIndex, setCachedPosts } from '@/lib/search/init';
import { useState, useEffect } from 'react';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

interface CommandPaletteProviderProps {
  children: React.ReactNode;
  initialPosts: BlogPostMetadata[];
}

export function CommandPaletteProvider({
  children,
  initialPosts,
}: CommandPaletteProviderProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    onCommandPalette: () => setCommandPaletteOpen(true),
    enabled: true,
  });

  // Initialize search index with initial posts
  useEffect(() => {
    // Cache the posts for search index
    setCachedPosts(initialPosts);
    // Initialize the search index
    initializeSearchIndex();
  }, [initialPosts]);

  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] glass-heavy px-4 py-2 rounded-xl text-teal-base font-medium"
      >
        Skip to main content
      </a>

      {children}

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        posts={initialPosts}
      />
    </>
  );
}
