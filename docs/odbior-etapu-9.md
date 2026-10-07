# Odbiór etapu 9 — dwa układy hiperboliczne

2026-10-06. Dotyczy `docs/etap-7/podglad.html`, `animation.js` i wspólnego
`section.js` (funkcja przekroju wyodrębniona bez zmiany matematyki w etapie 10).
Autor koncepcji: Michał Przybylski — [prylski.dev](https://prylski.dev/).
Wybór wariantu podczas testu nie zatwierdza A/B ani α za autora.

## Wynik bieżący

| Kontrola | Wynik |
|---|---|
| Geometria obu układów i renderer przy 0/25/50/75/100% | PASS, 5/5 testów podglądu |
| Jedno sterowanie i widoczność pierwszy/drugi/oba | PASS, testy handlerów DOM i przeglądarka |
| Viewporty 320/390 px, brak przepełnienia strony | PASS, przeglądarka komputerowa |
| Istniejące testy aplikacji / TypeScript / trzy lokalne buildy | PASS: 87/87 / PASS / PASS |
| Fizyczny telefon: dotyk, orientacje, płynność, schowanie strony | NIEZWERYFIKOWANE, ADB bez urządzeń |
| Ostateczny wybór A/B i α | Otwarta decyzja autora |

Dokładne dowody i ograniczenia: [STATUS.md](STATUS.md),
[definicje transformacji](animacja-stozka.md),
[zapis przeglądarki](etap-7/etap-9-browser-checks.json).
Viewporty i build zasobów Androida nie dowodzą odbioru fizycznego telefonu.

## Przygotowanie

Z katalogu `android-offline` uruchom:

```powershell
python -m http.server 8087 --bind 127.0.0.1 --directory docs/etap-7
node --test docs/etap-7/animation.test.mjs
```

Otwórz **http://127.0.0.1:8087/podglad.html**. Do testu na telefonie
można skopiować HTML, animation.js i section.js i otworzyć je lokalnie albo uruchomić
serwer w zaufanej sieci na adresie LAN komputera (`--bind <adres-LAN>`).
Na telefonie 127.0.0.1 oznacza telefon, więc nie używaj tego adresu
do serwera komputera. Nie wymaga to integracji ani instalowania APK.
Sam test nie obejmuje publikacji, zmian zapory ani otwierania portów routera.

## Procedura

1. Ustaw „Oba”, „Całe przejście”, α=β, A, q=0,08. Przy 0% sprawdź
   Q=(16,775;0;28,35) i Q′=(16,775;0;−14,35). Zmień q na 0,16 i z powrotem:
   początek obu układów pozostaje stały. Piramida B=11, h=7 nie zmienia się.
2. Dla A i B, α=β i złotego α przejdź ręcznie przez 0/25/50/75/100%.
   Obrys, cięcie, siatka, L/W, osie, asymptoty, strzałki i punkty podpisów
   drugiego układu mają być odbiciem aktualnej klatki w Z=7. Sprawdź także
   presety Langego/Huntleya i poprawne własne α/z₀; bez rozciągania osi.
3. W każdej z pięciu pozycji wybierz pierwszy/drugi/oba. Ukryta geometria
   i jej podpisy znikają; postęp, skala, piramida oraz kadr się nie zmieniają.
   Sprawdź osobno pięć warstw. Panel wzorca elipsy pozostaje niezależny.
4. Wyłącz ograniczony ruch i odtwórz. Obie powierzchnie ruszają razem;
   przełączenie widoczności nie zatrzymuje ani nie resetuje czasu. Pauza
   zachowuje klatkę, wznowienie nie skacze. Ręczny seek zatrzymuje ruch,
   reset daje 0%, „Pozycja końcowa” daje 100%. Sprawdź prędkości 0,5×/1×/2×/4×,
   zakończenie przy 100% oraz ponowne odtworzenie od zera.
5. Włącz ograniczony ruch: odtwarzanie jest niedostępne, suwak i przyciski
   nadal działają. Podczas odtwarzania schowaj stronę lub przełącz kartę:
   po powrocie ma być pauza, bez nadrobienia ukrytego czasu. Sprawdź również
   systemową preferencję ograniczonego ruchu.
6. Sprawdź oba kadry, 3D/XZ, obrót widoku i trzy zakresy powierzchni.
   W trybie nieskończonym nie ma zamykającego dysku; lokalne zera są
   asymptotami, nie punktami powierzchni. Oznaczenia obu układów są czytelne;
   kadr etapu 7 może celowo nie pokazywać odsuniętego początku.
7. Sprawdź tabelę: dla α=β L/W≈1,61974296, błąd≈0,105620%, **NIE** przy
   progu 0,1%. Złoty dobór daje L/W≈φ. Owal i elipsa pozostają osobne;
   wynik tolerancji nie zmienia się z postępem, widocznością ani q.
   Dla parametrów bez zamkniętego owalu obraz jest czyszczony i pojawia się
   komunikat, a odtwarzanie zatrzymuje się. Przywróć poprawny preset.
8. Na 320/390 px i fizycznym telefonie sprawdź przewijanie strony/tabeli,
   dotykowy suwak, dostęp do przycisków, podpisy w początku/połowie/końcu,
   pionową i poziomą orientację oraz płynność 8-sekundowego przejścia.
   Brak urządzenia lub jakiejkolwiek wykonanej kontroli zapisuj jako
   **NIEZWERYFIKOWANE**, nie PASS.

## Zapis odbioru fizycznego

Uzupełnij po wykonaniu, bez danych identyfikujących urządzenie:

| Pole | Do uzupełnienia |
|---|---|
| Data, model telefonu, system i przeglądarka | — |
| Testowana wersja lokalnych plików / parametry A/B, α, q | — |
| Dotyk, obie orientacje, przewijanie i podpisy | NIEZWERYFIKOWANE |
| Odtwarzanie obu układów i płynność | NIEZWERYFIKOWANE |
| Pauza, seek/reset, zmiana widoczności w ruchu | NIEZWERYFIKOWANE |
| Ograniczony ruch i schowanie strony | NIEZWERYFIKOWANE |
| Problemy, dowód, wynik PASS/FAIL/NIEZWERYFIKOWANE | — |

Odbiór etapu 9 nie zatwierdza funkcji fizycznej konstrukcji ani historycznej
interpretacji. Nie daje upoważnienia do integracji, kolejnych efektów,
commitów, push, zmian PR, publikacji ani merge.
