# Pants Build System Guide

This guide explains how Pants is configured for this Next.js blog project and how to use it effectively.

## What is Pants?

Pants is a fast, scalable build system designed for monorepos and polyglot projects. It excels at:
- Managing complex dependency graphs across multiple languages
- Providing hermetic builds (reproducible anywhere)
- Caching build artifacts intelligently
- Supporting Python, JavaScript, Go, Java, Scala, and more

## Why Pants for This Project?

This blog is currently a **single Next.js application**, so Pants is technically overkill. However, it's set up here as a **learning tool** to understand how Pants works before using it on larger, more complex projects.

### When Pants Shines
- Monorepos with multiple services (e.g., Python backend + Next.js frontend)
- Projects with shared libraries across multiple languages
- Teams needing strict dependency management
- Large codebases where incremental builds matter

### Current Limitations
The JavaScript backend (`pants.backend.experimental.javascript`) is **experimental**, meaning:
- ❌ No `pants check` (type-checking)
- ❌ No `pants test` (testing)
- ❌ No `pants lint` (linting)
- ✅ Dependency analysis works
- ✅ Target discovery works
- ✅ File dependency tracking works

**For actual building/testing:** Continue using `npm run dev`, `npm run build`, etc.

## Configuration Overview

### `pants.toml`
```toml
[GLOBAL]
pants_version = "2.25.0"

backend_packages = [
    "pants.backend.experimental.javascript"
]

[nodejs]
known_versions = []  # Use system Node.js, don't download
version = "v24.8.0"  # Your installed Node.js version
search_path = ["<PATH>", "<NVM_LOCAL>"]
package_manager = "npm"
```

### `walts-blog/BUILD`
```python
# Tracks all JavaScript/TypeScript files recursively
javascript_sources()

# Represents package.json and npm dependencies
package_json(name="package")
```

## Pants Address Syntax

Understanding how to reference code in Pants is crucial:

### The `::` Recursive Operator
- `::` = "everything in this directory and all subdirectories"
- `:` = "just this directory (not subdirectories)"

### Examples
```bash
# List ALL targets in the entire project
pants list ::

# List targets in walts-blog/ and all subdirectories
pants list walts-blog::

# List targets ONLY in walts-blog/ (not app/, components/, etc.)
pants list walts-blog:

# Reference a specific target
pants list walts-blog:package

# Reference a specific file
pants dependencies walts-blog/app/page.tsx
```

### Target Names
Pants creates targets from your files:
- `walts-blog:walts-blog` - The `javascript_sources()` target
- `walts-blog:package` - The `package_json()` target
- `walts-blog:package#react` - The React dependency from package.json
- `walts-blog/app/page.tsx` - Individual file target

## Common Commands

### Discovery & Inspection

**List all targets:**
```bash
pants list ::
```

**Show dependencies for a file:**
```bash
pants dependencies walts-blog/app/page.tsx
```

**Show what depends on a file (reverse dependencies):**
```bash
pants dependents walts-blog/lib/utils.ts
```

**Show all files a target depends on:**
```bash
pants filedeps walts-blog/app/page.tsx
```

**Inspect target metadata:**
```bash
pants peek walts-blog:package
```

**Count lines of code:**
```bash
pants count-loc ::
```

### Build File Management

**Auto-generate BUILD files:**
```bash
pants tailor ::
```

This scans your codebase and creates/updates BUILD files where needed.

**Update BUILD files after adding new directories:**
```bash
pants tailor ::
```

Run this whenever you create new directories with source code.

## How Pants Works with This Project

### Dependency Inference

Pants automatically understands your dependencies by analyzing:
- `import` statements in TypeScript/JavaScript files
- `package.json` dependencies
- File system structure

**Example:**
If `app/page.tsx` imports from `components/atoms/Button.tsx`, Pants knows:
```
walts-blog/app/page.tsx
  → depends on → walts-blog/components/atoms/Button.tsx
```

### Caching

Pants caches work in `~/.cache/pants/`:
- Dependency analysis results
- Build outputs (when backends support it)
- Downloaded tools

Clear cache with:
```bash
rm -rf ~/.cache/pants/
```

### The `.pants.d` Directory

Pants creates `.pants.d/` in your repo root for:
- Local process metadata
- Temporary files

This is already in `.gitignore` and can be safely deleted.

## Workflow Integration

### Daily Development (Use npm/Next.js)
```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint
```

### Dependency Analysis (Use Pants)
```bash
# Find what depends on a utility function
pants dependents walts-blog/lib/utils.ts

# See all files that would be affected by changing a component
pants dependents walts-blog/components/atoms/Button.tsx

# Understand your dependency graph
pants dependencies walts-blog/app::
```

### Maintenance (Use Pants)
```bash
# Update BUILD files after restructuring
pants tailor ::

# Count LOC for metrics
pants count-loc ::

# Export dependency graph for visualization
pants export --resolve=nodejs ::
```

## Project Structure

```
walts-blog/
├── BUILD                    # Root Pants build file
├── pants.toml              # Pants configuration
├── walts-blog/
│   ├── BUILD               # Application build targets
│   ├── package.json        # npm dependencies
│   ├── app/                # Next.js App Router
│   ├── components/         # React components (atomic design)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── lib/                # Utilities
│   └── content/            # MDX blog posts
└── .pants.d/               # Pants process files (gitignored)
```

## Troubleshooting

### "Unmatched glob from CLI arguments"

**Problem:** Pants can't find the files you specified.

**Solutions:**
1. Make sure you're in the repo root (where `pants.toml` lives)
2. Use `::` for recursive operations: `pants list ::`
3. Check if files are in `.gitignore` or `pants_ignore`

### "Invalid version: '$PANTS_VERSION'"

**Problem:** `pants.toml` has environment variable instead of actual version.

**Solution:** Use literal version number:
```toml
pants_version = "2.25.0"  # ✅ Good
pants_version = "$PANTS_VERSION"  # ❌ Bad
```

### "No relevant backends activate the `X` goal"

**Problem:** The experimental JavaScript backend doesn't support that goal yet.

**Solution:** Use npm scripts for building/testing/linting:
```bash
npm run build    # Instead of: pants check
npm run lint     # Instead of: pants lint
npm run test     # Instead of: pants test
```

### "ModuleNotFoundError: No module named 'pants.backend...'"

**Problem:** Referenced a backend that doesn't exist in your Pants version.

**Solution:** Check available backends:
```bash
pants help backends
```

## Advanced: Dependency Visualization

You can visualize your dependency graph using tools like `graphviz`:

```bash
# Export dependencies as JSON
pants dependencies --output-format=json walts-blog:: > deps.json

# Use pants peek to see raw target data
pants peek --output-format=json walts-blog:package > package-meta.json
```

## Learning Resources

### Official Pants Documentation
- [Getting Started](https://www.pantsbuild.org/docs/getting-started)
- [JavaScript/Node.js Support](https://www.pantsbuild.org/docs/javascript)
- [Concepts](https://www.pantsbuild.org/docs/concepts)

### Key Concepts to Learn
1. **Targets** - Addressable units of code (files, libraries, executables)
2. **Goals** - Commands you run (list, dependencies, test, build)
3. **Backends** - Plugins that add language support
4. **Rules** - Pants' internal build logic (advanced)

### Commands to Practice
```bash
# Master these first
pants list ::
pants dependencies <file>
pants dependents <file>
pants filedeps <file>

# Then explore
pants peek <target>
pants tailor ::
pants count-loc ::
```

## Future: Expanding to a Monorepo

If you add more services to this project, Pants becomes more valuable:

### Example: Adding a Python API
```toml
# pants.toml
backend_packages = [
    "pants.backend.experimental.javascript",
    "pants.backend.python",
    "pants.backend.python.lint.black",
]
```

### Directory Structure
```
Apps/walts-blog/
├── walts-blog/          # Next.js frontend
│   └── BUILD
├── api/                 # Python backend
│   └── BUILD
└── shared/              # Shared types/utilities
    └── BUILD
```

### Cross-Language Benefits
```bash
# See if Python backend depends on frontend types
pants dependencies api::

# Find everything that depends on shared utilities
pants dependents shared::
```

## Summary

**What Pants Does for You:**
- ✅ Tracks file dependencies automatically
- ✅ Understands your project structure
- ✅ Provides powerful dependency analysis
- ✅ Prepares you for monorepo/polyglot projects

**What Pants Doesn't Do (Yet) for JavaScript:**
- ❌ Type checking (use `tsc` or Next.js)
- ❌ Testing (use your test framework)
- ❌ Linting (use ESLint)
- ❌ Building (use Next.js/npm)

**When to Use Pants:**
- Analyzing dependencies
- Understanding code relationships
- Maintaining BUILD files
- Planning architecture changes
- Learning build system concepts

**When to Use npm/Next.js:**
- Daily development
- Building for production
- Running tests
- Linting code

## Quick Reference Card

```bash
# Must-know commands
pants list ::                              # List all targets
pants tailor ::                            # Update BUILD files
pants dependencies <file>                  # What does this depend on?
pants dependents <file>                    # What depends on this?

# Useful commands
pants filedeps <file>                      # All files this needs
pants count-loc ::                         # Count lines of code
pants peek <target>                        # Inspect target metadata

# Address syntax
::                                         # Everything recursively
walts-blog::                              # walts-blog/ recursively
walts-blog:                               # Just walts-blog/ directory
walts-blog:package                        # Specific target
```

---

**Remember:** Pants is a powerful tool, but it's overkill for a single Next.js app. The real value comes when you have multiple services, languages, or a complex monorepo. Use this project to learn the concepts, then apply them to bigger challenges!
