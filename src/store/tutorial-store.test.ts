import { beforeEach, describe, expect, it } from "vitest";
import { TUTORIAL_STEPS } from "@/lib/pyramid/tutorial";
import { useTutorialStore } from "./tutorial-store";

const tut = () => useTutorialStore.getState();
beforeEach(() => { tut().close(); tut().go(0); tut().close(); });

describe("tutorial store guards", () => {
  it("does not play while closed", () => {
    tut().play();
    expect(tut().playing).toBe(false);
  });

  it("pause is a no-op when nothing is playing", () => {
    tut().start();
    const before = tut();
    tut().pause();
    expect(tut()).toBe(before);
  });

  it("pauses while playing and keeps the step", () => {
    tut().go(2);
    tut().play();
    expect(tut().playing).toBe(true);
    tut().pause();
    expect(tut()).toMatchObject({ playing: false, step: 2, open: true });
  });

  it("advance stops at the last step and ignores calls while paused", () => {
    const last = TUTORIAL_STEPS.length - 1;
    tut().go(last - 1);
    tut().play();
    tut().advance();
    expect(tut()).toMatchObject({ step: last, playing: false });
    tut().advance();
    expect(tut().step).toBe(last);
    tut().play();
    expect(tut().playing).toBe(false);
  });
});
