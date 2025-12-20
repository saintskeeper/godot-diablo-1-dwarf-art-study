import React from 'react';

export function highlightSearchTerms(
  text: string,
  query: string
): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-orange-base/30 text-text-primary rounded px-1">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
