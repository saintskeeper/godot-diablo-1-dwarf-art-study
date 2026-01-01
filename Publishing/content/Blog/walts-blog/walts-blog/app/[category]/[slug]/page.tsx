import { FloatingNav } from '@/components/organisms/FloatingNav';
import { BlogPost } from '@/components/organisms/BlogPost';
import { PostNavigation } from '@/components/molecules/PostNavigation';
import { RelatedPosts } from '@/components/molecules/RelatedPosts';
import { getBlogPost, getBlogPostsByCategory, getPreviousNextPosts } from '@/lib/blogs/utils';
import { serialize } from 'next-mdx-remote/serialize';
import { mdxOptions } from '@/lib/mdx/config';
import { notFound } from 'next/navigation';
import { getBlogPostingSchema, getBreadcrumbSchema } from '@/lib/seo/structured-data';

interface BlogPostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;

  // Validate category
  if (!['highlights', 'articles', 'logs'].includes(category)) {
    notFound();
  }

  // Get blog post
  const post = await getBlogPost(category, slug);

  if (!post) {
    notFound();
  }

  // Serialize MDX content
  const mdxSource = await serialize(post.content, {
    mdxOptions: mdxOptions as any,
  });

  // Get related posts (same category, excluding current)
  const categoryPosts = await getBlogPostsByCategory(category);
  const relatedPosts = categoryPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  // Get previous/next posts
  const { previous: previousPost, next: nextPost } = await getPreviousNextPosts(category, slug);

  // Remove content from post object (already serialized)
  const { content, ...postMetadata } = post;

  // Generate structured data
  const blogPostingSchema = getBlogPostingSchema(postMetadata, category);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://walts-blog.com' },
    { name: category.charAt(0).toUpperCase() + category.slice(1), url: `https://walts-blog.com/${category}` },
    { name: post.title, url: `https://walts-blog.com/${category}/${slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Blog Post */}
        <BlogPost post={postMetadata} mdxSource={mdxSource} />

        {/* Previous/Next Navigation */}
        <PostNavigation
          previousPost={previousPost}
          nextPost={nextPost}
          currentCategory={category}
          currentSlug={slug}
        />

        {/* Related Posts */}
        <RelatedPosts
          posts={relatedPosts}
          category={category}
          currentSlug={slug}
        />
      </main>
    </>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const categories = ['highlights', 'articles', 'logs'];
  const params: { category: string; slug: string }[] = [];

  for (const category of categories) {
    const posts = await getBlogPostsByCategory(category);
    posts.forEach((post) => {
      params.push({
        category,
        slug: post.slug,
      });
    });
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const post = await getBlogPost(category, slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const url = `https://walts-blog.com/${category}/${slug}`;
  const authorName = post.author === 'walter' ? 'Walter' : 'Walternate';

  // Use featured image if available, otherwise use a default OG image
  const ogImage = post.featuredImage || 'https://walts-blog.com/og-default.png';

  return {
    title: `${post.title} - Walt's Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      siteName: "Walt's Blog",
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [authorName],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      site: '@waltsblog',
      creator: post.author === 'walter' ? '@walterdev' : '@walternateai',
      images: [ogImage],
    },
  };
}
