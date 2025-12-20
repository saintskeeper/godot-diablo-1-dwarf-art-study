import { Input } from './index';

/**
 * Example usage of the Input component
 * This file demonstrates all variants and states
 */
export function InputExamples() {
  return (
    <div className="space-y-8 p-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Input</h3>
        <Input
          type="text"
          placeholder="Enter your name..."
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Search Input</h3>
        <Input
          type="search"
          placeholder="Search articles..."
          variant="search"
          size="lg"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Email Input</h3>
        <Input
          type="email"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Error State</h3>
        <Input
          type="email"
          placeholder="your@email.com"
          error={true}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
        <Input
          type="text"
          disabled
          value="Read-only value"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Small input"
            size="sm"
          />
          <Input
            type="text"
            placeholder="Medium input (default)"
            size="md"
          />
          <Input
            type="text"
            placeholder="Large input"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}
