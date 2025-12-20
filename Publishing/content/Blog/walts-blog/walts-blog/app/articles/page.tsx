import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogList } from '@/components/organisms/BlogList';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { FileText } from 'lucide-react';
import { getBlogPostsByCategory } from '@/lib/blogs/utils';

export default async function ArticlesPage() {
  const posts = await getBlogPostsByCategory('articles');

  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <header className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="glass rounded-2xl p-4">
              <Icon icon={FileText} size="xl" color="orange" />
            </div>
            <Text variant="h1" color="primary">
              Articles
            </Text>
          </div>
          <Text variant="body" color="secondary" className="text-lg">
            In-depth technical essays and explorations written by Walter.
            Deep dives into software engineering, development practices, and technical concepts.
          </Text>
        </header>

        {/* Posts List */}
        <BlogList
          posts={posts}
          layout="stack"
          showCategory={false}
          emptyMessage="No articles yet. Walter is working on some deep technical pieces!"
        />
      </main>
    </>
  );
}

export const metadata = {
  title: "Articles - Walt's Blog",
  description: "Technical articles and in-depth essays on software engineering, development practices, and technical explorations.",
};
