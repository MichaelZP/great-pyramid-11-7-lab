import { useEffect, useId, useRef } from "react";
import { useTutorialStore } from "@/store/tutorial-store";
import { useLabStore } from "@/store/lab-store";
import { TUTORIAL_STEPS, tutorialCopy } from "@/lib/pyramid/tutorial";
import { useI18n } from "@/hooks/use-i18n";
import { useReducedMotion } from "@/hooks/use-relation-lesson";
import { CONSTANTS } from "@/lib/pyramid/engine";
import { Button } from "@/components/ui/button";
import { Bibliography } from "./HistoryPanel";

export function TutorialControls({ inScene = false }: { inScene?: boolean }) {
  const { locale } = useI18n();
  const c = tutorialCopy(locale);
  const { step, playing, pause, play, close, go } = useTutorialStore();
  const reduced = useReducedMotion();
  return <div className="flex flex-wrap gap-2">
    {!reduced && step < TUTORIAL_STEPS.length - 1 ? <Button size="sm" className="min-h-11" onClick={playing ? pause : play}>{playing ? c.pause : c.play}</Button> : null}
    {!inScene ? <Button size="sm" variant="outline" className="min-h-11" disabled={step === 0} onClick={() => go(step - 1)}>{c.previous}</Button> : null}
    <Button size="sm" variant="outline" className="min-h-11" disabled={step === TUTORIAL_STEPS.length - 1} onClick={() => go(step + 1)}>{c.next}</Button>
    <Button size="sm" variant="outline" className="min-h-11" onClick={close}>{c.skip}</Button>
  </div>;
}

export function TutorialPanel() {
  const chooseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const { locale, constName } = useI18n();
  const c = tutorialCopy(locale);
  const { open, step, playing, revision, start, go, pause } = useTutorialStore();
  const reduced = useReducedMotion();
  const content = TUTORIAL_STEPS[step];
  useEffect(() => {
    if (!open || !sectionRef.current?.getClientRects().length) return;
    // Scroll only the responsive panel; scrollIntoView also moves the fixed scene shell.
    let parent = sectionRef.current.parentElement;
    while (parent) {
      if (getComputedStyle(parent).overflowY === "auto") {
        parent.scrollTo({ top: 0, behavior: "instant" });
        break;
      }
      parent = parent.parentElement;
    }
  }, [open, step, revision]);
  return <section ref={sectionRef} aria-label={c.title} className="space-y-2 border-b border-border pb-3">
    <h2 className="text-lg">{c.title}</h2>
    {!open ? <>
      <p className="text-sm leading-relaxed text-muted">{c.intro}</p>
      <Button variant="outline" className="min-h-11 w-full" onClick={start}>{step ? `${c.return} · ${step + 1}/${TUTORIAL_STEPS.length}` : c.start}</Button>
    </> : <>
      <label htmlFor={chooseId} className="block text-xs text-muted">{c.choose}</label>
      <select id={chooseId} value={step} onChange={(e) => go(Number(e.target.value))} className="min-h-11 w-full min-w-0 rounded-sm border border-border bg-bg-subtle px-2 text-sm text-fg">
        {TUTORIAL_STEPS.map((item, i) => <option key={i} value={i}>{i + 1}. {item.title[locale]}</option>)}
      </select>
      <div aria-live="polite" aria-atomic="true" className="space-y-2">
        <h3 className="text-base">{c.step} {step + 1}/{TUTORIAL_STEPS.length} · {content.title[locale]}</h3>
        <p className="text-sm leading-relaxed">{content.text[locale]}</p>
        <p className="break-words font-mono text-xs leading-relaxed">{content.formula}</p>
        <p className="text-xs text-muted">{step === TUTORIAL_STEPS.length - 1 ? c.finished : !playing ? c.paused : `${locale === "pl" ? "Automat" : "Auto-play"} · 18 s`}</p>
      </div>
      <TutorialControls />
      <Button variant="ghost" size="sm" className="min-h-11" onClick={() => go(0)}>{c.restart}</Button>
      <p className="text-xs leading-relaxed text-muted">{reduced ? c.reduced : c.manual}</p>
      <p className="text-xs text-muted">{c.related}</p>
      <div className="flex flex-wrap gap-2">{content.related.map((id) => <Button key={id} variant="outline" size="sm" className="min-h-11 h-auto whitespace-normal py-2" onClick={() => { pause(); useLabStore.getState().selectRelation(id); useLabStore.getState().setLessonStep(2); }}>
        {CONSTANTS.find((r) => r.id === id)?.symbol} · {constName(id)}
      </Button>)}</div>
    </>}
    <Bibliography />
  </section>;
}
