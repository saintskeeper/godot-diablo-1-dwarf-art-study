import { InputHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'w-full px-4 py-3 rounded-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'glass-light focus-visible:ring-[var(--wm-viking-teal)]',
        search: 'glass focus-visible:ring-[var(--wm-viking-teal)] text-base',
        error: 'glass-light border-2 border-[var(--wm-ember-red)] focus-visible:ring-[var(--wm-ember-red)]',
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
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
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
        style={{
          color: 'var(--text-primary)',
        }}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
