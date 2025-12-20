'use client';

import { Button } from '@/components/atoms/Button';

export default function ButtonTestPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-text-primary">Button Component Test</h1>

      {/* Orange Solid Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-text-secondary">Orange Solid Variant</h2>
        <div className="flex gap-4 flex-wrap items-center">
          <Button variant="orange-solid" size="sm">Small Button</Button>
          <Button variant="orange-solid" size="md">Medium Button</Button>
          <Button variant="orange-solid" size="lg">Large Button</Button>
          <Button variant="orange-solid" size="md" isLoading>Loading...</Button>
          <Button variant="orange-solid" size="md" disabled>Disabled</Button>
        </div>
      </section>

      {/* Outline Bold Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-text-secondary">Outline Bold Variant</h2>
        <div className="flex gap-4 flex-wrap items-center">
          <Button variant="outline-bold" size="sm">Small Button</Button>
          <Button variant="outline-bold" size="md">Medium Button</Button>
          <Button variant="outline-bold" size="lg">Large Button</Button>
          <Button variant="outline-bold" size="md" isLoading>Loading...</Button>
          <Button variant="outline-bold" size="md" disabled>Disabled</Button>
        </div>
      </section>

      {/* Ghost Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-text-secondary">Ghost Variant (Glass Morphism)</h2>
        <div className="flex gap-4 flex-wrap items-center">
          <Button variant="ghost" size="sm">Small Button</Button>
          <Button variant="ghost" size="md">Medium Button</Button>
          <Button variant="ghost" size="lg">Large Button</Button>
          <Button variant="ghost" size="md" isLoading>Loading...</Button>
          <Button variant="ghost" size="md" disabled>Disabled</Button>
        </div>
      </section>

      {/* Interactive Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-text-secondary">Interactive Examples</h2>
        <div className="flex gap-4 flex-wrap">
          <Button
            variant="orange-solid"
            onClick={() => alert('Orange solid clicked!')}
          >
            Click Me
          </Button>
          <Button
            variant="outline-bold"
            onClick={() => alert('Outline bold clicked!')}
          >
            Click Me
          </Button>
          <Button
            variant="ghost"
            onClick={() => alert('Ghost clicked!')}
          >
            Click Me
          </Button>
        </div>
      </section>

      {/* Glass Background Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-text-secondary">On Colored Background</h2>
        <div className="p-8 glass-rust rounded-3xl">
          <div className="flex gap-4 flex-wrap items-center">
            <Button variant="orange-solid">Orange Solid</Button>
            <Button variant="outline-bold">Outline Bold</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
