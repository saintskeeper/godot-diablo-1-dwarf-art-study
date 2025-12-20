import type React from 'react';

/**
 * Color utility functions for determining appropriate text colors
 * based on background luminance
 */

/**
 * Calculate the relative luminance of a color (0-1)
 * Based on WCAG 2.0 formula
 */
function getLuminance(hex: string): number {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  // Apply gamma correction
  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Determine if a color is light or dark
 * Returns 'light' or 'dark' based on luminance threshold
 * Using a more conservative threshold (0.45) to ensure better readability
 */
export function getTextColorForBackground(hex: string): 'light' | 'dark' {
  const luminance = getLuminance(hex);
  // Lowered threshold to 0.45 for more conservative detection of light colors
  // This ensures we use dark text on borderline-light colors for better readability
  return luminance > 0.45 ? 'dark' : 'light';
}

/**
 * Check if contrast ratio meets WCAG AA standard (4.5:1 for normal text)
 * Returns true if contrast is sufficient
 */
export function meetsWCAGAA(foreground: string, background: string): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= 4.5;
}

/**
 * Get appropriate text color class for a background with enhanced readability
 * Uses pure black on very light backgrounds for maximum contrast
 * Adds text shadow utility class for additional visual separation
 */
export function getTextColorClass(hex: string): string {
  const textColor = getTextColorForBackground(hex);

  if (textColor === 'dark') {
    // For light backgrounds, use pure black for maximum contrast
    // Pure black (#000000) provides the highest possible contrast ratio
    return 'text-[#000000]';
  } else {
    // For dark backgrounds, use very light/white text
    // Using pure white for maximum contrast on dark backgrounds
    return 'text-[#FFFFFF]';
  }
}

/**
 * Get text shadow style object for additional readability enhancement
 * Applies a subtle shadow to text on light backgrounds for better separation
 * Returns inline style object for use with React's style prop
 */
export function getTextShadowStyle(hex: string): React.CSSProperties {
  const textColor = getTextColorForBackground(hex);

  if (textColor === 'dark') {
    // Add a subtle white/light shadow behind black text on light backgrounds
    // Using multiple text shadows creates a "halo" effect that improves readability
    // This ensures text stands out clearly even on very light backgrounds
    return {
      textShadow: '0 1px 2px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 0.7), 0 0 8px rgba(255, 255, 255, 0.4)'
    };
  }
  // For dark backgrounds with light text, shadow may reduce readability
  return {};
}

/**
 * Determine if background needs a subtle ring/border for text readability
 * Returns true for very light backgrounds that might benefit from visual separation
 */
export function needsReadabilityEnhancement(hex: string): boolean {
  const luminance = getLuminance(hex);
  // For very light colors (luminance > 0.85), add a subtle enhancement
  // This helps distinguish the swatch boundaries and improves overall visibility
  return luminance > 0.85;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a number between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

