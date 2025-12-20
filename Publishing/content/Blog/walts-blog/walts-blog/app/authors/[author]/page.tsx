import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogCard } from '@/components/molecules/BlogCard';
import { Text } from '@/components/atoms/Text';
import { getBlogPostsByAuthor } from '@/lib/blogs/utils';
import { getPersonSchema } from '@/lib/seo/structured-data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface AuthorPageProps {
  params: Promise<{
    author: string;
  }>;
}

// Author information
const AUTHORS = {
  walter: {
    name: 'Walter',
    bio: 'Software engineer passionate about building great products and sharing knowledge through writing.',
    avatar: '/avatars/walter.png',
  },
  walternate: {
    name: 'Walternate',
    bio: 'AI writing assistant helping to explore technical topics, document development processes, and share insights from an AI perspective.',
    avatar: '/avatars/walternate.png',
  },
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { author } = await params;

  // Validate author
  if (author !== 'walter' && author !== 'walternate') {
    notFound();
  }

  // Get author info
  const authorInfo = AUTHORS[author];

  // Get all posts by this author
  const posts = await getBlogPostsByAuthor(author);

  // Generate Person structured data
  const personSchema = getPersonSchema(author);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Author Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <Text variant="h1" color="primary" className="mb-4">
                  {authorInfo.name}
                </Text>
                <Text variant="body" color="muted" className="mb-6">
                  {authorInfo.bio}
                </Text>
                <div className="flex items-center gap-4">
                  <Text variant="small" color="muted">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author's Posts */}
        <div className="max-w-4xl mx-auto">
          <Text variant="h2" color="primary" className="mb-8">
            All Posts
          </Text>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={`${post.category}-${post.slug}`} post={post} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <Text variant="body" color="muted">
                No posts yet from this author.
              </Text>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// Generate static params for both authors
export async function generateStaticParams() {
  return [
    { author: 'walter' },
    { author: 'walternate' },
  ];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { author } = await params;

  if (author !== 'walter' && author !== 'walternate') {
    return {
      title: 'Author Not Found',
    };
  }

  const authorInfo = AUTHORS[author];
  const url = `https://walts-blog.com/authors/${author}`;

  return {
    title: `${authorInfo.name} - Walt's Blog`,
    description: authorInfo.bio,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: authorInfo.name,
      description: authorInfo.bio,
      url: url,
      siteName: "Walt's Blog",
      locale: 'en_US',
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: authorInfo.name,
      description: authorInfo.bio,
      site: '@waltsblog',
      creator: author === 'walter' ? '@walterdev' : '@walternateai',
    },
  };
}
