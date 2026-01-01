'use client';

import posthog from 'posthog-js';

// Note: PostHog is initialized in instrumentation-client.ts for Next.js 15.3+
// This file provides helper functions for event tracking

/**
 * Track a custom event
 */
export function trackEvent(
  event: string,
  properties?: Record<string, unknown>
) {
  posthog.capture(event, properties);
}

/**
 * Track link clicks to external platforms
 */
export function trackLinkClick(
  destination: 'youtube' | 'x' | 'itch' | 'blog' | 'newsletter' | 'rss',
  source: string
) {
  trackEvent('hub_link_click', { destination, source });
}

/**
 * Track newsletter subscription
 */
export function trackSubscribe(source: string) {
  trackEvent('subscriber_added', { source });
}

/**
 * Identify a user with their email and optional properties
 */
export function identifyUser(email: string, properties?: Record<string, unknown>) {
  posthog.identify(email, properties);
}

/**
 * Reset user identification (call on logout)
 */
export function resetUser() {
  posthog.reset();
}

/**
 * Capture an exception for error tracking
 */
export function captureException(error: Error | unknown) {
  posthog.captureException(error);
}

export { posthog };
