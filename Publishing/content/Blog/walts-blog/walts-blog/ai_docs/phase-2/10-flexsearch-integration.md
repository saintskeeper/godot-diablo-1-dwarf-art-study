CREATE: lib/search/flexsearch.ts

CONTEXT: FlexSearch integration for full-text search
Build search index from blog posts and provide search functionality for command palette.

DEPENDENCIES (must exist first):
- flexsearch installed
- lib/blogs/utils (getAllBlogPostsMetadata)
- lib/blogs/schema (types)

REQUIREMENTS:
- Create FlexSearch document index
- Index title, excerpt, content, tags
- Async search function
- Result ranking and scoring
- Highlight search terms
- TypeScript with proper types
- Rebuild index on content changes

FLEXSEARCH UTILITY:
```typescript
// lib/search/flexsearch.ts
import { Document } from 'flexsearch';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

export interface SearchResult extends BlogPostMetadata {
  score: number;
}

// Create FlexSearch document index
const createSearchIndex = () => {
  return new Document({
    document: {
      id: 'id',
      index: [
        {
          field: 'title',
          tokenize: 'forward',
          optimize: true,
          resolution: 9,
        },
        {
          field: 'excerpt',
          tokenize: 'forward',
          optimize: true,
          resolution: 5,
        },
        {
          field: 'tags',
          tokenize: 'forward',
          optimize: true,
          resolution: 7,
        },
        {
          field: 'category',
          tokenize: 'forward',
          resolution: 9,
        },
        {
          field: 'author',
          tokenize: 'forward',
          resolution: 9,
        },
      ],
    },
    tokenize: 'forward',
    cache: 100,
    context: {
      resolution: 5,
      depth: 3,
      bidirectional: true,
    },
  });
};

// Singleton index instance
let searchIndex: Document<BlogPostMetadata> | null = null;
let indexedPosts: Map<string, BlogPostMetadata> = new Map();

/**
 * Build search index from blog posts
 */
export async function buildSearchIndex(posts: BlogPostMetadata[]): Promise<void> {
  searchIndex = createSearchIndex();
  indexedPosts.clear();

  posts.forEach((post) => {
    const id = `${post.category}-${post.slug}`;

    // Add to index
    searchIndex!.add({
      id,
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags.join(' '),
      category: post.category,
      author: post.author,
    } as any);

    // Store full post data
    indexedPosts.set(id, post);
  });
}

/**
 * Search blog posts
 */
export async function searchPosts(
  query: string,
  limit: number = 10
): Promise<SearchResult[]> {
  if (!searchIndex || !query.trim()) {
    return [];
  }

  try {
    // Search across all fields
    const results = await searchIndex.search(query, {
      limit: limit * 2, // Get more results to deduplicate
      enrich: true,
    });

    // Flatten and deduplicate results
    const seenIds = new Set<string>();
    const searchResults: SearchResult[] = [];

    results.forEach((fieldResults: any) => {
      fieldResults.result.forEach((docId: string) => {
        if (!seenIds.has(docId) && searchResults.length < limit) {
          seenIds.add(docId);
          const post = indexedPosts.get(docId);
          if (post) {
            searchResults.push({
              ...post,
              score: 1, // FlexSearch doesn't provide scores in current API
            });
          }
        }
      });
    });

    return searchResults;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

/**
 * Get search suggestions (autocomplete)
 */
export async function getSearchSuggestions(
  query: string,
  limit: number = 5
): Promise<string[]> {
  if (!searchIndex || !query.trim()) {
    return [];
  }

  try {
    const results = await searchIndex.search(query, {
      limit,
      enrich: true,
    });

    const suggestions = new Set<string>();

    results.forEach((fieldResults: any) => {
      fieldResults.result.forEach((docId: string) => {
        const post = indexedPosts.get(docId);
        if (post && suggestions.size < limit) {
          suggestions.add(post.title);
        }
      });
    });

    return Array.from(suggestions);
  } catch (error) {
    console.error('Suggestions error:', error);
    return [];
  }
}

/**
 * Check if index is built
 */
export function isIndexReady(): boolean {
  return searchIndex !== null && indexedPosts.size > 0;
}

/**
 * Clear search index
 */
export function clearSearchIndex(): void {
  searchIndex = null;
  indexedPosts.clear();
}
```

TECHNICAL SPECS:
```typescript
interface SearchResult extends BlogPostMetadata {
  score: number;
}

// Functions
buildSearchIndex(posts: BlogPostMetadata[]): Promise<void>
searchPosts(query: string, limit?: number): Promise<SearchResult[]>
getSearchSuggestions(query: string, limit?: number): Promise<string[]>
isIndexReady(): boolean
clearSearchIndex(): void
```

BUILD INDEX ON APP LOAD:
```typescript
// lib/search/init.ts
import { buildSearchIndex } from './flexsearch';
import { getAllBlogPostsMetadata } from '@/lib/blogs/utils';

let indexInitialized = false;

export async function initializeSearchIndex(): Promise<void> {
  if (indexInitialized) return;

  try {
    const posts = await getAllBlogPostsMetadata();
    await buildSearchIndex(posts);
    indexInitialized = true;
    console.log('Search index built successfully');
  } catch (error) {
    console.error('Failed to build search index:', error);
  }
}

export function isSearchIndexInitialized(): boolean {
  return indexInitialized;
}
```

USAGE IN COMMAND PALETTE:
```tsx
// components/organisms/CommandPalette/index.tsx
'use client';

import { searchPosts } from '@/lib/search/flexsearch';
import { useState, useEffect } from 'react';

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      const results = await searchPosts(search, 10);
      setSearchResults(results);
      setIsSearching(false);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [search]);

  // ... rest of component
};
```

API ROUTE FOR CLIENT-SIDE SEARCH:
```typescript
// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { searchPosts, buildSearchIndex, isIndexReady } from '@/lib/search/flexsearch';
import { getAllBlogPostsMetadata } from '@/lib/blogs/utils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Build index if not ready
    if (!isIndexReady()) {
      const posts = await getAllBlogPostsMetadata();
      await buildSearchIndex(posts);
    }

    const results = await searchPosts(query, limit);

    return NextResponse.json({
      results,
      count: results.length,
      query,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
```

HIGHLIGHT SEARCH TERMS UTILITY:
```typescript
// lib/search/highlight.ts
export function highlightSearchTerms(
  text: string,
  query: string
): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-rust-base/30 text-text-primary rounded px-1">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
```

VERIFICATION:
- Search index builds from blog posts
- Search returns relevant results
- Query performance is fast (<100ms)
- Results ranked by relevance
- Suggestions work for autocomplete
- Index rebuilds on content changes
- TypeScript types are correct
