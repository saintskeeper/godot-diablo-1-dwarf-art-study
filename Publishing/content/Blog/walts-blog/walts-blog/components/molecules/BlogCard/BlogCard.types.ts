import type { BlogPostMetadata } from '@/lib/blogs/schema';

export interface BlogCardProps {
  post: BlogPostMetadata;
  showCategory?: boolean;
  className?: string;
  featured?: boolean; // Featured variant - larger, bolder
  variant?: 'default' | 'featured'; // Magazine layout variant
}

export type CategoryVariant = 'category-teal' | 'category-orange' | 'category-brown';

export const categoryBadgeMap: Record<
  'highlights' | 'articles' | 'logs',
  { variant: CategoryVariant; label: string }
> = {
  highlights: {
    variant: 'category-teal',
    label: 'HIGHLIGHTS',
  },
  articles: {
    variant: 'category-orange',
    label: 'ARTICLES',
  },
  logs: {
    variant: 'category-brown',
    label: 'LOGS',
  },
};
