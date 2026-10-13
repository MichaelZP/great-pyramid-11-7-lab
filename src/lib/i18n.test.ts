import { describe, expect, it } from "vitest";
import { translations } from "./i18n";

describe("i18n parity", () => {
  it("EN and PL define the same keys", () => {
    expect(Object.keys(translations.pl).sort()).toEqual(Object.keys(translations.en).sort());
  });
  it("has scene fallback strings", () => {
    expect(translations.en.sceneLoadError).toBeTruthy();
    expect(translations.pl.retry).toBe("Spróbuj ponownie");
  });
});
