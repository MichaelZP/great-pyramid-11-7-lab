import { beforeEach, describe, expect, it } from "vitest";
import { useLabStore } from "./lab-store";

const initial = useLabStore.getState();
const state = () => useLabStore.getState();

/** Keys whose values differ between two snapshots (functions ignored). */
function changed(before: object, after: object) {
  return Object.keys(after).filter((k) => {
    const a = (after as Record<string, unknown>)[k];
    return typeof a !== "function" && !Object.is((before as Record<string, unknown>)[k], a);
  }).sort();
}

describe("useLabStore", () => {
  beforeEach(() => useLabStore.setState(initial, true));

  it("setModel changes the model and resets the lesson", () => {
    useLabStore.setState({ lessonStep: 2, lessonPlaying: true });
    const before = state();
    state().setModel("custom");
    expect(changed(before, state())).toEqual(["lessonPlaying", "lessonStep", "modelId"]);
    expect(state().modelId).toBe("custom");
    expect(state().lessonStep).toBeNull();
  });

  it("setCustomBH keeps an in-range value exactly and switches to the custom model", () => {
    const x = 1.5713571357;
    state().setCustomBH(x);
    expect(state().customBH).toBe(x);
    expect(state().modelId).toBe("custom");
  });

  it("setCustomBH clamps to [1.54, 1.62]", () => {
    state().setCustomBH(1);
    expect(state().customBH).toBe(1.54);
    state().setCustomBH(2);
    expect(state().customBH).toBe(1.62);
  });

  it("setTolerance changes only tolerance", () => {
    const before = state();
    state().setTolerance(0.0123);
    expect(changed(before, state())).toEqual(["tolerance"]);
    expect(state().tolerance).toBe(0.0123);
  });

  const toggles = [
    ["toggleRainbow", "showRainbow"],
    ["toggleHologram", "showHologram"],
    ["toggleGuides", "showGuides"],
    ["toggleTexture", "showTexture"],
    ["toggleAutoRotate", "autoRotate"],
    ["toggleSceneFullscreen", "sceneFullscreen"],
    ["toggleCrossEye", "crossEye"],
    ["toggleStereoSwap", "stereoSwap"],
    ["toggleLocale", "locale"],
  ] as const;

  it.each(toggles)("%s flips only %s and is reversible", (action, field) => {
    const before = state();
    state()[action]();
    expect(changed(before, state())).toEqual([field]);
    state()[action]();
    expect(state()[field]).toBe(before[field]);
  });

  it("selectRelation sets the relation and resets the lesson", () => {
    useLabStore.setState({ lessonStep: 1, lessonPlaying: true });
    const before = state();
    state().selectRelation("pi");
    expect(changed(before, state())).toEqual(["lessonPlaying", "lessonStep", "relationId"]);
    expect(state().relationId).toBe("pi");
    state().selectRelation(null);
    expect(state().relationId).toBeNull();
  });

  it("setPyramidOpacity clamps to [0.12, 1]", () => {
    state().setPyramidOpacity(0);
    expect(state().pyramidOpacity).toBe(0.12);
    state().setPyramidOpacity(5);
    expect(state().pyramidOpacity).toBe(1);
  });
});
