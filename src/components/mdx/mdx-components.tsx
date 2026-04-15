import type { MDXComponents } from "mdx/types";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { BrassDivider } from "@/components/decorative/BrassDivider";
import { NeonText } from "@/components/decorative/NeonText";
import { Quiz } from "@/components/education/Quiz";
import { WhimsyBreak } from "@/components/education/WhimsyBreak";
import { ScrollySection } from "@/components/education/ScrollySection";
import { LessonComplete } from "@/components/education/LessonComplete";
import { SimCanvas } from "@/components/physics/SimCanvas";
import { Scene3D } from "@/components/physics/Scene3D";
import { PhaseSpace } from "@/components/physics/PhaseSpace";
import { VectorField } from "@/components/physics/VectorField";

export const mdxComponents: MDXComponents = {
  // Custom block components used inside MDX
  GlassPanel,
  BrassDivider,
  NeonText,
  Quiz,
  WhimsyBreak,
  ScrollySection,
  LessonComplete,
  SimCanvas,
  Scene3D,
  PhaseSpace,
  VectorField,
  // Style overrides for default markdown
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-brass/60 pl-4 my-6 italic text-brass-light/80">
      {children}
    </blockquote>
  ),
  hr: () => <BrassDivider ornament />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="text-left p-2 border-b border-brass/30 font-display text-brass-light">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="p-2 border-b border-brass/10">{children}</td>
  ),
};
