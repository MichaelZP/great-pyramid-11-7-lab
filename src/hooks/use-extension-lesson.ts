import { useEffect } from "react";
import { useReducedMotion } from "./use-relation-lesson";
import { playbackTimer } from "@/lib/playback-timer";
import { EGG_SWEEP } from "@/lib/pyramid/geometric-extensions";
import { EXTENSION_INTERVAL, extensionFromHash, useExtensionStore } from "@/store/extension-store";

// Same cancellable clock as the relation lessons and the tutorial: one timer,
// paused on hidden pages and never started with reduced motion.
export function useExtensionLesson() {
  const id = useExtensionStore((s) => s.id);
  const playing = useExtensionStore((s) => s.playing);
  const step = useExtensionStore((s) => s.step);
  const z0 = useExtensionStore((s) => s.z0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!id || !playing) return;
    return playbackTimer(id === "eggLimit" ? EGG_SWEEP.interval : EXTENSION_INTERVAL,
      () => useExtensionStore.getState().tick(), () => useExtensionStore.getState().pause(), reduced);
  }, [id, playing, step, z0, reduced]);
  useEffect(() => {
    const fromHash = () => {
      const target = extensionFromHash(window.location.hash);
      if (target && target !== useExtensionStore.getState().id) useExtensionStore.getState().open(target);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);
}
