CREATE: components/molecules/MetaInfo/index.tsx

CONTEXT: Blog post metadata display molecule
Shows author, date, reading time, and category in a structured layout.

DEPENDENCIES (must exist first):
- components/atoms/Text
- components/atoms/Badge
- components/atoms/Icon
- lucide-react (Clock, Calendar, User icons)
- date-fns for date formatting

REQUIREMENTS:
- Display author name with icon
- Display publish date (formatted)
- Display reading time
- Optional category badge
- Compact horizontal layout
- Color-coded author badges (Walter vs Walternate)
- TypeScript props interface

COMPONENT CODE:
```tsx
// components/molecules/MetaInfo/index.tsx
import { Text } from '@/components/atoms/Text';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { Clock, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

export interface MetaInfoProps {
  author: 'walter' | 'walternate';
  publishedAt: string;
  readingTime: number;
  category?: 'highlights' | 'articles' | 'logs';
  showCategory?: boolean;
  className?: string;
}

const authorConfig = {
  walter: {
    label: 'Walter',
    badgeVariant: 'rust' as const,
  },
  walternate: {
    label: 'Walternate AI',
    badgeVariant: 'denim-outline' as const,
  },
};

const categoryConfig = {
  highlights: {
    label: 'Highlights',
    variant: 'burgundy' as const,
  },
  articles: {
    label: 'Articles',
    variant: 'rust' as const,
  },
  logs: {
    label: 'Logs',
    variant: 'denim' as const,
  },
};

export const MetaInfo = ({
  author,
  publishedAt,
  readingTime,
  category,
  showCategory = false,
  className,
}: MetaInfoProps) => {
  const authorInfo = authorConfig[author];
  const formattedDate = format(new Date(publishedAt), 'MMM d, yyyy');

  return (
    <div className={`flex flex-wrap items-center gap-3 text-sm ${className}`}>
      {/* Author */}
      <div className="flex items-center gap-1.5">
        <Icon icon={User} size="xs" color="muted" />
        <Badge variant={authorInfo.badgeVariant} size="sm">
          {authorInfo.label}
        </Badge>
      </div>

      {/* Date */}
      <div className="flex items-center gap-1.5">
        <Icon icon={Calendar} size="xs" color="muted" />
        <Text variant="small" color="secondary">
          {formattedDate}
        </Text>
      </div>

      {/* Reading time */}
      <div className="flex items-center gap-1.5">
        <Icon icon={Clock} size="xs" color="muted" />
        <Text variant="small" color="secondary">
          {readingTime} min read
        </Text>
      </div>

      {/* Category (optional) */}
      {showCategory && category && (
        <Badge variant={categoryConfig[category].variant} size="sm">
          {categoryConfig[category].label}
        </Badge>
      )}
    </div>
  );
};
```

TECHNICAL SPECS:
```typescript
interface MetaInfoProps {
  author: 'walter' | 'walternate';
  publishedAt: string; // ISO date string
  readingTime: number; // minutes
  category?: 'highlights' | 'articles' | 'logs';
  showCategory?: boolean;
  className?: string;
}
```

USAGE EXAMPLES:
```tsx
import { MetaInfo } from '@/components/molecules/MetaInfo';

// In blog card
<MetaInfo
  author="walter"
  publishedAt="2025-01-15"
  readingTime={5}
  category="articles"
  showCategory
/>

// In blog post header (without category since it's obvious)
<MetaInfo
  author="walternate"
  publishedAt="2025-01-16T10:30:00Z"
  readingTime={12}
/>

// Compact version
<MetaInfo
  author="walter"
  publishedAt="2025-01-15"
  readingTime={3}
  className="text-xs"
/>
```

RESPONSIVE BEHAVIOR:
```tsx
// Wraps nicely on mobile
// Icons provide visual anchors
// Badges are touch-friendly size
```

DATE FORMATTING OPTIONS:
```typescript
// Can customize date format
import { format, formatDistanceToNow } from 'date-fns';

// Relative time (alternative)
const relativeDate = formatDistanceToNow(new Date(publishedAt), {
  addSuffix: true,
});
// "2 days ago"

// Full date with time
const fullDate = format(new Date(publishedAt), 'MMMM d, yyyy · h:mm a');
// "January 15, 2025 · 10:30 AM"
```

VERIFICATION:
- Author badge displays with correct color
- Date formatted correctly
- Reading time shows in minutes
- Category badge displays when enabled
- Icons align properly
- Responsive wrapping works
- Accessible with semantic markup
