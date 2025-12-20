import { NextResponse } from 'next/server';
import { getBlogPostsByAuthor } from '@/lib/blogs/utils';
import { generateRSS } from '@/lib/rss/generate-feed';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /feed/walter.xml
 * RSS 2.0 feed with posts by Walter only
 */
export async function GET() {
  try {
    // Fetch only posts by Walter
    const posts = await getBlogPostsByAuthor('walter');

    // Generate RSS feed
    const rssFeed = generateRSS(posts, {
      title: "Walt's Blog - Walter's Posts",
      description: 'Technical content and insights from Walter',
      id: 'https://walts.blog/feed/walter.xml',
      link: 'https://walts.blog?author=walter',
    });

    // Return RSS feed with proper content type
    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating Walter RSS feed:', error);
    return new NextResponse('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
