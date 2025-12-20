// components/organisms/BlogPost/TableOfContents.tsx
'use client';

import { Text } from '@/components/atoms/Text';
import { useEffect, useState } from 'react';

interface ToCItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'));
    const items: ToCItem[] = elements
      .map((el, index) => ({
        id: el.id || `heading-${index}`,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1)),
      }))
      .filter((item) => item.text); // Only include headings with text
    setHeadings(items);

    // Track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="glass rounded-2xl p-6 sticky top-24 border border-teal-base/20">
      <Text variant="h6" color="primary" className="mb-4 uppercase tracking-wide text-sm font-bold border-b border-teal-base/30 pb-3">
        In This Article
      </Text>
      <ul className="space-y-2.5">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}>
            <a
              href={`#${heading.id}`}
              className={`text-sm block transition-all duration-200 py-1 border-l-2 pl-3 -ml-3 ${
                activeId === heading.id
                  ? 'text-teal-base font-semibold border-teal-base bg-teal-base/5'
                  : 'text-text-secondary hover:text-text-primary border-transparent hover:border-teal-base/30 hover:bg-teal-base/5'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
