import { afterEach, describe, expect, it, vi } from "vitest";
import { playbackTimer } from "./playback-timer";

describe("lesson and tutorial timers", () => {
  afterEach(() => vi.useRealTimers());
  it.each([4200, 18000])("advances once after %s ms and cancels a pending callback", (delay) => {
    vi.useFakeTimers();
    const visibility = Object.assign(new EventTarget(), { hidden: false });
    const advance = vi.fn(), pause = vi.fn();
    let cancel = playbackTimer(delay, advance, pause, false, visibility);
    vi.advanceTimersByTime(delay - 1); expect(advance).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1); expect(advance).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(delay); expect(advance).toHaveBeenCalledTimes(1);
    cancel();
    cancel = playbackTimer(delay, advance, pause, false, visibility);
    cancel(); vi.advanceTimersByTime(delay);
    expect(advance).toHaveBeenCalledTimes(1);
  });
  it.each([4200, 18000])("hiding the page cancels %s ms playback without catch-up", (delay) => {
    vi.useFakeTimers();
    const visibility = Object.assign(new EventTarget(), { hidden: false });
    const advance = vi.fn(), pause = vi.fn();
    const cancel = playbackTimer(delay, advance, pause, false, visibility);
    vi.advanceTimersByTime(delay / 2);
    visibility.hidden = true; visibility.dispatchEvent(new Event("visibilitychange"));
    visibility.hidden = false; visibility.dispatchEvent(new Event("visibilitychange"));
    vi.advanceTimersByTime(delay * 2);
    expect(pause).toHaveBeenCalledTimes(1); expect(advance).not.toHaveBeenCalled();
    cancel();
  });
  it.each([[true, false], [false, true]])("does not schedule with reduced=%s, hidden=%s", (reduced, hidden) => {
    vi.useFakeTimers();
    const visibility = Object.assign(new EventTarget(), { hidden });
    const advance = vi.fn(), pause = vi.fn();
    playbackTimer(4200, advance, pause, reduced, visibility)();
    vi.runAllTimers(); expect(pause).toHaveBeenCalledOnce(); expect(advance).not.toHaveBeenCalled();
  });
});
