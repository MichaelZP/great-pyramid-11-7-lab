import { useEffect, useState, type ComponentType } from "react";
import { useI18n } from "@/hooks/use-i18n";

export function SceneMount() {
  const [Canvas, setCanvas] = useState<ComponentType | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    let cancelled = false;
    void import("./PyramidCanvas").then((mod) => {
      if (!cancelled) setCanvas(() => mod.PyramidCanvas);
    });
    return () => {
      cancelled = true;
    };
  }, []);

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

  return <Canvas />;
}
