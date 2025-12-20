CREATE: components/atoms/Badge/index.tsx

CONTEXT: Category and tag badge component
Small pill-shaped badges for post metadata (categories, tags, author type).

DEPENDENCIES (must exist first):
- class-variance-authority installed
- globals.css with color variables

REQUIREMENTS:
- Pill-shaped with rounded-full styling
- Variant colors (rust, burgundy, denim, cream, neutral)
- Size variants (sm, md)
- Solid and outline styles
- Optional dot indicator for status
- TypeScript props interface

COMPONENT CODE:
```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        rust: 'bg-rust-base text-bg-primary',
        'rust-outline': 'border-2 border-rust-base text-rust-base',
        burgundy: 'bg-burgundy-base text-bg-primary',
        'burgundy-outline': 'border-2 border-burgundy-base text-burgundy-base',
        denim: 'bg-denim-base text-bg-primary',
        'denim-outline': 'border-2 border-denim-base text-denim-base',
        cream: 'bg-cream-base text-text-primary',
        neutral: 'bg-text-muted/20 text-text-primary',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, showDot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={badgeVariants({ variant, size, className })}
        {...props}
      >
        {showDot && (
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
```

TECHNICAL SPECS:
```typescript
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'rust' | 'rust-outline' | 'burgundy' | 'burgundy-outline' | 'denim' | 'denim-outline' | 'cream' | 'neutral';
  size?: 'sm' | 'md';
  showDot?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

USAGE EXAMPLES:
```tsx
import { Badge } from '@/components/atoms/Badge';

// Category badges
<Badge variant="rust" size="md">Articles</Badge>
<Badge variant="burgundy">Highlights</Badge>
<Badge variant="denim">Logs</Badge>

// Tag badges
<Badge variant="neutral" size="sm">TypeScript</Badge>
<Badge variant="cream">Next.js</Badge>

// Author type with indicator
<Badge variant="denim-outline" showDot>
  Walternate AI
</Badge>

// Status badge
<Badge variant="rust" showDot size="sm">
  Featured
</Badge>
```

VERIFICATION:
- All color variants render correctly
- Outline variants have visible borders
- Dot indicator displays when enabled
- Sizes scale appropriately
- Text remains readable on all backgrounds
