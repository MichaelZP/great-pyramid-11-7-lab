import { create } from "zustand";
import {
  MODELS,
  type ModelId,
  RELATIVE_TOLERANCE,
} from "@/lib/pyramid/engine";
import type { Locale } from "@/lib/i18n";

export type LabTab = "modele" | "stale" | "skan" | "werdykt";

type LabState = {
  modelId: ModelId;
  customBH: number;
  tolerance: number;
  showRainbow: boolean;
  showHologram: boolean;
  showGuides: boolean;
  showTexture: boolean;
  pyramidOpacity: number;
  autoRotate: boolean;
  sceneFullscreen: boolean;
  crossEye: boolean;
  stereoSwap: boolean;
  mobileTab: LabTab;
  locale: Locale;
  setModel: (id: ModelId) => void;
  setCustomBH: (bh: number) => void;
  setTolerance: (t: number) => void;
  toggleRainbow: () => void;
  toggleHologram: () => void;
  toggleGuides: () => void;
  toggleTexture: () => void;
  setPyramidOpacity: (v: number) => void;
  toggleAutoRotate: () => void;
  toggleSceneFullscreen: () => void;
  setSceneFullscreen: (v: boolean) => void;
  toggleCrossEye: () => void;
  toggleStereoSwap: () => void;
  setMobileTab: (tab: LabTab) => void;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

export const useLabStore = create<LabState>((set) => ({
  modelId: "elevenSeven",
  customBH: MODELS.find((m) => m.id === "custom")?.bh ?? 1.57,
  tolerance: RELATIVE_TOLERANCE,
  showRainbow: true,
  showHologram: true,
  showGuides: true,
  showTexture: true,
  pyramidOpacity: 1,
  autoRotate: false,
  sceneFullscreen: false,
  crossEye: false,
  stereoSwap: false,
  mobileTab: "modele",
  locale: "en",
  setModel: (id) => set({ modelId: id }),
  setCustomBH: (bh) =>
    set({
      customBH: Math.min(1.62, Math.max(1.54, bh)),
      modelId: "custom",
    }),
  setTolerance: (t) => set({ tolerance: t }),
  toggleRainbow: () => set((s) => ({ showRainbow: !s.showRainbow })),
  toggleHologram: () => set((s) => ({ showHologram: !s.showHologram })),
  toggleGuides: () => set((s) => ({ showGuides: !s.showGuides })),
  toggleTexture: () => set((s) => ({ showTexture: !s.showTexture })),
  setPyramidOpacity: (v) =>
    set({ pyramidOpacity: Math.min(1, Math.max(0.12, v)) }),
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  toggleSceneFullscreen: () =>
    set((s) => ({ sceneFullscreen: !s.sceneFullscreen })),
  setSceneFullscreen: (v) => set({ sceneFullscreen: v }),
  toggleCrossEye: () => set((s) => ({ crossEye: !s.crossEye })),
  toggleStereoSwap: () => set((s) => ({ stereoSwap: !s.stereoSwap })),
  setMobileTab: (tab) => set({ mobileTab: tab }),
  setLocale: (locale) => set({ locale }),
  toggleLocale: () =>
    set((s) => ({ locale: s.locale === "en" ? "pl" : "en" })),
}));
