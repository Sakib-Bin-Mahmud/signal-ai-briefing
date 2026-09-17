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
    <header className="border-b border-navy-line bg-navy bg-navy-gradient bg-no-repeat sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="focus-ring-navy group flex items-center gap-2.5 rounded-sm">
          <span className="flex items-end gap-[2px]" aria-hidden>
            <span className="w-1 h-2 bg-gold rounded-[1px] transition-transform duration-200 ease-spring group-hover:-translate-y-0.5" />
            <span className="w-1 h-3 bg-gold rounded-[1px] transition-transform duration-200 ease-spring delay-75 group-hover:-translate-y-1" />
            <span className="w-1 h-4 bg-gold rounded-[1px] transition-transform duration-200 ease-spring delay-150 group-hover:-translate-y-1.5" />
          </span>
          <span className="leading-none">
            <span className="block font-display font-bold text-lg tracking-tight text-paper">
              Signal
            </span>
            <span className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.18em] text-sky/70">
              AI Intelligence Briefing
            </span>
          </span>
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
                className={`focus-ring-navy relative flex items-center gap-1.5 px-3 py-2 rounded-sm transition-colors duration-200 ${
                  active ? "text-paper" : "text-paper/55 hover:text-paper/90"
                }`}
              >
                <Icon size={14} strokeWidth={2} aria-hidden />
                {link.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-gold transition-transform duration-200 ease-out ${
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
