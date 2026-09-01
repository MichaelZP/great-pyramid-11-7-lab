import { CONSTANTS, errorTone, RELATIVE_TOLERANCE } from "@/lib/pyramid/engine";
import { useActiveSnapshot } from "@/hooks/use-lab";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";

export function ConstantsPanel() {
  const snap = useActiveSnapshot();
  const { t, fmtPct, constName, locale } = useI18n();

  return (
    <div className="flex flex-col gap-3">
      <header>
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          {t("twelveRelations")}
        </p>
        <h2 className="font-display mt-1 text-xl leading-snug text-fg">
          {t("matchesOf12", {
            n: snap.summary.matches,
            total: CONSTANTS.length,
            tol: fmtPct(RELATIVE_TOLERANCE, 1),
          })}
        </h2>
        <p className="mt-1 text-sm text-muted">{t("relativeError")}</p>
      </header>

      <div className="grid grid-cols-3 gap-2 text-center">
        <Mini k={t("mean")} v={fmtPct(snap.summary.mean, 3)} />
        <Mini k={t("independent")} v={fmtPct(snap.summary.independent, 3)} />
        <Mini k={t("max")} v={fmtPct(snap.summary.maximum, 3)} />
      </div>

      <div className="-mx-1 overflow-x-auto">
        <table className="w-full min-w-[18rem] border-separate border-spacing-y-1 text-left">
          <thead>
            <tr className="text-[0.65rem] tracking-wide text-muted uppercase">
              <th className="px-2 font-medium">{t("constant")}</th>
              <th className="px-2 font-medium">{t("formula")}</th>
              <th className="px-2 text-right font-medium">{t("error")}</th>
            </tr>
          </thead>
          <tbody>
            {snap.results.map((row) => {
              const tone = errorTone(row.error);
              return (
                <tr key={row.id} className="bg-bg-subtle/80">
                  <td className="rounded-l-sm px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full",
                          tone === "ok"
                            ? "bg-ok"
                            : tone === "mid"
                              ? "bg-warn"
                              : "bg-bad",
                        )}
                      />
                      <span className="font-mono text-sm">{row.symbol}</span>
                    </div>
                    <div className="pl-3.5 text-[0.65rem] text-muted">
                      {constName(row.id)}
                    </div>
                  </td>
                  <td className="px-2 py-1.5 font-mono text-[0.7rem] text-muted">
                    {locale === "pl" ? row.formulaPl : row.formula}
                  </td>
                  <td className="rounded-r-sm px-2 py-1.5 text-right">
                    <span
                      className={cn(
                        "font-mono text-xs tabular",
                        tone === "ok"
                          ? "text-ok"
                          : tone === "mid"
                            ? "text-warn"
                            : "text-bad",
                      )}
                    >
                      {fmtPct(row.error, 3)}
                    </span>
                    <div className="mt-1 ml-auto h-1 w-16 overflow-hidden rounded-full bg-bg">
                      <div
                        className={cn(
                          "h-full",
                          tone === "ok"
                            ? "bar-ok"
                            : tone === "mid"
                              ? "bar-mid"
                              : "bar-bad",
                        )}
                        style={{
                          width: `${Math.min(100, (row.error / 0.0012) * 100).toFixed(2)}%`,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-sm bg-bg-subtle px-2 py-2">
      <div className="text-[0.65rem] tracking-wide text-muted uppercase">{k}</div>
      <div className="font-mono text-sm tabular text-fg">{v}</div>
    </div>
  );
}
