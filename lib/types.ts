export type Category = "Research" | "Product" | "Company" | "Policy" | "Investment" | "Headline";
export type Importance = "High" | "Medium" | "Low";

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  tier: 1 | 2 | 3; // 1 = primary/official source, higher weight
  fixedCategory?: Category; // e.g. arXiv feeds are always "Research"
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceTier: 1 | 2 | 3;
  publishedDate: string; // ISO
  snippet: string;
  category: Category;
  matchedCompanies: string[];
  score: number;
  importance: Importance;
}

export interface DigestSection {
  category: Category;
  items: NewsItem[];
}

export interface Digest {
  generatedAt: string;
  totalScanned: number;
  failedSources: number;
  overview: string;
  topStory: NewsItem | null;
  sections: DigestSection[];
}
