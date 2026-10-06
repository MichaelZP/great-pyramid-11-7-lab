import { beforeEach, describe, expect, it } from "vitest";
import { CONSTANTS } from "./engine";
import { RELATION_HISTORY, HISTORY_SOURCES } from "./relation-history";
import { TUTORIAL_STEPS, validTutorialStep } from "./tutorial";
import { relationSteps } from "./relations";
import { useTutorialStore } from "@/store/tutorial-store";
import { useLabStore } from "@/store/lab-store";

describe("educational coverage", () => {
  it("documents every actual position, separately covering concept, name, notation and evidence", () => {
    expect(Object.keys(RELATION_HISTORY)).toEqual(CONSTANTS.map((c) => c.id));
    for (const entry of Object.values(RELATION_HISTORY)) {
      for (const field of [entry.concept, entry.name, entry.symbol, entry.mathematics, entry.interpretation]) {
        for (const locale of ["en", "pl"] as const) {
          expect(field[locale].length).toBeGreaterThan(25);
          expect(field[locale].length).toBeLessThan(300);
        }
      }
      expect(entry.sources.length).toBeGreaterThan(0);
      for (const id of entry.sources) expect(HISTORY_SOURCES[id]).toBeDefined();
    }
    for (const s of Object.values(HISTORY_SOURCES)) {
      expect(new URL(s.url).protocol).toBe("https:");
      expect(s.scope.en.length).toBeGreaterThan(25);
      expect(s.scope.pl.length).toBeGreaterThan(25);
    }
  });
  it("the dependency tour covers all thirteen rows with valid existing scene steps", () => {
    expect(new Set(TUTORIAL_STEPS.flatMap((s) => [...s.related]))).toEqual(new Set(CONSTANTS.map((c) => c.id)));
    for (const s of TUTORIAL_STEPS) {
      expect(s.lessonStep).toBeLessThan(relationSteps(s.relation).length);
      expect(s.related).toContain(s.relation);
      expect(s.text.pl.length).toBeLessThan(330);
      expect(s.text.en.length).toBeLessThan(330);
    }
  });
  it.each([null, {}, "2", -1, 9, 1.5, NaN, Infinity])("rejects corrupt saved step %s", (value) => {
    expect(validTutorialStep(value)).toBe(0);
  });
});

describe("tutorial navigation and cancellation", () => {
  const tutorial = () => useTutorialStore.getState();
  const lab = () => useLabStore.getState();
  beforeEach(() => {
    useTutorialStore.setState({ open: false, step: 0, playing: false });
    useLabStore.setState({ relationId: null, lessonStep: null, lessonPlaying: false, modelId: "elevenSeven" });
  });
  it("is optional and opens manually without changing numerical inputs", () => {
    expect(tutorial().open).toBe(false);
    const { modelId, tolerance, customBH } = lab();
    tutorial().start();
    expect(tutorial().playing).toBe(false);
    expect(lab().relationId).toBe("sqrt2");
    expect({ modelId: lab().modelId, tolerance: lab().tolerance, customBH: lab().customBH }).toEqual({ modelId, tolerance, customBH });
  });
  it("pause and skip reject a pending advance, keep progress, and reopen its scene", () => {
    tutorial().go(5);
    tutorial().play();
    tutorial().pause();
    tutorial().advance();
    expect(tutorial().step).toBe(5);
    tutorial().play();
    tutorial().close();
    tutorial().advance();
    expect(tutorial()).toMatchObject({ open: false, playing: false, step: 5 });
    expect(lab().relationId).toBeNull();
    tutorial().start();
    expect(tutorial()).toMatchObject({ open: true, playing: false, step: 5 });
    expect(lab().relationId).toBe("brun");
  });
  it("manual jumps pause auto-play and every arbitrary step restores its construction", () => {
    tutorial().start();
    tutorial().play();
    for (const index of [8, 0, 4, 1, 7, 6, 3, 2, 5]) {
      tutorial().go(index);
      expect(tutorial().step).toBe(index);
      expect(tutorial().playing).toBe(false);
      expect(lab().relationId).toBe(TUTORIAL_STEPS[index].relation);
      expect(lab().lessonStep).toBe(TUTORIAL_STEPS[index].lessonStep);
      expect(lab().lessonPlaying).toBe(false);
    }
  });
  it("auto progression stops at the final step without cycling or starting a second lesson", () => {
    tutorial().start();
    tutorial().play();
    for (let i = 0; i < TUTORIAL_STEPS.length + 3; i++) tutorial().advance();
    expect(tutorial()).toMatchObject({ step: 8, playing: false, open: true });
    expect(lab().lessonPlaying).toBe(false);
    tutorial().play();
    expect(tutorial().playing).toBe(false);
  });
});
