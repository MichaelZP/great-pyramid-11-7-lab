import { useEffect, useRef } from "react";
import { SceneMount } from "@/components/scene/SceneMount";
import { useLabStore, type LabTab } from "@/store/lab-store";
import { MODELS } from "@/lib/pyramid/engine";
import { useI18n } from "@/hooks/use-i18n";
import { t as translate } from "@/lib/i18n";
import { LabHeader } from "./LabHeader";
import { ModelRail } from "./ModelRail";
import { ConstantsPanel } from "./ConstantsPanel";
import { ScanPanel } from "./ScanPanel";
import { VerdictPanel } from "./VerdictPanel";
import { cn } from "@/lib/utils";
import { useRelationLesson } from "@/hooks/use-relation-lesson";
import { useTutorial } from "@/hooks/use-tutorial";
import { useTutorialStore } from "@/store/tutorial-store";

export function AppShell() {
  useRelationLesson();
  useTutorial();
  const mobileTab = useLabStore((s) => s.mobileTab);
  const setMobileTab = useLabStore((s) => s.setMobileTab);
  const setModel = useLabStore((s) => s.setModel);
  const locale = useLabStore((s) => s.locale);
  const sceneFullscreen = useLabStore((s) => s.sceneFullscreen);
  const setSceneFullscreen = useLabStore((s) => s.setSceneFullscreen);
  const { t } = useI18n();
  const mainRef = useRef<HTMLElement>(null);

  const tabs: { id: LabTab; label: string }[] = [
    { id: "modele", label: t("tabModels") },
    { id: "stale", label: t("tabConstants") },
    { id: "skan", label: t("tabScan") },
    { id: "werdykt", label: t("tabVerdict") },
  ];

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem("lab-locale", locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lab-locale");
      if (saved === "pl" || saved === "en") {
        useLabStore.getState().setLocale(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const enter = () => {
      const req =
        root.requestFullscreen ??
        (
          root as HTMLElement & {
            webkitRequestFullscreen?: () => Promise<void> | void;
          }
        ).webkitRequestFullscreen;
      try {
        if (!req) { setSceneFullscreen(false); return; }
        void Promise.resolve(req.call(root)).catch(() => setSceneFullscreen(false));
      } catch {
        setSceneFullscreen(false);
      }
    };
    const exit = () => {
      const doc = document as Document & {
        webkitExitFullscreen?: () => Promise<void> | void;
        webkitFullscreenElement?: Element;
      };
      if (document.fullscreenElement || doc.webkitFullscreenElement) {
        try {
          const exitFullscreen = doc.exitFullscreen ?? doc.webkitExitFullscreen;
          void Promise.resolve(exitFullscreen?.call(doc)).catch(() => { /* rejected by host */ });
        } catch {
          /* ignore */
        }
      }
    };
    if (sceneFullscreen) enter();
    else exit();
  }, [sceneFullscreen]);

  useEffect(() => {
    const onFs = () => {
      const active = Boolean(
        document.fullscreenElement ??
          (document as Document & { webkitFullscreenElement?: Element })
            .webkitFullscreenElement,
      );
      if (!active) setSceneFullscreen(false);
    };
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("webkitfullscreenchange", onFs);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      document.removeEventListener("webkitfullscreenchange", onFs);
    };
  }, [setSceneFullscreen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("input, select, textarea, [contenteditable=true]")) return;
      if (e.key === "Escape") {
        useTutorialStore.getState().close();
        useLabStore.getState().selectRelation(null);
        setSceneFullscreen(false);
        return;
      }
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        useLabStore.getState().toggleSceneFullscreen();
        return;
      }
      const n = Number(e.key);
      if (n >= 1 && n <= MODELS.length) {
        const model = MODELS[n - 1];
        if (model) setModel(model.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setModel, setSceneFullscreen]);

  useEffect(() => {
    let disposed = false;
    let remove: (() => Promise<void>) | undefined;
    void Promise.all([import("@capacitor/core"), import("@capacitor/app")]).then(
      async ([{ Capacitor }, { App }]) => {
        if (!Capacitor.isNativePlatform() || disposed) return;
        const listener = await App.addListener("backButton", () => {
          const state = useLabStore.getState();
          if (state.sceneFullscreen) {
            state.setSceneFullscreen(false);
          } else if (useTutorialStore.getState().open) {
            useTutorialStore.getState().close();
          } else if (state.relationId) {
            state.selectRelation(null);
          } else if (state.mobileTab !== "modele") {
            state.setMobileTab("modele");
          } else if (window.confirm(translate(useLabStore.getState().locale, "confirmExit"))) {
            void App.exitApp();
          }
        });
        if (disposed) void listener.remove();
        else remove = () => listener.remove();
      },
    );
    return () => {
      disposed = true;
      void remove?.();
    };
  }, []);

  return (
    <main ref={mainRef} className="relative h-dvh overflow-clip bg-bg text-fg">
      <div className={cn("lab-scene absolute inset-x-0 top-36 bottom-[48dvh] lg:inset-0", sceneFullscreen && "inset-0")}>
        <SceneMount />
      </div>

      <LabHeader />

      {!sceneFullscreen ? (
        <>
          <aside className="panel pointer-events-auto absolute top-36 bottom-4 left-4 hidden w-[22.5rem] overflow-y-auto rounded-xl p-4 lg:block">
            <ModelRail />
          </aside>

          <aside className="panel pointer-events-auto absolute top-28 right-4 bottom-52 hidden w-[24rem] overflow-y-auto rounded-xl p-4 lg:block">
            <ConstantsPanel />
          </aside>

          <section className="panel pointer-events-auto absolute right-4 bottom-4 left-[calc(22.5rem+2rem)] hidden h-44 rounded-xl p-3 lg:block">
            <div className="grid h-full grid-cols-[minmax(0,1.3fr)_minmax(16rem,0.9fr)] gap-4">
              <ScanPanel />
              <div className="overflow-y-auto pr-1">
                <VerdictStrip />
              </div>
            </div>
          </section>

          <div className="mobile-panel pointer-events-none absolute inset-x-0 bottom-0 z-20 lg:hidden">
            <div className="mobile-panel-content pointer-events-auto max-h-[48dvh] overflow-hidden rounded-t-xl bg-bg-elevated pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-border)]">
              <nav className="flex overflow-x-auto border-b border-border">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setMobileTab(tab.id)}
                    aria-pressed={mobileTab === tab.id}
                    className={cn(
                      "min-h-11 min-w-0 flex-1 px-1 text-xs font-medium sm:px-2 sm:text-sm",
                      mobileTab === tab.id
                        ? "bg-bg-subtle text-fg"
                        : "text-muted",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
              <div className="mobile-panel-body max-h-[min(40dvh,calc(48dvh-3rem-env(safe-area-inset-bottom)))] overflow-y-auto p-3 sm:p-4">
                {mobileTab === "modele" ? <ModelRail /> : null}
                {mobileTab === "stale" ? <ConstantsPanel /> : null}
                {mobileTab === "skan" ? (
                  <div className="h-64">
                    <ScanPanel />
                  </div>
                ) : null}
                {mobileTab === "werdykt" ? <VerdictPanel /> : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}

function VerdictStrip() {
  return (
    <div className="h-full overflow-y-auto">
      <VerdictPanel />
    </div>
  );
}
