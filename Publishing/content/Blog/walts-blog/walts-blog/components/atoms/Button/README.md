# Button Component

Primary button component with glass morphism variants for the 90's flannel-inspired design system.

## Features

- Three style variants: `rust-solid`, `outline-bold`, and `ghost`
- Three size options: `sm`, `md`, `lg`
- Built-in loading state with spinner
- Disabled state styling
- Full keyboard accessibility
- Glass morphism effects on hover
- TypeScript support with exported types

## Installation

Dependencies are already installed:
- `class-variance-authority` - For variant management
- `lucide-react` - For the loading spinner icon

## Usage

```tsx
import { Button } from '@/components/atoms/Button';

// Basic usage
<Button>Click me</Button>

// Different variants
<Button variant="rust-solid">Solid Button</Button>
<Button variant="outline-bold">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button isLoading>Loading...</Button>

// Disabled state
<Button disabled>Disabled</Button>

// With onClick handler
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>
```

## Props

The Button component extends all standard HTML button attributes and adds:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'rust-solid' \| 'outline-bold' \| 'ghost'` | `'rust-solid'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `isLoading` | `boolean` | `false` | Shows loading spinner and disables button |
| `disabled` | `boolean` | `false` | Disables the button |
| `className` | `string` | `undefined` | Additional CSS classes |

## Variants

### Rust Solid (`rust-solid`)
Bold, manly button with solid rust background color. Best for primary actions.

### Outline Bold (`outline-bold`)
Button with rust border that fills with solid rust on hover. Best for secondary actions.

### Ghost (`ghost`)
Glass morphism button with subtle transparency and backdrop blur. Best for tertiary actions.

## Design Integration

The Button component integrates with the existing design system:

- Uses CSS classes from `app/globals.css`: `.btn-rust-solid`, `.btn-outline-bold`, `.glass`, `.glass-heavy`
- Follows the 90's flannel color palette (rust, burgundy, denim)
- Includes glass morphism effects with backdrop blur
- Focus ring uses `accent-rust` color from the design system

## Accessibility

- Proper semantic HTML (`<button>` element)
- Keyboard navigation support
- Visible focus indicator (ring-2 ring-accent-rust)
- Disabled state prevents interaction
- Loading state disables button and shows visual feedback

## Test Page

Visit `/button-test` to see all button variants and states in action.

## File Location

`components/atoms/Button/index.tsx`

## Related Components

This is a foundational atom component that will be used by:
- Molecules (ButtonGroup, etc.)
- Organisms (Navigation, Forms, etc.)
- Templates and Pages
