import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULES, getAdjacent, getLesson } from "@/content/modules/config";
import { BrassDivider } from "@/components/decorative/BrassDivider";
import { LessonComplete } from "@/components/education/LessonComplete";

interface Params {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}

export function generateStaticParams() {
  return MODULES.flatMap((m) =>
    m.lessons
      .filter((l) => l.available)
      .map((l) => ({ moduleSlug: m.slug, lessonSlug: l.slug })),
  );
}

export default async function LessonPage({ params }: Params) {
  const { moduleSlug, lessonSlug } = await params;
  const found = getLesson(moduleSlug, lessonSlug);
  if (!found) notFound();
  const { module, lesson } = found;

  if (!lesson.available) {
    return (
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-brass/70 mb-2">
          {module.title}
        </p>
        <h1 className="font-display">{lesson.title}</h1>
        <p className="text-brass-light/70 italic">
          This lesson is scaffolded but not yet authored. Check back, or open a PR
          via{" "}
          <Link href="/course">the syllabus</Link>.
        </p>
      </div>
    );
  }

  // Dynamically import the MDX file. Statically-analyzable template literal.
  let MDXContent: React.ComponentType;
  try {
    const mod = await import(
      `@/content/modules/${moduleSlug}/${lessonSlug}.mdx`
    );
    MDXContent = mod.default;
  } catch {
    notFound();
  }

  const { prev, next } = getAdjacent(moduleSlug, lessonSlug);

  return (
    <article>
      <p className="font-mono text-xs uppercase tracking-widest text-brass/70 mb-2">
        <Link href={`/course/${module.slug}`} className="no-underline">
          Module {String(module.number).padStart(2, "0")} · {module.title}
        </Link>
      </p>
      <MDXContent />
      <LessonComplete moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
      <BrassDivider ornament />
      <nav className="flex justify-between items-center gap-4 mt-6 text-sm">
        <div>
          {prev && (
            <Link
              href={`/course/${prev.moduleSlug}/${prev.lessonSlug}`}
              className="no-underline"
            >
              ← {prev.lesson.title}
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link
              href={`/course/${next.moduleSlug}/${next.lessonSlug}`}
              className="no-underline"
            >
              {next.lesson.title} →
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
