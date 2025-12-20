CREATE: components/atoms/Text/index.tsx

CONTEXT: Typography system component
Semantic text elements with PC Gamer magazine-inspired bold hierarchy using Geist fonts.

DEPENDENCIES (must exist first):
- Geist and Geist Mono fonts configured in layout.tsx
- globals.css with text color CSS variables

REQUIREMENTS:
- Support heading levels (h1, h2, h3, h4, h5, h6)
- Support body text (p, span, div)
- Support code/mono text
- Use CVA for size and weight variants
- Semantic HTML elements based on variant
- Responsive sizing with PC Gamer-style bold headings
- Color variants (primary, secondary, muted, accent-rust)

COMPONENT CODE:
```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { createElement, HTMLAttributes, forwardRef } from 'react';

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight',
      h2: 'text-4xl md:text-5xl font-bold leading-tight',
      h3: 'text-3xl md:text-4xl font-bold leading-snug',
      h4: 'text-2xl md:text-3xl font-semibold leading-snug',
      h5: 'text-xl md:text-2xl font-semibold',
      h6: 'text-lg md:text-xl font-semibold',
      body: 'text-base leading-relaxed',
      small: 'text-sm leading-relaxed',
      caption: 'text-xs leading-normal',
      mono: 'font-mono text-sm',
    },
    color: {
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      muted: 'text-text-muted',
      rust: 'text-rust-base',
      burgundy: 'text-burgundy-base',
      denim: 'text-denim-base',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

const variantElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  small: 'p',
  caption: 'span',
  mono: 'code',
} as const;

export interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: keyof JSX.IntrinsicElements;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, variant = 'body', color, weight, as, children, ...props }, ref) => {
    const Component = as || variantElementMap[variant] || 'p';

    return createElement(
      Component,
      {
        ref,
        className: textVariants({ variant, color, weight, className }),
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';
```

TECHNICAL SPECS:
```typescript
interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption' | 'mono';
  color?: 'primary' | 'secondary' | 'muted' | 'rust' | 'burgundy' | 'denim';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}
```

USAGE EXAMPLES:
```tsx
import { Text } from '@/components/atoms/Text';

<Text variant="h1" color="rust">
  Walt's Blog
</Text>

<Text variant="body" color="secondary">
  This is a blog post excerpt with readable typography.
</Text>

<Text variant="mono" color="muted">
  const code = 'example';
</Text>
```

VERIFICATION:
- All heading levels render correctly
- Semantic HTML elements match variants
- Typography scales responsively
- Colors apply from existing palette
- Bold PC Gamer-style headings work
