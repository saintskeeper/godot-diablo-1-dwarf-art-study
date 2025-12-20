import BadgeExample from '@/components/atoms/Badge/Badge.example';

export default function BadgeTestPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-[var(--text-primary)] mb-3">
            Badge Component Test
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Magazine-style section markers with bold, full-color backgrounds
          </p>
        </header>

        <BadgeExample />

        <footer className="mt-16 pt-8 border-t-2 border-[var(--bg-divider)]">
          <div className="text-sm text-[var(--text-muted)] space-y-2">
            <p>
              <strong>Design Reference:</strong> /aesthetic.md (lines 286-307)
            </p>
            <p>
              <strong>Component Location:</strong> /components/atoms/Badge/
            </p>
            <p>
              <strong>Documentation:</strong> See README.md in the Badge component directory
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
