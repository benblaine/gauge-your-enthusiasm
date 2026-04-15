import Link from "next/link";
import { MODULES, TOTAL_HOURS, TOTAL_LESSONS } from "@/content/modules/config";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { NeonText } from "@/components/decorative/NeonText";
import { BrassDivider } from "@/components/decorative/BrassDivider";

export const metadata = {
  title: "Course · The Penthouse Observatory",
};

export default function CourseIndex() {
  return (
    <article className="prose-invert max-w-none">
      <h1 className="font-display">
        The Course, <NeonText color="brass" flicker>End to End</NeonText>
      </h1>
      <p className="text-lg text-brass-light/80 max-w-3xl">
        Ten modules. Thirty topics. ~{TOTAL_HOURS} hours of curated material to
        take you from matric physics to following Eric Weinstein's arguments
        about gauging gravity. Pick any seeded lesson to begin —
        the others are scaffolded but not yet authored.
      </p>
      <BrassDivider />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MODULES.map((m) => (
          <Link
            key={m.slug}
            href={`/course/${m.slug}`}
            className="no-underline group"
          >
            <GlassPanel className="h-full hover:shadow-warm-glow transition-shadow">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-xs text-brass/70 tracking-widest">
                  MODULE {String(m.number).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-brass-light/50">
                  ~{m.estimatedHours}h
                </span>
              </div>
              <h3 className="font-display text-xl mt-0 mb-1 text-brass-light group-hover:text-neon-pink transition">
                {m.title}
              </h3>
              <p className="text-sm text-brass-light/60 italic mb-3">
                {m.subtitle}
              </p>
              <p className="text-sm text-brass-light/80">{m.description}</p>
              <p className="text-xs mt-4 text-brass/60 font-mono">
                {m.lessons.length} lessons ·{" "}
                {m.lessons.filter((l) => l.available).length} authored
              </p>
            </GlassPanel>
          </Link>
        ))}
      </div>

      <p className="text-xs text-brass-light/50 mt-12 font-mono text-center">
        {TOTAL_LESSONS} lessons total · accelerated path ≈ 400 h · full mastery ≈ 930 h
      </p>
    </article>
  );
}
