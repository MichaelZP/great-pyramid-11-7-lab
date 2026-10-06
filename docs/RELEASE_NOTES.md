# Review all thirteen mathematical positions, lessons and history

The update lets users inspect all thirteen model comparisons through labelled
3D constructions, formulas, relative errors and four-step explanations in
Polish and English. Length sums use explicit copies, e/e−1 use complementary
angles and L/W uses the calculated closed oval and its maximum width.

Each position adds scoped history and sources. An optional nine-step tutorial
connects the dependent relations, supports arbitrary navigation and retains
progress after reload. The visible project credit is
**Michał Przybylski — prylski.dev**.

Review fixes correct the RMS scan minimum to 51.846°, cancel pending playback
when hidden or closed, avoid repeated geometry uploads after height settles,
and prevent the header from covering the model controls. Documentation now
distinguishes the oval from an ellipse, numerical residuals from exact equality,
chosen score weights from independence, and ordinary illustrations from the
calculated section. Comparison targets, 0.1% tolerance and source XLSX inputs
remain unchanged.

Validation: 87 tests, TypeScript, independent 60-digit audit of all 13 rows and
both workbooks, three local build modes, desktop and 320/390 px browser review.
The 11:7 preset matches 12/13; Golden Egg matches 10/13. RMS regression and
4.2/18 s playback cancellation are covered by automated tests. CI also checks
all three build modes. See [review evidence](REVIEW-13.md) and
[manual acceptance](MANUAL_ACCEPTANCE.md).

This is a **draft test update**. Physical Android touch/offline/Back/fullscreen
and sustained animation/FPS acceptance remain pending; no connected device
was available. Browser motion is restricted by its host. Bundles above 500 kB
and library deprecation warnings remain. Brun uncertainty, global golden-angle
uniqueness, statistical provenance of weights/reference angle and historical
function/intent remain unresolved. Some source pages blocked the fresh review.

The PR targets `main` from `feature/android-offline` and includes the earlier
offline Capacitor foundation already committed on that branch. It must remain
draft until the outstanding acceptance is reviewed. No merge or production
deployment is requested or performed.
