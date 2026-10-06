# ETAP 12 — author review, 2026-10-06

**Ready for local author acceptance. Public distribution and native Android acceptance remain blocked by the gates below.** No new product feature, release tag, APK, merge or production deployment is included.

Concept: **Michał Przybylski — prylski.dev**, https://github.com/MichaelZP/.
See [startup/checklist](MANUAL_ACCEPTANCE.md), [release notes](RELEASE_NOTES.md), [authorship](../AUTHORSHIP.md) and [materials/licences](THIRD_PARTY.md).

## Actual scope

The application repository is `android-offline`, branch `feature/android-offline`, not the enclosing workspace repository. Starting commit: `f8ed12762abf0612213d7d48ce44b9ce2c1c1075`. Existing draft [PR #3](https://github.com/MichaelZP/great-pyramid-11-7-lab/pull/3) targets `main`. Existing uncommitted stages were retained and audited; historical plan entries are not completion evidence. Package version remains `2.0.0`.

| Deliverable | Implemented scope | Boundary |
|---|---|---|
| Main React/Vite lab | All 13 labelled constructions/four-step lessons; formulas/results/errors/tolerance; PL/EN history/bibliography; optional nine-step tutorial with saved progress; seven presets and custom ratio/angle/opacity sliders; scan/ranking, rainbow, hologram, stone, dimensions, camera, rotation, stereo/eye swap and expanded scene | Web/Capacitor assets; native acceptance pending |
| `docs/etap-7/podglad.html` (current stage 9) | Actual `zr=k` surface/closed oval; A/B choices, four sections, source scaling, axial placement/reflection, two systems, one clock, pause/reset/layers | Separate static preview, not in app/APK assets |
| `docs/etap-10/podglad.html` | Two independent tori, opposite circulation, views, phase controls, layers, pause/reset | Separate base preview |
| `docs/etap-11/podglad.html` | Bounded particles/trails, smooth artistic deformation/separation/glow, educational/cinematic modes, camera, quality/reduced motion | Separate extended preview; Canvas 2D CPU |

The stages 9–11 require the second local server. Building the main app does **not** package these pages. Integration would be separate future work.

## Mathematics and interpretation

The 13 positions are π, γ, √3, √6, √2, √5, Tribonacci, Brun, 1/φ, φ, e, e−1 and oval L/W. The independent 60-digit audit also checks both workbooks and JavaScript results: [current evidence](etap-12/mathematics.json), [auditor](audit-13/verify.py), [mathematics](MATHEMATICS.md), [derivation](matematyka-13-stalych.md), [Golden Egg](GOLDEN-EGG.md).

- Exact geometry: square-base `D/B=√2` at every angle. Other lengths and complementary-angle constructions follow the stated geometric definitions.
- Approximations: 11:7 gives 51.8427734126° and **12/13** at relative tolerance 0.001 (0.1%). φ=1.618590346797, error 0.034384818%. L/W=1.619742960852, error 0.105620285%, **outside tolerance**. Targets/tolerances were not changed.
- Golden Egg selects its angle by imposing L/W≈φ at Z₀=7.65: 51.795319256°, **10/13**. The section is an oval, not Huntley's ellipse; imposing φ is not independently discovering it. The surface has no finite apex/base and is not a classical cone or hyperboloid.
- Relations are algebraically dependent. Chosen score weights/11:7 preference are not probabilities of historical intent. Brun target uncertainty, provenance of reference-angle uncertainty/weights, global uniqueness with free Z₀/α, and historical physical function remain unresolved. Varying Z₀ gives a family of fitted angles.
- The author's proposed construction function needs the author's exact wording and evidence; matching ratios does not establish it. The 2017 private optical correspondence is not independently authenticated.
- Tori are separate objects, not a conversion of the hyperbolic surface. R=2.4, r=0.65, centres z=7±d/2; default d=4 gives 5 and 9. Range d=2…8 retains at least 0.7 separation. T1 θ+,ψ+ and T2 θ−,ψ− follow the documented world convention. Position/directions were accepted before stage 12; A/B, α, q and final appearance remain open.
- Particles, deformation, glow and camera are **artistic effects**. There is no Navier–Stokes solver, fluid simulation, collision/mixing model, physical measurement or proof of pyramid operation.

## Verification performed

| Check | Result / evidence |
|---|---|
| Application tests | **87/87 PASS**, four Vitest files |
| TypeScript | **PASS** |
| Prototype tests | **14/14 PASS**: stages 7/9, 10, 11. Includes 480 geometry/render configurations, scaling/placement/reflection, closed paths, circulation, continuity, pause/reset, camera and bounded quality |
| Independent mathematics | **PASS**: all 13 rows, both workbooks, JS values/RMS; stage 7 section verifier rerun |
| Builds | **PASS** web, Android-assets, Pages after mobile fix/notices. Outputs `%TEMP%/pyramid-stage12-final-*`, outside repo |
| Browser content | All 13 selections through step 4; 26 PL/EN history/source inspections; nine tutorial steps, jump/close/reopen/reload; seven presets, custom ratio slider, layers/stereo/eye swap |
| Prototype browser | A/B × four cuts; q change preserves placement; invalid α recovery, layers/pause/reset. Stage 10 smoke review. Stage 11 two modes × three views × 320/390/844 widths, no horizontal overflow/errors; nine layers/camera/manual override |
| Accessibility | Named controls, keyboard selects/ranges, pressed navigation, T1/T2 shape distinction and reduced motion inspected/tested. Screen reader, contrast certification and full WCAG conformance **unverified** |
| Performance | Bounded buffers/particles/trails/draw rates tested. Example 30-frame CPU sample p50≈6.2 ms/p95≈8.2 ms is not screen FPS or a device benchmark. Browser host throttles motion |
| Licensing | 113 non-dev npm entries inventoried; verbatim notices generated. **Three full-notice gaps**, see THIRD_PARTY.md; native Maven/Gradle outside scope |
| Physical phone / APK | ADB detected NE2213. Touch/orientation/offline/Back/native fullscreen, sustained FPS/thermal/memory and new APK acceptance **not performed**. Detection is not acceptance |
| Release files | Heuristic scan of tracked/non-ignored app files found no credential patterns or sensitive/generated file names; release document links exist. See [release-check.json](etap-12/release-check.json). Exact staged paths reviewed; enclosing workspace files excluded |

Local runtime: Node 24.19.0, Windows. No lint script exists, so no lint PASS is claimed. Vite/Vitest config needed sandbox escalation; checks then completed. CI now runs the 14 prototype tests alongside existing checks.

## Required fix and remaining limits

At 844×390 the toolbar overflowed and the scene shrank to approximately 59 px high. Header breakpoints/wrapping now align with lab panels; short landscape uses a scrollable side panel. The scene is approximately 490×246, toolbar controls are reachable, and expanded scene restores 844×390. Desktop 1280×720 remains usable. Mobile navigation exposes selected state. This repairs the existing interface without a new feature.

Expanded-scene layout was checked; the host did not expose native `document.fullscreenElement`, so native fullscreen remains **unverified**. Physical touchscreen orbit/pan/zoom remains unverified. Existing Three shadow-map deprecation and hidden-chart zero-size warnings remain; no corresponding browser exception was observed. Vite >500 kB warnings remain (largest main chunks ≈728/957 kB). No warning/quality/tolerance gate was weakened.

[Browser evidence](etap-12/) contains DOM JSON and representative screenshots. Host frames can lag DOM state: the 13-image contact sheet illustrates constructions, **not each final step's highlight**. JSON records step 4; geometry/timing tests check construction. Earlier [13-scene review](REVIEW-13.md) remains available. This is browser evidence, not phone footage.

Selected primary references freshly reachable on 2026-10-06: [Lange's model](https://www.sectioaurea.com/sectioaurea/the_golden_angle.htm), [Feinberg 1963](https://www.fq.math.ca/Scanned/1-3/feinberg.pdf), [DLMF γ](https://dlmf.nist.gov/5.2), [OEIS Brun estimate](https://oeis.org/A065421). Availability does not validate physical interpretations or historical intent. Other bibliography links were inspected in UI; not every external page was freshly retrieved. Linked works are not bundled offline.

## Publication gates and author decisions

Local review is ready. Before public distribution: decide project licensing and confirm rights for supplied workbooks/private correspondence; resolve notice gaps against the actual shipped artifact; perform physical-device acceptance and native dependency audit if publishing Android. No integrated cone/vortex app or newly validated APK is delivered.

The author retains A/B/α/q, final vortex appearance, precise hypothesis wording/evidence, project/material licensing and future integration scope. Record PASS/FAIL/UNVERIFIED in the checklist and review draft PR #3. Do not merge or deploy before applicable gates are resolved.
