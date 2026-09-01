import { CONSTANTS, SCORE_WEIGHTS } from "@/lib/pyramid/engine";
import { useAllSnapshots } from "@/hooks/use-lab";
import { useLabStore } from "@/store/lab-store";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";

export function VerdictPanel() {
  const snaps = useAllSnapshots();
  const modelId = useLabStore((s) => s.modelId);
  const setModel = useLabStore((s) => s.setModel);
  const { t, fmt, fmtDeg, modelName } = useI18n();
  const ranked = [...snaps].sort(
    (a, b) => b.consensus.combined - a.consensus.combined,
  );
  const winner = ranked[0]!;
  const maxScore = Math.max(...snaps.map((s) => s.consensus.combined), 1);

  return (
    <div className="flex flex-col gap-3">
      <header>
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          {t("verdict")}
        </p>
        <h2 className="font-display mt-1 text-xl leading-snug text-fg">
          {modelName(winner.model.id)} — {fmt(winner.consensus.combined, 1)}{" "}
          {t("points")}
        </h2>
        <p className="mt-1 text-sm text-muted">{t("verdictLead")}</p>
      </header>

      <ul className="flex flex-col gap-1.5">
        {ranked.map((s, i) => {
          const active = s.model.id === modelId;
          const isWinner = s.model.id === "elevenSeven";
          return (
            <li key={s.model.id}>
              <button
                type="button"
                onClick={() => setModel(s.model.id)}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left transition-[box-shadow,background-color] duration-150",
                  active ? "bg-bg-subtle shadow-[var(--shadow-border)]" : "hover:bg-bg-subtle",
                )}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-fg">
                    {i + 1}. {modelName(s.model.id)}
                    {isWinner ? (
                      <span className="ml-2 text-[0.65rem] tracking-wide text-muted uppercase">
                        {t("construction")}
                      </span>
                    ) : null}
                  </span>
                  <span className="font-mono text-sm tabular text-fg">
                    {fmt(s.consensus.combined, 1)}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      isWinner ? "bg-winner" : "bg-accent/70",
                    )}
                    style={{
                      width: `${((s.consensus.combined / maxScore) * 100).toFixed(2)}%`,
                    }}
                  />
                </div>
                <div className="mt-1.5 flex flex-wrap gap-x-3 font-mono text-[0.65rem] tabular text-muted">
                  <span>{fmtDeg(s.geo.angleDeg, 3)}</span>
                  <span>{s.summary.matches}/{CONSTANTS.length}</span>
                  <span>
                    {t("num")} {fmt(s.consensus.numerical, 0)}
                  </span>
                  <span>
                    {t("meas")} {fmt(s.consensus.measurement, 0)}
                  </span>
                  <span>
                    {t("fraction")} {fmt(s.consensus.fraction, 0)}
                  </span>
                  <span>
                    {t("band")} {fmt(s.consensus.robustness, 0)}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-muted">
        {t("verdictWeights", {
          n: SCORE_WEIGHTS.numerical * 100,
          m: SCORE_WEIGHTS.measurement * 100,
          f: SCORE_WEIGHTS.fraction * 100,
          r: SCORE_WEIGHTS.robustness * 100,
        })}
      </p>
    </div>
  );
}
