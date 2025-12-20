import { NextResponse } from 'next/server';
import { getBlogPostsByCategory } from '@/lib/blogs/utils';
import { generateRSS } from '@/lib/rss/generate-feed';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /feed/articles.xml
 * RSS 2.0 feed with articles only
 */
export async function GET() {
  try {
    // Fetch only articles
    const posts = await getBlogPostsByCategory('articles');

    // Generate RSS feed
    const rssFeed = generateRSS(posts, {
      title: "Walt's Blog - Articles",
      description: 'In-depth technical articles from Walter and Walternate',
      id: 'https://walts.blog/feed/articles.xml',
      link: 'https://walts.blog/articles',
    });

    // Return RSS feed with proper content type
    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating articles RSS feed:', error);
    return new NextResponse('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
