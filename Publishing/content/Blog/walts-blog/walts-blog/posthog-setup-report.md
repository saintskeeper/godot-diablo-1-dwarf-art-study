# PostHog post-wizard report

The wizard has completed a deep integration of your project. PostHog has been integrated into Walt's Blog, a Next.js 16 application using the App Router. The integration includes:

- **Client-side initialization** via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+)
- **Server-side tracking** with `posthog-node` for API routes and server components
- **12 custom events** tracking user engagement, content discovery, navigation, and error monitoring
- **Exception capture** for automatic error tracking
- **Automatic pageview and pageleave tracking** via PostHog defaults

## Environment Variables

The following environment variables have been configured in `.env`:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_x7mbvVxSJFMn4BqvVURuGbQM9hFr1YXQebNYzagxRHd
NEXT_PUBLIC_POSTHOG_HOST=https://ph.walts.blog
```

**Note:** The host is configured to use a reverse proxy at `ph.walts.blog` which forwards to PostHog. This helps avoid ad blockers and improves data collection reliability.

## Events Added

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `blog_post_clicked` | User clicked on a blog post card to read an article - key engagement metric for content discovery | `components/molecules/BlogCard/BlogCard.tsx` |
| `command_palette_opened` | User opened the command palette (CMD+K) - indicates power user engagement and search intent | `components/organisms/CommandPalette/CommandPaletteProvider.tsx` |
| `command_palette_search` | User performed a search in the command palette - tracks search behavior and content discovery | `components/organisms/CommandPalette/index.tsx` |
| `command_palette_navigation` | User navigated to a page via command palette - tracks conversion from search to navigation | `components/organisms/CommandPalette/index.tsx` |
| `rss_feed_clicked` | User clicked on RSS/Atom/JSON feed subscription link - indicates intent to subscribe | `components/molecules/FeedLinks/index.tsx` |
| `related_post_clicked` | User clicked on a related post from the article footer - measures content engagement and retention | `components/molecules/RelatedPosts/index.tsx` |
| `previous_next_navigation` | User clicked previous/next post navigation - indicates sequential reading behavior | `components/molecules/PostNavigation/index.tsx` |
| `navigation_item_clicked` | User clicked a navigation item in the floating nav - tracks section preferences | `components/organisms/FloatingNav/index.tsx` |
| `error_page_viewed` | User encountered an error page - critical for monitoring application health | `app/error.tsx` |
| `not_found_page_viewed` | User hit a 404 page - indicates broken links or outdated bookmarks | `app/[category]/[slug]/not-found.tsx` |
| `error_retry_clicked` | User clicked retry button on error page - measures recovery intent | `app/error.tsx` |
| `tag_clicked` | User clicked on a tag to filter content - indicates interest in specific topics | `components/molecules/TagList/index.tsx` |

## Files Created/Modified

### New Files
- `instrumentation-client.ts` - PostHog client-side initialization
- `components/atoms/NotFoundTracker/index.tsx` - Client component for 404 tracking
- `components/molecules/FeedLinks/index.tsx` - RSS feed links with tracking
- `components/molecules/PostNavigation/index.tsx` - Previous/next navigation with tracking
- `components/molecules/RelatedPosts/index.tsx` - Related posts section with tracking

### Modified Files
- `lib/analytics/posthog.ts` - Updated to use instrumentation-client initialization
- `lib/analytics/server.ts` - Added `getPostHogClient()` and `identifyServerUser()` functions
- `components/molecules/BlogCard/BlogCard.tsx` - Added blog post click tracking
- `components/organisms/CommandPalette/CommandPaletteProvider.tsx` - Added palette open tracking
- `components/organisms/CommandPalette/index.tsx` - Added search and navigation tracking
- `components/organisms/FloatingNav/index.tsx` - Added navigation click tracking
- `components/molecules/TagList/index.tsx` - Added tag click tracking
- `app/error.tsx` - Added error page view and retry tracking with exception capture
- `app/[category]/[slug]/not-found.tsx` - Added 404 page tracking
- `app/[category]/[slug]/page.tsx` - Refactored to use new tracked components
- `app/page.tsx` - Refactored to use FeedLinks component
- `.env` - Added PostHog configuration
- `.env.example` - Added PostHog configuration template

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/275982/dashboard/962806) - Core analytics dashboard tracking user engagement, content discovery, and error monitoring

### Insights
- [Blog Post Engagement Over Time](https://us.posthog.com/project/275982/insights/pE6QuH9X) - Tracks how many blog posts are being clicked over time
- [Content Discovery Funnel](https://us.posthog.com/project/275982/insights/GwxVorBJ) - Funnel from command palette open → search → navigation
- [Error and 404 Page Views](https://us.posthog.com/project/275982/insights/C8ZsKHmH) - Monitors error pages and broken links
- [RSS Feed Subscription Interest](https://us.posthog.com/project/275982/insights/Z1bLWDde) - Tracks RSS feed click interest by feed type
- [Navigation Patterns](https://us.posthog.com/project/275982/insights/D9mw7v1d) - Shows which site sections are most popular

## Additional Recommendations

1. **User Identification**: The integration includes `identifyUser()` and `identifyServerUser()` functions ready to use when you add authentication. Call these when users log in to link anonymous events to identified users.

2. **Server-side Events**: Use `trackServerEvent()` in API routes for server-side analytics, such as tracking newsletter subscriptions (already implemented in `/api/subscribe`).

3. **Feature Flags**: PostHog is now set up and ready for feature flag usage via `posthog.isFeatureEnabled()`.

4. **Session Replay**: Session replay is enabled by default and will capture user sessions for debugging and UX analysis.
