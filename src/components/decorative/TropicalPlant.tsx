import { cn } from "@/lib/utils";

interface TropicalPlantProps {
  variant?: "fern" | "monstera" | "palm";
  className?: string;
}

/**
 * Decorative SVG plant for sidebars, footers, and the corners of the
 * Penthouse Observatory. Painted in brass tones so it reads as a brass
 * etching rather than a fully rendered illustration.
 */
export function TropicalPlant({ variant = "monstera", className }: TropicalPlantProps) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={cn("text-brass/40", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      {variant === "monstera" && (
        <g>
          <path d="M50 130 Q50 80 50 30" />
          <path d="M50 90 Q20 80 14 50 Q35 55 50 70" fill="currentColor" fillOpacity="0.05" />
          <path d="M50 75 Q80 70 86 40 Q66 48 50 60" fill="currentColor" fillOpacity="0.05" />
          <path d="M50 60 Q26 50 22 22 Q42 30 50 45" fill="currentColor" fillOpacity="0.05" />
          <path d="M50 50 Q74 42 80 14 Q60 22 50 35" fill="currentColor" fillOpacity="0.05" />
          <circle cx="33" cy="58" r="1.6" fill="currentColor" />
          <circle cx="68" cy="50" r="1.6" fill="currentColor" />
          <circle cx="40" cy="40" r="1.4" fill="currentColor" />
          <circle cx="60" cy="32" r="1.4" fill="currentColor" />
        </g>
      )}
      {variant === "fern" && (
        <g>
          <path d="M50 130 Q50 80 50 20" />
          {[20, 40, 60, 80, 100].map((y) => (
            <g key={y}>
              <path d={`M50 ${y} Q30 ${y - 4} 18 ${y - 14}`} />
              <path d={`M50 ${y} Q70 ${y - 4} 82 ${y - 14}`} />
            </g>
          ))}
        </g>
      )}
      {variant === "palm" && (
        <g>
          <path d="M50 130 Q48 80 50 28" />
          <path d="M50 30 Q20 14 6 28" />
          <path d="M50 30 Q80 14 94 28" />
          <path d="M50 30 Q26 4 22 22" />
          <path d="M50 30 Q74 4 78 22" />
          <path d="M50 30 Q50 4 50 14" />
        </g>
      )}
    </svg>
  );
}
