import { PostHog } from 'posthog-node';

let client: PostHog | null = null;

/**
 * Get the server-side PostHog client
 * Uses flushAt: 1 and flushInterval: 0 for immediate event sending
 * as server-side functions in Next.js can be short-lived
 */
export function getPostHogClient(): PostHog | null {
  const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!POSTHOG_KEY || !POSTHOG_HOST) {
    return null;
  }

  if (!client) {
    client = new PostHog(POSTHOG_KEY, {
      host: POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return client;
}

/**
 * Track a server-side event
 */
export async function trackServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>
) {
  const ph = getPostHogClient();
  if (!ph) return;

  ph.capture({
    distinctId,
    event,
    properties,
  });

  await ph.flush();
}

/**
 * Track a subscription event on the server
 */
export async function trackSubscription(
  email: string,
  source: string,
  success: boolean
) {
  await trackServerEvent(email, 'subscriber_added', {
    source,
    success,
    $set: { email },
  });
}

/**
 * Identify a user on the server side
 */
export async function identifyServerUser(
  distinctId: string,
  properties?: Record<string, unknown>
) {
  const ph = getPostHogClient();
  if (!ph) return;

  ph.identify({
    distinctId,
    properties,
  });

  await ph.flush();
}

/**
 * Shutdown the PostHog client
 */
export async function shutdownPostHog() {
  if (client) {
    await client.shutdown();
    client = null;
  }
}
