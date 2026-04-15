import { TropicalPlant } from "@/components/decorative/TropicalPlant";
import { BrassDivider } from "@/components/decorative/BrassDivider";

export function Footer() {
  return (
    <footer className="relative mt-24 px-6 pb-10">
      <BrassDivider ornament />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="font-display text-brass-light/80 max-w-md">
          <p className="text-sm leading-relaxed">
            Built in Stellenbosch with caffeine, curiosity, and an unreasonable
            number of Claude conversations.
          </p>
          <p className="text-xs mt-2 text-brass/60 font-mono">
            MIT licensed · A love letter to _why's (Poignant) Guide
          </p>
        </div>
        <div className="flex items-end gap-4 opacity-60">
          <TropicalPlant variant="palm" className="w-20" />
          <TropicalPlant variant="fern" className="w-16" />
        </div>
      </div>
    </footer>
  );
}
