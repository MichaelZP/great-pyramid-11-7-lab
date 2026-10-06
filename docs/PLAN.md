# Current review scope — 2026-10-06

The current user request authorizes review, fixes, validation, a branch push and
a draft PR to the project default branch. No merge or production publication.
The stage permissions below are historical planning records.

# Pyramid 11:7 — development plan

Planning baseline: 2026-10-05, application repository `android-offline`, commit
`a11489c`, branch `feature/android-offline`. This session authorizes planning
and these documentation additions only. Implementation, commits, pushes,
deployment, Android packaging and publication are outside this session.

## Evidence and project instructions

No `AGENTS.md` was found in the application tree or its checked ancestor
directories. The current project guidance is in [README](../README.md),
[Polish README](../README_PL.md), [mathematics](MATHEMATICS.md),
[Golden Egg](GOLDEN-EGG.md), [optical correspondence](OPTICAL-CORRESPONDENCE.md),
[Android instructions](ANDROID_OFFLINE.md), and [workbook notes](../data/README.md).
The executable definitions are in [engine.ts](../src/lib/pyramid/engine.ts);
[engine.test.ts](../src/lib/pyramid/engine.test.ts) records existing regression
expectations. External references linked by these files have not been independently
reviewed in this planning session. Workbook cell formulas have not yet been audited.

## Three separate kinds of statement

| Layer | Scope | Required evidence and presentation |
|---|---|---|
| Mathematics requiring verification | Parametric square-pyramid geometry, 13 comparison relations, egg section, errors and scoring | Explicit assumptions, derivation, source provenance, independent calculation, limitations. A numerical match is not historical or physical evidence. |
| Author's hypothesis about the construction's function | Michał Przybylski's interpretation of what the construction might have been intended to do | A statement supplied or confirmed by the author, predictions, a possible falsification criterion and evidence distinct from numerical proximity. |
| Artistic and schematic visualization | Rainbow bands, translucent egg/cone, stone textures, holograms, lighting and stereo rendering | Label illustrative choices and document whether displayed geometry follows the numerical model. Rendering cannot validate a physical function. |

The local sources discuss pyramid/rainbow angle correspondence and a Golden Egg
geometric lead, but do not supply an unambiguous affirmative statement of the
author's proposed construction function. That statement is an open input. Do not
infer it from the scene or turn acknowledgements into endorsements.

## Actual inventory: all 13 mathematical positions

This is the complete ordered inventory from `CONSTANTS` and `relationValue` in
`src/lib/pyramid/engine.ts`, also listed in `docs/MATHEMATICS.md` and the English
README. No entries have been inferred. These are 13 comparison rows, not 13
independent constants or independent discoveries.

Notation: `B` is the base side, `H` the vertical height, `A=B/2`, `D=B√2`,
`S=√(H²+A²)` the face apothem, `E=√(H²+2A²)` the corner edge, and
`θ=atan(H/A)` in degrees for the expressions below.

| # | Engine ID | Position / target | Implemented expression | Verification note |
|---|---|---|---|---|
| 1 | `pi` | π | `2B/H` | Half the base perimeter divided by height; the full perimeter gives `4B/H ≈ 2π`. |
| 2 | `gamma` | Euler–Mascheroni γ | `2B/(H+2D)` | Engine target `0.5772156649015329`; verify provenance and approximation. |
| 3 | `sqrt3` | √3 | `(H+2D)/(2B)` | Reciprocal of the model's γ expression, not an independent relation. |
| 4 | `sqrt6` | √6 | `(H+2D)/D` | Model expression equals the √3 row multiplied by the √2 row. |
| 5 | `sqrt2` | √2 | `D/B` | Exact square-base identity at every slope; engine weight is zero. |
| 6 | `sqrt5` | √5 | `(S+B)/S` | Linked algebraically to `S/A`; part of the φ family. |
| 7 | `tribonacci` | Tribonacci T | `(A+2D)/(S+B)` | Engine target `1.8392867552141612`; verify target definition and source. |
| 8 | `brun` | Brun's constant B₂ | `E/A` | Engine target `1.902160583104`; treat decimal as an adopted numerical estimate and verify precision. |
| 9 | `invPhi` | 1/φ | `S/(S+A)` | Derived from `S/A`; not independent. |
| 10 | `phi` | φ = `(1+√5)/2` | `S/A` | Main φ-family relation. |
| 11 | `e` | Euler's number e | `2θ/(90°−θ)` | Verify angle convention and rationale for selecting this expression. |
| 12 | `eMinus1` | e−1 | `e_model−1` | Derived directly from row 11. |
| 13 | `eggLW` | L/W compared with φ | `eggLengthOverWidth(θ, 7.65)` for a planar cut of `z=1/r` | Separate section model, not another pyramid length ratio; independently verify branch, endpoints and maximum width. |

For row 13 the engine uses `x=(z−Z₀)/tan(θ)` and
`y²=1/z²−x²`. It selects the closed oval around `Z₀`, with endpoints
`zLo=(Z₀+√(Z₀²−4tan(θ)))/2`, `zHi=(Z₀+√(Z₀²+4tan(θ)))/2`, and computes
`L/W=(zHi−zLo)/(sin(θ)·2√max(y²))`, using 80 ternary-search iterations.
The Golden Egg preset uses `θ=51.795319256°`, `Z₀=7.65`; 11:7 uses
`θ≈51.8427734126309°`. Verify the section's shape and uniqueness of the golden
solution; do not assume it is an ellipse because existing prose calls it one.

The implemented comparison error is `|value−target|/target` for the current,
positive targets. Default tolerance is `0.001` (0.1%). It is a comparison
threshold, not a manufacturing tolerance or a criterion proving intent.

## Stages and completion criteria

### 0. Planning baseline — this session

Deliver these three documents: `docs/PLAN.md`, `docs/STATUS.md`, `AUTHORSHIP.md`.
Record Git context, startup paths, all 13 IDs and known uncertainties.

Complete when the inventory is traceable to code and documentation, author
identity is recorded, the three interpretive layers are separate, and the final
Git check shows only these new documents in the application repository.

### 1. Independent mathematical audit — proposed next session

Audit the 13 expressions against both source workbooks and an independent
calculation. Record worksheet/cell references, assumptions, target provenance,
precision, algebraic dependencies and values/errors for 11:7 and Golden Egg.
Verify the egg section and angle solution without using a screenshot as evidence.

Complete when every row has a reproducible derivation or an explicit unresolved
finding; 12/13 for 11:7 and 10/13 for Golden Egg are independently checked;
and the distinction between exact identities and selected approximations is clear.
Existing regression tests alone do not complete this stage.

Audit the 0.35/0.25/0.25/0.15 score weights, observation input
`51.844° ± 0.02°`, and preference for `11/7` separately. The score is a chosen
evaluation model, not a probability that a historical hypothesis is true.
Check scan resolution: engine default step is 0.0005°, while the UI hook requests
0.001°. Record effects rather than silently changing either value.

### 2. Author's function hypothesis and evidence

Obtain the author's exact statement, distinguish it from numerical correspondence,
and document proposed mechanism, predictions, assumptions, alternative explanations
and what evidence could contradict it. Audit historical and optics references
before relying on them as supporting evidence.

Complete when the author confirms the wording and each supporting claim has an
identified evidence source or an explicit unknown. If no statement is available,
keep this stage open without inventing a function.

### 3. Presentation specification and artistic layer

Specify how future UI/docs will identify mathematical results, the author's
hypothesis and artistic illustrations. Address the π wording, the section's
oval/ellipse terminology, and the schematic scene's different egg parameters.
Preserve author credit and distinguish inspiration from endorsement.

Complete when each proposed text/scene change maps to an audit finding, displayed
numbers have traceable definitions, schematic choices are labelled, and an
English/Polish reviewable specification exists. No implementation is implied.

### 4. Application update and validation — later authorized work

Implement only an agreed specification. Preserve unrelated work and verify
numerical behavior, language parity, controls, scene, stereo and offline use.
Keep standard web, GitHub Pages and Android build modes distinct.

Complete when relevant tests, typecheck and intended builds pass, UI review is
recorded separately from numerical verification, and Android offline behavior is
checked on a device if Android is in scope. A build or launch alone is not UX or
physical validation. Publication requires a separate explicit request.

## Known discrepancies to resolve through the stages

- `2B/H` is correct for the π comparison, but its Polish engine description says
  base perimeter / height. The English README also describes `22/7` that way.
- READMEs allow Node 20/22; `package.json` requires Node ≥22 and CI uses 22.
- Some labels still say twelve constants although the engine has 13 rows.
- `GOLDEN-EGG.md` acknowledges that scene parameters differ from the numerical
  `Z₀=7.65` section; exact visual L/W must not be assumed.
- Existing claims about observations, optical references, uniqueness and historical
  interpretation need a source audit; this session does not establish them.
