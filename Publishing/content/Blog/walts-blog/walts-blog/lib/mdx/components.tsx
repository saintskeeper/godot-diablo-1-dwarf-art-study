import Image from 'next/image';
import Link from 'next/link';
import { CodeBlock } from '@/components/atoms/CodeBlock';

export const mdxComponents = {
  // Headings with PC Gamer-inspired bold typography
  h1: (props: any) => (
    <h1
      className="text-5xl font-bold text-text-primary mt-8 mb-4"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-4xl font-bold text-text-primary mt-8 mb-4"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="text-3xl font-semibold text-text-primary mt-6 mb-3"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="text-2xl font-semibold text-text-secondary mt-6 mb-3"
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className="text-xl font-semibold text-text-secondary mt-4 mb-2"
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className="text-lg font-semibold text-text-secondary mt-4 mb-2"
      {...props}
    />
  ),

  // Body text
  p: (props: any) => (
    <p className="my-4 leading-relaxed text-text-primary" {...props} />
  ),

  // Links
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-base hover:text-teal-dark underline underline-offset-2 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-teal-base hover:text-teal-dark underline underline-offset-2 transition-colors"
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
  ul: (props: any) => (
    <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
  ),
  li: (props: any) => <li className="text-text-primary" {...props} />,

  // Blockquotes
  blockquote: (props: any) => (
    <blockquote
      className="my-6 pl-6 border-l-4 border-orange-base glass-light rounded-r-xl py-4 pr-4 italic"
      {...props}
    />
  ),

  // Tables
  table: (props: any) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full glass rounded-xl overflow-hidden" {...props} />
    </div>
  ),
  thead: (props: any) => <thead {...props} />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => <tr className="border-b border-text-muted/10" {...props} />,
  th: (props: any) => (
    <th
      className="bg-teal-base/10 px-4 py-2 text-left font-semibold border-b border-text-muted/20"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="px-4 py-2 border-b border-text-muted/10" {...props} />
  ),

  // Horizontal rule
  hr: (props: any) => (
    <hr className="my-8 border-t-2 border-teal-base/20" {...props} />
  ),

  // Code blocks with copy button
  pre: (props: any) => <CodeBlock {...props} />,
  code: (props: any) => <code {...props} />,

  // Strong and emphasis
  strong: (props: any) => (
    <strong className="font-bold text-text-primary" {...props} />
  ),
  em: (props: any) => <em className="italic" {...props} />,

  // Strikethrough (from remark-gfm)
  del: (props: any) => (
    <del className="line-through text-text-muted" {...props} />
  ),
};
