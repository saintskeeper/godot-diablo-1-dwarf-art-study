'use client';

import Link from 'next/link';
import { Rss } from 'lucide-react';
import { trackEvent } from '@/lib/analytics/posthog';

interface FeedLinkProps {
  href: string;
  label: string;
  className?: string;
  feedType: string;
}

function FeedLink({ href, label, className, feedType }: FeedLinkProps) {
  const handleClick = () => {
    trackEvent('rss_feed_clicked', {
      feed_url: href,
      feed_type: feedType,
      feed_label: label,
    });
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
    >
      {label}
    </Link>
  );
}

export function FeedLinks() {
  const handleMainFeedClick = () => {
    trackEvent('rss_feed_clicked', {
      feed_url: '/feed.xml',
      feed_type: 'rss',
      feed_label: 'Subscribe via RSS',
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 text-sm">
      <Link
        href="/feed.xml"
        className="group flex items-center gap-2 glass px-4 py-2 rounded-full hover:bg-text-muted/10 transition-all duration-200"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleMainFeedClick}
      >
        <Rss className="w-4 h-4 text-[var(--wm-hearth-orange)] group-hover:text-[var(--wm-viking-teal)] transition-colors" />
        <span className="text-text-secondary group-hover:text-text-primary transition-colors">Subscribe via RSS</span>
      </Link>
      <details className="relative group">
        <summary className="cursor-pointer text-text-muted hover:text-text-secondary transition-colors list-none flex items-center gap-1">
          <span>More feeds</span>
          <span className="text-xs">▼</span>
        </summary>
        <div className="absolute top-full mt-2 right-0 glass rounded-lg shadow-lg p-3 min-w-[200px] z-10">
          <div className="flex flex-col gap-2 text-left text-sm">
            <FeedLink
              href="/atom.xml"
              label="Atom Feed"
              feedType="atom"
              className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10"
            />
            <FeedLink
              href="/feed.json"
              label="JSON Feed"
              feedType="json"
              className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10"
            />
            <hr className="border-text-muted/20 my-1" />
            <FeedLink
              href="/feed/articles.xml"
              label="Articles Only"
              feedType="rss-articles"
              className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10"
            />
            <FeedLink
              href="/feed/highlights.xml"
              label="Highlights Only"
              feedType="rss-highlights"
              className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10"
            />
            <FeedLink
              href="/feed/logs.xml"
              label="Logs Only"
              feedType="rss-logs"
              className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10"
            />
            <hr className="border-text-muted/20 my-1" />
            <FeedLink
              href="/feed/walter.xml"
              label="Walter's Posts"
              feedType="rss-walter"
              className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10"
            />
            <FeedLink
              href="/feed/walternate.xml"
              label="Walternate's Posts"
              feedType="rss-walternate"
              className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded hover:bg-text-muted/10"
            />
          </div>
        </div>
      </details>
    </div>
  );
}
