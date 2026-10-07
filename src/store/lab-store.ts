import { create } from "zustand";
import {
  MODELS,
  type ModelId,
  type ConstantId,
  RELATIVE_TOLERANCE,
} from "@/lib/pyramid/engine";
import type { Locale } from "@/lib/i18n";
import { relationSteps } from "@/lib/pyramid/relations";

export type LabTab = "modele" | "stale" | "skan" | "werdykt";

function initialLocale(): Locale {
  try { return localStorage.getItem("lab-locale") === "pl" ? "pl" : "en"; } catch { return "en"; }
}

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
  relationId: ConstantId | null;
  lessonStep: number | null;
  lessonPlaying: boolean;
  selectRelation: (id: ConstantId | null) => void;
  startLesson: () => void;
  pauseLesson: () => void;
  resumeLesson: () => void;
  setLessonStep: (step: number) => void;
  advanceLesson: () => void;
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
  locale: initialLocale(),
  relationId: null,
  lessonStep: null,
  lessonPlaying: false,
  selectRelation: (id) => set({ relationId: id, lessonStep: null, lessonPlaying: false }),
  startLesson: () => set((s) => relationSteps(s.relationId).length
    ? { lessonStep: 0, lessonPlaying: true } : {}),
  pauseLesson: () => set({ lessonPlaying: false }),
  resumeLesson: () => set((s) => ({ lessonPlaying: s.lessonStep !== null && s.lessonStep < relationSteps(s.relationId).length - 1 })),
  setLessonStep: (step) => set((s) => relationSteps(s.relationId).length
    ? { lessonStep: Math.min(relationSteps(s.relationId).length - 1, Math.max(0, step)), lessonPlaying: false } : {}),
  advanceLesson: () => set((s) => {
    if (!s.lessonPlaying || s.lessonStep === null) return {};
    const next = Math.min(relationSteps(s.relationId).length - 1, s.lessonStep + 1);
    return { lessonStep: next, lessonPlaying: next < relationSteps(s.relationId).length - 1 };
  }),
  setModel: (id) => set({ modelId: id, lessonStep: null, lessonPlaying: false }),
  setCustomBH: (bh) =>
    set({
      customBH: Math.min(1.62, Math.max(1.54, bh)),
      modelId: "custom",
      lessonStep: null,
      lessonPlaying: false,
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
