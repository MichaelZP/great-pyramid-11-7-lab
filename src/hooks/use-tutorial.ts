import { useEffect } from "react";
import { useReducedMotion } from "./use-relation-lesson";
import { useTutorialStore } from "@/store/tutorial-store";
import { useLabStore } from "@/store/lab-store";
import { TUTORIAL_INTERVAL } from "@/lib/pyramid/tutorial";
import { playbackTimer } from "@/lib/playback-timer";

export function useTutorial() {
  const { open, step, playing } = useTutorialStore();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!open || !playing) return;
    return playbackTimer(TUTORIAL_INTERVAL, () => useTutorialStore.getState().advance(),
      () => useTutorialStore.getState().pause(), reduced);
  }, [open, step, playing, reduced]);
  useEffect(() => {
    // Other lab controls cancel auto-play without erasing the saved tutorial step.
    const unsubscribe = useLabStore.subscribe((state, previous) => {
      if (state.modelId !== previous.modelId || state.customBH !== previous.customBH || state.lessonPlaying || ((state.relationId !== previous.relationId || state.lessonStep !== previous.lessonStep) && useTutorialStore.getState().playing)) {
        useTutorialStore.getState().pause();
      }
    });
    return unsubscribe;
  }, []);
}
