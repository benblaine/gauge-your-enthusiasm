"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProgressStore } from "@/stores/progressStore";
import { TOTAL_LESSONS } from "@/content/modules/config";
import { NeonText } from "@/components/decorative/NeonText";
import { cn } from "@/lib/utils";

export function Navbar() {
  const completed = useProgressStore((s) => s.completedLessons.length);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const percent = hydrated
    ? Math.min(100, Math.round((completed / TOTAL_LESSONS) * 100))
    : 0;

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-brass/20 rounded-none px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3 no-underline">
          <span
            aria-hidden
            className="w-2 h-2 rotate-45 bg-brass shadow-[0_0_8px_rgba(212,175,55,0.7)]"
          />
          <span className="font-display text-lg md:text-xl tracking-wide text-brass-light group-hover:text-white transition">
            <NeonText color="brass" flicker>The Penthouse Observatory</NeonText>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-accent uppercase tracking-widest">
          <NavLink href="/course">Course</NavLink>
          <NavLink href="/course/exam">Exam</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>

        <div className="flex items-center gap-3 min-w-[140px]">
          <div className="hidden sm:block text-xs text-brass-light/70 font-mono">
            {percent}%
          </div>
          <div className="flex-1 h-1 rounded-full bg-penthouse-charcoal/80 overflow-hidden">
            <div
              className="h-full bg-neon-pink shadow-neon-pink transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "no-underline text-brass-light/80 hover:text-neon-pink",
        "transition-all hover:[text-shadow:0_0_8px_rgba(255,105,180,0.6)]",
      )}
    >
      {children}
    </Link>
  );
}
