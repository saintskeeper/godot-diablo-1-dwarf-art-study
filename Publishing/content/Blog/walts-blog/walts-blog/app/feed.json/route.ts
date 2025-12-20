import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blogs/utils';
import { generateJSON } from '@/lib/rss/generate-feed';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /feed.json
 * JSON Feed 1.0 with all blog posts
 */
export async function GET() {
  try {
    // Fetch all blog posts (drafts are automatically filtered in production)
    const posts = await getAllBlogPosts();

    // Generate JSON feed
    const jsonFeed = generateJSON(posts, {
      title: "Walt's Blog",
      description: 'Technical articles, development logs, and highlights from Walter and Walternate',
      id: 'https://walts.blog',
      link: 'https://walts.blog',
    });

    // Return JSON feed with proper content type
    return new NextResponse(jsonFeed, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating JSON feed:', error);
    return new NextResponse('Error generating JSON feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
