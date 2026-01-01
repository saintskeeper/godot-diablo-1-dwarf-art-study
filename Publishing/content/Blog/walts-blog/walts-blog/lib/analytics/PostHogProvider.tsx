'use client';

/**
 * PostHog Provider
 *
 * PostHog is initialized via instrumentation-client.ts with defaults: '2025-05-24'
 * which enables automatic pageview tracking. This provider is kept minimal
 * as a placeholder for any future client-side PostHog context needs.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
