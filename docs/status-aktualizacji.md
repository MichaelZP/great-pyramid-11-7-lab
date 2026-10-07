> Aktualny odbiór z 2026-10-06: [STATUS.md](STATUS.md),
> [raport kontroli](REVIEW-13.md), [instrukcja odbioru](MANUAL_ACCEPTANCE.md).
> Poniższe wpisy zachowują historię wcześniejszych etapów.

# Status aktualizacji projektu

## Aktualny etap: historia, źródła i tutorial, 2026-10-05

**Zrealizowano lokalnie zakres tej aktualizacji, bez publikacji.** Wszystkie
13 pozycji mają krótkie informacje PL/EN z osobnymi polami „Pojęcie”, „Nazwa”
i „Symbol”. Każda ma źródła z opisem ich zakresu oraz osobno matematykę/model,
interpretację piramidy i granicę dowodu historycznego. Nie przypisano budowniczym
intencji na podstawie dopasowania liczb. Brak ustalonego świadectwa nie jest
przedstawiany jako dowód niemożliwości takiej intencji.

- Bibliografia liczy 15 pozycji: teksty Euklidesa w przekładzie, badanie
  Archimedesa, tabliczka YBC 7289, artykuł Feinberga, MacTutor, OEIS,
  Petrie i British Museum. Lange jest źródłem własnej współczesnej propozycji,
  z jawnym ograniczeniem jej twierdzeń fizycznych i historycznych.
- Zweryfikowano skan Petriego: linkowany PDF to reprint 1990 drugiego wydania
  z 1885, nie pełne pierwsze wydanie 1883. Odniesienie do proporcji jest na
  s. 93 (PDF 106); opis źródła odzwierciedla faktyczny skan.
- Źródła są dostępne przy pozycji i w pełnej bibliografii aplikacji.
  Lokalne notatki działają offline; otwarcie pełnego tekstu wymaga internetu.
  Nie dodano automatycznego pobierania ani zewnętrznych zasobów przy starcie.
- [Historia i bibliografia PL](historia-13-pozycji.md) oraz
  [wersja EN](HISTORY-13.md) są generowane z tego samego rejestru co aplikacja.
  Generator: `node docs/history-13/generate.mjs`, Node ≥22.
- Dziewięć kroków tutorialu obejmuje wszystkie 13 pozycji: kwadrat, parametr
  kształtu, π, rodziny γ/√3/√6 i φ/1/φ/√5, T/Brun, kąty e/e−1, osobny owal
  oraz rozróżnienie wyniku i dowodu. Podświetlenia korzystają z istniejącej 3D.
- Tutorial nie uruchamia się sam. Można go pominąć/zamknąć, zatrzymać,
  wznowić, cofnąć, zrestartować lub wybrać dowolny krok. Zapisuje lokalnie
  miejsce i przywraca je po odświeżeniu. Powrót przewija panel do tutorialu.
  Automat ma okres 18 s; koniec, ukrycie strony i ręczna zmiana zatrzymują go.
  Ograniczony ruch wymusza tryb ręczny. Sterowanie jest też na scenie.
- Zmieniono opisy rankingu: „ważony” zamiast „niezależny”, preferencja 11/7
  zamiast ogólnej prostoty ułamka; wynik nie jest prawdopodobieństwem intencji.
  Poprawiono opisy π i jednostek e oraz opis ilustracyjnego zwykłego jaja.
  Formuły, cele, progi, wagi i źródłowe XLSX pozostały bez zmian.
- Podczas kontroli poprawiono zachowanie zapisanego języka przy starcie oraz
  obsługę odrzuconych obietnic pełnego ekranu; wyjście następuje tylko, gdy
  pełny ekran rzeczywiście jest aktywny.

### Weryfikacja i ograniczenia

- **79/79 testów**: 65 dotychczasowych plus 14 pokrycia treści i tutorialu.
  Kontrola wszystkich ID, dwóch języków, źródeł, długości tekstów, pokrycia
  rodzin, uszkodzonych zapisanych indeksów oraz pauzy, pominięcia, skoków,
  wznowienia i końca. `tsc --noEmit` oraz `git diff --check` bez błędów.
- Lokalne buildy WWW (`dist/`), zasobów Androida
  (`%TEMP%\pyramid-history-android-check`) i Pages
  (`%TEMP%\pyramid-history-pages-check`) przechodzą. Potwierdzono odpowiednio
  `/`, `./` i `/great-pyramid-11-7-lab/` dla ścieżek zasobów.
  Esbuild był blokowany przez sandbox; testy/buildy powtórzono za zgodą poza nim.
- Przeglądarka: historia i linki wszystkich 13 pozycji w PL/EN, pełna
  bibliografia (15 linków), wszystkie dziewięć kroków, arbitralne skoki,
  pominięcie i ponowne otwarcie po odświeżeniu. Zachowane miejsce i język.
  Oględziny komputera oraz telefonów 320×740 i 390×844; dla 320 px szerokość
  dokumentu wynosi 320 px. Panel się przewija, źródła rozwija się na żądanie.
  Po poprawce powrotu przewija się wyłącznie panel: strona i scena zachowują
  pozycję 0 na komputerze i przy 320 px. Sprawdzono wejście/wyjście z pełnego
  ekranu oraz następny krok w nim; w końcowej sesji brak nowych błędów konsoli.
- Zrzuty: [tutorial 320 px](preview-history/tutorial-320.jpg),
  [historia 390 px](preview-history/history-390.jpg),
  [tutorial na komputerze](preview-history/tutorial-desktop.jpg).
- Przeglądarka wymusza ograniczony ruch: przebieg automatu i zatrzymanie
  sprawdzono na stanie, bez twierdzenia o oględzinach przebiegu czasowego.
  Fizyczny Android, dotyk i tryb offline na urządzeniu pozostają osobną
  walidacją. Build zasobów WWW nie jest APK ani dowodem działania na telefonie.
- Pozostają wcześniejsze ograniczenia audytu: RMS, ścisły błąd oszacowania
  Bruna, globalna unikalność kąta owalu, empiryczne uzasadnienie kąta/wag,
  historyczna funkcja i intencje oraz przegląd optyki. Ostrzeżenie buildów
  o chunkach >500 kB pozostaje. Nie rozszerzano aktualizacji o te obliczenia.

**Bez commit, push, deploy, publikacji, Capacitor sync, APK/AAB i instalacji.**
Wcześniejsze niezatwierdzone zmiany, dokumenty audytu i dowody zachowano.

## Poprzedni etap: wszystkie 13 wizualizacji, 2026-10-05

Dodano pozostałe 12 pozycji. **Każda z 13 pozycji ma wybór z panelu,
oznaczenia 3D, wzór, wynik, cel, błąd i cztery kroki wyjaśnienia.**
Obsługiwane są π, γ, √3, √6, √2, √5, T, Brun, 1/φ, φ, e, e−1 i L/W.

- Długości: rzeczywiste odcinki A=OM, H=OV, S=MV, B=NC, D=KC, E=CV.
  Sumy pokazują osobne łańcuchy kopii we wspólnej skali i paski w panelu.
- Kąty: łuki θ i β w przekroju VOM; β=90°−θ. Paski porównują miary kątów,
  nie długości łuków. Dla e−1 odjęcie jedynki jest jawne.
- Owal: zamknięty przekrój zr=1 płaszczyzną z=Z₀+x tan θ, Z₀=7,65,
  z długością PQ i rzeczywistym maksimum szerokości. Scena zachowuje
  proporcje przez jednolite powiększenie. Nie zastąpiono owalu elipsą.
- Pauza, wznowienie, ręczne kroki, restart i powrót działają wspólnie dla
  wszystkich pozycji. Automat kończy na kroku 4 i zatrzymuje się po ukryciu
  strony. Zmiana pozycji/modelu resetuje kroki. Ograniczony ruch daje tryb ręczny.
- Zachowano zastrzeżenia audytu: zależności wzorów, oszacowanie Bruna,
  dokładną tożsamość D/B=√2 oraz błąd L/W dla 11:7 wynoszący 0,105620285%.

### Jak obejrzeć całość

Podgląd lokalny: **http://127.0.0.1:8080/**, tylko na tym komputerze.
Wybierz **Stałe → Pozycja matematyczna** i dowolną z 13 pozycji.
„Wyjaśnij” na scenie lub „Uruchom wyjaśnienie” w panelu rozpoczyna kroki.
„Zatrzymaj” wstrzymuje automat, „Wznów” kontynuuje, a „Wróć do piramidy”
przywraca zwykłą scenę i kamerę. Przy ograniczonym ruchu użyj „Następny”.
Panel można przewijać; pełny ekran pozwala powiększyć konstrukcję na telefonie.

Polecenie ponownego uruchomienia serwera podano w historycznym opisie wzorca
poniżej. Konstrukcje i mechanizm opisuje [kontrakt](RELATION-VISUALIZATION.md).
Zrzuty bieżącego podglądu: [komputer](preview-relations/tribonacci-desktop.jpg)
i [telefon 320 px](preview-relations/tribonacci-320.jpg).

### Sprawdzenia i pozostała praca

- **65/65 testów** (25 istniejących i 40 wizualizacji): kompletność 13 pozycji,
  długości sześciu odcinków, porównania w kilku modelach i skalach, sumy,
  kąty, niezależne wartości i ograniczenia owalu oraz cykl pauzy/wznowienia
  i zakończenia każdej lekcji.
- `tsc --noEmit` bez błędów. Lokalne buildy WWW (`dist/`), zasobów Androida
  (`%TEMP%\pyramid-relations-android-check`) i Pages
  (`%TEMP%\pyramid-relations-pages-check`) zakończone pomyślnie.
- W przeglądarce przejście kroków 1–4 wszystkich 13 lekcji w trybie ręcznym.
  Oględziny scen długości, kątów i owalu oraz widoków telefonu 390×844 i
  320×740. Krótkie przyciski sceny mieszczą się w jednym wierszu przy 320 px.
  Potwierdzono powrót do zwykłej sceny, brak przepełnienia strony i brak
  zarejestrowanych błędów konsoli. `git diff --check` bez błędów.
- Pozostało: oględziny przebiegu czasowego bez systemowego ograniczenia ruchu,
  test dotykowy/offline na fizycznym Androidzie oraz osobne naprawy wcześniejszych
  ustaleń audytu (RMS, stare opisy/punktacja, oszacowanie Bruna i optyka).
  Pauza/wznowienie są sprawdzone testami stanu; przeglądarka używa ograniczonego
  ruchu. Build zasobów WWW nie jest walidacją APK ani fizycznego urządzenia.
- Ostrzeżenia o chunkach >500 kB oraz wcześniejsze ostrzeżenia Three.js/Recharts
  pozostają. Nie zmieniano silnika matematycznego, progów ani źródłowych XLSX.

**Bez commit, push, deploy, publikacji, Capacitor sync, APK/AAB i instalacji.**
Wcześniejsze dokumenty i dowody audytu zachowano. Poniższe sekcje są historią
etapów i nie opisują aktualnej liczby gotowych wizualizacji.

## Historyczny etap: działający wzorzec proporcji φ, 2026-10-05

Zaimplementowano jedną pełną wizualizację: **φ — `S/A`**, zgodną z sekcją
10 audytu. To dobry wzorzec oznaczania odcinków: `A=OM`, `H=OV`, `S=VM`
tworzą rzeczywisty przekrój prostokątny piramidy. Dla 11:7 panel pokazuje
`R=1,618590346797`, cel `φ=1,618033988750` i błąd **0,034384818%**.
Zbliżenia nie przedstawiono jako dokładnej równości ani dowodu intencji.

### Jak obejrzeć rezultat

Podgląd uruchomiono lokalnie: **http://127.0.0.1:8080/**. Jest to serwer
deweloperski Vite dostępny tylko na tym komputerze. Karta podglądu pozostaje
otwarta w aplikacji Codex. Po zakończeniu procesu serwera uruchom go ponownie:

```powershell
Set-Location 'C:\Users\user\Documents\ChatGPT\Piramida\android-offline'
# Wymagany Node >=22. Na tej maszynie użyto bundlowanego Node 24.19.0:
$pyramidNode = 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
& $pyramidNode node_modules\vite\bin\vite.js --host 127.0.0.1 --port 8080
# Alternatywnie przy Node >=22 w PATH: npm run dev -- --host 127.0.0.1
```

1. Na telefonie wybierz zakładkę **Stałe**, na komputerze użyj prawego panelu.
2. Wybierz **φ · Złoty podział · 3D + kroki** albo „Pokaż proporcję φ w 3D”.
3. Obejrzyj oznaczenia `O`, `M`, `V` oraz odcinki `A`, `H`, `S`, wzór,
   wynik, cel, błąd i paski długości we wspólnej skali. Panel można przewijać.
4. „Uruchom wyjaśnienie” zaczyna cztery kroki. Automat zmienia krok co
   4,2 s i kończy na czwartym. „Zatrzymaj” zamraża krok; „Wznów” kontynuuje.
   Są też przyciski „Poprzedni”, „Następny” i „Od początku”.
5. Przy systemowym **ograniczonym ruchu** kroki przechodzą ręcznie. W tej
   konfiguracji przeglądarki właśnie ten tryb był aktywny.
6. „Zwykły widok piramidy” usuwa oznaczenia i przywraca kamerę oraz zwykłą
   scenę. Escape także kończy wizualizację. Powrót Androida obsługuje jej
   zamknięcie w kodzie, lecz nie był sprawdzony na fizycznym urządzeniu.

Zrzuty rzeczywistego podglądu: [komputer](preview-phi/desktop.jpg) i
[telefon](preview-phi/mobile.jpg). To podgląd przeglądarkowy, nie urządzenie Android.

### Zakres gotowy i sprawdzenia

| Sprawdzenie | Wynik |
|---|---|
| Rejestr 13 pozycji, trzy rodzaje scen | komplet; jedna gotowa scena, 12 jawnie oznaczonych jako „3D w przygotowaniu” |
| Wszystkie 13 wzorów/wyników/celów/błędów | selektor i wspólny panel; liczby pochodzą z niezmienionego silnika |
| Geometria i cykl wyjaśnienia | **35/35 testów**, 2 pliki: 25 istniejących + 10 nowych |
| TypeScript | `tsc --noEmit` bez błędów |
| Build WWW | sukces, `dist/` |
| Build zasobów WWW Androida | sukces, `%TEMP%\pyramid-phi-android-check`; potwierdzone ścieżki `./assets/` |
| Build GitHub Pages | sukces, `%TEMP%\pyramid-phi-pages-check`; potwierdzona baza `/great-pyramid-11-7-lab/` |
| Przegląd wizualny | 1280×900, 390×844, 320×740; etykiety i sterowanie czytelne, brak poziomego przepełnienia strony przy 320 i 390 px |
| Interakcje w przeglądarce | wybór φ, kroki 1–4 i zakończenie w trybie ograniczonego ruchu, powrót, zmiana na „Dokładne φ” (błąd 0 po zaokrągleniu), powrót do 11:7, wybór oczekującego L/W |
| Pauza/wznowienie automatu | zweryfikowane testami stanu; automatyczny przebieg czasowy nie był oglądany w tej przeglądarce ze względu na aktywny ograniczony ruch |
| Konsola | brak zarejestrowanych błędów; ostrzeżenia Three.js o przestarzałej mapie cieni i Recharts o zerowym wymiarze ukrytego wykresu |

Buildy ostrzegają o chunkach >500 kB; nie blokuje to budowania. Testy i buildy
uruchomiono bundlowanym Node 24.19.0. Vite/testy wymagały zaakceptowanego
uruchomienia poza sandboxem, który blokował odczyt konfiguracji. Lokalny
serwer jest ograniczony do `127.0.0.1`. Nie instalowano zależności.

### Co pozostało

- Dodać sceny i wyjaśnienia pozostałych 12 pozycji według
  [kontraktu rozszerzania](RELATION-VISUALIZATION.md). Sumy odcinków,
  proporcje kątów i owal wymagają własnych konstrukcji, nie kopii trójkąta φ.
- Obejrzeć czasowy przebieg z pauzą/wznowieniem przy wyłączonym ograniczeniu
  ruchu oraz przeprowadzić test dotykowy i offline na fizycznym Androidzie.
- Osobno rozwiązać pozostałe ustalenia audytu: RMS, stare opisy/punktację,
  oszacowanie Bruna, interpretację i optykę. Ten wzorzec ich nie rozstrzyga.

Zmiany obejmują panel, stan wyboru, kontroler kroków, warstwę sceny, etykiety
lokalnymi teksturami i testy. Silnik, progi, źródłowe XLSX i konfiguracje
buildów zachowano. Wcześniejsze nieśledzone dokumenty i dowody audytu zostały
zachowane. **Nie wykonano commit, push, deploy, publikacji, Capacitor sync,
budowy APK/AAB ani instalacji Androida.**

## Historyczny zapis etapu audytu

Aktualizacja: 2026-10-05. Repozytorium aplikacji: `android-offline`, gałąź
`feature/android-offline`, HEAD `a11489c5b0995ded8f3e06fdd1405598f6bcb2f1`.

## Wykonany etap: audyt matematyczny

Zakończono przegląd wszystkich **13 aktywnych pozycji** z silnika,
zapisując definicje, odcinki i wielkości, wzory, wyprowadzenia, wyniki
11:7, wartości porównawcze, błędy oraz zależności. Raport:
[matematyka-13-stalych.md](matematyka-13-stalych.md).

W tej kopii projektu plan nazywa się [PLAN.md](PLAN.md), a poprzedni
status [STATUS.md](STATUS.md). Pliku `plan-13-stalych.md` nie znaleziono.
Niniejszy plik dodano pod polską nazwą wskazaną w aktualnym zleceniu.
Poprzedni status zachowuje zapis etapu planowania i odsyła do tego audytu.

| Zakres | Stan i dowód |
|---|---|
| Inwentarz i definicje 13 pozycji | zakończone; zgodne z identyfikatorami `CONSTANTS` |
| Geometria 11:7 i błędy | niezależnie przeliczone; **12/13** w 0,1%; √2 dokładne; L/W poza progiem: **0,105620285%** |
| Zależności | udokumentowane, również T i B₂ jako funkcje `S/A`; jeden parametr kształtu piramidy |
| Dwa skoroszyty | odczyt i przeliczenie formuł 12 proporcji i ich błędów dla 11:7 oraz Golden Egg w obu językach; dokładne adresy w raporcie |
| Owal L/W | wyprowadzone końce, wybór zamkniętej składowej, jednoznaczne maksimum szerokości; niezależny solver pochodnej |
| Golden Egg | odtworzony kąt ≈51,795319255897588° i **10/13**; zgodność L/W z φ jest warunkiem definiującym preset |
| Skan | niezależnie przeliczone 241 i 121 punktów; określony wpływ kroku i wykryty błędny `rmsAngle` |
| Wagi i punktacja | porównane formuły i wejścia; różnice 12/13 oraz sposobu oceny ułamka zapisane; brak uzasadnienia empirycznego wag i pasma obserwacji |
| Sprawdzenie skryptem audytu | zakończone bez błędów asercji; Python Decimal 60 cyfr, openpyxl tylko do odczytu, porównanie z silnikiem Node |
| Testy regresji | **25/25**, 1 plik Vitest, Node 24.19.0; po zaakceptowanym powtórzeniu poza sandboxem |

Dowody odtwarzalne: [verify.py](audit-13/verify.py) i
[wyniki.json](audit-13/wyniki.json), w tym formuły komórek, sumy SHA-256
źródłowych XLSX, wyniki, błędy, skany oraz porównanie z silnikiem.
Nie jest to pełna walidacja arkuszy w Excelu ani audyt wszystkich
dodatkowych kandydatów matematycznych w ich bibliotece.

## Ustalenia wymagające późniejszej korekty prezentacji lub implementacji

1. Opis `2B/H` powinien mówić o połowie obwodu, nie pełnym obwodzie.
2. Wzór kątowy dla e jest niezależny od jednostki przy spójnej konwersji.
3. Owal `zr=1` nie jest elipsą; obliczenie L/W nie wymaga całkowania.
4. „13 stałych” należy opisywać jako 13 porównań, obejmujących zależne
   wyniki i dwukrotne użycie φ jako celu. Wagi nie zapewniają niezależności.
5. Bruna `1,902160583104` należy oznaczać jako przyjęte oszacowanie.
6. Arkusze oceniają 12 relacji, silnik 13; ponadto mają różne kryteria
   oceny ułamka. Punktacje nie są zamienne.
7. `11!R27` w obu arkuszach jest stałą współrzędną maksimum szerokości,
   poprawną dla zapisanego presetu; zmiana kąta/Z₀ jej nie przelicza.
8. `scanMinima().rmsAngle` zwraca minimum średniej ważonej, a nie RMS.
   Niezależnie ustalone minimum RMS na obu siatkach to **51,846°**.
9. Zaokrąglony kąt Golden Egg nie daje dokładnego zera błędu L/W;
   określenie „machine precision” wymaga korekty.

Wszystkie powyższe ustalenia zapisano bez zmiany zachowania aplikacji
i bez poprawiania źródłowych skoroszytów.

## Otwarte kwestie i granice zakończenia

- Nie potwierdzono ścisłego przedziału błędu oszacowania Bruna.
- Nie udowodniono globalnej unikalności kąta `L/W=φ` dla całej dziedziny
  przy stałym Z₀. Potwierdzono rozwiązanie i jednoznaczne maksimum
  szerokości; to dwa odrębne zagadnienia.
- Nie ustalono historycznego lub fizycznego uzasadnienia wyboru wzorów,
  powierzchni `zr=1` i parametru Z₀=7,65.
- Obserwacja `51,844° ± 0,02°` pozostaje wejściem projektu bez
  potwierdzonej tu interpretacji statystycznej. Wagi są heurystyką.
- Etap hipotezy funkcji konstrukcji pozostaje otwarty: wymaga dokładnego
  sformułowania autora i osobnych dowodów. Audyt matematyczny go nie zastępuje.

Etap 1 zakończono w sensie kryterium planu: każdy wiersz ma odtwarzalne
wyprowadzenie albo jawnie opisane niepotwierdzone twierdzenie. Nie oznacza
to potwierdzenia wszystkich deklaracji dotychczasowej dokumentacji.

## Zakres zmian i następny krok

Dodano raport, niniejszy status i dwa pliki dowodów w `docs/audit-13`;
uzupełniono `docs/STATUS.md` odsyłaczem do aktualnego etapu. Zachowano
wcześniej istniejące, nieśledzone `AUTHORSHIP.md`, `docs/PLAN.md`
i treść historycznego statusu. Nie zmieniono silnika, UI, konfiguracji
ani XLSX. Nie wykonano commit, push, publikacji, builda, uruchomienia UI
ani instalacji lub walidacji na urządzeniu Android.

Następny etap to specyfikacja korekt wynikających z raportu oraz osobne
rozstrzygnięcie otwartych kwestii. Nie ma podstaw do ogłoszenia 13
niezależnych odkryć ani do zmiany progu w celu uzyskania 13/13 dla 11:7.
