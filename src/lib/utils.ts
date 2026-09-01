import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/lib/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function dec(n: number, digits: number, locale: Locale = "en"): string {
  const s = n.toFixed(digits);
  return locale === "pl" ? s.replace(".", ",") : s;
}

export function fmt(n: number, digits = 6, locale: Locale = "en"): string {
  if (!Number.isFinite(n)) return "—";
  return dec(n, digits, locale);
}

export function fmtSci(n: number, digits = 4, locale: Locale = "en"): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 0.0001 && abs < 1000) return fmt(n, digits, locale);
  const s = n.toExponential(2);
  return locale === "pl" ? s.replace(".", ",") : s;
}

export function fmtPct(n: number, digits = 3, locale: Locale = "en"): string {
  if (!Number.isFinite(n)) return "—";
  return `${dec(n * 100, digits, locale)} %`;
}

export function fmtDeg(n: number, digits = 4, locale: Locale = "en"): string {
  if (!Number.isFinite(n)) return "—";
  return `${dec(n, digits, locale)}°`;
}
