import { useId, useMemo } from "react";
import { useLabStore } from "@/store/lab-store";
import { useActiveSnapshot } from "@/hooks/use-lab";
import { useReducedMotion } from "@/hooks/use-relation-lesson";
import { useI18n } from "@/hooks/use-i18n";
import { CONSTANTS, type ConstantId } from "@/lib/pyramid/engine";
import { relationSteps, RELATION_PRESENTATIONS, lessonGeo, SEGMENT_COLORS, relationMeasures } from "@/lib/pyramid/relations";
import { relationIntro, RELATION_DERIVATIONS } from "@/lib/pyramid/relation-lessons";
import { relationCopy, quantityLabel } from "@/lib/relation-copy";
import { Button } from "@/components/ui/button";
import { HistoryPanel } from "./HistoryPanel";
import { useTutorialStore } from "@/store/tutorial-store";

export function RelationPanel() {
  const tutorialOpen = useTutorialStore((s) => s.open);
  const selectId = useId();
  const snap = useActiveSnapshot();
  const id = useLabStore((s) => s.relationId);
  const step = useLabStore((s) => s.lessonStep);
  const playing = useLabStore((s) => s.lessonPlaying);
  const select = useLabStore((s) => s.selectRelation);
  const reduced = useReducedMotion();
  const { locale, fmt, fmtPct, constName, modelName } = useI18n();
  const c = relationCopy(locale);
  const row = snap.results.find((r) => r.id === id);
  const presentation = id ? RELATION_PRESENTATIONS[id] : null;
  const ready = Boolean(presentation?.renderer);
  const measures = useMemo(() => id ? relationMeasures(id, lessonGeo(snap.geo)) : null, [id, snap.geo]);
  const steps = relationSteps(id);
  const instructions = <div className="space-y-2">
    <div>
      <div className="flex items-center justify-between gap-2 text-xs text-muted">
        <span>{c.explanation}</span>
        {step !== null ? <span>{c.step} {step + 1}/{steps.length}</span> : null}
      </div>
      <p aria-live="polite" className="mt-1 text-sm leading-relaxed">{step === null ? id ? relationIntro(id, locale) : "" : steps[step].text[locale]}</p>
      {step === 2 && id ? <p className="mt-1 break-words font-mono text-xs">{RELATION_DERIVATIONS[id]}</p> : null}
      {step === 3 && measures ? <p className="mt-1 break-words font-mono text-xs">R = {fmt(measures.rows[0].total, 6)} / {fmt(measures.rows[1].total, 6)}{measures.subtract ? " − 1" : ""} ≈ {fmt(row?.value ?? 0, 9)}</p> : null}
      {step !== null ? <p className="mt-1 text-xs text-muted">{step === steps.length - 1 ? c.finished : !playing ? c.stopped : ""}</p> : null}
    </div>
    {reduced && step === null ? <p className="text-xs text-muted">{c.reduced}</p> : null}
    <div className="flex flex-wrap gap-2">
      <LessonPlayback />
      {step !== null ? <>
        <Button variant="outline" size="sm" className="min-h-11" disabled={step === 0} onClick={() => useLabStore.getState().setLessonStep(step - 1)}>{c.previous}</Button>
        <Button variant="outline" size="sm" className="min-h-11" disabled={step === steps.length - 1} onClick={() => useLabStore.getState().setLessonStep(step + 1)}>{c.next}</Button>
      </> : null}
    </div>
  </div>;

  return (
    <section className="flex flex-col gap-3" aria-label={c.title}>
      <h2 className="text-xl text-fg">{c.title}</h2>
      <div>
        <label htmlFor={selectId} className="text-sm text-muted">{c.select}</label>
        <select id={selectId} className="mt-1 min-h-11 w-full rounded-sm border border-border bg-bg-subtle px-2 text-base text-fg focus-visible:outline-accent"
          value={id ?? ""} onChange={(e) => select((e.target.value || null) as ConstantId | null)}>
          <option value="">{c.normal}</option>
          {CONSTANTS.map((r) => <option key={r.id} value={r.id}>{r.symbol} · {constName(r.id)}</option>)}
        </select>
      </div>
      {!row ? <Button variant="outline" onClick={() => select("phi")}>{c.open}</Button> : (
        <>
          {ready && step !== null && !tutorialOpen ? instructions : null}
          <div aria-live="polite" aria-atomic="true" className="rounded-sm bg-bg-subtle p-3">
            <p className="text-xs text-muted">{modelName(snap.model.id)} · {row.symbol}</p>
            <p className="my-1 font-mono text-lg">R = {presentation?.formula}</p>
            <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1 text-sm">
              <dt>{c.result}</dt><dd className="font-mono tabular">{fmt(row.value, 12)}</dd>
              <dt>{c.reference}</dt><dd className="font-mono tabular">{fmt(row.reference, 12)}</dd>
              <dt>{c.error}</dt><dd className="font-mono tabular">{fmtPct(row.error, 9)}</dd>
            </dl>
            <p className="mt-2 break-words font-mono text-xs text-muted">ε = |R − c| / |c|; {c.error} [%] = 100ε</p>
          </div>
          {ready ? (
            <>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                {presentation?.quantities.map((q) => <span key={q} className="flex items-center gap-1">
                  <span className="h-0.5 w-3" style={{ background: SEGMENT_COLORS[q] }} />
                  {quantityLabel(q, locale)} = {fmt(measures?.values[q] ?? 0, 6)}{q === "theta" || q === "beta" ? "°" : ""}
                </span>)}
              </div>
              <p className="text-xs text-muted">{id === "eggLW" ? c.ovalUnits : presentation?.scene === "pyramid-angles" ? c.angleUnits : c.units}</p>
              <div aria-label={c.ratio} className="space-y-1.5 text-xs">
                {measures?.rows.map((r, i) => <div key={i} className="space-y-1">
                  <span className="font-mono">{r.label} = {fmt(r.total, 6)}{presentation?.scene === "pyramid-angles" ? "°" : ""}</span>
                  <div className="flex h-2 bg-bg-subtle" aria-label={`${r.label}: ${fmt(r.total, 6)}`}>{r.terms.map((q, j) => <div key={j} className="h-full border-r border-bg" style={{ width: `${100 * (measures.values[q]) / Math.max(...measures.rows.map((r) => r.total))}%`, background: SEGMENT_COLORS[q] }} />)}</div>
                </div>)}
              </div>
              {measures?.rows.some((r) => r.terms.length > 1) ? <p className="text-xs text-muted">{presentation?.scene === "pyramid-angles" ? c.angleCopies : c.copies}{measures.subtract ? " R = (2θ / β) − 1." : ""}</p> : null}
              {measures?.oval ? <details className="text-xs text-muted"><summary className="cursor-pointer py-2">zr = 1 · Z₀ = 7.65</summary><p className="font-mono">z₋ = {fmt(measures.oval.zLo, 9)}<br />z₊ = {fmt(measures.oval.zHi, 9)}<br />z(Wmax) = {fmt(measures.oval.zMax, 9)}</p></details> : null}
              {step === null && !tutorialOpen ? instructions : null}
            </>
          ) : null}
          {id === "brun" ? <p className="text-xs text-muted">{c.brun}</p> : null}
          {id === "sqrt2" ? <p className="text-xs text-muted">{c.identity}</p> : null}
          {id ? <HistoryPanel id={id} /> : null}
          <Button variant="outline" className="w-full" onClick={() => tutorialOpen ? useTutorialStore.getState().close() : select(null)}>{c.normal}</Button>
        </>
      )}
      <p className="text-xs leading-relaxed text-muted">{c.limitation}</p>
    </section>
  );
}

export function LessonPlayback({ inScene = false }: { inScene?: boolean }) {
  const { locale } = useI18n();
  const c = relationCopy(locale);
  const step = useLabStore((s) => s.lessonStep);
  const playing = useLabStore((s) => s.lessonPlaying);
  const reduced = useReducedMotion();
  const id = useLabStore((s) => s.relationId);
  const steps = relationSteps(id);
  const action = () => {
    const s = useLabStore.getState();
    if (playing) s.pauseLesson();
    else if (step === null || step === steps.length - 1) {
      s.startLesson();
      if (reduced) s.pauseLesson();
    } else if (reduced) s.setLessonStep(step + 1);
    else s.resumeLesson();
  };
  const label = playing ? c.pause : step === null ? inScene ? c.playScene : c.play : step === steps.length - 1 ? c.replay : reduced ? c.next : c.resume;
  if (reduced && !inScene && step !== null && step < steps.length - 1) return null;
  return <Button size="sm" className="min-h-11 max-w-full whitespace-normal" onClick={action}>{label}</Button>;
}
