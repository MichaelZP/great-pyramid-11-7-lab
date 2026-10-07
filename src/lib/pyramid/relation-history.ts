import type { ConstantId } from "./engine";
import type { Locale } from "../i18n";

type Text = Record<Locale, string>;
const bi = (pl: string, en: string): Text => ({ pl, en });
const source = (title: string, url: string, scope: Text) => ({ title, url, scope });

// Bibliography and scope are bundled: reading the notes never needs a network.
export const HISTORY_SOURCES = {
  notation: source("Jeff Miller · MacTutor: Symbols for Constants", "https://mathshistory.st-andrews.ac.uk/Miller/mathsym/constants/", bi("π, e, γ i φ: zapisy i świadectwa ich użycia; pierwszeństwo γ jest sporne.", "π, e, γ and φ: notation and evidence of use; priority for γ is disputed.")),
  radical: source("MacTutor · Christoff Rudolff", "https://mathshistory.st-andrews.ac.uk/Biographies/Rudolff/", bi("Coss (1525): użycie znaku √. To historia zapisu, nie odkrycia wszystkich pierwiastków.", "Coss (1525): use of √. This dates notation, not the discovery of every square root.")),
  archimedes: source("E. B. Davies · Archimedes’ calculations of square roots (2011)", "https://arxiv.org/abs/1101.0492", bi("Badanie granic √3 w Pomiarze koła Archimedesa; metoda ich uzyskania pozostaje niepewna.", "Research on bounds for √3 in Archimedes’ Measurement of a Circle; how he obtained them remains uncertain.")),
  euclidX: source("Euklides / D. Joyce · Elements X.9", "https://mathcs.clarku.edu/~djoyce/elements/bookX/propX9.html", bi("Współmierność długości i kwadratów; starożytne tło dzisiejszych pierwiastków niewymiernych.", "Commensurability of lengths and squares: ancient context for modern irrational roots.")),
  babylon: source("D. Melville · YBC 7289, Yale Babylonian Collection", "https://myslu.stlawu.edu/~dmel/mesomath/tablets/YBC7289.html", bi("Tabliczka starobabilońska z przybliżeniem √2; nie jest dowodem wiedzy budowniczych w Gizie.", "Old Babylonian tablet with an approximation to √2; not evidence about the builders at Giza.")),
  euclidII: source("Euklides / D. Joyce · Elements II.11", "https://mathcs.clarku.edu/~djoyce/elements/bookII/propII11.html", bi("Konstrukcja podziału odcinka; dzisiejsza algebra wiąże ją z √5 i φ.", "A construction dividing a segment; modern algebra relates it to √5 and φ.")),
  euclidVI: source("Euklides / D. Joyce · Elements VI, Definition 3", "https://mathcs.clarku.edu/~djoyce/elements/bookVI/defVI3.html", bi("Definicja podziału w skrajnym i średnim stosunku, bez nazwy „złoty” i symbolu φ.", "Definition of division in extreme and mean ratio, without the name ‘golden’ or symbol φ.")),
  golden: source("J. O’Connor, E. Robertson · MacTutor: Golden ratio", "https://mathshistory.st-andrews.ac.uk/HistTopics/Golden_ratio/", bi("Mästlin (1597): 0,6180340; nazwa „złoty podział” poświadczona u Ohma (1835), jej twórca nieustalony.", "Mästlin (1597): 0.6180340; ‘golden section’ attested in Ohm (1835), its originator unknown.")),
  tribonacci: source("M. Feinberg · Fibonacci–Tribonacci (1963), pp. 71–74", "https://www.fq.math.ca/Scanned/1-3/feinberg.pdf", bi("Źródłowy artykuł dokumentuje nazwę i ciąg sumujący trzy poprzednie wyrazy; nie dowodzi pierwszeństwa wszelkich takich rekurencji.", "Original article documents the name and recurrence summing three preceding terms; not priority for every such recurrence.")),
  brun: source("MacTutor · Viggo Brun", "https://mathshistory.st-andrews.ac.uk/Biographies/Brun/", bi("Twierdzenie z 1919 r. o zbieżności sumy odwrotności liczb pierwszych bliźniaczych i nazwa stałej.", "The 1919 convergence theorem for reciprocal twin primes and the constant’s name.")),
  brunEstimate: source("OEIS · A065421", "https://oeis.org/A065421", bi("Pochodzenie przyjętego oszacowania 1,902160583104; nie wszystkie jego cyfry są ustalone.", "Provenance of the adopted estimate 1.902160583104; not all its digits are established.")),
  e: source("J. O’Connor, E. Robertson · MacTutor: The number e", "https://mathshistory.st-andrews.ac.uk/HistTopics/e/", bi("Logarytmy i procent składany; Bernoulli badał granicę (1+1/n)ⁿ w 1683 r.", "Logarithms and compound interest; Bernoulli studied the limit of (1+1/n)ⁿ in 1683.")),
  lange: source("Christian Lange · The golden angle (June 2002)", "https://www.sectioaurea.com/sectioaurea/the_golden_angle.htm", bi("Źródło autorskie współczesnej propozycji „golden egg”, zr=1 i Z₀=7,65. Nie potwierdza jej twierdzeń fizycznych ani intencji budowniczych; liczby sprawdza osobny audyt.", "Author’s source for the modern ‘golden egg’, zr=1 and Z₀=7.65 proposal. It does not establish its physical claims or builders’ intent; a separate audit checks the numbers.")),
  petrie: source("W. M. F. Petrie · The Pyramids and Temples of Gizeh (1883; wyd. 2 / ed. 2, 1885; reprint 1990)", "https://gizapyramids.org/pdf_library/petrie_gizeh.pdf", bi("Skan drugiego wydania: pomiary w rozdz. II; interpretacja 7:22 i 14:11 w rozdz. IX, s. 93 (PDF 106). Późniejsza teoria autora, nie zapis intencji budowniczych.", "Second-edition scan: survey in ch. II; interpretation of 7:22 and 14:11 in ch. IX, p. 93 (PDF 106). A later author’s theory, not a record of builders’ intent.")),
  rhind: source("British Museum · Rhind Mathematical Papyrus, EA10057", "https://www.britishmuseum.org/collection/object/Y_EA10057", bi("Papirus datowany na ok. 1550 p.n.e., późniejszy niż Wielka Piramida. Dokumentuje egipską matematykę; nie plan jej budowy.", "Papyrus dated to about 1550 BCE, later than the Great Pyramid. Evidence of Egyptian mathematics, not its building plan.")),
} as const;
export type HistorySourceId = keyof typeof HISTORY_SOURCES;
export type RelationHistory = {
  concept: Text; name: Text; symbol: Text; mathematics: Text; interpretation: Text;
  sources: readonly HistorySourceId[];
};

export const RELATION_HISTORY: Record<ConstantId, RelationHistory> = {
  pi: {
    concept: bi("Archimedes w III w. p.n.e. ograniczył stosunek obwodu koła do średnicy za pomocą wielokątów.", "In the third century BCE, Archimedes bounded circumference divided by diameter using polygons."),
    name: bi("„Pi” jest nazwą greckiej litery; stosunek badano długo przed przyjęciem tej nazwy.", "‘Pi’ names a Greek letter; the ratio was studied long before this name was adopted."),
    symbol: bi("Jones użył π dla tego stosunku w 1706 r.; Euler upowszechnił zapis w 1748 r.", "Jones used π for this ratio in 1706; Euler popularized the notation in 1748."),
    mathematics: bi("Dla 11:7, 2B/H = 22/7 ≈ π. To połowa obwodu podstawy przez wysokość.", "For 11:7, 2B/H = 22/7 ≈ π: half the base perimeter divided by height."),
    interpretation: bi("Petrie omawiał taki związek w 1883 r. To późniejsza interpretacja wymiarów, nie świadectwo zamierzonego użycia π.", "Petrie discussed this relationship in 1883. This is a later interpretation of dimensions, not evidence of intentional use of π."),
    sources: ["archimedes", "notation", "petrie"],
  },
  gamma: {
    concept: bi("Euler badał różnicę między sumą 1+1/2+…+1/n a ln n w latach 1734–35; praca ukazała się w 1740 r.", "Euler studied the difference between 1+1/2+…+1/n and ln n in 1734–35; the work appeared in 1740."),
    name: bi("Nazwa upamiętnia Eulera i późniejsze obliczenia Mascheroniego z 1790 r.", "The name commemorates Euler and Mascheroni’s later calculations in 1790."),
    symbol: bi("Euler pisał C, Mascheroni A. γ jest poświadczone w XIX w.; pierwszeństwo jego użycia jest sporne.", "Euler wrote C, Mascheroni A. γ is attested in the nineteenth century; priority for its use is disputed."),
    mathematics: bi("Cel γ jest granicą Hₙ−ln n. Modelowe 2B/(H+2D) jest przybliżeniem, odwrotnością wiersza √3.", "Target γ is the limit of Hₙ−ln n. Model ratio 2B/(H+2D) is an approximation, reciprocal to the √3 row."),
    interpretation: bi("Historia γ nie dokumentuje jej doboru w piramidzie. Nie ustalono źródła intencji dla tego wzoru.", "The history of γ does not document its selection in the pyramid. No source of intent for this formula has been established."),
    sources: ["notation"],
  },
  sqrt3: {
    concept: bi("Archimedes używał granic 265/153 < √3 < 1351/780 w Pomiarze koła; sposób ich uzyskania jest niepewny.", "Archimedes used bounds 265/153 < √3 < 1351/780 in Measurement of a Circle; how he obtained them is uncertain."),
    name: bi("„Pierwiastek z 3” opisuje dodatnią liczbę, której kwadrat to 3; nie jest nazwą od odkrywcy.", "‘Square root of 3’ describes the positive number whose square is 3; it is not named after a discoverer."),
    symbol: bi("Znak √ występuje w Coss Rudolffa (1525), dużo później niż obliczenia Archimedesa.", "√ appears in Rudolff’s Coss (1525), long after Archimedes’ calculations."),
    mathematics: bi("R = (H+2D)/(2B) ≈ √3 i R = 1/Rγ. Cele √3 i γ nie są dokładnymi odwrotnościami.", "R = (H+2D)/(2B) ≈ √3 and R = 1/Rγ. Targets √3 and γ are not exact reciprocals."),
    interpretation: bi("Starożytne obliczenia √3 nie dowodzą użycia tej sumy długości w Gizie.", "Ancient calculations of √3 do not establish use of this sum of lengths at Giza."),
    sources: ["archimedes", "radical"],
  },
  sqrt6: {
    concept: bi("Księga X Elementów Euklidesa bada współmierność długości i kwadratów — tło dzisiejszych pierwiastków niewymiernych.", "Book X of Euclid’s Elements studies commensurability of lengths and squares, the context of modern irrational roots."),
    name: bi("„Pierwiastek z 6” oznacza dodatnią liczbę o kwadracie 6. Nie ustalono osobnego momentu jej odkrycia.", "‘Square root of 6’ denotes the positive number with square 6. A separate discovery date has not been established."),
    symbol: bi("√6 łączy znak pierwiastka, poświadczony u Rudolffa w 1525 r., z liczbą 6.", "√6 combines the radical sign, attested in Rudolff in 1525, with the number 6."),
    mathematics: bi("Cel √6 = √2·√3. Także R√6 = √2·R√3, więc oba wiersze mają ten sam błąd względny.", "Target √6 = √2·√3. Also R√6 = √2·R√3, so the two rows have the same relative error."),
    interpretation: bi("To algebraicznie zależny wynik, nie drugie niezależne świadectwo projektu piramidy.", "This is an algebraically dependent result, not a second independent piece of evidence about the pyramid’s design."),
    sources: ["euclidX", "radical"],
  },
  sqrt2: {
    concept: bi("Starobabilońska tabliczka YBC 7289 zawiera dokładne przybliżenie przekątnej kwadratu, czyli dzisiejszego √2.", "Old Babylonian tablet YBC 7289 contains an accurate approximation to a square’s diagonal, today’s √2."),
    name: bi("„Pierwiastek z 2” to opis algebraiczny. Tabliczka nie używa tej współczesnej nazwy.", "‘Square root of 2’ is an algebraic description. The tablet does not use this modern name."),
    symbol: bi("Współczesne √2 używa znaku √ z tradycji Rudolffa (1525); tabliczka ma zapis sześćdziesiątkowy.", "Modern √2 uses the radical sign in Rudolff’s tradition (1525); the tablet uses sexagesimal notation."),
    mathematics: bi("D² = B²+B² ⇒ D/B = √2 dokładnie, dla każdej wysokości kwadratowej piramidy.", "D² = B²+B² ⇒ D/B = √2 exactly, at every height of a square pyramid."),
    interpretation: bi("To cecha kwadratowej podstawy. Nie wyróżnia 11:7, a tabliczka z Babilonii nie dowodzi intencji budowniczych w Gizie.", "This is a property of the square base. It does not distinguish 11:7; a Babylonian tablet does not establish the Giza builders’ intent."),
    sources: ["babylon", "radical"],
  },
  sqrt5: {
    concept: bi("Konstrukcja Euklidesa II.11 dzieli odcinek w proporcji dziś wyrażanej przez √5 i złotą liczbę.", "Euclid’s construction II.11 divides a segment in a ratio now expressed using √5 and the golden ratio."),
    name: bi("„Pierwiastek z 5” opisuje liczbę o kwadracie 5. To współczesny język algebraiczny dla dawnej geometrii.", "‘Square root of 5’ describes a number with square 5: modern algebraic language for ancient geometry."),
    symbol: bi("√5 używa znaku √ poświadczonego u Rudolffa (1525), a nie zapisu Euklidesa.", "√5 uses the radical sign attested in Rudolff (1525), rather than Euclid’s notation."),
    mathematics: bi("√5 = 2φ−1. Modelowe (S+B)/S = 1+2/p, p=S/A; równość z √5 wymaga p=φ.", "√5 = 2φ−1. Model ratio (S+B)/S = 1+2/p, p=S/A; equality with √5 requires p=φ."),
    interpretation: bi("Wiersz zależy od S/A. Znajomość konstrukcji Euklidesa nie potwierdza jej zastosowania w Wielkiej Piramidzie.", "This row depends on S/A. Euclid’s construction does not establish its application in the Great Pyramid."),
    sources: ["euclidII", "radical"],
  },
  tribonacci: {
    concept: bi("Ciąg sumuje trzy poprzednie wyrazy. Feinberg opisał go w artykule Fibonacci–Tribonacci z 1963 r.", "The sequence sums three preceding terms. Feinberg described it in Fibonacci–Tribonacci in 1963."),
    name: bi("Tytuł artykułu dokumentuje nazwę „Tribonacci”, nawiązującą do Fibonacciego i trzech składników.", "The article’s title documents ‘Tribonacci’, referring to Fibonacci and three summands."),
    symbol: bi("T jest skrótem użytym w tej aplikacji dla stałej, nie dowodem uniwersalnego historycznego oznaczenia.", "T is this app’s abbreviation for the constant, not evidence of a universal historical symbol."),
    mathematics: bi("Cel T>1 spełnia T³=T²+T+1. Model R=(1+4√2)/(p+2), p=S/A, jest przybliżeniem.", "Target T>1 satisfies T³=T²+T+1. Model R=(1+4√2)/(p+2), p=S/A, is an approximation."),
    interpretation: bi("Nowoczesna nazwa nie datuje samej zależności, ale brak źródła łączącego ją z zamysłem budowniczych.", "The modern name does not date the relationship itself, but no source connects it to the builders’ intentions."),
    sources: ["tribonacci"],
  },
  brun: {
    concept: bi("Brun w 1919 r. dowiódł zbieżności sumy odwrotności liczb pierwszych bliźniaczych, np. (1/3+1/5)+(1/5+1/7)+….", "In 1919 Brun proved convergence of the reciprocal twin-prime sum, e.g. (1/3+1/5)+(1/5+1/7)+…."),
    name: bi("„Stała Bruna” upamiętnia Vigga Bruna i dotyczy tej sumy, a nie długości krawędzi.", "‘Brun’s constant’ commemorates Viggo Brun and denotes that sum, rather than an edge length."),
    symbol: bi("B₂ oznacza tutaj sumę dla par bliźniaczych. To inne B niż bok podstawy piramidy.", "Here B₂ denotes the twin-prime sum. It differs from B, the pyramid’s base side."),
    mathematics: bi("E/A = √(p²+1), p=S/A. Porównujemy z oszacowaniem 1,902160583104, nie dokładną znaną wartością.", "E/A = √(p²+1), p=S/A. The comparison uses estimate 1.902160583104, not a known exact value."),
    interpretation: bi("Nie ustalono twierdzenia łączącego E/A z sumą po liczbach pierwszych ani źródła intencji budowniczych.", "No theorem connecting E/A to the prime sum or source of builders’ intent has been established."),
    sources: ["brun", "brunEstimate"],
  },
  invPhi: {
    concept: bi("Mästlin podał w liście do Keplera z 1597 r. około 0,6180340 dla dłuższej części złoto podzielonego odcinka jednostkowego.", "In a 1597 letter to Kepler, Mästlin gave about 0.6180340 for the longer part of a unit segment divided in the golden ratio."),
    name: bi("„Odwrotność φ” jest opisem tej samej proporcji w odwrotnym kierunku, nie nazwą nowego odkrycia.", "‘Inverse φ’ describes the same proportion in the opposite direction, not a new discovery."),
    symbol: bi("1/φ składa się z dzielenia i późniejszego symbolu φ; nie przypisujemy temu zapisowi starożytnego pochodzenia.", "1/φ combines division with the later symbol φ; we do not attribute ancient origins to this notation."),
    mathematics: bi("1/φ = φ−1. Modelowe S/(S+A)=p/(p+1) nie jest ogólnie równe 1/p.", "1/φ = φ−1. Model ratio S/(S+A)=p/(p+1) is not generally equal to 1/p."),
    interpretation: bi("To przekształcenie wiersza S/A, bez dodatkowego niezależnego dowodu dotyczącego piramidy.", "This transforms the S/A row, without providing additional independent evidence about the pyramid."),
    sources: ["golden", "notation"],
  },
  phi: {
    concept: bi("Euklides VI, definicja 3, opisuje podział w skrajnym i średnim stosunku: całość do większej części jak większa do mniejszej.", "Euclid VI, definition 3, describes extreme and mean ratio: whole to larger part as larger to smaller."),
    name: bi("Nazwa „złoty podział” jest poświadczona u Martina Ohma w 1835 r.; nie ustalono jej twórcy.", "‘Golden section’ is attested in Martin Ohm in 1835; its originator has not been established."),
    symbol: bi("Cook w 1914 r. przypisuje propozycję φ Markowi Barrowi. To świadectwo oznaczenia, nie użycia proporcji przez Fidiasza.", "Cook in 1914 credits Mark Barr with proposing φ. This documents notation, not use of the ratio by Phidias."),
    mathematics: bi("φ=(1+√5)/2 i φ²=φ+1. Dla 11:7 S/A≈φ; dokładny preset φ wybiera inne H/A.", "φ=(1+√5)/2 and φ²=φ+1. For 11:7, S/A≈φ; the exact-φ preset selects a different H/A."),
    interpretation: bi("Bliskość S/A do φ jest wynikiem modelu. Cytowane źródła nie dokumentują zamierzonego złotego podziału w piramidzie.", "Proximity of S/A to φ is a model result. The cited sources do not document an intended golden ratio in the pyramid."),
    sources: ["euclidVI", "golden", "notation"],
  },
  e: {
    concept: bi("Badania logarytmów i procentu składanego prowadziły do e. Bernoulli badał granicę (1+1/n)ⁿ w 1683 r.", "Studies of logarithms and compound interest led to e. Bernoulli studied the limit of (1+1/n)ⁿ in 1683."),
    name: bi("„Liczba Eulera” jest nazwą upamiętniającą matematyka, nie świadectwem, że pojęcie zaczęło się od niego.", "‘Euler’s number’ commemorates the mathematician, not evidence that the concept began with him."),
    symbol: bi("Euler użył e w rękopisie z 1727–28 r.; drukiem w Mechanica (1736). Powód wyboru litery nie jest ustalony.", "Euler used e in a 1727–28 manuscript and in print in Mechanica (1736). Why he chose the letter is uncertain."),
    mathematics: bi("e jest podstawą logarytmu naturalnego. Modelowe 2θ/β≈e porównuje kąty; stopnie i radiany dają ten sam iloraz.", "e is the natural-logarithm base. Model ratio 2θ/β≈e compares angles; degrees and radians give the same ratio."),
    interpretation: bi("Czynnik 2 jest wyborem formuły porównawczej. Historia e nie dowodzi takiego projektu piramidy.", "Factor 2 is a choice of comparison formula. The history of e does not establish such a pyramid design."),
    sources: ["e", "notation"],
  },
  eMinus1: {
    concept: bi("e−1 powstaje przez odjęcie jedności od e. Jego kontekst historyczny to rozwój logarytmów i funkcji wykładniczej.", "e−1 subtracts one from e. Its historical context is the development of logarithms and the exponential function."),
    name: bi("„e minus jeden” jest opisem działania; nie ustalono odrębnej historycznej nazwy ani odkrycia.", "‘e minus one’ describes an operation; no separate historical name or discovery has been established."),
    symbol: bi("e−1 łączy symbol Eulera z odejmowaniem. To nie e⁻¹, które oznacza 1/e.", "e−1 combines Euler’s symbol with subtraction. It differs from e⁻¹, which means 1/e."),
    mathematics: bi("Model odejmuje jedność od R_e. Błąd bezwzględny jest ten sam co dla e, względny jest inny.", "The model subtracts one from R_e. Its absolute error equals the e row’s; its relative error differs."),
    interpretation: bi("To ten sam wynik geometryczny po przekształceniu, nie kolejne niezależne świadectwo intencji.", "This transforms the same geometric result, rather than providing another independent piece of evidence of intent."),
    sources: ["e", "notation"],
  },
  eggLW: {
    concept: bi("Christian Lange opisuje współczesną propozycję złotego owalu: płaskie cięcie powierzchni obrotu hiperboli, z Z₀=7,65.", "Christian Lange describes a modern golden-oval proposal: a plane cuts a hyperbola’s surface of revolution, with Z₀=7.65."),
    name: bi("„Golden Egg” („Złote Jajo”) to nazwa propozycji i presetu; nie ustalono pierwszego użycia ani starożytnego pochodzenia.", "‘Golden Egg’ names the proposal and preset; its first use or ancient origin has not been established."),
    symbol: bi("L/W to długość przez szerokość (length/width). Cel φ jest istniejącą stałą, nie nową stałą L/W.", "L/W means length divided by width. Target φ is an existing constant, not a new L/W constant."),
    mathematics: bi("Owal zr=1 nie jest elipsą. Dla 11:7 błąd L/W wobec φ to 0,105620285%; preset Golden Egg dobiera kąt do celu.", "The zr=1 oval is not an ellipse. At 11:7 its L/W error against φ is 0.105620285%; Golden Egg chooses an angle to fit the target."),
    interpretation: bi("Lange dokumentuje własną interpretację. Audyt nie potwierdza jego liczb ani twierdzeń o funkcji fizycznej czy intencjach budowniczych.", "Lange documents his own interpretation. The audit does not confirm his numerical claims or claims about physical function or builders’ intent."),
    sources: ["lange", "euclidVI"],
  },
};
