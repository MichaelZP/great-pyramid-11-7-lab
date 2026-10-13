import { createElement, isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

// No jsdom/testing-library in this repo, so drive the class lifecycle directly.
function make() {
  const child = createElement("span", null, "scene");
  const fallback = vi.fn((reset: () => void) => createElement("button", { onClick: reset }, "retry"));
  const b = new SceneErrorBoundary({ children: child, fallback });
  b.setState = ((s: { hasError: boolean }) => {
    b.state = { ...b.state, ...s };
  }) as typeof b.setState;
  return { b, child, fallback };
}

describe("SceneErrorBoundary", () => {
  it("renders children when healthy", () => {
    const { b, child, fallback } = make();
    expect(b.render()).toBe(child);
    expect(fallback).not.toHaveBeenCalled();
  });

  it("renders fallback after a child throws and recovers on reset", () => {
    const { b, child, fallback } = make();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    b.state = SceneErrorBoundary.getDerivedStateFromError();
    b.componentDidCatch(new Error("boom"), { componentStack: "" });
    const out = b.render();
    expect(isValidElement(out)).toBe(true);
    expect(fallback).toHaveBeenCalledWith(b.reset);
    (out as { props: { onClick: () => void } }).props.onClick();
    expect(b.state.hasError).toBe(false);
    expect(b.render()).toBe(child);
    spy.mockRestore();
  });
});
