import type { ReactNode } from "react";
import { Aperture, Box, FlipHorizontal2, Glasses, Languages, Maximize2, Minimize2, RotateCcw, Spline, Table2 } from "lucide-react";
import { useLabStore } from "@/store/lab-store";
import { useActiveSnapshot } from "@/hooks/use-lab";
import { useI18n } from "@/hooks/use-i18n";
import { CONSTANTS } from "@/lib/pyramid/engine";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LabHeader() {
  const snap = useActiveSnapshot();
  const showRainbow = useLabStore((s) => s.showRainbow);
  const showHologram = useLabStore((s) => s.showHologram);
  const showGuides = useLabStore((s) => s.showGuides);
  const showTexture = useLabStore((s) => s.showTexture);
  const autoRotate = useLabStore((s) => s.autoRotate);
  const sceneFullscreen = useLabStore((s) => s.sceneFullscreen);
  const crossEye = useLabStore((s) => s.crossEye);
  const stereoSwap = useLabStore((s) => s.stereoSwap);
  const toggleRainbow = useLabStore((s) => s.toggleRainbow);
  const toggleHologram = useLabStore((s) => s.toggleHologram);
  const toggleGuides = useLabStore((s) => s.toggleGuides);
  const toggleTexture = useLabStore((s) => s.toggleTexture);
  const toggleAutoRotate = useLabStore((s) => s.toggleAutoRotate);
  const toggleSceneFullscreen = useLabStore((s) => s.toggleSceneFullscreen);
  const toggleCrossEye = useLabStore((s) => s.toggleCrossEye);
  const toggleStereoSwap = useLabStore((s) => s.toggleStereoSwap);
  const { t, locale, toggleLocale, fmt, fmtDeg, modelName } = useI18n();

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 sm:p-4">
      {sceneFullscreen ? (
        <div />
      ) : (
      <div className="panel pointer-events-auto max-w-[min(100%,28rem)] rounded-lg px-4 py-3">
        <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
          {t("siteKicker")}
        </p>
        <h1 className="font-display text-2xl leading-none text-fg sm:text-3xl">
          {t("siteTitle")}
        </h1>
        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted sm:text-sm">
          {t("siteLead")}
        </p>
        <p className="mt-2 font-mono text-xs tabular text-fg">
          {modelName(snap.model.id)}
          <span className="text-muted"> · </span>
          {fmtDeg(snap.geo.angleDeg, 4)}
          <span className="text-muted"> · </span>
          {t("score")} {fmt(snap.consensus.combined, 1)}
          <span className="text-muted"> · </span>
          {snap.summary.matches}/{CONSTANTS.length}
        </p>
        {snap.model.id === "goldenEgg" ? (
          <p className="mt-1.5 max-w-sm font-mono text-[0.65rem] leading-relaxed text-muted">
            {t("goldenEggCaption")}
          </p>
        ) : showRainbow ? (
          <p className="mt-1.5 max-w-sm font-mono text-[0.65rem] leading-relaxed text-muted">
            {t("rainbowCaption")}
          </p>
        ) : null}
      </div>
      )}

      <div className="pointer-events-auto flex flex-wrap justify-end gap-1">
        <Toggle
          pressed={showHologram}
          onClick={toggleHologram}
          label={t("hologram")}
          icon={<Table2 className="size-4" />}
        />
        <Toggle
          pressed={showRainbow}
          onClick={toggleRainbow}
          label={t("rainbow")}
          icon={<Aperture className="size-4" />}
        />
        <Toggle
          pressed={showGuides}
          onClick={toggleGuides}
          label={t("dimensions")}
          icon={<Spline className="size-4" />}
        />
        <Toggle
          pressed={showTexture}
          onClick={toggleTexture}
          label={t("stone")}
          icon={<Box className="size-4" />}
        />
        <Toggle
          pressed={autoRotate}
          onClick={toggleAutoRotate}
          label={t("rotate")}
          icon={<RotateCcw className="size-4" />}
        />
        <Toggle
          pressed={crossEye}
          onClick={toggleCrossEye}
          label={t("crossEye")}
          icon={<Glasses className="size-4" />}
        />
        {crossEye ? (
          <Toggle
            pressed={stereoSwap}
            onClick={toggleStereoSwap}
            label={t("reverseDepth")}
            icon={<FlipHorizontal2 className="size-4" />}
          />
        ) : null}
        <Toggle
          pressed={sceneFullscreen}
          onClick={toggleSceneFullscreen}
          label={sceneFullscreen ? t("exitFullscreen") : t("fullscreen")}
          icon={
            sceneFullscreen ? (
              <Minimize2 className="size-4" />
            ) : (
              <Maximize2 className="size-4" />
            )
          }
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={toggleLocale}
          aria-label={t("language")}
          className="min-h-11 gap-1.5 bg-bg-elevated/80 px-3"
        >
          <Languages className="size-4" />
          <span className="font-mono text-xs tracking-wide">
            {locale === "en" ? "EN" : "PL"}
            <span className="text-muted"> / </span>
            <span className="text-muted">{locale === "en" ? "PL" : "EN"}</span>
          </span>
        </Button>
      </div>
    </header>
  );
}

function Toggle({
  pressed,
  onClick,
  label,
  icon,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Button
      type="button"
      variant={pressed ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      aria-pressed={pressed}
      className={cn("min-h-11 gap-1.5 px-3", !pressed && "bg-bg-elevated/80")}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
