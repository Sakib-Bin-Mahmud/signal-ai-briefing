import { FeedSource } from "./types";

// Editable at runtime via the Settings page (overrides this default list in
// localStorage). This file is the factory-reset list.
//
// Tier 1 = official/primary sources (research feeds, company blogs).
// Tier 2 = established tech/AI journalism.
// Sources without RSS support (e.g. Anthropic's news page, at time of
// writing) are intentionally left out rather than scraped.
export const DEFAULT_FEEDS: FeedSource[] = [
  {
    id: "arxiv-cs-ai",
    name: "arXiv — cs.AI",
    url: "https://rss.arxiv.org/rss/cs.AI",
    tier: 1,
    fixedCategory: "Research",
  },
  {
    id: "arxiv-cs-lg",
    name: "arXiv — cs.LG",
    url: "https://rss.arxiv.org/rss/cs.LG",
    tier: 1,
    fixedCategory: "Research",
  },
  {
    id: "openai-news",
    name: "OpenAI News",
    url: "https://openai.com/news/rss.xml",
    tier: 1,
  },
  {
    id: "deepmind-blog",
    name: "Google DeepMind Blog",
    url: "https://deepmind.google/blog/feed/basic/",
    tier: 1,
  },
  {
    id: "huggingface-blog",
    name: "Hugging Face Blog",
    url: "https://huggingface.co/blog/feed.xml",
    tier: 1,
  },
  {
    id: "techcrunch-ai",
    name: "TechCrunch — AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    tier: 2,
  },
  {
    id: "venturebeat-ai",
    name: "VentureBeat — AI",
    url: "https://venturebeat.com/category/ai/feed/",
    tier: 2,
  },
  {
    id: "theverge-ai",
    name: "The Verge — AI",
    url: "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml",
    tier: 2,
  },
  {
    id: "mit-tech-review",
    name: "MIT Technology Review",
    url: "https://www.technologyreview.com/feed/",
    tier: 2,
  },
  {
    id: "deeplearning-ai-batch",
    name: "DeepLearning.AI — The Batch",
    url: "https://www.deeplearning.ai/the-batch/feed/",
    tier: 2,
  },
];

export const FEEDS_STORAGE_KEY = "ai-briefing:feeds";
