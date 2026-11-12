import { describe, expect, it } from "vitest";
import { fmt, fmtDeg, fmtPct, fmtSci } from "./utils";

describe("number formatting", () => {
  it("uses the locale decimal separator", () => {
    expect(fmt(1.5, 2)).toBe("1.50");
    expect(fmt(1.5, 2, "pl")).toBe("1,50");
    expect(fmtDeg(51.84, 2, "pl")).toBe("51,84°");
    expect(fmtPct(0.00034, 3)).toBe("0.034 %");
  });

  it("never shows negative zero", () => {
    expect(fmt(-0, 6)).toBe("0.000000");
    expect(fmt(-1e-9, 6)).toBe("0.000000");
    expect(fmt(-1e-9, 6, "pl")).toBe("0,000000");
    expect(fmt(-0.4, 0)).toBe("0");
    expect(fmtPct(-1e-12, 3)).toBe("0.000 %");
    expect(fmtDeg(-1e-7, 4)).toBe("0.0000°");
  });

  it("keeps real negatives", () => {
    expect(fmt(-0.00002, 6)).toBe("-0.000020");
    expect(fmt(-1.25, 2, "pl")).toBe("-1,25");
  });

  it("returns a dash for non-finite input", () => {
    expect(fmt(Number.NaN)).toBe("—");
    expect(fmtPct(Number.POSITIVE_INFINITY)).toBe("—");
    expect(fmtSci(Number.NaN)).toBe("—");
  });

  it("formats scientific notation outside the plain range", () => {
    expect(fmtSci(0)).toBe("0");
    expect(fmtSci(0.5, 4)).toBe("0.5000");
    expect(fmtSci(1.5e-6)).toBe("1.50e-6");
    expect(fmtSci(1.5e-6, 4, "pl")).toBe("1,50e-6");
  });
});
