import { useMemo } from "react";
import { useLabStore } from "@/store/lab-store";
import {
  MODELS,
  snapshotFor,
  allSnapshots,
  getScan,
  scanMinima,
  geoFromBH,
  type ModelSnapshot,
} from "@/lib/pyramid/engine";

export function useActiveModel() {
  const modelId = useLabStore((s) => s.modelId);
  return MODELS.find((m) => m.id === modelId) ?? MODELS[1]!;
}

export function useActiveSnapshot(): ModelSnapshot {
  const modelId = useLabStore((s) => s.modelId);
  const customBH = useLabStore((s) => s.customBH);
  const tolerance = useLabStore((s) => s.tolerance);
  const model = MODELS.find((m) => m.id === modelId) ?? MODELS[1]!;
  return useMemo(
    () => snapshotFor(model, customBH, tolerance),
    [model, customBH, tolerance],
  );
}

export function useAllSnapshots(): ModelSnapshot[] {
  const customBH = useLabStore((s) => s.customBH);
  const tolerance = useLabStore((s) => s.tolerance);
  return useMemo(
    () => allSnapshots(customBH, tolerance),
    [customBH, tolerance],
  );
}

export function useScanData() {
  const tolerance = useLabStore((s) => s.tolerance);
  return useMemo(() => {
    const points = getScan(undefined, undefined, 0.001, tolerance);
    return { points, minima: scanMinima(points) };
  }, [tolerance]);
}

export function useCustomGeo() {
  const customBH = useLabStore((s) => s.customBH);
  return useMemo(() => geoFromBH(customBH), [customBH]);
}
