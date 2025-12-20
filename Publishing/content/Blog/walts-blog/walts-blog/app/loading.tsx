import { FloatingNav } from '@/components/organisms/FloatingNav';
import { Text } from '@/components/atoms/Text';

export default function Loading() {
  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section Skeleton */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <div className="h-16 bg-text-muted/10 rounded-xl mb-6 max-w-lg mx-auto animate-pulse" />
          <div className="space-y-3">
            <div className="h-6 bg-text-muted/10 rounded-lg max-w-2xl mx-auto animate-pulse" />
            <div className="h-6 bg-text-muted/10 rounded-lg max-w-xl mx-auto animate-pulse" />
          </div>
        </section>

        {/* Stats Section Skeleton */}
        <section className="glass rounded-2xl p-8 mb-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-10 bg-text-muted/10 rounded-lg mx-auto max-w-[4rem] animate-pulse" />
                <div className="h-4 bg-text-muted/10 rounded mx-auto max-w-[6rem] animate-pulse" />
              </div>
            ))}
          </div>
        </section>

        {/* Posts Section Skeleton */}
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 bg-text-muted/10 rounded-lg w-48 animate-pulse" />
            <div className="flex-1 h-px bg-text-muted/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 space-y-4 animate-pulse">
                <div className="h-6 bg-text-muted/10 rounded-lg w-20" />
                <div className="h-8 bg-text-muted/10 rounded-lg" />
                <div className="h-4 bg-text-muted/10 rounded w-3/4" />
                <div className="h-4 bg-text-muted/10 rounded w-1/2" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-text-muted/10 rounded-full w-16" />
                  <div className="h-6 bg-text-muted/10 rounded-full w-16" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
