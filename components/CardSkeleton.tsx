function Bar({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-sm bg-wire-line/60 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer motion-reduce:hidden bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
}

export default function CardSkeleton() {
  return (
    <div className="rounded-sm border border-wire-line/80 border-l-4 border-l-wire-line bg-white/60 px-4 py-3.5 sm:px-5 sm:py-4 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <Bar className="h-4 w-20" />
        <Bar className="h-3 w-24" />
      </div>
      <Bar className="h-4 w-3/4 mb-2" />
      <Bar className="h-3 w-full mb-1.5" />
      <Bar className="h-3 w-2/3" />
    </div>
  );
}
