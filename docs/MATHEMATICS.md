# Mathematical derivation

Notation for a square pyramid of base side `B`, height `H`:

| Symbol | Meaning |
|---|---|
| `A = B/2` | half-base |
| `D = B√2` | base diagonal |
| `S = √(H² + A²)` | face apothem (slant height of the face) |
| `E = √(H² + 2A²)` | lateral (corner) edge |
| `θ = atan(H/A)` | face slope above horizontal |
| `α_arris = atan(H / (D/2))` | corner inclination |

All constant rows are dimensionless. Model scale cancels.

## Comparison formulas

| Id | Symbol | Expression | Target |
|---|---|---|---|
| pi | π | `2B / H` | π |
| gamma | γ | `2B / (H + 2D)` | 0.5772156649… |
| sqrt3 | √3 | `(H + 2D) / (2B)` | √3 |
| sqrt6 | √6 | `(H + 2D) / D` | √6 |
| sqrt2 | √2 | `D / B` | √2 |
| sqrt5 | √5 | `(S + B) / S` | √5 |
| tribonacci | T | `(A + 2D) / (S + B)` | 1.8392867552… |
| brun | B₂ | `E / A` | 1.9021605831… |
| invPhi | 1/φ | `S / (S + A)` | 1/φ |
| phi | φ | `S / A` | φ = (1+√5)/2 |
| e | e | `2θ / (90° − θ)` (θ in degrees) | e |
| eMinus1 | e − 1 | previous minus 1 | e − 1 |
| eggLW | L/W | length/width of the `z = 1/r` cut at `Z₀ = 7.65` | φ at αp |

Relative error: `|value − target| / |target|`. A row “matches” when the error is ≤ **0.001**.

`√2` is exact for every square base and does not distinguish slope. `e − 1` is not an independent discovery.

## Shape parameter

One number fixes the solid (scale-free):

- ratio models: `B/H` given, `θ = atan(2 / (B/H))`;
- angle models: `θ` given, `B/H = 2 / tan(θ)`.

11:7 ⇒ `B/H = 11/7` ⇒ `θ = 51.8427734126309°`.

Golden Φ Egg ⇒ `θ = 51.7953192558977°` ⇒ `B/H = 1.57410939124007`.

## Scoring

From the workbook (sheet `00_Start`):

| Term | Weight |
|---|---:|
| Independent accuracy | 0.35 |
| Agreement with observed angle 51.844° ± 0.02° | 0.25 |
| Fraction simplicity vs 11/7 | 0.25 |
| Robustness inside the scan band | 0.15 |

Scan: 51.78° … 51.90°, step 0.0005°.

Implementation: [`src/lib/pyramid/engine.ts`](../src/lib/pyramid/engine.ts).
