import { create } from "zustand";
import { GOLDEN_EGG_Z0 } from "@/lib/pyramid/engine";
import { EGG_Z0_SLIDER, nextSweepZ0 } from "@/lib/pyramid/geometric-extensions";
import { useLabStore } from "./lab-store";
import { useTutorialStore } from "./tutorial-store";

export type ExtensionId = "eggLimit" | "inSphere" | "why117";
export const EXTENSIONS: readonly ExtensionId[] = ["eggLimit", "inSphere", "why117"];
/** Step buttons per lesson; the egg lesson is driven by the Z₀ slider instead. */
export const EXTENSION_STEPS: Record<ExtensionId, number> = { eggLimit: 0, inSphere: 4, why117: 3 };
export const EXTENSION_INTERVAL = 4200;

/** Direct links: #ext=egg-limit, #ext=inscribed-sphere, #ext=why-11-7. */
export const EXTENSION_SLUGS: Record<ExtensionId, string> = { eggLimit: "egg-limit", inSphere: "inscribed-sphere", why117: "why-11-7" };
export function extensionFromHash(hash: string): ExtensionId | null {
  const slug = new URLSearchParams(hash.replace(/^#/, "")).get("ext");
  return EXTENSIONS.find((id) => EXTENSION_SLUGS[id] === slug) ?? null;
}
function writeHash(id: ExtensionId | null) {
  try {
    const url = new URL(window.location.href);
    url.hash = id ? `ext=${EXTENSION_SLUGS[id]}` : "";
    window.history.replaceState(window.history.state, "", url.hash ? url : url.pathname + url.search);
  } catch { /* no history API (tests) */ }
}

type ExtensionState = {
  id: ExtensionId | null;
  step: number;
  playing: boolean;
  z0: number;
  compare: [number, number];
  open: (id: ExtensionId) => void;
  close: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  setStep: (step: number) => void;
  setZ0: (z0: number) => void;
  setCompare: (ratio: [number, number]) => void;
};

const initial = { step: 0, playing: false, z0: GOLDEN_EGG_Z0, compare: [11, 7] as [number, number] };

export const useExtensionStore = create<ExtensionState>((set, get) => ({
  id: null,
  ...initial,
  open: (id) => {
    if (useTutorialStore.getState().open) useTutorialStore.getState().close();
    const lab = useLabStore.getState();
    lab.selectRelation(null);
    lab.setMobileTab("stale");
    set({ id, ...initial });
    writeHash(id);
  },
  close: () => { set({ id: null, ...initial }); writeHash(null); },
  play: () => {
    const s = get();
    if (!s.id) return;
    if (s.id === "eggLimit") set({ playing: true, z0: s.z0 >= EGG_Z0_SLIDER.max ? GOLDEN_EGG_Z0 : s.z0 });
    else set({ playing: true, step: s.step >= EXTENSION_STEPS[s.id] - 1 ? 0 : s.step });
  },
  pause: () => set({ playing: false }),
  reset: () => set({ ...initial }),
  tick: () => {
    const s = get();
    if (!s.id || !s.playing) return;
    if (s.id === "eggLimit") {
      const z0 = nextSweepZ0(s.z0);
      set({ z0, playing: z0 < EGG_Z0_SLIDER.max });
    } else {
      const step = Math.min(EXTENSION_STEPS[s.id] - 1, s.step + 1);
      set({ step, playing: step < EXTENSION_STEPS[s.id] - 1 });
    }
  },
  setStep: (step) => set((s) => s.id ? { step: Math.min(Math.max(EXTENSION_STEPS[s.id] - 1, 0), Math.max(0, step)), playing: false } : {}),
  setZ0: (z0) => set({ z0: Math.min(EGG_Z0_SLIDER.max, Math.max(EGG_Z0_SLIDER.min, z0)), playing: false }),
  setCompare: (compare) => set({ compare }),
}));

// A table relation or the tutorial replaces an open extension lesson.
useLabStore.subscribe((state, previous) => {
  if (state.relationId && state.relationId !== previous.relationId && useExtensionStore.getState().id) {
    useExtensionStore.getState().close();
  }
});
