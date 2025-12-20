CREATE: app/api/blogs/route.ts and app/api/blogs/[slug]/route.ts

CONTEXT: Blog API endpoints for retrieving posts
REST API routes for listing all posts, filtering by category/author/tag, and retrieving single posts.

DEPENDENCIES (must exist first):
- lib/blogs/utils.ts with helper functions
- lib/blogs/schema.ts with TypeScript types
- Next.js 16 App Router

REQUIREMENTS:
- GET /api/blogs - List all posts with optional filters
- GET /api/blogs/[slug] - Get single post by slug and category
- Support query parameters: category, author, tag, featured
- Return JSON responses
- Handle errors gracefully
- TypeScript with proper types

LIST API ROUTE:
```typescript
// app/api/blogs/route.ts
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

    let posts;

    if (featured === 'true') {
      posts = await getFeaturedBlogPosts();
    } else if (category) {
      posts = await getBlogPostsByCategory(category);
    } else if (author) {
      posts = await getBlogPostsByAuthor(author);
    } else if (tag) {
      posts = await getBlogPostsByTag(tag);
    } else {
      posts = await getAllBlogPostsMetadata();
    }

    // Remove content from response for listing (only metadata)
    const postsMetadata = posts.map(({ content, ...metadata }) => metadata);

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
```

SINGLE POST API ROUTE:
```typescript
// app/api/blogs/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost } from '@/lib/blogs/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }

    const post = await getBlogPost(category, params.slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
```

API TYPES:
```typescript
// lib/blogs/api-types.ts
import { BlogPostMetadata, BlogPostWithContent } from './schema';

export interface BlogPostListResponse {
  posts: BlogPostMetadata[];
  count: number;
}

export interface BlogPostResponse {
  post: BlogPostWithContent;
}

export interface BlogPostErrorResponse {
  error: string;
}
```

API ENDPOINT DOCUMENTATION:
```markdown
## Blog API Endpoints

### GET /api/blogs
List all blog posts with optional filters

**Query Parameters:**
- `category` - Filter by category (highlights, articles, logs)
- `author` - Filter by author (walter, walternate)
- `tag` - Filter by tag
- `featured` - Filter featured posts (true)

**Response:**
```json
{
  "posts": [
    {
      "slug": "welcome-to-walts-blog",
      "title": "Welcome to Walt's Blog",
      "excerpt": "A warm introduction...",
      "author": "walter",
      "category": "highlights",
      "publishedAt": "2025-01-15",
      "updatedAt": "2025-01-16",
      "tags": ["meta", "introduction"],
      "featured": true,
      "draft": false,
      "readingTime": 3
    }
  ],
  "count": 1
}
```

**Examples:**
```bash
# All posts
GET /api/blogs

# Highlights only
GET /api/blogs?category=highlights

# Walter's articles
GET /api/blogs?category=articles&author=walter

# Featured posts
GET /api/blogs?featured=true

# Posts with specific tag
GET /api/blogs?tag=nextjs
```

### GET /api/blogs/[slug]
Get a single blog post by slug

**Query Parameters:**
- `category` - Required. The category of the post (highlights, articles, logs)

**Response:**
```json
{
  "post": {
    "slug": "welcome-to-walts-blog",
    "title": "Welcome to Walt's Blog",
    "excerpt": "A warm introduction...",
    "content": "# Welcome to Walt's Blog\n\n...",
    "author": "walter",
    "category": "highlights",
    "publishedAt": "2025-01-15",
    "tags": ["meta", "introduction"],
    "featured": true,
    "draft": false,
    "readingTime": 3
  }
}
```

**Examples:**
```bash
# Get specific post
GET /api/blogs/welcome-to-walts-blog?category=highlights

# Get article
GET /api/blogs/first-article?category=articles

# Get log
GET /api/blogs/dev-log-001?category=logs
```

**Error Responses:**
```json
// 404 Not Found
{
  "error": "Blog post not found"
}

// 400 Bad Request
{
  "error": "Category parameter is required"
}

// 500 Internal Server Error
{
  "error": "Failed to fetch blog post"
}
```
```

TESTING API ROUTES:
```bash
# Test locally (dev server running)
curl http://localhost:3000/api/blogs

curl http://localhost:3000/api/blogs?category=highlights

curl "http://localhost:3000/api/blogs/welcome-to-walts-blog?category=highlights"

curl http://localhost:3000/api/blogs?author=walternate
```

VERIFICATION:
- API routes return correct JSON responses
- Query parameters filter correctly
- Single post endpoint returns full content
- List endpoint excludes content (metadata only)
- Error handling returns appropriate status codes
- TypeScript types match response shapes
