import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULES, getModule, lessonId } from "@/content/modules/config";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { BrassDivider } from "@/components/decorative/BrassDivider";
import { NeonText } from "@/components/decorative/NeonText";

interface Params {
  params: Promise<{ moduleSlug: string }>;
}

export function generateStaticParams() {
  return MODULES.map((m) => ({ moduleSlug: m.slug }));
}

export default async function ModulePage({ params }: Params) {
  const { moduleSlug } = await params;
  const m = getModule(moduleSlug);
  if (!m) notFound();

  return (
    <article>
      <p className="font-mono text-xs uppercase tracking-widest text-brass/70 mb-2">
        Module {String(m.number).padStart(2, "0")} · ~{m.estimatedHours} hours · {m.weeks} weeks
      </p>
      <h1 className="font-display">
        {m.title}{" "}
        <span className="block text-2xl md:text-3xl mt-2 italic text-brass-light/70 font-normal">
          {m.subtitle}
        </span>
      </h1>
      <p className="text-lg text-brass-light/85 max-w-3xl">{m.description}</p>

      <BrassDivider />

      <h2 className="font-display">Lessons</h2>
      <div className="space-y-3">
        {m.lessons.map((l, i) => (
          <Link
            key={l.slug}
            href={`/course/${m.slug}/${l.slug}`}
            className="no-underline block"
          >
            <GlassPanel className="flex items-center gap-4 hover:shadow-warm-glow transition-shadow">
              <span className="font-mono text-brass/60 w-8 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="font-display text-lg text-brass-light">
                  {l.title}
                </div>
                <div className="text-xs text-brass-light/60 font-mono">
                  ~{l.estimatedMinutes} min
                  {!l.available && (
                    <span className="ml-3 text-brass/50">(scaffolded)</span>
                  )}
                </div>
              </div>
              {l.available ? (
                <NeonText color="cyan" className="text-xs">OPEN →</NeonText>
              ) : (
                <span className="text-xs text-brass-light/30 font-mono">soon</span>
              )}
            </GlassPanel>
          </Link>
        ))}
      </div>

      {m.prerequisites.length > 0 && (
        <p className="mt-10 text-sm text-brass-light/60">
          Prerequisites:{" "}
          {m.prerequisites.map((slug, i) => {
            const p = getModule(slug);
            if (!p) return null;
            return (
              <span key={slug}>
                <Link href={`/course/${slug}`}>{p.title}</Link>
                {i < m.prerequisites.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </p>
      )}
    </article>
  );
}
