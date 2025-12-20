import { NextResponse } from 'next/server';
import { getBlogPostsByAuthor } from '@/lib/blogs/utils';
import { generateRSS } from '@/lib/rss/generate-feed';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /feed/walternate.xml
 * RSS 2.0 feed with posts by Walternate only
 */
export async function GET() {
  try {
    // Fetch only posts by Walternate
    const posts = await getBlogPostsByAuthor('walternate');

    // Generate RSS feed
    const rssFeed = generateRSS(posts, {
      title: "Walt's Blog - Walternate's Posts",
      description: "Development logs and technical insights from Walternate",
      id: 'https://walts.blog/feed/walternate.xml',
      link: 'https://walts.blog?author=walternate',
    });

    // Return RSS feed with proper content type
    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating Walternate RSS feed:', error);
    return new NextResponse('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
