'use client';

import { trackLinkClick } from '@/lib/analytics/posthog';

type Destination = 'youtube' | 'x' | 'itch' | 'blog' | 'newsletter';

interface TrackedLinkProps {
  href: string;
  destination: Destination;
  source: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function TrackedLink({
  href,
  destination,
  source,
  children,
  className,
  external = true,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackLinkClick(destination, source);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...(external && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      {children}
    </a>
  );
}
