"use client";

import { useId, useState } from "react";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { useProgressStore } from "@/stores/progressStore";
import { cn } from "@/lib/utils";

export interface MultipleChoiceQuestion {
  type: "multiple-choice";
  question: string;
  choices: string[];
  /** index into `choices` */
  answer: number;
  explanation?: string;
}
export interface ShortAnswerQuestion {
  type: "short-answer";
  question: string;
  /** A canonical answer string used for self-grading. */
  answer: string;
  /**
   * Optional accepted-answer regex source strings (without delimiters).
   * Strings are used so MDX/server components can pass them across the
   * server→client boundary without serialising RegExp instances.
   */
  accept?: string[];
  explanation?: string;
}

export type QuizQuestion = MultipleChoiceQuestion | ShortAnswerQuestion;

interface QuizProps {
  id?: string;
  questions: QuizQuestion[];
  /** Heading for the quiz card. */
  title?: string;
}

export function Quiz({ id, questions, title = "Check yourself" }: QuizProps) {
  const generated = useId();
  const quizId = id ?? generated;
  const recordQuiz = useProgressStore((s) => s.recordQuiz);

  const [answers, setAnswers] = useState<(string | number | null)[]>(
    () => questions.map(() => null),
  );
  const [revealed, setRevealed] = useState(false);

  const score = revealed
    ? questions.reduce((acc, q, i) => acc + (isCorrect(q, answers[i]) ? 1 : 0), 0)
    : 0;

  const handleSubmit = () => {
    setRevealed(true);
    const fraction = questions.length === 0 ? 0 : score / questions.length;
    // recompute since state isn't refreshed yet in the same tick
    const live = questions.reduce(
      (acc, q, i) => acc + (isCorrect(q, answers[i]) ? 1 : 0),
      0,
    );
    recordQuiz(quizId, live / Math.max(1, questions.length));
    void fraction;
  };

  return (
    <GlassPanel glow="brass" className="my-10">
      <h4 className="font-display text-xl mt-0 mb-1 text-brass-light">{title}</h4>
      <div className="gold-divider mb-4" />
      <ol className="space-y-6">
        {questions.map((q, i) => (
          <li key={i}>
            <p className="font-display text-base text-brass-light mb-3">
              <span className="font-mono text-xs text-brass/70 mr-2">
                Q{i + 1}
              </span>
              {q.question}
            </p>
            {q.type === "multiple-choice" ? (
              <ul className="space-y-2">
                {q.choices.map((c, j) => {
                  const selected = answers[i] === j;
                  const correct = revealed && j === q.answer;
                  const wrong = revealed && selected && j !== q.answer;
                  return (
                    <li key={j}>
                      <button
                        type="button"
                        disabled={revealed}
                        onClick={() => {
                          setAnswers((a) => {
                            const next = [...a];
                            next[i] = j;
                            return next;
                          });
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded border transition-all text-sm",
                          "border-brass/20 hover:border-neon-cyan/60",
                          selected && !revealed && "border-neon-pink shadow-neon-pink",
                          correct && "border-jewel-emerald bg-jewel-emerald/10 text-brass-light",
                          wrong && "border-jewel-ruby bg-jewel-ruby/10 text-brass-light/80",
                        )}
                      >
                        <span className="font-mono text-xs text-brass/70 mr-2">
                          {String.fromCharCode(65 + j)}.
                        </span>
                        {c}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <input
                type="text"
                disabled={revealed}
                value={(answers[i] as string) ?? ""}
                onChange={(e) =>
                  setAnswers((a) => {
                    const next = [...a];
                    next[i] = e.target.value;
                    return next;
                  })
                }
                className={cn(
                  "w-full px-3 py-2 rounded border bg-penthouse-black/40",
                  "border-brass/20 focus:border-neon-cyan focus:outline-none text-sm",
                )}
                placeholder="Type your answer…"
              />
            )}
            {revealed && (
              <p className="mt-2 text-xs text-brass-light/70">
                <span className="font-mono text-brass/70">Answer:</span>{" "}
                {q.type === "multiple-choice"
                  ? q.choices[q.answer]
                  : q.answer}
                {q.explanation && (
                  <span className="block italic mt-1 text-brass-light/60">
                    {q.explanation}
                  </span>
                )}
              </p>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-center justify-between gap-4">
        {!revealed ? (
          <button
            type="button"
            onClick={handleSubmit}
            className="neon-button"
            disabled={answers.some((a) => a === null || a === "")}
          >
            Reveal answers
          </button>
        ) : (
          <div className="font-display text-lg neon-text-pink">
            {score} / {questions.length} correct
          </div>
        )}
      </div>
    </GlassPanel>
  );
}

function isCorrect(q: QuizQuestion, given: string | number | null): boolean {
  if (given === null || given === "") return false;
  if (q.type === "multiple-choice") return given === q.answer;
  const text = String(given).trim().toLowerCase();
  if (q.accept) {
    for (const src of q.accept) {
      try {
        if (new RegExp(src, "i").test(text)) return true;
      } catch {
        /* ignore malformed regex */
      }
    }
  }
  return text === q.answer.trim().toLowerCase();
}
