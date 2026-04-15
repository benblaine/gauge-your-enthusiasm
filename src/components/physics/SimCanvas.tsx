"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { stepPendulum, pendulumEnergy, type PendulumState } from "@/lib/physics/mechanics";

interface SimCanvasProps {
  type?: "pendulum" | "double-pendulum";
  initialAngle?: number;
  showPhaseSpace?: boolean;
  showLagrangian?: boolean;
}

function PendulumSimulation({
  initialAngle = Math.PI / 4,
  showLagrangian = false,
}: SimCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<PendulumState>({ theta: initialAngle, omega: 0 });
  const [length, setLength] = useState(1);
  const [gravity, setGravity] = useState(9.81);
  const [damping, setDamping] = useState(0);
  const [running, setRunning] = useState(true);
  const [energy, setEnergy] = useState({ kinetic: 0, potential: 0, total: 0 });

  // Keep latest control values in refs so the rAF loop reads fresh values.
  const ctrlRef = useRef({ length, gravity, damping, running });
  useEffect(() => {
    ctrlRef.current = { length, gravity, damping, running };
  }, [length, gravity, damping, running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const { length: L, gravity: g, damping: γ, running: run } = ctrlRef.current;
      if (run) {
        // sub-step for stability at large dt
        const sub = 4;
        for (let i = 0; i < sub; i++) {
          stateRef.current = stepPendulum(stateRef.current, dt / sub, {
            g,
            L,
            damping: γ,
          });
        }
        const e = pendulumEnergy(stateRef.current, { L, g });
        setEnergy(e);
      }

      // Draw
      const W = canvas.width;
      const H = canvas.height;
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, W, H);

      // Glow halo
      const cx = W / 2;
      const cy = H * 0.18;
      const px = cx + Math.sin(stateRef.current.theta) * (H * 0.55) * (L / 1.5);
      const py = cy + Math.cos(stateRef.current.theta) * (H * 0.55) * (L / 1.5);

      ctx.strokeStyle = "rgba(212,175,55,0.6)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Pivot
      ctx.fillStyle = "#D4AF37";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Bob with neon glow
      const grad = ctx.createRadialGradient(px, py, 2, px, py, 22);
      grad.addColorStop(0, "#FF69B4");
      grad.addColorStop(1, "rgba(255,105,180,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, 22, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FF69B4";
      ctx.beginPath();
      ctx.arc(px, py, 10, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  const reset = () => {
    stateRef.current = { theta: initialAngle, omega: 0 };
  };

  return (
    <GlassPanel className="my-8">
      <canvas
        ref={canvasRef}
        width={640}
        height={400}
        className="w-full rounded brass-border bg-penthouse-black"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
        <SliderControl label="Length L" value={length} min={0.3} max={2.5} step={0.05} onChange={setLength} suffix="m" />
        <SliderControl label="Gravity g" value={gravity} min={1} max={25} step={0.1} onChange={setGravity} suffix="m/s²" />
        <SliderControl label="Damping γ" value={damping} min={0} max={2} step={0.05} onChange={setDamping} />
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button className="neon-button !py-1.5 !px-4 text-xs" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Run"}
        </button>
        <button className="neon-button !py-1.5 !px-4 text-xs" onClick={reset}>
          Reset
        </button>
        {showLagrangian && (
          <div className="ml-auto font-mono text-xs text-brass-light/70">
            T = {energy.kinetic.toFixed(2)} J · V = {energy.potential.toFixed(2)} J · E = {energy.total.toFixed(2)} J
          </div>
        )}
      </div>
    </GlassPanel>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-xs text-brass-light/70 flex justify-between">
        <span>{label}</span>
        <span>
          {value.toFixed(2)}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="accent-brass"
      />
    </label>
  );
}

const SimCanvasClient = dynamic(() => Promise.resolve(PendulumSimulation), {
  ssr: false,
  loading: () => (
    <GlassPanel className="my-8">
      <div className="h-[400px] flex items-center justify-center text-brass/60 font-mono text-sm">
        Loading simulation…
      </div>
    </GlassPanel>
  ),
});

export function SimCanvas(props: SimCanvasProps) {
  // Only the pendulum is implemented in this scaffold.
  return <SimCanvasClient {...props} />;
}
