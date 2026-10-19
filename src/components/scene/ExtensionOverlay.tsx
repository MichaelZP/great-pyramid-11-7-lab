import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { useActiveSnapshot } from "@/hooks/use-lab";
import { useExtensionStore, type ExtensionId } from "@/store/extension-store";
import { pyramidSegments } from "@/lib/pyramid/relation-geometry";
import type { Point3, SegmentId } from "@/lib/pyramid/relations";
import { EXTENSION_COLORS as C, eggLimit, inscribedSphere, type EggLimit } from "@/lib/pyramid/geometric-extensions";
import { Label, useOvalMeshes, type LessonView } from "./RelationOverlay";

const BASE = 2;
const overlay = { depthTest: false, depthWrite: false } as const;

export function useExtensionView(id: ExtensionId | null): LessonView | null {
  const { size } = useThree();
  const mobile = size.width < 1024;
  return useMemo(() => {
    if (!id) return null;
    const key = `${id}:${mobile ? "m" : "d"}`;
    // Looking roughly along the section plane's normal so the oval is seen face-on, not edge-on.
    if (id === "eggLimit") { const d = mobile ? 6.4 : 8.2; return { key, position: [-0.7 * d, 1.25 + 0.62 * d, 0.36 * d], target: [0, 1.25, 0] }; }
    if (id === "inSphere") return { key, position: mobile ? [4.6, 1.9, 2.8] : [6.2, 2.4, 3.8], target: [0, 0.55, 0.15] };
    return { key, position: [3.3, 2.7, mobile ? 4.7 : 6.8], target: [0, 0.58, 0.2] };
  }, [id, mobile]);
}

export function ExtensionGeometry({ id }: { id: ExtensionId }) {
  if (id === "eggLimit") return <EggLimitGeometry />;
  if (id === "inSphere") return <InSphereGeometry />;
  return <Why117Geometry />;
}

/* ───────────── 1. Golden egg limit ───────────── */

/** On-screen length of L; the eggLW lesson shows Z₀ = 7.65 at about this size. */
const DISPLAY_L = 2.33;

function EggLimitGeometry() {
  const snap = useActiveSnapshot();
  const z0 = useExtensionStore((s) => s.z0);
  const e = useMemo(() => eggLimit(snap.geo, z0), [snap.geo, z0]);
  // Outside the domain nothing is drawn: no oval, no NaN, no unbounded branch.
  if (!e.ok) return <Label text={`Z₀ ≤ 2√t`} at={[0, 1.25, 0]} color={C.limit} />;
  return <EggOval e={e} />;
}

function EggOval({ e }: { e: Extract<EggLimit, { ok: true }> }) {
  const { oval, chord } = e;
  // One uniform scale (no per-axis stretch), so the drawn proportions are the real ones.
  const scale = DISPLAY_L / oval.L;
  const cx = (oval.length[0][0] + oval.length[1][0]) / 2;
  const { mapPoint, surface, plane } = useOvalMeshes(oval, scale, { pad: 0.08 * oval.L, hx: 0.62 * chord, hy: 0.58 * chord, cx });
  const L = oval.length.map(mapPoint) as [Point3, Point3];
  const W = oval.width.map(mapPoint) as [Point3, Point3];
  const xm = oval.width[0][0], zm = oval.width[0][2];
  // Auxiliary width L/(S/A) = b − a, drawn dashed beside W; W is always shorter.
  const offset = 0.04 / scale;
  const aux = ([[xm + offset, -chord / 2, zm + offset * oval.t], [xm + offset, chord / 2, zm + offset * oval.t]] as Point3[]).map(mapPoint);
  return <group>
    <mesh geometry={surface}>
      <meshStandardMaterial color="#c5ccd4" transparent opacity={0.12} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
    <mesh geometry={plane}>
      <meshBasicMaterial color="#8eafaa" transparent opacity={0.08} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
    <Line points={oval.contour.map(mapPoint)} color="#ece8e1" lineWidth={2} {...overlay} renderOrder={20} />
    <Line points={L} color={C.L} lineWidth={4} {...overlay} renderOrder={25} />
    <Line points={W} color={C.W} lineWidth={4} {...overlay} renderOrder={25} />
    <Line points={aux} color={C.limit} lineWidth={2} dashed dashSize={0.07} gapSize={0.05} {...overlay} renderOrder={26} />
    <Label compact text="L" color={C.L} at={[(L[0][0] + L[1][0]) / 2 + 0.32, (L[0][1] + L[1][1]) / 2 + 0.17, -0.1]} />
    <Label compact text="W" color={C.W} at={[W[0][0] - 0.15, W[0][1] + 0.15, W[0][2] - 0.18]} />
    <Label compact text="L/(S/A)" color={C.limit} at={[aux[1][0] + 0.1, aux[1][1] + 0.12, aux[1][2] + 0.28]} />
  </group>;
}

/* ───────────── 2. Inscribed sphere ───────────── */

function seg(from: Point3, to: Point3, color: string, on: boolean, dashed = false) {
  return <Line points={[from, to]} color={color} lineWidth={on ? 4 : 1.5} transparent opacity={on ? 1 : 0.35}
    dashed={dashed} dashSize={0.05} gapSize={0.04} {...overlay} renderOrder={on ? 26 : 22} />;
}

function Dot({ at, name, offset = [-0.1, 0.06, -0.06] }: { at: Point3; name: string; offset?: Point3 }) {
  return <group>
    <mesh position={at} renderOrder={27}>
      <sphereGeometry args={[0.022, 12, 12]} />
      <meshBasicMaterial color="#ece8e1" depthTest={false} depthWrite={false} />
    </mesh>
    <Label compact text={name} at={[at[0] + offset[0], at[1] + offset[1], at[2] + offset[2]]} />
  </group>;
}

function InSphereGeometry() {
  const snap = useActiveSnapshot();
  const step = useExtensionStore((s) => s.step);
  const s = useMemo(() => inscribedSphere(snap.geo.bh, BASE), [snap.geo.bh]);
  const { O, V, M, I, T } = s.points;
  const circle = useMemo(() => Array.from({ length: 97 }, (_, i): Point3 => {
    const a = (i / 96) * 2 * Math.PI;
    return [0, s.r + s.r * Math.sin(a), s.r * Math.cos(a)];
  }), [s.r]);
  const all = step === 3;
  return <group>
    <mesh position={I} renderOrder={10}>
      <sphereGeometry args={[s.r, 48, 32]} />
      <meshStandardMaterial color={C.sphere} transparent opacity={step === 0 ? 0.3 : 0.16} depthWrite={false} roughness={0.6} />
    </mesh>
    <Line points={circle} color={C.sphere} lineWidth={step === 0 ? 2.5 : 1.2} transparent opacity={0.9} {...overlay} renderOrder={21} />
    {seg(O, M, "#9a958c", step === 0)}{seg(M, V, "#9a958c", step === 0)}{seg(O, V, "#9a958c", step === 0)}
    {step >= 1 ? <>{seg(O, I, C.OI, step === 1 || all)}{seg(I, V, C.VI, step === 1 || all)}
      {step === 1 || all ? <><Label compact color={C.OI} text="r" at={[-0.12, s.r / 2, -0.1]} /><Label compact color={C.VI} text="H − r" at={[-0.2, (s.r + s.H) / 2, -0.1]} /></> : null}</> : null}
    {step >= 2 ? <>{seg(M, T, C.MT, step === 2 || all)}{seg(T, V, C.VT, step === 2 || all)}{seg(O, M, C.MT, step === 2 || all, true)}
      {seg(I, T, C.sphere, false)}
      {step === 2 || all ? <><Label compact color={C.MT} text="MT = A" at={[0.05, (M[1] + T[1]) / 2 + 0.05, (M[2] + T[2]) / 2 + 0.32]} />
        <Label compact color={C.VT} text="S − A" at={[0.05, (V[1] + T[1]) / 2 + 0.08, (V[2] + T[2]) / 2 + 0.28]} /></> : null}</> : null}
    <Dot at={O} name="O" offset={[-0.08, -0.1, -0.08]} />
    <Dot at={V} name="V" offset={[0, 0.13, 0]} />
    <Dot at={M} name="M" offset={[0, -0.1, 0.1]} />
    <Dot at={I} name="I" offset={[-0.1, 0.02, -0.12]} />
    {step >= 2 ? <Dot at={T} name="T" offset={[0, 0.08, 0.12]} /> : null}
  </group>;
}

/* ───────────── 3. Why 11:7 ───────────── */

function Why117Geometry() {
  const snap = useActiveSnapshot();
  const step = useExtensionStore((s) => s.step);
  const { points, segments } = pyramidSegments(snap.geo.bh, BASE);
  const active: SegmentId[] = step === 0 ? ["B", "H"] : step === 1 ? ["S", "A"] : ["B", "H", "S", "A"];
  const colors: Partial<Record<SegmentId, string>> = { B: C.B, H: C.H, S: C.S, A: C.A };
  const shown = segments.filter((x) => x.id in colors);
  const used = new Set(shown.flatMap((x) => x.ends));
  return <group>
    {shown.map((x) => { const on = active.includes(x.id); return <group key={x.id}>
      <Line points={[x.from, x.to]} color={colors[x.id]} lineWidth={on ? 4 : 1} transparent opacity={on ? 1 : 0.3} {...overlay} renderOrder={on ? 25 : 20} />
      {on ? <Label text={x.id === "B" ? "B (×2)" : x.id} color={colors[x.id]} at={x.labelAt} /> : null}
    </group>; })}
    {Object.entries(points).filter(([n]) => used.has(n as keyof typeof points)).map(([n, at]) =>
      <Dot key={n} at={at} name={n} offset={[-0.09, n === "V" ? 0.12 : -0.04, n === "M" ? 0.1 : -0.06]} />)}
  </group>;
}
