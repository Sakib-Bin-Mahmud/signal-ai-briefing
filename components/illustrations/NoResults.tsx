export default function NoResults({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="28" className="fill-gold-bg" />
      <circle cx="50" cy="50" r="28" className="stroke-ink/20" strokeWidth="4" fill="none" />
      <line x1="70" y1="70" x2="94" y2="94" className="stroke-ink/35" strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3" className="fill-signal/70" />
      <path
        d="M40 50 a10 10 0 0 1 20 0"
        className="stroke-gold-deep/70"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
