import { cva, type VariantProps } from 'class-variance-authority';
import { createElement, HTMLAttributes, forwardRef } from 'react';
import type { JSX } from 'react/jsx-runtime';

const textVariants = cva('', {
  variants: {
    variant: {
      display: 'text-[3.5rem] md:text-[4rem] font-black leading-[1.1] tracking-tight',
      headline: 'text-[2.5rem] md:text-[3rem] font-extrabold leading-[1.2] tracking-tight',
      subhead: 'text-[1.75rem] md:text-[2rem] font-bold leading-[1.3] tracking-tight',
      h1: 'text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight',
      h2: 'text-4xl md:text-5xl font-bold leading-tight',
      h3: 'text-3xl md:text-4xl font-bold leading-snug',
      h4: 'text-2xl md:text-3xl font-semibold leading-snug',
      h5: 'text-xl md:text-2xl font-semibold',
      h6: 'text-lg md:text-xl font-semibold',
      body: 'text-base leading-[1.7]',
      small: 'text-sm leading-relaxed',
      caption: 'text-xs leading-normal',
      mono: 'font-mono text-sm',
    },
    color: {
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      muted: 'text-text-muted',
      teal: 'text-teal-base',
      orange: 'text-orange-base',
      brown: 'text-brown-base',
      'teal-light': 'text-teal-light',
      'teal-dark': 'text-teal-dark',
      'orange-dark': 'text-orange-dark',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

const variantElementMap = {
  display: 'h1',
  headline: 'h2',
  subhead: 'h3',
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
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: keyof JSX.IntrinsicElements;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, variant = 'body', color, weight, as, children, ...props }, ref) => {
    const Component = as || (variant ? variantElementMap[variant] : 'p') || 'p';

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
