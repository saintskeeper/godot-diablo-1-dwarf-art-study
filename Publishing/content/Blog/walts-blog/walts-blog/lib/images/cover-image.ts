/**
 * Cover Image Utilities
 * Handles cover image URLs with support for local public folder and CDN
 */

interface ImageConfig {
  useCdn: boolean;
  cdnUrl?: string;
  cdnType?: 'cloudflare' | 's3' | 'custom';
}

/**
 * Get the image configuration from environment variables
 */
function getImageConfig(): ImageConfig {
  return {
    useCdn: process.env.NEXT_PUBLIC_USE_CDN === 'true',
    cdnUrl: process.env.NEXT_PUBLIC_CDN_URL,
    cdnType: (process.env.NEXT_PUBLIC_CDN_TYPE as ImageConfig['cdnType']) || 'custom',
  };
}

/**
 * Get the full URL for a cover image
 * Supports both local public folder and CDN
 *
 * @param imagePath - The image path (e.g., '/images/covers/my-post.jpg' or 'my-post.jpg')
 * @returns The full URL to the image
 */
export function getCoverImageUrl(imagePath: string | undefined): string | undefined {
  if (!imagePath) return undefined;

  const config = getImageConfig();

  // If CDN is enabled and configured
  if (config.useCdn && config.cdnUrl) {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

    // Ensure CDN URL doesn't end with slash
    const cdnBase = config.cdnUrl.endsWith('/')
      ? config.cdnUrl.slice(0, -1)
      : config.cdnUrl;

    return `${cdnBase}/${cleanPath}`;
  }

  // Default to public folder
  // If the path doesn't start with /, add it
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
}

/**
 * Get the local path for saving cover images
 */
export function getCoverImageDirectory(): string {
  return '/public/images/covers';
}

/**
 * Get the relative path for a cover image (for frontmatter)
 * @param filename - Just the filename (e.g., 'my-post.jpg')
 * @returns The path to store in frontmatter
 */
export function getCoverImagePath(filename: string): string {
  return `/images/covers/${filename}`;
}

/**
 * Validate image path and ensure it's in the correct format
 */
export function validateCoverImage(imagePath: string): boolean {
  if (!imagePath) return false;

  // Check for valid image extensions
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const hasValidExtension = validExtensions.some(ext =>
    imagePath.toLowerCase().endsWith(ext)
  );

  return hasValidExtension;
}

/**
 * Generate a filename for a cover image based on slug
 * @param slug - The post slug
 * @param extension - Image extension (default: 'jpg')
 * @returns Sanitized filename
 */
export function generateCoverFilename(slug: string, extension: string = 'jpg'): string {
  // Remove any path separators and special characters
  const sanitized = slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  return `${sanitized}-cover.${extension}`;
}
