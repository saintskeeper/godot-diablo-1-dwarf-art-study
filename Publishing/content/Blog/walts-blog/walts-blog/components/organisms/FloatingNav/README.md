# FloatingNav Organism

A floating pill-shaped navigation bar with glass morphism styling, keyboard shortcuts, and mobile responsiveness.

## Features

- Fixed position at top-center of viewport
- Glass morphism effect with backdrop blur
- Active state highlighting with rust accent color
- Hover effects with tooltips showing keyboard shortcuts
- Icons from lucide-react
- Mobile responsive (icons only on small screens)
- Smooth transitions

## Usage

```tsx
import { FloatingNav } from '@/components/organisms/FloatingNav';

export default function Layout({ children }) {
  return (
    <div>
      <FloatingNav />
      {children}
    </div>
  );
}
```

## Keyboard Shortcut Integration

To enable keyboard shortcuts (CMD+1, CMD+2, CMD+3, CMD+4), add the following to your root layout or a client component:

### Option 1: Add to Root Layout (Recommended)

Create a client component for keyboard handling:

```tsx
// components/KeyboardNavigationHandler.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const KeyboardNavigationHandler = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if CMD (Mac) or CTRL (Windows/Linux) is pressed
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            router.push('/');
            break;
          case '2':
            e.preventDefault();
            router.push('/highlights');
            break;
          case '3':
            e.preventDefault();
            router.push('/articles');
            break;
          case '4':
            e.preventDefault();
            router.push('/logs');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return null; // This component doesn't render anything
};
```

Then add it to your root layout:

```tsx
// app/layout.tsx
import { FloatingNav } from '@/components/organisms/FloatingNav';
import { KeyboardNavigationHandler } from '@/components/KeyboardNavigationHandler';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FloatingNav />
        <KeyboardNavigationHandler />
        {children}
      </body>
    </html>
  );
}
```

### Option 2: Inline in Layout

```tsx
// app/layout.tsx
'use client';

import { FloatingNav } from '@/components/organisms/FloatingNav';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            router.push('/');
            break;
          case '2':
            e.preventDefault();
            router.push('/highlights');
            break;
          case '3':
            e.preventDefault();
            router.push('/articles');
            break;
          case '4':
            e.preventDefault();
            router.push('/logs');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <html lang="en">
      <body>
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
```

## Navigation Items

The component includes 4 navigation items by default:

1. **Home** (/) - CMD+1
2. **Highlights** (/highlights) - CMD+2
3. **Articles** (/articles) - CMD+3
4. **Logs** (/logs) - CMD+4

To customize navigation items, edit the `navItems` array in the component:

```tsx
const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home, shortcut: '1' },
  { name: 'Highlights', href: '/highlights', icon: Sparkles, shortcut: '2' },
  { name: 'Articles', href: '/articles', icon: FileText, shortcut: '3' },
  { name: 'Logs', href: '/logs', icon: Code2, shortcut: '4' },
];
```

## Dependencies

- `@/components/atoms/Icon` - Icon atom component
- `@/components/atoms/KeyboardKey` - KeyboardKey atom component
- `lucide-react` - Icon library
- `next/link` - Next.js Link component
- `next/navigation` - Next.js navigation hooks

## Styling

The component uses:
- `.glass-heavy` - Glass morphism effect (defined in globals.css)
- Tailwind utility classes for layout and transitions
- Custom animation classes (`animate-in`, `fade-in`, `slide-in-from-bottom-2`)

## Mobile Responsive

On screens smaller than 640px (sm breakpoint):
- Text labels are hidden
- Only icons are displayed
- Reduced padding for compact layout
- Max width constrained to prevent overflow

## Accessibility

- Uses semantic `<nav>` element
- `aria-current="page"` for active links
- Keyboard navigation support
- Focus states for interactive elements
