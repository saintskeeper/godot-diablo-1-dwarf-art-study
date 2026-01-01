import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogList } from '@/components/organisms/BlogList';
import { Text } from '@/components/atoms/Text';
import { getAllBlogPostsMetadata, getFeaturedBlogPosts } from '@/lib/blogs/utils';
import { BlogCard } from '@/components/molecules/BlogCard';
import { FeedLinks } from '@/components/molecules/FeedLinks';

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
          <FeedLinks />
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
