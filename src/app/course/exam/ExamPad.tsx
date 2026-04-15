"use client";

import { useState } from "react";
import { useProgressStore } from "@/stores/progressStore";

interface ExamPadProps {
  questionId: string;
  rubric: string;
}

/**
 * Self-graded long-form pad. Student writes, reveals rubric, scores 0–4.
 * Score is persisted as a fractional quiz score in the progress store.
 */
export function ExamPad({ questionId, rubric }: ExamPadProps) {
  const [text, setText] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const recordQuiz = useProgressStore((s) => s.recordQuiz);

  const grade = (s: number) => {
    setScore(s);
    recordQuiz(questionId, s / 4);
  };

  return (
    <div className="mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Write your answer in your own words first. Don't peek."
        className="w-full p-3 rounded bg-penthouse-black/60 border border-brass/20 focus:border-neon-cyan focus:outline-none text-sm font-mono leading-relaxed"
      />
      {!revealed ? (
        <button
          type="button"
          className="neon-button !py-1.5 !px-4 text-xs mt-3"
          onClick={() => setRevealed(true)}
          disabled={text.trim().length < 10}
        >
          Reveal rubric
        </button>
      ) : (
        <div className="mt-3 space-y-3">
          <div className="p-3 rounded border border-jewel-emerald/40 bg-jewel-emerald/5 text-sm leading-relaxed">
            <div className="font-mono text-xs text-jewel-emerald uppercase tracking-widest mb-1">
              Marking rubric
            </div>
            {rubric}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-brass-light/70 mr-2">Self-grade:</span>
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => grade(n)}
                className={`w-8 h-8 rounded border text-sm font-mono transition ${
                  score === n
                    ? "bg-neon-pink text-penthouse-black border-neon-pink shadow-neon-pink"
                    : "border-brass/30 hover:border-neon-cyan"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="ml-3 text-brass-light/50 italic">
              0 = blank · 4 = nailed it
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
