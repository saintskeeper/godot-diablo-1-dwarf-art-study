import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blogs/utils';
import { generateRSS } from '@/lib/rss/generate-feed';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /feed.xml
 * Main RSS 2.0 feed with all blog posts
 */
export async function GET() {
  try {
    // Fetch all blog posts (drafts are automatically filtered in production)
    const posts = await getAllBlogPosts();

    // Generate RSS feed
    const rssFeed = generateRSS(posts, {
      title: "Walt's Blog",
      description: 'Technical articles, development logs, and highlights from Walter and Walternate',
      id: 'https://walts.blog',
      link: 'https://walts.blog',
    });

    // Return RSS feed with proper content type
    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
