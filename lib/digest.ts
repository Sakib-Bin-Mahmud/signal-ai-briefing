import { Category, Digest, DigestSection, FeedSource, NewsItem } from "./types";
import { fetchFeed } from "./rss";
import { categorize, scoreItem } from "./categorize";

const SECTION_ORDER: Category[] = ["Headline", "Product", "Company", "Research", "Policy", "Investment"];
const SECTION_CAP: Record<Category, number> = {
  Headline: 8,
  Product: 6,
  Company: 6,
  Research: 6,
  Policy: 5,
  Investment: 5,
};

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function dedupe(items: NewsItem[]): NewsItem[] {
  const seen = new Map<string, NewsItem>();
  for (const item of items) {
    const key = normalizeTitle(item.title);
    const existing = seen.get(key);
    if (!existing || item.score > existing.score) {
      seen.set(key, item);
    }
  }
  return Array.from(seen.values());
}

function buildOverview(sections: DigestSection[], totalScanned: number, topStory: NewsItem | null): string {
  const counts = sections
    .filter((s) => s.items.length > 0)
    .map((s) => `${s.items.length} ${s.category.toLowerCase()}`)
    .join(", ");

  const highCount = sections
    .flatMap((s) => s.items)
    .filter((i) => i.importance === "High").length;

  let overview = `Scanned ${totalScanned} items across today's sources — ${counts || "a quiet day"}.`;
  if (highCount > 0) {
    overview += ` ${highCount} flagged as high-signal.`;
  }
  if (topStory) {
    overview += ` Leading story: "${topStory.title}" (${topStory.source}).`;
  }
  return overview;
}

export async function buildDigest(feeds: FeedSource[]): Promise<Digest> {
  const results = await Promise.allSettled(feeds.map((feed) => fetchFeed(feed)));

  const rawItems = results
    .map((r, i) => ({ result: r, feed: feeds[i] }))
    .filter((x): x is { result: PromiseFulfilledResult<Awaited<ReturnType<typeof fetchFeed>>>; feed: FeedSource } =>
      x.result.status === "fulfilled"
    )
    .flatMap(({ result, feed }) => result.value.map((raw) => ({ raw, feed })));

  const failedSources = results.filter((r) => r.status === "rejected").length;

  const items: NewsItem[] = rawItems.map(({ raw, feed }) => {
    const { category, matchedCompanies } = categorize(raw.title, raw.snippet, feed);
    const { score, importance } = scoreItem(
      raw.title,
      raw.snippet,
      raw.sourceTier,
      raw.publishedDate,
      category,
      matchedCompanies
    );
    return { ...raw, category, matchedCompanies, score, importance };
  });

  const deduped = dedupe(items).sort((a, b) => b.score - a.score);

  const sections: DigestSection[] = SECTION_ORDER.map((category) => ({
    category,
    items: deduped.filter((i) => i.category === category).slice(0, SECTION_CAP[category]),
  }));

  const topStory = deduped[0] ?? null;
  const overview = buildOverview(sections, deduped.length, topStory);

  return {
    generatedAt: new Date().toISOString(),
    totalScanned: deduped.length,
    failedSources,
    overview,
    topStory,
    sections,
  };
}
