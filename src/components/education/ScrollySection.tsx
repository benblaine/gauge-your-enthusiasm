"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { cn } from "@/lib/utils";

export interface ScrollyStep {
  /** The narrative text shown in the scrolling column. */
  narrative: ReactNode;
  /** The visual content shown pinned in the sticky column. */
  visual: ReactNode;
}

interface ScrollySectionProps {
  steps: ScrollyStep[];
  /** Heading shown above the section. */
  title?: string;
}

/**
 * GSAP-style pin-and-release scrollytelling, implemented with
 * IntersectionObserver to avoid pulling GSAP into the SSR path.
 * For richer choreography (timelines, scrubbing) wire ScrollTrigger
 * here later — the API stays stable.
 */
export function ScrollySection({ steps, title }: ScrollySectionProps) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio > 0.5) setActive(i);
          });
        },
        { threshold: [0.5, 0.75, 1] },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [steps.length]);

  return (
    <section className="my-12">
      {title && (
        <h3 className="font-display text-2xl mb-6 text-brass-light">{title}</h3>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Sticky visual */}
        <div className="lg:sticky lg:top-24 order-2 lg:order-1">
          <GlassPanel className="min-h-[360px] flex items-center justify-center">
            {steps[active]?.visual}
          </GlassPanel>
          <div className="flex gap-2 mt-3 justify-center">
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 w-8 rounded-full transition-all",
                  i === active ? "bg-neon-pink shadow-neon-pink" : "bg-brass/30",
                )}
              />
            ))}
          </div>
        </div>
        {/* Scrolling narrative */}
        <div className="space-y-32 order-1 lg:order-2 py-16">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={cn(
                "transition-opacity duration-500",
                i === active ? "opacity-100" : "opacity-60",
              )}
            >
              {s.narrative}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
