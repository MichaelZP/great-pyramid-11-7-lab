import { describe, expect, it } from "vitest";
import { CONSTANTS } from "./engine";
import { HISTORY_SOURCES, RELATION_HISTORY } from "./relation-history";

const FIELDS = ["concept", "name", "symbol", "mathematics", "interpretation"] as const;

describe("relation history", () => {
  it("covers exactly the relation ids defined in CONSTANTS", () => {
    expect(Object.keys(RELATION_HISTORY).sort()).toEqual(CONSTANTS.map((c) => c.id).sort());
  });

  it("every entry has non-empty pl and en text in each field", () => {
    for (const [id, entry] of Object.entries(RELATION_HISTORY)) {
      for (const field of FIELDS) {
        for (const locale of ["pl", "en"] as const) {
          expect(entry[field][locale].trim().length, `${id}.${field}.${locale}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every cited source exists in HISTORY_SOURCES", () => {
    for (const [id, entry] of Object.entries(RELATION_HISTORY)) {
      expect(entry.sources.length, `${id} sources`).toBeGreaterThan(0);
      for (const src of entry.sources) expect(HISTORY_SOURCES, `${id} -> ${src}`).toHaveProperty(src);
    }
  });

  it("every source has a title, an https url and bilingual scope", () => {
    for (const [id, s] of Object.entries(HISTORY_SOURCES)) {
      expect(s.title.length, id).toBeGreaterThan(0);
      expect(s.url, id).toMatch(/^https:\/\//);
      expect(s.scope.pl.length, id).toBeGreaterThan(0);
      expect(s.scope.en.length, id).toBeGreaterThan(0);
    }
  });
});
