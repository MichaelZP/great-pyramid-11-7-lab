import { HISTORY_SOURCES, RELATION_HISTORY, type HistorySourceId } from "@/lib/pyramid/relation-history";
import { relationIntro } from "@/lib/pyramid/relation-lessons";
import type { ConstantId } from "@/lib/pyramid/engine";
import { useI18n } from "@/hooks/use-i18n";

export function SourceList({ ids }: { ids: readonly HistorySourceId[] }) {
  const { locale } = useI18n();
  return <ul className="space-y-3 text-xs leading-relaxed">{ids.map((id) => {
    const source = HISTORY_SOURCES[id];
    return <li key={id}>
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="block py-2 text-fg underline underline-offset-4">{source.title}</a>
      <p className="text-muted">{source.scope[locale]}</p>
    </li>;
  })}</ul>;
}

export function HistoryPanel({ id }: { id: ConstantId }) {
  const { locale } = useI18n();
  const pl = locale === "pl";
  const entry = RELATION_HISTORY[id];
  return <div className="space-y-2 text-sm leading-relaxed">
    <details key={id} className="rounded-sm border border-border px-3">
      <summary className="min-h-11 cursor-pointer py-3">{pl ? "Historia i źródła" : "History and sources"}</summary>
      <dl className="space-y-2 pb-3">
        {([['concept', pl ? 'Pojęcie' : 'Concept'], ['name', pl ? 'Nazwa' : 'Name'], ['symbol', pl ? 'Symbol' : 'Symbol']] as const).map(([field, label]) => <div key={field}>
          <dt className="text-xs font-medium text-muted">{label}</dt><dd>{entry[field][locale]}</dd>
        </div>)}
      </dl>
      <SourceList ids={entry.sources} />
      <p className="py-3 text-xs text-muted">{pl ? "Notatki dostępne offline. Otwarcie zewnętrznego źródła wymaga internetu." : "Notes are available offline. Opening an external source requires internet."}</p>
    </details>
    <details className="rounded-sm border border-border px-3">
      <summary className="min-h-11 cursor-pointer py-3">{pl ? "Matematyka a interpretacja" : "Mathematics and interpretation"}</summary>
      <dl className="space-y-2 pb-3">
        <div><dt className="text-xs font-medium text-muted">{pl ? "Fakt matematyczny / model" : "Mathematical fact / model"}</dt><dd>{entry.mathematics[locale]}</dd><dd className="mt-1 text-xs text-muted">{relationIntro(id, locale)}</dd></div>
        <div><dt className="text-xs font-medium text-muted">{pl ? "Interpretacja piramidy" : "Pyramid interpretation"}</dt><dd>{entry.interpretation[locale]}</dd></div>
        <div><dt className="text-xs font-medium text-muted">{pl ? "Granica dowodu historycznego" : "Limits of historical evidence"}</dt><dd>{pl ? "Źródła historii pojęcia, nazwy i zapisu nie są świadectwem intencji budowniczych. Nie ustalono takiego świadectwa dla tego porównania." : "Sources for concepts, names and notation do not establish builders’ intent. Such evidence has not been established for this comparison."}</dd></div>
      </dl>
    </details>
  </div>;
}

export function Bibliography() {
  const { locale } = useI18n();
  return <details className="text-sm leading-relaxed">
    <summary className="min-h-11 cursor-pointer py-3">{locale === "pl" ? "Bibliografia · 13 pozycji" : "Bibliography · 13 positions"}</summary>
    <p className="mb-2 text-xs text-muted">{locale === "pl" ? "Zakres każdego źródła podano poniżej. Notatki są lokalne, pełne teksty otwierają się przez internet." : "Each source’s scope is given below. Notes are local; full texts open over the internet."}</p>
    <SourceList ids={Object.keys(HISTORY_SOURCES) as HistorySourceId[]} />
  </details>;
}
