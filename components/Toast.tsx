import DrawnCheck from "./illustrations/DrawnCheck";

export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 px-4 animate-toast-in motion-reduce:animate-none"
    >
      <div className="flex items-center gap-2 rounded-sm border border-ink/10 bg-ink text-wire px-4 py-2.5 shadow-card-hover font-mono text-xs uppercase tracking-wide">
        <DrawnCheck className="shrink-0" />
        {message}
      </div>
    </div>
  );
}
