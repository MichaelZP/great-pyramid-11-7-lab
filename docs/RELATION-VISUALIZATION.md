# Interactive visualization of the thirteen audited relations

All thirteen positions have 3D annotations, proportional comparisons and
four-step explanations in Polish and English. The mathematical source is
[matematyka-13-stalych.md](matematyka-13-stalych.md); local preview instructions,
evidence and outstanding work are in [status-aktualizacji.md](status-aktualizacji.md).

## Shared data contract

`src/lib/pyramid/relations.ts` provides exhaustive `Record<ConstantId, ...>`
registries of expressions, quantities, scene types, audit sections and
numerator/denominator terms. Repeated terms are explicit arrays (e.g. `[H,D,D]`),
so the same data supplies labelled chains and stacked comparison bars. The common
panel reads results, references and errors from the original engine snapshot.
It never changes comparison targets or tolerance.

`relation-lessons.ts` supplies four localized steps and a derivation for every ID.
`relation-geometry.ts` contains pure coordinate constructions. `RelationOverlay`
dispatches three scene families. New relations need exhaustive registry entries
and lesson data; existing renderers reuse quantities and terms. New geometric
families need an additional renderer and independent checks.

| Family | Positions | Construction |
|---|---|---|
| Pyramid lengths | pi, gamma, sqrt3, sqrt6, sqrt2, sqrt5, T, Brun, inverse phi, phi | Actual B, H, A, D, S, E; explicit copies for sums |
| Pyramid angles | e, e-1 | theta and beta in VOM; bars compare angular measures |
| Oval section | L/W | Closed component of zr=1 cut by z=Z0+x tan(theta), Z0=7.65 |

## Geometry and annotations

The pyramid uses Three.js y as vertical and scene B=2. Points are
O=(0,0,0), M=(0,0,A), V=(0,H,0), N=(-A,0,A), C=(A,0,A), K=(-A,0,-A).
A=OM, H=OV, S=MV, B=NC, D=KC and E=CV have actual Euclidean lengths.
The panel uses arbitrary B=11 units, preserving every scale-independent ratio.

Sums such as H+2D are copies placed end to end at a common scale for numerator
and denominator. They are distinct from the original pyramid segments. Theta
and beta are actual arcs at M and V with theta+beta=90 degrees. Their bars
compare measures, not arc lengths; e-1 subtracts one after division.

The oval renderer constructs the audited closed component and bisects the
unique width-derivative root in (zLo,Z0). It marks in-plane length PQ and maximum
transverse width at zMax, which differs slightly from the midpoint. Mesh, contour
and plane use only a uniform scale and translation. It does not substitute an
ellipse or the ordinary scene's artistic Golden Egg. Step one displays the
cutting-plane inclination. Endpoints and width location are expandable in the panel.

Stable colors plus text identify quantities. Local canvas sprites require no
remote fonts, adapt to camera distance, and participate in the stereo renderer.
Depth testing is disabled for annotations through the translucent pyramid.
Resources are disposed on change/unmount. Phone camera distance and compact
scene controls preserve space for annotations.

Selection saves the ordinary camera and orbit target. Switching relations
reframes the selected construction; return restores the saved view. Ordinary
scene preferences remain in the store. Active relations hide rainbow, stele,
ordinary guides and artistic egg; the oval also hides the pyramid and plinth.
Model changes update endpoints immediately and reset stale explanation steps.

## Playback and cancellation

`useRelationLesson` lives once in AppShell, independently of panel mounts. One
cancellable timeout advances every 4.2 seconds. All thirteen lessons stop at
step four. Pause preserves the step; resume waits a fresh interval. Manual
navigation pauses. Selection/model changes, return and Escape reset the lesson.
Hidden documents pause; cleanup cancels the timer. Reduced motion disables timed
progression and auto-rotation. Every step remains accessible manually. Scene
controls remain available while mobile tabs or fullscreen hide the panel.

Controls have at least 44px height. Select labels are linked programmatically,
results/steps have polite live regions, and annotations also have text legends.
Qualifications stay with each position: approximation versus equality, dependent
formulas, Brun's estimate, exact square identity and the oval's >0.1% error for 11:7.

## History and connected tutorial (2026-10-05)

`relation-history.ts` is an exhaustive bilingual registry separating concept,
name, notation, mathematics and interpretation. Sources carry explicit scopes;
Lange is provenance for a modern proposal, not corroboration of physical or
historical claims. `HistoryPanel` exposes expandable notes and links; the global
bibliography is available without selecting a row. Notes are bundled offline.
`docs/history-13/generate.mjs` regenerates the EN/PL documentation from this data.

`tutorial.ts` groups the thirteen rows into nine dependency steps. The separate
`tutorial-store` keeps a saved step but starts closed and paused. It changes only
the selected construction and highlight, never model/threshold/weight inputs.
`useTutorial` mounts once in AppShell and owns one cancellable 18-second timer.
Manual navigation, other lessons/model changes and visibility changes pause it;
reduced motion disables timed progression. Close/Escape/Android Back retain
progress and restore the ordinary scene. Only the visible responsive panel
scrolls into view when returning to the tutorial. Scene controls also support it.

Coverage and browser evidence are recorded in [current status](status-aktualizacji.md).

## Original visualization evidence

Tests verify all six endpoint lengths, all thirteen comparisons against the
engine at multiple shapes/scales, continuous copied chains, complementary arcs,
independent audited oval coordinates/constraints and finite pause/resume/cancellation
for each lesson. Browser review is separate from Android packaging, physical
touch/offline checks and scientific/historical interpretation. No publication is
part of this implementation.
