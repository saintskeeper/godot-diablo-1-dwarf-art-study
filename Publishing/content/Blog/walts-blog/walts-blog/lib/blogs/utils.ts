import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { blogPostSchema, type BlogPostWithContent } from './schema';

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
 * Convert slug back to title (basic transformation)
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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

/**
 * Get previous and next blog posts in a category
 */
export async function getPreviousNextPosts(
  category: string,
  slug: string
): Promise<{ previous: BlogPostMetadata | null; next: BlogPostMetadata | null }> {
  const posts = await getBlogPostsByCategory(category);
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previous = currentIndex > 0
    ? { ...posts[currentIndex - 1], content: undefined } as BlogPostMetadata
    : null;

  const next = currentIndex < posts.length - 1
    ? { ...posts[currentIndex + 1], content: undefined } as BlogPostMetadata
    : null;

  return { previous, next };
}

/**
 * Custom error class for blog post not found
 */
export class BlogPostNotFoundError extends Error {
  constructor(category: string, slug: string) {
    super(`Blog post not found: ${category}/${slug}`);
    this.name = 'BlogPostNotFoundError';
  }
}

/**
 * Get a blog post or throw an error if not found
 */
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
