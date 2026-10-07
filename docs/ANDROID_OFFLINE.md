# Android offline release

The Android package identity and displayed name are defined in `app-identity.json`.
Capacitor uses `dist/` from `npm run build:android`; that build alone uses a
relative Vite base. The normal Vite build and GitHub Pages base are unchanged.

Requirements: Node.js 22 or newer, JDK 21, Android SDK Platform 36, and the
Android build tools requested by Gradle.

```sh
npm ci
npm test -- --run
npm run build:android
npx cap sync android
cd android
./gradlew bundleRelease assembleDebug
```

Release signing reads `android/keystore.properties`, which must contain
`storeFile=pyramid-upload.jks`, `storePassword`, `keyAlias=pyramid_upload`, and
`keyPassword`. Both that file and `android/pyramid-upload.jks` are ignored by
Git. Back up both securely: losing the upload key can prevent future updates
without a Play Console key reset. Never commit either file or share passwords.

The signed bundle is `android/app/build/outputs/bundle/release/app-release.aab`.
The installable debug package is
`android/app/build/outputs/apk/debug/app-debug.apk`.

Offline asset audit: the Google Fonts stylesheet and its preconnects were
removed. The UI uses system fonts. The pyramid material and hologram textures
are generated locally with Canvas. The 3D scene uses local geometry and
lighting; it has no remote models, HDRI preset, or image fetch. There is no
analytics, advertising, Firebase, or login dependency. The merged Android
manifest must be checked for `android.permission.INTERNET` on every release.
The `http` strings remaining in generated web assets are SVG/MathML namespace
identifiers and library documentation/error links; none is an asset request.
