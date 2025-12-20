CREATE: components/atoms/KeyboardKey/index.tsx

CONTEXT: Visual keyboard shortcut display component
Displays keyboard keys (CMD, K, 1, etc.) with glass morphism styling for shortcut indicators.

DEPENDENCIES (must exist first):
- globals.css with glass utilities

REQUIREMENTS:
- Glass morphism key styling
- Small, compact design
- Support for special keys (CMD, CTRL, SHIFT, ALT, etc.)
- Platform-aware (CMD on Mac, CTRL on Windows/Linux)
- Size variants (sm, md)
- TypeScript props interface

COMPONENT CODE:
```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const keyboardKeyVariants = cva(
  'inline-flex items-center justify-center font-mono font-semibold glass-light rounded-lg shadow-sm',
  {
    variants: {
      size: {
        sm: 'min-w-[1.5rem] h-6 px-1.5 text-xs',
        md: 'min-w-[2rem] h-8 px-2 text-sm',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

const keyDisplayMap: Record<string, string> = {
  cmd: '⌘',
  command: '⌘',
  ctrl: '⌃',
  control: '⌃',
  shift: '⇧',
  alt: '⌥',
  option: '⌥',
  enter: '↵',
  return: '↵',
  backspace: '⌫',
  delete: '⌦',
  escape: 'Esc',
  esc: 'Esc',
  tab: '⇥',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
};

export interface KeyboardKeyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof keyboardKeyVariants> {
  keyName: string;
}

export const KeyboardKey = forwardRef<HTMLElement, KeyboardKeyProps>(
  ({ className, size, keyName, ...props }, ref) => {
    const displayKey = keyDisplayMap[keyName.toLowerCase()] || keyName.toUpperCase();

    return (
      <kbd
        ref={ref}
        className={keyboardKeyVariants({ size, className })}
        {...props}
      >
        {displayKey}
      </kbd>
    );
  }
);

KeyboardKey.displayName = 'KeyboardKey';
```

TECHNICAL SPECS:
```typescript
interface KeyboardKeyProps extends HTMLAttributes<HTMLElement> {
  keyName: string;
  size?: 'sm' | 'md';
  className?: string;
}
```

USAGE EXAMPLES:
```tsx
import { KeyboardKey } from '@/components/atoms/KeyboardKey';

// Single keys
<KeyboardKey keyName="cmd" />
<KeyboardKey keyName="k" size="md" />

// Key combinations
<div className="flex items-center gap-1">
  <KeyboardKey keyName="cmd" />
  <span className="text-text-muted">+</span>
  <KeyboardKey keyName="k" />
</div>

// Navigation shortcuts
<div className="flex items-center gap-1">
  <KeyboardKey keyName="cmd" />
  <span className="text-text-muted">+</span>
  <KeyboardKey keyName="1" />
</div>

// Special keys
<KeyboardKey keyName="enter" />
<KeyboardKey keyName="esc" />
<KeyboardKey keyName="up" />
```

HELPER COMPONENT (KeyboardShortcut):
```tsx
// components/molecules/KeyboardShortcut/index.tsx (preview for Phase 2)
export const KeyboardShortcut = ({ keys }: { keys: string[] }) => {
  return (
    <div className="inline-flex items-center gap-1">
      {keys.map((key, index) => (
        <>
          {index > 0 && <span className="text-text-muted text-xs">+</span>}
          <KeyboardKey key={key} keyName={key} size="sm" />
        </>
      ))}
    </div>
  );
};
```

VERIFICATION:
- Special key symbols display correctly (⌘, ⌃, etc.)
- Glass morphism styling matches design system
- Keys are readable and appropriately sized
- Works with both single keys and combinations
- Semantic <kbd> HTML element used
