CREATE: components/atoms/Button/index.tsx

CONTEXT: Primary button component with glass morphism variants
Foundational interactive element using existing design system (glass effects, warm flannel colors).

DEPENDENCIES (must exist first):
- class-variance-authority installed
- globals.css with .btn-rust-solid, .btn-outline-bold classes
- Tailwind CSS v4 configured

REQUIREMENTS:
- Use CVA for variant management
- Support rust-solid, outline-bold, and ghost variants
- Support sm, md, lg sizes
- Integrate with existing glass button styles
- Disabled state styling
- Loading state with spinner
- Full accessibility (aria-labels, keyboard navigation)
- TypeScript props interface

COMPONENT CODE:
```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-base focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        'rust-solid': 'btn-rust-solid',
        'outline-bold': 'btn-outline-bold',
        ghost: 'glass hover:glass-heavy text-text-primary',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'rust-solid',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

TECHNICAL SPECS:
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'rust-solid' | 'outline-bold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

USAGE EXAMPLE:
```tsx
import { Button } from '@/components/atoms/Button';

<Button variant="rust-solid" size="md">
  Click me
</Button>

<Button variant="ghost" isLoading>
  Loading...
</Button>
```

VERIFICATION:
- Button renders with all variants
- Glass morphism effects work on hover
- Loading spinner displays correctly
- Disabled state prevents interaction
- Keyboard focus visible and accessible
