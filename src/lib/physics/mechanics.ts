/**
 * Pure simulation primitives for classical mechanics.
 * Side-effect free — testable in Node, callable from React effects.
 */

export interface PendulumState {
  /** angle from vertical, radians */
  theta: number;
  /** angular velocity, rad/s */
  omega: number;
}

/**
 * One RK4 step of the simple pendulum.
 *   θ̈ = -(g/L) sin θ - γ θ̇
 */
export function stepPendulum(
  s: PendulumState,
  dt: number,
  opts: { g?: number; L?: number; damping?: number } = {},
): PendulumState {
  const g = opts.g ?? 9.81;
  const L = opts.L ?? 1;
  const γ = opts.damping ?? 0;

  const f = (st: PendulumState) => ({
    theta: st.omega,
    omega: -(g / L) * Math.sin(st.theta) - γ * st.omega,
  });

  const k1 = f(s);
  const k2 = f({ theta: s.theta + (dt / 2) * k1.theta, omega: s.omega + (dt / 2) * k1.omega });
  const k3 = f({ theta: s.theta + (dt / 2) * k2.theta, omega: s.omega + (dt / 2) * k2.omega });
  const k4 = f({ theta: s.theta + dt * k3.theta, omega: s.omega + dt * k3.omega });

  return {
    theta: s.theta + (dt / 6) * (k1.theta + 2 * k2.theta + 2 * k3.theta + k4.theta),
    omega: s.omega + (dt / 6) * (k1.omega + 2 * k2.omega + 2 * k3.omega + k4.omega),
  };
}

/** Total mechanical energy of the simple pendulum. */
export function pendulumEnergy(
  s: PendulumState,
  opts: { m?: number; L?: number; g?: number } = {},
): { kinetic: number; potential: number; total: number } {
  const m = opts.m ?? 1;
  const L = opts.L ?? 1;
  const g = opts.g ?? 9.81;
  const kinetic = 0.5 * m * (L * s.omega) ** 2;
  const potential = m * g * L * (1 - Math.cos(s.theta));
  return { kinetic, potential, total: kinetic + potential };
}
