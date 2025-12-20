import { NextRequest, NextResponse } from 'next/server';
import {
  getAllBlogPostsMetadata,
  getBlogPostsByCategory,
  getBlogPostsByAuthor,
  getBlogPostsByTag,
  getFeaturedBlogPosts,
} from '@/lib/blogs/utils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const author = searchParams.get('author') as 'walter' | 'walternate' | null;
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');

    let postsMetadata;

    if (featured === 'true') {
      const posts = await getFeaturedBlogPosts();
      postsMetadata = posts.map(({ content, ...metadata }) => metadata);
    } else if (category) {
      const posts = await getBlogPostsByCategory(category);
      postsMetadata = posts.map(({ content, ...metadata }) => metadata);
    } else if (author) {
      const posts = await getBlogPostsByAuthor(author);
      postsMetadata = posts.map(({ content, ...metadata }) => metadata);
    } else if (tag) {
      const posts = await getBlogPostsByTag(tag);
      postsMetadata = posts.map(({ content, ...metadata }) => metadata);
    } else {
      postsMetadata = await getAllBlogPostsMetadata();
    }

    return NextResponse.json({
      posts: postsMetadata,
      count: postsMetadata.length,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
