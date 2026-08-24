"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, Settings2 } from "lucide-react";

const LINKS = [
  { href: "/", label: "Briefing", icon: Radio },
  { href: "/settings", label: "Sources", icon: Settings2 },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-wire-line bg-wire/90 backdrop-blur sticky top-0 z-10 shadow-card">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="focus-ring group flex items-center gap-2 rounded-sm">
          <span className="flex items-end gap-[2px] transition-transform duration-200 ease-spring group-hover:animate-wiggle" aria-hidden>
            <span className="w-1 h-2 bg-signal rounded-[1px]" />
            <span className="w-1 h-3 bg-signal rounded-[1px]" />
            <span className="w-1 h-4 bg-signal rounded-[1px]" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-ink">Signal</span>
        </Link>
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-wide">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`focus-ring relative flex items-center gap-1.5 px-3 py-2 rounded-sm transition-colors duration-200 ${
                  active ? "text-ink" : "text-ink-soft hover:text-ink hover:bg-wire-line/50"
                }`}
              >
                <Icon size={14} strokeWidth={2} aria-hidden />
                {link.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-signal transition-transform duration-200 ease-out ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
