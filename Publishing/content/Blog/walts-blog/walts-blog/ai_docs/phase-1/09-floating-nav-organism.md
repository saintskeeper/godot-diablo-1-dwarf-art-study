CREATE: components/organisms/FloatingNav/index.tsx

CONTEXT: Floating pill-shaped navigation bar
Always-visible glass morphism tab bar for quick section navigation with CMD+1-4 shortcuts.

DEPENDENCIES (must exist first):
- components/atoms/Icon
- components/atoms/KeyboardKey
- lucide-react installed
- Next.js Link component

REQUIREMENTS:
- Fixed position at top-center of viewport
- Pill-shaped with glass-heavy styling
- 4 tabs: Home, Highlights, Articles, Logs
- Icons for each section
- Active state highlighting with rust accent
- Hover effects with opacity/scale transitions
- Keyboard shortcut hints on hover (tooltip)
- Responsive padding and sizing
- Mobile-friendly (stack or scroll on small screens)

COMPONENT CODE:
```tsx
'use client';

import { Icon } from '@/components/atoms/Icon';
import { KeyboardKey } from '@/components/atoms/KeyboardKey';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, FileText, Code2 } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  name: string;
  href: string;
  icon: typeof Home;
  shortcut: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home, shortcut: '1' },
  { name: 'Highlights', href: '/highlights', icon: Sparkles, shortcut: '2' },
  { name: 'Articles', href: '/articles', icon: FileText, shortcut: '3' },
  { name: 'Logs', href: '/logs', icon: Code2, shortcut: '4' },
];

export const FloatingNav = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-heavy rounded-full px-2 py-2 shadow-lg border border-text-muted/10">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const hovered = hoveredItem === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    group relative flex items-center gap-2 px-4 py-2 rounded-full
                    transition-all duration-200 ease-out
                    ${active ? 'bg-rust-base text-bg-primary' : 'text-text-secondary hover:text-text-primary'}
                    ${!active && 'hover:bg-text-muted/10 hover:scale-105'}
                  `}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon
                    icon={item.icon}
                    size="sm"
                    color={active ? undefined : 'secondary'}
                    className={active ? 'text-bg-primary' : ''}
                  />
                  <span className="text-sm font-medium hidden sm:inline">
                    {item.name}
                  </span>

                  {/* Keyboard shortcut hint on hover */}
                  {hovered && !active && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-lg shadow-md animate-in fade-in slide-in-from-bottom-2 duration-150">
                      <div className="flex items-center gap-1.5">
                        <KeyboardKey keyName="cmd" size="sm" />
                        <span className="text-text-muted text-xs">+</span>
                        <KeyboardKey keyName={item.shortcut} size="sm" />
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 glass rotate-45" />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
```

TECHNICAL SPECS:
```typescript
interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  shortcut: string;
}

interface FloatingNavProps {
  className?: string;
}
```

MOBILE RESPONSIVE STYLES:
```tsx
// Add to component or globals.css
@media (max-width: 640px) {
  .floating-nav {
    width: calc(100vw - 2rem);
    max-width: 400px;
  }

  .floating-nav li span {
    display: none; /* Hide text labels on mobile, show icons only */
  }
}
```

KEYBOARD SHORTCUT HANDLER (to be added in layout):
```tsx
// app/layout.tsx
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
```

VERIFICATION:
- Nav bar fixed at top-center
- Glass morphism effect visible with backdrop blur
- Active state highlights with rust color
- Hover shows keyboard shortcut tooltip
- Icons display correctly
- Mobile responsive (icons only on small screens)
- Smooth transitions on hover/active
