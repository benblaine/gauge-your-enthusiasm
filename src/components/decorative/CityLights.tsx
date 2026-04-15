/**
 * Fixed background layer — radial bokeh suggesting a 50th-floor window
 * looking out over a sleeping city. Sits behind everything at z = -10.
 */
export function CityLights() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Skyline silhouette gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, rgba(13,27,42,0.85), transparent 70%)",
        }}
      />
      {/* Window-frame brass glints */}
      <div className="absolute inset-0 bg-leopard-faint opacity-60" />
      {/* Bokeh dots */}
      <div className="absolute inset-0">
        {BOKEH.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-slow-pulse"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              background: dot.color,
              filter: `blur(${dot.blur}px)`,
              opacity: dot.opacity,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const BOKEH = [
  { x: 10, y: 78, size: "8px", color: "#D4AF37", blur: 4, opacity: 0.5 },
  { x: 22, y: 85, size: "5px", color: "#FF69B4", blur: 3, opacity: 0.4 },
  { x: 35, y: 72, size: "10px", color: "#D4AF37", blur: 5, opacity: 0.45 },
  { x: 48, y: 88, size: "6px", color: "#00FFFF", blur: 3, opacity: 0.35 },
  { x: 60, y: 80, size: "7px", color: "#D4AF37", blur: 4, opacity: 0.5 },
  { x: 72, y: 90, size: "9px", color: "#F7E7CE", blur: 5, opacity: 0.4 },
  { x: 85, y: 76, size: "5px", color: "#B026FF", blur: 3, opacity: 0.35 },
  { x: 92, y: 84, size: "6px", color: "#D4AF37", blur: 4, opacity: 0.45 },
];
