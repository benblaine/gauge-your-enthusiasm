/**
 * Schwarzschild geometry helpers used by Scene3D for Module 5.
 * Embedding diagram: the famous "rubber sheet" surface
 *   z(r) = 2 √(r_s (r - r_s))  for r > r_s
 * gives the spatial slice of the Schwarzschild metric in isotropic
 * coordinates as it sits in 3D Euclidean space.
 */

export function flammSurface(r: number, rs: number): number {
  if (r <= rs) return -Infinity;
  return 2 * Math.sqrt(rs * (r - rs));
}

/** Lorentz factor γ = 1 / √(1 - β²). */
export function lorentzFactor(beta: number): number {
  return 1 / Math.sqrt(1 - beta * beta);
}
