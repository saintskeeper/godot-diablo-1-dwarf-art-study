# Creator Funnel & SEO Strategy Research

**Source:** Multiple web searches
**Fetch Date:** 2025-12-31
**Context:** Research for WaltMakes content funnel optimization, lead capture, and data centralization
**Approach:** Self-hosted solutions preferred (in-house infrastructure)

---

## Key Findings

### 1. Data Ownership is Critical

From [Rebrandly](https://www.rebrandly.com/blog/linktree-alternatives):
> "Data ownership limitations prevent creators from building comprehensive audience profiles, implementing sophisticated marketing automation, and maintaining complete control over fan relationships."

> "The future of creator economy success requires understanding that sustainable careers depend on owned audiences."

**Your Advantage:** Self-hosting means 100% data ownership, no platform lock-in.

### 2. The Sales Funnel for Indie Devs

From [How To Market A Game](https://howtomarketagame.com/):
> "Most importantly, don't just focus on one level of the funnel. You need to carefully move your potential fans through each level."

> "In marketing, fans do not move down the funnel automatically. Instead, you need to actively encourage people to take specific actions."

**Common Mistake:** Focusing only on top-of-funnel (getting eyes) without capturing leads.

### 3. Email Lists Actually Work

From [Campaign Cooperative](https://www.campaigncooperative.com/blog/5-email-marketing-strategies-for-indie-game-developers):
> "Email marketing has a return on investment (ROI) of 3,600% while the ROI of social media is 250%."

From [How To Market A Game - Mailing Lists](https://howtomarketagame.com/2022/06/28/using-mailing-lists-to-gain-thousands-of-wishlists/):
> "Failbetter Games demonstrated this by getting 1200 wishlists from a single newsletter email."

### 4. Lead Magnet Requirements

From [Mailjet](https://www.mailjet.com/blog/marketing/lead-capture-landing-page/):
> "Why would anybody give you their personal information without a compelling reason? You have to give them a good reason."

**Good lead magnets for game devs:**
- Exclusive devlog content
- Early access to content
- Behind-the-scenes materials
- Print-and-play versions
- Discount codes

### 5. Website Structure Best Practices

From [Game Developer](https://www.gamedeveloper.com/business/the-ideal-structure-for-your-indie-game-website):
- Single domain for studio + games (consolidates SEO authority)
- Each game gets dedicated landing page
- Don't use free platforms as primary hubs
- "Any inbound links you earn from press benefit your primary domain rather than third-party platforms"

### 6. Landing Page Conversion

From [beehiiv](https://www.beehiiv.com/blog/email-capture-landing-page) and [Mailjet](https://www.mailjet.com/blog/marketing/lead-capture-landing-page/):
- One goal, one CTA
- Form above the fold
- Only ask for email (and maybe name)
- "Even a single line like 'We'll never share your data' boosts trust"
- Mobile-first design
- Fast load times

### 7. Newsletter Content Strategy

From [Game Developer - Email Marketing 101](https://www.gamedeveloper.com/business/email-marketing-101-how-to-actually-use-your-mailing-list):
> "Your newsletter should give people something that they can't find on your social media accounts."

> "When you send emails with complex formatting and HTML, it looks like an email from a huge corporation. You are a small scrappy indie studio. Embrace it. Use regular text."

**Key insight:** Email != social media. Different purpose, different content.

### 8. Content Repurposing Funnel

From [Cloutboost](https://www.cloutboost.com/blog/how-to-create-content-marketing-strategy-for-indie-video-games):
> "Your long storytelling video about your game can be transformed into a couple of articles and a couple dozen social media posts."

---

## Self-Hosted Architecture (In-House Stack)

### Email/Newsletter System
| Self-Hosted Option | Stack | Notes |
|-------------------|-------|-------|
| Listmonk | Go + PostgreSQL | Single binary, handles 100k+ subscribers |
| Mailtrain | Node.js + MySQL | More features, more complex |
| Mautic | PHP + MySQL | Full marketing automation |
| Custom | Next.js + DB + SES | Build into walts.blog directly |

**Recommended:** Listmonk or custom integration into existing Next.js blog

### Analytics (Replace third-party)
| Self-Hosted Option | Stack | Notes |
|-------------------|-------|-------|
| Plausible | Elixir | Privacy-focused, simple |
| Umami | Node.js | Lightweight, easy deploy |
| Matomo | PHP | Full GA replacement |
| PostHog | Python | Product analytics + events |

### Link Tracking / Hub
- Build directly into walts.blog
- Custom `/follow` or `/links` page
- Track clicks with own analytics
- Full control over design/UX

### Subscriber Database
- PostgreSQL (already likely in stack)
- Store: email, source, signup date, engagement metrics
- Custom segmentation for different content types

---

## Proposed Self-Hosted Funnel

```
itch.io game → "More at walts.blog" overlay/link
                     ↓
           walts.blog/follow (hub page)
                     ↓
         ┌──────────┼──────────┐
         ↓          ↓          ↓
    Email Signup  YouTube   X/Twitter
    (Listmonk)    Link       Link
         ↓
    Weekly devlog email
         ↓
    New content → all platforms
```

**All data stays in your database. Full export. Full control.**

---

## Sources

- [Mailjet - Lead Capture Page Best Practices](https://www.mailjet.com/blog/marketing/lead-capture-landing-page/)
- [beehiiv - Email Capture Landing Page](https://www.beehiiv.com/blog/email-capture-landing-page)
- [Rebrandly - Link in Bio Alternatives](https://www.rebrandly.com/blog/linktree-alternatives)
- [Cloutboost - Content Marketing for Indie Games](https://www.cloutboost.com/blog/how-to-create-content-marketing-strategy-for-indie-video-games)
- [How To Market A Game - Email Marketing 101](https://howtomarketagame.com/2017/11/29/email-marketing-101-how-to-actually-use-your-mailing-list/)
- [How To Market A Game - Mailing Lists for Wishlists](https://howtomarketagame.com/2022/06/28/using-mailing-lists-to-gain-thousands-of-wishlists/)
- [Campaign Cooperative - Email Marketing for Indie Devs](https://www.campaigncooperative.com/blog/5-email-marketing-strategies-for-indie-game-developers)
- [Game Developer - Ideal Indie Game Website Structure](https://www.gamedeveloper.com/business/the-ideal-structure-for-your-indie-game-website)
- [TechRadar - Link in Bio and Creator Economy](https://www.techradar.com/pro/beyond-the-bio-the-evolution-of-link-in-bio-and-its-role-in-shaping-the-creator-economy)
