import { BrassDivider } from "@/components/decorative/BrassDivider";
import { NeonText } from "@/components/decorative/NeonText";

export const metadata = { title: "About · The Penthouse Observatory" };

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 prose-invert">
      <p className="font-mono text-xs uppercase tracking-widest text-brass/70">
        About
      </p>
      <h1 className="font-display">
        Why this exists, in <NeonText color="brass">brass and neon</NeonText>
      </h1>
      <p>
        Three hours of two physicists discussing traversable wormholes, the
        QCD theta term, Lovelock's theorem, the Wu-Yang dictionary, and why
        there are no theoretical physicists on the UFO crash retrieval
        program. You understand maybe 15% of it.
      </p>
      <p>This course fixes that.</p>
      <BrassDivider />
      <h2>Inspiration</h2>
      <p>
        The aesthetic is a love letter to two things: <strong>_why's
        (Poignant) Guide to Ruby</strong> — for the cartoon foxes, the absurd
        humour, the feeling that learning should be an adventure — and{" "}
        <strong>1980s luxury penthouses</strong>: deep navy walls, brass
        accents, glass coffee tables, neon edges, tropical plants, the
        improbable cocktails of the late Cold War.
      </p>
      <p>
        Imagine someone explaining the Bianchi identity at 2 a.m. on the
        47th floor, with the city sleeping below.
      </p>
      <BrassDivider />
      <h2>Tech</h2>
      <p>
        Next.js 15 App Router, MDX, Tailwind, Framer Motion, GSAP,
        React Three Fiber, Zustand. KaTeX for equations. Built openly in{" "}
        <a href="https://github.com">GitHub</a>; deployed to Vercel.
      </p>
      <p>
        The full source-of-truth document — syllabus, exam, design spec, build
        steps — lives in{" "}
        <code>docs/COURSE_PLAN.md</code>.
      </p>
    </article>
  );
}
