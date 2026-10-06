# Final review — 2026-10-06

Reviewed the complete existing thirteen-position update on
`feature/android-offline`, starting at `a11489c`, including the already dirty
scene/history/tutorial files. No applicable AGENTS.md was found. The parent
repository and its two review PNGs were preserved. GitHub fetch confirmed the
remote and default target `main`; the earlier offline foundation is also in
this branch's diff against main.

## Checked and corrected

All 13 formulas/results/relative errors, both source workbooks, segment endpoints
and copies, complementary angles, actual oval L/W, scene switching/return,
PL/EN history, nine tutorial steps, saved progress, author credit, seven presets,
custom input and ordinary scene switches were reviewed. Fixed the RMS scan
minimum (51.846°), cancellable timers, misleading oval/precision/ranking copy,
missing visible **Michał Przybylski — prylski.dev** credit, header overlap,
fixed-shell scrolling and unnecessary settled-height geometry uploads.

| Control | Final result |
|---|---|
| Vitest | **87/87**, four files |
| TypeScript / whitespace | `tsc --noEmit` and diff checks pass |
| Independent Decimal audit | all 13 rows, both XLSX, both scans including RMS pass; [fresh evidence](audit-13/review-2026-10-06.json) |
| Comparisons | 11:7 **12/13**; Golden Egg **10/13**; 11:7 L/W error **0.105620285%**, unchanged |
| Builds | web `dist/`, Android web assets `%TEMP%/pyramid-history-android-check`, Pages `%TEMP%/pyramid-history-pages-check`; expected `/`, `./`, `/great-pyramid-11-7-lab/` bases |
| Browser | all 13 four-step lessons, 26 PL/EN history entries, nine tutorial steps; 1280×720, 320×740 and 390×844; no horizontal page overflow |
| Playback | 4.2/18 s deadlines, hiding, cleanup and reduced motion tested with a fake clock; host forces reduced motion for visual review |
| Regression | scene return, presets/custom input, scene switches, stereo/swap and tutorial reload exercised; shell scroll remains zero after slider focus |
| Android | no ADB device; no new native APK/AAB/install or physical UX/offline/FPS validation |

Full scope, fixes, source checks, screenshots and limitations:
[review report](REVIEW-13.md). [Release description](RELEASE_NOTES.md).
CI now includes all three web build modes, without deployment.

## Remaining issues

Physical Android touch/Back/offline/portrait/landscape, sustained animation/FPS
and native fullscreen remain pending. The in-app host showed expanded canvas
and exit controls but did not expose a fullscreen element and scaled captures;
that does not establish native fullscreen. Chunks above 500 kB and Three.js
Clock/shadow-map warnings remain. A Fast Refresh hook-order error during live
edits did not recur after a full reload.

Brun's rigorous uncertainty, global uniqueness of the golden angle, statistical
provenance of the reference angle/weights and the author's precise physical
function hypothesis remain unresolved. Fifteen source URLs were attempted;
Rhind (403) and the Petrie scan were not freshly readable. Laven's papers cover
general optics; the cited unpublished 2017 correspondence is unverified.
No dependent result is presented as an independent discovery.

## Test version and one next step

From `android-offline`, use Node ≥22 and `npm run dev -- --host 127.0.0.1`;
open **http://127.0.0.1:8080/**. A local preview tab is available. On a trusted
LAN, `npm run dev` prints a phone-accessible address. The existing public Pages
version and old Android artifacts do not include this draft update.

**One next step:** perform and record the physical Android acceptance in
[MANUAL_ACCEPTANCE.md](MANUAL_ACCEPTANCE.md), including timed playback with
reduced motion off and sustained animation behavior, before readiness review.

Branch push and draft PR are being prepared under the current authorization.
No merge or production publication is authorized or performed.

---

## Historical status entries

The following records describe earlier sessions and their then-current limits.

# Pyramid 11:7 — current status

## Current update — history, sources and optional tutorial, 2026-10-05

All thirteen positions now separate the history of the concept, name and symbol
in Polish and English. Expandable notes distinguish mathematics/model results,
historical evidence and pyramid interpretation, without attributing builders’
intent from numerical proximity. Fifteen scoped sources are accessible per row
and in the app bibliography. The documentation shares the app’s source registry:
[English history](HISTORY-13.md), [Polish history](historia-13-pozycji.md).

The optional nine-step tutorial connects all thirteen positions and reuses their
3D constructions. It supports skip/close, pause, resume, arbitrary step selection,
restart and saved progress across reloads. It starts manually; optional timed
progression stops on completion, hidden pages and manual changes. Reduced motion
uses manual navigation. Ranking copy now identifies chosen weights and the 11/7
preference. Formula/target/weight computations and source workbooks are unchanged;
only two misleading engine descriptions were corrected. Startup locale retention
and rejected fullscreen promises were also repaired during review.

79 tests, typecheck and local web/Android-assets/Pages builds pass. Browser review
covers all thirteen history entries in both languages, nine tutorial steps, saved
progress and desktop/320/390 px layouts.
The final review also checks panel-only scrolling, fullscreen entry/exit and
step navigation within fullscreen, with no new console errors.
Timed playback under unrestricted motion and physical Android touch/offline checks
remain separate. Details, screenshots
and evidence limits: [update status](status-aktualizacji.md).

No publication, commit, push, native packaging, sync or installation. Earlier
uncommitted visualization and audit work was preserved.

## Previous update — all thirteen interactive relations, 2026-10-05

All thirteen audited positions have labelled 3D constructions, common result/error
panels and four-step bilingual explanations. Length sums use explicit copies;
angular relations show complementary arcs; L/W uses the actual closed section
and maximum width. Playback supports pause, resume, finite completion, reduced
motion and return to the ordinary scene. Phone labels, framing and compact scene
controls were checked at 390 and 320 px widths.

Typecheck, 65 tests and local web/Android-assets/Pages builds pass. Browser review
includes manual steps 1–4 for every position. Timed playback without reduced
motion and physical Android touch/offline checks remain separate validation.
The mathematical engine, workbook and earlier audit findings are unchanged.
See [preview, evidence and outstanding work](status-aktualizacji.md) and
[architecture](RELATION-VISUALIZATION.md). No publication, commit, push, native
packaging, sync or installation was performed.

## Previous update — interactive relation prototype, 2026-10-05

Implemented the audited phi `S/A` relation with labelled 3D segments, a common
13-position selector/result panel, proportional length bars and a four-step
explanation with pause/resume/manual navigation and return to the normal scene.
The other twelve positions explicitly report that their 3D scenes are pending.
See [current status and local preview instructions](status-aktualizacji.md) and
[extension contract](RELATION-VISUALIZATION.md). Typecheck, 35 tests and local
web/Android-assets/Pages builds pass. Browser review covers desktop and narrow
phone viewports; it does not establish physical Android UX/offline validation.
No commit, push, publication, native packaging or installation was performed.

## Previous update — mathematical audit, 2026-10-05

Stage 1 has been completed with explicit unresolved findings. The current
status is [status-aktualizacji.md](status-aktualizacji.md); the full audit is
[matematyka-13-stalych.md](matematyka-13-stalych.md). Independent calculations
confirm 12/13 comparisons within 0.1% for 11:7 and 10/13 for Golden Egg.
Only the square-base sqrt(2) relation is an exact target identity for 11:7.
The report documents dependencies, workbook/engine differences, the oval
derivation, limitations of Brun's reference and the incorrect `rmsAngle` result.
Existing regression tests pass 25/25. No application or workbook changes,
commit, push, build, device validation or publication were performed.

## Historical planning baseline

Recorded: 2026-10-05, before the audit above. Scope of that earlier stage:
planning only. The remainder preserves its evidence and then-proposed next step;
use the linked current status for work completed since that baseline.

## Repository and instructions

The application root is `C:\Users\user\Documents\ChatGPT\Piramida\android-offline`.
It is a separate Git repository on `feature/android-offline`, at
`a11489c5b0995ded8f3e06fdd1405598f6bcb2f1` (`Add offline Capacitor Android release build`).
Before this session it was clean. Its configured remote is
`https://github.com/MichaelZP/great-pyramid-11-7-lab.git`.
HEAD and the locally cached `origin/feature/android-offline` have zero commits
of divergence. No fetch was performed; this is not confirmation of live remote state.

The parent `Piramida` directory also contains a Git repository: branch `master`,
no commits, with the application directory and two review PNGs untracked.
Use Git from the application root. Preserve those existing parent files.
No applicable `AGENTS.md` was found. Project READMEs, technical docs, package
scripts, Vite/Capacitor configuration, CI and engine/tests were inspected.

## Application baseline

React 19 / TypeScript / Vite web application, Three.js with React Three Fiber,
Zustand state and a Capacitor Android wrapper. Seven presets include 11:7,
Golden Egg and a custom ratio. The UI contains models, constant comparisons,
angle scan and a weighted verdict; English/Polish text and stereo controls exist.

The code and mathematical documentation contain all **13** comparison rows.
The complete sourced list and formulas are in [PLAN.md](PLAN.md).
Existing regression expectations specify **12/13** within 0.1% for 11:7 and
**10/13** for Golden Egg. The egg row is outside tolerance for 11:7 at about
0.106%; Golden Egg's maximum row error is about 0.397%. These are software
results requiring independent mathematical review, not evidence of a physical
function or historical intention.

The precise affirmative hypothesis about the construction's function was not
found in the inspected files. It must be supplied or confirmed by the author.
Rainbow bands and the cone/egg scene contain schematic presentation choices;
the numeric egg and displayed egg use different parameterizations.

Known issues are recorded in the plan: π perimeter wording, Node requirements,
twelve/13 labels, section terminology, scan step and source/score verification.
No behavior, source code, package metadata, existing docs or configuration was changed.

## Local startup

Use **Node.js ≥22**, matching `package.json` and the Android instructions;
CI currently uses Node 22. The READMEs' Node 20 allowance is inconsistent.
From PowerShell:

```powershell
Set-Location 'C:\Users\user\Documents\ChatGPT\Piramida\android-offline'
# For a fresh setup, install the locked dependencies:
npm ci
npm run dev
```

Vite binds port 8080 with `strictPort: true`; open `http://localhost:8080/`.
If the port is occupied, startup fails rather than choosing another port.
Dependencies already exist locally; this session did not reinstall them.

Existing checks: `npm run typecheck`, `npm run test:run`.
Standard production flow: `npm run build`, then `npm run preview`.
Vite base is `/` normally, `/great-pyramid-11-7-lab/` when
`GITHUB_PAGES=true`, and `./` for `npm run build:android`.
Capacitor consumes `dist/`. Android additionally requires JDK 21 and SDK 36
(minimum Android SDK 24); see [ANDROID_OFFLINE.md](ANDROID_OFFLINE.md).
Android sync, signing, installation and publication are not part of this session.

## Verification boundaries

The PATH Node executable reports v20.15.0, below the declared requirement.
The first npm version probe was blocked by sandbox access (`EPERM`). A separate
check used the bundled Node v24.19.0 outside the sandbox; npm reports 10.7.0.
With bundled Node v24.19.0, direct invocation of the installed TypeScript
`tsc --noEmit` completed without diagnostics, and the installed Vitest runner
completed successfully: **1 test file, 25/25 tests passed**. These checks validate
the current implementation, not the independent truth of its interpretations.
Final Git status contains exactly three new, untracked documents:
`AUTHORSHIP.md`, `docs/PLAN.md`, `docs/STATUS.md`; tracked-file diff is empty.
No files were staged or committed, and no push or publication was performed.
No application browser/Android launch, visual validation, build, workbook-cell
audit or external-reference review is claimed for this session.

## One next step

Perform **Stage 1: an independent, documentation-only audit of all 13 relations**,
including worksheet/cell provenance from both workbooks and the numerical egg
derivation. Produce an audit report without changing the engine, UI or publishing.
Stages involving the author's function hypothesis remain open until its wording
is available; this does not block the mathematical audit.

## Next-session instruction

> Read `docs/PLAN.md`, `docs/STATUS.md` and `AUTHORSHIP.md` in `android-offline`,
> check applicable instructions and current Git status, then do Stage 1 only.
> Verify all 13 rows independently against code, documentation and both workbooks;
> identify sources, assumptions, dependencies and discrepancies. Do not invent
> the author's function hypothesis, modify application behavior, commit, push or publish.
