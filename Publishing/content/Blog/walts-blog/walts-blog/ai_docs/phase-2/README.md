# Phase 2: Core Features - Implementation Tasks

This folder contains detailed ADW (Automated Development Workflow) task files for implementing the command palette, blog components, search functionality, and page structure.

## Overview

Phase 2 builds on Phase 1's foundation to create the complete blog experience with command palette navigation, content rendering, and full-text search.

## Task Files

### Dependencies & Hooks
- **01-install-search-dependencies.md** - Install cmdk and FlexSearch
- **02-keyboard-shortcuts-hook.md** - Global keyboard shortcut management (CMD+K, CMD+1-4)

### Blog Molecules
- **03-searchbar-molecule.md** - Floating search input with glass styling
- **04-metainfo-molecule.md** - Author, date, reading time display
- **05-taglist-molecule.md** - Tag collection with filtering
- **06-blogcard-molecule.md** - Blog post preview card

### Blog Organisms
- **07-command-palette-organism.md** - CMD+K overlay with fuzzy search (cmdk)
- **08-bloglist-organism.md** - Post list with filtering and sorting
- **09-blogpost-organism.md** - Full MDX blog post renderer

### Search & Integration
- **10-flexsearch-integration.md** - Full-text search implementation
- **14-root-layout-integration.md** - CommandPalette and keyboard shortcuts in root layout

### Pages
- **11-home-page.md** - Homepage with chronological feed
- **12-category-pages.md** - Highlights, Articles, Logs pages
- **13-blog-post-page.md** - Individual post page with dynamic routing

## Key Features

- **Command Palette (CMD+K)**: Overlay search with keyboard navigation
- **Floating Navigation Bar**: Always-visible pill bar for quick section access
- **Dual Navigation**: Pill bar + command palette working together
- **FlexSearch Integration**: Fast client-side full-text search
- **Blog Components**: Complete molecule/organism set for content display
- **Dynamic Routing**: Individual post pages with static generation
- **Filtering & Sorting**: Author, category, reading time filters

## Dependencies Installed

```bash
npm install cmdk flexsearch
```

## Design Decisions

Based on your input:
- **Navigation**: Persistent pill bar + CMD+K overlay search
- **Layout Density**: Minimal glass cards with magazine-inspired typography
- **Content Voice**: AI writes Logs, Walter writes Articles, Highlights curate both
- **Approach**: Thorough atomic component foundation

## Execution Order

Tasks should be executed in numerical order (01 → 14):

1. Install search dependencies
2. Create keyboard shortcuts hook
3. Build molecules (SearchBar, MetaInfo, TagList, BlogCard)
4. Build organisms (CommandPalette, BlogList, BlogPost)
5. Implement FlexSearch
6. Create pages (Home, Categories, Post)
7. Integrate into root layout

## Success Criteria

Phase 2 is complete when:
- [ ] Command palette opens with CMD+K
- [ ] Keyboard shortcuts work (CMD+1-4)
- [ ] Search returns relevant results
- [ ] Blog posts render with MDX
- [ ] Category pages filter correctly
- [ ] Individual post pages work
- [ ] Related posts display
- [ ] FloatingNav always visible
- [ ] Filtering and sorting functional

## Page Structure

```
/                          → Home page (all posts chronologically)
/highlights               → Highlights category page
/articles                 → Articles category page
/logs                     → Logs category page
/highlights/[slug]        → Individual highlight post
/articles/[slug]          → Individual article post
/logs/[slug]              → Individual log post
```

## API Endpoints

```
GET /api/blogs                           → All posts
GET /api/blogs?category=highlights       → Filtered by category
GET /api/blogs?author=walternate         → Filtered by author
GET /api/blogs/[slug]?category=articles  → Single post
GET /api/search?q=query                  → Search posts
```

## Next Steps

After completing Phase 2:
- Test complete user flows
- Add sample content for each category
- Performance optimization
- SEO verification
- Accessibility audit
- Prepare for Phase 3 (future enhancements)
