import type { ConstantId } from "./engine";
import type { Quantity, RelationStep } from "./relations";
import type { Locale } from "../i18n";

const step = (segments: Quantity[], pl: string, en: string): RelationStep => ({ segments, text: { pl, en } });

export const PHI_STEPS = [
  step(["A"], "O to środek podstawy, M — środek boku. OM jest półbokiem: A = B/2.", "O is the base centre; M is the midpoint of a side. OM is the half-side: A = B/2."),
  step(["A", "H"], "V leży nad O. Wysokość H = OV jest prostopadła do A = OM.", "V is above O. Height H = OV is perpendicular to A = OM."),
  step(["A", "H", "S"], "Apotema S = VM wynika z twierdzenia Pitagorasa: S² = H² + A².", "Face apothem S = VM follows from Pythagoras: S² = H² + A²."),
  step(["S", "A"], "Dzielimy S przez A. Dla 11:7 wynik przybliża φ; dokładne S/A = φ wymaga H/A = √φ.", "Divide S by A. For 11:7 the result approximates φ; exact S/A = φ requires H/A = √φ."),
];

export const RELATION_LESSONS: Record<ConstantId, RelationStep[]> = {
  pi: [
    step(["B"], "B = NC jest bokiem kwadratowej podstawy. Bierzemy dwie kopie B, czyli 2B — połowę obwodu.", "B = NC is a square-base side. Take two copies of B: 2B is half the perimeter."),
    step(["H"], "H = OV to pionowa wysokość. V leży dokładnie nad środkiem podstawy O.", "H = OV is the vertical height. V lies directly above the base centre O."),
    step(["B", "H"], "Układamy kopie B obok siebie i porównujemy 2B z H. Dla 11:7 otrzymujemy 22/7.", "Place the B copies end to end and compare 2B with H. For 11:7 this gives 22/7."),
    step(["B", "H"], "R = 2B/H jest przybliżeniem π. Pełny obwód to 4B, więc 4B/H przybliża 2π.", "R = 2B/H approximates π. The full perimeter is 4B, so 4B/H approximates 2π."),
  ],
  gamma: [
    step(["B"], "Licznik to suma dwóch boków: 2B. Podświetlony bok jest źródłem obu kopii.", "The numerator is the sum of two sides: 2B. The highlighted side supplies both copies."),
    step(["H", "D"], "D = KC jest pełną przekątną kwadratu, D = B√2. Mianownik wykorzystuje H i dwie kopie D.", "D = KC is the full square diagonal, D = B√2. The denominator uses H and two copies of D."),
    step(["B", "H", "D"], "Łańcuch H + D + D jest sumą długości. Nie jest pojedynczym odcinkiem piramidy. Oba łańcuchy mają wspólną skalę.", "H + D + D is a sum of lengths, not one pyramid segment. Both chains share a common scale."),
    step(["B", "H", "D"], "R = 2B/(H+2D) porównujemy z γ. Wynik jest odwrotnością modelowej relacji √3; cele γ i √3 nie są wzajemnie odwrotne.", "Compare R = 2B/(H+2D) with γ. The result is reciprocal to the model's √3 relation; the targets γ and √3 are not reciprocal."),
  ],
  sqrt3: [
    step(["H", "D"], "Bierzemy pionową wysokość H i dwie pełne przekątne D = B√2.", "Take vertical height H and two full diagonals D = B√2."),
    step(["B"], "Długość porównawcza to dwa boki, czyli 2B — połowa obwodu podstawy.", "The comparison length is two sides, 2B: half the base perimeter."),
    step(["B", "H", "D"], "Składamy licznik H+2D i mianownik 2B. Po podzieleniu: R = H/(2B) + √2.", "Assemble numerator H+2D and denominator 2B. Dividing gives R = H/(2B) + √2."),
    step(["B", "H", "D"], "R przybliża √3. Jest dokładną odwrotnością wyniku wiersza γ, więc nie daje niezależnej informacji o kształcie.", "R approximates √3. It is exactly reciprocal to the γ-row result and provides no independent shape information."),
  ],
  sqrt6: [
    step(["D"], "Pełna przekątna D = KC wynosi B√2. Jest odcinkiem w podstawie.", "The full diagonal D = KC equals B√2 and lies in the base."),
    step(["H", "D"], "Do licznika bierzemy H i dwie kopie D. Mianownik to jedna kopia D.", "The numerator uses H and two copies of D. The denominator is one copy of D."),
    step(["H", "D"], "Układamy H+D+D w jednej skali z D. R = (H+2D)/D = 2+H/D.", "Arrange H+D+D in the same scale as D. R = (H+2D)/D = 2+H/D."),
    step(["H", "D"], "R przybliża √6. Wynik jest relacją √3 pomnożoną przez √2; błąd względny obu przybliżeń jest taki sam.", "R approximates √6. It equals the √3 relation times √2; both approximations have the same relative error."),
  ],
  sqrt2: [
    step(["B"], "B = NC jest bokiem kwadratu. Drugi bok ma tę samą długość i jest do niego prostopadły.", "B = NC is a square side. The second side has the same length and is perpendicular to it."),
    step(["D", "B"], "Pełna przekątna D = KC łączy przeciwległe narożniki. D² = B²+B².", "Full diagonal D = KC joins opposite corners. D² = B²+B²."),
    step(["D", "B"], "Z twierdzenia Pitagorasa: D = B√2. Po podzieleniu przez B otrzymujemy D/B = √2.", "By Pythagoras: D = B√2. Dividing by B gives D/B = √2."),
    step(["D", "B"], "To dokładna tożsamość kwadratu. Błąd wynosi zero i nie zależy od wysokości ani modelu 11:7.", "This is an exact square identity. The error is zero and does not depend on height or the 11:7 model."),
  ],
  sqrt5: [
    step(["S"], "S = VM to apotema: od wierzchołka do środka boku. S² = H²+(B/2)².", "S = VM is the face apothem, from apex to side midpoint. S² = H²+(B/2)²."),
    step(["B", "S"], "Licznik dodaje bok B do apotemy S. Mianownik to samo S.", "The numerator adds side B to apothem S. The denominator is S alone."),
    step(["S", "B"], "Układamy kopie S i B: R = (S+B)/S = 1+B/S = 1+2/(S/A).", "Place copies of S and B end to end: R = (S+B)/S = 1+B/S = 1+2/(S/A)."),
    step(["S", "B"], "R przybliża √5 i zależy od relacji φ. Dokładna równość zachodzi przy S/A = φ, nie ogólnie dla 11:7.", "R approximates √5 and depends on the φ relation. Exact equality holds when S/A = φ, not generally for 11:7."),
  ],
  tribonacci: [
    step(["A", "D"], "Licznik to półbok A oraz dwie pełne przekątne D: A+2D.", "The numerator is half-side A plus two full diagonals D: A+2D."),
    step(["S", "B"], "Mianownik to suma apotemy S i boku B. To dwie długości, a nie jedna krawędź.", "The denominator is apothem S plus side B: two lengths, not a single edge."),
    step(["A", "D", "S", "B"], "Oba łańcuchy kopii pokazujemy we wspólnej skali. R = (A+2D)/(S+B).", "Both copied-length chains share one scale. R = (A+2D)/(S+B)."),
    step(["A", "D", "S", "B"], "Porównujemy R z T, pierwiastkiem T³−T²−T−1=0. Proporcja jest przybliżeniem i zależy od S/A oraz D/B.", "Compare R with T, the root of T³−T²−T−1=0. The ratio is an approximation depending on S/A and D/B."),
  ],
  brun: [
    step(["A"], "A = OM jest połową boku podstawy. Jest długością porównawczą.", "A = OM is half a base side and is the comparison length."),
    step(["E"], "E = VC jest krawędzią boczną do narożnika C. To inny odcinek niż apotema S = VM.", "E = VC is the side edge to corner C, distinct from face apothem S = VM."),
    step(["E", "A"], "Od środka podstawy do narożnika jest A√2. Stąd E² = H²+2A² i R = E/A.", "The centre-to-corner distance is A√2. Thus E² = H²+2A² and R = E/A."),
    step(["E", "A"], "R porównujemy z przyjętym oszacowaniem Bruna 1,902160583104. Nie ustalono ścisłego błędu tego oszacowania ani związku z sumą po liczbach pierwszych.", "Compare R with the adopted Brun estimate 1.902160583104. Its rigorous error and any relation to the prime sum have not been established."),
  ],
  invPhi: [
    step(["S"], "Licznik S jest apotemą VM. Jej długość wyznacza trójkąt VOM.", "Numerator S is face apothem VM; triangle VOM determines its length."),
    step(["A", "S"], "Mianownik dodaje do S półbok A = OM. Składamy S+A z dwóch kopii długości.", "The denominator adds half-side A = OM to S. Assemble S+A from two copied lengths."),
    step(["S", "A"], "R = S/(S+A). Dla p=S/A jest to p/(p+1), a nie ogólnie 1/p.", "R = S/(S+A). With p=S/A this is p/(p+1), not generally 1/p."),
    step(["S", "A"], "Cel to 1/φ. Dokładną równość otrzymamy dopiero przy S/A=φ. Wiersz jest zależny od modelowej relacji φ.", "The target is 1/φ. Exact equality requires S/A=φ. This row depends on the model's φ relation."),
  ],
  phi: PHI_STEPS,
  e: [
    step(["theta"], "θ przy M to kąt apotemy nad podstawą. W przekroju VOM: tan θ = H/A.", "θ at M is the apothem's angle above the base. In VOM: tan θ = H/A."),
    step(["beta"], "β przy V to kąt między wysokością a apotemą. β = 90°−θ.", "β at V is the angle between height and apothem. β = 90°−θ."),
    step(["theta", "beta"], "Bierzemy dwie kopie miary θ i dzielimy przez β. R = 2θ/β. To proporcja kątów, nie długości łuków.", "Take two copies of θ and divide by β. R = 2θ/β compares angles, not arc lengths."),
    step(["theta", "beta"], "R przybliża e. Stopnie i radiany dają ten sam wynik przy spójnej konwersji. Czynnik 2 jest wyborem wzoru porównawczego.", "R approximates e. Degrees and radians give the same result under coherent conversion. Factor 2 is a choice of comparison formula."),
  ],
  eMinus1: [
    step(["theta"], "θ jest kątem apotemy nad podstawą w trójkącie VOM.", "θ is the apothem's angle above the base in triangle VOM."),
    step(["beta"], "β = 90°−θ jest kątem przy wierzchołku V. Używamy tych samych kątów co w relacji e.", "β = 90°−θ is the angle at apex V. These are the same angles as in the e relation."),
    step(["theta", "beta"], "Najpierw liczymy 2θ/β, następnie odejmujemy 1 = β/β. Odjęcie dotyczy wyniku proporcji.", "First calculate 2θ/β, then subtract 1 = β/β. The subtraction acts on the ratio result."),
    step(["theta", "beta"], "R = 2θ/β−1 porównujemy z e−1. Wiersz wynika bezpośrednio z e; inny błąd względny nie oznacza nowego pomiaru.", "Compare R = 2θ/β−1 with e−1. This row derives directly from e; a different relative error does not represent a new measurement."),
  ],
  eggLW: [
    step(["theta"], "Powierzchnia spełnia zr=1, r=√(x²+y²). Przecinamy ją płaszczyzną z=Z₀+x tan θ, Z₀=7,65. θ pochodzi z bieżącego modelu piramidy.", "The surface obeys zr=1, r=√(x²+y²). Cut it with z=Z₀+x tan θ, Z₀=7.65; θ comes from the current pyramid model."),
    step(["L"], "Wybieramy zamknięty owal wokół Z₀. Jego końce to zLo i zHi; długość w płaszczyźnie wynosi L=(zHi−zLo)/sin θ.", "Choose the closed oval around Z₀. Its ends are zLo and zHi; in-plane length is L=(zHi−zLo)/sin θ."),
    step(["W"], "W=2√f(zMax), gdzie f(z)=1/z²−((z−Z₀)/tan θ)². Maksimum wyznacza zMax³(Z₀−zMax)=tan²θ. Nie leży dokładnie w połowie długości.", "W=2√f(zMax), where f(z)=1/z²−((z−Z₀)/tan θ)². The maximum satisfies zMax³(Z₀−zMax)=tan²θ; it is not exactly at mid-length."),
    step(["L", "W"], "Porównujemy L/W z φ. Owal nie jest elipsą. Dla 11:7 błąd przekracza 0,1%; preset Golden Egg dobiera kąt właśnie do L/W≈φ.", "Compare L/W with φ. The oval is not an ellipse. For 11:7 the error exceeds 0.1%; Golden Egg chooses its angle specifically for L/W≈φ."),
  ],
};

export const RELATION_DERIVATIONS: Record<ConstantId, string> = {
  pi: "B = 2A; R = 2B/H = 4/(H/A)", gamma: "D = B√2; R = 2B/(H+2D)",
  sqrt3: "R = H/(2B)+√2 = 1/Rγ", sqrt6: "R = 2+H/D = √2·R√3",
  sqrt2: "D² = B²+B² ⇒ D/B = √2", sqrt5: "S² = H²+A²; R = 1+2/(S/A)",
  tribonacci: "R = (1+4√2)/(S/A+2)", brun: "E² = H²+2A² ⇒ E/A = √((H/A)²+2)",
  invPhi: "p = S/A; R = p/(p+1)", phi: "S² = H²+A² ⇒ S/A = √(1+(H/A)²)",
  e: "tan θ = H/A; β = 90°−θ; R = 2θ/β", eMinus1: "R = R_e−1 = 2θ/β−1",
  eggLW: "L = (zHi−zLo)/sin θ; W = 2√f(zMax)",
};

export function relationIntro(id: ConstantId, locale: Locale) { return RELATION_LESSONS[id][3].text[locale]; }
