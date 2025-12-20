'use client';

import { CommandPaletteProvider } from '@/components/organisms/CommandPalette/CommandPaletteProvider';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

interface ClientLayoutProps {
  children: React.ReactNode;
  initialPosts: BlogPostMetadata[];
}

export function ClientLayout({ children, initialPosts }: ClientLayoutProps) {
  return (
    <CommandPaletteProvider initialPosts={initialPosts}>
      {children}
    </CommandPaletteProvider>
  );
}
