import { BlogCard } from './BlogCard';
import type { BlogPostMetadata } from '@/lib/blogs/schema';

// Example blog post data
const examplePost: BlogPostMetadata = {
  slug: 'building-modern-web-apps',
  title: 'Building Modern Web Apps with Next.js and TypeScript',
  excerpt:
    'A deep dive into modern web development patterns, server components, and type-safe architectures that scale.',
  author: 'walter',
  category: 'articles',
  publishedAt: '2025-01-14',
  tags: ['React', 'Next.js', 'TypeScript', 'Web Development'],
  featured: false,
  draft: false,
  readingTime: 8,
  featuredImage: '/images/web-apps.jpg', // Optional
};

const exampleFeaturedPost: BlogPostMetadata = {
  slug: 'ai-powered-development',
  title: 'The Future of AI-Powered Development Tools',
  excerpt:
    'Exploring how AI assistants are transforming software development, from code generation to architectural decisions.',
  author: 'walternate',
  category: 'highlights',
  publishedAt: '2025-01-15',
  tags: ['AI', 'Development', 'Future', 'Tools', 'Productivity'],
  featured: true,
  draft: false,
  readingTime: 12,
  featuredImage: '/images/ai-development.jpg',
};

const exampleLogPost: BlogPostMetadata = {
  slug: 'implementing-dark-mode',
  title: 'Dev Log: Implementing Dark Mode with CSS Variables',
  excerpt:
    'Technical notes on building a performant dark mode toggle using CSS custom properties and React context.',
  author: 'walternate',
  category: 'logs',
  publishedAt: '2025-01-13',
  tags: ['CSS', 'Dark Mode', 'React', 'Performance'],
  featured: false,
  draft: false,
  readingTime: 5,
};

export function BlogCardExamples() {
  return (
    <div className="space-y-12 p-8">
      <section>
        <h2 className="text-3xl font-bold mb-6">Standard Blog Card</h2>
        <div className="max-w-sm">
          <BlogCard post={examplePost} />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Variant</h2>
        <div className="max-w-2xl">
          <BlogCard post={exampleFeaturedPost} featured />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Grid Layout (3 columns)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard post={examplePost} />
          <BlogCard post={exampleFeaturedPost} />
          <BlogCard post={exampleLogPost} />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Magazine Layout (Mixed Sizes)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BlogCard
            post={exampleFeaturedPost}
            featured
            className="lg:col-span-2"
          />
          <BlogCard post={examplePost} />
          <BlogCard post={exampleLogPost} />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Stack Layout (Category Page)</h2>
        <div className="space-y-6 max-w-3xl">
          <BlogCard post={examplePost} showCategory />
          <BlogCard post={exampleFeaturedPost} showCategory />
          <BlogCard post={exampleLogPost} showCategory />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Without Featured Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard
            post={{
              ...examplePost,
              featuredImage: undefined,
            }}
          />
          <BlogCard
            post={{
              ...exampleFeaturedPost,
              featuredImage: undefined,
            }}
            featured
          />
          <BlogCard
            post={{
              ...exampleLogPost,
              featuredImage: undefined,
            }}
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">All Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BlogCard post={examplePost} />
          <BlogCard post={exampleFeaturedPost} />
          <BlogCard post={exampleLogPost} />
        </div>
      </section>
    </div>
  );
}
