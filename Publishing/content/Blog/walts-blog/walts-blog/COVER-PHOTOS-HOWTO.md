# How to Add Cover Photos to Blog Posts

Quick guide for adding beautiful blurred background cover photos to your blog posts.

## Method 1: Manual Upload

### Step 1: Prepare Your Image
- Use 16:9 aspect ratio (e.g., 1920x1080)
- Save as `.jpg`, `.png`, or `.webp`
- Optimize file size (< 500KB recommended)

### Step 2: Add to Project
Save your image to:
```
public/images/covers/your-post-slug-cover.jpg
```

### Step 3: Update Post Frontmatter
Edit your post's `.mdx` file and add the `featuredImage` field:

```yaml
---
title: "Your Post Title"
excerpt: "Post description"
author: "walter"
category: "articles"
publishedAt: "2025-11-11"
featuredImage: "/images/covers/your-post-slug-cover.jpg"  # Add this line
tags: ["tag1", "tag2"]
featured: false
draft: false
---
```

### Step 4: Done!
Your post card will now display with a beautiful multi-layered blurred background.

---

## Method 2: AI Generation (Recommended)

Generate unique cover art using AI with one command.

### Prerequisites
Set up your Midjourney API key:
```bash
# Create .env.local from .env.example
cp .env.example .env.local

# Edit .env.local and add your key
MIDJOURNEY_API_KEY=your_api_key_here
```

### Generate a Cover
```bash
/generate_cover your-post-slug
```

The command will:
1. Read and analyze your post content
2. Generate an artistic Midjourney prompt based on the theme
3. Create the image via Midjourney API
4. Save it to `public/images/covers/`
5. Update your post's frontmatter automatically

### Example Prompts Generated

**For a technical article:**
> "Abstract geometric labyrinth dissolving into clean code paths, modern minimalist style, cool blues and rust oranges, soft lighting, digital art, clean lines, --ar 16:9 --style raw --v 6"

**For a dev log:**
> "Fragmented holographic neural network blooming from a terminal screen, cyberpunk aesthetic, electric burgundy and denim blue, neon glow, 3D render, futuristic, --ar 16:9 --style raw --v 6"

---

## Visual Effect

Cover photos create a unique aesthetic:
- **Multi-layer blur**: 3 stacked layers at different blur levels
- **Dark overlays**: Ensures text readability
- **Brand colors**: Rust and burgundy gradient accents
- **Glass morphism**: Enhanced backdrop blur
- **White text**: Drop shadows for contrast

---

## Using a CDN (Optional)

### Cloudflare R2
```bash
# In .env.local
NEXT_PUBLIC_USE_CDN=true
NEXT_PUBLIC_CDN_URL=https://your-bucket.r2.cloudflarestorage.com
NEXT_PUBLIC_CDN_TYPE=cloudflare
```

### AWS S3
```bash
# In .env.local
NEXT_PUBLIC_USE_CDN=true
NEXT_PUBLIC_CDN_URL=https://your-bucket.s3.amazonaws.com
NEXT_PUBLIC_CDN_TYPE=s3
```

Upload images to your CDN bucket and update the paths in your frontmatter.

---

## Social Media Integration

Cover photos automatically appear in:
- Facebook link previews (Open Graph)
- Twitter/X cards
- LinkedIn shares
- Discord embeds
- Slack unfurls

No additional configuration needed!

---

## Troubleshooting

**Image not showing?**
- Verify path starts with `/` (e.g., `/images/covers/file.jpg`)
- Check file exists in `public/images/covers/`
- Clear Next.js cache: `rm -rf .next && npm run build`

**Blurred background too dark?**
- The design uses dark overlays for readability
- Use brighter source images
- Adjust opacity in `components/molecules/BlogCard/BlogCard.tsx` if needed

**Build errors?**
- Run `npm run build` to check for TypeScript errors
- Verify image paths are valid strings

---

## Full Documentation

For complete details, see:
- `/docs/cover-photos.md` - Comprehensive feature documentation
- `.claude/commands/generate_cover.md` - AI generation command details
- `/lib/images/cover-image.ts` - Image utility functions
