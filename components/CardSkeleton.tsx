function Bar({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-sm bg-paper-line/70 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer motion-reduce:hidden bg-gradient-to-r from-transparent via-white/80 to-transparent" />
    </div>
  );
}

export default function CardSkeleton() {
  return (
    <div className="rounded-[2px] border border-paper-line bg-paper-raised/60 px-4 py-4 sm:px-5 shadow-card">
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
