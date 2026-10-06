# Materials, attribution and licences — stage 12

Concept: **Michał Przybylski — prylski.dev**, https://github.com/MichaelZP/.
Lab credit, READMEs, AUTHORSHIP.md and CITATION.cff agree. Constants/prior results, optics and software are attributed separately. Philip Laven/Rich Jarvis/Alan Green acknowledgements record references/inspiration, not endorsement or transfer of authorship.

## Project/materials

No project open-source licence has been assigned. This audit grants no new licence. The author decides licensing/permissions for the project, supplied workbooks/private correspondence and other supplied material before public distribution. A draft PR does not settle those rights.

Reviewed app textures/labels are locally generated CanvasTexture, fonts are system fonts, icons Lucide, geometry procedural. Static previews use local Canvas/SVG/JS without new dependencies. Screenshots are captures of the previews. No new external photo/font/audio/video/article/PDF was incorporated. Workbooks/private correspondence are existing author-supplied sources; origin/permission is not independently established by this audit. History separates mathematics, source claims and interpretation. Linked works are not bundled offline. See [history](HISTORY-13.md), [correspondence](OPTICAL-CORRESPONDENCE.md).

## npm inventory/notices

[dependencies.json](etap-12/dependencies.json) covers every lock entry, installed version, declared licence/notice. The production scope is the **113 non-dev package superset**, not tree-shaken artifact analysis: MIT 87, Apache-2.0 6, ISC 15, BSD-3-Clause 3, 0BSD 1, MIT AND ISC 1. Exact versions/direct-transitive status are recorded. No installed/lock version mismatch was found. Native/tool packages remain listed even if npm classifies them dev.

Direct app dependencies React/React DOM, Three, fiber/drei, Recharts, Zustand, Radix Slot, CVA, clsx, lucide-react and tailwind-merge declare MIT; Capacitor App/Core declare Apache-2.0.

[third-party-notices.txt](../public/third-party-notices.txt) preserves available verbatim copyright/licence texts and is copied into Vite builds; it grants no project rights. It includes ISC notices of vendored d3 in victory-vendor. Missing archive notices for fiber 9.7.0, draco3d 1.5.7 and victory-vendor 36.9.2 were obtained from official version-tagged upstream files; [sources.json](etap-12/upstream-notices/sources.json) records URLs/SHA-256.

**Unresolved full-notice evidence:**

| Package | Declared licence | Gap |
|---|---|---|
| @mediapipe/tasks-vision 0.10.17 | Apache-2.0 | Complete licence/notice not in archive; authoritative version-specific text not established |
| maath 0.10.8 | MIT | Full copyright/licence absent; authoritative version-specific text not established |
| stats-gl 2.4.2 | MIT | Full copyright/licence absent; published git revision lacked root licence |

Declarations alone are not a full notice audit. Before public distribution, obtain authoritative notices or show whether these dependencies are absent from the shipped artifact and fulfil applicable notice requirements. This is a publication gate, not a claim that every listed library executes in these scenes. **Maven/Gradle/native dependencies are outside this inventory** and need audit before APK distribution.

Reproduce after `npm ci`: `python docs/etap-12/audit_dependencies.py`. Local files plus recorded upstream notices; exit 1 while gaps remain. `fetch_missing_notices.py` records version-specific retrievals, requires internet and does not install packages/choose project licensing. Failed retrieval records stay unresolved.
