# ETAP 11 — zaawansowana wizualizacja podwójnego wiru, 2026-10-06

**Implementacja lokalna gotowa do odbioru artystycznego. Fizyczny telefon i
płynność rzeczywistego wyświetlania NIEZWERYFIKOWANE.**
„Wizualizacja artystyczna przeciwbieżnych wirów toroidalnych”.
Koncepcja: Michał Przybylski — [prylski.dev](https://prylski.dev/),
https://github.com/MichaelZP/.
Inspiracja przepływami Naviera–Stokesa nie oznacza rozwiązywania równań,
symulacji płynu ani dowodu fizycznego działania piramidy.

## Akceptacja podstawy i zakres

W tej rozmowie autor wybrał **„Akceptuję położenie i oba zwroty”** dla
C₁=(0,0,5), C₂=(0,0,9), R=2,4, r=0,65, d=4 z regulacją 2–8,
T1: θ+, ψ+, T2: θ−, ψ−. Akceptacja 2026-10-06 pozwoliła rozwinąć efekty.
Nie rozszerza się na dawny wybór A/B, α, q ani odbiór wyglądu etapu 11.
Poniższy opis etapu 10 zachowano jako historię; jego wpisy o braku akceptacji
położenia/zwrotów zostały zastąpione tą decyzją.

Sprawdzono instrukcje README/README_PL, AUTHORSHIP, PLAN, STATUS,
plan-podwojnego-wiru i implementację/testy etapu 10. Nie znaleziono AGENTS.md.
Repo: `android-offline`, gałąź `feature/android-offline`, HEAD
`f8ed12762abf0612213d7d48ce44b9ce2c1c1075`. Zastane zmiany STATUS i nieśledzone
dokumenty oraz podglądy etapów 7–10 zachowano. Nadrzędne repo na `master`
pozostaje osobnym kontekstem. Historyczna zgoda na push w PLAN nie dotyczy
tego zlecenia. Bez stagingu, commitów, push, zmian PR, publikacji i merge.

## Mechanizm i sterowanie

[Podgląd etapu 11](etap-11/podglad.html) korzysta z **tego samego** Vortex,
section, zegara oraz renderera etapu 10, przez opcjonalne rozszerzenie.
Etap 10 działa bez rozszerzenia; nie odtworzono jego geometrii lub kontrolek
w nowym silniku. Dodano pojedyncze pamięci podręczne przekroju, źródła i
geometrii torusów oraz zmianę rozmiaru Canvas tylko po zmianie wymiarów/DPR.
Wspólny zegar ma teraz licznik aktywnych sekund dla kamery i wygładzania.
Nie zmieniono głównej aplikacji React, 13 relacji, tolerancji ani jej sceny.

Cząstki mają stałe tożsamości i deterministyczne przesunięcia faz na trzech
istniejących trajektoriach każdego torusa. T1 ma okrągłe cząstki i ciągłe linie,
T2 kwadratowe cząstki i przerywane linie; numery, znaki i strzałki zachowano.
Pozycje cząstek są obliczane na CPU i rysowane zbiorczo przez Canvas 2D.
Brak nowych bibliotek, shaderów, obliczeń GPU lub solvera płynu.

Dla a=τ+fazowe przesunięcie cząstki, δ=2π(i mod 3)/3, s=±1 i D∈[0,1]:

```text
θ = s(a + 0,18 D sin(3a + δ))
ψ = s(2a + 0,30 D sin(2a + δ)) + δ
p = ((R+r cos ψ)cos θ, (R+r cos ψ)sin θ, C_Z+r sin ψ)
```

D opisujemy jako **siłę deformacji wizualnej**, nigdy miarę turbulencji.
D=0 dokładnie zachowuje regularny ruch etapu 10. Wszystkie ścieżki pozostają
na torusie, zamykają się po 2π i mają ciągłe styczne. Pochodne po a mają
wielkości co najmniej 0,46 dla θ i 1,4 dla ψ, więc zwroty nie odwracają się.
Źródłowe linie i duże znaczniki pozostają regularnym odniesieniem etapu 10;
deformacja dotyczy trajektorii cząstek/smug, nie konstrukcji.

Smugi 0–2 s obiegu to analityczne próbki wcześniejszych faz tej samej,
aktualnie zdeformowanej trajektorii. Nie zapisują historii płynu. Przy zmianie
parametrów lub rozstawu cały ślad przyjmuje bieżące wygładzone ustawienia;
nie stanowi historycznego śladu w przestrzeni. Nie ma zderzeń ani mieszania.
Poświata jest ograniczonym halo o promieniu 4,5 px, maksymalnej alpha 0,07,
bez rozmywania całego Canvas; konstrukcja źródłowa i oznaczenia są nad nią.

Rozstaw, deformacja, smugi, gęstość i poświata płynnie zbliżają się do celu
w aktywnym czasie przez 1−exp(−4Δt). Pauza zamraża stan pośredni także przy
ponownym rysowaniu; ręczna zmiana parametru w pauzie ustawia statyczną klatkę.
Rozstaw cały czas pozostaje w [2,8], szczelina wynosi co najmniej 0,70 u.
Reset wraca do konstrukcji i kamery początkowej, zachowując ustawienia.
Seek pozostaje pauzą i zerowaniem fazy. Ograniczony ruch, pagehide i ukrycie
strony zatrzymują wspólny zegar; nie nadrabia on ukrytego czasu.

- **Pokaz edukacyjny:** 0,5×, gęstość 25%, bez smug i poświaty, wszystkie
  warstwy konstrukcji, oznaczenia i strzałki. Deformacja początkowo 0.
- **Pokaz filmowy:** perspektywa, 1×, gęstość 70%, smugi 0,7 s, poświata
  0,25; piramida, rzeczywiste przekroje, torusy, trajektorie i podpisy widoczne.
  Siatki źródła, płaszczyzny i łączniki początkowo ukryte, można je przywrócić.
  Deformacja początkowo 0, regulowana świadomie.

Kamera filmowa jest uruchamiana osobnym polem. W perspektywie obraca się
płynnie o 0,06 rad/sekundę aktywnego zegara. Pauza ją zatrzymuje. Drag,
kółko, strzałki, +/−, zmiana widoku i reset kamery wyłączają automat.
Nie uruchamia się on ponownie przez zmianę trybu; trzeba świadomie włączyć
pole i odtwarzanie. Na dotyku pionowe przewijanie zachowano (`pan-y`);
poziomy drag obraca kamerę. Fizycznego gestu telefonu jeszcze nie sprawdzono.

## Jakość i rzeczywiste pomiary

| Jakość | Maks. cząstek / torus | Segmenty smug | Limit rysowania | Maks. DPR |
|---|---:|---:|---:|---:|
| Niska | 48 | 4 | 30/s | 1 |
| Średnia | 120 | 8 | 45/s | 1,5 |
| Wysoka | 240 | 12 | 60/s | 2 |

To limity, nie gwarantowane FPS. Przy odświeżaniu 60 Hz limit 45/s może
praktycznie dawać 30/s. Mały viewport lub ≤4 logiczne CPU rozpoczyna od niskiej;
większy viewport i >4 CPU od średniej. Wysoka jest opcjonalna.
30 utrzymujących się przekroczeń 75% budżetu rysowania obniża jakość o poziom.
Powrót wymaga wyboru użytkownika. Bufor ma stałe 240 pozycji i faz,
łącznie **7680 bajtów**, próbek pomiarowych jest najwyżej 120.
Efekty są w głównym widoku; dwa pomocnicze rzuty zachowują referencję etapu 10.

**Pomiar 2026-10-06:** przeglądarka Codex na tym komputerze, DPR=1,
po 30 synchronicznych, nieruchomych redraw dla każdego poziomu; gęstość 100%,
smugi 2 s, deformacja 1, poświata 1. Mierzono CPU wywołań rysowania trzech
Canvas, bez czasu późniejszego compositora/GPU, bez obrotu kamery i bez
wymuszonego GC. Rozgrzewanie/JIT i inne procesy wpływają na wynik.

| Viewport | Jakość | Cząstki łącznie | Mediana CPU [ms] | p95 CPU [ms] |
|---|---|---:|---:|---:|
| 908×1004 | Niska | 96 | 5,2 | 8,5 |
| 908×1004 | Średnia | 240 | 7,9 | 14,4 |
| 908×1004 | Wysoka | 480 | 12,2 | 22,3 |
| 390×844 na komputerze | Niska | 96 | 5,0 | 11,4 |
| 390×844 na komputerze | Średnia | 240 | 6,7 | 10,6 |
| 390×844 na komputerze | Wysoka | 480 | 11,2 | 19,4 |

p95 wysokiej przekracza budżet 16,7 ms dla 60 Hz; dlatego nie jest domyślna.
Nie ekstrapolujemy tych pomiarów na fizyczny telefon ani DPR=2/3.
W początkowym obciążonym pomiarze automat rzeczywiście zszedł z wysokiej do
niskiej (96 cząstek), mediana 22,2 ms i p95 41,0 ms. Po ograniczeniu alokacji
geometrii i zakończeniu równoległych buildów uzyskano tabelę powyżej.

Przy animacji środowisko podglądu dostarczało około 1 klatki/s mimo
`visibilityState=visible`; np. 72 dodatkowe rysowania przez 67,38 s.
To ogranicza sprawdzenie płynności rzeczywistego wyświetlania i czasu pokazu;
nie ogłaszamy 30/60 FPS. Zegar i ciągłość są niezależnie objęte testami.

**Pamięć:** 600 nieruchomych klatek w 20 seriach niskiej jakości/edukacyjnej:
JS heap 28,62–48,98 MiB, pierwsza 44,18, ostatnia 47,16 MiB, okresowe spadki.
Nie zaobserwowano monotonicznego wzrostu; stały bufor potwierdzony w każdej
serii. Nie jest to dowód braku długotrwałego wycieku podczas filmu/kamery.

## Kontrole i granice odbioru

- **9/9 testów etapów 10–11 PASS**, w tym 5 nowych etapu 11. Osobno
  **5/5 regresji etapów 7–9 PASS**: łącznie 14 unikalnych testów podglądów.
  Geometria, niezależne zwroty obu składowych dla D=0/0,25/1, ciągłość/seam,
  stały bufor w 2000 aktualizacjach, adaptacja jakości i ograniczony benchmark.
  Rzeczywiste handlery DOM: parametry w ruchu, pauza także w stanie pośrednim,
  reset, oba tryby, warstwy, kamera ręczna/automatyczna, reduced motion,
  poprawne/błędne cięcia i presety. Zachowane testy lifecycle/visibility.
- **87/87 testów aplikacji PASS, TypeScript PASS**, Node 24.19.0.
  Lokalne buildy web, Android-assets i Pages PASS, wyjścia
  `%TEMP%/pyramid-stage11-{web,android,pages}`. Test/Vite początkowo blokował
  sandbox; uruchomienie poza sandboxem przeszło. Brak skryptu lint.
  Znane ostrzeżenia paczek >500 kB i TEMP/outDir pozostają.
  Bez Capacitor sync, APK/AAB i instalacji. Buildy nie zawierają podglądu docs.
- **Przeglądarka:** 90 kombinacji 320×844, 390×844, 844×390 × oba tryby ×
  trzy rzuty × 0/25/50/75/100%; brak błędów parametrów/przepełnienia.
  Dziewięć warstw/oznaczeń wyłączono i przywrócono. Ruch kamery potwierdzony
  zmianą kąta 0,5235988→0,5535988; po pauzie kąt 0,5595988 pozostał identyczny
  po redraw; strzałka zmieniła kąt i wyłączyła automat. Konsola bez warn/error.
  Zrzuty przejrzano: [edukacyjny 390 px](etap-11/edukacyjny-390.jpg),
  [panel ustawień filmowych](etap-11/panel-filmowy.jpg).
  [Pełny zapis pomiarów i sprawdzeń](etap-11/browser-checks.json).
- **Fizyczny telefon NIEZWERYFIKOWANY:** aktualne `adb devices -l` puste.
  Dotyk, obie orientacje, wysokie DPR, płynność, zużycie pamięci przy długim
  pokazie i schowanie mobilnej przeglądarki wymagają urządzenia.
  Główna aplikacja ma regresje PASS; nie wykonano pełnego nowego manualnego
  odbioru wszystkich jej lekcji/stereo/offline.

## Podgląd i odbiór

Działający lokalny podgląd: **http://127.0.0.1:8088/etap-11/podglad.html**.
Z katalogu aplikacji można uruchomić:

```powershell
python -m http.server 8088 --bind 127.0.0.1 --directory docs
node --test docs/etap-11/particles.test.mjs docs/etap-10/vortex.test.mjs docs/etap-7/animation.test.mjs
```

Jeżeli serwer już działa na 8088, nie uruchamiaj drugiej instancji.
Offline zachowaj katalogi etap-7, etap-10 i etap-11 z HTML/CSS/JS.
[Krótka instrukcja odbioru obu trybów](etap-11/odbior.md).
Efekty wyłączysz odznaczając „Cząstki i smugi”, zatrzymując kamerę i
pozostawiając regularną geometrię; osobny podgląd etapu 10 jest dostępny obok.

**Do oceny autora:** czytelność smug/cząstek/poświaty i ruch kamery w obu
trybach; A/B, α i q pozostają wcześniejszymi otwartymi wyborami.
Położenie torusów i oba zwroty są już zaakceptowane.
**Jeden następny krok:** odbiór obu trybów z autorem na fizycznym telefonie,
z pomiarem płynności i pamięci w dłuższym pokazie według instrukcji.

---

# ETAP 10 — prototyp dwóch przeciwbieżnych wirów toroidalnych

2026-10-06. **Wizualizacja artystyczna przeciwbieżnych wirów toroidalnych**.
Koncepcja: Michał Przybylski — [prylski.dev](https://prylski.dev/),
https://github.com/MichaelZP/.

Inspiracja przepływami Naviera–Stokesa jest artystyczna. Nie rozwiązujemy
tych równań, nie definiujemy pola ciśnienia/lepkiego płynu ani warunków
brzegowych. Obraz nie dowodzi funkcji fizycznej ani historycznej piramidy.
Torusy są osobnymi obiektami prezentacyjnymi, **nie wynikiem matematycznego
przekształcenia powierzchni hiperbolicznej**. Nie ma takiego wyprowadzenia.

## Audyt wejściowy i zakres

Repozytorium aplikacji: `android-offline`, gałąź `feature/android-offline`,
HEAD `f8ed12762abf0612213d7d48ce44b9ce2c1c1075`. Zastano zmieniony
`docs/STATUS.md` i nieśledzone `docs/etap-7/`, `plan-stozka.md`,
`animacja-stozka.md`, `odbior-etapu-9.md`. Zachowano tę pracę. Nadrzędne
repozytorium jest na `master` i ma własne zastane nieśledzone pliki.
Nie znaleziono AGENTS.md w projekcie ani sprawdzonych przodkach.
Historyczne uprawnienia w PLAN.md nie rozszerzają bieżącego zlecenia.

Odczytano instrukcje README/README_PL, AUTHORSHIP, PLAN, STATUS,
plan-stozka, animacja-stozka, odbior-etapu-9 i dokumenty techniczne projektu.
Starszy audyt wejściowy etapu 9 wskazywał statyczne odbicie oraz brak
oznaczeń i selektora drugiego układu. Aktualny kod usuwa te braki:
`p₂(t)=RΣ(p₁(t))`, Σ: Z=7, wspólny zegar, oba komplety geometrii i podpisów,
pierwszy/drugi/oba. Przed implementacją ponownie przeszło 5/5 testów
etapu 9. Podstawa do lokalnego prototypu jest gotowa; fizyczny odbiór
telefonu nadal nie jest zamknięty. A/B i α są decyzjami autora.

Etap 10 działa w osobnym `docs/etap-10/podglad.html`. Pokazuje **końcową
klatkę etapu 9** jako nieruchomą konstrukcję odniesienia. Nie odtwarza
ponownie drogi Golden Egg do osi. Zachowany podgląd etapu 9 jest dostępny
przez link. Główna aplikacja, silnik i jej scena nie są zmienione.
Wspólny `docs/etap-7/section.js` zawiera wyodrębnioną bez zmian funkcję
rzeczywistego przekroju; oba podglądy używają tego samego obrysu.

## Położenie i wymiary — wariant roboczy do oceny autora

Układ świata: X,Y poziomo, Z pionowo; podstawa w Z=0, V=(0,0,7).
Piramida zawsze B=11, h=7. Jednostka u jest jednostką tego modelu,
nie ustalonym wymiarem fizycznego urządzenia.

| Parametr | T1, pierwszy układ | T2, odbicie |
|---|---|---|
| Środek | C₁=(0,0,7−d/2) | C₂=(0,0,7+d/2) |
| Domyślny środek, d=4 | (0,0,5) | (0,0,9) |
| Promień główny, od osi Z do kołowego rdzenia | R₁=2,4 u | R₂=2,4 u |
| Promień kołowego przekroju | r₁=0,65 u | r₂=0,65 u |
| Poziomy zakres promieni | R−r=1,75 do R+r=3,05 u | taki sam |
| Domyślny zakres wysokości | 4,35–5,65 u | 8,35–9,65 u |

Suwak d ∈ [2;8] u reguluje **odległość środków**, symetrycznie względem
Z=7; nie przemieszcza żadnego punktu powierzchni ani piramidy. Szczelina
osiowa między bryłami to d−2r, domyślnie 2,70 u, minimum 0,70 u.
R>r, a d>2r w całym zakresie, więc torusy pozostają rozłączne.
Promienie są jawnie ustalone i nie wynikają z L/W ani równania zr=k.
Ostateczne środki, promienie, rozstaw i zwroty wymagają oceny autora.

Powiązanie wizualne: T1 ma turkusową linię ciągłą, T2 pomarańczową linię
przerywaną, zgodnie z numerami dwóch źródłowych układów. Cienki łącznik
przerywany biegnie z punktu rzeczywistego owalu do punktu torusa. To
umowna relacja prezentacyjna; nie oznacza styczności, transportu ani
deformacji owalu. Łączniki można ukryć. Zmiana d aktualizuje tylko ich
torusowe końce. A/B, q i cięcie aktualizują końce po stronie owalu.

Źródło używa k=1, z₀=7,65, domyślnie α=β=atan(14/11), roboczego A i
q=0,4 dla czytelności. To odrębny preset podglądu, nie zatwierdzenie A
ani zmiana domyślnego q=0,08 w etapie 9. Wszystkie cztery presety,
własne α/z₀, A/B i q∈[0,005;2] są dostępne. Powierzchnie i płaszczyzny
to skończone otwarte wycinki; rzeczywisty owal nie jest elipsą.
L/W dla α=β nadal ma błąd 0,105620285% i nie mieści się w 0,1%.
Stały kadr może obcinać rozbudowany wycinek przy własnych parametrach.

## Dwa rodzaje ruchu i zamknięte trajektorie

Niech θ będzie kątem obiegu wokół Z, a ψ kątem w lokalnym przekroju,
w płaszczyźnie (kierunek promieniowy od Z, pionowy Z), liczonym od
zewnętrznego kierunku promieniowego w stronę +Z. Wspólna konwencja
światowa obowiązuje także T2; nie zmieniamy jej przez odbicie osi z′.

```text
pᵢ(θ,ψ) = ((R+r cos ψ)cos θ, (R+r cos ψ)sin θ, Cᵢ,Z+r sin ψ)
s₁=+1, s₂=−1
θᵢ(τ)=sᵢτ, ψᵢ,j(τ)=2sᵢτ+2πj/3, j=0,1,2
```

Każdy torus ma **3 trajektorie i 3 znaczniki**, łącznie 6 znaczników.
Trajektoria zamyka się po τ=2π: θ wykonuje jeden obieg, ψ dwa. Pozycja
i styczna są ciągłe także przy przejściu fazy z 2π do 0. Ruch nie oznacza
obrotu całej bryły; torus i konstrukcja są nieruchome, przemieszczają się
znaczniki. Przy bazowej prędkości pełny obieg θ trwa 8 s, ψ 4 s.
Suwak prędkości m∈[0,25;3] zmienia oba obiegi w tym samym stosunku.

| Torus | θ wokół osi piramidy | ψ wokół lokalnego kołowego rdzenia |
|---|---|---|
| T1 | θ+, patrząc z +Z: ↺, przeciwnie do zegara | ψ+, przy θ=0 z zewnętrznego punktu ku +Z |
| T2 | θ−, patrząc z +Z: ↻, zgodnie z zegarem | ψ−, przy θ=0 z zewnętrznego punktu ku −Z |

To jawnie wybrana para przeciwnych zwrotów; nie wynika automatycznie
z odbicia hiperboli. Oddzielne pętle i strzałki θ/ψ pokazują składowe
ruchu. Z góry strzałki θ są na ψ=0 dla T1 i ψ=π dla T2, więc rzut
zewnętrznego i wewnętrznego okręgu rozdziela oznaczenia. Kierunek ψ
widać najlepiej z boku przy θ=0. Czytelność wspierają podpisy T1/T2,
znaki +/− i ciągłość/przerywanie linii; kolor nie jest jedyną informacją.
Oba torusy nakładają się w rzucie z góry; selektor pozwala oglądać każdy
oddzielnie bez przesuwania obiektów na potrzeby obrazu.

## Sterowane przejście

Postęp p∈[0;1]. E(x)=3x²−2x³ dla x ograniczonego do [0;1].

| Zakres postępu | Obraz |
|---|---|
| 0–25% | Konstrukcja obu układów i rzeczywiste przekroje; torusy ukryte |
| 25–65% | Stopniowe odsłonięcie torusów: opacity=E((p−0,25)/0,4) |
| 45–75% | Stopniowe odsłonięcie trajektorii i nieruchomych znaczników: E((p−0,45)/0,3) |
| 75–100% | Łagodny start obiegu: dτ/dt=(2π/8)mE((p−0,75)/0,25) |
| 100% | Pełna prędkość obiegu; trwa do pauzy |

Pokaz dochodzi do 100% w 12 s aktywnego czasu; prędkość m dotyczy
obiegu, nie odsłaniania. Jeden anulowalny requestAnimationFrame steruje
postępem i fazą wszystkich znaczników. Krok czasu ograniczono do 0,1 s;
przy silnym spowolnieniu pokaz trwa dłużej zamiast skakać. Faza jest
całkowana trapezowo w kroku. Nie ma pola prędkości ani integracji płynu.
Powierzchnie, przekroje i torusy nie deformują się podczas odsłaniania.
Bez zderzenia, mieszania, burzliwych zmian, smug i tysięcy cząstek.

Odtwórz wznawia z aktualnej klatki, Pauza zachowuje p i τ; po 100% nie
wraca samoczynnie do początku. Reset daje p=0 i τ=0, zachowując wybrane
parametry. Ręczny suwak oraz „Pokaż obiegi” zatrzymują i zerują fazę,
aby statyczna klatka była odtwarzalna. Zmiana d lub źródła zatrzymuje
ruch, zachowując fazę i postęp. Kamera, selektor i warstwy nie resetują
zegara. Prędkość można zmieniać podczas ruchu.

Ograniczony ruch inicjuje się z prefers-reduced-motion, blokuje Odtwórz
i pozostawia ręczne klatki; użytkownik może świadomie go wyłączyć.
Włączenie preferencji systemowej, ukrycie strony lub pagehide zatrzymuje
animację bez nadrobienia ukrytego czasu. Błędne parametry czyszczą trzy
canvasy, pokazują błąd i blokują odtwarzanie do poprawienia wartości.

Warstwy: piramida, powierzchnie, płaszczyzny cięcia, rzeczywiste przekroje,
torusy, trajektorie/znaczniki i schematyczne łączniki. Główny widok:
rzut XZ z boku, XY z góry lub kamera perspektywiczna. Dwa dodatkowe
rzuty kontrolne XZ/XY są stale dostępne. Kamera jest stała, piramida
nie jest skalowana w odpowiedzi na parametry. Canvas 2D wykonuje
projekcję geometrii 3D; nie dodano bibliotek ani kosztownych efektów.

## Weryfikacja i podgląd

9/9 testów podglądów etapów 9–10: ciągłość pozycji i stycznej, równanie
torusa, zwroty obu składowych, rozłączność dla d=2/4/8, zachowanie zr=1
i cięcia dla wszystkich czterech kątów, A/B i q=0,005/0,4/2; aktualny
renderer, warstwy, selektor, stała piramida i przekroje. Testy prawdziwych
handlerów obejmują zegar, 12 s przejścia, obieg po 100%, prędkość, pauzę,
reset, seek, zmianę d, ograniczony ruch, schowanie strony i błędne dane.
87/87 testów aplikacji, TypeScript i lokalne web/Android-assets/Pages
buildy PASS. Te buildy nie zawierają osobnego prototypu z docs.

W przeglądarce: 45 kombinacji 320×844 / 390×844 / 844×390,
trzy rzuty i 0/25/50/75/100%; bez błędów parametrów i poziomego
przepełnienia. Sprawdzono sterowanie, warstwy, zakres d, prędkość,
cztery presety, A/B, błędne parametry i powrót do poprawnego źródła.
Zrzuty i zapis kontroli w `etap-10/`; szczegóły i granice w STATUS.md.
**Fizyczny telefon NIEZWERYFIKOWANY:** `adb devices -l` bez urządzeń.
Nie stwierdzamy fizycznej płynności, dotyku ani odbioru telefonu.

Z katalogu aplikacji, Node ≥22:

```powershell
python -m http.server 8088 --bind 127.0.0.1 --directory docs
node --test docs/etap-10/vortex.test.mjs docs/etap-7/animation.test.mjs
```

Adres: **http://127.0.0.1:8088/etap-10/podglad.html**.
Etap 9: **http://127.0.0.1:8088/etap-7/podglad.html**.
Offline zachowaj oba katalogi z HTML/CSS/JS. Do telefonu przez USB:
`adb reverse tcp:8088 tcp:8088`, następnie adres podglądu w przeglądarce
telefonu. W tej sesji nie wykonano reverse, bo nie było urządzenia.
Fizyczny odbiór powinien sprawdzić dotykowe suwaki, orientacje, zwroty,
warstwy, pauzę/reset, ograniczony ruch i schowanie przeglądarki.

Decyzje otwarte: autor ocenia środki/R/r/d, konwencję obu zwrotów,
robocze q=0,4 i powiązanie źródła; A/B i α nie zostały zatwierdzone.
**Jeden następny krok:** przeprowadzić z autorem odbiór tego prototypu
na fizycznym telefonie i zapisać jego wybór położenia oraz zwrotów.
Bez integracji głównej aplikacji, commitów, push, publikacji i merge.
