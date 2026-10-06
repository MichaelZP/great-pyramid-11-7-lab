import type { ReactNode } from "react";
import { Aperture, Box, FlipHorizontal2, Glasses, Languages, Maximize2, Minimize2, RotateCcw, Spline, Table2 } from "lucide-react";
import { useLabStore } from "@/store/lab-store";
import { useActiveSnapshot } from "@/hooks/use-lab";
import { useI18n } from "@/hooks/use-i18n";
import { CONSTANTS } from "@/lib/pyramid/engine";
import { cn } from "@/lib/utils";
import { relationSceneDescription } from "@/lib/relation-copy";
import { RELATION_PRESENTATIONS } from "@/lib/pyramid/relations";
import { Button } from "@/components/ui/button";
import { useTutorialStore } from "@/store/tutorial-store";

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
  const relationId = useLabStore((s) => s.relationId);
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
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-stretch gap-2 px-2 pt-[calc(env(safe-area-inset-top)+0.5rem)] lg:flex-row lg:items-start lg:justify-between lg:gap-3 lg:p-4">
      {sceneFullscreen ? (
        <div />
      ) : (
      <div className="panel pointer-events-auto shrink-0 max-w-[min(100%,28rem)] rounded-lg px-3 py-2 lg:px-4 lg:py-3">
        <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
          {t("siteKicker")}
        </p>
        <h1 className="font-display text-xl leading-none text-fg lg:text-3xl">
          {t("siteTitle")}
        </h1>
        <a href="https://prylski.dev/" target="_blank" rel="noopener noreferrer" className="mt-1 block text-xs text-muted underline underline-offset-2">
          Michał Przybylski — prylski.dev
        </a>
        <p className="sr-only">
          {t("siteLead")}
        </p>
        <p className="mt-1 font-mono text-[0.65rem] tabular text-fg lg:mt-2 lg:text-xs">
          {modelName(snap.model.id)}
          <span className="text-muted"> · </span>
          {fmtDeg(snap.geo.angleDeg, 4)}
          <span className="text-muted"> · </span>
          {t("score")} {fmt(snap.consensus.combined, 1)}
          <span className="text-muted"> · </span>
          {snap.summary.matches}/{CONSTANTS.length}
        </p>
        {relationId && RELATION_PRESENTATIONS[relationId].renderer ? (
          <p className="sr-only">{relationSceneDescription(relationId, locale)}</p>
        ) : snap.model.id === "goldenEgg" ? (
          <p className="sr-only">
            {t("goldenEggCaption")}
          </p>
        ) : showRainbow ? (
          <p className="sr-only">
            {t("rainbowCaption")}
          </p>
        ) : null}
      </div>
      )}

      <div className="pointer-events-auto flex min-w-0 w-full gap-1 overflow-x-auto pb-1 lg:w-auto lg:flex-wrap lg:justify-end lg:overflow-visible">
        <Button variant="outline" size="sm" className="min-h-11 shrink-0" onClick={() => useTutorialStore.getState().start()}>Tutorial</Button>
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
      aria-label={label}
      className={cn("min-h-11 shrink-0 gap-1.5 px-3", !pressed && "bg-bg-elevated/80")}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </Button>
  );
}
