"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Briefing" },
  { href: "/settings", label: "Sources" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-wire-line bg-wire/95 backdrop-blur sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex items-end gap-[2px]" aria-hidden>
            <span className="w-1 h-2 bg-signal rounded-[1px]" />
            <span className="w-1 h-3 bg-signal rounded-[1px]" />
            <span className="w-1 h-4 bg-signal rounded-[1px]" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-ink">Signal</span>
        </Link>
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-wide">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-sm transition-colors ${
                  active ? "bg-ink text-wire" : "text-ink-soft hover:text-ink hover:bg-wire-line/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
