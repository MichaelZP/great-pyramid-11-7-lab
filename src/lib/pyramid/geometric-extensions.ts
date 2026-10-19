/**
 * Geometric extensions: three lessons that reuse the existing model geometry.
 * Nothing here is added to the 13-comparison table or to the scoring; the
 * engine's results, tolerances, presets and Z₀ = 7.65 stay unchanged.
 *
 * Every quantity is dimensionless or scales linearly with B, so the lessons
 * react to B/H and to the drawing scale without hidden calibration.
 */
import { GOLDEN_EGG_Z0, PHI, RELATIVE_TOLERANCE, evaluateRelations, geoFromBH, type Geo } from "./engine";
import { ovalSection, type OvalSection } from "./relation-geometry";
import type { Point3 } from "./relations";

/** Same relative-error definition as engine.ts: |R − c| / |c|. */
export function relativeError(value: number, reference: number) {
  return Math.abs(value - reference) / Math.abs(reference);
}

/* ───────────────────────── 1. Golden egg limit ───────────────────────── */

/** Smallest Z₀ with a separated closed oval for slope t: Z₀² > 4t. */
export function eggZ0Min(t: number) {
  return 2 * Math.sqrt(t);
}

export type EggLimit =
  | { ok: false; t: number; z0: number; z0Min: number; limit: number; reason: "slope" | "z0" | "domain" }
  | {
      ok: true; t: number; z0: number; z0Min: number; oval: OvalSection;
      /** b − a: the x-extent of the projected oval, also the width an oval with L/W = S/A would have. */
      chord: number; ratio: number; limit: number; phi: number;
      errorPhi: number; errorLimitPhi: number;
      /** Sign of S/A − φ for the current slope (S/A > φ is not universal). */
      limitAbovePhi: boolean;
    };

/**
 * Section z·√(x²+y²) = 1 cut by z = Z₀ + t·x with t = H/A. The oval itself is
 * the existing `ovalSection` (true section plane, no ellipse, no fitting).
 * Outside t > 0, Z₀ > 0, Z₀² > 4t no oval is returned.
 */
export function eggLimit(geo: Pick<Geo, "H" | "A" | "angleDeg">, z0 = GOLDEN_EGG_Z0): EggLimit {
  const t = geo.H / geo.A;
  const limit = Math.sqrt(1 + t * t);
  const z0Min = eggZ0Min(t);
  if (!(t > 0) || !Number.isFinite(t)) return { ok: false, t, z0, z0Min, limit, reason: "slope" };
  if (!(z0 > 0) || !Number.isFinite(z0)) return { ok: false, t, z0, z0Min, limit, reason: "z0" };
  if (!(z0 * z0 > 4 * t)) return { ok: false, t, z0, z0Min, limit, reason: "domain" };
  let oval: OvalSection;
  try {
    oval = ovalSection(geo.angleDeg, z0);
  } catch {
    return { ok: false, t, z0, z0Min, limit, reason: "domain" };
  }
  const ratio = oval.L / oval.W;
  if (!Number.isFinite(ratio)) return { ok: false, t, z0, z0Min, limit, reason: "domain" };
  const chord = oval.length[1][0] - oval.length[0][0];
  return {
    ok: true, t, z0, z0Min, oval, chord, ratio, limit, phi: PHI,
    errorPhi: relativeError(ratio, PHI), errorLimitPhi: relativeError(limit, PHI),
    limitAbovePhi: limit > PHI,
  };
}

export const EGG_Z0_SLIDER = { min: 1, max: 40, step: 0.05 } as const;
/** Values reproduced by the research note's table (z₀ doubled twice). */
export const EGG_Z0_CHECKPOINTS = [GOLDEN_EGG_Z0, 2 * GOLDEN_EGG_Z0, 4 * GOLDEN_EGG_Z0] as const;
/** Animation: one slider step every tick, from Z₀ = 7.65 towards the end of the slider. */
export const EGG_SWEEP = { interval: 120, factor: 1.03 } as const;
export function nextSweepZ0(z0: number) {
  const next = Math.max(z0 + EGG_Z0_SLIDER.step, z0 * EGG_SWEEP.factor);
  return Math.min(EGG_Z0_SLIDER.max, Math.round(next / EGG_Z0_SLIDER.step) * EGG_Z0_SLIDER.step);
}

/* ───────────────────────── 2. Inscribed sphere ───────────────────────── */

export type InscribedSphere = {
  A: number; H: number; S: number; r: number;
  /** Scene coordinates of the existing renderer: y is up, M lies on +z. */
  points: { O: Point3; V: Point3; M: Point3; I: Point3; T: Point3 };
  OI: number; VI: number; MT: number; VT: number; MO: number;
  heightRatio: number; apothemRatio: number; tangentRatio: number;
  errors: { heightRatio: number; tangentRatio: number };
  /** Distances from I to the base and to the four faces (all equal r for a tangent sphere). */
  distances: { base: number; faces: [number, number, number, number] };
  /** |IT| and IT·VM — radius to the tangency point and its perpendicularity. */
  IT: number; ITdotVM: number;
};

/** r = AH/(A+S): the in-section circle of triangle VOM touching OM and VM. */
export function inscribedSphere(bh: number, base = 2): InscribedSphere {
  const g = geoFromBH(bh, base);
  const { A, H, S } = g;
  const r = (A * H) / (A + S);
  const O: Point3 = [0, 0, 0], V: Point3 = [0, H, 0], M: Point3 = [0, 0, A], I: Point3 = [0, r, 0];
  // Tangent lengths from M are equal: MT = MO = A, measured from M along MV.
  const T: Point3 = [0, (A * H) / S, A - (A * A) / S];
  // Faces: H·|coord| + A·y = A·H for coord ∈ {x, z}; unit normal (±H, A)/S.
  const face = (sx: number, sz: number) => Math.abs(H * (sx * I[0] + sz * I[2]) + A * I[1] - A * H) / S;
  const IT = Math.hypot(T[0] - I[0], T[1] - I[1], T[2] - I[2]);
  const ITdotVM = (T[1] - I[1]) * (M[1] - V[1]) + (T[2] - I[2]) * (M[2] - V[2]);
  const heightRatio = (H - r) / r, tangentRatio = A / (S - A);
  return {
    A, H, S, r, points: { O, V, M, I, T },
    OI: r, VI: H - r, MT: A, VT: S - A, MO: A,
    heightRatio, apothemRatio: S / A, tangentRatio,
    errors: { heightRatio: relativeError(heightRatio, PHI), tangentRatio: relativeError(tangentRatio, PHI) },
    distances: { base: r, faces: [face(1, 0), face(-1, 0), face(0, 1), face(0, -1)] },
    IT, ITdotVM,
  };
}

/* ───────────────────────── 3. Why 11:7? ───────────────────────── */

export type RatioCheck = { p: number; q: number; bh: number; pi: { value: number; error: number }; phi: { value: number; error: number } };

/** π and φ rows of the existing engine for B/H = p/q, errors kept separate. */
export function ratioCheck(p: number, q: number): RatioCheck {
  const geo = geoFromBH(p / q);
  const rows = evaluateRelations(geo);
  const pick = (id: "pi" | "phi") => {
    const r = rows.find((row) => row.id === id)!;
    return { value: r.value, error: r.error };
  };
  return { p, q, bh: p / q, pi: pick("pi"), phi: pick("phi") };
}

/** Comparison ratios in fixed order of denominator. Not a ranking. */
export const COMPARISON_RATIOS: readonly [number, number][] = [[3, 2], [8, 5], [11, 7], [14, 9], [19, 12], [25, 16]];

export function continuedFraction(x: number, terms: number) {
  const out: number[] = [];
  let v = x;
  for (let i = 0; i < terms; i++) {
    const a = Math.floor(v);
    out.push(a);
    const rest = v - a;
    if (rest < 1e-12) break;
    v = 1 / rest;
  }
  return out;
}

export function convergents(cf: readonly number[]) {
  const out: [number, number][] = [];
  let [h0, h1, k0, k1] = [1, cf[0]!, 0, 1];
  out.push([h1, k1]);
  for (const a of cf.slice(1)) {
    [h0, h1] = [h1, a * h1 + h0];
    [k0, k1] = [k1, a * k1 + k0];
    out.push([h1, k1]);
  }
  return out;
}

/** S/A = φ ⇔ H/A = √φ; 2B/H = π ⇔ H/A = 4/π. */
export const SLOPE_TARGETS = { phi: Math.sqrt(PHI), pi: 4 / Math.PI } as const;
/** Six terms are exact in double precision for both expansions. */
export const CF_TERMS = 6;

/** Intervals of x = B/H within ε of π (2x) and of φ (√(1 + 4/x²)). */
export function thresholdIntervals(eps = RELATIVE_TOLERANCE) {
  const pi: [number, number] = [(Math.PI * (1 - eps)) / 2, (Math.PI * (1 + eps)) / 2];
  const phi: [number, number] = [2 / Math.sqrt(PHI ** 2 * (1 + eps) ** 2 - 1), 2 / Math.sqrt(PHI ** 2 * (1 - eps) ** 2 - 1)];
  const joint: [number, number] = [Math.max(pi[0], phi[0]), Math.min(pi[1], phi[1])];
  return { pi, phi, joint };
}

function gcd(a: number, b: number): number { return b ? gcd(b, a % b) : a; }
/** Reduced fractions p/q (q ≤ maxQ) inside a closed interval. */
export function fractionsIn([lo, hi]: [number, number], maxQ = 20): [number, number][] {
  const out: [number, number][] = [];
  for (let q = 1; q <= maxQ; q++) {
    for (let p = Math.ceil(lo * q); p <= Math.floor(hi * q); p++) if (gcd(p, q) === 1) out.push([p, q]);
  }
  return out;
}

/** One colour per quantity, shared by 3D segments, labels and panel numbers. */
export const EXTENSION_COLORS = {
  L: "#c4a574", W: "#8eafaa", limit: "#9fb8d8", phi: "#ece8e1",
  OI: "#d3a99d", VI: "#8eafaa", MT: "#c4a574", VT: "#b4a5c4", sphere: "#c5ccd4",
  pi: "#b7a890", B: "#b7a890", H: "#c5ccd4", S: "#8eafaa", A: "#c4a574",
} as const;
