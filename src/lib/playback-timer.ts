type Visibility = Pick<Document, "hidden" | "addEventListener" | "removeEventListener">;

/** One cancellable timer per active lesson. Hidden pages must not advance. */
export function playbackTimer(delay: number, advance: () => void, pause: () => void,
  reduced: boolean, visibility: Visibility = document) {
  if (reduced || visibility.hidden) { pause(); return () => {}; }
  const timer = setTimeout(advance, delay);
  const hidden = () => {
    if (visibility.hidden) { clearTimeout(timer); pause(); }
  };
  visibility.addEventListener("visibilitychange", hidden);
  return () => {
    clearTimeout(timer);
    visibility.removeEventListener("visibilitychange", hidden);
  };
}
