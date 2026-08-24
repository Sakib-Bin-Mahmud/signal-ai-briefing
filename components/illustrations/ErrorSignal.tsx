export default function ErrorSignal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true" focusable="false">
      <line x1="80" y1="46" x2="80" y2="96" className="stroke-ink/25" strokeWidth="4" strokeLinecap="round" />
      <path d="M62 96 L98 96 L80 84 Z" className="fill-ink/10" />
      <circle cx="80" cy="40" r="5" className="fill-policy/80" />
      <path
        d="M50 40 L62 40 L68 26 L74 52 L80 34 L86 46 L92 40 L110 40"
        className="stroke-policy/60"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
