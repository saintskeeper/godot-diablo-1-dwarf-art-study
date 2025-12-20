# Cover Photos Feature

Add beautiful, blurred cover photos to your blog posts that enhance cards and social media sharing.

## Features

- **Blurred Background Cards**: Cover photos appear as multi-layered blurred backgrounds on blog cards
- **Social Media Integration**: Automatic Open Graph and Twitter Card meta tags
- **CDN Support**: Serve images from local public folder or configure a CDN
- **AI Generation**: Use `/generate_cover` command to create AI art with Midjourney

## Adding a Cover Photo to a Post

### Option 1: Manual (Existing Image)

1. Save your image to `/public/images/covers/`
2. Add `featuredImage` field to your post frontmatter:

```yaml
---
title: "My Post Title"
excerpt: "Post description"
author: "walter"
category: "articles"
publishedAt: "2025-11-11"
featuredImage: "/images/covers/my-post-cover.jpg"
tags: ["tag1", "tag2"]
featured: false
draft: false
---
```

### Option 2: AI-Generated (Midjourney)

1. Set up Midjourney API key in `.env`:
   ```bash
   MIDJOURNEY_API_KEY=your_key_here
   ```

2. Run the generate cover command:
   ```
   /generate_cover my-post-slug
   ```

3. The command will:
   - Analyze your post content
   - Generate a custom Midjourney prompt
   - Create and download the image
   - Update your post frontmatter automatically

## Image Specifications

- **Aspect Ratio**: 16:9 (recommended)
- **Recommended Size**: 1920x1080 or 1600x900
- **Formats**: `.jpg`, `.jpeg`, `.png`, `.webp`
- **File Naming**: `{slug}-cover.{ext}` (e.g., `my-post-title-cover.jpg`)

## CDN Configuration

To use a CDN for serving images:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Configure your CDN:
   ```bash
   NEXT_PUBLIC_USE_CDN=true
   NEXT_PUBLIC_CDN_URL=https://your-cdn-url.com
   NEXT_PUBLIC_CDN_TYPE=cloudflare  # or 's3' or 'custom'
   ```

3. Upload images to your CDN bucket
4. Update `featuredImage` paths to match your CDN structure

### CDN Examples

**Cloudflare R2:**
```bash
NEXT_PUBLIC_USE_CDN=true
NEXT_PUBLIC_CDN_URL=https://your-bucket.r2.cloudflarestorage.com
NEXT_PUBLIC_CDN_TYPE=cloudflare
```

**AWS S3:**
```bash
NEXT_PUBLIC_USE_CDN=true
NEXT_PUBLIC_CDN_URL=https://your-bucket.s3.amazonaws.com
NEXT_PUBLIC_CDN_TYPE=s3
```

## Design Aesthetic

The cover photo feature creates a unique multi-layered blur effect:

- **Layer 1**: Heavy blur (blur-3xl) at 40% opacity
- **Layer 2**: Medium blur (blur-xl) at 30% opacity
- **Gradient Overlays**: Dark gradients for text readability
- **Brand Colors**: Rust and burgundy accent gradients
- **Glass Morphism**: Enhanced backdrop blur and transparency

This creates depth and visual interest while maintaining readability.

## Social Media Preview

Cover photos automatically appear in:

- **Open Graph** (Facebook, LinkedIn, Slack, etc.)
- **Twitter Cards** (X platform)
- **Discord embeds**
- **Any service that reads meta tags**

Preview dimensions: 1200x630 (automatically handled)

## Troubleshooting

### Image not showing on card
- Verify path starts with `/` (e.g., `/images/covers/file.jpg`)
- Check file exists in `public/images/covers/`
- Clear Next.js cache: `rm -rf .next`

### CDN images not loading
- Verify `NEXT_PUBLIC_CDN_URL` is correct
- Check CORS settings on your CDN
- Ensure images are publicly accessible

### Blurred background too dark
- The design uses dark overlays for readability
- Adjust opacity values in `BlogCard.tsx` if needed
- Consider using brighter source images

## File Structure

```
walts-blog/
├── public/
│   └── images/
│       └── covers/          # Store cover images here
├── lib/
│   └── images/
│       └── cover-image.ts   # Image utility functions
├── components/
│   └── molecules/
│       └── BlogCard/
│           └── BlogCard.tsx # Card component with blur effect
└── .claude/
    └── commands/
        └── generate_cover.md # AI generation command
```

## Best Practices

1. **Consistent Dimensions**: Use 16:9 ratio for all covers
2. **Optimize File Size**: Compress images (aim for < 500KB)
3. **Use WebP**: Better compression than JPG/PNG
4. **Descriptive Names**: Use slug-based naming for easy identification
5. **Test Previews**: Check social media preview tools before publishing

## Future Enhancements

- Automatic image optimization pipeline
- Batch cover generation for multiple posts
- Cover photo templates by category
- Integration with other AI image generators (DALL-E, Stable Diffusion)
