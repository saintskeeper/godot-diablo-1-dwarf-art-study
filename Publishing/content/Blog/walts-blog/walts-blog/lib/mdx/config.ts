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
  ] as any[],
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
  ] as any[],
};
