import { Feed } from 'feed';
import type { BlogPostWithContent } from '@/lib/blogs/schema';

// Site configuration
const SITE_URL = 'https://walts-blog.com';
const SITE_TITLE = "Walt's Blog";
const SITE_DESCRIPTION = 'Technical articles, development logs, and highlights from Walter and Walternate';
const SITE_LANGUAGE = 'en';
const SITE_COPYRIGHT = `All rights reserved ${new Date().getFullYear()}, Walt's Blog`;

// Author information
const AUTHORS = {
  walter: {
    name: 'Walter',
    email: 'walter@walts-blog.com',
    link: `${SITE_URL}?author=walter`,
  },
  walternate: {
    name: 'Walternate',
    email: 'walternate@walts-blog.com',
    link: `${SITE_URL}?author=walternate`,
  },
};

export interface FeedOptions {
  title?: string;
  description?: string;
  id?: string;
  link?: string;
}

/**
 * Convert MDX content to plain HTML for RSS feed
 * Strips MDX-specific syntax and converts to basic HTML
 */
function convertMDXToHTML(mdxContent: string): string {
  // Basic conversion - in a production environment, you might want to use
  // a proper MDX/markdown to HTML converter like remark-html
  let html = mdxContent;

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert code blocks
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/```(\w+)?\n?/g, '');
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  });

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');

  // Wrap in paragraphs if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`;
  }

  return html;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Generate a complete RSS/Atom/JSON feed from blog posts
 */
export function generateFeed(
  posts: BlogPostWithContent[],
  options: FeedOptions = {}
): Feed {
  const feedTitle = options.title || SITE_TITLE;
  const feedDescription = options.description || SITE_DESCRIPTION;
  const feedId = options.id || SITE_URL;
  const feedLink = options.link || SITE_URL;

  // Initialize Feed
  const feed = new Feed({
    title: feedTitle,
    description: feedDescription,
    id: feedId,
    link: feedLink,
    language: SITE_LANGUAGE,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: SITE_COPYRIGHT,
    updated: posts.length > 0 ? new Date(posts[0].publishedAt) : new Date(),
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${SITE_URL}/feed.xml`,
      atom: `${SITE_URL}/atom.xml`,
      json: `${SITE_URL}/feed.json`,
    },
    author: {
      name: "Walt's Blog",
      email: 'hello@walts-blog.com',
      link: SITE_URL,
    },
  });

  // Add each post to the feed
  posts.forEach((post) => {
    const postUrl = `${SITE_URL}/${post.category}/${post.slug}`;
    const author = AUTHORS[post.author];
    const content = convertMDXToHTML(post.content);

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      content,
      author: [author],
      date: new Date(post.publishedAt),
      published: new Date(post.publishedAt),
      category: [
        { name: post.category, term: post.category },
        ...post.tags.map((tag) => ({ name: tag, term: tag })),
      ],
      image: post.featuredImage,
      // Add featured image as enclosure if available
      ...(post.featuredImage && {
        enclosure: {
          url: post.featuredImage,
          type: 'image/jpeg', // Default to JPEG, could be improved to detect actual type
        },
      }),
    });
  });

  return feed;
}

/**
 * Generate RSS 2.0 feed XML
 */
export function generateRSS(
  posts: BlogPostWithContent[],
  options?: FeedOptions
): string {
  const feed = generateFeed(posts, options);
  return feed.rss2();
}

/**
 * Generate Atom 1.0 feed XML
 */
export function generateAtom(
  posts: BlogPostWithContent[],
  options?: FeedOptions
): string {
  const feed = generateFeed(posts, options);
  return feed.atom1();
}

/**
 * Generate JSON Feed
 */
export function generateJSON(
  posts: BlogPostWithContent[],
  options?: FeedOptions
): string {
  const feed = generateFeed(posts, options);
  return feed.json1();
}
