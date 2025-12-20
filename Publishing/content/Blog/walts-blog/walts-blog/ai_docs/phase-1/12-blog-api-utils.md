CREATE: lib/blogs/utils.ts

CONTEXT: Blog API utility functions
Helper functions to read MDX files, parse frontmatter, calculate reading time, and retrieve posts.

DEPENDENCIES (must exist first):
- gray-matter installed
- github-slugger installed
- date-fns installed
- lib/blogs/schema.ts with Zod schema
- content/ directory with MDX files

REQUIREMENTS:
- Read MDX files from content directory
- Parse and validate frontmatter
- Calculate reading time
- Sort posts by date (newest first)
- Filter by category, author, tags
- Exclude draft posts in production
- TypeScript with proper error handling

UTILITY FUNCTIONS FILE:
```typescript
// lib/blogs/utils.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { blogPostSchema, type BlogPostWithContent } from './schema';
import GithubSlugger from 'github-slugger';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

/**
 * Generate URL-safe slug from filename or title
 */
export function generateSlug(filename: string): string {
  return filename.replace(/\.mdx$/, '');
}

/**
 * Get all MDX files from a specific category directory
 */
export function getMDXFilesInCategory(category: string): string[] {
  const categoryDir = path.join(CONTENT_DIR, category);

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  return fs
    .readdirSync(categoryDir)
    .filter((file) => file.endsWith('.mdx'));
}

/**
 * Read and parse a single MDX file
 */
export async function getBlogPost(
  category: string,
  slug: string
): Promise<BlogPostWithContent | null> {
  try {
    const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Validate frontmatter with Zod schema
    const validatedData = blogPostSchema.parse(data);

    // Skip drafts in production
    if (validatedData.draft && process.env.NODE_ENV === 'production') {
      return null;
    }

    const readingTime = calculateReadingTime(content);

    return {
      ...validatedData,
      slug,
      content,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading blog post: ${category}/${slug}`, error);
    return null;
  }
}

/**
 * Get all blog posts from all categories
 */
export async function getAllBlogPosts(): Promise<BlogPostWithContent[]> {
  const categories = ['highlights', 'articles', 'logs'];
  const allPosts: BlogPostWithContent[] = [];

  for (const category of categories) {
    const files = getMDXFilesInCategory(category);

    for (const file of files) {
      const slug = generateSlug(file);
      const post = await getBlogPost(category, slug);

      if (post) {
        allPosts.push(post);
      }
    }
  }

  // Sort by date, newest first
  return allPosts.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

/**
 * Get blog posts filtered by category
 */
export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPostWithContent[]> {
  const files = getMDXFilesInCategory(category);
  const posts: BlogPostWithContent[] = [];

  for (const file of files) {
    const slug = generateSlug(file);
    const post = await getBlogPost(category, slug);

    if (post) {
      posts.push(post);
    }
  }

  return posts.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

/**
 * Get blog posts filtered by author
 */
export async function getBlogPostsByAuthor(
  author: 'walter' | 'walternate'
): Promise<BlogPostWithContent[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.author === author);
}

/**
 * Get blog posts filtered by tag
 */
export async function getBlogPostsByTag(
  tag: string
): Promise<BlogPostWithContent[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(): Promise<BlogPostWithContent[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.featured);
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const tagsSet = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get blog post metadata without content (for listing pages)
 */
export type BlogPostMetadata = Omit<BlogPostWithContent, 'content'>;

export async function getAllBlogPostsMetadata(): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.map(({ content, ...metadata }) => metadata);
}
```

TECHNICAL SPECS:
```typescript
// Reading time calculation
calculateReadingTime(content: string): number

// Slug generation
generateSlug(filename: string): string

// Get posts
getBlogPost(category: string, slug: string): Promise<BlogPostWithContent | null>
getAllBlogPosts(): Promise<BlogPostWithContent[]>
getBlogPostsByCategory(category: string): Promise<BlogPostWithContent[]>
getBlogPostsByAuthor(author: 'walter' | 'walternate'): Promise<BlogPostWithContent[]>
getBlogPostsByTag(tag: string): Promise<BlogPostWithContent[]>
getFeaturedBlogPosts(): Promise<BlogPostWithContent[]>

// Metadata
getAllTags(): Promise<string[]>
getAllBlogPostsMetadata(): Promise<BlogPostMetadata[]>
```

ERROR HANDLING:
```typescript
// Add custom error class
export class BlogPostNotFoundError extends Error {
  constructor(category: string, slug: string) {
    super(`Blog post not found: ${category}/${slug}`);
    this.name = 'BlogPostNotFoundError';
  }
}

// Update getBlogPost to throw on not found
export async function getBlogPostOrThrow(
  category: string,
  slug: string
): Promise<BlogPostWithContent> {
  const post = await getBlogPost(category, slug);

  if (!post) {
    throw new BlogPostNotFoundError(category, slug);
  }

  return post;
}
```

VERIFICATION:
- Functions read MDX files successfully
- Frontmatter validation works with Zod
- Reading time calculation accurate
- Sorting by date works (newest first)
- Draft posts excluded in production
- TypeScript types are correct
- Error handling works properly
