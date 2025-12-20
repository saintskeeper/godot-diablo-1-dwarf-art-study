'use client';

import { Input } from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon';
import { KeyboardKey } from '@/components/atoms/KeyboardKey';
import { GlossyFilters } from '@/components/atoms/GlossyFilters';
import { Search, X } from 'lucide-react';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onClear?: () => void;
  showShortcut?: boolean;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onClear, showShortcut = false, value, ...props }, ref) => {
    const hasValue = value && String(value).length > 0;

    return (
      <>
        <GlossyFilters id="search-glossy" intensity="subtle" />
        <div className="relative w-full glossy-search glossy-optimized">
          {/* Search icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icon icon={Search} size="md" color="muted" />
          </div>

          {/* Search input */}
          <Input
            ref={ref}
            type="search"
            variant="search"
            size="lg"
            value={value}
            className="pl-12 pr-24 relative z-10"
            {...props}
          />

          {/* Right side: Clear button or keyboard shortcut */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
            {hasValue && onClear ? (
              <button
                type="button"
                onClick={onClear}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Clear search"
              >
                <Icon icon={X} size="sm" />
              </button>
            ) : showShortcut ? (
              <div className="hidden sm:flex items-center gap-1 pointer-events-none">
                <KeyboardKey keyName="cmd" size="sm" />
                <KeyboardKey keyName="k" size="sm" />
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
);

SearchBar.displayName = 'SearchBar';
