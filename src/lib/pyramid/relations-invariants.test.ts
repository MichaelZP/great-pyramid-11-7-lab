import { describe, expect, it } from "vitest";
import { CONSTANTS, MODELS, geoFromBH, relationValue } from "./engine";
import { RELATION_COMPARISONS, RELATION_PRESENTATIONS, lessonGeo, relationMeasures } from "./relations";

// Presentation-only invariants: they read engine.ts and never change it.
describe("relation presentation invariants", () => {
  it("numbers audit sections 1..13 in the same order as CONSTANTS", () => {
    expect(CONSTANTS.map((r) => RELATION_PRESENTATIONS[r.id].auditSection)).toEqual(CONSTANTS.map((_, i) => i + 1));
  });

  it("lists every compared quantity in the legend and matches renderer to scene", () => {
    const renderer = { "pyramid-lengths": "lengths", "pyramid-angles": "angles", "oval-section": "oval" } as const;
    for (const { id } of CONSTANTS) {
      const p = RELATION_PRESENTATIONS[id];
      const def = RELATION_COMPARISONS[id];
      for (const q of [...def.numerator, ...def.denominator]) expect(p.quantities).toContain(q);
      expect(p.renderer).toBe(renderer[p.scene]);
    }
  });

  it.each([11 / 7, 1.54, 1.62, ...MODELS.flatMap((m) => (m.bh ? [m.bh] : []))])(
    "the bar comparison reproduces the engine value at B/H=%s",
    (bh) => {
      const geo = geoFromBH(bh);
      for (const { id } of CONSTANTS) {
        expect(relationMeasures(id, lessonGeo(geo)).ratio).toBeCloseTo(relationValue(id, geo), 9);
      }
    },
  );
});
