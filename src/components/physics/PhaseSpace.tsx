"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { stepPendulum, type PendulumState } from "@/lib/physics/mechanics";

interface PhaseSpaceProps {
  /** how many initial conditions to plot */
  trajectories?: number;
  /** simulated seconds per trajectory */
  duration?: number;
}

function PhaseSpaceInner({ trajectories = 8, duration = 6 }: PhaseSpaceProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [energyMax, setEnergyMax] = useState(2);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, W, H);

    // Axes
    ctx.strokeStyle = "rgba(212,175,55,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();

    ctx.fillStyle = "rgba(247,231,206,0.5)";
    ctx.font = "11px JetBrains Mono, monospace";
    ctx.fillText("θ →", W - 30, H / 2 - 6);
    ctx.fillText("p_θ", W / 2 + 6, 14);

    const dt = 0.01;
    const steps = Math.round(duration / dt);
    const palette = ["#FF69B4", "#00FFFF", "#D4AF37", "#B026FF", "#F7E7CE", "#9966CC"];

    let maxE = 0;
    for (let i = 0; i < trajectories; i++) {
      const theta0 = (i / trajectories) * Math.PI * 0.85 + 0.1;
      let s: PendulumState = { theta: theta0, omega: 0 };
      const energy = 1 - Math.cos(theta0);
      maxE = Math.max(maxE, energy);
      ctx.strokeStyle = palette[i % palette.length] + "cc";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let n = 0; n < steps; n++) {
        s = stepPendulum(s, dt, { g: 9.81, L: 1 });
        const x = W / 2 + (s.theta / Math.PI) * (W / 2 - 20);
        const y = H / 2 - (s.omega / 6) * (H / 2 - 20);
        if (n === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    setEnergyMax(maxE);
  }, [trajectories, duration]);

  return (
    <GlassPanel className="my-8">
      <canvas
        ref={ref}
        width={640}
        height={400}
        className="w-full rounded brass-border bg-penthouse-black"
      />
      <p className="mt-3 text-xs text-brass-light/60 font-mono italic">
        Closed loops = bound oscillations (energy ≤ {energyMax.toFixed(2)} J/kg). Open
        flows above the separatrix = the pendulum has enough energy to whirl. The
        separatrix itself is the orbit Liouville's theorem refuses to let you cross.
      </p>
    </GlassPanel>
  );
}

const PhaseSpaceClient = dynamic(() => Promise.resolve(PhaseSpaceInner), {
  ssr: false,
});

export function PhaseSpace(props: PhaseSpaceProps) {
  return <PhaseSpaceClient {...props} />;
}
