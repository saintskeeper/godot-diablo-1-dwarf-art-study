# WaltMakes Audience Platform: Master Design Plan

**Created:** 2025-12-31
**Status:** Ready for Implementation

## Objective

Build a self-hosted audience growth stack for WaltMakes with:
- **PostHog Cloud + Railway Proxy** - Analytics, session replay, customer tracking
- **Listmonk on Railway** - Newsletter/email management
- **walts.blog /follow page** - Hub page with link tracking
- **Server-side event tracking** - Unified view across the stack

---

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                    RAILWAY                              │
│  ┌──────────────┐         ┌──────────────┐            │
│  │   Listmonk   │         │   PostHog    │            │
│  │  + Postgres  │         │    Proxy     │            │
│  └──────┬───────┘         └──────┬───────┘            │
└─────────┼────────────────────────┼─────────────────────┘
          │                        │
          │ API                    │ Events
          │                        ▼
          │               ┌──────────────────┐
          │               │  PostHog Cloud   │
          │               │  (free tier)     │
          └──────────────►│  1M events/mo    │
                          └──────────────────┘
                                   ▲
┌──────────────────────────────────┼──────────────────────┐
│                   walts.blog                             │
│   /follow ────────► PostHog: link clicks                │
│   /api/subscribe ─► Listmonk API + PostHog event        │
│   All pages ──────► PostHog pageviews (via proxy)       │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 0: Fork & Review Railway Templates

Before deploying, fork the templates to your GitHub for full control and review.

**0.1 Listmonk Template**

```bash
# Fork on GitHub first, then:
cd /Users/walterday/Git/Saintskeeper/2026/2026-creative
mkdir -p Infrastructure/railway
cd Infrastructure/railway

# Clone your fork
git clone https://github.com/YOUR_USERNAME/listmonk.git listmonk-template
cd listmonk-template
```

**Source repo:** https://github.com/railwayapp-templates/listmonk

**Key files to review:**
- `Dockerfile` - Container build
- `Caddyfile` - Web server config (handles TLS, routing)
- `scripts/` - Deployment automation
- Environment variables for CORS, database connection

**0.2 PostHog Proxy Template**

```bash
cd /Users/walterday/Git/Saintskeeper/2026/2026-creative/Infrastructure/railway

# Clone the proxy template
git clone https://github.com/paulocsanz/posthog-proxy.git posthog-proxy-template
cd posthog-proxy-template
```

**Source repo:** https://github.com/paulocsanz/posthog-proxy

**Key files to review:**
- `Dockerfile` - nginx build with env var substitution
- `nginx.conf.template` - Proxy configuration
- Environment vars: `SERVER_NAME`, `PORT`

**Alternative (more configurable):** https://github.com/Valian/posthog-docker-proxy
- Multi-region support (US/EU)
- Referer validation
- All settings via env vars

**0.3 Local Directory Structure**
```
2026-creative/
└── Infrastructure/
    └── railway/
        ├── listmonk-template/      # Your fork
        │   ├── Dockerfile
        │   ├── Caddyfile
        │   └── scripts/
        └── posthog-proxy-template/ # Your fork
            ├── Dockerfile
            └── nginx.conf.template
```

**0.4 Deploy from Your Fork**
- In Railway: New Project → Deploy from GitHub Repo
- Select your forked repo instead of using template button
- This gives you full control over updates

**Deliverables:**
- [ ] Listmonk template forked and cloned
- [ ] PostHog proxy template forked and cloned
- [ ] Both reviewed for any needed modifications
- [ ] Infrastructure/railway directory created

---

### Phase 1: Railway Infrastructure Setup

**1.1 Deploy Listmonk (from your fork)**
- Railway: New Project → Deploy from GitHub Repo
- Select your forked `listmonk-template` repo
- Railway auto-detects and creates PostgreSQL service
- URL: Use Railway default domain (no custom domain needed - API only)
- Post-deploy:
  - Change default password (admin/umami)
  - Update Root URL to Railway domain
  - Set CORS origins: `LISTMONK_ORIGIN_0=https://walts.blog`
  - Create API user for blog integration
  - Create "WaltMakes Weekly" mailing list

**1.2 Deploy PostHog Proxy (from your fork)**
- Railway: New Project → Deploy from GitHub Repo
- Select your forked `posthog-proxy-template` repo
- Set environment variables:
  - `SERVER_NAME=ph.walts.blog`
  - `PORT=80`
- URL: Add custom domain `ph.walts.blog`
  - This bypasses ad blockers that maintain proxy lists
  - Requires DNS CNAME record pointing to Railway
- No database needed (stateless, 256MB RAM)

**1.3 PostHog Cloud Setup**
- Sign up at posthog.com (free tier: 1M events/month)
- Create project for WaltMakes
- Get API key for proxy configuration
- Configure data retention settings

**Deliverables:**
- [ ] Listmonk running on Railway default domain
- [ ] PostHog proxy at `ph.walts.blog` (custom domain)
- [ ] DNS CNAME configured for proxy subdomain
- [ ] PostHog Cloud project configured
- [ ] API credentials documented

---

### Phase 2: Blog Integration (walts.blog)

**2.1 Environment Variables**
```env
# Listmonk (server-side only - not exposed to client)
LISTMONK_URL=https://listmonk-xxx.up.railway.app
LISTMONK_API_USER=api_user
LISTMONK_API_TOKEN=xxx
LISTMONK_LIST_ID=1

# PostHog (NEXT_PUBLIC_ = exposed to client for tracking script)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://ph.walts.blog
```

**2.2 PostHog Client Setup**
File: `lib/analytics/posthog.ts`
- Initialize PostHog with proxy host
- Export tracking functions
- Handle both client and server-side

**2.3 Add PostHog Script**
File: `app/layout.tsx`
- Add PostHog script via proxy domain
- Bypasses ad blockers automatically

**Deliverables:**
- [ ] Environment variables configured
- [ ] PostHog client library added
- [ ] Script integrated in layout

---

### Phase 3: /follow Hub Page

**3.1 Create Hub Page**
File: `app/follow/page.tsx`

**Content:**
- Hero: "Stay in the loop" + value prop
- Email signup form (single field + submit)
- Link grid:
  - YouTube (long-form content)
  - X/Twitter (daily updates)
  - itch.io (play games)
  - Blog (written content)
- Trust signal: "No spam. Unsubscribe anytime."
- Latest content preview (optional)

**3.2 Link Tracking**
Each outbound link fires PostHog event:
```typescript
posthog.capture('hub_link_click', {
  destination: 'youtube' | 'x' | 'itch' | 'blog',
  source: 'follow_page'
})
```

**3.3 Styling**
- Match Cozy Forge palette
- Mobile-first
- Fast load (no heavy assets)

**Deliverables:**
- [ ] `/follow` page created
- [ ] Email form component
- [ ] Tracked link components
- [ ] Mobile responsive

---

### Phase 4: Subscribe API

**4.1 API Route**
File: `app/api/subscribe/route.ts`

```typescript
// POST /api/subscribe
// Body: { email: string, name?: string, source?: string }

// 1. Validate email (zod)
// 2. Call Listmonk API to add subscriber
// 3. Fire PostHog event: 'subscriber_added'
// 4. Return success/error
```

**4.2 Listmonk Integration**
File: `lib/audience/listmonk.ts`
- `addSubscriber(email, name, lists[])`
- `getSubscriberByEmail(email)`
- Error handling for duplicates

**4.3 Server-Side PostHog Events**
File: `lib/analytics/server.ts`
- `trackServerEvent(event, properties)`
- Used for: signups, unsubscribes, email opens (future)

**Deliverables:**
- [ ] `/api/subscribe` endpoint
- [ ] Listmonk client library
- [ ] Server-side PostHog tracking
- [ ] Error handling + validation

---

### Phase 5: Testing & Verification

**5.1 Test Checklist**
- [ ] Subscribe from /follow → appears in Listmonk
- [ ] Subscribe event → appears in PostHog
- [ ] Link clicks → tracked in PostHog
- [ ] Pageviews → tracked via proxy (check ad blocker bypass)
- [ ] Mobile responsive
- [ ] Error states (invalid email, network error)

**5.2 PostHog Dashboard Setup**
Create insights:
- Signups over time
- Link click breakdown (YouTube vs X vs itch)
- Traffic sources to /follow
- Conversion: /follow visitors → signups

---

### Phase 6: Documentation & Launch

**6.1 Update itch.io Profile**
- Change profile link to `walts.blog/follow`
- Add "More at walts.blog" to game descriptions

**6.2 Update YouTube**
- Add `walts.blog/follow` to channel description
- Add to video descriptions template

**6.3 Document the Stack**
- Railway service URLs
- API credentials location
- How to send newsletters
- How to view analytics

---

## Files to Create/Modify

### New Files
```
walts-blog/
├── app/
│   ├── follow/
│   │   └── page.tsx              # Hub page
│   └── api/
│       └── subscribe/
│           └── route.ts          # Signup endpoint
├── lib/
│   ├── analytics/
│   │   ├── posthog.ts            # Client-side PostHog
│   │   └── server.ts             # Server-side events
│   └── audience/
│       └── listmonk.ts           # Listmonk API client
└── components/
    └── molecules/
        ├── SubscribeForm/
        │   └── index.tsx         # Email signup form
        └── TrackedLink/
            └── index.tsx         # Link with click tracking
```

### Modified Files
```
walts-blog/
├── app/layout.tsx                # Add PostHog script
├── .env.local                    # Add env vars
└── package.json                  # Add posthog-js dependency
```

---

## Dependencies to Add

```json
{
  "posthog-js": "^1.96.0"
}
```

No other dependencies needed - using native fetch for Listmonk API.

---

## Timeline Summary

| Phase | Description | Effort |
|-------|-------------|--------|
| 0 | Fork & review Railway templates | Light |
| 1 | Railway deploy (from forks) | Light |
| 2 | Blog PostHog integration | Light |
| 3 | /follow hub page | Medium |
| 4 | Subscribe API + Listmonk | Medium |
| 5 | Testing | Light |
| 6 | Launch & docs | Light |

---

## Success Metrics

After launch, track in PostHog:
- `/follow` page visits per week
- Signup conversion rate
- Which links get most clicks
- Traffic sources driving signups

---

## References

- [Railway Listmonk Template](https://railway.com/new/template/listmonk)
- [Railway PostHog Proxy](https://railway.com/deploy/posthog-proxy)
- [PostHog Cloud](https://posthog.com/)
- [Listmonk Docs](https://listmonk.app/docs/)
- [Research Document](../../ai-docs/active/research/creator-funnel-seo-strategy-2025-12-31.md)

---

## Implementation Log

### 2025-12-31: Phase 2-4 Code Complete

**Railway Project:** `waltmakes-observability`

**Files Created:**
| File | Status |
|------|--------|
| `lib/analytics/posthog.ts` | Done - client tracking helpers |
| `lib/analytics/server.ts` | Done - server-side PostHog client |
| `lib/analytics/PostHogProvider.tsx` | Done - React provider |
| `lib/audience/listmonk.ts` | Done - Listmonk API client |
| `components/molecules/TrackedLink/index.tsx` | Done |
| `components/molecules/SubscribeForm/index.tsx` | Done |
| `app/follow/page.tsx` | Done - hub page |
| `app/api/subscribe/route.ts` | Done |
| `instrumentation-client.ts` | Done - PostHog init via Next.js 15.3+ pattern |

**Files Modified:**
| File | Change |
|------|--------|
| `app/client-layout.tsx` | Added PostHogProvider wrapper |
| `.env.example` | Added Listmonk env vars |
| `package.json` | Added `posthog-js@^1.312.0`, `posthog-node@^5.18.1` |

**Next Steps:**
1. ~~Deploy Listmonk on Railway~~ Done
2. ~~Add Listmonk credentials to Vercel env vars~~ Done
3. ~~Test `/follow` page locally~~ Done
4. Run Phase 5 test checklist (production)

---

### 2026-01-01: Phase 1 Infrastructure + Phase 5 Local Testing Complete

**Listmonk Deployment:**
- URL: `https://listmonk-production-20f5.up.railway.app`
- API User: `walt-svc`
- List: `walt-makes-optin-list` (ID: 3)

**Vercel Environment Variables Set:**
```
LISTMONK_URL=https://listmonk-production-20f5.up.railway.app
LISTMONK_API_USER=walt-svc
LISTMONK_API_TOKEN=***
LISTMONK_LIST_ID=3
NEXT_PUBLIC_POSTHOG_KEY=***
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**Local Testing Results:**
| Test | Result |
|------|--------|
| `/follow` page renders | Pass |
| Subscribe API → Listmonk | Pass |
| Subscriber appears in list | Pass |

**Next Steps:**
1. Deploy to Vercel (push or manual trigger)
2. Test `/follow` in production
3. Update itch.io and YouTube profile links
