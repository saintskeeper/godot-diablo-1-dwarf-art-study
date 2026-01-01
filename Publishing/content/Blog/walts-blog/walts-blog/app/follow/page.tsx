import type { Metadata } from 'next';
import { SubscribeForm } from '@/components/molecules/SubscribeForm';
import { TrackedLink } from '@/components/molecules/TrackedLink';

export const metadata: Metadata = {
  title: 'Follow WaltMakes',
  description:
    'Stay connected with WaltMakes. Get updates on game development, creative coding, and indie dev adventures.',
  openGraph: {
    title: 'Follow WaltMakes',
    description:
      'Stay connected with WaltMakes. Get updates on game development, creative coding, and indie dev adventures.',
    type: 'website',
  },
};

const LINKS = [
  {
    destination: 'youtube' as const,
    href: 'https://youtube.com/@WaltMakes',
    title: 'YouTube',
    description: 'Long-form dev logs and tutorials',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    destination: 'x' as const,
    href: 'https://x.com/WaltMakes',
    title: 'X / Twitter',
    description: 'Daily updates and behind the scenes',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    destination: 'itch' as const,
    href: 'https://waltmakes.itch.io',
    title: 'itch.io',
    description: 'Play my games for free',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.137 2.41 2.466 2.41h.024c1.33 0 2.466-1.102 2.466-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.435 2.41C22.78 8.43 24 7.283 24 5.98V4.95c-.02-.62-2.082-2.99-3.13-3.612-3.253-.114-5.508-.134-8.87-.134-3.362 0-5.617.02-8.87.134zm6.59 6.71c-.27.5-.63.96-1.08 1.29-.39.29-.86.5-1.37.58.12.36.18.74.18 1.13 0 2.15-.82 4.04-2.1 5.34v2.37c0 1.5 1.2 2.74 2.67 2.74h7.98c1.47 0 2.67-1.24 2.67-2.74v-2.37c-1.28-1.3-2.1-3.19-2.1-5.34 0-.39.06-.77.18-1.13-.51-.08-.98-.29-1.37-.58-.45-.33-.81-.79-1.08-1.29-.25.43-.59.81-1 1.1-.55.38-1.21.6-1.93.6-.72 0-1.38-.22-1.93-.6-.41-.29-.75-.67-1-1.1z" />
      </svg>
    ),
  },
  {
    destination: 'blog' as const,
    href: 'https://walts.blog',
    title: 'Blog',
    description: 'Articles and dev logs',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
    external: false,
  },
];

export default function FollowPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Stay in the loop
          </h1>
          <p className="text-lg text-text-secondary max-w-md mx-auto">
            Game dev adventures, creative coding experiments, and the occasional
            AI-powered duck. Pick your platform.
          </p>
        </div>

        {/* Email Signup */}
        <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-bg-secondary border border-border-primary">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Newsletter
          </h2>
          <p className="text-text-muted mb-6">
            Weekly highlights delivered to your inbox. No spam, ever.
          </p>
          <SubscribeForm source="follow_page" />
          <p className="mt-4 text-xs text-text-muted text-center">
            Unsubscribe anytime. Your email stays private.
          </p>
        </div>

        {/* Link Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {LINKS.map((link) => (
            <TrackedLink
              key={link.destination}
              href={link.href}
              destination={link.destination}
              source="follow_page"
              external={link.external !== false}
              className="group flex items-start gap-4 p-5 rounded-xl
                         bg-bg-tertiary border border-border-primary
                         hover:border-accent-teal hover:shadow-lg
                         transition-all duration-200"
            >
              <div className="p-3 rounded-lg bg-bg-secondary text-accent-teal
                              group-hover:bg-accent-teal group-hover:text-bg-primary
                              transition-colors">
                {link.icon}
              </div>
              <div>
                <h3 className="font-semibold text-text-primary group-hover:text-accent-teal transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-text-muted">{link.description}</p>
              </div>
            </TrackedLink>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-text-muted">
          <p>Built by Walter. Powered by curiosity.</p>
        </div>
      </div>
    </main>
  );
}
