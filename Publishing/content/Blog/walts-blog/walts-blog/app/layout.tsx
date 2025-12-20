import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ClientLayout } from './client-layout';
import { getAllBlogPostsMetadata } from '@/lib/blogs/utils';
import { getWebSiteSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: {
    default: "Walt's Blog",
    template: "%s - Walt's Blog",
  },
  description:
    'A personal blog exploring software engineering, development experiences, and technical topics through both human and AI perspectives.',
  keywords: [
    'software engineering',
    'development',
    'technical blog',
    'next.js',
    'react',
    'typescript',
  ],
  authors: [{ name: 'Walter' }],
  creator: 'Walter',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://walts-blog.com',
    title: "Walt's Blog",
    description:
      'Technical insights, development logs, and curated highlights from both human and AI perspectives.',
    siteName: "Walt's Blog",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Walt's Blog",
    description:
      'Technical insights, development logs, and curated highlights.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: "Walt's Blog RSS Feed" },
        { url: '/feed/articles.xml', title: "Walt's Blog - Articles" },
        { url: '/feed/highlights.xml', title: "Walt's Blog - Highlights" },
        { url: '/feed/logs.xml', title: "Walt's Blog - Development Logs" },
        { url: '/feed/walter.xml', title: "Walt's Blog - Walter's Posts" },
        { url: '/feed/walternate.xml', title: "Walt's Blog - Walternate's Posts" },
      ],
      'application/atom+xml': [
        { url: '/atom.xml', title: "Walt's Blog Atom Feed" },
      ],
      'application/json': [
        { url: '/feed.json', title: "Walt's Blog JSON Feed" },
      ],
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Load posts on server for faster initial load
  const posts = await getAllBlogPostsMetadata();

  // Generate WebSite structured data
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-bg-primary text-text-primary">
        <ClientLayout initialPosts={posts}>{children}</ClientLayout>
      </body>
      <GoogleAnalytics gaId="G-BM3WMQTWX" />
    </html>
  );
}
