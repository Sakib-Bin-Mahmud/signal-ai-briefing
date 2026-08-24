export default function DrawnCheck({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`h-5 w-5 animate-pop-in motion-reduce:animate-none ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="16" cy="16" r="14" className="fill-investment/15 stroke-investment" strokeWidth="2" />
      <path
        d="M9.5 16.5 L14 21 L22.5 11.5"
        className="stroke-investment animate-draw-check"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={1}
        strokeDasharray="1 1"
      />
    </svg>
  );
}
