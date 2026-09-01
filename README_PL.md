# Wielka Piramida 11:7 — laboratorium stałych matematycznych

> **Jedna proporcja, żywy model 3D, tabela błędów stałych, oznaczona korespondencja tęczowa i Golden Φ Egg z cięcia z = 1/r.**

[English version](README.md) · [Matematyka](docs/MATHEMATICS.md) · [Golden Egg](docs/GOLDEN-EGG.md) · [Korespondencja optyczna](docs/OPTICAL-CORRESPONDENCE.md) · [Poprzednik: model Fusion](https://github.com/MichaelZP/great-pyramid-11-7)

![Laboratorium 11:7 — piramida, tęcze, tabela stałych](docs/images/lab-11-7.png)

To repozytorium to **laboratorium WWW (v2)** badania piramidy 11:7. Generator Autodesk Fusion pozostaje w osobnym projekcie: [MichaelZP/great-pyramid-11-7](https://github.com/MichaelZP/great-pyramid-11-7).

Scena to w pełni parametryczna piramida kwadratowa z tradycyjnych wymiarów **440 × 280 łokci królewskich**. W skali **1:3200**, przy przyjętym łokciu **523,8 mm**, bok podstawy wynosi **72,0225 mm**, a dla 11:7 wysokość **45,8325 mm**.

Laboratorium rozdziela cztery warstwy:

1. **Dokładna geometria parametryczna** — bryła z 440, 280, łokcia i skali.
2. **Cele porównawcze** — wyrażenia bezwymiarowe z bieżącego kąta ściany, tolerancja względna **0,1%**.
3. **Schemat korespondencji optycznej** — nachylenie krawędzi ~42° i apotema 51,842773° obok pasm tęczy pierwotnej i wtórnej.
4. **Golden Φ Egg (v2)** — stożek hiperboliczny `z = 1/r` cięty przy `Z₀ = 7,65` tak, że `L/W = φ`, kąt płaszczyzny **αp = 51,795319256°**. Elipsa w płaszczyźnie cięcia obracana wokół apotemy daje złote jajo.

Wynik służy geometrii, wizualizacji i dyskusji krytycznej — nie jest dowodem starożytnego kodu optycznego ani matematycznego.

**Gotowa geometria do druku** (poprzednik Fusion): [Thingiverse, thing:6944382](https://www.thingiverse.com/thing:6944382).

## Modele w laboratorium

| Model | Definicja | Kąt ściany |
|---|---|---:|
| Dokładne φ | `H / A = √φ` | 51,827292° |
| **11 : 7** | `B : H = 11 : 7` (440 : 280) | **51,842773°** |
| Średnia 51,845° | kąt analizy stałych | 51,845° |
| Petrie–Lehner–Cole | średnia użyta dla *e* | 51,8504° |
| Dokładne π | `H / A = 4 / π` | 51,853974° |
| Golden Φ Egg | `L/W = φ`; `z = 1/r`; `Z₀ = 7,65` | **51,795319256°** |
| Własny stosunek | `B/H` lub kąt użytkownika | edytowalny |

Wagi oceny (z skoroszytu): dokładność niezależna 0,35, zgodność z obserwacją 0,25, prostota ułamka 0,25, odporność w paśmie 0,15. **11:7 pozostaje najprostszym modelem konstrukcyjnym**; Golden Egg to trop geometryczny, nie zamiennik konstrukcji.

## Uruchomienie lokalne

Wymagany [Node.js](https://nodejs.org/) **20 lub 22 LTS**.

```bash
git clone https://github.com/MichaelZP/great-pyramid-11-7-lab.git
cd great-pyramid-11-7-lab
npm install
npm run dev
```

Otwórz adres podany przez Vite (port **8080**).

## Źródłowe skoroszyty

- [`data/Great_Pyramid_11_7_Mathematical_Constants_Lab.xlsx`](data/Great_Pyramid_11_7_Mathematical_Constants_Lab.xlsx)
- [`data/Piramida_11_7_laboratorium_stalych.xlsx`](data/Piramida_11_7_laboratorium_stalych.xlsx)

## Autorstwo i podziękowania

**Koncepcja, synteza matematyczna i autorstwo:** Michał Przybylski.

Laboratorium WWW kontynuuje model Fusion [great-pyramid-11-7](https://github.com/MichaelZP/great-pyramid-11-7).

Szczególne podziękowania dla **Philipa Lavena** (korespondencja z 1 kwietnia 2017: referencja tęczy wtórnej przy ~525 nm, ok. 51,83°). Podziękowanie **nie** oznacza poparcia hipotez historycznych.

Dalsze podziękowania: **Rich Jarvis** (związek kątów piramidy i tęczy) oraz **[Alan Green](https://tobeornottobe.org/biography/)** (materiał o stałych jako punkt wyjścia interpretacyjny).

Stożek Harthuna–Rennerta `z = 1/r` oraz rozwiązanie `Z₀ = 7,65`, `L/W = φ` są użyte zgodnie ze skoroszytami projektu. Odpowiedzialność za implementację spoczywa na autorze.

## Zakres i ostrożna interpretacja

To model matematyczno-wizualny, nie rekonstrukcja geodezyjna. Tolerancja 0,1% nie jest dowodem intencji. Promienie tęcz w scenie są schematyczne. Bliskość liczbowa nie ustanawia przyczyny historycznej.

## Status

Wersja **2.0.0**. Copyright © 2026 Michał Przybylski. Licencja open-source nie została jeszcze nadana.
