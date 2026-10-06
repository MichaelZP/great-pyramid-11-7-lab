# Short manual acceptance — test version

From the application root, with Node ≥22 and dependencies installed:

```sh
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:8080/`. This is a local test version, not the published
Pages version. For a phone on your own LAN, use `npm run dev` and the LAN URL
printed by Vite; stop the server after testing. Bibliography texts need internet.
For native offline acceptance, follow [Android build instructions](ANDROID_OFFLINE.md)
to build a new debug APK; old APKs do not contain this update.

1. On 11:7, expect **12/13 at 0.1%**. Select every position in Constants.
   Check formula, result, target, error and steps 1–4. For φ expect
   `1.618590346797`, error `0.034384818%`; for L/W expect
   `1.619742960852`, error `0.105620285%`, outside tolerance.
2. Check `A=OM`, `H=OV`, `S=MV`, `B=NC`, `D=KC`, `E=CV`.
   Sums show copied lengths; e/e−1 compare complementary angles, not arc
   lengths. L and W belong to the oval, not pyramid edges. Switch repeatedly
   between π, φ, e and L/W, then return: old labels must disappear and the
   original camera, rainbow and scene preferences must return.
3. Inspect all nine tutorial steps, skip/close, reopen, jump, restart and reload.
   Check history, sources and `Michał Przybylski — prylski.dev` in PL/EN.
   With reduced motion off, test 4.2 s lesson and 18 s tutorial progression,
   pause/resume, finite completion, tab hiding and a manual model change.
4. Test the seven presets, custom sliders, opacity, hologram, dimensions,
   stone, rainbow, rotate, stereo, swapped eyes and fullscreen exit/Escape.
   Exact φ should display zero φ error after rounding; Golden Egg is **10/13**.
5. On a physical Android phone, test portrait/landscape, touch orbit/pan/zoom,
   panel scrolling, Back and fullscreen. In a newly built APK, enable airplane
   mode, cold start, repeat the flow and background/resume. Observe sustained
   rotation and stereo for at least 60 s; record device, refresh rate, FPS/frame
   times if measured, stalls and thermal behavior. Record PASS/FAIL separately
   from browser viewport results. This device acceptance is still pending.
