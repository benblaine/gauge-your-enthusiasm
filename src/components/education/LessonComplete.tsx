"use client";

import { useEffect, useState } from "react";
import { useProgressStore } from "@/stores/progressStore";
import { lessonId } from "@/content/modules/config";

interface LessonCompleteProps {
  moduleSlug: string;
  lessonSlug: string;
}

/**
 * A toggle button that lets the student mark a lesson finished. Persisted in
 * the Zustand progress store and reflected in the sidebar checkmarks.
 */
export function LessonComplete({ moduleSlug, lessonSlug }: LessonCompleteProps) {
  const id = lessonId(moduleSlug, lessonSlug);
  const completed = useProgressStore((s) => s.completedLessons.includes(id));
  const mark = useProgressStore((s) => s.markLessonComplete);
  const unmark = useProgressStore((s) => s.markLessonIncomplete);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;

  return (
    <div className="mt-12 flex justify-end">
      <button
        type="button"
        onClick={() => (completed ? unmark(id) : mark(id))}
        className="neon-button"
      >
        {completed ? "✦ Marked complete" : "Mark lesson complete"}
      </button>
    </div>
  );
}
