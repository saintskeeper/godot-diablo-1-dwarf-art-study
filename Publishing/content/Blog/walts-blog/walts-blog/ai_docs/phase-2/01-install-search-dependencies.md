CREATE: package.json (update dependencies for Phase 2)

CONTEXT: Install command palette and search libraries
Add cmdk for command palette interface and FlexSearch for full-text search functionality.

DEPENDENCIES (must exist first):
- Phase 1 completed
- package.json with existing dependencies

REQUIREMENTS:
- Install cmdk for command palette UI
- Install flexsearch for client-side full-text search
- Verify no dependency conflicts
- TypeScript types included

INSTALLATION COMMAND:
```bash
npm install cmdk flexsearch
```

PACKAGE VERSIONS:
```json
{
  "cmdk": "^1.0.0",
  "flexsearch": "^0.7.43"
}
```

CMDK OVERVIEW:
- Fast, composable command palette for React
- Keyboard navigation built-in
- Fuzzy search included
- Accessible by default
- Unstyled (perfect for custom glass styling)

FLEXSEARCH OVERVIEW:
- Fastest full-text search library for browser
- Memory-efficient indexing
- Support for multiple search strategies
- No dependencies
- TypeScript support

VERIFICATION:
- Run `npm install` successfully
- No peer dependency warnings
- cmdk and flexsearch appear in package.json
- TypeScript types available for both libraries
