import Parser from "rss-parser";
import { FeedSource, NewsItem } from "./types";

const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "Mozilla/5.0 (compatible; AIIntelBriefing/1.0)" },
});

function makeId(sourceId: string, link: string) {
  return `${sourceId}:${link}`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function snippetFrom(item: any): string {
  const raw = item.contentSnippet || item.summary || item.content || item.title || "";
  const clean = stripHtml(raw);
  return clean.length > 220 ? `${clean.slice(0, 217)}...` : clean;
}

/**
 * Fetch one RSS/Atom feed and map entries to raw NewsItems.
 * Category/score are filled in later by lib/categorize.ts — this function
 * only handles retrieval and normalization.
 */
export async function fetchFeed(
  feed: FeedSource
): Promise<Omit<NewsItem, "category" | "score" | "importance" | "matchedCompanies">[]> {
  const parsed = await parser.parseURL(feed.url);
  const entries = parsed.items ?? [];

  return entries.slice(0, 15).map((item) => {
    const link = item.link ?? "#";
    const published = item.isoDate ?? item.pubDate ?? new Date().toISOString();
    return {
      id: makeId(feed.id, link),
      title: stripHtml(item.title ?? "Untitled"),
      url: link,
      source: feed.name,
      sourceTier: feed.tier,
      publishedDate: new Date(published).toISOString(),
      snippet: snippetFrom(item),
    };
  });
}
