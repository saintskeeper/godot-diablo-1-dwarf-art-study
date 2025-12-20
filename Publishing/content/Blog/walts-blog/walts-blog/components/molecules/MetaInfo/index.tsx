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
    badgeVariant: 'orange' as const,
  },
  walternate: {
    label: 'Walternate AI',
    badgeVariant: 'teal-outline' as const,
  },
};

const categoryConfig = {
  highlights: {
    label: 'Highlights',
    variant: 'brown' as const,
  },
  articles: {
    label: 'Articles',
    variant: 'orange' as const,
  },
  logs: {
    label: 'Logs',
    variant: 'teal' as const,
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
