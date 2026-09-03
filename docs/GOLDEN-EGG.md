# Golden Φ Egg

The Golden Φ Egg is a **separate** pyramid model. It does not reuse the rounded 51.84° generator of the classical cone.

## Defining condition

Hyperbolic cone of revolution (Harthun–Rennert form used in the workbooks):

```text
z · r = 1     (equivalently  z = 1/r)
```

A plane cuts the cone at axis height **Z₀ = 7.65**. Among such planes there is one angle **αp** for which the oval section has

```text
L / W = φ = 1.6180339887…
```

Solving that condition yields

```text
αp = 51.7953192558977°  ≈  51.795319256°
```

All pyramid parameters and constant errors for this preset are computed from **that angle alone**, not from 51.84°.

## Relation to the pyramid

αp is used as the **face slope** (apothem inclination):

```text
θ = αp
H / A = tan(αp)
B / H = 2 / tan(αp) ≈ 1.574109391
```

The green apothem of the pyramid is the same line as the major axis of the section.

## Scene construction

1. Translucent hyperbolic cone, axis vertical, **base on the ground plane behind the pyramid**.
2. Cutting plane = **front face plane** of the pyramid (contains the apothem).
3. Plane ∩ cone = closed oval. Geometric L/W equals φ at αp to machine precision.
4. That oval is shown as a gold meridian in the cutting plane.
5. The oval is **revolved about the apothem** (51.795°) to a translucent golden egg.

The ellipse is therefore **not** vertical along world Z; its long axis is the apothem.

The on-screen cone and egg in the 3D scene are a proportional schematic for framing. They do not use the same Z₀ parameterization as the numeric L/W row.

## Constant row L/W

The constants table includes **L/W**. The geometric length/width of the `z = 1/r` cut is integrated directly: closed-form oval endpoints around Z₀ plus a ternary search for the maximum half-width. At αp the geometric ratio equals φ to machine precision; there is no silent rescaling. Changing the slope (other presets or the custom slider) shows the true geometric deviation from φ.

## Laboratory consensus

Selecting the Golden Egg preset moves the laboratory consensus. With the engine it reports **10 of 13** relations within 0.1%, mean relative error ≈ **0.090%**, and maximum relative error ≈ **0.397%** (~0.4%), about 4× the declared 0.1% tolerance. The worst classical rows are **e−1**, **e**, and **π**. Therefore Golden Egg is a **geometric lead**, not a replacement construction model; **11:7 remains the simplest construction model**. These figures are computed by the laboratory engine.

## What this does not claim

- that the builders cut a hyperbolic cone;
- that 51.795° is a surveyed field angle;
- that `Z₀ = 7.65` is an Egyptian metrological unit;
- endorsement by any cited author of a historical programme.

It claims only that, with the stated cone and `Z₀`, the unique plane giving `L/W = φ` has angle 51.795319256°, and that the laboratory derives every listed error from that number.
