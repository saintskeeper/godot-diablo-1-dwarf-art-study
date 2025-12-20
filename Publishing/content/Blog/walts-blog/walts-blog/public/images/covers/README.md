# Cover Photos Directory

Store blog post cover images here.

## Quick Start

1. **Add an image** to this directory (e.g., `my-post-cover.jpg`)
2. **Update your post frontmatter**:
   ```yaml
   ---
   title: "My Post Title"
   featuredImage: "/images/covers/my-post-cover.jpg"
   ---
   ```
3. The image will appear as a blurred background on blog cards

## Image Specs

- **Aspect Ratio**: 16:9 (recommended)
- **Size**: 1920x1080 or 1600x900
- **Formats**: `.jpg`, `.jpeg`, `.png`, `.webp`
- **Naming**: `{slug}-cover.{ext}` (e.g., `my-article-cover.jpg`)

## AI Generation

Generate covers automatically using the Midjourney API:

```bash
/generate_cover my-post-slug
```

This will analyze your post and create unique cover art.

## More Info

See `/docs/cover-photos.md` for complete documentation.
