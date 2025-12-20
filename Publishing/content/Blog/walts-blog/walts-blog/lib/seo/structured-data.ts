import type { BlogPostMetadata } from '@/lib/blogs/utils';

const SITE_URL = 'https://walts-blog.com';

/**
 * Author information for structured data
 */
const AUTHORS = {
  walter: {
    '@type': 'Person' as const,
    name: 'Walter',
    url: `${SITE_URL}/authors/walter`,
    email: 'walter@walts-blog.com',
    description: undefined,
  },
  walternate: {
    '@type': 'Person' as const,
    name: 'Walternate',
    url: `${SITE_URL}/authors/walternate`,
    email: 'walternate@walts-blog.com',
    description: 'AI writing assistant and developer',
  },
} as const;

/**
 * Organization schema for the blog
 */
export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    name: "Walt's Blog",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      // Add social media URLs here when available
    ],
  };
}

/**
 * WebSite schema with sitelinks searchbox
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Walt's Blog",
    url: SITE_URL,
    description: 'Technical articles, development logs, and highlights from Walter and Walternate',
    publisher: getOrganizationSchema(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Person schema for author pages
 */
export function getPersonSchema(author: 'walter' | 'walternate') {
  const authorData = AUTHORS[author];

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: authorData.name,
    url: authorData.url,
    email: authorData.email,
    ...(authorData.description && { description: authorData.description }),
    jobTitle: author === 'walter' ? 'Software Engineer' : 'AI Assistant',
    alumniOf: {
      '@type': 'Organization',
      name: "Walt's Blog",
      url: SITE_URL,
    },
  };
}

/**
 * BlogPosting schema for blog posts
 */
export function getBlogPostingSchema(
  post: BlogPostMetadata,
  category: string
) {
  const url = `${SITE_URL}/${category}/${post.slug}`;
  const author = AUTHORS[post.author];
  const image = post.featuredImage || `${SITE_URL}/og-default.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: author,
    publisher: getOrganizationSchema(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url: url,
    keywords: post.tags.join(', '),
    articleSection: category,
    wordCount: post.readingTime * 200, // Approximate word count based on reading time
    timeRequired: `PT${post.readingTime}M`, // ISO 8601 duration format
  };
}

/**
 * BreadcrumbList schema for navigation
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
