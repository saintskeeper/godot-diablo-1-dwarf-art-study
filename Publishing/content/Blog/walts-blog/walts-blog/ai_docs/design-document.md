# Walt's Blog - Design Document

**Version**: 1.0  
**Date**: November 1, 2025  
**Author**: System Architecture Team  
**Status**: Draft

## Executive Summary

Walt's Blog is a modern, keyboard-first blogging platform that reimagines the traditional blog architecture through a floating command palette interface. Built on Next.js 16 with MDX support, the platform features content from both human (Walter) and AI (Walternate) perspectives, emphasizing simplicity, accessibility, and a unique warm aesthetic inspired by 90's flannel patterns.

### Key Differentiators
- **Command Palette Navigation**: Floating search bar replaces traditional header navigation
- **Keyboard-First Design**: All navigation accessible via CMD+[N] shortcuts
- **Dual Voice Content**: Human insights alongside AI-generated technical logs
- **Glass Morphism UI**: Warm, flannel-inspired design with modern glass effects
- **Atomic Component Architecture**: Scalable, maintainable component system

## Project Goals

### Primary Objectives
1. Create a simple yet sophisticated blogging platform that reflects Walter's personality
2. Implement a keyboard-first navigation system for power users
3. Support both human-written and AI-generated content seamlessly
4. Maintain high performance and accessibility standards
5. Build a scalable architecture using atomic design principles

### Success Metrics
- Page load time < 1.5s on 3G connection
- Lighthouse scores > 95 across all categories
- WCAG AA compliance for accessibility
- Search results returned in < 100ms
- Zero-friction content publishing workflow

## User Experience Design

### Information Architecture

```
Home (Chronological Feed)
├── Highlights (CMD+2)
│   └── Featured insights and key learnings
├── Articles (CMD+3)
│   └── In-depth technical explorations
└── Logs (CMD+4)
    └── Technical documentation and AI-generated content
```

### Navigation Paradigm

#### Floating Command Palette
- **Position**: Fixed, top-center of viewport
- **Activation**: Click or CMD+K
- **Features**:
  - Fuzzy search across all content
  - Quick navigation shortcuts
  - Recent searches
  - Category filters

#### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| CMD+K | Open command palette |
| CMD+1 | Navigate to Home |
| CMD+2 | Navigate to Highlights |
| CMD+3 | Navigate to Articles |
| CMD+4 | Navigate to Logs |
| CMD+/ | Focus search |
| ESC | Close command palette |

### User Flows

#### Content Discovery Flow
1. User lands on chronological home feed
2. Activates command palette (CMD+K or click)
3. Types search query or uses navigation shortcuts
4. Results appear instantly with highlighted matches
5. Selects result to navigate to full post

#### Reading Experience Flow
1. Clean, distraction-free article view
2. Floating table of contents for long posts
3. Progress indicator on scroll
4. Related posts at article end
5. Keyboard navigation between posts (J/K keys)

## Technical Architecture

### Technology Stack

#### Core Framework
- **Next.js 16.0.1**: React framework with App Router
- **React 19.2.0**: UI library
- **TypeScript 5.x**: Type safety
- **Tailwind CSS 4.x**: Utility-first styling

#### Content & Search
- **MDX**: Rich content authoring with component support
- **FlexSearch**: Client-side full-text search
- **Gray Matter**: Frontmatter parsing
- **Rehype/Remark**: MDX processing pipeline

#### UI Libraries
- **cmdk**: Command palette component
- **Lucide React**: Icon system
- **class-variance-authority**: Component variants
- **Zod**: Schema validation

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Next.js   │  │   Command    │  │   FlexSearch     │   │
│  │  App Router │  │   Palette    │  │   Index          │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                      API Layer (/api/blogs)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  MDX Parser │  │   Content    │  │    Search        │   │
│  │   & Cache   │  │   Fetcher    │  │    Builder       │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    File System (content/)                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ highlights/ │  │  articles/   │  │     logs/        │   │
│  │   (MDX)     │  │    (MDX)     │  │     (MDX)        │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture (Atomic Design)

#### Atoms (Foundation)
```typescript
// Base building blocks
atoms/
├── Button/          // Glass morphism CTAs
├── Input/           // Search and form inputs
├── Text/            // Typography system
├── Badge/           // Category/tag indicators
├── Icon/            // Lucide icon wrapper
├── KeyboardKey/     // Shortcut visualization
└── Link/            // Navigation elements
```

#### Molecules (Compositions)
```typescript
// Functional units
molecules/
├── SearchBar/       // Floating search input
├── BlogCard/        // Post preview cards
├── MetaInfo/        // Author, date, reading time
├── TagList/         // Category badge groups
└── KeyboardShortcut/ // Key combination display
```

#### Organisms (Complex Sections)
```typescript
// Interface sections
organisms/
├── CommandPalette/  // Main navigation interface
├── BlogList/        // Post grid/list views
├── BlogPost/        // MDX content renderer
├── TableOfContents/ // Article navigation
└── FloatingNav/     // Tab navigation
```

#### Templates (Layouts)
```typescript
// Page structures
templates/
├── BlogLayout/      // Individual post pages
├── HomeLayout/      // Chronological feed
└── CategoryLayout/  // Filtered category views
```

### Data Models

#### BlogPost Schema
```typescript
interface BlogPost {
  // Metadata
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  
  // Content
  content: string;  // MDX source
  readingTime: number;
  wordCount: number;
  
  // Categorization
  category: 'highlights' | 'articles' | 'logs';
  tags: string[];
  featured: boolean;
  
  // Attribution
  author: 'walter' | 'walternate';
  publishedAt: Date;
  updatedAt: Date;
  
  // SEO
  seo: {
    keywords: string[];
    ogImage?: string;
  };
}
```

#### Navigation Structure
```typescript
interface NavItem {
  id: string;
  title: string;
  slug: string;
  icon?: string;
  shortcut?: string[];
  children?: NavItem[];
}
```

### API Specification

#### Blog Endpoints
```typescript
// List posts with pagination
GET /api/blogs
Query params:
  - page: number
  - limit: number
  - category?: 'highlights' | 'articles' | 'logs'
  - author?: 'walter' | 'walternate'
  - featured?: boolean

// Get single post
GET /api/blogs/[slug]

// Search posts
GET /api/blogs/search
Query params:
  - q: string (search query)
  - category?: string
  - limit?: number
```

## Visual Design System

### Design Principles
1. **Warm Minimalism**: Clean interfaces with personality
2. **Glass Morphism**: Modern depth and layering
3. **Flannel-Inspired Palette**: Nostalgic yet professional
4. **Typography Focus**: Content-first design
5. **Subtle Interactions**: Enhance without distraction

### Color Palette

```css
/* 90's Flannel-Inspired Warm Palette */
:root {
  /* Backgrounds */
  --bg-primary: #FEFCF9;        /* Warm white */
  --bg-secondary: #FDFAF7;      /* Tinted white */
  --bg-tertiary: #FBF8F5;       /* Subtle off-white */
  
  /* Text */
  --text-primary: #1A1512;      /* Very dark brown */
  --text-secondary: #3A302A;    /* Dark brown */
  --text-muted: #4A3F37;        /* Medium brown */
  
  /* Interactive */
  --interactive-primary: #B86A4A;     /* Bold rust */
  --interactive-hover: #A55A3A;       /* Darker rust */
  
  /* Accents */
  --accent-burgundy: #8B4A6B;   /* Flannel red */
  --accent-rust: #C97D5F;       /* Warm orange */
  --accent-denim: #6B8FA3;      /* Cool blue */
  --accent-cream: #E8D5C4;      /* Light cream */
}
```

### Typography

```css
/* Font System */
--font-sans: 'Geist', system-ui, sans-serif;
--font-mono: 'Geist Mono', monospace;

/* Type Scale */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
```

### Glass Morphism Effects

```css
/* Glass variants for different contexts */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.1),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.5);
}

.glass-heavy {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
}

.glass-light {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px) saturate(150%);
}
```

### Component Styling Examples

#### Command Palette
```css
.command-palette {
  @apply glass-heavy;
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: min(600px, 90vw);
  border-radius: 1rem;
  overflow: hidden;
  animation: slideDown 0.2s ease;
}
```

#### Blog Card
```css
.blog-card {
  @apply glass-light;
  padding: 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.blog-card:hover {
  @apply glass;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
```

## Content Strategy

### Content Types

#### Highlights (Walter's Voice)
- **Purpose**: Featured insights and key learnings
- **Frequency**: 1-2 times per week
- **Length**: 500-1500 words
- **Style**: Conversational, first-principles thinking
- **Topics**: Personal discoveries, project insights, lessons learned

#### Articles (Walter's Voice)
- **Purpose**: In-depth technical explorations
- **Frequency**: Weekly
- **Length**: 1500-3000 words
- **Style**: Technical but approachable
- **Topics**: Architecture decisions, technology deep-dives, tutorials

#### Logs (Walternate's Voice)
- **Purpose**: Technical documentation and updates
- **Frequency**: As needed
- **Length**: 300-1000 words
- **Style**: Structured, informative
- **Topics**: Project updates, technical notes, tool documentation

### Writing Guidelines

#### Walter's Voice
```markdown
# Opening Pattern
"So I've been thinking about [topic], and here's what I've discovered..."

# Explanation Flow
1. Start with the problem
2. Break it down to fundamentals
3. Build up the solution
4. Include specific examples
5. End with practical takeaways

# Key Phrases
- "So basically..."
- "If that makes sense..."
- "The primary thing is..."
- "Let's work through this..."
```

#### Walternate's Voice
```markdown
# Structure
1. Executive Summary
2. Technical Details
3. Implementation Steps
4. Results/Metrics
5. Next Steps

# Tone
- More formal than Walter
- Still conversational
- Focus on clarity
- Include code examples
```

### SEO & Metadata

#### Required Frontmatter
```yaml
---
title: "Post Title"
description: "SEO description (150-160 chars)"
category: "highlights" | "articles" | "logs"
tags: ["tag1", "tag2"]
author: "walter" | "walternate"
publishedAt: "2025-01-01"
featured: false
seo:
  keywords: ["keyword1", "keyword2"]
  ogImage: "/images/og/post-slug.png"
---
```

## Performance Requirements

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms

### Optimization Strategies
1. **Static Generation**: Pre-render all blog posts at build time
2. **Image Optimization**: Next.js Image component with lazy loading
3. **Code Splitting**: Route-based splitting with dynamic imports
4. **Search Index**: Pre-build FlexSearch index at build time
5. **Font Loading**: Optimize Geist fonts with font-display: swap

### Caching Strategy
```typescript
// Static assets: 1 year
Cache-Control: public, max-age=31536000, immutable

// HTML pages: Revalidate after 1 hour
Cache-Control: public, max-age=0, must-revalidate
s-maxage=3600

// API responses: 5 minutes
Cache-Control: public, max-age=300, s-maxage=300
```

## Accessibility Requirements

### WCAG AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and landmarks
- **Focus Management**: Visible focus indicators, logical tab order
- **Alternative Text**: Descriptive alt text for all images

### Specific Implementations
1. **Skip Links**: "Skip to content" for keyboard users
2. **Semantic HTML**: Proper heading hierarchy, landmark regions
3. **ARIA Live Regions**: Announce search results and navigation
4. **Reduced Motion**: Respect prefers-reduced-motion
5. **High Contrast Mode**: Ensure readability in high contrast

## Security Considerations

### Content Security
1. **Input Sanitization**: Sanitize all MDX content
2. **XSS Prevention**: Strict CSP headers
3. **CSRF Protection**: Next.js built-in CSRF tokens
4. **Rate Limiting**: API endpoint rate limits

### Infrastructure Security
```typescript
// Security Headers
Content-Security-Policy: default-src 'self';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## Testing Strategy

### Unit Testing
- **Components**: Test all atomic components with React Testing Library
- **Utilities**: Test MDX parsing, search indexing, content fetching
- **Coverage Target**: >80% code coverage

### Integration Testing
- **User Flows**: Test complete user journeys
- **API Testing**: Validate all endpoints
- **Search Testing**: Verify search accuracy and performance

### E2E Testing
- **Critical Paths**: Home page, search, navigation, reading
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: iOS Safari, Chrome Android

### Performance Testing
- **Lighthouse CI**: Automated performance checks
- **Load Testing**: Verify performance under load
- **Bundle Analysis**: Monitor JavaScript bundle size

## Deployment & Operations

### Build Pipeline
```yaml
1. Install dependencies
2. Run tests (unit, integration)
3. Build static assets
4. Generate search index
5. Run Lighthouse CI
6. Deploy to Vercel
7. Invalidate CDN cache
```

### Monitoring
- **Analytics**: Privacy-focused analytics (Plausible/Fathom)
- **Error Tracking**: Sentry for error monitoring
- **Performance**: Web Vitals tracking
- **Uptime**: StatusPage for availability

### Backup & Recovery
- **Content Backup**: Daily Git commits
- **Database Backup**: N/A (file-based)
- **Disaster Recovery**: Vercel automatic rollbacks

## Implementation Timeline

### Phase 1: Foundation (Week 1)
- [x] Design document approval
- [ ] Set up project structure
- [ ] Implement atomic components (atoms)
- [ ] Create Command Palette
- [ ] Basic routing setup

### Phase 2: Core Features (Week 2)
- [ ] MDX pipeline implementation
- [ ] Blog API development
- [ ] Search functionality
- [ ] Category pages
- [ ] Homepage feed

### Phase 3: Polish (Week 3)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] SEO implementation
- [ ] Testing suite
- [ ] Documentation

### Phase 4: Launch (Week 4)
- [ ] Content migration
- [ ] Final testing
- [ ] Deployment setup
- [ ] Monitoring setup
- [ ] Launch! 🚀

## Risk Analysis

### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Search performance issues | Medium | High | Pre-build index, implement pagination |
| MDX compilation errors | Low | Medium | Comprehensive error handling |
| Bundle size growth | Medium | Medium | Regular bundle analysis, code splitting |

### Content Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Inconsistent posting | High | Medium | Content calendar, batching |
| AI content quality | Low | Low | Review process, clear guidelines |

## Success Metrics

### Launch Metrics (Month 1)
- [ ] 100% Lighthouse scores
- [ ] <1.5s page load time
- [ ] Zero accessibility errors
- [ ] 10+ published posts

### Growth Metrics (Month 3)
- [ ] 1000+ unique visitors
- [ ] <30% bounce rate
- [ ] >2min average session
- [ ] 50+ published posts

### Long-term Goals (Year 1)
- [ ] Established posting rhythm
- [ ] Community engagement
- [ ] Technical authority building
- [ ] Platform stability

## Appendices

### A. Technology Decisions
- **Why Next.js 16**: App Router, RSC, built-in optimizations
- **Why MDX**: Component flexibility, familiar syntax
- **Why FlexSearch**: Client-side search, small bundle
- **Why Atomic Design**: Scalability, maintainability

### B. Alternative Approaches Considered
- **Traditional Header**: Rejected for uniqueness
- **CMS Integration**: Deferred for simplicity
- **Comments System**: Future enhancement
- **Multi-language**: Out of scope for v1

### C. References
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Document Version History**
- v1.0 (2025-11-01): Initial design document

**Approval Sign-offs**
- [ ] Technical Lead
- [ ] Design Lead
- [ ] Product Owner
- [ ] Accessibility Reviewer