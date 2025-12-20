CREATE: components/atoms/Input/index.tsx

CONTEXT: Glass morphism input field component
Form input with floating search style matching existing glass design system.

DEPENDENCIES (must exist first):
- globals.css with glass utilities (.glass, .glass-light)
- Tailwind CSS v4 configured

REQUIREMENTS:
- Glass morphism styling (backdrop blur, warm background)
- Focus states with rust accent ring
- Placeholder styling
- Error state with burgundy accent
- Disabled state
- Support for search, text, email input types
- Full accessibility (labels, aria attributes)
- TypeScript props interface

COMPONENT CODE:
```tsx
import { InputHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'w-full px-4 py-3 rounded-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-text-muted',
  {
    variants: {
      variant: {
        default: 'glass-light focus-visible:ring-rust-base',
        search: 'glass focus-visible:ring-rust-base text-base',
        error: 'glass-light border-2 border-burgundy-base focus-visible:ring-burgundy-base',
      },
      size: {
        sm: 'h-9 text-sm px-3',
        md: 'h-11 text-base px-4',
        lg: 'h-14 text-lg px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={inputVariants({
          variant: error ? 'error' : variant,
          size,
          className
        })}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
```

TECHNICAL SPECS:
```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search' | 'error';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  className?: string;
}
```

USAGE EXAMPLES:
```tsx
import { Input } from '@/components/atoms/Input';

<Input
  type="search"
  placeholder="Search articles..."
  variant="search"
  size="lg"
/>

<Input
  type="email"
  placeholder="your@email.com"
  error={!!errors.email}
/>

<Input
  type="text"
  disabled
  value="Read-only value"
/>
```

VERIFICATION:
- Glass morphism effect visible
- Focus ring appears with rust color
- Error state shows burgundy border
- Placeholder text readable but muted
- Disabled state prevents interaction
- Keyboard navigation works
