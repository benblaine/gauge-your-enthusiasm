import { EXAM_QUESTIONS } from "@/content/exam/questions";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { BrassDivider } from "@/components/decorative/BrassDivider";
import { NeonText } from "@/components/decorative/NeonText";
import { ExamPad } from "./ExamPad";

export const metadata = {
  title: "Exam · The Penthouse Observatory",
};

export default function ExamPage() {
  const tiers = ["foundations", "intermediate", "advanced"] as const;
  return (
    <article className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-brass/70 mb-2">
        Final assessment
      </p>
      <h1 className="font-display">
        Podcast <NeonText color="pink" flicker>Comprehension</NeonText> Exam
      </h1>
      <p className="text-lg text-brass-light/80 max-w-3xl">
        Twenty-five questions covering every reference Weinstein and Davis make
        in the three-hour conversation. Write your answer, then reveal the
        marking rubric. There are no points — only the question of whether you
        could pick up the phone.
      </p>

      <BrassDivider ornament />

      {tiers.map((tier) => (
        <section key={tier} className="my-12">
          <h2 className="font-display capitalize">{tier}</h2>
          <div className="space-y-5">
            {EXAM_QUESTIONS.filter((q) => q.tier === tier).map((q) => (
              <GlassPanel key={q.number}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-sm text-brass/70">
                    Q{q.number.toString().padStart(2, "0")}
                  </span>
                  <span className="font-accent text-xs uppercase tracking-widest text-brass-light/50">
                    {q.tier}
                  </span>
                </div>
                <p className="font-display text-lg text-brass-light leading-relaxed">
                  {q.question}
                </p>
                <ExamPad questionId={`exam-${q.number}`} rubric={q.rubric} />
              </GlassPanel>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
