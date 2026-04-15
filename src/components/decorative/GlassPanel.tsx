import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: "none" | "brass" | "pink" | "cyan";
}

const glowClass = {
  none: "",
  brass: "shadow-warm-glow",
  pink: "shadow-neon-pink",
  cyan: "shadow-neon-cyan",
} as const;

export function GlassPanel({
  children,
  className,
  glow = "none",
  ...rest
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-lg p-6",
        glowClass[glow],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
