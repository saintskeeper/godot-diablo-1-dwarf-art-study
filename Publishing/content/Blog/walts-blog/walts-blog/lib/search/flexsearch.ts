import { Document } from 'flexsearch';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

export interface SearchResult extends BlogPostMetadata {
  score: number;
}

// Define a searchable document type for FlexSearch
interface SearchableDocument {
  id: string;
  title: string;
  excerpt: string;
  tags: string;
  category: string;
  author: string;
  [key: string]: string; // Index signature for FlexSearch
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
          resolution: 9,
        },
        {
          field: 'excerpt',
          tokenize: 'forward',
          resolution: 5,
        },
        {
          field: 'tags',
          tokenize: 'forward',
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
let searchIndex: any = null;
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
