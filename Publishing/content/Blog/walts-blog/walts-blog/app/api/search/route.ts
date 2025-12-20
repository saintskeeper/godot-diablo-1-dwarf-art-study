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
