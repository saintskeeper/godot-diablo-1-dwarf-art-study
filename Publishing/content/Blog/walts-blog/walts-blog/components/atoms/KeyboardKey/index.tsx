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
