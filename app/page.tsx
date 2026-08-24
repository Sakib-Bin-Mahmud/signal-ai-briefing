"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
  Zap,
} from "lucide-react";
import { Category, Digest, FeedSource } from "@/lib/types";
import { FEEDS_STORAGE_KEY } from "@/lib/feeds";
import NewsItemRow from "@/components/NewsItemRow";
import CategoryBadge from "@/components/CategoryBadge";
import CardSkeleton from "@/components/CardSkeleton";
import Toast from "@/components/Toast";
import HeroSignal from "@/components/illustrations/HeroSignal";
import PulseLoader from "@/components/illustrations/PulseLoader";
import EmptyBriefing from "@/components/illustrations/EmptyBriefing";
import NoResults from "@/components/illustrations/NoResults";
import ErrorSignal from "@/components/illustrations/ErrorSignal";

export default function BriefingPage() {
  const [digest, setDigest] = useState<Digest | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(new Set());
  const [sortMode, setSortMode] = useState<"signal" | "recent">("signal");

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
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
      if (isRefresh) setToast("Briefing refreshed");
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong building today's briefing.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const hasAnyItems = digest ? digest.sections.some((s) => s.items.length > 0) : false;

  const highSignalCount = useMemo(
    () => (digest ? digest.sections.flatMap((s) => s.items).filter((i) => i.importance === "High").length : 0),
    [digest]
  );

  const visibleSections = useMemo(() => {
    if (!digest) return [];
    const q = query.trim().toLowerCase();
    return digest.sections
      .filter((s) => s.items.length > 0)
      .filter((s) => activeCategories.size === 0 || activeCategories.has(s.category))
      .map((s) => {
        let items = s.items;
        if (q) {
          items = items.filter(
            (i) =>
              i.title.toLowerCase().includes(q) ||
              i.snippet.toLowerCase().includes(q) ||
              i.source.toLowerCase().includes(q)
          );
        }
        if (sortMode === "recent") {
          items = [...items].sort(
            (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
          );
        }
        return { ...s, items };
      })
      .filter((s) => s.items.length > 0);
  }, [digest, query, activeCategories, sortMode]);

  const filtersActive = query.trim() !== "" || activeCategories.size > 0;
  const filterKey = `${query}|${sortMode}|${[...activeCategories].sort().join(",")}`;

  function toggleCategory(cat: Category) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function clearFilters() {
    setQuery("");
    setActiveCategories(new Set());
  }

  let runningIndex = 0;

  return (
    <div>
      <Toast message={toast} />

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-signal mb-1.5">{dateStr}</p>
              <h1 className="font-hero text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
                Today&apos;s briefing
              </h1>
            </div>
            <HeroSignal className="hidden sm:block w-16 h-16 -mt-1 shrink-0" />
          </div>
          <button
            type="button"
            onClick={() => load(true)}
            disabled={refreshing || loading}
            className="focus-ring mt-1 flex shrink-0 items-center gap-1.5 rounded-sm border border-wire-line bg-white/70 px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-ink-soft shadow-card transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:text-ink hover:shadow-card-hover disabled:pointer-events-none disabled:opacity-60"
          >
            {refreshing ? <PulseLoader /> : <RefreshCw size={13} strokeWidth={2.25} aria-hidden />}
            <span className="hidden sm:inline">{refreshing ? "Refreshing" : "Refresh"}</span>
          </button>
        </div>
        {digest && !loading && (
          <div className="relative mt-2 max-w-2xl rounded-sm bg-gold-bg/40 py-3 pl-6 pr-4">
            <span
              aria-hidden
              className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-gradient-to-b from-signal to-gold"
            />
            <span
              aria-hidden
              className="absolute -left-1 -top-2 select-none font-hero text-4xl leading-none text-gold-deep/50"
            >
              &ldquo;
            </span>
            <p className="font-hero italic text-[17px] sm:text-lg leading-relaxed text-ink-soft">
              {digest.overview}
            </p>
          </div>
        )}
      </div>

      {/* Stats strip — the focal point above the fold */}
      {!loading && digest && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="rounded-sm border border-wire-line/80 bg-white/70 px-4 py-3 shadow-card">
            <div className="flex items-center gap-1.5 text-ink-soft mb-1">
              <Layers size={13} strokeWidth={2.25} aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-wide">Scanned</span>
            </div>
            <p className="font-display text-xl font-bold text-ink">{digest.totalScanned}</p>
          </div>
          <div className="rounded-sm border border-gold/30 bg-white/70 px-4 py-3 shadow-card">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold-bg text-signal">
                <Zap size={12} strokeWidth={2.5} aria-hidden />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">High-signal</span>
            </div>
            <p className="font-hero text-3xl sm:text-4xl font-semibold text-signal">{highSignalCount}</p>
          </div>
          <div className="rounded-sm border border-wire-line/80 bg-white/70 px-4 py-3 shadow-card">
            <div
              className={`flex items-center gap-1.5 mb-1 ${
                digest.failedSources > 0 ? "text-policy" : "text-research"
              }`}
            >
              {digest.failedSources > 0 ? (
                <AlertTriangle size={13} strokeWidth={2.25} aria-hidden />
              ) : (
                <CheckCircle2 size={13} strokeWidth={2.25} aria-hidden />
              )}
              <span className="font-mono text-[10px] uppercase tracking-wide">Sources</span>
            </div>
            <p className="font-display text-xl font-bold text-ink">
              {digest.failedSources > 0 ? `${digest.failedSources} down` : "All OK"}
            </p>
          </div>
          <div className="rounded-sm border border-wire-line/80 bg-white/70 px-4 py-3 shadow-card">
            <div className="flex items-center gap-1.5 text-ink-soft mb-1">
              <Clock size={13} strokeWidth={2.25} aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-wide">Updated</span>
            </div>
            <p className="font-display text-xl font-bold text-ink">
              {new Date(digest.generatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </p>
          </div>
        </div>
      )}

      {/* Search + sort + category filter controls */}
      {!loading && digest && hasAnyItems && (
        <div className="mb-7 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search
                size={14}
                strokeWidth={2.25}
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search today's items…"
                aria-label="Search today's items"
                className="focus-ring w-full rounded-sm border border-wire-line bg-white/70 py-2 pl-9 pr-9 text-sm text-ink placeholder:text-ink-soft/50 shadow-card transition-colors duration-200 focus:bg-white"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="focus-ring absolute right-2.5 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-ink-soft/60 hover:text-signal"
                >
                  <X size={14} strokeWidth={2.25} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1 rounded-sm border border-wire-line bg-white/70 p-1 shadow-card font-mono text-[11px] uppercase tracking-wide shrink-0">
              <button
                type="button"
                onClick={() => setSortMode("signal")}
                className={`focus-ring flex items-center gap-1 rounded-sm px-2.5 py-1.5 transition-colors duration-200 ${
                  sortMode === "signal" ? "bg-ink text-wire" : "text-ink-soft hover:text-ink"
                }`}
              >
                <Zap size={12} strokeWidth={2.5} aria-hidden />
                Signal
              </button>
              <button
                type="button"
                onClick={() => setSortMode("recent")}
                className={`focus-ring flex items-center gap-1 rounded-sm px-2.5 py-1.5 transition-colors duration-200 ${
                  sortMode === "recent" ? "bg-ink text-wire" : "text-ink-soft hover:text-ink"
                }`}
              >
                <Clock size={12} strokeWidth={2.5} aria-hidden />
                Recent
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal size={13} strokeWidth={2.25} aria-hidden className="text-ink-soft/50 shrink-0" />
            {digest.sections
              .filter((s) => s.items.length > 0)
              .map((s) => {
                const active = activeCategories.has(s.category);
                return (
                  <button
                    key={s.category}
                    type="button"
                    onClick={() => toggleCategory(s.category)}
                    aria-pressed={active}
                    className={`focus-ring rounded-sm transition-all duration-200 ease-spring ${
                      active ? "ring-2 ring-signal/50" : "hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <CategoryBadge category={s.category} />
                      <span className="font-mono text-[11px] text-ink-soft">{s.items.length}</span>
                    </span>
                  </button>
                );
              })}
            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="focus-ring ml-1 flex items-center gap-1 rounded-sm font-mono text-[11px] uppercase tracking-wide text-ink-soft/70 hover:text-signal"
              >
                <X size={12} strokeWidth={2.5} aria-hidden />
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-sm border border-policy/25 bg-policy-bg/70 px-5 py-8 text-center shadow-card animate-fade-slide-up">
          <ErrorSignal className="mx-auto mb-3 h-24 w-24" />
          <p className="text-sm text-policy mb-3 max-w-md mx-auto">
            Couldn&apos;t pull today&apos;s briefing together: {error}. Might just be a source having a bad
            moment — worth another try.
          </p>
          <button
            type="button"
            onClick={() => load(false)}
            className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-policy/30 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-policy transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:bg-policy/10"
          >
            <RefreshCw size={12} strokeWidth={2.25} aria-hidden />
            Try again
          </button>
        </div>
      )}

      {!loading && !error && digest && !hasAnyItems && (
        <div className="rounded-sm border border-wire-line bg-white/60 px-5 py-10 text-center shadow-card animate-fade-slide-up">
          <EmptyBriefing className="mx-auto mb-3 h-28 w-28" />
          <p className="text-ink-soft max-w-md mx-auto">
            Quiet out there — no items came through today. Worth checking{" "}
            <a href="/settings" className="focus-ring rounded-sm underline decoration-wire-line underline-offset-2 text-ink hover:text-signal">
              Sources
            </a>{" "}
            in case a feed needs a nudge.
          </p>
        </div>
      )}

      {!loading && !error && digest && hasAnyItems && visibleSections.length === 0 && (
        <div className="rounded-sm border border-wire-line bg-white/60 px-5 py-10 text-center shadow-card animate-fade-slide-up">
          <NoResults className="mx-auto mb-3 h-24 w-24" />
          <p className="text-ink-soft mb-3">Nothing matches those filters — try widening the net.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-wire-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:text-ink hover:bg-wire-line/40"
          >
            <X size={12} strokeWidth={2.25} aria-hidden />
            Clear filters
          </button>
        </div>
      )}

      {!loading && !error && digest && visibleSections.length > 0 && (
        <div key={filterKey} className="space-y-10">
          {visibleSections.map((section) => (
            <section key={section.category} id={section.category}>
              <div className="flex items-baseline gap-2 mb-3">
                <h2 className="font-display text-xl font-bold text-ink">{section.category}</h2>
                <span className="font-mono text-[11px] text-ink-soft/60">{section.items.length}</span>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <NewsItemRow key={item.id} item={item} index={runningIndex++} />
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
