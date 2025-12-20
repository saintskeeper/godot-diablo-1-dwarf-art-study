import { FloatingNav } from '@/components/organisms/FloatingNav';

export default function Loading() {
  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <article className="max-w-4xl mx-auto animate-pulse">
          {/* Title */}
          <div className="h-16 bg-text-muted/10 rounded-xl mb-6" />

          {/* Metadata */}
          <div className="flex gap-4 mb-6">
            <div className="h-6 w-24 bg-text-muted/10 rounded-full" />
            <div className="h-6 w-32 bg-text-muted/10 rounded-full" />
            <div className="h-6 w-28 bg-text-muted/10 rounded-full" />
          </div>

          {/* Excerpt */}
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="h-6 bg-text-muted/10 rounded-lg mb-2" />
            <div className="h-6 bg-text-muted/10 rounded-lg w-3/4" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="h-4 bg-text-muted/10 rounded-lg" />
            <div className="h-4 bg-text-muted/10 rounded-lg" />
            <div className="h-4 bg-text-muted/10 rounded-lg w-5/6" />
            <div className="h-4 bg-text-muted/10 rounded-lg" />
            <div className="h-4 bg-text-muted/10 rounded-lg w-4/5" />
          </div>
        </article>
      </main>
    </>
  );
}
