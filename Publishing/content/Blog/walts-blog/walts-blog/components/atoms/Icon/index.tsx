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
      teal: 'text-teal-base',
      orange: 'text-orange-base',
      brown: 'text-brown-base',
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
