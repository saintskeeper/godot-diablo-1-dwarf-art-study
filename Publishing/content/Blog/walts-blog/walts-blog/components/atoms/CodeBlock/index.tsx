'use client';

import { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const CodeBlock = ({ children, className, ...props }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    // Extract text content from the pre element
    const text = preRef.current?.textContent || '';

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group my-6">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-cream-warm/80 hover:bg-cream-warm border border-teal-base/20 hover:border-teal-base/40 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-sm"
        aria-label="Copy code to clipboard"
        type="button"
      >
        {copied ? (
          <Check className="w-4 h-4 text-teal-base" />
        ) : (
          <Copy className="w-4 h-4 text-text-secondary hover:text-teal-base transition-colors" />
        )}
      </button>

      {/* Code Block */}
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
    </div>
  );
};
