import { Category, FeedSource, Importance, NewsItem } from "./types";

const POLICY_KEYWORDS = [
  "regulation", "regulat", "policy", "lawmaker", "congress", "senate",
  "eu ai act", "executive order", "ftc", "lawsuit", "sue", "sued",
  "legislation", "compliance", "ban ", "banned", "antitrust", "copyright",
  "government", "white house", "export control",
];

const INVESTMENT_KEYWORDS = [
  "raises", "raised", "funding round", "series a", "series b", "series c",
  "series d", "valuation", "acquire", "acquisition", "acquires", "acquired",
  "ipo", "venture capital", "investment", "invests", "seed round",
  "million in funding", "billion in funding", "funding",
];

const PRODUCT_KEYWORDS = [
  "launch", "launches", "launched", "release", "releases", "released",
  "unveil", "unveils", "announce", "announces", "announced", "introduc",
  "rolling out", "rollout", "now available", "debuts", "ships", "update",
  "new model", "beta", "preview",
];

const KNOWN_COMPANIES = [
  "OpenAI", "Anthropic", "Google", "DeepMind", "Meta", "Microsoft",
  "Mistral", "xAI", "Amazon", "Nvidia", "Cohere", "Stability AI",
  "Perplexity", "Hugging Face", "IBM", "Apple", "Alibaba", "Baidu",
  "Tesla", "Databricks", "Character.AI", "Midjourney", "Runway",
];

const BREAKTHROUGH_KEYWORDS = [
  "breakthrough", "state of the art", "state-of-the-art", "first ever",
  "record", "outperforms", "surpasses", "milestone",
];

function containsAny(haystack: string, needles: string[]): boolean {
  return needles.some((n) => haystack.includes(n));
}

function matchedCompanies(haystack: string): string[] {
  return KNOWN_COMPANIES.filter((c) => haystack.includes(c.toLowerCase()));
}

/**
 * Decide a category for an item. Feeds with a fixedCategory (e.g. arXiv)
 * always win; everything else is inferred from title + snippet keywords,
 * checked in priority order: Policy > Investment > Product > Company > Headline.
 */
export function categorize(
  title: string,
  snippet: string,
  feed: FeedSource
): { category: Category; matchedCompanies: string[] } {
  if (feed.fixedCategory) {
    return { category: feed.fixedCategory, matchedCompanies: [] };
  }

  const haystack = `${title} ${snippet}`.toLowerCase();
  const companies = matchedCompanies(haystack);

  if (containsAny(haystack, POLICY_KEYWORDS)) {
    return { category: "Policy", matchedCompanies: companies };
  }
  if (containsAny(haystack, INVESTMENT_KEYWORDS)) {
    return { category: "Investment", matchedCompanies: companies };
  }
  if (containsAny(haystack, PRODUCT_KEYWORDS) && companies.length > 0) {
    return { category: "Product", matchedCompanies: companies };
  }
  if (companies.length > 0) {
    return { category: "Company", matchedCompanies: companies };
  }
  return { category: "Headline", matchedCompanies: companies };
}

const TIER_WEIGHT: Record<number, number> = { 1: 25, 2: 15, 3: 8 };
const CATEGORY_WEIGHT: Record<Category, number> = {
  Research: 12,
  Product: 14,
  Company: 10,
  Policy: 10,
  Investment: 8,
  Headline: 6,
};

/** Newer items score higher, decaying over ~4 days — news moves fast. */
function recencyScore(publishedDate: string): number {
  const published = new Date(publishedDate).getTime();
  if (Number.isNaN(published)) return 0;
  const hours = (Date.now() - published) / (1000 * 60 * 60);
  if (hours < 0) return 35;
  return Math.max(0, 35 - hours * (35 / 96)); // decays to 0 over ~4 days
}

export function scoreItem(
  title: string,
  snippet: string,
  sourceTier: number,
  publishedDate: string,
  category: Category,
  companies: string[]
): { score: number; importance: Importance } {
  const haystack = `${title} ${snippet}`.toLowerCase();
  const breakthroughBonus = containsAny(haystack, BREAKTHROUGH_KEYWORDS) ? 10 : 0;
  const multiCompanyBonus = companies.length > 1 ? 6 : 0;

  const score =
    recencyScore(publishedDate) +
    (TIER_WEIGHT[sourceTier] ?? 8) +
    CATEGORY_WEIGHT[category] +
    breakthroughBonus +
    multiCompanyBonus;

  let importance: Importance = "Low";
  if (score >= 55) importance = "High";
  else if (score >= 35) importance = "Medium";

  return { score, importance };
}
