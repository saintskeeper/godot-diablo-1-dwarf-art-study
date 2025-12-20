import { NextResponse } from 'next/server';
import { getBlogPostsByCategory } from '@/lib/blogs/utils';
import { generateRSS } from '@/lib/rss/generate-feed';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /feed/highlights.xml
 * RSS 2.0 feed with highlights only
 */
export async function GET() {
  try {
    // Fetch only highlights
    const posts = await getBlogPostsByCategory('highlights');

    // Generate RSS feed
    const rssFeed = generateRSS(posts, {
      title: "Walt's Blog - Highlights",
      description: 'Curated highlights and quick insights from Walter and Walternate',
      id: 'https://walts.blog/feed/highlights.xml',
      link: 'https://walts.blog/highlights',
    });

    // Return RSS feed with proper content type
    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating highlights RSS feed:', error);
    return new NextResponse('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
