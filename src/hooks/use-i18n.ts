import { useLabStore } from "@/store/lab-store";
import {
  t as translate,
  modelName,
  modelBasis,
  constName,
  type Locale,
  type MessageKey,
} from "@/lib/i18n";
import { fmt, fmtDeg, fmtPct } from "@/lib/utils";

export function useI18n() {
  const locale = useLabStore((s) => s.locale);
  const toggleLocale = useLabStore((s) => s.toggleLocale);
  const t = (key: MessageKey, vars?: Record<string, string | number>) =>
    translate(locale, key, vars);
  return {
    locale,
    toggleLocale,
    t,
    modelName: (id: string) => modelName(locale, id),
    modelBasis: (id: string) => modelBasis(locale, id),
    constName: (id: string) => constName(locale, id),
    fmt: (n: number, digits?: number) => fmt(n, digits, locale),
    fmtDeg: (n: number, digits?: number) => fmtDeg(n, digits, locale),
    fmtPct: (n: number, digits?: number) => fmtPct(n, digits, locale),
    dec: locale === "pl" ? "," : ".",
  };
}

export type { Locale };
