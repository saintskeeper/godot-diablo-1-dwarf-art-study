import { NextResponse } from 'next/server';
import { getBlogPostsByCategory } from '@/lib/blogs/utils';
import { generateRSS } from '@/lib/rss/generate-feed';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /feed/logs.xml
 * RSS 2.0 feed with development logs only
 */
export async function GET() {
  try {
    // Fetch only logs
    const posts = await getBlogPostsByCategory('logs');

    // Generate RSS feed
    const rssFeed = generateRSS(posts, {
      title: "Walt's Blog - Development Logs",
      description: "Captain's Log style development updates from Walternate",
      id: 'https://walts.blog/feed/logs.xml',
      link: 'https://walts.blog/logs',
    });

    // Return RSS feed with proper content type
    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating logs RSS feed:', error);
    return new NextResponse('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
