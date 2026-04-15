import Link from "next/link";
import { MODULES, TOTAL_HOURS, TOTAL_LESSONS } from "@/content/modules/config";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { NeonText } from "@/components/decorative/NeonText";
import { BrassDivider } from "@/components/decorative/BrassDivider";
import { TropicalPlant } from "@/components/decorative/TropicalPlant";
import { WhimsyBreak } from "@/components/education/WhimsyBreak";

export default function Home() {
  return (
    <div className="px-4 md:px-8">
      {/* HERO */}
      <section className="relative max-w-7xl mx-auto pt-16 md:pt-28 pb-20">
        <p className="font-accent text-xs md:text-sm uppercase tracking-[0.3em] text-brass/70 mb-6">
          A field guide to a three-hour podcast
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
          The{" "}
          <NeonText color="brass" flicker as="span">
            Penthouse
          </NeonText>{" "}
          Observatory
        </h1>
        <p className="mt-6 text-xl text-brass-light/85 max-w-2xl text-pretty">
          From South African matric physics to the metric tensor and beyond.
          Ten modules, thirty topics, ~{TOTAL_HOURS} hours of curated material —
          enough to follow Eric Weinstein arguing with Eric Davis about gauging
          gravity at 2 a.m. in a velvet smoking jacket.
        </p>
        <div className="mt-10 flex gap-4 flex-wrap">
          <Link href="/course" className="no-underline">
            <span className="neon-button text-base inline-block">
              Begin your ascent →
            </span>
          </Link>
          <Link href="/course/exam" className="no-underline">
            <span className="neon-button text-base inline-block !border-neon-pink/40">
              Skip to the exam
            </span>
          </Link>
        </div>

        <TropicalPlant
          variant="monstera"
          className="hidden md:block absolute top-10 right-0 w-48 opacity-30 pointer-events-none"
        />
      </section>

      <BrassDivider ornament />

      {/* MEET THE CAST */}
      <section className="max-w-5xl mx-auto py-16">
        <h2 className="font-display text-3xl md:text-4xl mb-6">
          Meet the cast
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WhimsyBreak character="fox" mood="contemplative">
            "What if," the fox murmured to his pet fern, adjusting his velvet
            smoking jacket, "instead of tracking every force on every
            particle… we just asked nature what path it{" "}
            <em>prefers</em>?"
          </WhimsyBreak>
          <WhimsyBreak character="robot" mood="confused">
            The brass-plated robot stared at the gauge transformation. "So the
            field is the same… but the potential is different. So the
            potential isn't real. But also it is. <em>Beep.</em>"
          </WhimsyBreak>
          <WhimsyBreak character="raccoon" mood="smug">
            The raccoon had won three arguments with the monstera tonight: one
            about Lovelock, one about Chern-Simons, and one about whether 47th
            floor cocktails counted as "fieldwork."
          </WhimsyBreak>
          <WhimsyBreak character="fern" mood="delighted">
            The fern was, against all odds, beginning to understand fiber
            bundles. It vibrated faintly under the bokeh of the city.
          </WhimsyBreak>
        </div>
      </section>

      <BrassDivider ornament />

      {/* MODULE GRID */}
      <section className="max-w-7xl mx-auto py-16">
        <h2 className="font-display text-3xl md:text-4xl mb-2">
          The ten-storey climb
        </h2>
        <p className="text-brass-light/70 mb-8 max-w-3xl">
          Each module is one floor of the observatory. The elevator opens onto
          a dimly lit lounge with cocktails, equations, and a small cartoon
          character ready to explain something absurdly important.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((m) => (
            <Link key={m.slug} href={`/course/${m.slug}`} className="no-underline">
              <GlassPanel className="h-full hover:shadow-warm-glow transition">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-xs text-brass/70 tracking-widest">
                    FLOOR {String(m.number).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-brass-light/50">
                    ~{m.estimatedHours}h
                  </span>
                </div>
                <h3 className="font-display text-xl mt-0 mb-1 text-brass-light">
                  {m.title}
                </h3>
                <p className="text-sm text-brass-light/60 italic mb-3">
                  {m.subtitle}
                </p>
                <p className="text-sm text-brass-light/80">{m.description}</p>
              </GlassPanel>
            </Link>
          ))}
        </div>

        <p className="text-xs text-brass-light/50 mt-12 font-mono text-center">
          {TOTAL_LESSONS} lessons total · accelerated path ≈ 400 h · full mastery ≈ 930 h
        </p>
      </section>

      {/* CLOSING */}
      <section className="max-w-3xl mx-auto py-16 text-center">
        <BrassDivider ornament />
        <blockquote className="font-display italic text-2xl md:text-3xl text-brass-light/85 mt-8 leading-relaxed">
          "You have craft that defy the laws of physics and no physicists.
          It's a two-line proof. It defies the laws of physics — who do you
          call?"
        </blockquote>
        <p className="mt-4 text-sm text-brass/70 font-mono">— Eric Weinstein</p>
        <p className="mt-10 text-brass-light/70">
          This course exists so that when someone finally does call,{" "}
          <NeonText color="cyan">you can pick up the phone.</NeonText>
        </p>
      </section>
    </div>
  );
}
