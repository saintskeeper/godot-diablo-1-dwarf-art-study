import { NextRequest, NextResponse } from "next/server";

export interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

const FEED_URLS: Record<string, { xml: string; html: string }> = {
  "jams": {
    xml: "https://itch.io/jams.xml",
    html: "https://itch.io/jams"
  },
  "jams-active": {
    xml: "https://itch.io/jams/in-progress.xml",
    html: "https://itch.io/jams/in-progress"
  },
  "jams-upcoming": {
    xml: "https://itch.io/jams/upcoming.xml",
    html: "https://itch.io/jams/upcoming"
  },
  "games": {
    xml: "https://itch.io/games.xml",
    html: "https://itch.io/games"
  },
  "games-new": {
    xml: "https://itch.io/games/newest.xml",
    html: "https://itch.io/games/newest"
  },
  "games-free": {
    xml: "https://itch.io/games/free.xml",
    html: "https://itch.io/games/free"
  },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const feedType = searchParams.get("type") || "jams-active";

  const urls = FEED_URLS[feedType];
  if (!urls) {
    return NextResponse.json(
      { error: "Invalid feed type" },
      { status: 400 }
    );
  }

  const isJamFeed = feedType.startsWith("jams");

  try {
    // Try XML first
    let items = await tryFetchXML(urls.xml);

    // Fallback to HTML scraping if XML fails
    if (items.length === 0) {
      items = await fetchFromHTML(urls.html, isJamFeed);
    }

    if (items.length === 0) {
      throw new Error("Could not fetch feed data");
    }

    return NextResponse.json({ items, feedType });
  } catch (error) {
    console.error("Feed fetch error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch feed" },
      { status: 500 }
    );
  }
}

async function tryFetchXML(url: string): Promise<FeedItem[]> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];

    const text = await response.text();

    // Check if we got HTML instead of XML
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      return [];
    }

    return parseRSS(text);
  } catch {
    return [];
  }
}

async function fetchFromHTML(url: string, isJam: boolean): Promise<FeedItem[]> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`HTML fetch failed: ${response.status}`);
  }

  const html = await response.text();

  if (isJam) {
    return parseJamsHTML(html);
  } else {
    return parseGamesHTML(html);
  }
}

function parseJamsHTML(html: string): FeedItem[] {
  const items: FeedItem[] = [];

  // Match jam entries: <div class="jam ..."><div class="padded_content">...<h3><a href="...">Title</a></h3>
  const jamRegex = /<div class="jam[^"]*"[^>]*>[\s\S]*?<h3[^>]*><a href="([^"]+)"[^>]*>([^<]+)<\/a><\/h3>[\s\S]*?<div class="hosted_by[^"]*"[^>]*>Hosted by ([^<]+(?:<a[^>]*>[^<]*<\/a>[^<]*)*)[\s\S]*?(?:<div class="timestmap[^"]*"[^>]*>([^<]*)<span[^>]*>([^<]+)<\/span>)?/g;

  let match;
  while ((match = jamRegex.exec(html)) !== null) {
    const link = match[1].startsWith("http") ? match[1] : `https://itch.io${match[1]}`;
    const title = decodeHTMLEntities(match[2]);
    const hostedBy = match[3] ? stripTags(match[3]).trim() : "";
    const timeInfo = match[4] || "";
    const timeStamp = match[5] || "";

    items.push({
      title,
      link,
      description: hostedBy ? `Hosted by ${hostedBy}. ${timeInfo}${timeStamp}` : "",
      pubDate: timeStamp,
    });
  }

  // Simpler fallback pattern
  if (items.length === 0) {
    const simpleRegex = /<h3[^>]*dir="auto"[^>]*>\s*<a href="(\/jam\/[^"]+)"[^>]*>([^<]+)<\/a>/g;
    while ((match = simpleRegex.exec(html)) !== null) {
      items.push({
        title: decodeHTMLEntities(match[2]),
        link: `https://itch.io${match[1]}`,
        description: "",
        pubDate: "",
      });
    }
  }

  return items;
}

function parseGamesHTML(html: string): FeedItem[] {
  const items: FeedItem[] = [];

  // Match game entries from grid
  const gameRegex = /<div[^>]*class="[^"]*game_cell[^"]*"[^>]*>[\s\S]*?<a[^>]*class="[^"]*title[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>[\s\S]*?(?:<div[^>]*class="[^"]*sub[^"]*"[^>]*>([^<]*)<\/div>)?/g;

  let match;
  while ((match = gameRegex.exec(html)) !== null) {
    items.push({
      title: decodeHTMLEntities(match[2]),
      link: match[1],
      description: match[3] ? decodeHTMLEntities(match[3]) : "",
      pubDate: "",
    });
  }

  // Simpler fallback
  if (items.length === 0) {
    const simpleRegex = /<a[^>]*class="[^"]*title[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    while ((match = simpleRegex.exec(html)) !== null) {
      if (match[1].includes("itch.io")) {
        items.push({
          title: decodeHTMLEntities(match[2]),
          link: match[1],
          description: "",
          pubDate: "",
        });
      }
    }
  }

  return items;
}

function parseRSS(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const title = extractTag(itemXml, "title");
    const link = extractTag(itemXml, "link");
    const description = extractTag(itemXml, "description");
    const pubDate = extractTag(itemXml, "pubDate");

    if (title && link) {
      items.push({
        title: decodeHTMLEntities(title),
        link,
        description: decodeHTMLEntities(description),
        pubDate,
      });
    }
  }

  return items;
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}>([\\s\\S]*?)<\\/${tag}>`);
  const match = xml.match(regex);
  return match ? (match[1] || match[2] || "").trim() : "";
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
    .replace(/&#x([a-fA-F0-9]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}
