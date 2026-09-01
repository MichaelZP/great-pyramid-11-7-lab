import { useEffect, useRef } from "react";
import { SceneMount } from "@/components/scene/SceneMount";
import { useLabStore, type LabTab } from "@/store/lab-store";
import { MODELS } from "@/lib/pyramid/engine";
import { useI18n } from "@/hooks/use-i18n";
import { LabHeader } from "./LabHeader";
import { ModelRail } from "./ModelRail";
import { ConstantsPanel } from "./ConstantsPanel";
import { ScanPanel } from "./ScanPanel";
import { VerdictPanel } from "./VerdictPanel";
import { cn } from "@/lib/utils";

export function AppShell() {
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
        void req?.call(root);
      } catch {
        /* iframe / permission */
      }
    };
    const exit = () => {
      const doc = document as Document & {
        webkitExitFullscreen?: () => Promise<void> | void;
      };
      if (document.fullscreenElement || doc.webkitExitFullscreen) {
        try {
          void (document.exitFullscreen?.() ?? doc.webkitExitFullscreen?.());
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
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "Escape") {
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

  return (
    <main ref={mainRef} className="relative h-dvh overflow-hidden bg-bg text-fg">
      <div className="absolute inset-0">
        <SceneMount />
      </div>

      <LabHeader />

      {!sceneFullscreen ? (
        <>
          <aside className="panel pointer-events-auto absolute top-28 bottom-4 left-4 hidden w-[22.5rem] overflow-y-auto rounded-xl p-4 lg:block">
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

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 lg:hidden">
            <div className="pointer-events-auto max-h-[48dvh] overflow-hidden rounded-t-xl bg-bg-elevated shadow-[var(--shadow-border)]">
              <nav className="flex border-b border-border">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setMobileTab(tab.id)}
                    className={cn(
                      "min-h-11 flex-1 px-2 text-sm font-medium",
                      mobileTab === tab.id
                        ? "bg-bg-subtle text-fg"
                        : "text-muted",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
              <div className="max-h-[40dvh] overflow-y-auto p-4">
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
