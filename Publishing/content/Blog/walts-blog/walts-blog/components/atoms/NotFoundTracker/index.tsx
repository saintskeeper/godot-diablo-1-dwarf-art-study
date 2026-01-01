'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics/posthog';

interface NotFoundTrackerProps {
  /** Optional URL path that was not found */
  attemptedPath?: string;
}

export function NotFoundTracker({ attemptedPath }: NotFoundTrackerProps) {
  useEffect(() => {
    trackEvent('not_found_page_viewed', {
      attempted_path: attemptedPath || (typeof window !== 'undefined' ? window.location.pathname : undefined),
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    });
  }, [attemptedPath]);

  return null;
}
