import { NewsItem } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import SignalBars from "./SignalBars";

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const hours = (Date.now() - d.getTime()) / (1000 * 60 * 60);
  if (hours < 24) return `${Math.max(1, Math.round(hours))}h ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NewsItemRow({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group block border-b border-wire-line py-4 first:pt-0 last:border-b-0"
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
      <h3 className="font-display text-base font-semibold leading-snug text-ink group-hover:text-signal transition-colors mb-1">
        {item.title}
      </h3>
      <p className="text-sm text-ink-soft leading-relaxed line-clamp-2">{item.snippet}</p>
    </a>
  );
}
