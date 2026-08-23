"use client";

import { useEffect, useState } from "react";
import { Digest, FeedSource } from "@/lib/types";
import { FEEDS_STORAGE_KEY } from "@/lib/feeds";
import NewsItemRow from "@/components/NewsItemRow";
import CategoryBadge from "@/components/CategoryBadge";

export default function BriefingPage() {
  const [digest, setDigest] = useState<Digest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      let feeds: FeedSource[] | null = null;
      const raw = localStorage.getItem(FEEDS_STORAGE_KEY);
      if (raw) feeds = JSON.parse(raw);

      const res = await fetch("/api/digest", {
        method: feeds ? "POST" : "GET",
        headers: feeds ? { "Content-Type": "application/json" } : undefined,
        body: feeds ? JSON.stringify({ feeds }) : undefined,
      });
      if (!res.ok) throw new Error(`Digest request failed (${res.status})`);
      const json: Digest = await res.json();
      setDigest(json);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong building today's briefing.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-1">{dateStr}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
          Today&apos;s briefing
        </h1>
        {digest && !loading && (
          <p className="text-ink-soft leading-relaxed">{digest.overview}</p>
        )}
      </div>

      {!loading && digest && (
        <div className="flex flex-wrap gap-2 mb-8">
          {digest.sections
            .filter((s) => s.items.length > 0)
            .map((s) => (
              <a key={s.category} href={`#${s.category}`} className="no-underline">
                <span className="inline-flex items-center gap-1.5">
                  <CategoryBadge category={s.category} />
                  <span className="font-mono text-[11px] text-ink-soft">{s.items.length}</span>
                </span>
              </a>
            ))}
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 rounded-sm border border-wire-line bg-white/40 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="border border-policy/30 bg-policy-bg rounded-sm px-4 py-3 text-sm text-policy">
          Couldn&apos;t build today&apos;s briefing: {error}. One or more sources may be rate-limiting
          or temporarily down — try refreshing.
        </div>
      )}

      {!loading && !error && digest && digest.sections.every((s) => s.items.length === 0) && (
        <div className="border border-wire-line bg-white/50 rounded-sm px-4 py-6 text-center text-ink-soft">
          No items found across your sources right now. Check{" "}
          <a href="/settings" className="underline text-ink">
            Sources
          </a>{" "}
          — a feed URL may need updating.
        </div>
      )}

      {!loading && !error && digest && (
        <div className="space-y-10">
          {digest.sections
            .filter((s) => s.items.length > 0)
            .map((section) => (
              <section key={section.category} id={section.category}>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-display text-xl font-bold text-ink">{section.category}</h2>
                </div>
                <div>
                  {section.items.map((item) => (
                    <NewsItemRow key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
        </div>
      )}

      {digest && (
        <p className="mt-10 font-mono text-[11px] text-ink-soft/60">
          Scanned {digest.totalScanned} items · generated {new Date(digest.generatedAt).toLocaleString()}
          {digest.failedSources > 0 && ` · ${digest.failedSources} source lookups failed`}
        </p>
      )}
    </div>
  );
}
