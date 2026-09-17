"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Importance, NewsItem } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import SignalBars from "./SignalBars";

const SIGNAL_LABEL: Record<Importance, string> = {
  High: "High signal",
  Medium: "Medium signal",
  Low: "Low signal",
};

const SIGNAL_TEXT: Record<Importance, string> = {
  High: "text-gold-ink",
  Medium: "text-cobalt",
  Low: "text-ink-faint",
};

const SIGNAL_TOP_RULE: Record<Importance, string> = {
  High: "before:bg-gold",
  Medium: "before:bg-cobalt/50",
  Low: "before:bg-paper-line",
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
      className={`group relative before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[3px] ${SIGNAL_TOP_RULE[item.importance]} rounded-[2px] border border-paper-line bg-paper-raised/70 px-4 py-4 sm:px-5 shadow-card transition-all duration-200 ease-spring hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-card-hover hover:bg-paper-raised motion-reduce:transition-none motion-reduce:hover:translate-y-0 animate-fade-slide-up motion-reduce:animate-none`}
      style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] ${SIGNAL_TEXT[item.importance]}`}>
          <SignalBars importance={item.importance} />
          {SIGNAL_LABEL[item.importance]}
        </span>
        <CategoryBadge category={item.category} />
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="focus-ring inline-flex items-start gap-1.5 rounded-sm"
      >
        <h3 className="font-body text-base font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-cobalt">
          {item.title}
        </h3>
        <ArrowUpRight
          size={15}
          strokeWidth={2.25}
          aria-hidden
          className="mt-1 shrink-0 text-ink-faint opacity-0 -translate-x-0.5 transition-all duration-200 ease-spring group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cobalt"
        />
      </a>

      <p
        className={`mt-1.5 text-sm text-ink-soft leading-relaxed transition-all duration-200 ${
          expanded ? "" : "line-clamp-2"
        }`}
      >
        {item.snippet}
      </p>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-ink-faint">
          {item.source} · {formatTime(item.publishedDate)}
        </span>
        {long && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="focus-ring inline-flex items-center gap-1 rounded-sm font-mono text-[11px] uppercase tracking-wide text-ink-faint transition-colors duration-200 hover:text-cobalt"
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
      </div>
    </article>
  );
}
