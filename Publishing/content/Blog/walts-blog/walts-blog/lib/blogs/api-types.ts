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
