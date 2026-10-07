import { create } from "zustand";
import { useLabStore } from "./lab-store";
import { TUTORIAL_STEPS, validTutorialStep } from "@/lib/pyramid/tutorial";

export const TUTORIAL_STORAGE_KEY = "pyramid-tutorial-v1-step";
function savedStep() {
  try { return validTutorialStep(JSON.parse(localStorage.getItem(TUTORIAL_STORAGE_KEY) ?? "0")); } catch { return 0; }
}
function showStep(step: number) {
  const content = TUTORIAL_STEPS[step];
  const lab = useLabStore.getState();
  lab.setMobileTab("stale");
  lab.selectRelation(content.relation);
  lab.setLessonStep(content.lessonStep);
  try { localStorage.setItem(TUTORIAL_STORAGE_KEY, String(step)); } catch { /* memory still works */ }
}

type TutorialState = {
  open: boolean; step: number; playing: boolean; revision: number;
  start: () => void; close: () => void; pause: () => void; play: () => void;
  go: (step: number) => void; advance: () => void;
};
export const useTutorialStore = create<TutorialState>((set, get) => ({
  open: false, step: savedStep(), playing: false, revision: 0,
  start: () => { useLabStore.getState().setSceneFullscreen(false); showStep(get().step); set((s) => ({ open: true, playing: false, revision: s.revision + 1 })); },
  close: () => { set({ open: false, playing: false }); useLabStore.getState().selectRelation(null); },
  pause: () => set({ playing: false }),
  play: () => {
    const state = get();
    if (!state.open || state.step >= TUTORIAL_STEPS.length - 1) return;
    showStep(state.step); set({ playing: true });
  },
  go: (value) => {
    const step = validTutorialStep(value);
    showStep(step); set({ open: true, step, playing: false });
  },
  advance: () => {
    const state = get();
    if (!state.open || !state.playing) return;
    const step = Math.min(state.step + 1, TUTORIAL_STEPS.length - 1);
    showStep(step); set({ step, playing: step < TUTORIAL_STEPS.length - 1 });
  },
}));
