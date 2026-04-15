import Link from "next/link";
import { NeonText } from "@/components/decorative/NeonText";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-brass/60 mb-3">
        Error 404 · this floor of the observatory is empty
      </p>
      <h1 className="font-display text-5xl">
        <NeonText color="pink" flicker>Floor not found</NeonText>
      </h1>
      <p className="text-brass-light/80 mt-6 max-w-md mx-auto">
        The fox checked the elevator panel. There is no such floor. Possibly
        you took a gauge transformation that wasn't, strictly speaking,
        defined.
      </p>
      <Link href="/" className="no-underline mt-8 inline-block">
        <span className="neon-button inline-block">Back to the lobby</span>
      </Link>
    </div>
  );
}
