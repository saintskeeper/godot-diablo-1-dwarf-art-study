import { buildSearchIndex, isIndexReady } from './flexsearch';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

let indexInitialized = false;
let cachedPosts: BlogPostMetadata[] = [];

export async function initializeSearchIndex(): Promise<void> {
  if (indexInitialized && isIndexReady()) return;

  try {
    // Use cached posts (must be set via setCachedPosts before initializing)
    if (cachedPosts.length === 0) {
      console.warn('No cached posts available for search index');
      return;
    }

    await buildSearchIndex(cachedPosts);
    indexInitialized = true;
    console.log(`Search index built with ${cachedPosts.length} posts`);
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
