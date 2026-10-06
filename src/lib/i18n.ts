export type Locale = "en" | "pl";

export const translations = {
  en: {
    siteKicker: "Great Pyramid of Giza",
    siteTitle: "11:7 Laboratory",
    siteLead:
      "A translucent layer on the face shows the constants. Change the template — the pyramid and the errors update live.",
    score: "score",
    rainbowCaption:
      "Primary: vertical semicircle in the mid-plane, red r = H through the apex. Secondary: parallel plane behind the pyramid, green r = 2H. Front-face apothem 51.84° → green. Edge 41.99° ends at the apex.",
    goldenEggCaption:
      "Modern section model zr=1, Z₀=7.65: fitting L/W to φ selects 51.795319256°. 10 of 13 targets are within 0.1%. The ordinary egg scene is illustrative; inspect L/W for the calculated section. This is not historical evidence.",
    hologram: "Hologram",
    rainbow: "Rainbow",
    dimensions: "Dimensions",
    stone: "Stone",
    stoneOpacity: "Solid opacity",
    rotate: "Rotate",
    fullscreen: "Full screen",
    exitFullscreen: "Exit full screen",
    crossEye: "Cross-eye 3D",
    crossEyeHint:
      "Look at the bottom white dots and cross your eyes until they become one.",
    reverseDepth: "Reverse depth",
    language: "Language",
    assembling: "Assembling the pyramid…",
    confirmExit: "Exit Great Pyramid 11:7? Your current lab settings will be lost.",

    geometryTemplate: "Geometry template",
    oneShapeParam: "One shape parameter",
    pickModel:
      "Pick a model or set your own base-to-height ratio.",
    optimum: "preset",
    ratioBH: "B / H ratio",
    faceSlope: "Face slope angle",
    angle: "Angle",
    seked: "Seked",
    palms: "palms",
    obsDelta: "Observation Δ",
    bestPQ: "Best p/q",

    twelveRelations: "Relations",
    matchesOf12: "{n} of {total} within {tol}",
    relativeError:
      "Relative error |result − constant| / constant. √2 is exact for any square base and does not distinguish the angle.",
    mean: "Mean",
    independent: "Weighted",
    max: "Max.",
    constant: "Constant",
    formula: "Formula",
    error: "Error",

    errorLandscape: "Error landscape",
    angleScan: "Angle scan 51.78–51.90°",
    minMean: "min. mean",
    minimax: "minimax",
    model: "model",

    verdict: "Model ranking",
    points: "pts",
    verdictLead:
      "11:7 leads under the selected weights, including a preference for 11/7. It fits 12 of 13 targets within 0.1%. The rows are dependent; this ranking is not historical evidence.",
    construction: "11:7 preset",
    num: "num",
    meas: "angle ref.",
    fraction: "11/7 pref.",
    band: "band",
    verdictWeights:
      "Chosen weights: weighted error {n}%, reference-angle proximity {m}%, preference for 11/7 {f}%, robustness {r}%. This score is a comparison model, not a probability of builders’ intent. The reference angle’s uncertainty is not historically established here.",

    tabModels: "Models",
    tabConstants: "Constants",
    tabScan: "Scan",
    tabVerdict: "Verdict",

    holoTitle: "CONSTANTS",
    holoTolerance: "{n} / {total} in tolerance",
    holoScore: "Score {n}",

    model_phi_name: "Exact φ",
    model_phi_basis: "H / A = √φ",
    model_elevenSeven_name: "11 : 7",
    model_elevenSeven_basis: "B : H = 11 : 7  (440 : 280)",
    model_mean_name: "Mean 51.845°",
    model_mean_basis: "Angle used in the 12-constant analysis",
    model_petrie_name: "Petrie–Lehner–Cole",
    model_petrie_basis: "Mean used for e",
    model_pi_name: "Exact π",
    model_pi_basis: "H / A = 4 / π",
    model_goldenEgg_name: "Golden Egg 1.618033989",
    model_goldenEgg_basis: "z = 1/r · Z₀ = 7.65 · L/W = φ",
    model_custom_name: "Custom ratio",
    model_custom_basis: "Manually set B/H",

    const_pi: "Pi",
    const_gamma: "Euler–Mascheroni",
    const_sqrt3: "Square root of 3",
    const_sqrt6: "Square root of 6",
    const_sqrt2: "Square root of 2",
    const_sqrt5: "Square root of 5",
    const_tribonacci: "Tribonacci",
    const_brun: "Brun's constant",
    const_invPhi: "Inverse φ",
    const_phi: "Golden ratio",
    const_e: "Euler's number",
    const_eMinus1: "e minus one",
    const_eggLW: "Golden egg L/W",
  },
  pl: {
    siteKicker: "Wielka Piramida Cheopsa",
    siteTitle: "Laboratorium 11:7",
    siteLead:
      "Półprzezroczysta warstwa na ścianie pokazuje stałe. Zmień szablon — piramida i błędy liczą się na żywo.",
    score: "ocena",
    rainbowCaption:
      "Pierwotna: pionowy półokrąg w płaszczyźnie środkowej, czerwień r = H przez czubek. Wtórna: równoległa płaszczyzna za piramidą, zieleń r = 2H. Apotema ściany przedniej 51,84° → zieleń. Krawędź 41,99° kończy się w wierzchołku.",
    goldenEggCaption:
      "Współczesny model przekroju zr=1, Z₀=7,65: dopasowanie L/W do φ wybiera 51,795319256°. 10 z 13 celów w 0,1%. Zwykła scena jaja jest ilustracją; wybierz L/W dla obliczonego przekroju. To nie jest dowód historyczny.",
    hologram: "Hologram",
    rainbow: "Tęcza",
    dimensions: "Wymiary",
    stone: "Bryła",
    stoneOpacity: "Krycie bryły",
    rotate: "Obrót",
    fullscreen: "Pełny ekran",
    exitFullscreen: "Zamknij pełny ekran",
    crossEye: "3D na krzyż",
    crossEyeHint:
      "Patrz na dolne białe punkty i zezuj, aż zleją się w jeden.",
    reverseDepth: "Odwróć głębię",
    language: "Język",
    assembling: "Składanie piramidy…",
    confirmExit: "Zamknąć Great Pyramid 11:7? Bieżące ustawienia laboratorium zostaną utracone.",

    geometryTemplate: "Szablon geometrii",
    oneShapeParam: "Jeden parametr kształtu",
    pickModel:
      "Wybierz model albo zadaj własny stosunek boku do wysokości.",
    optimum: "preset",
    ratioBH: "Stosunek B / H",
    faceSlope: "Kąt nachylenia ściany",
    angle: "Kąt",
    seked: "Seked",
    palms: "dłoni",
    obsDelta: "Δ obserwacji",
    bestPQ: "Najlepszy p/q",

    twelveRelations: "Relacje",
    matchesOf12: "{n} z {total} w tolerancji {tol}",
    relativeError:
      "Błąd względny |wynik − stała| / stała. √2 jest dokładne dla każdej kwadratowej podstawy i nie rozróżnia kąta.",
    mean: "Średni",
    independent: "Ważony",
    max: "Maks.",
    constant: "Stała",
    formula: "Wzór",
    error: "Błąd",

    errorLandscape: "Krajobraz błędu",
    angleScan: "Skan kąta 51,78–51,90°",
    minMean: "min. średni",
    minimax: "minimax",
    model: "model",

    verdict: "Ranking modeli",
    points: "pkt",
    verdictLead:
      "11:7 prowadzi przy wybranych wagach, które uwzględniają preferencję 11/7. Mieści 12 z 13 celów w 0,1%. Wiersze są zależne; ranking nie jest dowodem historycznym.",
    construction: "preset 11:7",
    num: "num",
    meas: "kąt odn.",
    fraction: "pref. 11/7",
    band: "pasmo",
    verdictWeights:
      "Wybrane wagi: błąd ważony {n}%, bliskość kąta odniesienia {m}%, preferencja 11/7 {f}%, odporność {r}%. Ocena jest modelem porównania, nie prawdopodobieństwem intencji budowniczych. Nie potwierdzono tu historycznej podstawy niepewności kąta odniesienia.",

    tabModels: "Modele",
    tabConstants: "Stałe",
    tabScan: "Skan",
    tabVerdict: "Werdykt",

    holoTitle: "STAŁE",
    holoTolerance: "{n} / {total} w tolerancji",
    holoScore: "Ocena {n}",

    model_phi_name: "Dokładne φ",
    model_phi_basis: "H / A = √φ",
    model_elevenSeven_name: "11 : 7",
    model_elevenSeven_basis: "B : H = 11 : 7  (440 : 280)",
    model_mean_name: "Średnia 51,845°",
    model_mean_basis: "Kąt używany w analizie 12 stałych",
    model_petrie_name: "Petrie–Lehner–Cole",
    model_petrie_basis: "Średnia używana dla e",
    model_pi_name: "Dokładne π",
    model_pi_basis: "H / A = 4 / π",
    model_goldenEgg_name: "Złote jajo 1,618033989",
    model_goldenEgg_basis: "z = 1/r · Z₀ = 7,65 · L/W = φ",
    model_custom_name: "Własny stosunek",
    model_custom_basis: "Ręcznie zadane B/H",

    const_pi: "Pi",
    const_gamma: "Euler–Mascheroni",
    const_sqrt3: "Pierwiastek z 3",
    const_sqrt6: "Pierwiastek z 6",
    const_sqrt2: "Pierwiastek z 2",
    const_sqrt5: "Pierwiastek z 5",
    const_tribonacci: "Tribonacci",
    const_brun: "Stała Bruna",
    const_invPhi: "Odwrotność φ",
    const_phi: "Złoty podział",
    const_e: "Liczba Eulera",
    const_eMinus1: "e minus jeden",
    const_eggLW: "Złote jajo L/W",
  },
} as const;

export type MessageKey = keyof typeof translations.en;

export function t(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  let s: string = translations[locale][key] ?? translations.en[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, String(v));
    }
  }
  return s;
}

export function modelName(locale: Locale, id: string) {
  const key = `model_${id}_name` as MessageKey;
  return key in translations.en ? t(locale, key) : id;
}

export function modelBasis(locale: Locale, id: string) {
  const key = `model_${id}_basis` as MessageKey;
  return key in translations.en ? t(locale, key) : id;
}

export function constName(locale: Locale, id: string) {
  const key = `const_${id}` as MessageKey;
  return key in translations.en ? t(locale, key) : id;
}
