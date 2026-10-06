import type { Locale } from "./i18n";
import type { ConstantId } from "./pyramid/engine";
import { RELATION_PRESENTATIONS, QUANTITY_SYMBOLS, type Quantity } from "./pyramid/relations";

const copy = {
  pl: {
    title: "Poznaj proporcję", select: "Pozycja matematyczna", normal: "Zwykły widok piramidy",
    result: "Wynik modelu R", reference: "Cel porównania c",
    error: "Błąd przybliżenia", units: "Długości w umownych jednostkach, B = 11. Proporcja nie zależy od skali.",
    explanation: "Wyjaśnienie krok po kroku", play: "Uruchom wyjaśnienie", playScene: "Wyjaśnij", returnScene: "Wróć do piramidy", pause: "Zatrzymaj", resume: "Wznów",
    replay: "Od początku", previous: "Poprzedni", next: "Następny", step: "Krok", stopped: "Zatrzymane", finished: "Zakończone",
    limitation: "Proporcje są zależne. Zbliżenie do celu nie dowodzi funkcji ani intencji konstrukcji.",
    reduced: "Ograniczony ruch: użyj przycisku „Następny”, aby przejść przez kroki.",
    table: "Wszystkie 13 porównań", open: "Pokaż proporcję φ w 3D", brun: "Przyjęte oszacowanie Bruna; brak ścisłego przedziału błędu.",
    identity: "D/B = √2 to dokładna tożsamość kwadratu dla każdej wysokości.",
    ratio: "Porównywane wielkości", angleUnits: "Kąty w stopniach. Oba kąty można przeliczyć na radiany bez zmiany ilorazu.",
    ovalUnits: "Jednostki powierzchni zr = 1; scena powiększona jednakowo we wszystkich kierunkach. W to maksymalna szerokość przekroju.",
    copies: "Kopie odcinków ułożone we wspólnej skali pokazują sumy we wzorze.", angleCopies: "Paski porównują miary kątów; nie są długościami łuków.",
  },
  en: {
    title: "Explore a proportion", select: "Mathematical position", normal: "Normal pyramid view",
    result: "Model result R", reference: "Comparison target c",
    error: "Approximation error", units: "Lengths in arbitrary units, B = 11. The ratio is independent of scale.",
    explanation: "Step-by-step explanation", play: "Start explanation", playScene: "Explain", returnScene: "Back to pyramid", pause: "Pause", resume: "Resume",
    replay: "Restart", previous: "Previous", next: "Next", step: "Step", stopped: "Paused", finished: "Finished",
    limitation: "The proportions are dependent. Proximity to a target does not prove the construction's function or intent.",
    reduced: "Reduced motion: use “Next” to move through the steps.",
    table: "All 13 comparisons", open: "Show the φ proportion in 3D", brun: "Adopted Brun estimate; no rigorous error interval established.",
    identity: "D/B = √2 is an exact square identity at every height.",
    ratio: "Compared quantities", angleUnits: "Angles in degrees. Converting both angles to radians leaves the ratio unchanged.",
    ovalUnits: "Units of the surface zr = 1; the scene is enlarged uniformly in every direction. W is the maximum section width.",
    copies: "Copies of segments arranged at a common scale show the sums in the formula.", angleCopies: "Bars compare angular measures; they are not arc lengths.",
  },
};

export function relationCopy(locale: Locale) { return copy[locale]; }

const quantityNames: Record<Locale, Record<Quantity, string>> = {
  pl: { A: "OM · półbok", H: "OV · wysokość", S: "MV · apotema", B: "NC · bok", D: "KC · przekątna", E: "CV · krawędź", theta: "∠OMV · nachylenie", beta: "∠OVM · dopełnienie", L: "PQ · długość w płaszczyźnie", W: "maksymalna szerokość" },
  en: { A: "OM · half-side", H: "OV · height", S: "MV · apothem", B: "NC · side", D: "KC · diagonal", E: "CV · edge", theta: "∠OMV · inclination", beta: "∠OVM · complement", L: "PQ · in-plane length", W: "maximum width" },
};
export function quantityLabel(q: Quantity, locale: Locale) { return `${QUANTITY_SYMBOLS[q]} · ${quantityNames[locale][q]}`; }
export function relationSceneDescription(id: ConstantId, locale: Locale) {
  if (id === "eggLW") return locale === "pl" ? "Zamknięty przekrój powierzchni zr = 1 płaszczyzną z = Z₀ + x tan θ. L: długość PQ, W: maksymalna szerokość." : "Closed section of zr = 1 by the plane z = Z₀ + x tan θ. L: length PQ; W: maximum width.";
  return RELATION_PRESENTATIONS[id].quantities.map((q) => quantityLabel(q, locale)).join("; ") + ".";
}
