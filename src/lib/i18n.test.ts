import { describe, expect, it } from "vitest";
import { translations } from "./i18n";

describe("i18n translations", () => {
  it("en and pl define exactly the same keys", () => {
    expect(Object.keys(translations.pl).sort()).toEqual(Object.keys(translations.en).sort());
  });

  it.each(["en", "pl"] as const)("every %s value is a non-empty string", (locale) => {
    for (const [key, value] of Object.entries(translations[locale])) {
      expect(typeof value, `${locale}.${key}`).toBe("string");
      expect((value as string).trim().length, `${locale}.${key}`).toBeGreaterThan(0);
    }
  });
});
