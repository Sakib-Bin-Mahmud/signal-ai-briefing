"use client";

import { useEffect, useState } from "react";
import { Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { DEFAULT_FEEDS, FEEDS_STORAGE_KEY } from "@/lib/feeds";
import { Category, FeedSource } from "@/lib/types";
import Toast from "@/components/Toast";

const CATEGORIES: (Category | "")[] = ["", "Research", "Product", "Company", "Policy", "Investment", "Headline"];

const FIELD_LABEL = "block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1";
const FIELD_INPUT =
  "focus-ring w-full rounded-sm border border-wire-line px-3 py-2 bg-wire text-sm transition-colors duration-200 focus:bg-white focus:border-signal/40";

function emptyFeed(): FeedSource {
  return { id: `custom-${Date.now()}`, name: "", url: "", tier: 2 };
}

export default function SettingsPage() {
  const [feeds, setFeeds] = useState<FeedSource[]>(DEFAULT_FEEDS);
  const [toast, setToast] = useState<string | null>(null);

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

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

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
    setToast("Saved! Refresh your briefing to see the new lineup");
  }

  function handleReset() {
    localStorage.removeItem(FEEDS_STORAGE_KEY);
    setFeeds(DEFAULT_FEEDS);
    setToast("Back to the default lineup");
  }

  return (
    <div>
      <Toast message={toast} />

      <div className="mb-8">
        <h1 className="font-hero text-3xl sm:text-4xl font-semibold tracking-tight text-ink mb-2">Sources</h1>
        <p className="text-ink-soft max-w-2xl leading-relaxed">
          RSS/Atom feeds that feed the daily briefing. Tier 1 (official research and company
          feeds) is weighted higher than tier 2 (general journalism). Feeds with a fixed category
          — like the arXiv feeds — always land in that section regardless of keywords.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {feeds.map((feed, i) => (
          <div
            key={feed.id}
            className="rounded-sm border border-wire-line/80 bg-white/70 p-4 shadow-card transition-shadow duration-200 ease-spring hover:shadow-card-hover animate-fade-slide-up motion-reduce:animate-none"
            style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_1fr_90px_140px] gap-3 mb-3">
              <div>
                <label className={FIELD_LABEL}>Name</label>
                <input
                  value={feed.name}
                  onChange={(e) => updateFeed(feed.id, { name: e.target.value })}
                  className={FIELD_INPUT}
                />
              </div>
              <div>
                <label className={FIELD_LABEL}>Feed URL</label>
                <input
                  value={feed.url}
                  onChange={(e) => updateFeed(feed.id, { url: e.target.value })}
                  className={FIELD_INPUT}
                />
              </div>
              <div>
                <label className={FIELD_LABEL}>Tier</label>
                <select
                  value={feed.tier}
                  onChange={(e) => updateFeed(feed.id, { tier: Number(e.target.value) as 1 | 2 | 3 })}
                  className={FIELD_INPUT}
                >
                  <option value={1}>1 — Official</option>
                  <option value={2}>2 — Journalism</option>
                  <option value={3}>3 — Other</option>
                </select>
              </div>
              <div>
                <label className={FIELD_LABEL}>Fixed category</label>
                <select
                  value={feed.fixedCategory ?? ""}
                  onChange={(e) =>
                    updateFeed(feed.id, {
                      fixedCategory: (e.target.value || undefined) as Category | undefined,
                    })
                  }
                  className={FIELD_INPUT}
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
              type="button"
              onClick={() => removeFeed(feed.id)}
              className="focus-ring inline-flex items-center gap-1.5 rounded-sm font-mono text-[11px] uppercase tracking-wide text-ink-soft/60 transition-colors duration-200 hover:text-policy"
            >
              <Trash2 size={12} strokeWidth={2.25} aria-hidden />
              Remove source
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addFeed}
          className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-ink/25 px-4 py-2 font-mono text-xs uppercase tracking-wide transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:bg-ink/5 hover:shadow-card"
        >
          <Plus size={13} strokeWidth={2.25} aria-hidden />
          Add source
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="focus-ring inline-flex items-center gap-1.5 rounded-sm bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wide text-wire shadow-card transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:bg-ink/85 hover:shadow-card-hover"
        >
          <Save size={13} strokeWidth={2.25} aria-hidden />
          Save
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="focus-ring inline-flex items-center gap-1.5 rounded-sm px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors duration-200 hover:text-signal"
        >
          <RotateCcw size={13} strokeWidth={2.25} aria-hidden />
          Reset to defaults
        </button>
      </div>

      <p className="mt-8 font-mono text-[11px] text-ink-soft/50 max-w-2xl">
        Note: this list only controls what the website shows you (stored in this browser). The
        emailed briefing always uses the source list baked into lib/feeds.ts on the server — edit
        that file and redeploy if you want the email to match custom sources added here.
      </p>
    </div>
  );
}
