export const BlogListLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="glass-light rounded-2xl p-6 animate-pulse"
        >
          <div className="h-8 bg-text-muted/10 rounded mb-3" />
          <div className="h-20 bg-text-muted/10 rounded mb-4" />
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-text-muted/10 rounded-full" />
            <div className="h-6 w-16 bg-text-muted/10 rounded-full" />
          </div>
          <div className="h-6 bg-text-muted/10 rounded" />
        </div>
      ))}
    </div>
  );
};
