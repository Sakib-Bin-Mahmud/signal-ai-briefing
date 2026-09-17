export default function HeroSignal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      <g className="origin-center animate-orbit-spin motion-reduce:animate-none" style={{ transformOrigin: "68px 30px" }}>
        <circle cx="68" cy="30" r="22" className="stroke-gold/40" strokeWidth="1.5" fill="none" strokeDasharray="1 5" strokeLinecap="round" />
      </g>
      <circle cx="68" cy="30" r="14" className="stroke-sky/60" strokeWidth="1.5" fill="none" />
      <circle cx="68" cy="30" r="4.5" className="fill-cobalt" />
      <circle cx="24" cy="66" r="3" className="fill-gold" />
      <circle cx="40" cy="80" r="2" className="fill-cobalt/50" />
      <path
        d="M14 54 Q 20 40 34 38"
        className="stroke-navy/20"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
