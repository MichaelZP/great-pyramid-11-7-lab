import { describe, expect, it } from "vitest";
import {
  PHI,
  GOLDEN_EGG_ANGLE,
  MODELS,
  SCORE_WEIGHTS,
  edgeAngleDeg,
  eggLengthOverWidth,
  evaluateRelations,
  geoFromAngle,
  geoFromBH,
  snapshotFor,
} from "./engine";

describe("geoFromBH(11/7)", () => {
  const geo = geoFromBH(11 / 7);

  it("angleDeg ≈ 51.8427734126309", () => {
    expect(geo.angleDeg).toBeCloseTo(51.8427734126309, 10);
  });

  it("sekedPalms ≈ 5.5", () => {
    expect(geo.sekedPalms).toBeCloseTo(5.5, 12);
  });

  it("edgeAngleDeg(angle) ≈ 41.985759", () => {
    expect(edgeAngleDeg(geo.angleDeg)).toBeCloseTo(41.985759, 6);
  });
});

describe("eleven-seven classical relative errors", () => {
  const geo = geoFromBH(11 / 7);
  const results = evaluateRelations(geo);
  const err = (id: string) => {
    const row = results.find((r) => r.id === id);
    if (!row) throw new Error("missing " + id);
    return row.error;
  };
  const val = (id: string) => {
    const row = results.find((r) => r.id === id);
    if (!row) throw new Error("missing " + id);
    return row.value;
  };

  const published: Record<string, number> = {
    pi: 0.0004025,
    gamma: 0.00003425,
    sqrt3: 0.00019894,
    sqrt6: 0.00019894,
    sqrt2: 0,
    sqrt5: 0.00019001,
    tribonacci: 0.00018465,
    brun: 0.00022382,
    invPhi: 0.00013131,
    phi: 0.00034385,
    e: 0.00035237,
    eMinus1: 0.00055745,
  };

  for (const [id, expected] of Object.entries(published)) {
    it(id + " relative error matches published table", () => {
      expect(Math.abs(err(id) - expected)).toBeLessThan(1e-8);
    });
  }

  it("sqrt2 is exact", () => {
    expect(err("sqrt2")).toBe(0);
    expect(val("sqrt2")).toBe(Math.SQRT2);
  });

  it("gamma * sqrt3 ≈ 1", () => {
    expect(val("gamma") * val("sqrt3")).toBeCloseTo(1, 12);
  });

  it("sqrt6 ≈ sqrt3 * sqrt2", () => {
    expect(val("sqrt6")).toBeCloseTo(val("sqrt3") * val("sqrt2"), 12);
  });

  it("eMinus1 ≈ e - 1", () => {
    expect(val("eMinus1")).toBeCloseTo(val("e") - 1, 12);
  });
});

describe("eggLengthOverWidth", () => {
  it("equals PHI at GOLDEN_EGG_ANGLE within 1e-11 relative", () => {
    const lw = eggLengthOverWidth(GOLDEN_EGG_ANGLE);
    expect(Math.abs(lw - PHI) / PHI).toBeLessThan(1e-11);
  });

  it("at 11:7 angle |L/W - PHI|/PHI ≈ 0.0010562", () => {
    const angle = geoFromBH(11 / 7).angleDeg;
    const rel = Math.abs(eggLengthOverWidth(angle) - PHI) / PHI;
    expect(Math.abs(rel - 0.0010562)).toBeLessThan(1e-5);
  });
});

describe("geoFromAngle", () => {
  it("51.795319256 -> bh ≈ 1.574109391", () => {
    expect(geoFromAngle(51.795319256).bh).toBeCloseTo(1.574109391, 9);
  });
});

describe("SCORE_WEIGHTS", () => {
  it("sum to 1 and equal 0.35 / 0.25 / 0.25 / 0.15", () => {
    expect(SCORE_WEIGHTS.numerical).toBe(0.35);
    expect(SCORE_WEIGHTS.measurement).toBe(0.25);
    expect(SCORE_WEIGHTS.fraction).toBe(0.25);
    expect(SCORE_WEIGHTS.robustness).toBe(0.15);
    expect(
      SCORE_WEIGHTS.numerical +
        SCORE_WEIGHTS.measurement +
        SCORE_WEIGHTS.fraction +
        SCORE_WEIGHTS.robustness,
    ).toBe(1);
  });
});

describe("model snapshots", () => {
  it("Golden Egg: matches === 10, maximum ≈ 0.003967", () => {
    const model = MODELS.find((m) => m.id === "goldenEgg");
    if (!model) throw new Error("goldenEgg model missing");
    const snap = snapshotFor(model, 11 / 7);
    expect(snap.summary.matches).toBe(10);
    expect(snap.summary.maximum).toBeCloseTo(0.003967, 6);
  });

  it("11:7: matches === 12", () => {
    const model = MODELS.find((m) => m.id === "elevenSeven");
    if (!model) throw new Error("elevenSeven model missing");
    const snap = snapshotFor(model, 11 / 7);
    expect(snap.summary.matches).toBe(12);
  });
});
