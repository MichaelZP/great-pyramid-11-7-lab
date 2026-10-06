import { GOLDEN_EGG_Z0, geoFromBH } from "./engine";
import type { Point3, Quantity, SegmentId } from "./relations";

export function pyramidSegments(bh: number, base = 2) {
  const g = geoFromBH(bh, base);
  const O: Point3 = [0, 0, 0], M: Point3 = [0, 0, g.A], V: Point3 = [0, g.H, 0];
  const C: Point3 = [g.A, 0, g.A], K: Point3 = [-g.A, 0, -g.A], N: Point3 = [-g.A, 0, g.A];
  const points = { O, M, V, C, K, N };
  const def: { id: SegmentId; ends: [keyof typeof points, keyof typeof points]; labelAt: Point3 }[] = [
    { id: "A", ends: ["O", "M"], labelAt: [-0.65, 0.02, g.A * 0.45] },
    { id: "H", ends: ["O", "V"], labelAt: [-0.6, g.H * 0.6, 0] },
    { id: "S", ends: ["M", "V"], labelAt: [0.6, g.H * 0.6, g.A * 0.45] },
    { id: "B", ends: ["N", "C"], labelAt: [g.A * 1.2, 0.35, g.A * 1.1] },
    { id: "D", ends: ["K", "C"], labelAt: [-g.A * 1.3, 0.25, -g.A * 0.05] },
    { id: "E", ends: ["C", "V"], labelAt: [g.A * 0.9, g.H * 0.62, g.A * 0.72] },
  ];
  return { geo: g, points, segments: def.map((d) => ({ ...d, from: points[d.ends[0]], to: points[d.ends[1]] })) };
}

export function angleArcs(bh: number, radius = 0.34, samples = 40) {
  const { geo: g, points } = pyramidSegments(bh);
  const theta = g.angleDeg * Math.PI / 180, beta = Math.PI / 2 - theta;
  return {
    theta: { angle: theta, centre: points.M, points: Array.from({ length: samples + 1 }, (_, i): Point3 => {
      const a = theta * i / samples;
      return [0, radius * Math.sin(a), g.A - radius * Math.cos(a)];
    }) },
    beta: { angle: beta, centre: points.V, points: Array.from({ length: samples + 1 }, (_, i): Point3 => {
      const a = beta * i / samples;
      return [0, g.H - radius * Math.cos(a), radius * Math.sin(a)];
    }) },
  };
}

export function comparisonChains(rows: { terms: readonly Quantity[]; total: number }[], values: Record<Quantity, number>, span = 2.6) {
  const scale = span / Math.max(...rows.map((r) => r.total));
  return rows.map((row, rowIndex) => {
    let x = -span / 2;
    const y = 0.24 - rowIndex * 0.48;
    return row.terms.map((q) => {
      const from: Point3 = [x, y, 0];
      x += values[q] * scale;
      return { q, from, to: [x, y, 0] as Point3, labelAt: [(from[0] + x) / 2, y - 0.13, 0] as Point3, scale };
    });
  });
}

export type OvalSection = {
  theta: number; t: number; z0: number; zLo: number; zHi: number; zMax: number;
  L: number; W: number; contour: Point3[]; length: [Point3, Point3]; width: [Point3, Point3];
};

// Mathematical (x,y,z) coordinates, not scene coordinates. Bisection of the
// independently audited width derivative; no ellipse/visual calibration.
export function ovalSection(angleDeg: number, z0 = GOLDEN_EGG_Z0, samples = 256): OvalSection {
  const theta = angleDeg * Math.PI / 180, t = Math.tan(theta);
  if (!(theta > 0 && theta < Math.PI / 2 && z0 > 0 && z0 * z0 > 4 * t)) {
    throw new RangeError("No closed oval for these section parameters");
  }
  const zLo = (z0 + Math.sqrt(z0 * z0 - 4 * t)) / 2;
  const zHi = (z0 + Math.sqrt(z0 * z0 + 4 * t)) / 2;
  const f = (z: number) => 1 / (z * z) - ((z - z0) / t) ** 2;
  let lo = zLo, hi = z0;
  for (let i = 0; i < 80; i++) {
    const z = (lo + hi) / 2;
    if (z ** 3 * (z0 - z) > t * t) lo = z; else hi = z;
  }
  const zMax = (lo + hi) / 2, halfWidth = Math.sqrt(f(zMax));
  const endpoint = (z: number): Point3 => [(z - z0) / t, 0, z];
  const contour = Array.from({ length: samples + 1 }, (_, i): Point3 => {
    const a = i * 2 * Math.PI / samples;
    const z = (zHi + zLo) / 2 + (zHi - zLo) / 2 * Math.cos(a);
    return [(z - z0) / t, (i === 0 || i === samples || i === samples / 2) ? 0 : Math.sign(Math.sin(a)) * Math.sqrt(Math.max(0, f(z))), z];
  });
  return {
    theta, t, z0, zLo, zHi, zMax, contour,
    L: (zHi - zLo) / Math.sin(theta), W: 2 * halfWidth,
    length: [endpoint(zLo), endpoint(zHi)],
    width: [[(zMax - z0) / t, -halfWidth, zMax], [(zMax - z0) / t, halfWidth, zMax]],
  };
}
