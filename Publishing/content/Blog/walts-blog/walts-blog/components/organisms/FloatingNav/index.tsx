'use client';

import { Icon } from '@/components/atoms/Icon';
import { KeyboardKey } from '@/components/atoms/KeyboardKey';
import { GlossyFilters } from '@/components/atoms/GlossyFilters';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, FileText, Code2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { trackEvent } from '@/lib/analytics/posthog';

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
  const navRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<SVGFEPointLightElement | null>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    // Get the spotlight point light element
    const spotlightElement = document.querySelector<SVGFEPointLightElement>(
      '#glossy-spotlight fePointLight'
    );
    spotlightRef.current = spotlightElement;
  }, []);

  useEffect(() => {
    // Animate spotlight to active item on pathname change
    if (!navRef.current || !spotlightRef.current) return;

    const activeLink = navRef.current.querySelector('[aria-current="page"]');
    if (!activeLink) return;

    const navBounds = navRef.current.getBoundingClientRect();
    const linkBounds = activeLink.getBoundingClientRect();

    // Smooth, elastic animation for tab switching
    gsap.to(spotlightRef.current, {
      duration: 0.5,
      ease: 'power3.out',
      attr: {
        x: linkBounds.left - navBounds.left + linkBounds.width * 0.5,
      },
    });

    // Animate the active tab with a subtle bounce
    gsap.fromTo(
      activeLink,
      { scale: 0.95, opacity: 0.8 },
      {
        scale: 1.05,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.2)',
      }
    );
  }, [pathname]);

  const handleNavClick = (item: NavItem) => {
    trackEvent('navigation_item_clicked', {
      nav_item: item.name,
      destination: item.href,
      from_page: pathname,
    });
  };

  const handleLinkHover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navRef.current || !spotlightRef.current) return;

    const navBounds = navRef.current.getBoundingClientRect();
    const linkBounds = event.currentTarget.getBoundingClientRect();

    // Quick, smooth hover animation
    gsap.to(spotlightRef.current, {
      duration: 0.3,
      ease: 'power3.out',
      attr: {
        x: linkBounds.left - navBounds.left + linkBounds.width * 0.5,
      },
    });

    // Subtle scale on hover preview
    gsap.to(event.currentTarget, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <>
      <GlossyFilters id="glossy" intensity="subtle" />
      <nav ref={navRef} className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="glossy-nav fog-effect rounded-full px-2 py-2 floating-nav-shadow glossy-optimized max-sm:px-1.5 max-sm:py-1.5">
          {/* Lit layer for spotlight effect - hidden on mobile */}
          <ul className="glossy-lit hidden sm:flex" aria-hidden="true">
            {navItems.map((item) => (
              <li key={`lit-${item.href}`} className="flex items-center">
                <span className="px-4 py-2">
                  <span className="opacity-0">{item.name}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Actual navigation content */}
          <ul className="flex items-center gap-1 max-sm:gap-0.5 relative z-20">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const hovered = hoveredItem === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      group relative flex items-center gap-2 px-4 py-2 max-sm:px-2.5 max-sm:py-2 rounded-full
                      transition-all duration-300 ease-out
                      ${active ? 'active-tab-gradient text-bg-primary' : 'text-text-secondary hover:text-text-primary'}
                      ${!active && 'hover:bg-text-muted/10 hover:scale-[1.02]'}
                      ${active && 'shadow-lg'}
                    `}
                    onClick={() => handleNavClick(item)}
                    onMouseEnter={(e) => {
                      setHoveredItem(item.href);
                      if (!active) handleLinkHover(e);
                    }}
                    onMouseLeave={(e) => {
                      setHoveredItem(null);
                      if (!active) {
                        gsap.to(e.currentTarget, {
                          scale: 1,
                          duration: 0.2,
                          ease: 'power2.out',
                        });
                      }
                    }}
                    aria-current={active ? 'page' : undefined}
                    data-active={active}
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

                    {/* Keyboard shortcut hint on hover - hidden on mobile */}
                    {hovered && !active && (
                      <div className="hidden sm:block absolute top-full mt-3 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-lg shadow-md animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                        <div className="flex items-center gap-1.5">
                          <KeyboardKey keyName="cmd" size="sm" />
                          <span className="text-text-muted text-xs">+</span>
                          <KeyboardKey keyName={item.shortcut} size="sm" />
                        </div>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 glass rotate-45" />
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
