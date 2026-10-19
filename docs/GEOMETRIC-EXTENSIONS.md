# Rozszerzenia geometryczne / Geometric extensions

Koncepcja projektu: Michał Przybylski — prylski.dev.

Trzy osobne lekcje w zakładce **Stałe → Rozszerzenia geometryczne**. Nie są
nowymi stałymi: nie wchodzą do tabeli 13 porównań, do wyniku ani do skanu.
Wyniki `engine.ts`, tolerancje, presety, Z₀ = 7,65 i wiersz `eggLW` są bez zmian
(test `existing 13 results are unchanged` porównuje je z migawką z `main` @ `fd7308f`).

| Lekcja | Link | Moduł |
|---|---|---|
| Granica proporcji złotego jaja | `#ext=egg-limit` | `eggLimit()` |
| Kula wpisana i złoty podział | `#ext=inscribed-sphere` | `inscribedSphere()` |
| Dlaczego proporcja 11:7? | `#ext=why-11-7` | `ratioCheck()`, `continuedFraction()`, `thresholdIntervals()` |

Kod: `src/lib/pyramid/geometric-extensions.ts` (matematyka, korzysta z
`ovalSection` i `geoFromBH`), `src/components/lab/ExtensionsPanel.tsx`,
`src/components/scene/ExtensionOverlay.tsx`, `src/store/extension-store.ts`.
Animacja używa tego samego zegara `playbackTimer` co lekcje relacji i samouczek
(brak ruchu przy reduced-motion, pauza na ukrytej karcie).

## Wartości dla 11:7 (B = 11, H = 7)

Niezależnie przeliczone w mpmath (40–50 cyfr), plik
[`geometric-extensions/reference-values.json`](geometric-extensions/reference-values.json),
skrypt [`geometric-extensions/reference.py`](geometric-extensions/reference.py).
Ten plik jest wspólnym kontraktem dla modelu GeoGebra i strony edu.

**1. Złote jajo.** t = H/A = 14/11, S/A = √(1+t²) = √317/11 ≈ 1,618590346797
(błąd wobec φ 0,034384818291%). Dziedzina: t > 0, Z₀ > 0, Z₀² > 4t, czyli
Z₀ > 2√t ≈ 2,256304299271.

| Z₀ | L | W | L/W | błąd wobec φ |
|---:|---:|---:|---:|---:|
| 7,65 | 0,423562482966 | 0,261499813985 | 1,619742960852 | 0,105620284521% |
| 15,3 | 0,211592948730 | 0,130720886434 | 1,618662131983 | 0,038821386805% |
| 30,6 | 0,105790609645 | 0,065359537500 | 1,618594832387 | 0,034662042984% |
| → ∞ | | | 1,618590346797 | 0,034384818291% |

L/W > S/A dla każdego skończonego przekroju (dowód z wypukłości
F(x) = 1/(Z₀+t·x)²). Dokładny złoty owal wymaga θ < arctg √φ ≈ 51,827292372988°.

**2. Kula wpisana.** r = AH/(A+S) = 11(√317 − 11)/28 ≈ 2,673193998658
(w scenie, B = 2: 0,486035272483). VI/OI = (H−r)/r = S/A ≈ 1,618590346797.
MT = MO = A = 5,5, VT = S − A ≈ 3,402246907382, MT/VT ≈ 1,616578734502
(błąd 0,089939658740%). T = (A − A²/S, AH/S) ≈ (2,101981464375; 4,324750863523)
w przekroju osiowym. VI/VO = S/(S+A) ≈ 0,618115143049 (wiersz 1/φ).

**3. Dlaczego 11:7.** 2B/H = 22/7 ≈ 3,142857142857 (błąd wobec π
0,040249943477%), S/A ≈ 1,618590346797 (0,034384818291%).
√φ = [1; 3, 1, 2, 11, 3, …], 4/π = [1; 3, 1, 1, 1, 15, …]; 14/11 jest reduktem
obu. Próg 0,1%: Iπ = [1,569225530468; 1,572367123122],
Iφ = [1,569763608256; 1,574851707808]; jedyny ułamek o mianowniku ≤ 20 w każdym
z nich (i w części wspólnej) to 11/7. Mniejsze mianowniki wyklucza już sam warunek π.

## Weryfikacja

- `npm run test:run` (Vitest), `npm run typecheck`, `npm run build`.
- `verify.py` z notatki badawczej z 17.10.2026: 34/34 kontrole.
- Kontrola UI w przeglądarce bez interfejsu (Chrome, emulacja viewportu
  320×640, 360×740, 740×360 i desktop; PL/EN; klawiatura; reduced-motion;
  reset; zmiana lekcji; pełny ekran). To nie jest test na telefonie.

Ograniczenie: to własności modelu matematycznego. Nie ustalają zamiaru
budowniczych i nie są nowym odkryciem.
