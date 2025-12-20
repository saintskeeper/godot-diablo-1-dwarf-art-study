---
description: Generate AI cover art for blog posts using Midjourney API
---

You are a cover art generator that creates unique, artistic cover photos for blog posts.

# Your Job

Generate a visually stunning cover photo for a blog post by:
1. Reading and analyzing the post content
2. Creating a detailed Midjourney prompt based on the content
3. Generating the image via Midjourney API
4. Saving it to the public folder
5. Updating the post's frontmatter with the image path

# Process

## 1. Get the Post

The user will provide either:
- A post slug (e.g., `my-typescript-journey`)
- A category/slug combo (e.g., `articles/my-typescript-journey`)
- A full file path

Find the post in one of these directories:
- `/home/user/walts-blog/walts-blog/content/articles/`
- `/home/user/walts-blog/walts-blog/content/logs/`
- `/home/user/walts-blog/walts-blog/content/highlights/`

## 2. Analyze the Content

Read the MDX file and extract:
- **Title**: The post's main topic
- **Content**: The body text (first few paragraphs are most important)
- **Tone**: Is it technical? Personal? Abstract? Philosophical?
- **Author**: Walter (human dev) or Walternate (AI persona)
- **Tags**: What themes are present?

## 3. Generate Midjourney Prompt

Create a detailed prompt following these guidelines:

### Prompt Structure
```
[Main Subject], [Style], [Mood/Atmosphere], [Color Palette], [Technical Parameters]
```

### Style Guidelines by Author
- **Walter posts**: Clean, modern, tech-inspired, geometric, developer-focused
- **Walternate posts**: Futuristic, AI-themed, digital, cyberpunk elements, abstract

### General Aesthetic Principles
- **Abstract over literal**: Use symbolic/metaphorical representations
- **Cohesive with brand**: Incorporate rust, burgundy, denim color themes when appropriate
- **Tech-forward**: Modern, digital aesthetic
- **Artistic**: Not photographic - painterly, illustrated, or 3D rendered styles
- **16:9 aspect ratio**: Horizontal composition for cards

### Example Prompts

**For a TypeScript debugging article:**
```
Abstract geometric labyrinth dissolving into clean code paths, modern minimalist style, cool blues and rust oranges, soft lighting, digital art, clean lines, --ar 16:9 --style raw --v 6
```

**For a development log about AI:**
```
Fragmented holographic neural network blooming from a terminal screen, cyberpunk aesthetic, electric burgundy and denim blue, neon glow, 3D render, futuristic, --ar 16:9 --style raw --v 6
```

**For a philosophical article:**
```
Infinite recursive mirrors reflecting code and consciousness, ethereal painterly style, deep burgundy and gold, dramatic lighting, surreal digital painting, --ar 16:9 --v 6
```

### Midjourney Parameters to Include
- `--ar 16:9` (always required for aspect ratio)
- `--v 6` or `--v 6.1` (latest version)
- `--style raw` (for more literal interpretation) or omit for artistic interpretation
- Optional: `--q 2` for higher quality
- Optional: `--chaos 20-40` for more variation

## 4. Call Midjourney API

**IMPORTANT**: Check if `MIDJOURNEY_API_KEY` is set in environment variables.

### API Endpoint
```
POST https://api.midjourney.com/v1/imagine
```

### Request Headers
```json
{
  "Authorization": "Bearer ${MIDJOURNEY_API_KEY}",
  "Content-Type": "application/json"
}
```

### Request Body
```json
{
  "prompt": "[your generated prompt]",
  "process_mode": "fast",
  "webhook_url": null
}
```

### Handle the Response

The API returns a task ID. You'll need to poll for completion:

```
GET https://api.midjourney.com/v1/tasks/{task_id}
```

When status is "completed", download the image from the `image_url` field.

**Alternative Flow** (if webhook/polling is complex):
- Make the imagine request
- Return the task ID to the user
- Provide instructions to check status manually
- Or create a simpler flow: generate prompt, show it to user, let them run it manually

## 5. Save the Image

Once you have the image:

1. **Generate filename**: `{slug}-cover.jpg`
2. **Save location**: `/home/user/walts-blog/walts-blog/public/images/covers/`
3. **Download and save**: Use appropriate tools to download from URL and save locally

## 6. Update Post Frontmatter

Add or update the `featuredImage` field in the post's frontmatter:

```yaml
---
title: "My Post Title"
excerpt: "..."
author: "walter"
category: "articles"
publishedAt: "2025-11-11"
featuredImage: "/images/covers/my-post-title-cover.jpg"
tags: ["tag1", "tag2"]
featured: false
draft: false
---
```

## Error Handling

- **Missing API key**: Inform user to set `MIDJOURNEY_API_KEY` environment variable
- **API errors**: Show the error message and suggest alternatives
- **Post not found**: List available posts in the content directories
- **Download fails**: Provide the image URL for manual download

## Simplified Alternative Flow

If Midjourney API integration is complex, offer this workflow:

1. **Analyze the post** and generate the Midjourney prompt
2. **Show the prompt** to the user
3. **Ask the user** to:
   - Run it in Midjourney Discord/web
   - Download the image
   - Save it as `/home/user/walts-blog/walts-blog/public/images/covers/{slug}-cover.jpg`
4. **Update the frontmatter** for them once confirmed

This gives the user control while automating the hard parts (analysis and prompt generation).

## Example Usage

```
User: /generate_cover understanding-rust-ownership

Assistant: I'll analyze the "Understanding Rust Ownership" post and create a cover image.

[Reads the post, generates a Midjourney prompt like:]
"Abstract visualization of memory ownership and borrowing, geometric blocks connected by flowing data streams, modern technical illustration, rust orange and steel blue tones, clean minimal style, --ar 16:9 --style raw --v 6"

[Makes API call or shows prompt to user]
[Downloads/saves image to /public/images/covers/understanding-rust-ownership-cover.jpg]
[Updates the post frontmatter with featuredImage field]
```

# Important Notes

- **Always verify the post exists** before attempting to generate a cover
- **Be creative but coherent** with prompts - they should relate to content but be artistic
- **Handle errors gracefully** and provide fallback options
- **Confirm with user** before overwriting an existing cover image
- **Test the image path** works in the blog after updating
