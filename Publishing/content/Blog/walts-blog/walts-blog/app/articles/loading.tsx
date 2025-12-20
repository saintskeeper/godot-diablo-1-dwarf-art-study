import { BlogListLoading } from '@/components/organisms/BlogList/Loading';
import { FloatingNav } from '@/components/organisms/FloatingNav';

export default function Loading() {
  return (
    <>
      <FloatingNav />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto mb-12 animate-pulse">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-20 w-20 bg-text-muted/10 rounded-2xl" />
            <div className="h-12 bg-text-muted/10 rounded-xl w-64" />
          </div>
          <div className="h-6 bg-text-muted/10 rounded-lg mb-2" />
          <div className="h-6 bg-text-muted/10 rounded-lg w-3/4" />
        </div>
        <div className="max-w-3xl mx-auto">
          <BlogListLoading />
        </div>
      </main>
    </>
  );
}
