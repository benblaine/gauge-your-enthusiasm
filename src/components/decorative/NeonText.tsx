import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type NeonColor = "pink" | "cyan" | "brass";

interface NeonTextProps {
  children: ReactNode;
  color?: NeonColor;
  flicker?: boolean;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

const colorClass: Record<NeonColor, string> = {
  pink: "neon-text-pink",
  cyan: "neon-text-cyan",
  brass: "neon-text-brass",
};

export function NeonText({
  children,
  color = "brass",
  flicker = false,
  className,
  as: Tag = "span",
}: NeonTextProps) {
  return (
    <Tag
      className={cn(
        colorClass[color],
        flicker && "animate-flicker",
        "font-accent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
