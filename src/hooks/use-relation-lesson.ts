import { useEffect, useState } from "react";
import { useLabStore } from "@/store/lab-store";
import { playbackTimer } from "@/lib/playback-timer";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const hasMatchMedia = () => typeof window !== "undefined" && typeof window.matchMedia === "function";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => hasMatchMedia() && window.matchMedia(REDUCED_MOTION).matches);
  useEffect(() => {
    if (!hasMatchMedia()) return;
    const media = window.matchMedia(REDUCED_MOTION);
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
