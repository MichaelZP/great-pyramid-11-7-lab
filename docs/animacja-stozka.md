# ETAP 9 — animacja dwóch układów na jednym zegarze

2026-10-06. Aktualizacja istniejącego osobnego [podglądu](etap-7/podglad.html).
Definicje początku i końca z etapu 8 pozostają bez zmian; drugi układ
odbijamy z **bieżącej**, wspólnej klatki. Wybór A/B i α należy do autora.
Michał Przybylski — [prylski.dev](https://prylski.dev/).

Aktualizacja etapu 10: funkcja rzeczywistego przekroju została przeniesiona
bez zmiany równań z inline HTML do `etap-7/section.js`, wspólnego dla obu
podglądów. Lokalny etap 9 wymaga teraz HTML, animation.js i section.js.
Jego renderer i zegar pozostają bez zmian; regresja 5/5 PASS.
[Osobny prototyp wirów](plan-podwojnego-wiru.md) nie deformuje tej konstrukcji.

```text
A(t)=(1−e)P_start+e[V+q(P_end−V)], e=3t²−2t³
σ(t)=(1−e)s_start+e(qs_end) > 0
p₁(t)=A(t)+σ(t)(p_local−Q)
p₂(t)=RΣ(p₁(t))=(X₁(t),Y₁(t),14−Z₁(t)), Σ: Z=7
A′(t)=RΣ(A(t))
Π₂(t): Z=14−A_Z(t)−(X−A_X(t))tan α
[14−Z−A_Z(t)+σ(t)z₀]·hypot(X−A_X(t),Y−A_Y(t))=σ(t)²k
```

Drugi układ nie ma osobnego postępu, pozycji końcowej ani generatora
kształtu. `Stage8.transform(..., mirrored=true)` wykonuje te same operacje
co pierwszy i dopiero potem odbicie. `inverse(..., true)` najpierw
odwraca odbicie; nazwa `Stage8` zachowuje istniejące API podglądu.
To odbicie o wyznaczniku −1, a nie obrót. L′(t)=L(t), W′(t)=W(t),
L′/W′=L/W, k′(t)=σ²k. Dodatni kierunek lokalnego z′ biegnie w dół
świata, a szeroka część jest powyżej odbitego lokalnego zera.

Wspólna klatka ustala także identyczny z_min obu siatek. Pomocnicze
wycinki asymptot, osie i meridiany kontynuacji mają identyczne lokalne
próbki i jeden `guideScale=s_start`, niezależny od t/q. Cała ich geometria
skaluje się przez σ(t) i odbija, bez osobnych skal pomocy drugiego układu.
Strzałki kontynuacji nadal leżą na zr=1 przed transformacją. Punkty
0H/0H′, x/y/z i x′/y′/z′ są pokazane w trybie nieskończonej powierzchni.
L/W, Q(t)/Q′(t), Π(t)/Π′(t) mają odpowiadające sobie pozycje w świecie.
Rozmiar tekstu i dobór odsunięcia przy kolizjach są ekranowe; nie są
lustrzanym odbiciem glifów ani przekształceniem geometrii.

Pierwszy pełny start Q=(16,775;0;28,35), 0H na Z=−7,865;
odbity start Q′=(16,775;0;−14,35), 0H′ na Z=21,865.
Wspólna oś obu powierzchni porusza się z X=A_X(t), Y=0; dopiero
na końcu trafia na oś piramidy. Piramida B=11, h=7 i apotemy są stałe.
Pokazano również odbite przedłużenie apotemy. Kadr „Całe przejście”
ma środek (8,4;0;7) i dotychczasowy zakres 38×52, aby obejmował obie
pozycje startowe. Kamera nie dopasowuje się do t, q ani selektora układów;
kadr etapu 7 i jego skala ekranowa pozostają bez zmian.

Selektor **Pierwszy / Drugi / Oba** zastępuje checkbox statycznego
odbicia. Przełącza widoczność geometrii i jej podpisów bez zmiany klatki
lub zegara. Warstwy obejmują wybrane układy; piramida pozostaje widoczna.
Σ jest widoczna przy drugim układzie. Dotychczasowy suwak, play/pauza,
reset, koniec, prędkości i jedna anulowalna pętla RAF sterują oboma.
Seek zatrzymuje odtwarzanie; ukrycie strony/pagehide i ograniczony ruch
również je zatrzymują. Niepoprawne parametry czyszczą oba canvasy.

Na końcu A, α=β cięcia zawierają VM−/VM+; w B są tylko równoległe.
Przy złotym α powiązanie kątowe jest przybliżone. Podczas ruchu nie
deklarujemy ścisłego zawierania ścian. Przy α=β L/W nadal jest poza 0,1%
(błąd 0,105620285%); złoty dobór definiuje L/W≈φ. Osobny panel elipsy
Huntleya i wspólna skala 2/W nie podlegają selektorowi sceny ani ruchowi.

**Weryfikacja:** 5/5 testów podglądu; 480 konfiguracji matematycznych
obu układów i 480 konfiguracji renderera, każda przy 0/25/50/75/100%;
kontrole DOM, warstwy, zegar i widoczność. 87/87 testów aplikacji,
TypeScript i lokalne web/Android-assets/Pages buildy PASS. Przeglądarka
320/390 px, warianty, sterowanie, obie kamery i warstwy PASS; brak
poziomego przepełnienia strony i błędów konsoli. Szczegółowy zapis
i zrzuty: [STATUS.md](STATUS.md). **Telefon NIEZWERYFIKOWANY** —
`adb devices -l` bez urządzeń. [Instrukcja odbioru etapu 9](odbior-etapu-9.md).

Uruchomienie i test z katalogu aplikacji (Node ≥22):

```powershell
python -m http.server 8087 --bind 127.0.0.1 --directory docs/etap-7
node --test docs/etap-7/animation.test.mjs
```

Adres: **http://127.0.0.1:8087/podglad.html**. HTML z sąsiadującym
animation.js działa także lokalnie offline. Skrypt ma wersjonowane
odwołanie `?v=9`, aby istniejący podgląd odświeżył wcześniejszy cache.
Bez integracji aplikacji, efektów kolejnych etapów i operacji zdalnych.
Zastane pliki i zmiany zachowano. Bez commitów, push, PR, publikacji i merge.

---

# ETAP 8 — zapis historyczny: od położenia Golden Egg do osi piramidy

Poniższy opis dotyczy stanu przed etapem 9. Wzory pierwszego układu
pozostają aktualne; statyczne odbicie i środek kadru Z=14 zostały zastąpione
wyżej opisanym odbiciem klatki i środkiem Z=7.

2026-10-06. Zaimplementowano animację w istniejącym osobnym
[podglądzie etapu 7](etap-7/podglad.html). Scena głównej aplikacji nie została
zmieniona. Michał Przybylski — [prylski.dev](https://prylski.dev/),
https://github.com/MichaelZP/.

## Decyzja autora i geometria początkowa

Po audycie braków autor wskazał: **„startowe miejsce tak jak w widoku
modelu golden egg”**. Odczytano `GoldenEggConstruct` w
src/components/scene/PyramidCanvas.tsx: powierzchnia ma pionową oś,
odsunięcie zc=−3,05, lokalne zero wysokości y=−1,43, a cięcie jest
powiązane z przedłużeniem apotemy. Nie pochylamy osi w kierunku apotemy.

Przeniesienie położenia do układu etapu 7 jest jawne. Scena aplikacji ma
bok podstawy 2 i pionowe Y; podgląd ma bok 11 i pionowe Z.
Mapa współrzędnych sceny to (X_s,Y_s,Z_s) → (−5,5Z_s,−5,5X_s,5,5Y_s).
Wysokość referencyjną ustalamy na H_s=14/11, aby **piramida zachowała
B=11 i h=7**, także przy wyborze złotego cięcia.

```text
V=(0,0,7), Q=(0,0,z₀), M−=(−5,5;0;0)
P_start=(3,05·5,5; 0; (14/11)·4,05·5,5)=(16,775;0;28,35)
Z_zero_start=−1,43·5,5=−7,865
s_start=(28,35+7,865)/z₀
```

P_start jest przecięciem przesuniętej pionowej osi z przedłużeniem
VM−. s_start ustawia lokalne z=0 na poziomie przeniesionym z Golden Egg.
**To przeniesienie położenia osi i lokalnego zera, nie kopia ilustracyjnego
jaja.** GoldenEggConstruct używa innych k i z₀. Rzeczywisty przekrój i
proporcje pozostają dokładnie z etapu 7; nie wolno przekształcać jego
kształtu w inny owal przez niezależne rozciąganie osi.

Przy α=β początkowa płaszczyzna zawiera prostą VM−. Przy złotym doborze
α różnica względem β jest zachowana i powiązanie pozostaje przybliżone.
Złota elipsa Huntleya jest osobnym wzorcem we własnym panelu.

## Koniec i zachowane skalowanie

Robocze A: P_end=(0,0,7), L_doc=7. Porównawcze B:
P_end=(0,0,3,5), L_doc=3,5. Bazowa skala s_end=L_doc/L.
Warianty cięcia, własne α/z₀, trzy zakresy powierzchni, rzut pionowy/3D
i obrót widoku pozostają dostępne.

Zachowano dodatkowy suwak q∈[0,005;2] i domyślne q=0,08. **q określa
wyłącznie skalowanie pozycji końcowej względem V; pełny początek jest
niezależny od q.** Korekta po przekazaniu przez autora zrzutu Golden Egg:
wcześniejsze objęcie początku mnożnikiem q zbliżało go do V i nie
odpowiadało wskazanemu położeniu. Teraz dla każdego q początek Q pozostaje
(16,775;0;28,35), a jego lokalne zero jest na Z=−7,865. Na końcu A długość
wynosi 0,56 przy q=0,08; w B 0,28 — dokładnie jak w etapie 7.

Piramida i jej apotemy nie podlegają transformacji. Dwa kadry są stałe
podczas ruchu i zmian q: domyślny „Całe przejście” pokazuje odsunięty start
i przedłużenie apotemy (powierzchnia po lewej, piramida po prawej jak na
zrzucie autora), a „Kadr etapu 7” zachowuje dotychczasową projekcję i skalę
ekranową piramidy, z V na środku. Szerszy kadr ma środek (8,4;0;14),
zakres kadrowania 38×52 i azymut kamery o 180° względem kadru etapu 7.
To obrót widoku, nie konstrukcji. Powierzchnia nieskończona może wychodzić
poza oba kadry. W kadrze etapu 7 pełny start jest poza obrazem; zmiana q
nie przesuwa początku — należy wybrać kadr całego przejścia.

## Oddzielne operacje i ich kolejność

Postęp t∈[0;1]. Łagodne rozpoczęcie i zakończenie daje e=3t²−2t³.
Przesunięcie biegnie po odcinku pomiędzy zakotwiczeniami, z tą samą
funkcją czasu co skala. Obrót jest jawnie **R(t)=I**, ponieważ obie osie
są pionowe i mają zgodny azymut cięcia.

```text
P_end,q=V+q(P_end−V)
A(t)=(1−e)P_start+eP_end,q
σ(t)=(1−e)s_start+e(qs_end) > 0
p_world(t)=A(t)+σ(t)(p_local−Q)
```

1. Odjąć Q od lokalnego punktu.
2. Wykonać obrót względem Q: R(t)=I.
3. Jednolicie skalować względem Q przez σ(t).
4. Przesunąć Q do A(t). Punkt końcowy i skala końca zawierają już q;
   nie nakładać q ponownie na całą klatkę ani na początek.

Powierzchnia, płaszczyzna, rzeczywisty przekrój, długość i szerokość,
lokalne osie, lokalna asymptota i pozycje podpisów korzystają z tej samej
funkcji transformacji. Podpisy mają stały rozmiar ekranowy i odsunięcia
z liniami wskazującymi, aby ograniczyć nakładanie przy małej skali.
Pomocnicze strzałki kontynuacji leżą na powierzchni. Siatka nieskończonej
powierzchni ma skończony zakres próbkowania i nie tworzy końcowego dysku.

```text
L(t)=σ(t)L, W(t)=σ(t)W, z₀(t)=σ(t)z₀
k(t)=σ(t)²k, k=1
Π(t): Z=A_Z(t)+(X−A_X(t))tan α
[Z−A_Z(t)+σ(t)z₀]·√[(X−A_X(t))²+(Y−A_Y(t))²]=σ(t)²k
```

Kąt cięcia do osi to 90°−α; α jest kątem do lokalnego poziomu.
Oba kąty i L/W są stałe. Generujemy punkty z lokalnego zr=1 i skalujemy
gotową geometrię, dlatego **nie podstawiamy ponownie σ²k do generatora**.
k(t) jest raportowanym parametrem równania po transformacji. Przy
ponownym generowaniu już w jednostkach świata należałoby użyć σ²k
i pominąć kolejne skalowanie tych samych punktów.

## Sterowanie, dostępność i odbicie

Suwak 0–100%, odtwarzanie/pauza, reset do początku, skok do końca,
prędkość 0,5×/1×/2×/4×; podstawowy czas to 8 s. Ręczne przesunięcie
suwaka zatrzymuje ruch. Odtwarzanie po końcu zaczyna nowy cykl od zera.
Jedna anulowalna pętla requestAnimationFrame; pauza zachowuje postęp.
Zmiana wariantu lub presetu zatrzymuje ruch i wraca do początku; zmiana
własnych parametrów lub q zatrzymuje ruch. Ukrycie strony i pagehide
anulują odtwarzanie. Niepoprawne parametry czyszczą obraz i zatrzymują ruch.

Warstwy: powierzchnia, płaszczyzna, przekrój, linie konstrukcyjne,
oznaczenia; dotychczasowy przełącznik odbicia pozostaje osobny.
`prefers-reduced-motion` włącza ręczne klatki i wyłącza odtwarzanie;
użytkownik może świadomie wyłączyć ten tryb. Przejście preferencji systemu
na ograniczony ruch zatrzymuje animację. Kontrolki zawijają się na telefonie,
przyciski mają wysokość co najmniej 44 px, tabela przewija się wewnętrznie.

Pomarańczowy układ pozostaje **statycznym odbiciem końca**:
(X,Y,Z) → (X,Y,14−Z), w Σ: Z=7. Przy t=1 jest to dokładnie odbicie
etapu 7. Nie udaje odbicia aktualnej klatki pośredniej. Zmiana wariantu,
q lub parametrów aktualizuje jego statyczną definicję; t jej nie zmienia.
Pełna animacja drugiego układu pozostaje na etap 9. Bez torusów, cząstek
i wirów oraz bez twierdzeń fizycznych.

## Weryfikacja

- Trzy testy w [animation.test.mjs](etap-7/animation.test.mjs) przeszły:
  składnia obu skryptów; 480 pozycji (0/25/50/75/100%, A/B, cztery kąty,
  trzy z₀ i cztery q), równania powierzchni/cięcia, L/W, skala długości,
  k=σ², kąt liczony z przekształconych wektorów i dokładna zgodność końca
  z etapem 7; osobno zegar, anulowanie, pauza, seek, prędkość i trzy cykle.
  Po korekcie startu dodano regresję niezależności jego położenia i skali
od q; wszystkie testy ponownie przeszły.
- Istniejące 87/87 testów aplikacji, TypeScript i trzy buildy wymagane
  przez CI przeszły (web, zasoby Androida, Pages). Dostarczony Node 24.19.0;
  wyjścia w `%TEMP%/pyramid-stage8-web`, `pyramid-stage8-android`,
  `pyramid-stage8-pages`. Dotychczasowe ostrzeżenie o paczkach >500 kB.
- W przeglądarce: koniec A/B, klatki pośrednie, reset, pauza, ręczny seek,
  prędkość, trzy pełne odtworzenia, zmiana wariantu/presetu, ograniczony ruch
  i warstwy; bez błędów/ostrzeżeń konsoli. 320 i 390 px bez poziomego
  przepełnienia strony. Przejrzano podpisy i obraz na ekranie 390 px.
- Tolerancja modelu nadal 0,1%. Przy α=β L/W=1,619742960852,
  błąd 0,105620285% jest poza progiem; animacja nie zmienia tego wyniku.
  Precyzja testów numerycznych jest odrębnym kryterium od tolerancji modelu.

Po korekcie sprawdzono w przeglądarce stały początek przy q=0,0616595
i 0,16, koniec A/B, oba kadry, pełne odtworzenie i ekran 390 px. Aktualny zrzut:
[pełny start Golden Egg](etap-7/etap-8-start-pelny.png).
Zrzuty sprzed korekty: [390 px](etap-7/etap-8-390.png),
[klatka pośrednia](etap-7/etap-8-polowa.png).
Kontrola przeglądarki na komputerze nie jest testem fizycznego telefonu.
Nie budowano APK/AAB, nie instalowano aplikacji ani nie publikowano.
Buildy głównej aplikacji nie zawierają osobnego podglądu z docs/.

## Uruchomienie i jeden następny krok

Z katalogu android-offline:

```powershell
python -m http.server 8087 --bind 127.0.0.1 --directory docs/etap-7
node --test docs/etap-7/animation.test.mjs
```

Podgląd: **http://127.0.0.1:8087/podglad.html**. Można otworzyć plik HTML
lokalnie, zachowując animation.js obok niego; nie wymaga internetu.

Początek został określony przez autora. A pozostaje robocze; ostateczne
zakotwiczenie A/B i wariant α pozostają do wyboru, bez blokowania podglądu.
**Jeden następny krok:** autor ocenia pełny początek Golden Egg i wybiera
końcowy wariant na podstawie animacji.
