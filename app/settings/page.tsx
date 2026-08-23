"use client";

import { useEffect, useState } from "react";
import { DEFAULT_FEEDS, FEEDS_STORAGE_KEY } from "@/lib/feeds";
import { Category, FeedSource } from "@/lib/types";

const CATEGORIES: (Category | "")[] = ["", "Research", "Product", "Company", "Policy", "Investment", "Headline"];

function emptyFeed(): FeedSource {
  return { id: `custom-${Date.now()}`, name: "", url: "", tier: 2 };
}

export default function SettingsPage() {
  const [feeds, setFeeds] = useState<FeedSource[]>(DEFAULT_FEEDS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(FEEDS_STORAGE_KEY);
    if (raw) {
      try {
        setFeeds(JSON.parse(raw));
      } catch {
        setFeeds(DEFAULT_FEEDS);
      }
    }
  }, []);

  function updateFeed(id: string, patch: Partial<FeedSource>) {
    setFeeds((fs) => fs.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  function removeFeed(id: string) {
    setFeeds((fs) => fs.filter((f) => f.id !== id));
  }

  function addFeed() {
    setFeeds((fs) => [...fs, emptyFeed()]);
  }

  function handleSave() {
    const cleaned = feeds.filter((f) => f.name.trim() && f.url.trim());
    localStorage.setItem(FEEDS_STORAGE_KEY, JSON.stringify(cleaned));
    setFeeds(cleaned);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    localStorage.removeItem(FEEDS_STORAGE_KEY);
    setFeeds(DEFAULT_FEEDS);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-2">Sources</h1>
        <p className="text-ink-soft max-w-2xl">
          RSS/Atom feeds that feed the daily briefing. Tier 1 (official research and company
          feeds) is weighted higher than tier 2 (general journalism). Feeds with a fixed category
          — like the arXiv feeds — always land in that section regardless of keywords.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {feeds.map((feed) => (
          <div key={feed.id} className="border border-wire-line bg-white/60 rounded-sm p-4">
            <div className="grid sm:grid-cols-[1fr_1fr_90px_140px] gap-3 mb-2">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  Name
                </label>
                <input
                  value={feed.name}
                  onChange={(e) => updateFeed(feed.id, { name: e.target.value })}
                  className="w-full border border-wire-line rounded-sm px-3 py-2 bg-wire focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  Feed URL
                </label>
                <input
                  value={feed.url}
                  onChange={(e) => updateFeed(feed.id, { url: e.target.value })}
                  className="w-full border border-wire-line rounded-sm px-3 py-2 bg-wire focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  Tier
                </label>
                <select
                  value={feed.tier}
                  onChange={(e) => updateFeed(feed.id, { tier: Number(e.target.value) as 1 | 2 | 3 })}
                  className="w-full border border-wire-line rounded-sm px-3 py-2 bg-wire focus:bg-white text-sm"
                >
                  <option value={1}>1 — Official</option>
                  <option value={2}>2 — Journalism</option>
                  <option value={3}>3 — Other</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  Fixed category
                </label>
                <select
                  value={feed.fixedCategory ?? ""}
                  onChange={(e) =>
                    updateFeed(feed.id, {
                      fixedCategory: (e.target.value || undefined) as Category | undefined,
                    })
                  }
                  className="w-full border border-wire-line rounded-sm px-3 py-2 bg-wire focus:bg-white text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c || "Auto (keyword-based)"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={() => removeFeed(feed.id)}
              className="font-mono text-[11px] text-ink-soft/60 hover:text-signal"
            >
              Remove source
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={addFeed}
          className="px-4 py-2 rounded-sm border border-ink/30 font-mono text-xs uppercase tracking-wide hover:bg-ink/5 transition-colors"
        >
          + Add source
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-sm bg-ink text-wire font-mono text-xs uppercase tracking-wide hover:bg-ink/85 transition-colors"
        >
          Save
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-signal transition-colors"
        >
          Reset to defaults
        </button>
        {saved && <span className="text-sm text-research">Saved. Refresh the briefing to apply.</span>}
      </div>

      <p className="mt-8 font-mono text-[11px] text-ink-soft/50 max-w-2xl">
        Note: this list only controls what the website shows you (stored in this browser). The
        emailed briefing always uses the source list baked into lib/feeds.ts on the server — edit
        that file and redeploy if you want the email to match custom sources added here.
      </p>
    </div>
  );
}
