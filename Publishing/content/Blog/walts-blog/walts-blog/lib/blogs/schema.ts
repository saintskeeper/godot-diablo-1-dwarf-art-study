import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  author: z.enum(['walter', 'walternate']),
  category: z.enum(['highlights', 'articles', 'logs']),
  publishedAt: z.string(), // ISO date string
  updatedAt: z.string().optional(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  featuredImage: z.string().optional(), // Optional featured image URL
});

export type BlogPost = z.infer<typeof blogPostSchema>;

export interface BlogPostMetadata extends BlogPost {
  slug: string;
  readingTime: number;
}

export interface BlogPostWithContent extends BlogPostMetadata {
  content: string;
}
