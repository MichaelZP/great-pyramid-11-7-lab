import type { ConstantId } from "./engine";
import type { Locale } from "../i18n";
type Text = Record<Locale, string>;
type TutorialStep = { title: Text; text: Text; formula: string; relation: ConstantId; lessonStep: number; related: readonly ConstantId[] };
const text = (pl: string, en: string): Text => ({ pl, en });

// Learning order groups dependencies; it is deliberately distinct from table order.
export const TUTORIAL_STEPS: readonly TutorialStep[] = [
  { title: text("Zacznij od kwadratu", "Start with the square"), relation: "sqrt2", lessonStep: 1, related: ["sqrt2"], formula: "A=B/2; D=B√2",
    text: text("B to bok podstawy, A jego połowa, D pełna przekątna. D/B=√2 jest dokładne dla każdej wysokości. To nasz punkt wyjścia, nie wyróżnik 11:7.", "B is a base side, A its half, D the full diagonal. D/B=√2 is exact at every height. This is our starting point, not a distinguishing feature of 11:7.") },
  { title: text("Jeden parametr kształtu", "One shape parameter"), relation: "phi", lessonStep: 2, related: ["phi"], formula: "t=H/A; p=S/A=√(1+t²)",
    text: text("H jest pionową wysokością, S apotemą do środka boku. Trójkąt VOM jest prostokątny. Dla 11:7 mamy t=14/11. Zmiana skali zachowuje proporcje; zmiana t je zmienia.", "H is vertical height; S is the apothem to a side midpoint. VOM is a right triangle. For 11:7, t=14/11. Scaling preserves ratios; changing t changes them.") },
  { title: text("Pół obwodu i π", "Half the perimeter and π"), relation: "pi", lessonStep: 2, related: ["pi"], formula: "Rπ=2B/H=4/t; 11:7 ⇒ 22/7≈π",
    text: text("Dwie kopie B dzielimy przez H. Pełny obwód to 4B, więc jego iloraz przez H przybliża 2π. 22/7 nie jest dokładnym π. Interpretacja wymiarów nie dokumentuje intencji budowniczych.", "Divide two copies of B by H. The full perimeter is 4B, so its ratio to H approximates 2π. 22/7 is not exactly π. Interpreting dimensions does not document builders’ intent.") },
  { title: text("Rodzina γ, √3 i √6", "The γ, √3 and √6 family"), relation: "gamma", lessonStep: 2, related: ["gamma", "sqrt3", "sqrt6"], formula: "u=t/4+√2; Rγ=1/u; R√3=u; R√6=√2·u",
    text: text("Te trzy wiersze używają H i D. Odwrócenie u daje wiersz γ, mnożenie przez √2 daje wiersz √6. To zależne wyniki; cele γ i √3 nie są dokładnymi odwrotnościami.", "These three rows use H and D. Inverting u gives the γ row; multiplying by √2 gives the √6 row. Results are dependent; targets γ and √3 are not exact reciprocals.") },
  { title: text("Rodzina φ, 1/φ i √5", "The φ, 1/φ and √5 family"), relation: "invPhi", lessonStep: 2, related: ["phi", "invPhi", "sqrt5"], formula: "p=S/A; R1/φ=p/(p+1); R√5=1+2/p",
    text: text("Wszystkie trzy wyniki wyznacza p. Przy p=φ trafiają dokładnie w swoje cele; przy 11:7 są przybliżeniami. Modelowe p/(p+1) nie jest ogólnie 1/p. Kliknij pozycję, aby obejrzeć jej odcinki.", "p determines all three results. When p=φ they match their targets exactly; at 11:7 they are approximations. Model p/(p+1) is not generally 1/p. Select a position to inspect its segments.") },
  { title: text("Tribonacci i Brun też zależą od p", "Tribonacci and Brun also depend on p"), relation: "brun", lessonStep: 2, related: ["tribonacci", "brun"], formula: "RT=(1+4√2)/(p+2); RB₂=√(p²+1)",
    text: text("E to krawędź do narożnika, a S do środka boku: E²=S²+A². Zatem E/A zależy od p. Tak samo suma dla Tribonacci. Wartość Bruna jest oszacowaniem; bliskość nie łączy geometrii z sumą liczb pierwszych.", "E reaches a corner; S reaches a side midpoint: E²=S²+A². Thus E/A depends on p, as does the Tribonacci sum ratio. Brun’s target is an estimate; proximity does not connect geometry to the prime sum.") },
  { title: text("Kąty, e i e−1", "Angles, e and e−1"), relation: "e", lessonStep: 2, related: ["e", "eMinus1"], formula: "θ=atan(t); β=90°−θ; Re=2θ/β; R(e−1)=Re−1",
    text: text("θ i β to dopełniające się kąty tego samego trójkąta. Dzielimy miary kątów, nie długości łuków. Po odjęciu jedności otrzymujemy wiersz e−1. To jeden wynik w dwóch postaciach.", "θ and β are complementary angles of the same triangle. Divide angle measures, not arc lengths. Subtracting one gives the e−1 row. This is one result in two forms.") },
  { title: text("Owal jest osobnym modelem", "The oval is a separate model"), relation: "eggLW", lessonStep: 3, related: ["eggLW", "phi"], formula: "zr=1; z=Z₀+x tan θ; Z₀=7.65; L/W≈φ",
    text: text("Przekrój bierze θ z piramidy, ale dodaje powierzchnię i Z₀. L i W nie są jej krawędziami. Owal nie jest elipsą. Preset Golden Egg dobiera kąt do φ; dla 11:7 błąd wynosi 0,105620285%.", "The section takes θ from the pyramid but adds a surface and Z₀. L and W are not pyramid edges. The oval is not an ellipse. Golden Egg fits its angle to φ; at 11:7 the error is 0.105620285%.") },
  { title: text("Jak czytać wynik i jego historię", "How to read a result and its history"), relation: "phi", lessonStep: 3, related: ["phi", "pi", "eggLW"], formula: "ε=|R−c|/|c|",
    text: text("R to wynik modelu, c to cel. 13 wierszy nie daje 13 niezależnych dowodów. Historia rozdziela pojęcie, nazwę i symbol. Obliczenie oddzielamy od hipotezy. Późniejszy pomiar Petriego i papirus Rhinda nie zapisują intencji budowniczych.", "R is the model result, c the target. 13 rows do not give 13 independent proofs. History separates concept, name and symbol. Calculation is distinct from hypothesis. Petrie’s later survey and the Rhind papyrus do not record builders’ intent.") },
];
export const TUTORIAL_INTERVAL = 18000;
export function validTutorialStep(value: unknown): number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value < TUTORIAL_STEPS.length ? value : 0;
}

export const tutorialCopy = (locale: Locale) => locale === "pl" ? {
  title: "Tutorial geometrii", start: "Rozpocznij tutorial", return: "Wróć do tutorialu", step: "Krok", choose: "Przejdź do kroku", previous: "Poprzedni", next: "Następny", pause: "Zatrzymaj", play: "Automatycznie", resume: "Wznów", skip: "Pomiń / zamknij", restart: "Od początku", paused: "Zatrzymane — krok zachowany", finished: "Tutorial ukończony", related: "Obejrzyj pozycję", intro: "9 krótkich kroków łączy wszystkie 13 pozycji. Możesz pominąć tutorial i wrócić do dowolnego kroku.", manual: "Tryb ręczny. Automat zmienia krok co 18 s i zatrzymuje się po ukryciu strony.", reduced: "Ograniczony ruch: kroki przechodź ręcznie.",
} : {
  title: "Geometry tutorial", start: "Start tutorial", return: "Return to tutorial", step: "Step", choose: "Go to step", previous: "Previous", next: "Next", pause: "Pause", play: "Auto-play", resume: "Resume", skip: "Skip / close", restart: "Restart", paused: "Paused — step saved", finished: "Tutorial complete", related: "Inspect a position", intro: "9 short steps connect all 13 positions. You can skip the tutorial and return to any step.", manual: "Manual mode. Auto-play advances every 18 s and pauses when the page is hidden.", reduced: "Reduced motion: navigate steps manually.",
};
