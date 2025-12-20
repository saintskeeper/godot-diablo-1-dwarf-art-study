CREATE: app/highlights/page.tsx, app/articles/page.tsx, app/logs/page.tsx

CONTEXT: Category-specific pages for Highlights, Articles, and Logs
Filtered views showing only posts from each category with category-specific styling.

DEPENDENCIES (must exist first):
- components/organisms/FloatingNav
- components/organisms/BlogList
- lib/blogs/utils (getBlogPostsByCategory)

REQUIREMENTS:
- One page per category (highlights, articles, logs)
- Filter posts by category
- Category-specific header with icon
- Stack layout (single column)
- Don't show category badges (redundant)
- Author filtering available
- TypeScript with proper types

HIGHLIGHTS PAGE:
```tsx
// app/highlights/page.tsx
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
              <Icon icon={Sparkles} size="xl" color="burgundy" />
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
```

ARTICLES PAGE:
```tsx
// app/articles/page.tsx
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
              <Icon icon={FileText} size="xl" color="rust" />
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
```

LOGS PAGE:
```tsx
// app/logs/page.tsx
import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogList } from '@/components/organisms/BlogList';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Code2 } from 'lucide-react';
import { getBlogPostsByCategory } from '@/lib/blogs/utils';

export default async function LogsPage() {
  const posts = await getBlogPostsByCategory('logs');

  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <header className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="glass rounded-2xl p-4">
              <Icon icon={Code2} size="xl" color="denim" />
            </div>
            <Text variant="h1" color="primary">
              Development Logs
            </Text>
          </div>
          <Text variant="body" color="secondary" className="text-lg">
            Technical logs and structured documentation from Walternate AI.
            Implementation notes, system design, and development workflows.
          </Text>
        </header>

        {/* Posts List */}
        <BlogList
          posts={posts}
          layout="stack"
          showCategory={false}
          emptyMessage="No dev logs yet. Walternate will start logging soon!"
        />
      </main>
    </>
  );
}

export const metadata = {
  title: "Dev Logs - Walt's Blog",
  description: "Development logs and technical documentation from Walternate AI, featuring implementation notes and system design.",
};
```

LOADING STATES:
```tsx
// app/highlights/loading.tsx (same for articles and logs)
import { BlogListLoading } from '@/components/organisms/BlogList/Loading';
import { FloatingNav } from '@/components/organisms/FloatingNav';

export default function Loading() {
  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto mb-12 animate-pulse">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-20 w-20 bg-text-muted/10 rounded-2xl" />
            <div className="h-12 bg-text-muted/10 rounded-xl w-64" />
          </div>
          <div className="h-6 bg-text-muted/10 rounded-lg mb-2" />
          <div className="h-6 bg-text-muted/10 rounded-lg w-3/4" />
        </div>
        <div className="max-w-3xl mx-auto">
          <BlogListLoading />
        </div>
      </main>
    </>
  );
}
```

SHARED LAYOUT FOR CATEGORIES (Optional):
```tsx
// app/(categories)/layout.tsx
import { FloatingNav } from '@/components/organisms/FloatingNav';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FloatingNav />
      {children}
    </>
  );
}
```

BREADCRUMB COMPONENT (Optional):
```tsx
// components/molecules/Breadcrumb/index.tsx
import { Text } from '@/components/atoms/Text';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Icon } from '@/components/atoms/Icon';

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 mb-6">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && <Icon icon={ChevronRight} size="xs" color="muted" />}
          {index === items.length - 1 ? (
            <Text variant="small" color="muted">
              {item.label}
            </Text>
          ) : (
            <Link href={item.href}>
              <Text
                variant="small"
                color="secondary"
                className="hover:text-rust-base transition-colors"
              >
                {item.label}
              </Text>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

// Usage in category pages
<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Highlights', href: '/highlights' },
]} />
```

VERIFICATION:
- Each category page shows filtered posts
- Category headers display with icons
- Stack layout for better reading
- No redundant category badges
- Empty states display correctly
- Metadata correct for SEO
- Loading states work
- Breadcrumbs (if added) work
