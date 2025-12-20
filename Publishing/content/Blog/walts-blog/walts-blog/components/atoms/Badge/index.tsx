import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-bold transition-all uppercase tracking-wide',
  {
    variants: {
      variant: {
        // WaltMakes brand category badges - bold, full-color fills
        'category-teal': 'bg-[var(--wm-viking-teal)] text-white rounded-sm shadow-sm',
        'category-orange': 'border border-[var(--wm-hearth-orange)] text-[var(--text-primary)] rounded-sm',
        'category-brown': 'bg-[var(--wm-fur-brown)] text-white rounded-sm shadow-sm',

        // Featured badge with gradient - WaltMakes style
        'featured': 'bg-gradient-to-br from-[var(--wm-viking-teal)] to-[var(--teal-dark)] text-white rounded-sm shadow-[0_4px_12px_rgba(59,141,154,0.4)]',

        // WaltMakes color variants
        teal: 'bg-[var(--wm-viking-teal)] text-white rounded-full',
        'teal-outline': 'border-2 border-[var(--wm-viking-teal)] text-[var(--wm-viking-teal)] rounded-full',
        orange: 'bg-[var(--wm-hearth-orange)] text-white rounded-full',
        'orange-outline': 'border-2 border-[var(--wm-hearth-orange)] text-[var(--wm-hearth-orange)] rounded-full',
        brown: 'bg-[var(--wm-fur-brown)] text-white rounded-full',
        'brown-outline': 'border-2 border-[var(--wm-fur-brown)] text-[var(--wm-fur-brown)] rounded-full',
        cream: 'bg-[var(--wm-horn-ivory)] text-[var(--text-primary)] rounded-full',
        neutral: 'bg-[var(--text-muted)]/20 text-[var(--text-primary)] rounded-full',
      },
      size: {
        sm: 'px-2 py-0.5 text-[0.625rem]', // 10px - tight for tags
        md: 'px-3 py-1 text-xs', // 12px - standard category badge
        lg: 'px-4 py-2 text-sm', // 14px - featured badge
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
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
