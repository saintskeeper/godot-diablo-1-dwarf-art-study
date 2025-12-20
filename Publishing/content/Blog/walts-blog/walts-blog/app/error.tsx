'use client';

import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { FloatingNav } from '@/components/organisms/FloatingNav';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          <Button variant="orange-solid" onClick={reset}>
            Try again
          </Button>
        </div>
      </main>
    </>
  );
}
