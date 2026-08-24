export default function HeroSignal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      <circle cx="68" cy="30" r="22" className="stroke-gold/40" strokeWidth="2" fill="none" />
      <circle cx="68" cy="30" r="14" className="stroke-signal/50" strokeWidth="2" fill="none" />
      <circle cx="68" cy="30" r="4.5" className="fill-signal" />
      <circle cx="24" cy="66" r="3" className="fill-gold" />
      <circle cx="40" cy="80" r="2" className="fill-signal/60" />
      <path
        d="M14 54 Q 20 40 34 38"
        className="stroke-ink/15"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
