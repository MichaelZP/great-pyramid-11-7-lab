import { describe, expect, it } from "vitest";
import { CONSTANTS, GOLDEN_EGG_Z0, MODELS, PHI, eggLengthOverWidth, geoFromBH, snapshotFor } from "./engine";
import {
  COMPARISON_RATIOS, CF_TERMS, EGG_Z0_CHECKPOINTS, EGG_Z0_SLIDER, SLOPE_TARGETS, continuedFraction, convergents,
  eggLimit, eggZ0Min, fractionsIn, inscribedSphere, nextSweepZ0, ratioCheck, relativeError, thresholdIntervals,
} from "./geometric-extensions";
import mainResults from "./__fixtures__/engine-13-main-fd7308f.json";
import reference from "../../../docs/geometric-extensions/reference-values.json";

const ELEVEN_SEVEN = 11 / 7;
const g117 = geoFromBH(ELEVEN_SEVEN, 11);

describe("golden egg limit", () => {
  it("11:7 limit is √317/11 and lies above φ", () => {
    const e = eggLimit(g117, GOLDEN_EGG_Z0);
    expect(e.ok).toBe(true);
    if (!e.ok) return;
    expect(e.t).toBeCloseTo(14 / 11, 14);
    expect(e.limit).toBeCloseTo(Math.sqrt(317) / 11, 14);
    expect(e.limit).toBeCloseTo(1.618590346797, 12);
    expect(e.limitAbovePhi).toBe(true);
    expect(100 * e.errorLimitPhi).toBeCloseTo(0.034384818291, 9);
  });

  // mpmath (50 digits) and the research note's verify.py agree on these values.
  it.each([
    [7.65, 1.619742960852462, 0.1056202845211713],
    [15.3, 1.618662131983311, 0.03882138680542927],
    [30.6, 1.618594832386571, 0.03466204298398083],
  ])("z0 = %s gives the audited L/W", (z0, lw, pct) => {
    const e = eggLimit(g117, z0);
    expect(e.ok).toBe(true);
    if (!e.ok) return;
    expect(e.ratio).toBeCloseTo(lw, 11);
    expect(100 * e.errorPhi).toBeCloseTo(pct, 8);
    expect(e.ratio).toBeGreaterThan(e.limit);
  });

  it("checkpoints are 7.65, 15.3 and 30.6 and stay on the slider grid", () => {
    expect(EGG_Z0_CHECKPOINTS.map((z) => Number(z.toFixed(2)))).toEqual([7.65, 15.3, 30.6]);
    for (const z of EGG_Z0_CHECKPOINTS) expect(z).toBeLessThanOrEqual(EGG_Z0_SLIDER.max);
  });

  it("z0 = 7.65 reproduces the unchanged eggLW engine row exactly", () => {
    const e = eggLimit(g117, GOLDEN_EGG_Z0);
    if (!e.ok) throw new Error("no oval");
    expect(e.ratio).toBeCloseTo(eggLengthOverWidth(g117.angleDeg), 10);
  });

  it("L/W > S/A across the domain, for several slopes, and decreases towards S/A", () => {
    for (const bh of [1.2, 1.54, 1.5723, ELEVEN_SEVEN, 1.62, 2.4]) {
      const geo = geoFromBH(bh, 11);
      const zMin = eggZ0Min(geo.H / geo.A);
      let previous = Infinity;
      for (const k of [1.001, 1.01, 1.1, 1.5, 2, 3, 5, 10, 17]) {
        const e = eggLimit(geo, zMin * k);
        expect(e.ok).toBe(true);
        if (!e.ok) continue;
        expect(e.ratio).toBeGreaterThan(e.limit);
        expect(e.ratio).toBeLessThan(previous);
        previous = e.ratio;
        // Proof: the projected oval has width below its x-extent b − a.
        expect(e.oval.W).toBeLessThan(e.chord);
        expect(e.oval.L).toBeCloseTo(e.chord * e.limit, 12);
      }
      expect(previous - Math.sqrt(1 + (geo.H / geo.A) ** 2)).toBeLessThan(2e-4);
    }
  });

  it("S/A > φ is not universal: recomputed for the slope", () => {
    expect(eggLimit(geoFromBH(1.6), 7.65)).toMatchObject({ ok: true, limitAbovePhi: false });
    const phiModel = MODELS.find((m) => m.id === "phi")!;
    const e = eggLimit(geoFromBH(phiModel.bh!), 7.65);
    if (!e.ok) throw new Error("no oval");
    expect(e.limit).toBeCloseTo(PHI, 14);
  });

  it("does not return an oval outside t > 0, z0 > 0, z0² > 4t", () => {
    const zMin = eggZ0Min(14 / 11);
    expect(zMin).toBeCloseTo(2.256304299271065, 12);
    for (const z0 of [0, -1, Number.NaN, Infinity, 1, zMin * 0.999, zMin]) {
      const e = eggLimit(g117, z0);
      expect(e.ok).toBe(false);
      expect(e).not.toHaveProperty("oval");
      expect(Number.isFinite(e.limit)).toBe(true);
    }
    expect(eggLimit({ H: 0, A: 1, angleDeg: 0 }, 7.65)).toMatchObject({ ok: false, reason: "slope" });
    const just = eggLimit(g117, zMin * 1.0001);
    expect(just.ok).toBe(true);
    if (just.ok) {
      expect(Number.isFinite(just.ratio)).toBe(true);
      // Only the closed component: both ends finite and around Z₀.
      expect(just.oval.zLo).toBeGreaterThan(0);
      expect(just.oval.zLo).toBeLessThan(just.z0);
      expect(just.oval.zHi).toBeGreaterThan(just.z0);
      expect(just.oval.contour.every((p) => p.every(Number.isFinite))).toBe(true);
    }
  });

  it("the slider sweep stays on the grid and ends at the slider maximum", () => {
    let z = GOLDEN_EGG_Z0, n = 0;
    while (z < EGG_Z0_SLIDER.max && n < 500) { const next = nextSweepZ0(z); expect(next).toBeGreaterThan(z); z = next; n++; }
    expect(z).toBe(EGG_Z0_SLIDER.max);
    expect(n).toBeLessThan(80);
  });

  it("is scale invariant in B (depends on t and z0 only)", () => {
    const a = eggLimit(geoFromBH(ELEVEN_SEVEN, 2), 7.65), b = eggLimit(geoFromBH(ELEVEN_SEVEN, 440), 7.65);
    if (!a.ok || !b.ok) throw new Error("no oval");
    expect(a.ratio).toBeCloseTo(b.ratio, 12);
  });
});

describe("inscribed sphere", () => {
  const s = inscribedSphere(ELEVEN_SEVEN, 11);
  it("11:7 values (B = 11, H = 7)", () => {
    expect(s.A).toBe(5.5);
    expect(s.H).toBeCloseTo(7, 14);
    expect(s.r).toBeCloseTo(2.673193998657622, 12);
    expect(s.r).toBeCloseTo((11 * (Math.sqrt(317) - 11)) / 28, 12);
    expect(s.heightRatio).toBeCloseTo(1.618590346796805, 12);
    expect(100 * s.errors.heightRatio).toBeCloseTo(0.034384818291, 9);
    expect(s.tangentRatio).toBeCloseTo(1.616578734502109, 12);
    expect(100 * s.errors.tangentRatio).toBeCloseTo(0.08993965874, 9);
    expect(s.VT).toBeCloseTo(3.402246907382428, 12);
  });

  it.each([1.54, ELEVEN_SEVEN, 1.5723, 1.62, 2])("bh = %s: tangent to the base and all four faces", (bh) => {
    const x = inscribedSphere(bh, 11);
    expect(x.distances.base).toBeCloseTo(x.r, 12);
    for (const d of x.distances.faces) expect(d).toBeCloseTo(x.r, 12);
    // T is on segment VM, at distance r from I, and IT ⟂ VM.
    expect(x.IT).toBeCloseTo(x.r, 12);
    expect(x.ITdotVM).toBeCloseTo(0, 11);
    const [, ty, tz] = x.points.T;
    expect(x.H * tz + x.A * ty).toBeCloseTo(x.A * x.H, 11);
    expect(Math.hypot(ty - x.points.M[1], tz - x.points.M[2])).toBeCloseTo(x.MT, 12);
    expect(Math.hypot(ty - x.points.V[1], tz - x.points.V[2])).toBeCloseTo(x.VT, 12);
  });

  it.each([1.54, ELEVEN_SEVEN, 1.62])("bh = %s: MT = A and the height split equals S/A", (bh) => {
    const x = inscribedSphere(bh, 11);
    expect(x.MT).toBe(x.A);
    expect(x.MT + x.VT).toBeCloseTo(x.S, 12);
    expect(x.OI + x.VI).toBeCloseTo(x.H, 12);
    expect(x.heightRatio).toBeCloseTo(x.S / x.A, 12);
    expect(x.VI / x.H).toBeCloseTo(x.S / (x.S + x.A), 12);
    // r = 3·volume / total surface.
    const B = 2 * x.A;
    expect(x.r).toBeCloseTo((B * B * x.H) / (B * B + 2 * B * x.S), 12);
  });

  it("ratios are scale invariant; lengths scale linearly", () => {
    const a = inscribedSphere(ELEVEN_SEVEN, 2), b = inscribedSphere(ELEVEN_SEVEN, 440);
    expect(a.heightRatio).toBeCloseTo(b.heightRatio, 12);
    expect(a.tangentRatio).toBeCloseTo(b.tangentRatio, 12);
    expect(b.r / a.r).toBeCloseTo(220, 9);
    expect(a.r).toBeCloseTo(0.486035272483204, 12);
  });

  it("the exact φ model splits both in φ", () => {
    const x = inscribedSphere(2 / Math.sqrt(PHI));
    expect(x.heightRatio).toBeCloseTo(PHI, 12);
    expect(x.tangentRatio).toBeCloseTo(PHI, 12);
  });
});

describe("why 11:7", () => {
  it("2B/H = 22/7 and S/A errors use the engine definition", () => {
    const r = ratioCheck(11, 7);
    expect(r.pi.value).toBeCloseTo(22 / 7, 14);
    expect(100 * r.pi.error).toBeCloseTo(0.040249943477, 9);
    expect(r.phi.value).toBeCloseTo(1.618590346797, 12);
    expect(100 * r.phi.error).toBeCloseTo(0.034384818291, 9);
    expect(relativeError(22 / 7, Math.PI)).toBe(r.pi.error);
  });

  it("comparison list is in fixed denominator order and contains 11:7", () => {
    const q = COMPARISON_RATIOS.map(([, d]) => d);
    expect([...q].sort((a, b) => a - b)).toEqual(q);
    expect(COMPARISON_RATIOS).toContainEqual([11, 7]);
    expect(ratioCheck(3, 2).pi.error).toBeCloseTo(0.045070341448628, 12);
    expect(ratioCheck(8, 5).phi.error).toBeCloseTo(0.010662896769562, 12);
  });

  it("continued fractions: 14/11 is a convergent of √φ and of 4/π", () => {
    const a = continuedFraction(SLOPE_TARGETS.phi, CF_TERMS), b = continuedFraction(SLOPE_TARGETS.pi, CF_TERMS);
    expect(a).toEqual([1, 3, 1, 2, 11, 3]);
    expect(b).toEqual([1, 3, 1, 1, 1, 15]);
    expect(convergents(a)).toContainEqual([14, 11]);
    expect(convergents(b)).toContainEqual([14, 11]);
    expect(convergents(a)[3]).toEqual([14, 11]);
    expect(convergents(b)[4]).toEqual([14, 11]);
    // H/A = 14/11 ⇔ B/H = 2A/H = 11/7.
    expect(2 / (14 / 11)).toBeCloseTo(11 / 7, 15);
  });

  it("0.1% thresholds: smallest denominator is 7, and the π condition alone already forces it", () => {
    const I = thresholdIntervals();
    expect(I.joint[0]).toBeCloseTo(1.5697636082564704, 14);
    expect(I.joint[1]).toBeCloseTo(1.5723671231216915, 14);
    expect(fractionsIn(I.joint)).toEqual([[11, 7]]);
    expect(fractionsIn(I.pi)).toEqual([[11, 7]]);
    expect(fractionsIn(I.phi)).toEqual([[11, 7]]);
    for (const iv of [I.pi, I.phi]) { expect(iv[0]).toBeGreaterThan(1.5); expect(iv[1]).toBeLessThan(1.6); }
  });
});

describe("existing 13 results are unchanged", () => {
  it("snapshot against main @ fd7308f", () => {
    expect(CONSTANTS).toHaveLength(13);
    for (const m of MODELS) {
      const s = snapshotFor(m, 1.57);
      const ref = (mainResults as Record<string, { angleDeg: number; bh: number; matches: number; combined: number; results: Record<string, { value: number; error: number; within: boolean }> }>)[m.id]!;
      expect(s.geo.angleDeg).toBe(ref.angleDeg);
      expect(s.summary.matches).toBe(ref.matches);
      expect(s.consensus.combined).toBe(ref.combined);
      for (const r of s.results) expect({ value: r.value, error: r.error, within: r.within }).toEqual(ref.results[r.id]);
    }
    expect(GOLDEN_EGG_Z0).toBe(7.65);
  });
});

// Shared contract for the GeoGebra file and the edu site: independent mpmath values.
describe("matches the independent reference values (GeoGebra contract)", () => {
  it("egg sections", () => {
    for (const sec of reference.eggLimit.sections) {
      const e = eggLimit(g117, sec.z0);
      if (!e.ok) throw new Error("no oval");
      expect(e.oval.length[0][0]).toBeCloseTo(sec.a, 12);
      expect(e.oval.length[1][0]).toBeCloseTo(sec.b, 12);
      expect(e.oval.width[0][0]).toBeCloseTo(sec.xWmax, 9);
      expect(e.oval.L).toBeCloseTo(sec.L, 12);
      expect(e.oval.W).toBeCloseTo(sec.W, 12);
      expect(e.ratio).toBeCloseTo(sec.LW, 11);
    }
    expect(eggZ0Min(14 / 11)).toBeCloseTo(reference.eggLimit.z0Min, 13);
  });
  it("sphere and 11:7 numbers", () => {
    const s = inscribedSphere(ELEVEN_SEVEN, 11);
    expect(s.r).toBeCloseTo(reference.inSphere.r, 12);
    expect(s.points.T[2]).toBeCloseTo(reference.inSphere.T.alongBase, 12);
    expect(s.points.T[1]).toBeCloseTo(reference.inSphere.T.height, 12);
    expect(inscribedSphere(ELEVEN_SEVEN, 2).r).toBeCloseTo(reference.inSphere.rSceneBase2, 12);
    expect(s.tangentRatio).toBeCloseTo(reference.inSphere.MToverVT, 12);
    const I = thresholdIntervals();
    expect(I.pi[0]).toBeCloseTo(reference.why117.intervalPi[0], 14);
    expect(I.phi[1]).toBeCloseTo(reference.why117.intervalPhi[1], 14);
  });
});
