# Stage 13 — published web release 2.0.2, 2026-10-07

**Result: publication and scoped public checks PASS. No unresolved gate applies
to this accepted web artifact. Native/physical-device limits remain explicit.**

Concept: **Michał Przybylski — prylski.dev**, https://github.com/MichaelZP/.

## Acceptance and exact commits

The author explicitly accepted the stage 12 test version and authorized merge
and publication. The author also confirmed distribution and rights to materials
already contained in PR #3, retaining reserved rights/no open-source licence.
This does not assign a licence or approve an APK, YouTube or new educational work.

| State | Commit / evidence |
|---|---|
| Accepted implementation | `25281f5`; [stage 12 audit](ETAP-12.md) |
| Reviewed preview follow-up | `9895b67e6f6a4239954a21a1e1df05b0429073f0`; only packaging/inventory/docs after audit |
| Release preparation | `90727d3ba3ec3c5a948a8f834a50a91cc4ef8259`; version metadata, hub/builder, rights decision and existing phone report |
| PR #3 merge | `f6f5d32cc92a22964c342fe72aff4184c8ddf012`; both CI runs PASS, clean base, ready PR, matching head |
| Final source/tag | **`08aead2a2f3bb800db448822b5b374d8e1bbf62e` / `v2.0.2`** |
| Pages deployment | **`a600eb7eed17a695420eecfc4d41b848ef45a1d3`** |
| Previous main | `e5aeecce1457dd8b17a4d4c34161baedda182852` |
| Previous Pages | `3d78300ef428153ec826261ed5cff5f6661325c8` |

The historical changelog already had 2.0.1, although package.json had 2.0.0.
Before publishing, a metadata/docs-only follow-up corrected the new release to
2.0.2. No application/geometry change followed the accepted audit. Final source
CI passed. Tests/build are not physical-device evidence. The existing dirty
phone-report documents were reviewed, retained and included; parent-workspace
files were untouched. No force push was performed.

## Hosting and publication

- App: https://michaelzp.github.io/great-pyramid-11-7-lab/.
- All parts: https://michaelzp.github.io/great-pyramid-11-7-lab/wydanie/.
- Construction/reflection: https://michaelzp.github.io/great-pyramid-11-7-lab/etap-7/podglad.html.
- Artistic vortices: https://michaelzp.github.io/great-pyramid-11-7-lab/etap-11/podglad.html.
- Base vortices: https://michaelzp.github.io/great-pyramid-11-7-lab/etap-10/podglad.html.
- Public version/commit: https://michaelzp.github.io/great-pyramid-11-7-lab/release.json.

Existing GitHub Pages uses `gh-pages` at `/`, HTTPS, no custom domain. No DNS,
domain, provider or hosting configuration changed. No ruleset/required-review
policy was configured; both existing PR CI checks were nevertheless completed
before merge. Main merge triggered CI only. Exactly one normal Pages-branch push
published the build. Existing preview/etap-12 and older assets were preserved.
Documentation/GitHub release updates do not redeploy the site.

Final-source [CI](https://github.com/MichaelZP/great-pyramid-11-7-lab/actions/runs/37611551551)
PASS. [Pages build/deploy](https://github.com/MichaelZP/great-pyramid-11-7-lab/actions/runs/37611859019)
PASS; deployment completed 2026-10-07 13:07:02 Europe/Warsaw (11:07:02 UTC).

## Gates and validation

The author's rights/distribution decision resolves the applicable project/material
gate. Original XLSX/private correspondence/PDFs are excluded from the site build.
Available verbatim notices ship as third-party-notices.txt. The exact emitted
bundle has zero modules from @mediapipe/tasks-vision, maath and stats-gl; builder
rejects otherwise. This resolves the web artifact notice gate, not the full
npm/native inventory. No new APK is shipped; native notice/device gates remain.

| Check | Result and boundary |
|---|---|
| TypeScript | PASS |
| Application tests | 87/87 PASS |
| Prototype tests | 14/14 PASS, including geometry/current-frame reflection/clock/pause/reset/camera/quality |
| Independent mathematics | 60-digit audit/all 13 rows/both XLSX/JS and section verifier PASS; findings unchanged |
| CI | Both PR checks, merged-source check and final-version source check PASS; web/Android-assets/Pages builds included |
| Production artifact | Build PASS; local links PASS; no original XLSX/PDF; notice gate PASS |
| Candidate comparison | 17 runtime files match tested candidate; six prototype JS/CSS files differ only in checkout line endings |
| Public assets | 23/23 HTTP 200; every hash matches exact Pages Git blob. Differences from local artifact are only Git CRLF/LF normalization |
| Main UI | Public load and rendered 3D pyramid; PL/EN; all 13 selections and manual steps 1–4 with results/errors; nine tutorial steps/jump/close; ratio/angle/opacity sliders PASS |
| Construction UI | Playback reached 100%; moving phase observed 76% before pause, paused at 82.2%; endpoint/current reflection, second-system selector and reset to 0% PASS |
| Extended vortices | Film/educational modes; side/top views; distance/deformation sliders; active particles; play/pause/resume/reset; opposite-circulation labels and two visible torus layers PASS |
| Base vortices | Public page, play/pause/reset to 0% and no horizontal overflow PASS |
| Mobile layouts | Desktop IAB viewports 320×844, 390×844, 844×390; no page-level horizontal overflow. Scenes approx. 320×295, 390×295 and 490×246. Narrow toolbar/panels remain scrollable |
| Credit/sources | Required author credit and links visible in lab/hub/prototypes; L/W history/source links inspected. Not every external source endpoint was freshly fetched |
| Browser errors | No console exceptions observed during scoped production checks |

Evidence: [artifact](etap-13/artifact-check.json),
[production modules](etap-13/production-bundle-inventory.json),
[public assets](etap-13/public-assets.json),
[UI states](etap-13/browser-checks.json),
[390 px lab](etap-13/app-390.png), [landscape](etap-13/app-landscape.png),
[side-view vortices](etap-13/vortex-side-390.png).

## Known limits

The cone/vortex scenes are separate pages, not integrated lab/APK features.
Accepted prototype pages retain some historical local/acceptance captions.
The author's earlier [phone observations](etap-12/phone-2026-10-07.md) are manual
observations, including five minutes of subjectively smooth stage 11 playback.
The stage 13 IAB checks are desktop browser evidence, not new physical phone
touch/offline/Back/native-fullscreen/lifecycle or measured FPS/thermal/memory
acceptance. Screen reader/full WCAG and native APK acceptance remain unverified.
The browser host may show a screenshot from an earlier state; screenshots
illustrate geometry, while saved DOM states identify final tutorial/lesson steps.
Timed main-lesson/tutorial autoplay was not newly certified by these manual checks.
Large chunks and Three deprecation warnings remain. No material failure observed.

Math remains 11:7 12/13 at 0.1%, Golden Egg 10/13, oval L/W outside 0.1%.
Dependent results and chosen score weights are not historical probabilities.
Brun uncertainty, global uniqueness and historical/physical claims remain as in
stage 12. Vortices are artistic, not a Navier–Stokes solver or proof of operation.
No tolerance, direction or geometry gate was weakened. No YouTube publication.

## Rollback

Rollback was **rehearsed locally**, not applied to production. A separate clone
reverted the deployment with `--no-commit`; `git write-tree` exactly matched the
previous Pages tree `4cc64f873d8f2b1e64d6068de2ace0086ea6886b`. A complete bundle
was verified and a ZIP of the previous tree saved in the local TEMP directory.
Remote commit history remains the durable rollback source.

From a clean, separately cloned Pages checkout:

```sh
git clone --single-branch --branch gh-pages https://github.com/MichaelZP/great-pyramid-11-7-lab.git pyramid-pages-rollback
cd pyramid-pages-rollback
git pull --ff-only
git revert --no-edit a600eb7eed17a695420eecfc4d41b848ef45a1d3
git push origin gh-pages
```

Review later independent changes before applying the revert; resolve conflicts
deliberately. This creates a new commit and normal Pages deployment, without
force push, restoring the previous root and retaining its test preview. Wait for
Pages success and check both public root and preview. No rollback was necessary
for this release. An app/source rollback can be prepared separately if needed;
changing main alone does not redeploy this legacy Pages hosting.
