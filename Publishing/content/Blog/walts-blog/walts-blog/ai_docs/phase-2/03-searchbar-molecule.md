CREATE: components/molecules/SearchBar/index.tsx

CONTEXT: Floating search input molecule
Combines Input atom with Icon for command palette search interface.

DEPENDENCIES (must exist first):
- components/atoms/Input
- components/atoms/Icon
- lucide-react (Search icon)

REQUIREMENTS:
- Glass morphism search input
- Search icon on left
- CMD+K keyboard hint on right
- Placeholder text
- Auto-focus when mounted
- onChange handler for search query
- Clear button when text entered
- TypeScript props interface

COMPONENT CODE:
```tsx
// components/molecules/SearchBar/index.tsx
'use client';

import { Input } from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon';
import { KeyboardKey } from '@/components/atoms/KeyboardKey';
import { Search, X } from 'lucide-react';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'variant' | 'size'> {
  onClear?: () => void;
  showShortcut?: boolean;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onClear, showShortcut = false, value, ...props }, ref) => {
    const hasValue = value && String(value).length > 0;

    return (
      <div className="relative w-full">
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon icon={Search} size="md" color="muted" />
        </div>

        {/* Search input */}
        <Input
          ref={ref}
          type="search"
          variant="search"
          size="lg"
          value={value}
          className="pl-12 pr-24"
          {...props}
        />

        {/* Right side: Clear button or keyboard shortcut */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {hasValue && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Clear search"
            >
              <Icon icon={X} size="sm" />
            </button>
          ) : showShortcut ? (
            <div className="hidden sm:flex items-center gap-1 pointer-events-none">
              <KeyboardKey keyName="cmd" size="sm" />
              <KeyboardKey keyName="k" size="sm" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
```

TECHNICAL SPECS:
```typescript
interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'variant' | 'size'> {
  onClear?: () => void;
  showShortcut?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
}
```

USAGE EXAMPLES:
```tsx
import { SearchBar } from '@/components/molecules/SearchBar';
import { useState } from 'react';

// In command palette
function CommandPalette() {
  const [query, setQuery] = useState('');

  return (
    <SearchBar
      placeholder="Search articles, logs, highlights..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onClear={() => setQuery('')}
      autoFocus
    />
  );
}

// In navigation with shortcut hint
function Nav() {
  return (
    <SearchBar
      placeholder="Quick search..."
      showShortcut
      onClick={() => openCommandPalette()}
      readOnly
    />
  );
}
```

STYLING NOTES:
```css
/* Input has glass effect from atom */
/* Icon positioning absolute within relative container */
/* Clear button only shows when value exists */
/* Keyboard shortcut hidden on mobile (sm:flex) */
```

VERIFICATION:
- Search icon displays on left
- Clear button appears when text entered
- Keyboard shortcut shows when enabled
- Glass morphism styling from Input atom
- Auto-focus works
- onChange handler fires correctly
- Accessible with proper labels
