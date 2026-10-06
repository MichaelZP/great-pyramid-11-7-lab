# Author acceptance — stage 12 test version

Concept: **Michał Przybylski — prylski.dev**, https://github.com/MichaelZP/.
[Scope/evidence](ETAP-12.md). Record reviewer/date, branch/commit, browser/device/orientation and PASS/FAIL/UNVERIFIED per item. Builds/screenshots are not device acceptance.

## Start

### Phone preview over the internet

The author separately authorized a GitHub Pages test preview after stage 12:
[open the review hub](https://michaelzp.github.io/great-pyramid-11-7-lab/preview/etap-12/).
It links the lab, current stage 9 cones and stages 10/11 vortices. No local
computer, shared Wi-Fi or installation is needed; use an internet connection.
This is a separate test path, not a replacement of the existing Pages root.
For animation, if reduced motion is enabled, uncheck **Ograniczony ruch**, then
press **Odtwórz**. Physical-phone results still need recording in the checklist.

### Local development preview

Two terminals in `android-offline`, Node ≥22 and Python 3. Dependency installation uses the lockfile:

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Open [application](http://127.0.0.1:8080/). Second terminal:

```sh
python -m http.server 8088 --bind 127.0.0.1 --directory docs
```

Open [stage 9 cones](http://127.0.0.1:8088/etap-7/podglad.html), [stage 10 tori](http://127.0.0.1:8088/etap-10/podglad.html) or [stage 11 vortices](http://127.0.0.1:8088/etap-11/podglad.html). They are separate pages, not included in the main build. Stop servers with Ctrl+C. Audit-session servers may already be running; use their existing URLs if ports are occupied.

For a phone on a trusted LAN, start Vite with `npm run dev` and docs with `python -m http.server 8088 --bind 0.0.0.0 --directory docs`; use the computer's LAN IP and the same ports. Keep access within the intended LAN. Bibliography needs internet. For native offline acceptance follow [Android instructions](ANDROID_OFFLINE.md), build a new debug APK, and test it. Old APKs/web viewports do not validate this revision. No APK was built/installed in stage 12; prototypes are not Android assets.

## Checklist

| # | Item | Expected result | Author result |
|---|---|---|---|
| 1 | Cold load, PL/EN | Scene, controls, concept credit/source attribution visible | Pending |
| 2 | All 13 positions, four steps each | Formula/result/target/error agree; valid labelled geometry, no stale labels | Pending |
| 3 | 11:7 at 0.1% | 12/13; φ 1.618590346797 / error 0.034384818%; L/W 1.619742960852 / error 0.105620285%, outside | Pending |
| 4 | Dimensions/angles | A=OM, H=OV, S=MV, B=NC, D=KC, E=CV; copied lengths for sums; e/e−1 use complementary angles; L/W belongs to oval | Pending |
| 5 | π→φ→e→L/W→normal view | Old labels disappear; scene/camera preferences restore | Pending |
| 6 | Nine tutorial steps, jump, close/reopen/restart/reload | Correct construction and saved progress; tutorial optional | Pending |
| 7 | Reduced motion off: 4.2 s lesson /18 s tutorial, pause/hide/model change | Finite playback, timers cancel; reduced motion does not auto-play | Pending |
| 8 | PL/EN history/sources, all 13 | Concept/symbol history separate from pyramid interpretation; internet boundary clear | Pending |
| 9 | Seven presets, custom ratio/angle/opacity | Live geometry/errors, exact φ by construction, Golden Egg 10/13 | Pending |
| 10 | Scan/ranking | Visible curve; chosen weights/preference disclaimer, no historical probability claim | Pending |
| 11 | Hologram/rainbow/dimensions/stone/rotation/stereo/eye swap | Toggle/restore, readable geometry in both eyes | Pending |
| 12 | Mouse/touch camera, expanded scene/Escape/Back/fullscreen | Orbit/pan/zoom and exit reachable; native fullscreen separately verified | Pending |
| 13 | 320/390 portrait, 844×390 landscape; panel scroll | Toolbar reachable, usable model beside landscape controls, no horizontal overflow | Pending |
| 14 | Stage 9 A/B × four cuts, q/α/radius, 0/50/100%, reflection/layers | Uniform scale/axial centres; q preserves placement, oval/ellipse distinction, invalid-input error | Pending |
| 15 | Stage 9 play/pause/resume/reset/reduced motion | Two systems share one clock; frozen phase; reset restores | Pending |
| 16 | Stage 10/11 top/side/3D, layers/paths | R=2.4/r=.65, z=5/9 at d=4; T1 θ+,ψ+, T2 θ−,ψ−; closed paths | Pending |
| 17 | Stage 11 modes/particles/trails/glow/deformation at zero/max | Round T1/square T2, opposite motion; no reversed direction, collision or solver claim | Pending |
| 18 | Stage 11 pause/reset/camera auto/manual/quality | Phase/effects/camera freeze; manual disables auto; reset and bounded load | Pending |
| 19 | Keyboard, screen reader, contrast | Named/selected controls, no focus trap; record gaps | Pending |
| 20 | Phone: ≥5 min stage 11, ≥60 s main rotation/stereo, resume | Record stalls, measured FPS/frame times if available, heat/memory; CPU time is not FPS | Unverified |
| 21 | New APK, airplane-mode cold start, touch/orientation/Back/fullscreen/resume | Main lab offline; bibliography internet notice; record build/device without serials | Unverified |
| 22 | Creative/licence review | Decide A/B/α/q, appearance, hypothesis wording/evidence and licence; resolve notice gaps | Pending |

Torus placement/directions were accepted before stage 12; item 16 checks preservation. Appearance choices remain open. Do not treat vortices as Navier–Stokes solutions or proof of operation.

## Repeat automatic checks

```sh
npm run typecheck
npm run test:run
node --test docs/etap-7/animation.test.mjs docs/etap-10/vortex.test.mjs docs/etap-11/particles.test.mjs
npm run build
npm run build:android
```

Pages: set `GITHUB_PAGES=true` in the terminal environment, then `npm run build -- --outDir dist-pages`. No lint script. Numerical audits: `python docs/audit-13/verify.py` (mpmath/openpyxl) and `python docs/etap-7/verify.py` (standard library).
`python docs/etap-12/audit_dependencies.py` regenerates inventory/notices and intentionally returns **1** while the three documented notice gaps remain.
