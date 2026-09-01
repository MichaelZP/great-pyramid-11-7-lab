import { MODELS, geoFromAngle } from "@/lib/pyramid/engine";
import { useLabStore } from "@/store/lab-store";
import { useActiveSnapshot, useCustomGeo } from "@/hooks/use-lab";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";
import { RangeSlider } from "./RangeSlider";

export function ModelRail() {
  const modelId = useLabStore((s) => s.modelId);
  const setModel = useLabStore((s) => s.setModel);
  const setCustomBH = useLabStore((s) => s.setCustomBH);
  const customBH = useLabStore((s) => s.customBH);
  const pyramidOpacity = useLabStore((s) => s.pyramidOpacity);
  const setPyramidOpacity = useLabStore((s) => s.setPyramidOpacity);
  const snap = useActiveSnapshot();
  const customGeo = useCustomGeo();
  const { t, fmt, fmtDeg, modelName, modelBasis } = useI18n();

  return (
    <div className="flex flex-col gap-4">
      <header>
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          {t("geometryTemplate")}
        </p>
        <h2 className="font-display mt-1 text-xl leading-snug text-fg">
          {t("oneShapeParam")}
        </h2>
        <p className="mt-1 text-sm text-muted">{t("pickModel")}</p>
      </header>

      <ul className="flex flex-col gap-1.5">
        {MODELS.map((m) => {
          const active = m.id === modelId;
          const winner = m.id === "elevenSeven";
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setModel(m.id)}
                className={cn(
                  "flex w-full min-h-11 items-center justify-between rounded-md px-3 py-2 text-left transition-[box-shadow,background-color] duration-150",
                  active
                    ? winner
                      ? "bg-winner text-accent-fg"
                      : "bg-accent text-accent-fg"
                    : "bg-bg-subtle text-fg hover:shadow-[var(--shadow-border-hover)]",
                )}
              >
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{modelName(m.id)}</span>
                  <span
                    className={cn(
                      "font-mono text-xs",
                      active ? "opacity-80" : "text-muted",
                    )}
                  >
                    {modelBasis(m.id)}
                  </span>
                </span>
                {winner ? (
                  <span
                    className={cn(
                      "rounded-xs px-2 py-0.5 text-xs font-medium tracking-wide uppercase",
                      active ? "bg-accent-fg/10" : "bg-bg text-muted",
                    )}
                  >
                    {t("optimum")}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="rounded-md bg-bg-subtle p-3">
        <RangeSlider
          label={t("ratioBH")}
          value={modelId === "custom" ? customBH : snap.geo.bh}
          min={1.54}
          max={1.62}
          step={0.0001}
          display={fmt(modelId === "custom" ? customBH : snap.geo.bh, 6)}
          onChange={setCustomBH}
        />
        <RangeSlider
          className="mt-2"
          label={t("faceSlope")}
          value={modelId === "custom" ? customGeo.angleDeg : snap.geo.angleDeg}
          min={51.6}
          max={52.05}
          step={0.0005}
          display={fmtDeg(
            modelId === "custom" ? customGeo.angleDeg : snap.geo.angleDeg,
            4,
          )}
          onChange={(deg) => setCustomBH(geoFromAngle(deg).bh)}
        />
        <RangeSlider
          className="mt-2"
          label={t("stoneOpacity")}
          value={pyramidOpacity}
          min={0.12}
          max={1}
          step={0.01}
          display={`${Math.round(pyramidOpacity * 100)} %`}
          onChange={setPyramidOpacity}
        />
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <Stat k={t("angle")} v={fmtDeg(snap.geo.angleDeg, 4)} />
        <Stat k="B / H" v={fmt(snap.geo.bh, 6)} />
        <Stat
          k={t("seked")}
          v={`${fmt(snap.geo.sekedPalms, 3)} ${t("palms")}`}
        />
        <Stat k="S / A" v={fmt(snap.geo.S / snap.geo.A, 6)} />
        <Stat k={t("obsDelta")} v={fmtDeg(snap.consensus.deltaObs, 4)} />
        <Stat
          k={t("bestPQ")}
          v={`${snap.consensus.bestPQ.p}/${snap.consensus.bestPQ.q}`}
        />
      </dl>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{k}</dt>
      <dd className="font-mono text-sm tabular text-fg">{v}</dd>
    </div>
  );
}
