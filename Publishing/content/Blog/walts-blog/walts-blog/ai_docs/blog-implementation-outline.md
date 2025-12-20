# Walt's Blog Implementation Outline

## Overview

This document outlines the implementation strategy for Walt's Blog, a modern, minimalist blog platform that combines atomic design principles with Next.js 16 capabilities. The blog will feature a floating command palette interface, MDX support, and content from both human and AI perspectives.

This implementation leverages existing Claude skills:
- **Frontend Component Development with Atomic Design** - For building the component architecture
- **Next.js Documentation System Builder** - For the MDX-based blog API (renamed from docs to blogs)
- **Walter's Technical Writing Style** - For content structure and voice guidelines

## Core Requirements

### 1. User Experience
- **Floating Search/Command Bar**: Primary navigation method with keyboard shortcuts
- **Three Main Sections**: Highlights, Articles, Logs
- **Command Palette Navigation**: CMD+[N*] shortcuts for quick access
- **Simple, Personal Aesthetic**: Reflecting Walter's persona
- **Warm 90's Flannel-Inspired Design**: Already implemented in the current styling

### 2. Content Sources
- **Human Voice**: Walter's genuine thoughts written a few times per week
- **Walternate AI**: Technical logs and documentation from Walter's AI assistant
- **Chronological Home Page**: Display all posts in reverse chronological order

### 3. Technical Requirements
- **Atomic Component System**: Build reusable, scalable components
- **MDX Support**: For rich, interactive content
- **Next.js Blog API**: Rename documentation API to blogs API
- **Accessibility**: Ensure WCAG compliance

## Architecture

### 1. Project Structure
```
walts-blog/
├── app/
│   ├── (blog)/
│   │   ├── highlights/
│   │   │   └── page.tsx
│   │   ├── articles/
│   │   │   └── page.tsx
│   │   ├── logs/
│   │   │   └── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── api/
│   │   └── blogs/
│   │       ├── route.ts
│   │       └── [slug]/
│   │           └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Text/
│   │   ├── Icon/
│   │   └── Input/
│   ├── molecules/
│   │   ├── SearchBar/
│   │   ├── BlogCard/
│   │   ├── TagList/
│   │   └── MetaInfo/
│   ├── organisms/
│   │   ├── CommandPalette/
│   │   ├── BlogList/
│   │   ├── BlogPost/
│   │   └── Navigation/
│   └── templates/
│       ├── BlogLayout/
│       └── HomeLayout/
├── content/
│   ├── highlights/
│   ├── articles/
│   └── logs/
├── lib/
│   ├── mdx/
│   ├── blog-api/
│   └── utils/
└── styles/
    └── themes/
```

### 2. Atomic Component System

Following the Frontend Component Development skill methodology:

#### Atoms (Basic building blocks)
- **Button**: Glass morphism buttons with hover effects
  - Implementation: Custom with Tailwind + CVA for variants
  - Variants: rust-solid, outline-bold, glass variants
- **Text**: Typography components (Heading, Paragraph, Caption)
  - Use Geist fonts (already configured)
  - Implement with CVA for size/weight variants
- **Icon**: SVG icon wrapper with consistent sizing
  - Integrate Lucide icons for consistency
- **Input**: Form inputs with glass morphism styling
  - Custom implementation matching existing glass effects
- **Link**: Styled navigation links with hover states
- **Badge**: Category/tag badges for post metadata
- **KeyboardKey**: Visual keyboard shortcut display (CMD, etc.)

#### Molecules (Combinations of atoms)
- **SearchBar**: Floating search input with glass effect
- **BlogCard**: Preview card for blog posts
- **TagList**: Collection of tag badges
- **MetaInfo**: Author, date, reading time display
- **KeyboardShortcut**: Visual keyboard shortcut indicator

#### Organisms (Complex components)
- **CommandPalette**: Main navigation interface
  - Floating position
  - Keyboard navigation (arrow keys, enter)
  - Fuzzy search
  - Category filters
  - Keyboard shortcuts display
- **BlogList**: Grid/list of blog cards with filtering
- **BlogPost**: Full blog post display with MDX rendering
- **Navigation**: Tab navigation for sections

#### Templates (Page layouts)
- **BlogLayout**: Individual blog post layout
- **HomeLayout**: Homepage with chronological posts

### 3. Blog API Structure (Adapted from Next.js Docs Builder)

Transform the documentation API into a blog API using the Next.js Documentation System Builder skill:

```typescript
// app/api/blogs/route.ts
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // MDX content
  category: 'highlights' | 'articles' | 'logs';
  author: 'walter' | 'walternate';
  publishedAt: Date;
  updatedAt: Date;
  tags: string[];
  readingTime: number;
  featured: boolean;
}

// API Endpoints
GET /api/blogs - List all posts with pagination
GET /api/blogs/[slug] - Get single post
GET /api/blogs?category=highlights - Filter by category
GET /api/blogs?author=walternate - Filter by author
GET /api/blogs/search?q=query - Search posts
```

### 4. Command Palette Implementation

```typescript
interface CommandPaletteAction {
  id: string;
  name: string;
  shortcut?: string[];
  icon?: React.ComponentType;
  action: () => void;
  category?: string;
}

// Default commands
const commands: CommandPaletteAction[] = [
  {
    id: 'navigate-home',
    name: 'Go to Home',
    shortcut: ['cmd', '1'],
    action: () => router.push('/'),
  },
  {
    id: 'navigate-highlights',
    name: 'View Highlights',
    shortcut: ['cmd', '2'],
    action: () => router.push('/highlights'),
  },
  {
    id: 'navigate-articles',
    name: 'View Articles',
    shortcut: ['cmd', '3'],
    action: () => router.push('/articles'),
  },
  {
    id: 'navigate-logs',
    name: 'View Logs',
    shortcut: ['cmd', '4'],
    action: () => router.push('/logs'),
  },
];
```

### 5. MDX Configuration (From Next.js Docs Builder)

Install dependencies:
```bash
npm install next-mdx-remote gray-matter github-slugger \
  rehype-slug rehype-autolink-headings rehype-pretty-code \
  remark-gfm flexsearch zod
```

Configure MDX:
```typescript
// lib/blogs/mdx.ts
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, { theme: 'one-dark-pro' }],
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  ],
};
```

### 6. Content Management

#### Option 1: File-based (Recommended for simplicity)
- Store MDX files in `/content` directory
- Use frontmatter for metadata
- Git-based version control
- Simple deployment workflow

#### Option 2: Notion Integration (Future enhancement)
- Use existing Notion client dependency
- Sync content from Notion database
- Convert Notion blocks to MDX
- Scheduled sync via cron jobs

### 7. Content Writing Guidelines (Walter's Style)

Based on Walter's Technical Writing Style skill:

#### Voice Characteristics
- **Conversational Precision**: Technical accuracy with approachable language
- **First Principles Approach**: Break complex topics into fundamentals
- **Practical Anchoring**: Ground concepts in real implementations
- **Visual-Spatial Organization**: Structure content as if walking through diagrams

#### Content Types

**Human Voice (Walter)**
- Personal insights and experiences
- Technical explorations with "let's figure this out together" tone
- Use phrases like "So basically...", "If that makes sense..."
- Include specific metrics and real examples

**Walternate AI Voice**
- Technical logs and documentation
- More structured, but still conversational
- Focus on implementation details
- Maintain Walter's emphasis on practical outcomes

### 8. Styling Strategy

Leverage existing glass morphism design system:
- Extend current CSS variables
- Create component-specific glass variants
- Maintain warm, flannel-inspired palette
- Add subtle animations for interactions

```css
/* Command Palette specific glass styling */
.command-palette {
  @apply glass-heavy;
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  width: 90%;
  z-index: 50;
}

/* Blog card glass effect */
.blog-card {
  @apply glass-light;
  transition: all 0.3s ease;
}

.blog-card:hover {
  @apply glass;
  transform: translateY(-2px);
}
```

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up atomic component structure
- [ ] Implement basic atoms (Button, Text, Input)
- [ ] Create Command Palette organism
- [ ] Set up MDX configuration
- [ ] Create blog API structure

### Phase 2: Core Features (Week 2)
- [ ] Build blog listing pages
- [ ] Implement blog post rendering
- [ ] Add search functionality
- [ ] Create navigation system
- [ ] Implement keyboard shortcuts

### Phase 3: Content & Polish (Week 3)
- [ ] Add sample content for each category
- [ ] Implement filtering and sorting
- [ ] Add reading time calculation
- [ ] Create author attribution system
- [ ] Performance optimization


### Phase 4: Advanced Features (Future)
- [ ] RSS feed generation
- [ ] Analytics integration

## Technical Decisions

### 1. State Management
- Use React Context for command palette state
- Local state for component-level interactions
- URL state for filters and search

### 2. Data Fetching
- Static generation for blog posts
- Client-side fetching for search
- ISR (Incremental Static Regeneration) for updates

### 3. SEO Optimization
- Dynamic meta tags per post
- Structured data (JSON-LD)
- Sitemap generation
- Open Graph tags

### 4. Performance
- Image optimization with Next.js Image
- Lazy loading for blog lists
- Code splitting per route
- Prefetching for navigation

## Design Principles

1. **Minimalism**: Focus on content, reduce visual noise
2. **Keyboard-first**: Everything accessible via keyboard
3. **Personal Touch**: Reflect Walter's personality
4. **Technical Excellence**: Clean, maintainable code
5. **Accessibility**: WCAG AA compliance minimum

## Atomic Design Inventory

Create and maintain an `atomic-design.md` file at the project root (using the template from frontend-components skill):

```markdown
# Atomic Design System - Walt's Blog

## Component Inventory

### Atoms
- Button (glass morphism variants)
- Input (floating search style)
- Badge (category indicators)
- KeyboardKey (shortcut display)
- Text (typography system)
- Icon (Lucide wrapper)

### Molecules
- SearchBar (floating command input)
- BlogCard (post preview)
- KeyboardShortcut (key combination display)
- MetaInfo (author, date, reading time)
- TagList (category badges)

### Organisms
- CommandPalette (main navigation)
- BlogList (post grid/list)
- BlogPost (MDX content display)
- FloatingNav (tab navigation)

### Templates
- BlogLayout (post pages)
- HomeLayout (chronological feed)
- CategoryLayout (filtered views)
```

## Next Steps

1. Review and approve this outline
2. Create `atomic-design.md` inventory file
3. Set up the atomic component structure
4. Begin with Command Palette implementation (the core navigation)
5. Create first set of atom components
6. Establish MDX pipeline using Next.js docs builder patterns
7. Implement blog API routes
8. Add sample content for testing

## Quick Start Commands

```bash
# Install all dependencies
npm install next-mdx-remote gray-matter github-slugger \
  rehype-slug rehype-autolink-headings rehype-pretty-code \
  remark-gfm flexsearch zod class-variance-authority \
  lucide-react cmdk

# Create directory structure
mkdir -p components/{atoms,molecules,organisms,templates}
mkdir -p content/{highlights,articles,logs}
mkdir -p lib/blogs
mkdir -p app/api/blogs
```

This outline provides a comprehensive roadmap for building Walt's Blog with the requested features while maintaining technical excellence and a personal touch, leveraging your existing Claude skills for maximum efficiency.