import { FloatingNav } from '@/components/organisms/FloatingNav';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { NotFoundTracker } from '@/components/atoms/NotFoundTracker';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <NotFoundTracker />
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="glass rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <Text variant="h1" color="primary" className="mb-4">
            404
          </Text>
          <Text variant="h3" color="secondary" className="mb-6">
            Blog post not found
          </Text>
          <Text variant="body" color="muted" className="mb-8">
            The post you're looking for doesn't exist or has been moved.
          </Text>
          <Link href="/">
            <Button variant="orange-solid">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
