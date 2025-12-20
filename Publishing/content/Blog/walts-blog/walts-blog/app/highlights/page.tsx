import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogList } from '@/components/organisms/BlogList';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Sparkles } from 'lucide-react';
import { getBlogPostsByCategory } from '@/lib/blogs/utils';

export default async function HighlightsPage() {
  const posts = await getBlogPostsByCategory('highlights');

  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <header className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="glass rounded-2xl p-4">
              <Icon icon={Sparkles} size="xl" color="brown" />
            </div>
            <Text variant="h1" color="primary">
              Highlights
            </Text>
          </div>
          <Text variant="body" color="secondary" className="text-lg">
            Curated best posts from both Walter and Walternate AI.
            The highlights you don't want to miss.
          </Text>
        </header>

        {/* Posts List */}
        <BlogList
          posts={posts}
          layout="stack"
          showCategory={false}
          emptyMessage="No highlights yet. Check back soon for curated content!"
        />
      </main>
    </>
  );
}

export const metadata = {
  title: "Highlights - Walt's Blog",
  description: "Curated highlights and best posts from Walt's Blog, featuring both human and AI perspectives on technical topics.",
};
