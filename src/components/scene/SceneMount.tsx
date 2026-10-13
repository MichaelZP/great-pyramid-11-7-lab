import { useCallback, useEffect, useState, type ComponentType } from "react";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

function SceneFallback({ onRetry }: { onRetry: () => void }) {
  const { t } = useI18n();
  return (
    <div
      role="alert"
      className="flex h-full w-full flex-col items-center justify-center gap-4 bg-bg p-6 text-center"
    >
      <p className="font-display text-lg text-muted">{t("sceneLoadError")}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        {t("retry")}
      </Button>
    </div>
  );
}

export function SceneMount() {
  const [Canvas, setCanvas] = useState<ComponentType | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    let cancelled = false;
    import("./PyramidCanvas")
      .then((mod) => {
        if (!cancelled) setCanvas(() => mod.PyramidCanvas);
      })
      .catch((error: unknown) => {
        console.error("Failed to load 3D scene", error);
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retryImport = useCallback(() => {
    setFailed(false);
    setAttempt((n) => n + 1);
  }, []);

  if (failed) return <SceneFallback onRetry={retryImport} />;

  if (!Canvas) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-bg">
        <div
          aria-hidden
          className="absolute left-1/2 top-[42%] h-40 w-52 -translate-x-1/2 -translate-y-1/2"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "var(--color-stone)",
          }}
        />
        <p className="font-display relative mt-48 text-lg text-muted">
          {t("assembling")}
        </p>
      </div>
    );
  }

  return (
    <SceneErrorBoundary fallback={(reset) => <SceneFallback onRetry={reset} />}>
      <Canvas />
    </SceneErrorBoundary>
  );
}
