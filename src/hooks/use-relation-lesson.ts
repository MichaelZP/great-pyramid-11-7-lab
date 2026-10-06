import { useEffect, useState } from "react";
import { useLabStore } from "@/store/lab-store";
import { playbackTimer } from "@/lib/playback-timer";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

// Lives in AppShell so switching mobile tabs/fullscreen never duplicates a timer.
export function useRelationLesson() {
  const playing = useLabStore((s) => s.lessonPlaying);
  const step = useLabStore((s) => s.lessonStep);
  const id = useLabStore((s) => s.relationId);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!playing) return;
    return playbackTimer(4200, () => useLabStore.getState().advanceLesson(),
      () => useLabStore.getState().pauseLesson(), reduced);
  }, [playing, step, id, reduced]);
}
