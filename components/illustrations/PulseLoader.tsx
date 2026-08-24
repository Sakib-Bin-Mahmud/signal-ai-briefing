export default function PulseLoader({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-3.5 w-3.5 items-center justify-center ${className}`} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-signal/60 animate-pulse-ring motion-reduce:hidden" />
      <span
        className="absolute inline-flex h-full w-full rounded-full bg-gold/60 animate-pulse-ring motion-reduce:hidden"
        style={{ animationDelay: "0.4s" }}
      />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
    </span>
  );
}
