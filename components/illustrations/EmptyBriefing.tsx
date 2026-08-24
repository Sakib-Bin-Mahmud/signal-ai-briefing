export default function EmptyBriefing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true" focusable="false">
      <line x1="80" y1="46" x2="80" y2="96" className="stroke-ink/25" strokeWidth="4" strokeLinecap="round" />
      <path d="M62 96 L98 96 L80 84 Z" className="fill-ink/10" />
      <circle cx="80" cy="40" r="5" className="fill-signal/70" />
      <circle cx="80" cy="40" r="16" className="stroke-gold/50" strokeWidth="2" strokeDasharray="3 6" fill="none" />
      <circle cx="80" cy="40" r="28" className="stroke-signal/25" strokeWidth="2" strokeDasharray="2 8" fill="none" />
      <circle cx="34" cy="30" r="2.5" className="fill-gold/70" />
      <circle cx="126" cy="66" r="2" className="fill-signal/40" />
    </svg>
  );
}
