/**
 * The 25-question Podcast Comprehension Exam.
 * Source: docs/COURSE_PLAN.md Part 2.
 *
 * Each question is presented in self-graded long-form ("write your answer,
 * then reveal the canonical response"). The Quiz component supports
 * `short-answer` for this; the canonical answer is stored as the marking
 * rubric the student compares against.
 */

import type { QuizQuestion } from "@/components/education/Quiz";

export interface ExamQuestion {
  number: number;
  tier: "foundations" | "intermediate" | "advanced";
  question: string;
  /** Marking-rubric / canonical answer the student compares their work against. */
  rubric: string;
}

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    number: 1,
    tier: "foundations",
    question:
      "Why is the Lagrangian/Hamiltonian reformulation essential for modern physics, and how does the Poisson bracket {q,p}=1 connect to the quantum commutator [x̂,p̂]=iℏ?",
    rubric:
      "Lagrangian/Hamiltonian formulations expose symmetries (Noether) and are coordinate-invariant. Quantization rule: replace {·,·}_PB → (1/iℏ)[·,·]_QM. So {q,p}=1 maps directly to [x̂,p̂]=iℏ.",
  },
  {
    number: 2,
    tier: "foundations",
    question:
      "If A_μ is gauge-dependent, why can't we simply eliminate it from physics?",
    rubric:
      "The Aharonov-Bohm effect proves A carries observable information through holonomy ∮A·dl. Locally A is gauge but globally Wilson loops are physical. You can't eliminate A without losing minimal coupling and the geometric interpretation of the gauge field as a connection.",
  },
  {
    number: 3,
    tier: "foundations",
    question: "Compute 8πG/c⁴ in SI and explain its physical meaning.",
    rubric:
      "8πG/c⁴ ≈ 2.08 × 10⁻⁴³ s²·kg⁻¹·m⁻¹. Stress-energy of order 10⁴³ J/m³ is needed to bend spacetime by ~unit curvature. Gravity is absurdly weak per unit energy density.",
  },
  {
    number: 4,
    tier: "foundations",
    question:
      "Derive the uncertainty principle from [x̂,p̂]=iℏ via Cauchy-Schwarz.",
    rubric:
      "For Hermitian Â,B̂ with [Â,B̂]=iĈ: (ΔA)²(ΔB)² ≥ (½|⟨[Â,B̂]⟩|)² = ¼ℏ²⟨1⟩². Hence ΔxΔp ≥ ℏ/2.",
  },
  {
    number: 5,
    tier: "foundations",
    question:
      "What is 'Restricted Data' and why does it matter for the Teller-Ulam discussion?",
    rubric:
      "Restricted Data is a 'born-classified' category under the Atomic Energy Act 1946/54 — nuclear weapon design info is classified at birth regardless of who generated it. Teller-Ulam stays RD even decades later, constraining what physicists can publicly discuss.",
  },
  {
    number: 6,
    tier: "intermediate",
    question:
      "Write G_μν + Λg_μν = (8πG/c⁴)T_μν, identify each symbol, and explain why ∇_μG^μν = 0 forces energy conservation.",
    rubric:
      "G_μν = R_μν − ½Rg_μν (Einstein tensor); Λ cosmological constant; T_μν stress-energy. The contracted Bianchi identity ∇_μG^μν = 0 implies ∇_μT^μν = 0 — local conservation falls out of geometry.",
  },
  {
    number: 7,
    tier: "intermediate",
    question:
      "Decompose SU(3)×SU(2)×U(1): which factor generates which force, and why does the Higgs leave the photon massless?",
    rubric:
      "SU(3)_color → strong/QCD/gluons; SU(2)_L × U(1)_Y → electroweak; after EWSB the unbroken U(1)_em remains. The photon is the linear combo of W³ and B that the Higgs vacuum doesn't couple to, hence stays massless.",
  },
  {
    number: 8,
    tier: "intermediate",
    question:
      "Explain asymptotic freedom and confinement in QCD; why are these unique to non-abelian gauge theory?",
    rubric:
      "Gluon self-coupling makes β(g) negative — coupling shrinks at high energies (asymptotic freedom). At low energies the colour flux tube has constant tension, so pulling quarks apart costs unbounded energy and creates new pairs (confinement). QED has no self-coupling so neither happens.",
  },
  {
    number: 9,
    tier: "intermediate",
    question:
      "State the cosmological constant problem quantitatively.",
    rubric:
      "Naive QFT vacuum energy ~M_Pl⁴ ≈ 10¹¹³ J/m³; observed Λ-energy ~10⁻⁹ J/m³ — discrepancy ≈ 10¹²⁰. Even cut at the electroweak scale you're off by ~10⁵⁵.",
  },
  {
    number: 10,
    tier: "intermediate",
    question:
      "What are baryon acoustic oscillations, how does DESI use them, and what does w ≠ −1 imply?",
    rubric:
      "BAOs are sound-horizon-scale density imprints in galaxy distribution. DESI measures the BAO scale at many redshifts to track expansion history. w ≠ −1 (or w(z) varying) means dark energy isn't a simple constant Λ — implies dynamical scalar field or modified gravity.",
  },
  {
    number: 11,
    tier: "intermediate",
    question:
      "Distinguish the Ricci tensor, scalar curvature, and Weyl tensor.",
    rubric:
      "Ricci R_μν: trace of Riemann, sources volume distortion (matter). R: scalar trace. Weyl C_ρσμν: trace-free part, encodes tidal/free-gravity (e.g. gravitational waves). In FLRW the Weyl tensor vanishes — homogeneity forbids tidal distortion.",
  },
  {
    number: 12,
    tier: "intermediate",
    question:
      "What is a Feynman diagram physically, and what does 'virtual particle' really mean?",
    rubric:
      "A Feynman diagram is a perturbation-theory bookkeeping device for terms in the Dyson expansion. Virtual particles are off-shell propagator lines, not propagating physical states.",
  },
  {
    number: 13,
    tier: "intermediate",
    question:
      "Why is renormalization in QED necessary, and how can a 'dippy' procedure give 10-decimal accuracy?",
    rubric:
      "Loop integrals diverge; renormalization absorbs infinities into measured couplings/masses. Predictions for relations between observables remain finite and absurdly precise. The procedure is principled (Wilsonian: theory is effective, infinities reflect UV-incomplete description).",
  },
  {
    number: 14,
    tier: "intermediate",
    question:
      "State the H₀ tension and why it resists systematics.",
    rubric:
      "Late-universe (Cepheid+SNe Ia, SH0ES) ≈ 73 km/s/Mpc; early-universe (CMB+ΛCDM, Planck) ≈ 67. Many independent calibration paths now agree per side, pushing the tension above 6σ. Hard to write off as one method's error.",
  },
  {
    number: 15,
    tier: "intermediate",
    question:
      "QED predicts g − 2 to ~10⁻¹². Why is that remarkable, and what would a discrepancy mean?",
    rubric:
      "Five-loop QED + hadronic + EW contributions match experiment. A persistent discrepancy would signal new physics (heavy particles in loops). Currently the muon g − 2 has unresolved tension; electron g − 2 agrees.",
  },
  {
    number: 16,
    tier: "advanced",
    question:
      "Reproduce ≥5 entries of the Wu-Yang dictionary; explain 'the Standard Model is geometry'.",
    rubric:
      "Gauge potential ↔ connection on a principal bundle; field strength ↔ curvature 2-form; gauge transformation ↔ change of section; matter field ↔ section of associated vector bundle; minimal coupling ↔ covariant derivative; gauge orbit ↔ gauge equivalence class. SM forces are curvatures of bundles, not 'forces in space'.",
  },
  {
    number: 17,
    tier: "advanced",
    question:
      "State Lovelock's theorem and explain why dynamical dark energy needs new field content.",
    rubric:
      "In 4D, the only divergence-free symmetric (0,2)-tensor built from g, ∂g, ∂²g and linear in ∂² is aG_μν + bg_μν. So if Λ is varying, you can't get it from the metric alone — must add scalar/tensor field content.",
  },
  {
    number: 18,
    tier: "advanced",
    question:
      "Aharonov-Bohm setup, result, and meta-lesson.",
    rubric:
      "Electrons split around a solenoid carrying flux Φ in a region where B=0. Interference shifts by Δφ = (e/ℏ)Φ even though no field acts on the electron. A is physical via holonomy; classical EM was 'complete' for a century before this revealed hidden gauge structure.",
  },
  {
    number: 19,
    tier: "advanced",
    question:
      "Why does Weinstein say 'extended electrodynamics' (d_A★F = A) breaks gauge invariance fatally?",
    rubric:
      "The right-hand-side A is not gauge-covariant: under A→A+dχ it gains a non-gauge-covariant term. The LHS is gauge-covariant. So the equation is not consistent across gauges; physical predictions become gauge-dependent — non-conservation of charge or undefined dynamics.",
  },
  {
    number: 20,
    tier: "advanced",
    question:
      "Explain Geometric Unity's Y¹⁴ observerse, the contraction/gauge symmetry asymmetry, and Nguyen's critique of the shiab operator.",
    rubric:
      "Y¹⁴ = Met(X⁴): bundle of Lorentzian metrics over 4-space → 4 + 10 = 14. GR allows index contractions but no internal gauge; SM has internal gauge but no contractions of vector bundles into the base. GU tries to combine both; the 'shiab' (ship-in-a-bottle) operator is intended to map Riemannian curvature into the spinor bundle but Nguyen argues its definition is inconsistent or unspecified.",
  },
  {
    number: 21,
    tier: "advanced",
    question:
      "QCD θ-term: why is F∧F topological? How does transgression connect Pontryagin to Chern-Simons? What is the strong CP problem?",
    rubric:
      "tr(F∧F) is the Pontryagin density, a closed 4-form whose integral is a topological invariant (instanton number). Locally tr(F∧F) = d·CS(A), so Chern-Simons is the transgression form. Strong CP: θ contributes to neutron EDM; experiment forces |θ̄| < 10⁻¹⁰ — fine-tuning.",
  },
  {
    number: 22,
    tier: "advanced",
    question:
      "Why can't you mine vacuum energy via the Casimir effect?",
    rubric:
      "Bringing plates together releases energy; pulling apart costs exactly that much. The vacuum is a ground state — no net cycle. Connects to symplectic/area-preserving phase-space flow: closed thermodynamic loops have zero net work in a conservative system.",
  },
  {
    number: 23,
    tier: "advanced",
    question:
      "Explain ER=EPR and Ryu-Takayanagi; what does emergent spacetime mean?",
    rubric:
      "ER=EPR: maximally entangled pairs are dual to non-traversable wormholes. Ryu-Takayanagi: S_A = Area(γ_A)/4G_N — entanglement entropy of a boundary region equals an extremal bulk surface area. Spacetime connectivity may be quantum entanglement re-described.",
  },
  {
    number: 24,
    tier: "advanced",
    question:
      "Connect 'pinch to zoom' to Kaluza-Klein.",
    rubric:
      "In KK, U(1) gauge coupling g ∝ 1/R, where R is the compact-dimension radius. Locally varying R changes the effective metric of the non-compact dimensions. 'Pinching' is dynamic compactification — distance becomes coupling-dependent.",
  },
  {
    number: 25,
    tier: "advanced",
    question:
      "Trace GRF → Institute of Field Physics (UNC) → RIAS → Mansfield Amendment; tie to AATIP/AAWSAP.",
    rubric:
      "Babson founded GRF (1948); essay prizes seeded the Bryce DeWitt-led Institute of Field Physics at UNC, funded by Bahnson. Martin Aircraft set up RIAS to industrialise basic research. Mansfield Amendment (1969) cut DoD funding for non-mission basic research, ending the era. AATIP/AAWSAP (2007–) revives black-budget anti-gravity / UAP research under different cover.",
  },
];

/** Helper for Quiz: convert exam questions into short-answer Quiz questions. */
export function examQuestionsAsQuiz(): QuizQuestion[] {
  return EXAM_QUESTIONS.map((q) => ({
    type: "short-answer" as const,
    question: q.question,
    answer: q.rubric,
    explanation: `Tier: ${q.tier}.`,
  }));
}

// Suppress unused import warning when caller only needs the constants.
export type { QuizQuestion };
