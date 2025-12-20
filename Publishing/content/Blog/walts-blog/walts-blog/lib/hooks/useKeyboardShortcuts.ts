'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardShortcutConfig {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsOptions {
  onCommandPalette?: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onCommandPalette,
  enabled = true,
}: UseKeyboardShortcutsOptions = {}) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifierKey = isMac ? event.metaKey : event.ctrlKey;

      // Ignore if user is typing in an input
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // CMD/CTRL + K: Open command palette
      if (modifierKey && event.key === 'k') {
        event.preventDefault();
        onCommandPalette?.();
        return;
      }

      // CMD/CTRL + 1-4: Navigate to sections
      if (modifierKey && !event.shiftKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            router.push('/');
            break;
          case '2':
            event.preventDefault();
            router.push('/highlights');
            break;
          case '3':
            event.preventDefault();
            router.push('/articles');
            break;
          case '4':
            event.preventDefault();
            router.push('/logs');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, onCommandPalette, enabled]);
}

// Export shortcut configurations for displaying in UI
export const KEYBOARD_SHORTCUTS: KeyboardShortcutConfig[] = [
  {
    key: 'k',
    metaKey: true,
    action: () => {},
    description: 'Open command palette',
  },
  {
    key: '1',
    metaKey: true,
    action: () => {},
    description: 'Go to Home',
  },
  {
    key: '2',
    metaKey: true,
    action: () => {},
    description: 'Go to Highlights',
  },
  {
    key: '3',
    metaKey: true,
    action: () => {},
    description: 'Go to Articles',
  },
  {
    key: '4',
    metaKey: true,
    action: () => {},
    description: 'Go to Logs',
  },
];
