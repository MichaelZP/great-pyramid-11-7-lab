# ETAP 7 — powierzchnia hiperboliczna, złoty przekrój i piramida 11:7

Data: 2026-10-06. Zakres: specyfikacja, niezależne obliczenia i osobny lokalny
podgląd. Bez zmian silnika/sceny aplikacji, pełnej animacji, torusów, wirów,
pakowania Androida, commitów, push ani publikacji.

## Wynik

1. Obrót dodatniej gałęzi hiperboli daje powierzchnię **zr = k**, a nie klasyczny
   stożek ani hiperboloidę. Jej zamknięty przekrój jest owalem, nie elipsą.
2. Dla k = 1, z₀ = 7,65 rozwiązanie L/W = φ ma
   α ≈ **51,795319255898°**. Przy α = 51,84° otrzymujemy 1,619642951532,
   błąd 0,099439369%: zgodność w granicach tolerancji modelu, bez dokładnej równości.
3. Dla α = β piramidy 11:7 proporcja wynosi 1,619742960852,
   błąd **0,105620285%**: poza tolerancją 0,1%. Kątów i proporcji nie należy
   traktować jako jednego kryterium. Geometria B = 11, h = 7 pozostaje ustalona.
4. Warunek L/W = φ nie wyróżnia jednej pary (α, z₀), nawet po ustaleniu k = 1.
   Obliczone różne pary podano poniżej. Potrzebny jest drugi warunek konstrukcyjny.
5. Autor wskazał odbicie w poziomej płaszczyźnie **Z = h**, przez wierzchołek V,
   przy wspólnej osi piramidy i obu powierzchni. Ten wybór jest przyjęty.
   Położenie pierwszego układu i warunek skali są nadal wariantami do wyboru.

## Kontekst repozytorium i istniejące obiekty

Odczytano PLAN.md, STATUS.md, MATHEMATICS.md, GOLDEN-EGG.md,
OPTICAL-CORRESPONDENCE.md, README_PL.md, AUTHORSHIP.md i implementację.
Nie znaleziono stosownych AGENTS.md w drzewie projektu ani sprawdzonych
przodkach. Aplikacja ma własne repozytorium: gałąź `feature/android-offline`,
HEAD na początku pracy `f8ed12762abf0612213d7d48ce44b9ce2c1c1075`, drzewo czyste.
Nadrzędne repozytorium na `master` już pokazywało cały `android-offline/` i dwa
pliki PNG jako nieśledzone; to stan zastany, zachowany. Nagłówek poprzedniego
przeglądu w PLAN.md nie rozszerza uprawnień tego etapu.

| Obiekt | Rzeczywista definicja | Status |
|---|---|---|
| `engine.ts`, `geometricEggLW` | zr = 1; z = z₀ + x tan α; z₀ = 7,65 | Oblicza L/W owalu, wybierając zamkniętą gałąź. W kodzie kąt piramidy nazywa się θ; tutaj β. |
| `relation-geometry.ts`, `ovalSection` | Ten sam zr = 1, pochodna szerokości rozwiązana przez bisekcję | Rzeczywisty obrys do lekcji L/W. |
| `RelationOverlay.tsx`, `OvalGeometry` | Wspólna skala 5,5; mapa sceny (x,y,z) → (5,5x, 1,25 + 5,5(z−z₀), 5,5y) | Matematyczny przekrój zachowany, ustawienie umowne; zakres powierzchni [zLo−0,035; zHi+0,035], 32×72 siatka. |
| `PyramidCanvas.tsx`, `GoldenEggConstruct` | Współrzędne sceny (X,Y,Z): r = C/(Y+1,43), r² = X²+(Z+3,05)²; C = 0,5[(H/A)(A+3,05)+1,43], A = 1 | Hiperbola przesunięta i obrócona wokół osi Y przy Z = −3,05. Pokazany zakres Y ∈ [0;8,6]. Inne parametry niż z₀ = 7,65. |
| Cięcie zwykłej sceny | P₀ = (0,0,A), û = (0,H/S,−A/S), v̂ = (1,0,0); Z = A−AY/H; v² = [C/(Y+1,43)]²−(Z+3,05)² | Owal przybliżony próbkami, nazwany w zmiennej `ellipseTube`; nazwa nie oznacza elipsy. Osobno obraca jego profil jako ilustracyjne jajo przestrzenne. |

Nie znaleziono osobnego dokładnego wzorca elipsy Huntleya w tych konstrukcjach.
Podgląd etapu 7 dodaje go jako wzorzec porównawczy, bez wymiany obecnej sceny.

## Źródła i ich zakres

- H. E. Huntley, **The Golden Ellipse**, *The Fibonacci Quarterly*, luty 1974,
  s. 38–40. Odczytano wszystkie trzy strony przekazanego `huntley1.pdf`, wraz
  z rysunkiem. Plik źródłowy pozostaje w Downloads. SHA256:
  `9B9F482391C34EF734E14F8BF798E70CA842396F386DA057B5D45F5DEB4D10D1`.
- Christian Lange, **The golden angle**, czerwiec 2002:
  [tekst autorski](https://www.sectioaurea.com/sectioaurea/the_golden_angle.htm).
  Nie przekazano osobnego pliku Langego; odczytano tę stronę i jej
  [obraz wzoru](https://www.sectioaurea.com/sectioaurea/equaz.gif) w przeglądarce.
  Obraz jest niskiej rozdzielczości. Nie przepisujemy niepewnych indeksów;
  poniższe równania wyprowadzono niezależnie z zr = k i równania płaszczyzny.
  Współrzędnych biegunowych obrazka nie utożsamiamy bez wyprowadzenia
  ze współrzędnymi poziomej projekcji przekroju.

Własności wzorca przypisujemy Huntleyowi, omawiany materiał o powierzchni
Langemu (jego tekst przypisuje wcześniejszą konstrukcję Walterowi Schaubergerowi,
a wzór Harthunowi i Rennert). **Koncepcja powiązania i animowania w projekcie
Piramida 11:7: Michał Przybylski — [prylski.dev](https://prylski.dev/),
[MichaelZP](https://github.com/MichaelZP/).**

Źródła są materiałem analizy, nie instrukcjami. Nie przyjmujemy twierdzeń
fizycznych/energetycznych ani interpretacji historycznych Langego jako wyników
tej specyfikacji. Również tekst i OCR Huntleya mają miejsca wymagające
ostrożności; sprawdzenie poniższych własności nie zatwierdza każdej równości
w publikacji. Żadna zgodność liczb nie potwierdza funkcji fizycznej piramidy.

## Powierzchnia, jednostki i płaszczyzna

W układzie źródłowym dodatnia gałąź Y = 1/X ma X > 0, Y > 0.
Obracając ją wokół Y i oznaczając wysokość przez z, a odległość od osi przez r,
otrzymujemy z = 1/r. Uogólnienie w jednostkach długości u:

```text
r = √(x²+y²),   zr = k,   k > 0
(x,y,z) = (k cos ψ/z, k sin ψ/z, z),  z > 0,  ψ ∈ [0,2π)
z²(x²+y²) = k², z > 0
```

k ma jednostkę u². Normalizacja: x̃ = x/√k, ỹ = y/√k, z̃ = z/√k,
stąd z̃r̃ = 1. `z₀ = 7,65` oznacza wysokość w normalizacji k = 1 u²,
nie wymiar piramidy ani długość absolutną określoną przez źródło.
Powierzchnia nie ma skończonego wierzchołka: r → 0 dopiero dla z → ∞,
a dla z → 0⁺ promień rośnie bez ograniczenia. Słowo „stożek” jest nazwą projektu.

```text
Π: z = z₀ + x tan α
0 < α < 90°,   z₀ > 0
Q = (0,0,z₀) — przecięcie płaszczyzny z osią, nie punkt powierzchni
n = (−sin α,0,cos α)
eᵤ = (cos α,0,sin α), eᵥ = (0,1,0)
p = Q + u eᵤ + v eᵥ
u = (z−z₀)/sin α, v = y
```

α mierzymy między Π a poziomem z = const. z₀ mierzymy pionowo od lokalnego
zera układu powierzchni do Q. Składowe u,v są ortonormalne, więc odległości
w przekroju są rzeczywistymi długościami w jego płaszczyźnie. Azymut cięcia
można dowolnie obrócić wokół osi dzięki symetrii obrotowej powierzchni.

Można także niezależnie odtworzyć postać biegunową we własnej płaszczyźnie,
stosując z = z₀−ρ cos q sin α (odwrócony kierunek u), y = ρ sin q,
x = −ρ cos q cos α. Niech A(q) = √(sin²q+cos²q cos²α). Wówczas
r = ρA(q), a równanie zr = k daje:

```text
ρ = [z₀ ± √(z₀²−4k cos q sin α/A(q))]/(2 cos q sin α)
```

Dla właściwego zamkniętego owalu wybieramy gałąź z minusem i jej ciągłe
przedłużenie przy cos q = 0, ρ = k/z₀. To wyprowadzenie pokazuje, dlaczego
bieguna ρ w płaszczyźnie cięcia nie można utożsamiać z poziomym r.
Nie jest zgadywaniem znaków/indeksów na skanie.

## Zamknięty owal i pomiar L/W

Niech t = tan α. Po podstawieniu płaszczyzny:

```text
f(z) = y² = k²/z² − ((z−z₀)/t)²
z²[(z−z₀)²+t²y²] = k²t²
zLo = (z₀ + √(z₀²−4kt))/2
zHi = (z₀ + √(z₀²+4kt))/2
L = (zHi−zLo)/sin α
zMax³(z₀−zMax) = k²t², zMax ∈ (zLo,z₀)
W = 2√f(zMax)
```

Warunek odrębnego zamkniętego owalu: **z₀² > 4kt > 0**. Owal zajmuje
z ∈ [zLo,zHi]. Na dodatniej gałęzi jest również oddzielna część nieograniczona,
z ∈ (0,zSmall], gdzie zSmall = (z₀−√(z₀²−4kt))/2. Nie włączamy jej do L.
Przy równości granicznej składowe stykają się; model zamkniętego owalu traci
dotychczasową interpretację. Wysokość maksimum szerokości jest jednoznaczna:
g(z) = z³(z₀−z) najpierw rośnie do 3z₀/4, potem maleje;
g(zLo) > k²t² i g(z₀) = 0, więc w tym przedziale jest jeden właściwy pierwiastek.

L to rozpiętość w kierunku eᵤ, W to maksymalna prostopadła cięciwa.
Nie mierzymy długości po obrysie ani osi dopasowanej elipsy; nie zastępujemy
szerokości wartością w Q. Symbol **ℓ** poniżej oznacza półcięciwę ogniskową
elipsy Huntleya, aby nie pomylić jej z pełną długością owalu L.

Krzywa nie jest elipsą: dla elipsy symetrycznej względem osi u funkcja v²(u)
jest kwadratowa. Tutaj f'''(z) = −24k²/z⁵ ≠ 0, a z jest afiniczną funkcją u.
Owal jest symetryczny względem v → −v, lecz nie ma wymaganej symetrii
środkowej. Stopień cztery równania sam w sobie nie wystarcza do dowodu;
argument z niekwadratową funkcją f rozstrzyga sprawę.

## Weryfikacja wartości Langego i hipotezy jednoznaczności

Wyniki poniżej pochodzą z niezależnej arytmetyki Decimal, 60 cyfr;
pokazane cyfry są zaokrąglone. Pełne wyniki: [wyniki.json](etap-7/wyniki.json).

| Warunek (k = 1, z₀ = 7,65) | α [°] | L [u] | W [u] | L/W |
|---|---:|---:|---:|---:|
| Podane α Langego | 51,840000000000 | 0,423536310543 | 0,261499801633 | 1,619642951532 |
| α = β piramidy | 51,842773412631 | 0,423562482966 | 0,261499813985 | 1,619742960852 |
| α = θ Huntleya | 51,827292372988 | 0,423416444050 | 0,261499745076 | 1,619184920913 |
| Dobór α do L/W = φ | 51,795319255898 | 0,423115245749 | 0,261499603031 | 1,618033988750 |

Podane przez Langego L = 0,423584 i W = 0,261789 nie są odtworzone jako
dokładne długości tego układu. Dla α = 51,84°:

| Wielkość | Wzorzec: podane źródło | Model | Różnica bezwzględna | Odchylenie % | ≤ 0,1% |
|---|---:|---:|---:|---:|---|
| L | 0,423584 | 0,423536310543 | 0,000047689457 | 0,011258560 | TAK |
| W | 0,261789 | 0,261499801633 | 0,000289198367 | 0,110470022 | NIE |

Nie korygujemy równań ani skal niezależnych osi, żeby dopasować te liczby.
Objętość źródłowego jaja wymaga dodatkowej konstrukcji bryły; nie jest
własnością samego płaskiego przekroju i nie jest celem tego etapu.

Bez dodatkowego warunku hipoteza wyróżnionej pary jest fałszywa:

| k | z₀ [u] | Rozwiązanie α [°] | Warunek |
|---:|---:|---:|---|
| 1 | 5 | 51,650778899116 | L/W = φ z numeryczną resztą obliczeń |
| 1 | 7,65 | 51,795319255898 | j.w. |
| 1 | 10 | 51,816353931771 | j.w. |

Każde rozwiązanie otrzymano przez bisekcję t ∈ [1;1,3], z zachowaniem
warunku zamknięcia. Przy z₀ = 7,65 lokalna pochodna d(L/W)/dα ≈
0,035963358114 na stopień jest niezerowa. Potwierdza to numerycznie izolowany
lokalny pierwiastek i możliwość dalszego śledzenia rodziny; nie przedstawiamy
tego jako formalnego dowodu globalnej jednoznaczności dla ustalonego z₀.
Trzy różne rozwiązania już wystarczają do odrzucenia jednoznaczności pary.

Po normalizacji pozostają dwa bezwymiarowe parametry α i z₀/√k. Można zapisać
δ = kt/z₀², 0 < δ < 1/4, v = z/z₀ i G(v) = 1/v²−((v−1)/δ)²:

```text
L/W = sec α · (vHi−vLo)/(2δ√max G)
```

Drugi czynnik zależy od δ. Dla δ → 0 dąży do 1, stąd graniczna
aproksymacja L/W → sec α. Wyjaśnia ona bliskość kąta Huntleya, lecz nie
narzuca dokładnej równości dla skończonej wysokości cięcia.

## Dokładna złota elipsa Huntleya

W ortonormalnym układzie jej płaszczyzny: u²/φ² + v² = 1,
(u,v) = (φ cos q, sin q). Normalizacja b = 1, a = φ:

| Własność | Sprawdzenie | Wartość |
|---|---|---:|
| a/b | φ | 1,618033988750 |
| e | √(1−b²/a²) = 1/√φ | 0,786151377757 |
| c | √(a²−b²) = √φ | 1,272019649514 |
| d | a/e = φ^(3/2) | 2,058171027271 |
| ℓ | b²/a = 1/φ | 0,618033988750 |

Użyto φ² = φ+1. Ogniska: (±c,0), kierownice u = ±d, cięciwa ogniskowa
prostopadła do osi głównej ma końce (c,±ℓ) i długość 2ℓ. Te właściwości
nie są automatycznie przypisane owalowi o L/W bliskim φ.

## Kąty i tolerancje

W rysunku Huntleya trójkąt OBS jest prostokątny, OB = b, OS = c, BS = a.
θ = ∠OBS, więc cos θ = b/a = 1/φ, tan θ = c/b = √φ.
W piramidzie O = (0,0,0), V = (0,0,h), M− = (−B/2,0,0),
S = |VM−| = √(h²+(B/2)²). Trójkąt VOM− daje cos β = (B/2)/S,
tan β = 2h/B. Jeśli S/(B/2) = φ, to β = θ. Dla 11:7 to przybliżenie.
Nie ma równania powierzchni wymuszającego α = θ ani α = β.
Warunek **Π równoległa do ściany VM−** daje konstrukcyjnie α = β przy
wybranym azymucie; jest jawnie przyjętym warunkiem umieszczenia.

Domyślny próg: ε = 0,001 = 0,1%. Dla niezerowego wzorca q:
Δ = |q_model−q|; błąd% = 100Δ/|q|. Dla porównania kątów stosujemy stopnie.

| Porównanie | Wzorzec | Model | Różnica bezwzględna | Odchylenie % | ≤ 0,1% |
|---|---:|---:|---:|---:|---|
| β do θ [°] | 51,827292372988 | 51,842773412631 | 0,015481039643 | 0,029870439 | TAK |
| α złotego owalu do β [°] | 51,842773412631 | 51,795319255898 | 0,047454156733 | 0,091534757 | TAK |
| L/W, α = β | 1,618033988750 | 1,619742960852 | 0,001708972103 | 0,105620285 | NIE |
| L/W, α = 51,84° | 1,618033988750 | 1,619642951532 | 0,001608962782 | 0,099439369 | TAK |
| L/W, α = θ | 1,618033988750 | 1,619184920913 | 0,001150932163 | 0,071131520 | TAK |
| L/W, dobrany α | 1,618033988750 | 1,618033988750 | < 10⁻⁵⁵ | < 10⁻⁵³ | TAK |

Opis wyniku brzmi **„zgodność w granicach tolerancji modelu”**. Równość
α = β w wariancie równoległym jest definicją orientacji, nie odkryciem.
Reszta numerycznego rozwiązania nie jest matematyczną dokładną równością
zapisanej, zaokrąglonej liczby. Tolerancja modelu nie jest tolerancją produkcyjną.

## Porównanie całych obrysów

Wyrównanie jest jawne i deterministyczne: początek w środku rozpiętości L,
kierunek u wzdłuż długości, v prostopadły. Owal przekształcamy przez jedną
skalę λ = 2/W do szerokości wzorca 2b = 2. Nie rozciągamy osi niezależnie:

```text
U = 2(z−(zHi+zLo)/2)/(W sin α),   V = 2y/W
E(q) = (φ cos q, sin q)
D_H(C,E) = max{sup p∈C inf q∈E |p−q|, sup q∈E inf p∈C |p−q|}
η_H = D_H/(2φ) × 100%
```

To miara po zadanym wyrównaniu, nie wynik dopasowania optymalnego.
Skrypt oblicza obustronne odległości punktów do odcinków zamkniętych
obrysów dla 256, 512, 1024 próbek. Nie są to odległości pikselowe.

| α | Przybliżone D_H [jednostka b] | η_H [% długości elipsy] | ≤ 0,1% |
|---|---:|---:|---|
| β, 11:7 | 0,0017089721 | 0,0528101423 | TAK |
| 51,84° | 0,0016089628 | 0,0497196843 | TAK |
| θ | 0,0011509322 | 0,0355657598 | TAK |
| dobrany α | ≈ 0,00000917 | ≈ 0,000283 | TAK |

Dla dobranego α zmiana η_H między 512 a 1024 wynosi około 0,000000358
punktu procentowego. Są to miary dyskretne ze sprawdzeniem zagęszczenia,
nie certyfikowane granice dokładnego D_H. Wzorzec odległości to zero, więc
procentowy błąd względem samego zera byłby niezdefiniowany; dlatego
normalizujemy przez pełną długość elipsy 2φ. Owal może spełniać ten próg
obrysu, a jednocześnie nie spełniać osobnego progu L/W. Żaden wynik D_H
nie zmienia analitycznego faktu, że krzywa nie jest elipsą.

## Powierzchnia bez podstawy, osie i punkt zero — aktualizacja podglądu

Na kolejną prośbę autora dodano domyślny widok **„Bez podstawy · ku
nieskończoności”**. Nie zamykamy wycinka okręgiem ani dyskiem. Siatka
rozszerza się poza stały kadr, a strzałki po meridianach wskazują kontynuację.
Rysunek ma oczywiście skończony zakres próbkowania; nie deklarujemy,
że ekran obejmuje nieskończoność.

W lokalnych współrzędnych zr = k: r → ∞ daje z → 0⁺, a r → 0⁺ daje
z → ∞. Płaszczyzna z = 0 jest asymptotą, nie częścią powierzchni ani
jej podstawą. Punkt (0,0,0) także nie należy do powierzchni. Każda
pozioma sekcja na skończonej dodatniej wysokości pozostaje okręgiem;
usunięcie wizualnej podstawy nie zmienia symetrii obrotowej równania.

Podgląd pokazuje lokalne osie x,y,z pierwszego układu, punkt **0H** oraz
odbity punkt **0H′**. Zachowuje O jako środek podstawy piramidy. Po
dotychczasowym przesunięciu i skali lokalna płaszczyzna z = 0 ma wysokość
światową Z_a = Z(P_q)−s_q z₀, a jej odbicie Z_a′ = 2h−Z_a. Obie płaszczyzny
są zaznaczone linią przerywaną; nie utożsamiamy ich ze światowym Z = 0.
Zmiana suwaka skali przesuwa je zgodnie ze skalowaniem wokół V.

W nowym trybie z_min = min(0,008z₀; s_q/24; 0,8zLo), dzięki czemu
promień na dolnej granicy numerycznej jest co najmniej 24 jednostki
światowe i wykracza poza główny kadr. Nie rysujemy końcowego okręgu
przy z_min. Strzałki kontynuacji leżą na zr = k; płaszczyzny zerowe są
wyłącznie pomocnicze. Dawne wycinki z okrągłą podstawą pozostają
dostępne w selektorze. Kąty, przekroje, proporcje, geometria piramidy
i stały kadr nie ulegają zmianie.

[Zrzut widoku bez podstawy](etap-7/podglad-nieskonczonosc.png).

## Dodatkowe skalowanie względem wierzchołka — aktualizacja podglądu

Na prośbę autora dodano suwak zmieniający tylko oba układy hiperboliczne,
ich płaszczyzny cięcia, obrysy, podstawy i pozycje oznaczeń. Dla już
umieszczonego punktu p oraz V = (0,0,h):

```text
p_q = V + q(p−V),   0,005 ≤ q ≤ 2
s_q = qs,   k_q = q²s²k
P_q = V+q(P−V),   L_q = qL′,   W_q = qW′
```

W wariancie A punkt P = V pozostaje nieruchomy; w B punkt P zbliża się
do V przy zmniejszaniu q. Skalowanie komutuje z odbiciem w Z = h,
więc oba układy zachowują lustrzaną relację i wspólną oś. α i L/W
pozostają niezmienne. Piramida, jej apotemy i płaszczyzna odbicia
nie podlegają temu skalowaniu. Kamera ma stałą projekcję ortograficzną,
V jest na środku płótna; wyłączono automatyczne dopasowanie kadru do
powierzchni. Dzięki temu rozmiar piramidy na ekranie nie zmienia się
podczas przesuwania suwaka. Tekst ma stały rozmiar dla czytelności.

Domyślnie q = 0,08 (8%). Wybór **„Stożki z szerokimi podstawami”**
pokazuje zakres z_min = min(0,08z₀; 0,8zLo),
z_max = max(1,5z₀; 1,1zHi). Okrąg przy z_min jest oznaczony jako
podstawa dolna, a jego odbicie jako podstawa górna. To granice skończonego
wycinka, nie naturalne zakończenia nieskończonej powierzchni zr = k.
Zakres zawiera cały zamknięty przekrój. Próbkowanie wysokości jest
logarytmiczne, żeby zachować czytelny kształt przy szerokich podstawach.
Wybór **„Otoczenie przekrojów”** zachowuje wcześniejszy węższy zakres.
Gdy powierzchnie wychodzą poza stały kadr, podgląd zaleca zmniejszenie q.
Panel obrysu po prawej pozostaje niezależnym porównaniem znormalizowanym.

Kontrola geometrii renderowanej potwierdziła identyczne współrzędne ekranowe
piramidy przy q = 0,08 i 0,16 oraz jednolite podwojenie wszystkich punktów
obu powierzchni, podstaw, płaszczyzn i przekrojów względem V, dla A/B
i obu rzutów. Obsługę suwaka i zmianę zakresu sprawdzono w przeglądarce.
[Zrzut aktualizacji](etap-7/podglad-skala.png).

## Umieszczenie na osi piramidy — oddzielne operacje

Układ światowy (X,Y,Z) ma Z pionowe i podstawę w XY. To świadomy wybór;
aplikacja Three.js ma Y pionowe. Mapa do aplikacji przy integracji to
(X,Y,Z) → (X,Z,Y), z uwzględnieniem orientacji sceny.

1. **Obrót R:** obrót wokół pionowej osi ustala azymut zgodny z apotemą VM−.
   W podglądzie R = I. Nie pochylamy pionowej osi powierzchni.
2. **Jednolita skala s:** ustalona warunkiem L′ = L_doc, s = L_doc/L.
3. **Przesunięcie:** Q = (0,0,z₀) trafia w P = (0,0,Z_P):

```text
p_world = P + s R(p_local−Q)
X = sx, Y = sy, Z = Z_P+s(z−z₀)             [R = I]
r_world = √(X²+Y²)
(Z−Z_P+sz₀) r_world = s²k
Π_world: Z = Z_P+X tan α
```

Skalujemy razem powierzchnię, wszystkie punkty przekroju, geometrię
płaszczyzny, odcinki i pozycje oznaczeń. Stały rozmiar tekstu na ekranie służy
czytelności i nie jest niezależnym przekształceniem geometrii. Płaszczyzna
jest nieskończona; jej wyświetlany prostokąt to jedynie wycinek pomocniczy.
z₀′ = sz₀ jest wysokością względem **przesuniętego lokalnego zera powierzchni**,
nie światową wysokością P. Kąty i L/W są niezmienne; k′ = s²k, nie sk.

| Wariant podglądu | Punkt P | Warunek skali | Powiązanie z apotemą |
|---|---|---|---|
| A — domyślny, propozycja | P = V = (0,0,7) | L′ = h = 7 | Gdy α = β, Π zawiera prostą VM−. |
| B — porównawczy | P = (0,0,3,5) | L′ = h/2 = 3,5 | Gdy α = β, Π jest równoległa do ściany; nie zawiera VM−. |

Dla złotego owalu w wariancie B: s ≈ 8,271977989827,
k′ ≈ 68,425619864184, z₀′ ≈ 63,280631622177. Wariant A ma dwukrotnie
większe s i czterokrotnie większe k′. Powierzchnia nieskończona nie mieści
się w skończonej piramidzie. Umieszczenie na osi nie oznacza zawierania.
Także wybrany wycinek może wychodzić poza bryłę — podgląd tego nie ukrywa.

Węższy zakres „Otoczenie przekrojów”: z_min = zLo−1,25(zHi−zLo),
z_max = zHi+1,25(zHi−zLo). Dla predefiniowanych modeli jest dodatni.
Dla własnych parametrów zakres z_min jest ograniczony poniżej do zLo/2,
żeby nie przejść przez osobliwość z = 0. Siatka jest tylko przybliżeniem
tego wycinka; obrys i płaszczyzna wynikają z tych samych parametrów.

## Odbicie zatwierdzone przez autora

Decyzja z bieżącej rozmowy: pozioma płaszczyzna przez wierzchołek na wspólnej
osi. **Σ: Z = h = 7**, R_Σ(X,Y,Z) = (X,Y,2h−Z). Jest to pojedyncze odbicie
(wyznacznik −1), nie obrót ani odwrócenie jednej osi przekroju na potrzeby
dopasowania. Odbijamy cały pierwszy układ, również jego płaszczyznę i oznaczenia.

```text
P′ = (0,0,2h−Z_P)
Π′: Z = 2h−Z_P−X tan α
(2h−Z−Z_P+sz₀) r_world = s²k
```

Szeroka część pierwszej powierzchni jest przy niższym Z; po odbiciu jest
przy wyższym Z. Obie osie pozostają X = Y = 0. Dla wariantu A P′ = P = V;
przy α = β pierwsza płaszczyzna zawiera VM−, druga VM+, gdzie
M+ = (B/2,0,0). Dla wariantu B P′ ma Z = 10,5, a druga płaszczyzna jest
jedynie równoległa do przeciwległej ściany. Złoty dobór α przy z₀ = 7,65
różni się od β o 0,047454°; wtedy powiązanie jest przybliżone w tolerancji,
bez ścisłej równoległości. Odbicie pionowe nie realizowałoby wskazania
„szeroka część ku górze”, dlatego nie jest wariantem zatwierdzonym.

## Podgląd, odtwarzanie i decyzje

[podglad.html](etap-7/podglad.html) jest samodzielnym plikiem bez zależności
sieciowych. Można otworzyć go lokalnie w przeglądarce albo uruchomić z katalogu
aplikacji `python -m http.server 8087 --bind 127.0.0.1 --directory docs/etap-7`
i wejść na **http://127.0.0.1:8087/podglad.html**. Panel pozwala zmieniać
α, z₀, wariant A/B, widok 3D/pionowy, obrót widoku i widoczność odbicia.
Porównuje proporcje niezależnie od kątów. Nie ma animacji ani integracji
z przełącznikami obecnej aplikacji.

Odtworzenie obliczeń: `python -X utf8 docs/etap-7/verify.py` (tylko biblioteka
standardowa). Generuje własny `wyniki.json`, nie modyfikuje silnika ani arkuszy.
Sprawdza końce owalu, maksimum szerokości, trzy złote rozwiązania i niezmiennik
skalowania; miarę obrysu oblicza osobno zwykłymi liczbami zmiennoprzecinkowymi.

**Otwarta decyzja:** czy pierwszy układ ma mieć P = V i L′ = h (A),
czy P na połowie wysokości i L′ = h/2 (B), czy inne dokładnie podane
Z_P i L_doc? Odbicie w Z = h jest już ustalone i nie wymaga ponownego wyboru.
Należy też świadomie wybrać wariant matematyczny: α = β zapewnia ścisłe
powiązanie ze ścianą, lecz L/W wypada poza 0,1%; dobór α daje złotą proporcję
przy przybliżonym powiązaniu kątowym ze ścianą. Podgląd udostępnia oba.

**Jeden następny krok:** autor wybiera punkt P, warunek skali i wariant α
na podstawie podglądu; dopiero potem przygotować integrację wybranego
układu w istniejącej scenie, jako osobny etap bez automatycznej publikacji.
