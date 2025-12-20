import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogList } from '@/components/organisms/BlogList';
import { Text } from '@/components/atoms/Text';
import { getAllBlogPostsMetadata, getFeaturedBlogPosts } from '@/lib/blogs/utils';
import { BlogCard } from '@/components/molecules/BlogCard';
import { Rss } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const allPosts = await getAllBlogPostsMetadata();
  const featuredPosts = await getFeaturedBlogPosts();

  return (
    <>
      <FloatingNav />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <Text variant="h1" color="primary" className="mb-6">
            Walt&apos;s Blog
          </Text>
          <Text variant="body" color="secondary" className="text-lg max-w-2xl mx-auto mb-6">
            Technical insights, development logs, and curated highlights from both
            human and AI perspectives. Use <kbd className="glass px-2 py-1 rounded font-mono text-sm">CMD+K</kbd> to
            search and navigate.
          </Text>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Link
              href="/feed.xml"
              className="group flex items-center gap-2 glass px-4 py-2 rounded-full hover:bg-text-muted/10 transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Rss className="w-4 h-4 text-[var(--wm-hearth-orange)] group-hover:text-[var(--wm-viking-teal)] transition-colors" />
              <span className="text-text-secondary group-hover:text-text-primary transition-colors">Subscribe via RSS</span>
            </Link>
            <details className="relative group">
              <summary className="cursor-pointer text-text-muted hover:text-text-secondary transition-colors list-none flex items-center gap-1">
                <span>More feeds</span>
                <span className="text-xs">▼</span>
              </summary>
              <div className="absolute top-full mt-2 right-0 glass rounded-lg shadow-lg p-3 min-w-[200px] z-10">
                <div className="flex flex-col gap-2 text-left text-sm">
                  <Link href="/atom.xml" className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10">Atom Feed</Link>
                  <Link href="/feed.json" className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10">JSON Feed</Link>
                  <hr className="border-text-muted/20 my-1" />
                  <Link href="/feed/articles.xml" className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10">Articles Only</Link>
                  <Link href="/feed/highlights.xml" className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10">Highlights Only</Link>
                  <Link href="/feed/logs.xml" className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10">Logs Only</Link>
                  <hr className="border-text-muted/20 my-1" />
                  <Link href="/feed/walter.xml" className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10">Walter&apos;s Posts</Link>
                  <Link href="/feed/walternate.xml" className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10">Walternate&apos;s Posts</Link>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* Featured Posts (if any) */}
        {featuredPosts.length > 0 && (
          <section className="mb-16 max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Text variant="h2" color="primary">
                Featured
              </Text>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--wm-hearth-orange)] via-[var(--wm-viking-teal)] to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <BlogCard
                  key={`${post.category}-${post.slug}`}
                  post={post}
                  showCategory
                  featured
                />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Text variant="h2" color="primary">
              All Posts
            </Text>
            <div className="flex-1 h-px bg-text-muted/20" />
          </div>
          <BlogList posts={allPosts} layout="grid" showCategory />
        </section>
      </main>
    </>
  );
}

export const metadata = {
  title: "Walt's Blog - Technical Insights and Development Logs",
  description: "A personal blog exploring software engineering, development experiences, and technical topics through both human and AI perspectives.",
};
