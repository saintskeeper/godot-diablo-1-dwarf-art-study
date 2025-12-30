
# Feed idea
## Itch.io RSS Specification

Itch.io RSS feeds follow standard RSS 2.0 format, delivering game jam or game listings as `<item>` entries with core metadata for discovery apps [1]. Each feed pulls from browse pages like `/jams`, `/jams/in-progress`, or `/jams/tag-godot` by appending `.xml` [1].

## Feed Structure
Feeds contain a `hannel>` with `<item>` elements per jam/game:
```
<rss version="2.0">
  hannel>
    <title>Game Jams In Progress - itch.io</title>
    <item>
      <title>Jam Name</title>
      <link>https://itch.io/jam/jam-slug</link>
      <guid>https://itch.io/jam/jam-slug</guid>
      <description>HTML snippet with jam rules, dates, participants</description>
      <pubDate>Mon, 29 Dec 2025 16:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>
```
Primary fields: `title`, `link` (canonical URL), `description` (truncated HTML), `pubDate` [1][2].

## Key Endpoints
- `https://itch.io/jams.xml` – All jams [3].
- `https://itch.io/jams/in-progress.xml` – Active jams [4].
- `https://itch.io/jams/upcoming.xml` – Upcoming jams [5].
- `https://itch.io/jams/tag-[tag].xml` – Filtered (e.g., `tag-godot`) [1].
- Game equivalents: `https://itch.io/games/tag-random.xml` [6].

## Parsing Guide
Use `DOMParser` in JS to query `document.querySelectorAll('item')`, then extract:
- Title: `item.querySelector('title').textContent`.
- URL: `item.querySelector('link').textContent`.
- Dates: Parse `pubDate` or regex from `description` HTML [1].
Description holds rich info (host, rules, entries)—sanitize with `DOMParser` for text [2]. Feeds update live but may hit Cloudflare; set `User-Agent` header [7]. [1]

Sources
[1] RSS feeds for browsing games - itch.io https://itch.io/updates/rss-feeds-for-browsing-games
[2] Viewing post in RSS feeds for browsing games comments - itch.io https://itch.io/post/679846
[3] Game jams - itch.io https://itch.io/jams
[4] Game Jams In Progress - itch.io https://itch.io/jams/in-progress
[5] Upcoming Game Jams - itch.io https://itch.io/jams/upcoming
[6] Randomizer - Find random games - itch.io https://itch.io/randomizer
[7] RSS feeds return a 403 since the addition of Cloudflare - itch.io https://itch.io/t/5534055/rss-feeds-return-a-403-since-the-addition-of-cloudflare
