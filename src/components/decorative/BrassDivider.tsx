import { cn } from "@/lib/utils";

interface BrassDividerProps {
  className?: string;
  ornament?: boolean;
}

/**
 * A horizontal gold-gradient divider, optionally with a small brass ornament
 * dot in the centre — like a chapter break in a 1980s coffee-table book.
 */
export function BrassDivider({ className, ornament = false }: BrassDividerProps) {
  if (!ornament) {
    return <hr className={cn("gold-divider my-8", className)} />;
  }
  return (
    <div className={cn("flex items-center justify-center my-10 gap-4", className)}>
      <span className="flex-1 gold-divider" />
      <span
        aria-hidden
        className="w-2 h-2 rotate-45 bg-brass shadow-[0_0_8px_rgba(212,175,55,0.6)]"
      />
      <span className="flex-1 gold-divider" />
    </div>
  );
}
