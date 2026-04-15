# matric-to-metric  
  
**From South African matric physics to the metric tensor and beyond.**  
  
An interactive web course that takes you from high school physics to understanding the frontier theoretical physics discussed in the [Eric Weinstein × Eric Davis podcast](https://www.youtube.com/watch?v=example) on Jesse Michels’ *American Alchemy*. By the end, you follow every word — gauge theory, Chern-Simons, the theta term, Geometric Unity, all of it.  
  
Built as a love letter to [_why’s (Poignant) Guide to Ruby](https://poignant.guide/) and late-80s penthouse aesthetics.  
  
-----  
  
## The problem  
  
Three hours of two physicists talking about traversable wormholes, the QCD theta term, Lovelock’s theorem, the Wu-Yang dictionary, and why there are no theoretical physicists on the UFO crash retrieval program. You understand maybe 15% of it. This course fixes that.  
  
## The solution  
  
10 modules. 30 physics topics. ~930 hours of material compressed into an interactive web app with 3D simulations, scrollytelling equation derivations, and cartoon foxes in velvet smoking jackets explaining gauge invariance to tropical plants.  
  
## What you’ll learn  
  
|Module                       |What it covers                                              |Hours|  
|-----------------------------|------------------------------------------------------------|-----|  
|1. The Language of Physics   |Tensors, indices, Einstein summation, metric tensor         |~60  |  
|2. Reimagining Mechanics     |Lagrangian, Hamiltonian, phase space, symplectic form       |~70  |  
|3. Light & Spacetime         |Maxwell’s equations, Faraday tensor, special relativity     |~100 |  
|4. The Quantum World         |QM, Hilbert space, nuclear physics, Manhattan Project       |~100 |  
|5. Gravity as Geometry       |Full general relativity — Riemann → Ricci → Einstein        |~120 |  
|6. Particles & Cosmos        |Standard Model, QCD, QED, dark energy, cosmology            |~120 |  
|7. The Geometric Backbone    |Differential geometry, fiber bundles, gauge theory, forms   |~140 |  
|8. Topology & the Dark Sector|Lovelock, DESI, Chern-Simons, QCD theta term                |~80  |  
|9. Frontier Physics          |String theory critique, wormholes, Aharonov-Bohm, GU        |~80  |  
|10. Edge of Knowledge        |Entanglement, tensor networks, Fisher info, extra dimensions|~60  |  
  
The accelerated path (conceptual grasp, not mastery) compresses to ~400 hours.  
  
## The aesthetic  
  
The UI is called **The Penthouse Observatory**. It draws from two sources:  
  
**_why’s (Poignant) Guide to Ruby** — Narrative framing, recurring cartoon characters, absurdist humor as cognitive pressure release, the feeling that learning should be an adventure not a chore.  
  
**1980s–90s luxury penthouse interiors** — Deep navy and charcoal backgrounds, brass/gold accents, jewel tones, glassmorphism panels, neon interactive highlights, tropical plant illustrations, city skyline bokeh. Think: a penthouse lounge at 2am where someone is explaining the Bianchi identity over cocktails.  
  
<p align="center">  
  <em>"What if," the fox murmured to his pet fern, adjusting his velvet smoking jacket,<br/>  
  "instead of tracking every force on every particle...<br/>  
  we just asked nature what path it PREFERS?"</em>  
</p>  
  
## Tech stack  
  
|Layer       |Tech                                  |  
|------------|--------------------------------------|  
|Framework   |Next.js 15 (App Router)               |  
|Language    |TypeScript                            |  
|Styling     |Tailwind CSS 4                        |  
|UI          |shadcn/ui + Radix                     |  
|Animation   |Framer Motion + GSAP ScrollTrigger    |  
|3D          |React Three Fiber + drei              |  
|2D Physics  |Matter.js                             |  
|Data Viz    |D3.js                                 |  
|Equations   |KaTeX (via remark-math + rehype-katex)|  
|Content     |MDX                                   |  
|State       |Zustand (persisted)                   |  
|Code Sandbox|Sandpack                              |  
|Deployment  |Vercel                                |  
  
## Project structure  
  
```  
src/  
├── app/  
│   ├── layout.tsx              # Root layout, fonts, theme  
│   ├── page.tsx                # Landing page — The Penthouse Observatory  
│   └── course/  
│       ├── layout.tsx          # Course shell with sidebar  
│       ├── [moduleSlug]/  
│       │   └── [lessonSlug]/  
│       │       └── page.tsx    # Dynamic MDX lesson renderer  
│       └── exam/  
│           └── page.tsx        # 25-question podcast comprehension exam  
├── components/  
│   ├── ui/                     # shadcn themed components  
│   ├── layout/                 # Navbar, Sidebar, GlassPanel, Footer  
│   ├── physics/                # SimCanvas, Scene3D, PhaseSpace, VectorField  
│   ├── education/              # MathBlock, Quiz, ScrollySection, WhimsyBreak  
│   ├── decorative/             # NeonText, BrassDivider, TropicalPlant, CityLights  
│   └── animations/             # PageTransition, MathAnimation  
├── content/modules/            # MDX lesson files per module  
├── lib/physics/                # Pure simulation logic  
├── stores/                     # Zustand progress + simulation state  
├── hooks/                      # useSimulation, useProgress, useScrollytelling  
└── styles/theme.ts             # Design tokens  
```  
  
## Getting started  
  
```bash  
# Clone  
git clone https://github.com/yourusername/matric-to-metric.git  
cd matric-to-metric  
  
# Install  
npm install  
  
# Dev  
npm run dev  
  
# Build  
npm run build  
```  
  
Open <http://localhost:3000>.  
  
## Course plan  
  
The full research document — syllabus, curated resources for all 30 topics, 25-question podcast comprehension exam, complete web app specification, and Claude Code build instructions — lives at:  
  
**[`/docs/COURSE_PLAN.md`](./docs/COURSE_PLAN.md)**  
  
This is the source of truth for all course content and design decisions.  
  
## The resource chain  
  
If you only follow one path through self-study:  
  
> **3Blue1Brown Linear Algebra → Eigenchris Tensors for Beginners → Eigenchris Tensor Calculus → Eigenchris Relativity → Frederic Schuller Geometric Anatomy → David Tong Gauge Theory notes → Gregory Moore Chern-Simons TASI notes**  
  
This builds the complete mathematical machinery from high school to following Weinstein’s arguments about gauging gravity.  
  
## The podcast’s central question  
  
> *“You have craft that defy the laws of physics and no physicists. It’s a two-line proof. It defies the laws of physics — who do you call?”*  
>   
> — Eric Weinstein  
  
This course exists so that when someone finally does call, you can pick up the phone.  
  
## Contributing  
  
This is a personal learning project being built with Claude Code. If you want to contribute content, simulations, or design work, open an issue first.  
  
## License  
  
MIT  
  
-----  
  
<p align="center">  
  <sub>Built in Stellenbosch with caffeine, curiosity, and an unreasonable number of Claude conversations.</sub>  
</p>  
