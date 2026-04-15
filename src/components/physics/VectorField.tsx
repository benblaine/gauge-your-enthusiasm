"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { eField, type PointCharge } from "@/lib/physics/electrodynamics";

interface VectorFieldProps {
  initialCharges?: PointCharge[];
}

function VectorFieldInner({ initialCharges }: VectorFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [charges, setCharges] = useState<PointCharge[]>(
    initialCharges ?? [
      { x: -1.5, y: 0, q: 1 },
      { x: 1.5, y: 0, q: -1 },
    ],
  );
  const draggingRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const SCALE = 80;
    const cx = W / 2;
    const cy = H / 2;
    const toScreen = (x: number, y: number) => [cx + x * SCALE, cy - y * SCALE] as const;
    const toWorld = (sx: number, sy: number) => [(sx - cx) / SCALE, -(sy - cy) / SCALE] as const;

    const draw = () => {
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, W, H);

      // Streamlines via short segments at sampled grid points
      const step = 18;
      for (let sx = step / 2; sx < W; sx += step) {
        for (let sy = step / 2; sy < H; sy += step) {
          const [wx, wy] = toWorld(sx, sy);
          const { Ex, Ey } = eField(wx, wy, charges);
          const mag = Math.hypot(Ex, Ey);
          if (mag < 1e-3) continue;
          const len = Math.min(step * 0.7, Math.log10(1 + mag) * step);
          const ux = (Ex / mag) * len;
          const uy = -(Ey / mag) * len;
          const intensity = Math.min(1, Math.log10(1 + mag) / 2);
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 + 0.55 * intensity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(sx - ux / 2, sy - uy / 2);
          ctx.lineTo(sx + ux / 2, sy + uy / 2);
          ctx.stroke();
        }
      }

      // Charges
      for (const c of charges) {
        const [px, py] = toScreen(c.x, c.y);
        const color = c.q > 0 ? "#FF69B4" : "#00FFFF";
        const grad = ctx.createRadialGradient(px, py, 2, px, py, 28);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#0a0a0f";
        ctx.font = "bold 14px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(c.q > 0 ? "+" : "−", px, py + 1);
      }
    };

    draw();

    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const sx = ((e.clientX - rect.left) * canvas.width) / rect.width;
      const sy = ((e.clientY - rect.top) * canvas.height) / rect.height;
      for (let i = 0; i < charges.length; i++) {
        const [px, py] = toScreen(charges[i].x, charges[i].y);
        if (Math.hypot(px - sx, py - sy) < 18) {
          draggingRef.current = i;
          return;
        }
      }
    };
    const onMove = (e: PointerEvent) => {
      const idx = draggingRef.current;
      if (idx === null) return;
      const rect = canvas.getBoundingClientRect();
      const sx = ((e.clientX - rect.left) * canvas.width) / rect.width;
      const sy = ((e.clientY - rect.top) * canvas.height) / rect.height;
      const [wx, wy] = toWorld(sx, sy);
      setCharges((cs) => cs.map((c, i) => (i === idx ? { ...c, x: wx, y: wy } : c)));
    };
    const onUp = () => {
      draggingRef.current = null;
    };

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [charges]);

  const flipCharge = (i: number) =>
    setCharges((cs) => cs.map((c, j) => (j === i ? { ...c, q: -c.q } : c)));

  return (
    <GlassPanel className="my-8">
      <canvas
        ref={ref}
        width={640}
        height={400}
        className="w-full rounded brass-border bg-penthouse-black touch-none cursor-grab active:cursor-grabbing"
      />
      <div className="flex flex-wrap gap-2 mt-3">
        {charges.map((c, i) => (
          <button
            key={i}
            type="button"
            className="neon-button !py-1 !px-3 text-xs"
            onClick={() => flipCharge(i)}
          >
            Flip charge {i + 1} ({c.q > 0 ? "+" : "−"})
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-brass-light/60 italic">
        Drag the charges. Cyan field lines = electric field. The dipole's
        signature pattern emerges from nothing more than 1/r² superposition.
      </p>
    </GlassPanel>
  );
}

const VectorFieldClient = dynamic(() => Promise.resolve(VectorFieldInner), {
  ssr: false,
});

export function VectorField(props: VectorFieldProps) {
  return <VectorFieldClient {...props} />;
}
