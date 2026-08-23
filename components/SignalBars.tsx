import { Importance } from "@/lib/types";

const BAR_COUNT: Record<Importance, number> = { High: 3, Medium: 2, Low: 1 };
const COLOR: Record<Importance, string> = {
  High: "bg-signal",
  Medium: "bg-ink-soft",
  Low: "bg-wire-line",
};

export default function SignalBars({ importance }: { importance: Importance }) {
  const active = BAR_COUNT[importance];
  const heights = [6, 10, 14];

  return (
    <span
      className="inline-flex items-end gap-[2px]"
      role="img"
      aria-label={`${importance} signal strength`}
      title={`${importance} signal`}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-[1px] ${i < active ? COLOR[importance] : "bg-wire-line"}`}
          style={{ height: h }}
        />
      ))}
    </span>
  );
}
