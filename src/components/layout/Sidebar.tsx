"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MODULES, lessonId } from "@/content/modules/config";
import { useProgressStore } from "@/stores/progressStore";
import { TropicalPlant } from "@/components/decorative/TropicalPlant";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const completed = useProgressStore((s) => s.completedLessons);

  useEffect(() => setHydrated(true), []);

  return (
    <>
      <button
        type="button"
        className="md:hidden m-3 neon-button !py-1.5 !px-3 text-xs"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "Close ☰" : "Modules ☰"}
      </button>
      <aside
        className={cn(
          "glass-panel rounded-none border-r border-brass/15 p-4 md:p-6",
          "md:sticky md:top-[64px] md:self-start md:max-h-[calc(100vh-64px)]",
          "md:overflow-y-auto md:w-72 lg:w-80 transition-all",
          open ? "block" : "hidden md:block",
        )}
      >
        <h3 className="font-display text-xl mb-4 text-brass-light">Syllabus</h3>
        <ol className="space-y-4">
          {MODULES.map((m) => {
            const moduleCompleted = m.lessons.filter((l) =>
              completed.includes(lessonId(m.slug, l.slug)),
            ).length;
            return (
              <li key={m.slug}>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-brass/70">
                    {String(m.number).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/course/${m.slug}`}
                    className="font-display text-sm text-brass-light no-underline hover:text-neon-pink"
                  >
                    {m.title}
                  </Link>
                </div>
                {hydrated && (
                  <div className="ml-7 mt-1 text-xs text-brass-light/50 font-mono">
                    {moduleCompleted}/{m.lessons.length}
                  </div>
                )}
                <ul className="ml-7 mt-2 space-y-1">
                  {m.lessons.map((l) => {
                    const id = lessonId(m.slug, l.slug);
                    const done = hydrated && completed.includes(id);
                    return (
                      <li key={l.slug} className="text-sm">
                        <Link
                          href={`/course/${m.slug}/${l.slug}`}
                          className={cn(
                            "no-underline flex items-start gap-2",
                            done
                              ? "text-brass"
                              : l.available
                                ? "text-brass-light/80 hover:text-neon-cyan"
                                : "text-brass-light/30 hover:text-brass-light/60",
                          )}
                        >
                          <span aria-hidden className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-current/50" />
                          <span>{l.title}</span>
                          {done && (
                            <span aria-label="complete" className="text-brass">
                              ✦
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 opacity-70">
          <TropicalPlant variant="monstera" className="w-32 mx-auto" />
        </div>
      </aside>
    </>
  );
}
