CREATE: package.json (update dependencies)

CONTEXT: Install all required dependencies for Phase 1
MDX processing, UI component libraries, and validation tools for blog foundation.

DEPENDENCIES (must exist first):
- package.json with Next.js 16, React 19, Tailwind v4

REQUIREMENTS:
- Install MDX processing libraries (next-mdx-remote, gray-matter, github-slugger)
- Install rehype plugins for code highlighting and heading links
- Install remark plugins for GitHub-flavored markdown
- Install UI libraries (class-variance-authority for component variants)
- Install Lucide React for icons
- Install Zod for schema validation
- Install date-fns for date formatting

INSTALLATION COMMAND:
```bash
npm install next-mdx-remote gray-matter github-slugger \
  rehype-slug rehype-autolink-headings rehype-pretty-code \
  remark-gfm class-variance-authority lucide-react zod date-fns
```

PACKAGE VERSIONS:
```json
{
  "next-mdx-remote": "^5.0.0",
  "gray-matter": "^4.0.3",
  "github-slugger": "^2.0.0",
  "rehype-slug": "^6.0.0",
  "rehype-autolink-headings": "^7.0.0",
  "rehype-pretty-code": "^0.13.0",
  "remark-gfm": "^4.0.0",
  "class-variance-authority": "^0.7.0",
  "lucide-react": "^0.344.0",
  "zod": "^3.22.4",
  "date-fns": "^3.0.0"
}
```

VERIFICATION:
- Run `npm install` successfully
- Verify no peer dependency warnings
- Check package.json updated with new dependencies
