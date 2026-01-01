'use client';

import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { FloatingNav } from '@/components/organisms/FloatingNav';
import { trackEvent, captureException } from '@/lib/analytics/posthog';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Track error page view and capture exception on mount
  useEffect(() => {
    trackEvent('error_page_viewed', {
      error_message: error.message,
      error_digest: error.digest,
      error_name: error.name,
    });
    captureException(error);
  }, [error]);

  const handleRetry = () => {
    trackEvent('error_retry_clicked', {
      error_message: error.message,
      error_digest: error.digest,
    });
    reset();
  };

  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="glass rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <Text variant="h2" color="primary" className="mb-4">
            Something went wrong
          </Text>
          <Text variant="body" color="secondary" className="mb-6">
            {error.message || 'Failed to load blog posts. Please try again.'}
          </Text>
          <Button variant="orange-solid" onClick={handleRetry}>
            Try again
          </Button>
        </div>
      </main>
    </>
  );
}
