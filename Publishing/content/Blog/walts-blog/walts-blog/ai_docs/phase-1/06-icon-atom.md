CREATE: components/atoms/Icon/index.tsx

CONTEXT: Icon wrapper component for consistent sizing
Wraps Lucide React icons with standardized sizing and color variants.

DEPENDENCIES (must exist first):
- lucide-react installed
- globals.css with text color variables

REQUIREMENTS:
- Wrapper around Lucide icons
- Consistent size variants (xs, sm, md, lg, xl)
- Color variants matching design system
- Support for custom className
- Accessible aria-label support
- TypeScript props with LucideIcon type

COMPONENT CODE:
```tsx
import { type LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, SVGAttributes } from 'react';

const iconVariants = cva('', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    },
    color: {
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      muted: 'text-text-muted',
      rust: 'text-rust-base',
      burgundy: 'text-burgundy-base',
      denim: 'text-denim-base',
      cream: 'text-cream-base',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

export interface IconProps
  extends Omit<SVGAttributes<SVGElement>, 'color'>,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  'aria-label'?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideIcon, size, color, className, ...props }, ref) => {
    return (
      <LucideIcon
        ref={ref}
        className={iconVariants({ size, color, className })}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
```

TECHNICAL SPECS:
```typescript
interface IconProps extends Omit<SVGAttributes<SVGElement>, 'color'> {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'muted' | 'rust' | 'burgundy' | 'denim' | 'cream';
  'aria-label'?: string;
  className?: string;
}
```

USAGE EXAMPLES:
```tsx
import { Icon } from '@/components/atoms/Icon';
import { Search, Home, FileText, Code2 } from 'lucide-react';

<Icon icon={Search} size="lg" color="rust" aria-label="Search" />

<Icon icon={Home} size="md" color="primary" />

<Icon icon={FileText} size="sm" color="muted" />

<Icon icon={Code2} size="xl" color="denim" />
```

VERIFICATION:
- Icons render at consistent sizes
- Colors apply from design system
- aria-label provides accessibility
- Works with all Lucide icons
- Responsive and sharp at all sizes
