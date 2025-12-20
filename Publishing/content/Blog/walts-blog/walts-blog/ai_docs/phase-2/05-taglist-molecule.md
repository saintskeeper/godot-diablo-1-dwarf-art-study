CREATE: components/molecules/TagList/index.tsx

CONTEXT: Tag collection display molecule
Renders a horizontal list of tag badges with optional click handling for filtering.

DEPENDENCIES (must exist first):
- components/atoms/Badge

REQUIREMENTS:
- Display array of tags as badges
- Optional click handler for filtering
- Horizontal scrollable layout
- Neutral badge styling
- Truncate with "+" indicator if too many tags
- TypeScript props interface

COMPONENT CODE:
```tsx
// components/molecules/TagList/index.tsx
'use client';

import { Badge } from '@/components/atoms/Badge';
import { useState } from 'react';

export interface TagListProps {
  tags: string[];
  maxVisible?: number;
  onTagClick?: (tag: string) => void;
  className?: string;
}

export const TagList = ({
  tags,
  maxVisible,
  onTagClick,
  className,
}: TagListProps) => {
  const [showAll, setShowAll] = useState(false);

  const displayTags = maxVisible && !showAll ? tags.slice(0, maxVisible) : tags;
  const remainingCount = tags.length - (maxVisible || 0);
  const hasMore = maxVisible && remainingCount > 0 && !showAll;

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {displayTags.map((tag) => (
        <Badge
          key={tag}
          variant="neutral"
          size="sm"
          className={onTagClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
          onClick={() => onTagClick?.(tag)}
        >
          {tag}
        </Badge>
      ))}

      {hasMore && (
        <Badge
          variant="neutral"
          size="sm"
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowAll(true)}
        >
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
};
```

TECHNICAL SPECS:
```typescript
interface TagListProps {
  tags: string[];
  maxVisible?: number; // Limit displayed tags, show "+N more" button
  onTagClick?: (tag: string) => void; // Optional click handler for filtering
  className?: string;
}
```

USAGE EXAMPLES:
```tsx
import { TagList } from '@/components/molecules/TagList';

// In blog card (limited tags)
<TagList
  tags={['nextjs', 'react', 'typescript', 'tailwind', 'mdx']}
  maxVisible={3}
  onTagClick={(tag) => router.push(`/tags/${tag}`)}
/>
// Shows: "nextjs" "react" "typescript" "+2 more"

// In blog post (all tags, clickable)
<TagList
  tags={post.tags}
  onTagClick={(tag) => {
    // Filter or navigate to tag page
    console.log('Filter by:', tag);
  }}
/>

// In blog post (all tags, non-clickable)
<TagList tags={post.tags} />

// Empty array renders nothing
<TagList tags={[]} />
```

ALTERNATIVE SCROLLABLE VERSION:
```tsx
// For horizontal scrolling instead of wrapping
export const TagListScrollable = ({ tags, onTagClick }: TagListProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-text-muted/20">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="neutral"
          size="sm"
          className={`flex-shrink-0 ${onTagClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
          onClick={() => onTagClick?.(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};
```

STYLING ENHANCEMENTS:
```css
/* Add to globals.css for custom scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--text-muted) / 0.2) transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgb(var(--text-muted) / 0.2);
  border-radius: 9999px;
}
```

VERIFICATION:
- Tags render as neutral badges
- maxVisible limits displayed tags
- "+N more" button expands to show all
- onTagClick handler works
- Hover effects on clickable tags
- Empty tags array renders nothing
- Responsive wrapping works
