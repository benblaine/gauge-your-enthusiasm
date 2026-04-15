"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { GlassPanel } from "@/components/decorative/GlassPanel";
import { flammSurface } from "@/lib/physics/relativity";

interface Scene3DProps {
  type?: "spacetime-curvature" | "minkowski-cone";
  initialMass?: number;
}

// All Three.js imports happen inside the dynamic chunk so SSR is safe.
const Scene3DClient = dynamic(
  async () => {
    const React = await import("react");
    const { Canvas, useFrame } = await import("@react-three/fiber");
    const { OrbitControls, Stars } = await import("@react-three/drei");
    const THREE = await import("three");

    function FlammSurface({ rs }: { rs: number }) {
      const ref = useRef<any>(null);
      const geometry = useMemo(() => {
        const N = 80;
        const R = 5;
        const geo = new THREE.PlaneGeometry(R * 2, R * 2, N, N);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const r = Math.sqrt(x * x + y * y);
          const z =
            r > rs ? -flammSurface(r, rs) * 0.5 : -flammSurface(rs + 1e-3, rs) * 0.5;
          pos.setZ(i, isFinite(z) ? z : -3);
        }
        geo.computeVertexNormals();
        return geo;
      }, [rs]);

      useFrame((state) => {
        if (ref.current) {
          ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
        }
      });

      return (
        <mesh ref={ref} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]}>
          <meshStandardMaterial
            color="#D4AF37"
            wireframe
            emissive="#D4AF37"
            emissiveIntensity={0.25}
          />
        </mesh>
      );
    }

    function CentralMass({ rs }: { rs: number }) {
      return (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[Math.max(0.15, rs * 0.6), 32, 32]} />
          <meshStandardMaterial
            color="#FF69B4"
            emissive="#FF69B4"
            emissiveIntensity={1.2}
          />
        </mesh>
      );
    }

    return function InnerScene({ initialMass = 1 }: Scene3DProps) {
      const [rs, setRs] = React.useState(initialMass);
      return (
        <GlassPanel className="my-8">
          <div className="h-[420px] rounded brass-border bg-penthouse-black overflow-hidden">
            <Canvas camera={{ position: [6, 6, 8], fov: 45 }}>
              <ambientLight intensity={0.25} />
              <pointLight position={[5, 8, 5]} intensity={1.4} color="#F7E7CE" />
              <pointLight position={[-6, -2, -4]} intensity={0.6} color="#0F52BA" />
              <Stars radius={50} depth={40} count={1500} factor={4} fade />
              <FlammSurface rs={rs} />
              <CentralMass rs={rs} />
              <OrbitControls enablePan={false} />
            </Canvas>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-mono text-xs text-brass-light/70 flex justify-between">
                <span>Schwarzschild radius rₛ</span>
                <span>{rs.toFixed(2)}</span>
              </span>
              <input
                type="range"
                min={0.2}
                max={3}
                step={0.05}
                value={rs}
                onChange={(e) => setRs(parseFloat(e.target.value))}
                className="accent-neon-pink"
              />
            </label>
            <p className="text-xs text-brass-light/60 italic">
              Drag to orbit. The deformed grid is the Flamm embedding of a
              spatial slice of the Schwarzschild geometry — the famous "rubber
              sheet" picture, here as a brass mesh.
            </p>
          </div>
        </GlassPanel>
      );
    };
  },
  {
    ssr: false,
    loading: () => (
      <GlassPanel className="my-8">
        <div className="h-[420px] flex items-center justify-center text-brass/60 font-mono text-sm">
          Loading 3D scene…
        </div>
      </GlassPanel>
    ),
  },
);

export function Scene3D(props: Scene3DProps) {
  return <Scene3DClient {...props} />;
}
