# Glossy Effects Quick Start Guide

## 🚀 Getting Started

The glossy effects are already integrated into your blog. Here's how to use them in new components.

## 📦 Basic Pattern

Every glossy component follows this pattern:

```tsx
import { GlossyFilters } from '@/components/atoms/GlossyFilters';

export function MyComponent() {
  return (
    <>
      {/* 1. Add filters (only once per component) */}
      <GlossyFilters id="my-component-glossy" intensity="subtle" />

      {/* 2. Apply CSS utility classes */}
      <div className="glossy-nav glass-heavy rounded-full glossy-optimized">
        Your content here
      </div>
    </>
  );
}
```

## 🎨 Available CSS Utilities

### `.glossy-nav`
**Use for:** Navigation bars
**Effect:** Layered lighting with spotlight support
```tsx
<nav className="glossy-nav glass-heavy rounded-full">
  <ul>{/* nav items */}</ul>
</nav>
```

### `.glossy-search`
**Use for:** Search inputs
**Effect:** Ambient glow on focus
```tsx
<div className="glossy-search">
  <input type="search" />
</div>
```

### `.glossy-command`
**Use for:** Modals, command palettes
**Effect:** Static ambient depth
```tsx
<dialog className="glossy-command glass-heavy rounded-3xl">
  {/* modal content */}
</dialog>
```

### `.glossy-optimized`
**Use for:** Any glossy element
**Effect:** GPU acceleration for smooth performance
```tsx
<div className="glossy-nav glass-heavy glossy-optimized">
  {/* Always add this for best performance */}
</div>
```

## ⚡ GSAP Animations (Optional)

For interactive spotlight effects:

```tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function InteractiveNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Get spotlight element
    const spotlight = document.querySelector(
      '#my-glossy-spotlight fePointLight'
    );

    if (!spotlight || !navRef.current) return;

    // Add hover listener
    const handleHover = (e: MouseEvent) => {
      const navBounds = navRef.current!.getBoundingClientRect();
      const target = e.target as HTMLElement;
      const targetBounds = target.getBoundingClientRect();

      gsap.to(spotlight, {
        duration: 0.25,
        ease: 'power2.out',
        attr: {
          x: targetBounds.left - navBounds.left + targetBounds.width / 2
        }
      });
    };

    navRef.current.addEventListener('mouseover', handleHover);
    return () => navRef.current?.removeEventListener('mouseover', handleHover);
  }, []);

  return (
    <>
      <GlossyFilters id="my-glossy" intensity="subtle" />
      <nav ref={navRef} className="glossy-nav glass-heavy glossy-optimized">
        {/* Interactive items */}
      </nav>
    </>
  );
}
```

## 🎯 Common Patterns

### Pattern 1: Static Button
```tsx
<GlossyFilters id="btn-glossy" intensity="subtle" />
<button className="glass-heavy rounded-full px-6 py-3 glossy-optimized">
  Click Me
</button>
```

### Pattern 2: Card with Ambient Glow
```tsx
<GlossyFilters id="card-glossy" intensity="subtle" />
<article className="glossy-command glass rounded-2xl p-6">
  <h2>Card Title</h2>
  <p>Card content with subtle ambient lighting</p>
</article>
```

### Pattern 3: Floating Panel
```tsx
<GlossyFilters id="panel-glossy" intensity="subtle" />
<aside className="glossy-nav glass-heavy rounded-3xl fixed top-4 right-4 glossy-optimized">
  <div className="p-4">
    Floating panel with glossy effects
  </div>
</aside>
```

## 🎛️ Intensity Selection

| Intensity | Use Case | Visual Impact |
|-----------|----------|---------------|
| `subtle` | Blogs, docs, professional sites | Minimal, refined |
| `moderate` | Web apps, portfolios | Balanced, noticeable |
| `bold` | Landing pages, hero sections | Strong, eye-catching |

**Recommendation:** Start with `subtle` for consistency with the current blog design.

## 📱 Responsive Considerations

```tsx
'use client';
import { useState, useEffect } from 'react';

export function ResponsiveGlossy() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <GlossyFilters
      id="responsive-glossy"
      intensity={isMobile ? 'subtle' : 'moderate'}
    />
  );
}
```

## ♿ Accessibility

Glossy effects are decorative and don't affect accessibility:
- ✅ Screen readers ignore filters
- ✅ Keyboard navigation works normally
- ✅ Focus states are enhanced (not replaced)
- ✅ High contrast mode compatible

Always include proper focus styles:
```tsx
<button className="glossy-focus-glow glass-heavy rounded-full">
  Accessible Button
</button>
```

## 🔧 Troubleshooting

### Filters not showing?
1. Check GlossyFilters is rendered **before** the element using it
2. Verify CSS is imported in `globals.css`
3. Ensure unique `id` for each GlossyFilters instance

### Performance issues?
1. Add `.glossy-optimized` class
2. Reduce intensity on mobile
3. Limit number of glossy elements per page

### Wrong colors?
Customize in `GlossyFilters/index.tsx`:
```tsx
lightColor: 'hsla(234, 14%, 72%, 0.15)' // Adjust hue, saturation, lightness
```

## 📝 Checklist for New Components

- [ ] Import `GlossyFilters` component
- [ ] Add `<GlossyFilters id="unique-id" intensity="subtle" />`
- [ ] Apply appropriate CSS utility (`.glossy-nav`, `.glossy-search`, etc.)
- [ ] Add `.glossy-optimized` for performance
- [ ] Test on mobile devices
- [ ] Verify keyboard navigation works
- [ ] Check focus states are visible

## 🎓 Learning Resources

- **SVG Filters**: [MDN feSpecularLighting](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpecularLighting)
- **GSAP**: [GSAP Docs](https://greensock.com/docs/)
- **Accessibility**: [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 💡 Pro Tips

1. **Consistent IDs**: Use component name as ID prefix (`nav-glossy`, `search-glossy`)
2. **Layer Intentionally**: Spotlight for interactive, ambience for static
3. **Test Performance**: Run Lighthouse audits after adding effects
4. **Keep it Subtle**: Professional sites benefit from restraint
5. **Document Custom Configs**: If you modify intensity, document why

## 📞 Questions?

See the full implementation details in `IMPLEMENTATION.md` or component README files.
