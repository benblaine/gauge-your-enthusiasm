/**
 * Coulomb-style 2D electric field used by VectorField.
 * Returns (Ex, Ey) at point (x, y) from a list of point charges.
 */

export interface PointCharge {
  x: number;
  y: number;
  /** signed charge in arbitrary units */
  q: number;
}

const EPS = 1e-3;

export function eField(
  x: number,
  y: number,
  charges: PointCharge[],
): { Ex: number; Ey: number } {
  let Ex = 0;
  let Ey = 0;
  for (const c of charges) {
    const dx = x - c.x;
    const dy = y - c.y;
    const r2 = dx * dx + dy * dy + EPS;
    const r = Math.sqrt(r2);
    const k = c.q / (r2 * r); // 1/r^3 to multiply by displacement vector
    Ex += k * dx;
    Ey += k * dy;
  }
  return { Ex, Ey };
}
