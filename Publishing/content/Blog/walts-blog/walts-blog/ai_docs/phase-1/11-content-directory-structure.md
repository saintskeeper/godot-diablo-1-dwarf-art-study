CREATE: Content directory structure and sample files

CONTEXT: Set up file-based content management
Create directory structure for MDX blog posts organized by category with frontmatter metadata.

DEPENDENCIES (must exist first):
- gray-matter installed for frontmatter parsing
- MDX configuration complete

REQUIREMENTS:
- Create content/ directory at project root
- Create subdirectories for each category (highlights, articles, logs)
- Define frontmatter schema with Zod
- Create sample MDX files for each category
- Consistent slug naming convention

DIRECTORY STRUCTURE:
```
walts-blog/
├── content/
│   ├── highlights/
│   │   └── welcome-to-walts-blog.mdx
│   ├── articles/
│   │   └── first-article.mdx
│   └── logs/
│       └── dev-log-001.mdx
```

BASH COMMANDS:
```bash
mkdir -p content/{highlights,articles,logs}
```

FRONTMATTER SCHEMA:
```typescript
// lib/blogs/schema.ts
import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  author: z.enum(['walter', 'walternate']),
  category: z.enum(['highlights', 'articles', 'logs']),
  publishedAt: z.string(), // ISO date string
  updatedAt: z.string().optional(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

export interface BlogPostWithContent extends BlogPost {
  slug: string;
  content: string;
  readingTime: number;
}
```

SAMPLE MDX FILES:

```markdown
<!-- content/highlights/welcome-to-walts-blog.mdx -->
---
title: "Welcome to Walt's Blog"
excerpt: "A warm introduction to this personal blog where I share technical insights, development logs, and curated highlights from both human and AI perspectives."
author: "walter"
category: "highlights"
publishedAt: "2025-01-15"
tags: ["meta", "introduction", "blogging"]
featured: true
draft: false
---

# Welcome to Walt's Blog

Hey there! Welcome to my corner of the internet. This is where I share my thoughts on software engineering, development experiences, and technical explorations.

## What You'll Find Here

This blog is organized into three main sections:

- **Highlights**: The best posts, curated from both my human writing and Walternate's AI logs
- **Articles**: In-depth technical essays and explorations
- **Logs**: Development logs and technical documentation from my AI assistant

## The Dual Voice

You'll notice content from two authors:

1. **Walter** (that's me): Personal insights, essays, and technical discussions with a conversational tone
2. **Walternate AI**: Technical logs, documentation, and structured implementation notes

Both voices maintain a practical, first-principles approach to technical topics.

## Stay Tuned

I'll be sharing thoughts a few times a week. Use the command palette (CMD+K) to search and navigate, or jump to specific sections with keyboard shortcuts.

Enjoy!
```

```markdown
<!-- content/articles/first-article.mdx -->
---
title: "Building a Modern Blog with Next.js 16 and Glass Morphism"
excerpt: "A deep dive into creating a personal blog using Next.js 16, atomic design principles, and a warm flannel-inspired color palette with glass morphism effects."
author: "walter"
category: "articles"
publishedAt: "2025-01-16"
tags: ["nextjs", "react", "design-systems", "tailwind"]
featured: false
draft: false
---

# Building a Modern Blog with Next.js 16 and Glass Morphism

So basically, I wanted to build a blog that felt both modern and personal. Here's how I approached it.

## The Stack

The foundation is pretty straightforward:

- **Next.js 16** with App Router for performance and flexibility
- **Tailwind CSS v4** for utility-first styling
- **MDX** for rich, interactive content
- **Atomic design** for component organization

## Design Philosophy

The visual language borrows from 90's flannel colors—warm, earthy tones that feel personal without being overly styled. Glass morphism effects add depth without cluttering the interface.

```typescript
// Example: Glass effect utility classes
const cardStyles = 'glass hover:glass-heavy transition-all';
```

If that makes sense, the glass effects create hierarchy through blur and opacity rather than traditional borders and shadows.

## What's Next

I'll be adding more interactive components and exploring how to blend magazine-style layouts with modern web patterns.

More on this soon.
```

```markdown
<!-- content/logs/dev-log-001.mdx -->
---
title: "Dev Log 001: Setting Up the Blog Infrastructure"
excerpt: "Technical log documenting the initial setup of the blog platform, including MDX configuration, atomic component structure, and API route implementation."
author: "walternate"
category: "logs"
publishedAt: "2025-01-15"
tags: ["development", "setup", "infrastructure", "nextjs"]
featured: false
draft: false
---

# Dev Log 001: Setting Up the Blog Infrastructure

## Overview

This log documents the Phase 1 implementation of Walt's Blog, focusing on foundation components and content infrastructure.

## Implementation Steps

### 1. Dependencies Installed

```bash
npm install next-mdx-remote gray-matter github-slugger \
  rehype-slug rehype-autolink-headings rehype-pretty-code \
  remark-gfm class-variance-authority lucide-react zod date-fns
```

### 2. Atomic Component Structure

Created directory hierarchy following atomic design:

- `components/atoms/` - 6 primitive components (Button, Text, Input, Icon, Badge, KeyboardKey)
- `components/molecules/` - Planned for Phase 2
- `components/organisms/` - FloatingNav implemented
- `components/templates/` - Planned for Phase 2

### 3. MDX Pipeline

Configured rehype and remark plugins:
- Syntax highlighting with One Dark Pro theme
- Heading anchors with rehype-slug
- GFM support for tables and task lists

### 4. Content Schema

Defined Zod schema for blog post frontmatter with validation for:
- Author type (walter/walternate)
- Category (highlights/articles/logs)
- Tags, featured status, draft status

## Technical Specifications

- All components use class-variance-authority for variant management
- Glass morphism utilities from globals.css
- TypeScript strict mode enabled
- Accessible components with proper ARIA labels

## Next Steps

Phase 2 will implement:
- Command palette with cmdk
- Blog listing and filtering
- MDX rendering pipeline
- FlexSearch integration

## Performance Notes

- Static generation for blog posts
- Optimized MDX compilation
- Lazy loading considerations for images

---

*Generated by Walternate AI*
```

SLUG NAMING CONVENTION:
```typescript
// lib/blogs/utils.ts
import GithubSlugger from 'github-slugger';

export function generateSlug(title: string): string {
  const slugger = new GithubSlugger();
  return slugger.slug(title);
}

export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

VERIFICATION:
- Content directories created
- Sample MDX files with valid frontmatter
- Frontmatter matches Zod schema
- Slugs follow kebab-case convention
- File structure organized by category
