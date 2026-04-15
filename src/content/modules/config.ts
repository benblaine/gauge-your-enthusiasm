/**
 * The 10-module structure of the Penthouse Observatory course.
 *
 * Source: docs/COURSE_PLAN.md (Part 1).
 */

export interface LessonMeta {
  slug: string;
  title: string;
  estimatedMinutes: number;
  /** Set true if the lesson MDX file exists in src/content/modules/<module>/<lesson>.mdx */
  available?: boolean;
}

export interface ModuleMeta {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  topics: string;
  estimatedHours: number;
  weeks: number;
  prerequisites: string[]; // slugs
  accentColor: "brass" | "pink" | "cyan" | "violet" | "emerald" | "sapphire" | "ruby" | "amethyst";
  lessons: LessonMeta[];
}

export const MODULES: ModuleMeta[] = [
  {
    slug: "01-language-of-physics",
    number: 1,
    title: "The Language of Physics",
    subtitle: "Calculus, Linear Algebra, and Tensors",
    description:
      "Master Einstein summation, index notation, and the metric tensor — the vocabulary every later module assumes you speak.",
    topics: "Tensors, indices, Einstein summation, metric tensor",
    estimatedHours: 60,
    weeks: 6,
    prerequisites: [],
    accentColor: "brass",
    lessons: [
      { slug: "what-is-a-tensor", title: "What Is a Tensor, Really?", estimatedMinutes: 35, available: true },
      { slug: "einstein-summation", title: "Einstein Summation Convention", estimatedMinutes: 30 },
      { slug: "metric-tensor", title: "The Metric Tensor", estimatedMinutes: 45 },
    ],
  },
  {
    slug: "02-reimagining-mechanics",
    number: 2,
    title: "Reimagining Mechanics",
    subtitle: "From Newton to Lagrange to Hamilton",
    description:
      "Why F = ma is the wrong starting point. Action principles, phase space, and the symplectic form behind every conservation law.",
    topics: "Lagrangian, Hamiltonian, phase space, symplectic form",
    estimatedHours: 70,
    weeks: 7,
    prerequisites: ["01-language-of-physics"],
    accentColor: "pink",
    lessons: [
      { slug: "principle-of-least-action", title: "The Principle of Least Action", estimatedMinutes: 40 },
      { slug: "euler-lagrange", title: "The Euler-Lagrange Equation", estimatedMinutes: 45, available: true },
      { slug: "phase-space", title: "Phase Space and the Symplectic Form", estimatedMinutes: 50 },
    ],
  },
  {
    slug: "03-light-and-spacetime",
    number: 3,
    title: "Light & Spacetime",
    subtitle: "Maxwell, Special Relativity, the Birth of Gauge Invariance",
    description:
      "Maxwell's four equations collapse into dF = 0, d★F = J — and the gauge potential A_μ becomes the most important quantity in physics.",
    topics: "Maxwell's equations, Faraday tensor, special relativity",
    estimatedHours: 100,
    weeks: 10,
    prerequisites: ["01-language-of-physics", "02-reimagining-mechanics"],
    accentColor: "cyan",
    lessons: [
      { slug: "maxwell-in-tensor-form", title: "Maxwell's Equations in Tensor Form", estimatedMinutes: 50, available: true },
      { slug: "gauge-invariance", title: "Gauge Invariance: Unphysical but Essential", estimatedMinutes: 45 },
      { slug: "minkowski-spacetime", title: "Minkowski Spacetime", estimatedMinutes: 40 },
    ],
  },
  {
    slug: "04-the-quantum-world",
    number: 4,
    title: "The Quantum World",
    subtitle: "Hilbert Spaces, Operators, and the Manhattan Project",
    description:
      "Wave functions as vectors, observables as operators, and why the uncertainty principle is a theorem about commutators, not a story about microscopes.",
    topics: "QM, Hilbert space, nuclear physics, Manhattan Project",
    estimatedHours: 100,
    weeks: 10,
    prerequisites: ["02-reimagining-mechanics"],
    accentColor: "violet",
    lessons: [
      { slug: "hilbert-space", title: "States Live in Hilbert Space", estimatedMinutes: 45, available: true },
      { slug: "uncertainty-principle", title: "Deriving the Uncertainty Principle", estimatedMinutes: 40 },
      { slug: "restricted-data", title: "Nuclear Physics & Restricted Data", estimatedMinutes: 35 },
    ],
  },
  {
    slug: "05-gravity-as-geometry",
    number: 5,
    title: "Gravity as Geometry",
    subtitle: "The Full Einstein Field Equations",
    description:
      "Riemann → Ricci → Einstein. The G/c⁴ problem. Why warping spacetime takes so much energy you can read it off the constants.",
    topics: "Full general relativity — Riemann → Ricci → Einstein",
    estimatedHours: 120,
    weeks: 12,
    prerequisites: ["03-light-and-spacetime"],
    accentColor: "emerald",
    lessons: [
      { slug: "equivalence-principle", title: "The Equivalence Principle", estimatedMinutes: 35 },
      { slug: "riemann-curvature", title: "Riemann Curvature", estimatedMinutes: 60, available: true },
      { slug: "einstein-equations", title: "The Einstein Field Equations", estimatedMinutes: 70 },
    ],
  },
  {
    slug: "06-particles-and-cosmos",
    number: 6,
    title: "Particles & Cosmos",
    subtitle: "The Standard Model and Modern Cosmology",
    description:
      "SU(3)×SU(2)×U(1), the Higgs mechanism, asymptotic freedom, and the worst prediction in physics: the cosmological constant.",
    topics: "Standard Model, QCD, QED, dark energy, cosmology",
    estimatedHours: 120,
    weeks: 12,
    prerequisites: ["04-the-quantum-world", "05-gravity-as-geometry"],
    accentColor: "sapphire",
    lessons: [
      { slug: "standard-model-tour", title: "A Tour of the Standard Model", estimatedMinutes: 60, available: true },
      { slug: "qcd-confinement", title: "QCD: Asymptotic Freedom & Confinement", estimatedMinutes: 50 },
      { slug: "cosmological-constant", title: "The Cosmological Constant Problem", estimatedMinutes: 45 },
    ],
  },
  {
    slug: "07-geometric-backbone",
    number: 7,
    title: "The Geometric Backbone",
    subtitle: "Differential Geometry, Forms, and Gauge Theory",
    description:
      "The mathematical heart of the course. Manifolds, fiber bundles, connections, and the Wu-Yang dictionary that translates physics into geometry.",
    topics: "Differential geometry, fiber bundles, gauge theory, forms",
    estimatedHours: 140,
    weeks: 14,
    prerequisites: ["05-gravity-as-geometry", "06-particles-and-cosmos"],
    accentColor: "amethyst",
    lessons: [
      { slug: "manifolds-and-tangent-spaces", title: "Manifolds & Tangent Spaces", estimatedMinutes: 55 },
      { slug: "fiber-bundles", title: "Fiber Bundles & Connections", estimatedMinutes: 70, available: true },
      { slug: "wu-yang-dictionary", title: "The Wu-Yang Dictionary", estimatedMinutes: 50 },
    ],
  },
  {
    slug: "08-topology-and-dark-sector",
    number: 8,
    title: "Topology & the Dark Sector",
    subtitle: "Lovelock, DESI, Chern-Simons, the QCD θ Term",
    description:
      "Why Einstein's equations are essentially unique in 4D, why DESI's 4.2σ result demands new physics, and what F∧F really means.",
    topics: "Lovelock, DESI, Chern-Simons, QCD theta term",
    estimatedHours: 80,
    weeks: 8,
    prerequisites: ["07-geometric-backbone"],
    accentColor: "ruby",
    lessons: [
      { slug: "lovelock-uniqueness", title: "Lovelock's Uniqueness Theorem", estimatedMinutes: 45, available: true },
      { slug: "desi-dark-energy", title: "DESI and Dynamical Dark Energy", estimatedMinutes: 40 },
      { slug: "chern-simons", title: "Chern-Simons & the θ Term", estimatedMinutes: 60 },
    ],
  },
  {
    slug: "09-frontier-physics",
    number: 9,
    title: "Frontier Physics",
    subtitle: "Strings, Wormholes, Aharonov-Bohm, Geometric Unity",
    description:
      "Where consensus ends and the conversation gets dangerous. String critique, exotic matter, and Weinstein's 14-dimensional observerse.",
    topics: "String critique, wormholes, Aharonov-Bohm, GU",
    estimatedHours: 80,
    weeks: 8,
    prerequisites: ["07-geometric-backbone"],
    accentColor: "pink",
    lessons: [
      { slug: "aharonov-bohm", title: "The Aharonov-Bohm Effect", estimatedMinutes: 50, available: true },
      { slug: "wormholes-and-warp", title: "Wormholes and Warp Drives", estimatedMinutes: 50 },
      { slug: "geometric-unity", title: "Geometric Unity: A Critical Reading", estimatedMinutes: 60 },
    ],
  },
  {
    slug: "10-edge-of-knowledge",
    number: 10,
    title: "Edge of Knowledge",
    subtitle: "Entanglement, Tensor Networks, Extra Dimensions",
    description:
      "ER=EPR, Ryu-Takayanagi, Majorana fermions, Fisher information, and why (3+1) might be the only signature compatible with observers.",
    topics: "Entanglement, tensor networks, Fisher info, extra dimensions",
    estimatedHours: 60,
    weeks: 6,
    prerequisites: ["08-topology-and-dark-sector", "09-frontier-physics"],
    accentColor: "cyan",
    lessons: [
      { slug: "er-equals-epr", title: "ER = EPR", estimatedMinutes: 50, available: true },
      { slug: "ryu-takayanagi", title: "The Ryu-Takayanagi Formula", estimatedMinutes: 45 },
      { slug: "kaluza-klein", title: "Kaluza-Klein & Pinch-to-Zoom", estimatedMinutes: 40 },
    ],
  },
];

export const TOTAL_LESSONS = MODULES.reduce((n, m) => n + m.lessons.length, 0);
export const TOTAL_HOURS = MODULES.reduce((n, m) => n + m.estimatedHours, 0);

export function getModule(slug: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string,
): { module: ModuleMeta; lesson: LessonMeta } | undefined {
  const module = getModule(moduleSlug);
  if (!module) return undefined;
  const lesson = module.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { module, lesson };
}

export function lessonId(moduleSlug: string, lessonSlug: string): string {
  return `${moduleSlug}/${lessonSlug}`;
}

/** Adjacent (prev, next) lessons across the entire course. */
export function getAdjacent(moduleSlug: string, lessonSlug: string) {
  const flat = MODULES.flatMap((m) =>
    m.lessons.map((l) => ({ moduleSlug: m.slug, lessonSlug: l.slug, lesson: l, module: m })),
  );
  const idx = flat.findIndex(
    (e) => e.moduleSlug === moduleSlug && e.lessonSlug === lessonSlug,
  );
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}
