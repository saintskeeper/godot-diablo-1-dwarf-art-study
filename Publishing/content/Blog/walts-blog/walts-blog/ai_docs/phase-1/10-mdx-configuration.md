CREATE: lib/mdx/config.ts

CONTEXT: MDX processing configuration
Configure rehype/remark plugins for code highlighting, heading links, and GitHub-flavored markdown.

DEPENDENCIES (must exist first):
- next-mdx-remote installed
- rehype-* and remark-* plugins installed
- lib/mdx/ directory created

REQUIREMENTS:
- Configure rehype-pretty-code for syntax highlighting
- Add rehype-slug for heading IDs
- Add rehype-autolink-headings for anchor links
- Add remark-gfm for tables, strikethrough, task lists
- Export reusable MDX options object
- TypeScript types for MDX components

MDX CONFIG FILE:
```typescript
// lib/mdx/config.ts
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import type { Options } from 'rehype-pretty-code';

const rehypePrettyCodeOptions: Options = {
  theme: {
    dark: 'one-dark-pro',
    light: 'github-light',
  },
  keepBackground: false,
  defaultLang: 'plaintext',
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className = ['line--highlighted'];
  },
  onVisitHighlightedChars(node: any) {
    node.properties.className = ['word--highlighted'];
  },
};

export const mdxOptions = {
  remarkPlugins: [
    remarkGfm, // Support for tables, strikethrough, task lists
  ],
  rehypePlugins: [
    rehypeSlug, // Add IDs to headings
    [rehypePrettyCode, rehypePrettyCodeOptions], // Code syntax highlighting
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: {
          className: ['heading-anchor'],
        },
      },
    ], // Add anchor links to headings
  ],
};
```

SYNTAX HIGHLIGHTING STYLES:
```css
/* Add to globals.css */

/* Code block styling */
pre {
  @apply rounded-xl p-4 overflow-x-auto my-6;
  @apply glass-light border border-text-muted/10;
}

code {
  @apply font-mono text-sm;
}

/* Inline code */
:not(pre) > code {
  @apply px-1.5 py-0.5 rounded bg-text-muted/20 text-rust-base;
}

/* Highlighted lines */
.line--highlighted {
  @apply bg-rust-base/10 border-l-2 border-l-rust-base pl-3;
}

/* Highlighted words */
.word--highlighted {
  @apply bg-rust-base/20 rounded px-1;
}

/* Heading anchors */
.heading-anchor {
  @apply no-underline;
}

.heading-anchor:hover {
  @apply underline decoration-rust-base decoration-2;
}
```

CUSTOM MDX COMPONENTS:
```typescript
// lib/mdx/components.tsx
import { Text } from '@/components/atoms/Text';
import { Badge } from '@/components/atoms/Badge';
import Image from 'next/image';
import Link from 'next/link';

export const mdxComponents = {
  // Headings with PC Gamer-inspired bold typography
  h1: (props: any) => <Text variant="h1" color="primary" className="mt-8 mb-4" {...props} />,
  h2: (props: any) => <Text variant="h2" color="primary" className="mt-8 mb-4" {...props} />,
  h3: (props: any) => <Text variant="h3" color="primary" className="mt-6 mb-3" {...props} />,
  h4: (props: any) => <Text variant="h4" color="secondary" className="mt-6 mb-3" {...props} />,
  h5: (props: any) => <Text variant="h5" color="secondary" className="mt-4 mb-2" {...props} />,
  h6: (props: any) => <Text variant="h6" color="secondary" className="mt-4 mb-2" {...props} />,

  // Body text
  p: (props: any) => <Text variant="body" className="my-4 leading-relaxed" {...props} />,

  // Links
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rust-base hover:text-rust-dark underline underline-offset-2"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-rust-base hover:text-rust-dark underline underline-offset-2"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Images
  img: ({ src, alt, ...props }: any) => (
    <span className="block my-6 glass rounded-2xl overflow-hidden">
      <Image
        src={src}
        alt={alt || ''}
        width={1200}
        height={630}
        className="w-full h-auto"
        {...props}
      />
    </span>
  ),

  // Lists
  ul: (props: any) => <ul className="my-4 ml-6 list-disc space-y-2" {...props} />,
  ol: (props: any) => <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />,
  li: (props: any) => <li className="text-text-primary" {...props} />,

  // Blockquotes
  blockquote: (props: any) => (
    <blockquote
      className="my-6 pl-6 border-l-4 border-rust-base glass-light rounded-r-xl py-4 pr-4"
      {...props}
    />
  ),

  // Tables
  table: (props: any) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full glass rounded-xl overflow-hidden" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="bg-rust-base/10 px-4 py-2 text-left font-semibold border-b border-text-muted/20" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-2 border-b border-text-muted/10" {...props} />
  ),

  // Custom components
  Badge,
};
```

VERIFICATION:
- MDX options export successfully
- Syntax highlighting works with One Dark Pro theme
- Heading IDs generated automatically
- GFM features work (tables, strikethrough, task lists)
- Custom components render correctly
