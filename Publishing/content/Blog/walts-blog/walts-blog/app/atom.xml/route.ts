import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blogs/utils';
import { generateAtom } from '@/lib/rss/generate-feed';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * GET /atom.xml
 * Atom 1.0 feed with all blog posts
 */
export async function GET() {
  try {
    // Fetch all blog posts (drafts are automatically filtered in production)
    const posts = await getAllBlogPosts();

    // Generate Atom feed
    const atomFeed = generateAtom(posts, {
      title: "Walt's Blog",
      description: 'Technical articles, development logs, and highlights from Walter and Walternate',
      id: 'https://walts.blog',
      link: 'https://walts.blog',
    });

    // Return Atom feed with proper content type
    return new NextResponse(atomFeed, {
      headers: {
        'Content-Type': 'application/atom+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating Atom feed:', error);
    return new NextResponse('Error generating Atom feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
