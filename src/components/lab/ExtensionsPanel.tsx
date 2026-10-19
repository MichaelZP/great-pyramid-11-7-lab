import { useId, type ReactNode } from "react";
import { useActiveSnapshot } from "@/hooks/use-lab";
import { useI18n } from "@/hooks/use-i18n";
import { useReducedMotion } from "@/hooks/use-relation-lesson";
import { PHI } from "@/lib/pyramid/engine";
import { lessonGeo } from "@/lib/pyramid/relations";
import {
  CF_TERMS, COMPARISON_RATIOS, EGG_Z0_SLIDER, EXTENSION_COLORS as C, SLOPE_TARGETS, continuedFraction,
  eggLimit, inscribedSphere, ratioCheck, thresholdIntervals,
} from "@/lib/pyramid/geometric-extensions";
import type { MessageKey } from "@/lib/i18n";
import { EXTENSIONS, EXTENSION_STEPS, useExtensionStore, type ExtensionId } from "@/store/extension-store";
import { Button } from "@/components/ui/button";
import { RangeSlider } from "./RangeSlider";
import { cn } from "@/lib/utils";

const TITLES: Record<ExtensionId, MessageKey> = { eggLimit: "ext_eggLimit_title", inSphere: "ext_inSphere_title", why117: "ext_why117_title" };

export function ExtensionsPanel() {
  const { t } = useI18n();
  const id = useExtensionStore((s) => s.id);
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-2 border-t border-border pt-3" data-testid="extensions">
      <h2 id={headingId} className="text-lg text-fg">{t("ext_section")}</h2>
      <p className="text-xs leading-relaxed text-muted">{t("ext_sectionNote")}</p>
      <div className="flex flex-wrap gap-2">
        {EXTENSIONS.map((e) => <Button key={e} size="sm" variant={id === e ? "default" : "outline"} aria-pressed={id === e}
          className="min-h-11 whitespace-normal text-left" onClick={() => id === e ? useExtensionStore.getState().close() : useExtensionStore.getState().open(e)}>
          {t(TITLES[e])}
        </Button>)}
      </div>
      {id ? <ExtensionLesson id={id} /> : null}
    </section>
  );
}

function ExtensionLesson({ id }: { id: ExtensionId }) {
  const { t, modelName } = useI18n();
  const snap = useActiveSnapshot();
  return <article className="flex flex-col gap-3 rounded-sm bg-bg-subtle p-3" aria-label={t(TITLES[id])}>
    <h3 className="font-display text-base text-fg">{t(TITLES[id])}</h3>
    {id === "eggLimit" ? <EggLimitLesson /> : id === "inSphere" ? <InSphereLesson /> : <Why117Lesson />}
    <p className="text-xs text-muted">{t("ext_modelNote", { model: modelName(snap.model.id) })}</p>
    <p className="text-xs leading-relaxed text-muted">{t("ext_limitation")}</p>
    <Button variant="outline" className="w-full" onClick={() => useExtensionStore.getState().close()}>{t("ext_close")}</Button>
  </article>;
}

/** In the scene bar only the essentials are shown (play/pause or next, back); full screen adds next and reset. */
export function ExtensionPlayback({ inScene = false, full = false }: { inScene?: boolean; full?: boolean }) {
  const { t } = useI18n();
  const id = useExtensionStore((s) => s.id);
  const playing = useExtensionStore((s) => s.playing);
  const step = useExtensionStore((s) => s.step);
  const reduced = useReducedMotion();
  if (!id) return null;
  const steps = EXTENSION_STEPS[id];
  const s = useExtensionStore.getState;
  return <div className="flex flex-wrap gap-2">
    {!reduced ? <Button size="sm" className="min-h-11" onClick={() => playing ? s().pause() : s().play()}>{playing ? t("ext_pause") : t("ext_play")}</Button> : null}
    {steps && (reduced || (inScene && full)) ? <Button size="sm" variant="outline" className="min-h-11" disabled={step >= steps - 1}
      onClick={() => s().setStep(step + 1)}>{t("ext_next")}</Button> : null}
    {!inScene || full ? <Button size="sm" variant="outline" className="min-h-11" onClick={() => s().reset()}>{t("ext_reset")}</Button> : null}
    {inScene ? <Button size="sm" variant="outline" className="min-h-11" onClick={() => s().close()}>{t("ext_close")}</Button> : null}
  </div>;
}

function Why({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return <details className="text-xs leading-relaxed text-muted">
    <summary className="min-h-11 cursor-pointer py-3 text-sm text-fg">{t("ext_why")}</summary>
    <div className="max-h-72 overflow-y-auto whitespace-pre-line break-words pr-1 font-mono">{children}</div>
  </details>;
}

function Swatch({ color, dashed = false }: { color: string; dashed?: boolean }) {
  return <span aria-hidden="true" className="inline-block h-0 w-3 shrink-0 border-t-2 align-middle" style={{ borderColor: color, borderStyle: dashed ? "dashed" : "solid" }} />;
}

function ValueRow({ color, label, value, dashed }: { color?: string; label: ReactNode; value: string; dashed?: boolean }) {
  return <>
    <dt className="flex items-center gap-1.5">{color ? <Swatch color={color} dashed={dashed} /> : null}<span>{label}</span></dt>
    <dd className="font-mono tabular" style={color ? { color } : undefined}>{value}</dd>
  </>;
}

function StepButtons({ id, labels }: { id: ExtensionId; labels: MessageKey[] }) {
  const { t } = useI18n();
  const step = useExtensionStore((s) => s.step);
  return <div className="grid grid-cols-2 gap-2" role="group" aria-label={t("ext_step", { n: step + 1, total: labels.length })}>
    {labels.map((k, i) => <Button key={k} size="sm" variant={step === i ? "default" : "outline"} aria-pressed={step === i}
      className="min-h-11 whitespace-normal" onClick={() => useExtensionStore.getState().setStep(i)}>{i + 1}. {t(k)}</Button>)}
    <span className="sr-only">{id}</span>
  </div>;
}

/* ───────────── 1 ───────────── */

function EggLimitLesson() {
  const { t, fmt, fmtPct, locale } = useI18n();
  const snap = useActiveSnapshot();
  const z0 = useExtensionStore((s) => s.z0);
  const reduced = useReducedMotion();
  const e = eggLimit(snap.geo, z0);
  const plain = Math.abs(e.limit - PHI) < 1e-12 ? "ext_eggLimit_plainEqual" : e.limit > PHI ? "ext_eggLimit_plain" : "ext_eggLimit_plainBelow";
  return <>
    <p className="text-sm leading-relaxed text-fg">{t(plain)}</p>
    <p className="text-xs leading-relaxed text-muted">{t("ext_eggLimit_construction")}</p>
    <RangeSlider label={t("ext_eggLimit_z0")} value={z0} min={EGG_Z0_SLIDER.min} max={EGG_Z0_SLIDER.max} step={EGG_Z0_SLIDER.step}
      display={fmt(z0, 2)} onChange={(v) => useExtensionStore.getState().setZ0(v)} />
    <ExtensionPlayback />
    {reduced ? <p className="text-xs text-muted">{t("ext_reducedMotion")}</p> : null}
    <div aria-live="polite" aria-atomic="true">
      {e.ok ? <>
        <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1 text-sm">
          <ValueRow color={C.L} label={t("ext_eggLimit_current")} value={fmt(e.ratio, 9)} />
          <ValueRow color={C.limit} dashed label={t("ext_eggLimit_limit")} value={fmt(e.limit, 9)} />
          <ValueRow color={C.phi} label={t("ext_eggLimit_phi")} value={fmt(PHI, 9)} />
          <ValueRow label={t("ext_errorPhi")} value={fmtPct(e.errorPhi, 6)} />
        </dl>
        {z0 >= EGG_Z0_SLIDER.max ? <p className="mt-1 text-xs text-muted">{t("ext_eggLimit_end")}</p> : null}
      </> : <p role="status" className="rounded-sm border border-border p-2 text-sm text-warn">{t("ext_eggLimit_domain", { min: fmt(e.z0Min, 4) })}</p>}
    </div>
    <NumberLine ratio={e.ok ? e.ratio : null} limit={e.limit} locale={locale} />
    <p className="text-xs text-muted">{t("ext_eggLimit_dashed")}</p>
    <p className="text-xs text-muted">{t("ext_eggLimit_default")}</p>
    <Why>{t("ext_eggLimit_proof")}{"\n"}t = H/A = {fmt(e.t, 9)} · Z₀ &gt; 2√t = {fmt(e.z0Min, 9)}{e.ok ? `\nL = ${fmt(e.oval.L, 9)} · W = ${fmt(e.oval.W, 9)} · b − a = ${fmt(e.chord, 9)}` : ""}</Why>
  </>;
}

function NumberLine({ ratio, limit, locale }: { ratio: number | null; limit: number; locale: string }) {
  const values = [PHI, limit, ...(ratio === null ? [] : [ratio])];
  const lo0 = Math.min(...values), hi0 = Math.max(...values);
  const pad = Math.max((hi0 - lo0) * 0.18, 2e-4);
  const lo = lo0 - pad, hi = hi0 + pad;
  const x = (v: number) => 10 + 280 * (v - lo) / (hi - lo);
  const f = (v: number) => locale === "pl" ? v.toFixed(5).replace(".", ",") : v.toFixed(5);
  return <svg aria-hidden="true" viewBox="0 0 300 52" className="h-14 w-full" data-testid="egg-number-line">
    <line x1="10" x2="290" y1="26" y2="26" stroke="#2a2e35" strokeWidth="2" />
    <line x1={x(PHI)} x2={x(PHI)} y1="18" y2="34" stroke={C.phi} strokeWidth="2" />
    <text x={x(PHI)} y="48" fill={C.phi} fontSize="10" textAnchor="middle">φ {f(PHI)}</text>
    <line x1={x(limit)} x2={x(limit)} y1="12" y2="40" stroke={C.limit} strokeWidth="2" strokeDasharray="3 3" />
    <text x={x(limit)} y="10" fill={C.limit} fontSize="10" textAnchor={ratio === null || ratio < limit ? "start" : "end"}>S/A {f(limit)}</text>
    {ratio !== null ? <>
      <circle cx={x(ratio)} cy="26" r="4" fill={C.L} />
      <text x={x(ratio) + (ratio >= limit ? 4 : -4)} y="10" fill={C.L} fontSize="10" textAnchor={ratio >= limit ? "start" : "end"}>L/W {f(ratio)}</text>
    </> : null}
  </svg>;
}

/* ───────────── 2 ───────────── */

function InSphereLesson() {
  const { t, fmt, fmtPct } = useI18n();
  const snap = useActiveSnapshot();
  const step = useExtensionStore((s) => s.step);
  const reduced = useReducedMotion();
  const s = inscribedSphere(snap.geo.bh, lessonGeo(snap.geo).B);
  const texts: MessageKey[] = ["ext_inSphere_text1", "ext_inSphere_text2", "ext_inSphere_text3", "ext_inSphere_text4"];
  return <>
    <p className="text-sm leading-relaxed text-fg">{t("ext_inSphere_plain")}</p>
    <StepButtons id="inSphere" labels={["ext_inSphere_step1", "ext_inSphere_step2", "ext_inSphere_step3", "ext_inSphere_step4"]} />
    <ExtensionPlayback />
    {reduced ? <p className="text-xs text-muted">{t("ext_reducedMotion")}</p> : null}
    <p aria-live="polite" className="text-sm leading-relaxed"><span className="text-muted">{t("ext_step", { n: step + 1, total: 4 })} · </span>{t(texts[step]!)}</p>
    <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1 text-sm">
      <ValueRow color={C.sphere} label="r = OI" value={fmt(s.r, 9)} />
      <ValueRow color={C.VI} label="VI = H − r" value={fmt(s.VI, 9)} />
      <ValueRow color={C.VI} label="VI / OI = S/A" value={fmt(s.heightRatio, 9)} />
      <ValueRow label={t("ext_errorPhi")} value={fmtPct(s.errors.heightRatio, 6)} />
      <ValueRow color={C.MT} label="MT = MO = A" value={fmt(s.MT, 9)} />
      <ValueRow color={C.VT} label="VT = S − A" value={fmt(s.VT, 9)} />
      <ValueRow color={C.MT} label="MT / VT" value={fmt(s.tangentRatio, 9)} />
      <ValueRow label={t("ext_errorPhi")} value={fmtPct(s.errors.tangentRatio, 6)} />
    </dl>
    <p className="text-xs text-muted">B = {fmt(2 * s.A, 0)} · H = {fmt(s.H, 6)} · S = {fmt(s.S, 6)}</p>
    <Why>{t("ext_inSphere_proof")}</Why>
  </>;
}

/* ───────────── 3 ───────────── */

function Why117Lesson() {
  const { t, fmt, fmtPct } = useI18n();
  const snap = useActiveSnapshot();
  const step = useExtensionStore((s) => s.step);
  const compare = useExtensionStore((s) => s.compare);
  const reduced = useReducedMotion();
  const pickId = useId();
  const texts: MessageKey[] = ["ext_why117_text1", "ext_why117_text2", "ext_why117_text3"];
  const base = ratioCheck(11, 7);
  const picked = compare[1] === 0 ? null : ratioCheck(compare[0], compare[1]);
  const current = snap.results;
  const cur = { pi: current.find((r) => r.id === "pi")!, phi: current.find((r) => r.id === "phi")! };
  const I = thresholdIntervals();
  const cf = (x: number) => { const a = continuedFraction(x, CF_TERMS); return `${a[0]}; ${a.slice(1).join(", ")}`; };
  return <>
    <p className="text-sm leading-relaxed text-fg">{t("ext_why117_plain")}</p>
    <StepButtons id="why117" labels={["ext_why117_step1", "ext_why117_step2", "ext_why117_step3"]} />
    <ExtensionPlayback />
    {reduced ? <p className="text-xs text-muted">{t("ext_reducedMotion")}</p> : null}
    <p aria-live="polite" className="text-sm leading-relaxed"><span className="text-muted">{t("ext_step", { n: step + 1, total: 3 })} · </span>{t(texts[step]!)}</p>
    <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1 text-sm">
      <ValueRow color={C.pi} label="11:7 · 2B/H" value={fmt(base.pi.value, 9)} />
      <ValueRow label={t("ext_errorPi")} value={fmtPct(base.pi.error, 6)} />
      <ValueRow color={C.S} label="11:7 · S/A" value={fmt(base.phi.value, 9)} />
      <ValueRow label={t("ext_errorPhi")} value={fmtPct(base.phi.error, 6)} />
    </dl>
    {snap.model.id !== "elevenSeven" ? <p className="text-xs text-muted">{t("ext_why117_current")}: 2B/H = {fmt(cur.pi.value, 6)} ({fmtPct(cur.pi.error, 4)}) · S/A = {fmt(cur.phi.value, 6)} ({fmtPct(cur.phi.error, 4)})</p> : null}
    {step === 2 ? <div className="flex flex-col gap-2">
      <p id={pickId} className="text-xs text-muted">{t("ext_why117_pick")}</p>
      <div role="radiogroup" aria-labelledby={pickId} className="flex flex-wrap gap-1.5">
        {COMPARISON_RATIOS.map(([p, q]) => { const on = compare[0] === p && compare[1] === q; return <button key={`${p}:${q}`} type="button" role="radio" aria-checked={on}
          onClick={() => useExtensionStore.getState().setCompare([p, q])}
          className={cn("min-h-11 min-w-11 rounded-sm px-2 font-mono text-sm shadow-[var(--shadow-border)]", on ? "bg-accent text-accent-fg" : "text-fg")}>{p}:{q}</button>; })}
      </div>
      <table className="w-full table-fixed text-left text-xs">
        <thead><tr className="text-muted"><th scope="col" className="py-1">{t("ext_why117_ratio")}</th><th scope="col">{t("ext_errorPi")}</th><th scope="col">{t("ext_errorPhi")}</th></tr></thead>
        <tbody>{COMPARISON_RATIOS.map(([p, q]) => { const r = ratioCheck(p, q); const on = picked?.p === p && picked?.q === q;
          return <tr key={`${p}:${q}`} className={cn("font-mono tabular", on && "bg-bg text-fg")} aria-current={on ? "true" : undefined}>
            <th scope="row" className="py-1 font-normal">{p}:{q}</th><td>{fmtPct(r.pi.error, 3)}</td><td>{fmtPct(r.phi.error, 3)}</td></tr>; })}</tbody>
      </table>
      {picked ? <p className="font-mono text-xs" aria-live="polite">{picked.p}:{picked.q} → 2B/H = {fmt(picked.pi.value, 6)}, S/A = {fmt(picked.phi.value, 6)}</p> : null}
      <p className="text-xs text-muted">{t("ext_why117_order")}</p>
    </div> : null}
    <Why>{t("ext_why117_proof", { cfPhi: cf(SLOPE_TARGETS.phi), cfPi: cf(SLOPE_TARGETS.pi), piLo: fmt(I.pi[0], 6), piHi: fmt(I.pi[1], 6), phiLo: fmt(I.phi[0], 6), phiHi: fmt(I.phi[1], 6) })}</Why>
  </>;
}
