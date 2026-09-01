import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useActiveSnapshot, useScanData } from "@/hooks/use-lab";
import { useI18n } from "@/hooks/use-i18n";
import { OBSERVED_ANGLE, RAINBOW_ANGLE } from "@/lib/pyramid/engine";

const AXIS = "#6e6a63";
const GRID = "#2a2e35";
const INDEP = "#c5ccd4";
const MAX = "#c47a72";
const MEAN = "#7d9a7c";

export function ScanPanel() {
  const { points, minima } = useScanData();
  const snap = useActiveSnapshot();
  const { t, fmtDeg, fmtPct, dec } = useI18n();
  const data = points.map((p) => ({
    angle: Number(p.angle.toFixed(4)),
    independent: p.independent * 100,
    maximum: p.maximum * 100,
    mean: p.mean * 100,
  }));

  return (
    <div className="flex h-full min-h-44 flex-col gap-2">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            {t("errorLandscape")}
          </p>
          <h2 className="font-display text-lg text-fg">{t("angleScan")}</h2>
        </div>
        <dl className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs tabular text-muted">
          <span>
            {t("minMean")} {fmtDeg(minima.mean, 3)}
          </span>
          <span>
            {t("minimax")} {fmtDeg(minima.minimax, 3)}
          </span>
          <span>
            {t("model")} {fmtDeg(snap.geo.angleDeg, 3)}
          </span>
        </dl>
      </div>
      <div className="min-h-40 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID} strokeDasharray="3 6" />
            <XAxis
              dataKey="angle"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fill: AXIS, fontSize: 11, fontFamily: "IBM Plex Mono" }}
              tickFormatter={(v: number) => v.toFixed(2).replace(".", dec)}
              stroke={GRID}
            />
            <YAxis
              tick={{ fill: AXIS, fontSize: 11, fontFamily: "IBM Plex Mono" }}
              tickFormatter={(v: number) =>
                `${v.toFixed(2).replace(".", dec)}%`
              }
              stroke={GRID}
              width={48}
            />
            <Tooltip
              contentStyle={{
                background: "#12151a",
                border: "1px solid #2a2e35",
                borderRadius: 8,
                fontFamily: "IBM Plex Mono",
                fontSize: 12,
                color: "#ece8e1",
              }}
              formatter={(value, name) => [
                fmtPct(Number(value) / 100, 3),
                name === "independent"
                  ? t("independent")
                  : name === "maximum"
                    ? t("max")
                    : t("mean"),
              ]}
              labelFormatter={(label) => fmtDeg(Number(label), 4)}
            />
            <ReferenceLine
              x={Number(snap.geo.angleDeg.toFixed(4))}
              stroke={INDEP}
              strokeDasharray="4 4"
            />
            <ReferenceLine x={OBSERVED_ANGLE} stroke={AXIS} strokeOpacity={0.5} />
            <ReferenceLine x={RAINBOW_ANGLE} stroke="#c4a574" strokeOpacity={0.45} />
            <Line
              type="monotone"
              dataKey="independent"
              stroke={INDEP}
              dot={false}
              strokeWidth={1.6}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="mean"
              stroke={MEAN}
              dot={false}
              strokeWidth={1.2}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="maximum"
              stroke={MAX}
              dot={false}
              strokeWidth={1.1}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
