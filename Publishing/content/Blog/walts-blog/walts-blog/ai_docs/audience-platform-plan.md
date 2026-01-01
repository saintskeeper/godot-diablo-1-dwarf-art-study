# Audience Platform Implementation Plan

**Goal:** Add lead capture and hub page to walts-blog
**Hosting:** Railway (PostgreSQL + Next.js)
**Approach:** Extend existing Next.js app (Option A)

---

## Architecture Overview

```
walts-blog/
├── app/
│   ├── follow/
│   │   └── page.tsx           # Hub page with all links + email signup
│   ├── api/
│   │   └── audience/
│   │       ├── subscribe/
│   │       │   └── route.ts   # POST: add subscriber
│   │       ├── unsubscribe/
│   │       │   └── route.ts   # GET: unsubscribe link handler
│   │       └── stats/
│   │           └── route.ts   # GET: basic analytics (protected)
├── lib/
│   └── audience/
│       ├── db.ts              # PostgreSQL connection (Railway)
│       ├── schema.ts          # Drizzle/Prisma schema
│       ├── actions.ts         # Server actions for forms
│       └── analytics.ts       # Click tracking utilities
```

---

## Database Schema (PostgreSQL)

```sql
-- Subscribers table
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  source VARCHAR(100),           -- 'follow-page', 'blog-footer', 'itch-embed'
  status VARCHAR(20) DEFAULT 'active',  -- 'active', 'unsubscribed'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Link clicks (for hub analytics)
CREATE TABLE link_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_name VARCHAR(100) NOT NULL,  -- 'youtube', 'x', 'itch', 'blog'
  referrer VARCHAR(500),
  user_agent VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Email sends (for future newsletter)
CREATE TABLE email_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID REFERENCES subscribers(id),
  subject VARCHAR(500),
  sent_at TIMESTAMP DEFAULT NOW(),
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP
);
```

---

## /follow Hub Page

### Content
- **Hero:** "Stay in the loop" + email signup form
- **Links Grid:**
  - YouTube (long-form)
  - X/Twitter (daily updates)
  - itch.io (play games)
  - Blog (you're here)
- **Latest Content:** Auto-pull recent blog post, latest YouTube video
- **Trust signal:** "No spam. Unsubscribe anytime."

### Design
- Match walts-blog aesthetic (Cozy Forge palette)
- Mobile-first
- Single CTA above fold (email)

---

## API Endpoints

### POST /api/audience/subscribe
```typescript
// Request
{ email: string, name?: string, source?: string }

// Response
{ success: true, message: "You're in!" }
// or
{ success: false, error: "Invalid email" }
```

### GET /api/audience/unsubscribe?token=xxx
- Decode token → subscriber ID
- Set status = 'unsubscribed'
- Redirect to confirmation page

### GET /api/audience/stats (protected)
- Total subscribers
- Subscribers by source
- Link click counts
- Growth over time

---

## Railway Setup

### Services
1. **walts-blog** (Next.js) - existing or new deployment
2. **PostgreSQL** - Railway managed database

### Environment Variables
```
DATABASE_URL=postgresql://...
UNSUBSCRIBE_SECRET=<random-string-for-tokens>
```

### Deployment
- Connect GitHub repo
- Set root directory: `Publishing/content/Blog/walts-blog/walts-blog`
- Railway auto-detects Next.js

---

## Dependencies to Add

```json
{
  "drizzle-orm": "^0.38.0",
  "postgres": "^3.4.0",
  "@neondatabase/serverless": "^0.10.0"  // or pg for Railway
}
```

Alternative: Use Prisma if preferred.

---

## Implementation Order

1. **Database setup** - Create Railway PostgreSQL, add connection
2. **Schema** - Add Drizzle schema + migrations
3. **Subscribe API** - Basic email capture endpoint
4. **Follow page** - Hub UI with form
5. **Link tracking** - Click analytics on hub links
6. **Stats endpoint** - Basic dashboard data

---

## Future Enhancements (not now)

- [ ] Newsletter sending (integrate with AWS SES or Resend)
- [ ] RSS → Email automation
- [ ] Double opt-in confirmation
- [ ] Embeddable widget for itch.io pages
- [ ] Subscriber segments by interest
