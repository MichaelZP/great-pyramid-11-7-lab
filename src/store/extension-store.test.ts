import { beforeEach, describe, expect, it } from "vitest";
import { EGG_Z0_SLIDER } from "@/lib/pyramid/geometric-extensions";
import { useLabStore } from "./lab-store";
import { extensionFromHash, useExtensionStore } from "./extension-store";

const ext = () => useExtensionStore.getState();
beforeEach(() => { ext().close(); useLabStore.getState().selectRelation(null); });

describe("geometric extension lessons", () => {
  it("parses direct links", () => {
    expect(extensionFromHash("#ext=egg-limit")).toBe("eggLimit");
    expect(extensionFromHash("#ext=inscribed-sphere")).toBe("inSphere");
    expect(extensionFromHash("ext=why-11-7")).toBe("why117");
    expect(extensionFromHash("#ext=nope")).toBeNull();
    expect(extensionFromHash("")).toBeNull();
  });

  it("opening a lesson clears a table relation; selecting a relation closes the lesson", () => {
    useLabStore.getState().selectRelation("phi");
    ext().open("inSphere");
    expect(useLabStore.getState().relationId).toBeNull();
    expect(useLabStore.getState().mobileTab).toBe("stale");
    useLabStore.getState().selectRelation("pi");
    expect(ext().id).toBeNull();
  });

  it("steps advance only while playing, stop at the last step, and reset", () => {
    ext().open("inSphere");
    ext().tick();
    expect(ext().step).toBe(0);
    ext().play();
    for (let i = 0; i < 6; i++) ext().tick();
    expect(ext().step).toBe(3);
    expect(ext().playing).toBe(false);
    ext().setStep(9);
    expect(ext().step).toBe(3);
    ext().reset();
    expect(ext()).toMatchObject({ step: 0, playing: false, z0: 7.65 });
  });

  it("egg sweep moves Z₀ up to the slider end; the slider clamps; reset returns 7.65", () => {
    ext().open("eggLimit");
    ext().play();
    for (let i = 0; i < 200 && ext().playing; i++) ext().tick();
    expect(ext().z0).toBe(EGG_Z0_SLIDER.max);
    expect(ext().playing).toBe(false);
    ext().setZ0(-5);
    expect(ext().z0).toBe(EGG_Z0_SLIDER.min);
    ext().setZ0(1000);
    expect(ext().z0).toBe(EGG_Z0_SLIDER.max);
    ext().reset();
    expect(ext().z0).toBe(7.65);
  });

  it("the lesson never changes the model, B/H or tolerance", () => {
    const before = useLabStore.getState();
    ext().open("why117");
    ext().setCompare([3, 2]);
    const after = useLabStore.getState();
    expect([after.modelId, after.customBH, after.tolerance]).toEqual([before.modelId, before.customBH, before.tolerance]);
  });
});
