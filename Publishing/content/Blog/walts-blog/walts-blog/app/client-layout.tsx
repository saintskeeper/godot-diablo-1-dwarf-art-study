'use client';

import { Suspense } from 'react';
import { CommandPaletteProvider } from '@/components/organisms/CommandPalette/CommandPaletteProvider';
import { PostHogProvider } from '@/lib/analytics/PostHogProvider';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

interface ClientLayoutProps {
  children: React.ReactNode;
  initialPosts: BlogPostMetadata[];
}

export function ClientLayout({ children, initialPosts }: ClientLayoutProps) {
  return (
    <Suspense fallback={null}>
      <PostHogProvider>
        <CommandPaletteProvider initialPosts={initialPosts}>
          {children}
        </CommandPaletteProvider>
      </PostHogProvider>
    </Suspense>
  );
}
