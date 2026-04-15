# gauge-your-enthusiasm

**The Penthouse Observatory** — an interactive web course taking you from
South African matric physics to following the Weinstein × Davis podcast
discussion of gauge theory, Chern-Simons, the QCD theta term, and Geometric
Unity.

This file is the short README. The original long-form pitch lives at
[`Readme.md`](./Readme.md). The full source-of-truth document — syllabus,
exam, design spec, build steps — lives at
[`docs/COURSE_PLAN.md`](./docs/COURSE_PLAN.md).

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run typecheck  # TypeScript check without emit
npm run lint       # next lint
```

## What's in here

- `src/app/` — Next.js App Router pages (landing, course shell, dynamic
  lessons, comprehension exam)
- `src/components/` — UI primitives:
  - `decorative/` — penthouse aesthetic (NeonText, BrassDivider, GlassPanel,
    CityLights, TropicalPlant)
  - `layout/` — Navbar, Sidebar, Footer
  - `physics/` — interactive simulations (SimCanvas pendulum, Scene3D Flamm
    embedding, PhaseSpace, VectorField)
  - `education/` — Quiz, WhimsyBreak, ScrollySection, LessonComplete
  - `mdx/` — MDX component overrides
- `src/content/modules/` — module config + seed MDX lessons (one per
  module, ten total)
- `src/content/exam/` — the 25-question podcast comprehension exam
- `src/lib/physics/` — pure simulation primitives
- `src/stores/` — Zustand progress store (persisted to localStorage)
- `docs/COURSE_PLAN.md` — the syllabus / spec / build plan
- `docs/podcast-transcript.txt` — source material

## Status

Scaffolded shell with one authored lesson per module + the full 25-question
exam. Remaining ~20 lessons are stubbed out in `src/content/modules/config.ts`
with `available: false` and degrade gracefully — they show a "scaffolded but
not yet authored" placeholder.

MIT licensed.
