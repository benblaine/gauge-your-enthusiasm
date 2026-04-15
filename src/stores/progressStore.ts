import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface QuizScore {
  score: number; // 0-1
  answeredAt: number; // epoch ms
  attempts: number;
}

interface ProgressState {
  completedLessons: string[]; // "moduleSlug/lessonSlug"
  quizScores: Record<string, QuizScore>; // key = lessonId or quizId
  currentModule: string | null;
  currentLesson: string | null;

  markLessonComplete: (lessonId: string) => void;
  markLessonIncomplete: (lessonId: string) => void;
  recordQuiz: (quizId: string, score: number) => void;
  setCurrent: (moduleSlug: string, lessonSlug: string) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: [],
      quizScores: {},
      currentModule: null,
      currentLesson: null,

      markLessonComplete: (lessonId) =>
        set((s) =>
          s.completedLessons.includes(lessonId)
            ? s
            : { completedLessons: [...s.completedLessons, lessonId] },
        ),
      markLessonIncomplete: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.filter((id) => id !== lessonId),
        })),
      recordQuiz: (quizId, score) =>
        set((s) => {
          const prev = s.quizScores[quizId];
          return {
            quizScores: {
              ...s.quizScores,
              [quizId]: {
                score,
                answeredAt: Date.now(),
                attempts: (prev?.attempts ?? 0) + 1,
              },
            },
          };
        }),
      setCurrent: (moduleSlug, lessonSlug) =>
        set({ currentModule: moduleSlug, currentLesson: lessonSlug }),
      reset: () =>
        set({
          completedLessons: [],
          quizScores: {},
          currentModule: null,
          currentLesson: null,
        }),
    }),
    {
      name: "penthouse-observatory-progress",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

/** SSR-safe selector for total completion percent. */
export function useCompletionPercent(totalLessons: number): number {
  const completed = useProgressStore((s) => s.completedLessons.length);
  if (totalLessons === 0) return 0;
  return Math.round((completed / totalLessons) * 100);
}
