'use client';

import { useState } from 'react';
import { trackSubscribe } from '@/lib/analytics/posthog';

interface SubscribeFormProps {
  source?: string;
  className?: string;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function SubscribeForm({ source = 'follow_page', className }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === 'loading') return;

    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState('error');
        setErrorMessage(data.error || 'Something went wrong');
        return;
      }

      setState('success');
      trackSubscribe(source);
      setEmail('');
    } catch {
      setState('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  if (state === 'success') {
    return (
      <div className={className}>
        <p className="text-accent-primary font-medium">
          You&apos;re in! Check your inbox to confirm.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={state === 'loading'}
          className="flex-1 px-4 py-3 rounded-lg bg-bg-secondary border border-border-primary
                     text-text-primary placeholder:text-text-muted
                     focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent
                     disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="px-6 py-3 rounded-lg bg-accent-primary text-bg-primary font-medium
                     hover:bg-accent-secondary transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === 'loading' ? 'Joining...' : 'Join'}
        </button>
      </div>
      {state === 'error' && (
        <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}
