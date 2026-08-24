"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Category, NewsItem } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import SignalBars from "./SignalBars";

const ACCENT: Record<Category, string> = {
  Headline: "border-l-headline",
  Product: "border-l-product",
  Company: "border-l-company",
  Research: "border-l-research",
  Policy: "border-l-policy",
  Investment: "border-l-investment",
};

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const hours = (Date.now() - d.getTime()) / (1000 * 60 * 60);
  if (hours < 24) return `${Math.max(1, Math.round(hours))}h ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NewsItemRow({ item, index = 0 }: { item: NewsItem; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const long = item.snippet.length > 140;

  return (
    <article
      className={`group relative rounded-sm border border-wire-line/80 border-l-4 ${ACCENT[item.category]} bg-white/70 px-4 py-3.5 sm:px-5 sm:py-4 shadow-card transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:shadow-card-hover hover:bg-white/90 motion-reduce:transition-none motion-reduce:hover:translate-y-0 animate-fade-slide-up motion-reduce:animate-none`}
      style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <CategoryBadge category={item.category} />
        <span className="font-mono text-[11px] text-ink-soft/80">
          {item.source} · {formatTime(item.publishedDate)}
        </span>
        <span className="ml-auto shrink-0">
          <SignalBars importance={item.importance} />
        </span>
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="focus-ring inline-flex items-start gap-1.5 rounded-sm"
      >
        <h3 className="font-display text-base font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-signal">
          {item.title}
        </h3>
        <ArrowUpRight
          size={15}
          strokeWidth={2.25}
          aria-hidden
          className="mt-1 shrink-0 text-ink-soft/50 opacity-0 -translate-x-0.5 transition-all duration-200 ease-spring group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-signal"
        />
      </a>

      <p
        className={`mt-1 text-sm text-ink-soft leading-relaxed transition-all duration-200 ${
          expanded ? "" : "line-clamp-2"
        }`}
      >
        {item.snippet}
      </p>

      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="focus-ring mt-1.5 inline-flex items-center gap-1 rounded-sm font-mono text-[11px] uppercase tracking-wide text-ink-soft/70 transition-colors duration-200 hover:text-signal"
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown
            size={12}
            strokeWidth={2.5}
            aria-hidden
            className={`transition-transform duration-200 ease-spring ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </article>
  );
}
