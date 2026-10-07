import { type ConstantId, type Geo, geoFromBH } from "./engine";
import type { Locale } from "../i18n";
import { RELATION_LESSONS } from "./relation-lessons";
import { ovalSection } from "./relation-geometry";

export type Quantity = "B" | "H" | "A" | "D" | "S" | "E" | "theta" | "beta" | "L" | "W";
export type RelationScene = "pyramid-lengths" | "pyramid-angles" | "oval-section";
type RelationPresentation = {
  formula: string;
  quantities: readonly Quantity[];
  scene: RelationScene;
  renderer: "lengths" | "angles" | "oval";
  auditSection: number;
};

// Exhaustive inventory, independent of rendering. Results/references stay in engine.ts.
// A renderer is enabled only after its geometry and explanation are implemented.
export const RELATION_PRESENTATIONS: Record<ConstantId, RelationPresentation> = {
  pi: { formula: "2B / H", quantities: ["B", "H"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 1 },
  gamma: { formula: "2B / (H + 2D)", quantities: ["B", "H", "D"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 2 },
  sqrt3: { formula: "(H + 2D) / (2B)", quantities: ["B", "H", "D"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 3 },
  sqrt6: { formula: "(H + 2D) / D", quantities: ["H", "D"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 4 },
  sqrt2: { formula: "D / B", quantities: ["D", "B"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 5 },
  sqrt5: { formula: "(S + B) / S", quantities: ["S", "B"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 6 },
  tribonacci: { formula: "(A + 2D) / (S + B)", quantities: ["A", "D", "S", "B"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 7 },
  brun: { formula: "E / A", quantities: ["E", "A"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 8 },
  invPhi: { formula: "S / (S + A)", quantities: ["S", "A"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 9 },
  phi: { formula: "S / A", quantities: ["S", "A", "H"], scene: "pyramid-lengths", renderer: "lengths", auditSection: 10 },
  e: { formula: "2θ / β; β = 90° − θ", quantities: ["theta", "beta"], scene: "pyramid-angles", renderer: "angles", auditSection: 11 },
  eMinus1: { formula: "2θ / β − 1; β = 90° − θ", quantities: ["theta", "beta"], scene: "pyramid-angles", renderer: "angles", auditSection: 12 },
  eggLW: { formula: "L / W; zr = 1, Z₀ = 7.65", quantities: ["L", "W", "theta"], scene: "oval-section", renderer: "oval", auditSection: 13 },
} satisfies Record<ConstantId, RelationPresentation>;

export type SegmentId = "A" | "H" | "S" | "B" | "D" | "E";
export type Point3 = [number, number, number];
export const SEGMENT_COLORS: Record<Quantity, string> = {
  A: "#c4a574", H: "#c5ccd4", S: "#8eafaa", B: "#b7a890", D: "#b4a5c4", E: "#d3a99d",
  theta: "#c4a574", beta: "#8eafaa", L: "#c4a574", W: "#8eafaa",
};

export function phiSegments(bh: number, base = 2) {
  const geo = geoFromBH(bh, base);
  const O: Point3 = [0, 0, 0];
  const M: Point3 = [0, 0, geo.A];
  const V: Point3 = [0, geo.H, 0];
  return {
    points: { O, M, V },
    segments: [
      { id: "A" as const, from: O, to: M, labelAt: [0, -0.13, geo.A / 2] as Point3 },
      { id: "H" as const, from: O, to: V, labelAt: [-0.6, geo.H * 0.6, 0] as Point3 },
      { id: "S" as const, from: M, to: V, labelAt: [0.65, geo.H * 0.5, geo.A / 2] as Point3 },
    ],
  };
}

export type RelationStep = { segments: readonly Quantity[]; text: Record<Locale, string> };
export { PHI_STEPS } from "./relation-lessons";

export function lessonGeo(geo: Geo) {
  // Shared arbitrary units, B=11, so the default model reads B=11, H=7.
  return geoFromBH(geo.bh, 11);
}

export { RELATION_LESSONS };
export function relationSteps(id: ConstantId | null) { return id ? RELATION_LESSONS[id] : []; }

export const QUANTITY_SYMBOLS: Record<Quantity, string> = { A: "A", B: "B", H: "H", D: "D", E: "E", S: "S", theta: "θ", beta: "β", L: "L", W: "W" };
export type ComparisonDef = { numerator: Quantity[]; denominator: Quantity[]; subtract?: number };
export const RELATION_COMPARISONS: Record<ConstantId, ComparisonDef> = {
  pi: { numerator: ["B", "B"], denominator: ["H"] },
  gamma: { numerator: ["B", "B"], denominator: ["H", "D", "D"] },
  sqrt3: { numerator: ["H", "D", "D"], denominator: ["B", "B"] },
  sqrt6: { numerator: ["H", "D", "D"], denominator: ["D"] },
  sqrt2: { numerator: ["D"], denominator: ["B"] },
  sqrt5: { numerator: ["S", "B"], denominator: ["S"] },
  tribonacci: { numerator: ["A", "D", "D"], denominator: ["S", "B"] },
  brun: { numerator: ["E"], denominator: ["A"] },
  invPhi: { numerator: ["S"], denominator: ["S", "A"] },
  phi: { numerator: ["S"], denominator: ["A"] },
  e: { numerator: ["theta", "theta"], denominator: ["beta"] },
  eMinus1: { numerator: ["theta", "theta"], denominator: ["beta"], subtract: 1 },
  eggLW: { numerator: ["L"], denominator: ["W"] },
};

export function termLabel(terms: readonly Quantity[]) {
  const counts = new Map<Quantity, number>();
  terms.forEach((q) => counts.set(q, (counts.get(q) ?? 0) + 1));
  return [...counts].map(([q, n]) => `${n === 1 ? "" : n}${QUANTITY_SYMBOLS[q]}`).join(" + ");
}

export function relationMeasures(id: ConstantId, geo: Geo) {
  const oval = id === "eggLW" ? ovalSection(geo.angleDeg) : null;
  const values: Record<Quantity, number> = {
    B: geo.B, H: geo.H, A: geo.A, S: geo.S, D: geo.D, E: geo.E,
    theta: geo.angleDeg, beta: 90 - geo.angleDeg, L: oval?.L ?? 0, W: oval?.W ?? 0,
  };
  const def = RELATION_COMPARISONS[id];
  const rows = [def.numerator, def.denominator].map((terms) => ({
    label: termLabel(terms), terms, total: terms.reduce((sum, q) => sum + values[q], 0),
  }));
  return { values, rows, subtract: def.subtract ?? 0, ratio: rows[0].total / rows[1].total - (def.subtract ?? 0), oval };
}
