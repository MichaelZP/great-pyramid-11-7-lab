import { describe, expect, it } from "vitest";
import { quantityLabel, relationCopy, relationSceneDescription } from "./relation-copy";
import { CONSTANTS } from "./pyramid/engine";

describe("relation copy", () => {
  it("pl and en copy have the same non-empty keys", () => {
    const pl = relationCopy("pl"), en = relationCopy("en");
    expect(Object.keys(pl).sort()).toEqual(Object.keys(en).sort());
    for (const v of [...Object.values(pl), ...Object.values(en)]) expect(v.trim().length).toBeGreaterThan(0);
  });

  it("quantityLabel formats symbol · name", () => {
    expect(quantityLabel("H", "en")).toMatch(/ · OV · height$/);
    expect(quantityLabel("H", "pl")).toMatch(/ · OV · wysokość$/);
  });

  it("every relation has a non-empty scene description in both locales", () => {
    for (const { id } of CONSTANTS) for (const l of ["pl", "en"] as const) {
      const d = relationSceneDescription(id, l);
      expect(d.length, `${id}/${l}`).toBeGreaterThan(1);
      expect(d.endsWith("."), `${id}/${l}`).toBe(true);
    }
  });
});
