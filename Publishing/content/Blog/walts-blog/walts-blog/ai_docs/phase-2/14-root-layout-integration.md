CREATE: Update app/layout.tsx with CommandPalette and keyboard shortcuts

CONTEXT: Integrate CommandPalette and global keyboard shortcuts into root layout
Add command palette modal that opens with CMD+K and manages search index initialization.

DEPENDENCIES (must exist first):
- components/organisms/CommandPalette
- lib/hooks/useKeyboardShortcuts
- lib/search/flexsearch (initializeSearchIndex)
- All Phase 1 and Phase 2 components complete

REQUIREMENTS:
- Add CommandPalette to root layout
- Initialize keyboard shortcuts
- Load search index on mount
- Manage palette open/close state
- Client component wrapper for interactive features
- Keep existing font configuration
- TypeScript with proper types

ROOT LAYOUT UPDATE:
```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ClientLayout } from './client-layout';

export const metadata: Metadata = {
  title: {
    default: "Walt's Blog",
    template: "%s - Walt's Blog",
  },
  description:
    'A personal blog exploring software engineering, development experiences, and technical topics through both human and AI perspectives.',
  keywords: [
    'software engineering',
    'development',
    'technical blog',
    'next.js',
    'react',
    'typescript',
  ],
  authors: [{ name: 'Walter' }],
  creator: 'Walter',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://walts-blog.com',
    title: "Walt's Blog",
    description:
      'Technical insights, development logs, and curated highlights from both human and AI perspectives.',
    siteName: "Walt's Blog",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Walt's Blog",
    description:
      'Technical insights, development logs, and curated highlights.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-bg-primary text-text-primary">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
```

CLIENT LAYOUT COMPONENT:
```tsx
// app/client-layout.tsx
'use client';

import { CommandPalette } from '@/components/organisms/CommandPalette';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts';
import { initializeSearchIndex } from '@/lib/search/init';
import { useEffect, useState } from 'react';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
  const [searchIndexReady, setSearchIndexReady] = useState(false);

  // Initialize search index and load posts
  useEffect(() => {
    async function init() {
      try {
        // Load posts for command palette
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setPosts(data.posts);

        // Initialize search index
        await initializeSearchIndex();
        setSearchIndexReady(true);
      } catch (error) {
        console.error('Failed to initialize search:', error);
      }
    }

    init();
  }, []);

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    onCommandPalette: () => setCommandPaletteOpen(true),
    enabled: true,
  });

  return (
    <>
      {children}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        posts={posts}
      />
    </>
  );
}
```

ALTERNATIVE: SERVER COMPONENT FOR POSTS:
```tsx
// app/layout.tsx (alternative approach with server-side data)
import { ClientLayout } from './client-layout';
import { getAllBlogPostsMetadata } from '@/lib/blogs/utils';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load posts on server for faster initial load
  const posts = await getAllBlogPostsMetadata();

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-bg-primary text-text-primary">
        <ClientLayout initialPosts={posts}>{children}</ClientLayout>
      </body>
    </html>
  );
}

// app/client-layout.tsx (updated)
'use client';

import { useEffect, useState } from 'react';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

interface ClientLayoutProps {
  children: React.ReactNode;
  initialPosts: BlogPostMetadata[];
}

export function ClientLayout({ children, initialPosts }: ClientLayoutProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useKeyboardShortcuts({
    onCommandPalette: () => setCommandPaletteOpen(true),
  });

  // Initialize search index with initial posts
  useEffect(() => {
    initializeSearchIndex();
  }, []);

  return (
    <>
      {children}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        posts={initialPosts}
      />
    </>
  );
}
```

SEARCH INIT UPDATE:
```typescript
// lib/search/init.ts (update to use posts from memory)
import { buildSearchIndex, isIndexReady } from './flexsearch';
import { getAllBlogPostsMetadata } from '@/lib/blogs/utils';

let indexInitialized = false;
let cachedPosts: BlogPostMetadata[] = [];

export async function initializeSearchIndex(): Promise<void> {
  if (indexInitialized && isIndexReady()) return;

  try {
    // Get posts (will be cached)
    const posts = cachedPosts.length > 0 ? cachedPosts : await getAllBlogPostsMetadata();
    cachedPosts = posts;

    await buildSearchIndex(posts);
    indexInitialized = true;
    console.log(`Search index built with ${posts.length} posts`);
  } catch (error) {
    console.error('Failed to build search index:', error);
  }
}

export function setCachedPosts(posts: BlogPostMetadata[]): void {
  cachedPosts = posts;
}

export function isSearchIndexInitialized(): boolean {
  return indexInitialized;
}
```

ADD SKIP TO CONTENT LINK (Accessibility):
```tsx
// app/client-layout.tsx (add skip link)
export function ClientLayout({ children, initialPosts }: ClientLayoutProps) {
  // ... existing code

  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] glass-heavy px-4 py-2 rounded-xl text-rust-base font-medium"
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
```

GLOBALS.CSS ADDITIONS:
```css
/* Add to globals.css for screen-reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

VERIFICATION:
- CommandPalette opens with CMD+K
- Keyboard shortcuts work globally
- Search index initializes on load
- Posts load correctly in palette
- Skip link works for accessibility
- Fonts configured properly
- No hydration errors
- Client/server components properly separated
