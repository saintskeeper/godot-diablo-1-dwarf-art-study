import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  // Use defaults for automatic pageview and pageleave capture
  defaults: '2025-05-24',
  // Enable capturing unhandled exceptions via Error Tracking
  capture_exceptions: true,
  // Disable autocapture for cleaner, more intentional data
  autocapture: false,
  // Turn on debug in development mode
  debug: process.env.NODE_ENV === 'development',
});
