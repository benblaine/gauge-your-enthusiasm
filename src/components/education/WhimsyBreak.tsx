import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Character = "fox" | "robot" | "fern" | "raccoon";
type Mood = "contemplative" | "delighted" | "confused" | "smug";

interface WhimsyBreakProps {
  character?: Character;
  mood?: Mood;
  children: ReactNode;
}

const portraits: Record<Character, string> = {
  fox: "🦊",
  robot: "🤖",
  fern: "🌿",
  raccoon: "🦝",
};

const moodHint: Record<Mood, string> = {
  contemplative: "swirling a glass of something amber",
  delighted: "vibrating at a frequency only velvet can hear",
  confused: "frowning at a tensor that won't sit still",
  smug: "having just won an argument with a tropical plant",
};

/**
 * A _why-style cognitive pressure release. Drop one between dense sections.
 *   <WhimsyBreak character="fox" mood="contemplative">
 *     The fox swirled his glass of plum brandy and addressed the integral.
 *   </WhimsyBreak>
 */
export function WhimsyBreak({
  character = "fox",
  mood = "contemplative",
  children,
}: WhimsyBreakProps) {
  return (
    <aside
      className={cn(
        "my-10 p-6 rounded-lg relative overflow-hidden",
        "bg-gradient-to-br from-penthouse-plum/60 to-penthouse-charcoal/40",
        "border border-brass/20 shadow-warm-glow",
      )}
    >
      <div className="flex gap-4 items-start">
        <div
          aria-hidden
          className="text-4xl drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] shrink-0"
        >
          {portraits[character]}
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest font-accent text-brass/60 mb-2">
            {character} · {moodHint[mood]}
          </p>
          <div className="font-display italic text-brass-light/90 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
