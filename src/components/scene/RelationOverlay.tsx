import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Billboard, Line } from "@react-three/drei";
import * as THREE from "three";
import { useActiveSnapshot } from "@/hooks/use-lab";
import { useLabStore } from "@/store/lab-store";
import { relationSteps, RELATION_PRESENTATIONS, RELATION_COMPARISONS, relationMeasures, QUANTITY_SYMBOLS, SEGMENT_COLORS, type Point3 } from "@/lib/pyramid/relations";
import { pyramidSegments, angleArcs, ovalSection, comparisonChains } from "@/lib/pyramid/relation-geometry";
import type { ConstantId } from "@/lib/pyramid/engine";

// Canvas sprites use system fonts and need no network/font asset. They also work
// in the existing stereo renderer (unlike an HTML label over the mono canvas).
function Label({ text, at, compact = false }: { text: string; at: Point3; compact?: boolean }) {
  const sprite = useRef<THREE.Sprite>(null);
  const worldPosition = useMemo(() => new THREE.Vector3(), []);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.font = "500 72px Segoe UI, sans-serif";
    canvas.width = Math.max(128, Math.ceil(ctx.measureText(text).width + 40));
    ctx.fillStyle = "#12151a";
    ctx.fillRect(0, 0, canvas.width, 128);
    ctx.fillStyle = "#ece8e1";
    ctx.font = "500 72px Segoe UI, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, 66);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [text, compact]);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame(({ camera, size }) => {
    if (!sprite.current) return;
    sprite.current.getWorldPosition(worldPosition);
    const distance = worldPosition.distanceTo(camera.position);
    const worldHeight = 2 * distance * Math.tan(THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov / 2));
    const px = compact ? 22 : 26;
    const height = worldHeight * px / size.height;
    sprite.current.scale.set(height * texture.image.width / texture.image.height, height, 1);
  });
  return <sprite ref={sprite} position={at} renderOrder={30} name={text}>
    <spriteMaterial map={texture} depthTest={false} depthWrite={false} toneMapped={false} />
  </sprite>;
}

export function RelationGeometry({ id }: { id: ConstantId }) {
  if (id === "eggLW") return <OvalGeometry />;
  return <PyramidRelation id={id} />;
}

function PyramidRelation({ id }: { id: ConstantId }) {
  const { size } = useThree();
  const snap = useActiveSnapshot();
  const step = useLabStore((s) => s.lessonStep);
  const { points, segments } = pyramidSegments(snap.geo.bh);
  const presentation = RELATION_PRESENTATIONS[id];
  const angles = presentation.scene === "pyramid-angles";
  const active = step === null ? presentation.quantities : relationSteps(id)[step].segments;
  const shown = segments.filter((s) => angles ? ["A", "H", "S"].includes(s.id) : presentation.quantities.includes(s.id));
  const usedPoints = new Set(shown.flatMap((s) => s.ends));
  const arcs = angleArcs(snap.geo.bh);
  const measures = relationMeasures(id, snap.geo);
  const hasCopies = measures.rows.some((r) => r.terms.length > 1);
  const labelPoints = size.width >= 1024 || !hasCopies || angles || (step !== null && step < 2);
  return <group>
    {shown.map((segment) => <group key={segment.id}>
      <Line points={[segment.from, segment.to]} color={SEGMENT_COLORS[segment.id]}
        lineWidth={!angles && active.includes(segment.id) ? 4 : 1} transparent opacity={angles ? 0.65 : active.includes(segment.id) ? 1 : 0.25}
        depthTest={false} depthWrite={false} renderOrder={20} />
      {!angles && active.includes(segment.id) ? <Label text={`${segment.id} = ${segment.ends.join("")}`} at={segment.labelAt} /> : null}
    </group>)}
    {angles || id === "phi" ? <Line points={[[0, 0.12, 0], [0, 0.12, 0.12], [0, 0, 0.12]]}
      color={SEGMENT_COLORS.H} lineWidth={1.5} depthTest={false} depthWrite={false} renderOrder={20} />
      : null}
    {angles ? (["theta", "beta"] as const).map((q) => <group key={q}>
      <Line points={arcs[q].points} color={SEGMENT_COLORS[q]} lineWidth={active.includes(q) ? 4 : 1}
        transparent opacity={active.includes(q) ? 1 : 0.25} depthTest={false} depthWrite={false} renderOrder={25} />
      {active.includes(q) ? <Label compact text={QUANTITY_SYMBOLS[q]} at={q === "theta" ? [0.12, 0.18, 0.66] : [-0.15, points.V[1] - 0.27, 0.15]} /> : null}
    </group>) : null}
    {Object.entries(points).filter(([name]) => usedPoints.has(name as keyof typeof points)).map(([name, at]) => <group key={name}>
      <mesh position={at} renderOrder={25}>
        <sphereGeometry args={[0.023, 12, 12]} />
        <meshBasicMaterial color="#ece8e1" depthTest={false} depthWrite={false} />
      </mesh>
      {labelPoints ? <Label compact text={name} at={[at[0] - 0.09, at[1] + (name === "V" ? 0.12 : -0.04), at[2] + (name === "M" ? 0.1 : -0.06)]} /> : null}
    </group>)}
    {hasCopies && (step === null || step >= 2) ? <CopiedLengths id={id} /> : null}
  </group>;
}

function CopiedLengths({ id }: { id: ConstantId }) {
  const { size } = useThree();
  const snap = useActiveSnapshot();
  const m = relationMeasures(id, snap.geo);
  const chains = comparisonChains(m.rows, m.values);
  return <Billboard position={[0, -0.9, 0]}>
    {chains.map((chain, i) => <group key={i}>
      {size.width >= 1024 ? <Label compact text={m.rows[i].label} at={[-0.85, 0.40 - i * 0.48, 0]} /> : null}
      {chain.map((term, j) => <group key={j}>
        <Line points={[term.from, term.to]} color={SEGMENT_COLORS[term.q]} lineWidth={4} depthTest={false} depthWrite={false} renderOrder={20} />
        <Line points={[[term.from[0], term.from[1] - 0.05, 0], [term.from[0], term.from[1] + 0.05, 0]]}
          color="#ece8e1" lineWidth={1} depthTest={false} depthWrite={false} renderOrder={21} />
        <Label compact text={QUANTITY_SYMBOLS[term.q]} at={term.labelAt} />
      </group>)}
    </group>)}
  </Billboard>;
}

function OvalGeometry() {
  const snap = useActiveSnapshot();
  const step = useLabStore((s) => s.lessonStep);
  const oval = useMemo(() => ovalSection(snap.geo.angleDeg), [snap.geo.angleDeg]);
  const active = step === null ? ["L", "W", "theta"] : relationSteps("eggLW")[step].segments;
  // Uniform scale and a translation only: the displayed oval is the actual cut.
  const scale = 5.5;
  const mapPoint = ([x, y, z]: Point3): Point3 => [x * scale, 1.25 + (z - oval.z0) * scale, y * scale];
  const surface = useMemo(() => {
    const positions: number[] = [], indices: number[] = [];
    const rings = 32, sides = 72;
    const lo = oval.zLo - 0.035, hi = oval.zHi + 0.035;
    for (let i = 0; i <= rings; i++) {
      const z = lo + (hi - lo) * i / rings;
      for (let j = 0; j <= sides; j++) {
        const a = 2 * Math.PI * j / sides;
        positions.push(...mapPoint([Math.cos(a) / z, Math.sin(a) / z, z]));
      }
    }
    for (let i = 0; i < rings; i++) for (let j = 0; j < sides; j++) {
      const a = i * (sides + 1) + j, b = a + sides + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices); geom.computeVertexNormals();
    return geom;
  }, [oval]);
  const plane = useMemo(() => {
    const positions: number[] = [];
    const corners: Point3[] = [[-0.19, -0.18, oval.z0 - 0.19 * oval.t], [0.19, -0.18, oval.z0 + 0.19 * oval.t], [0.19, 0.18, oval.z0 + 0.19 * oval.t], [-0.19, 0.18, oval.z0 - 0.19 * oval.t]];
    corners.forEach((p) => positions.push(...mapPoint(p)));
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex([0, 1, 2, 0, 2, 3]); geom.computeVertexNormals();
    return geom;
  }, [oval]);
  useEffect(() => () => { surface.dispose(); plane.dispose(); }, [surface, plane]);
  const L = oval.length.map(mapPoint), W = oval.width.map(mapPoint);
  const inclination = Array.from({ length: 41 }, (_, i): Point3 => {
    const a = oval.theta * i / 40;
    return [0.55 * Math.cos(a), 1.25 + 0.55 * Math.sin(a), 0];
  });
  return <group>
    <mesh geometry={surface}>
      <meshStandardMaterial color="#c5ccd4" transparent opacity={0.12} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
    <mesh geometry={plane}>
      <meshBasicMaterial color="#8eafaa" transparent opacity={0.08} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
    <Line points={oval.contour.map(mapPoint)} color="#ece8e1" lineWidth={2} depthTest={false} depthWrite={false} renderOrder={20} />
    {step === 0 ? <group>
      <Line points={[[0, 1.25, 0], [0.72, 1.25, 0]]} color="#c5ccd4" lineWidth={1} depthTest={false} />
      <Line points={inclination} color={SEGMENT_COLORS.theta} lineWidth={3} depthTest={false} renderOrder={25} />
      <Label compact text="θ" at={[0.65, 1.48, 0]} />
    </group> : null}
    {(["L", "W"] as const).map((q) => <group key={q}>
      <Line points={q === "L" ? L : W} color={SEGMENT_COLORS[q]} lineWidth={active.includes(q) ? 4 : 1}
        transparent opacity={active.includes(q) ? 1 : 0.25} depthTest={false} depthWrite={false} renderOrder={25} />
      {active.includes(q) ? <Label compact text={q} at={q === "L" ? [(L[0][0] + L[1][0]) / 2 + 0.32, (L[0][1] + L[1][1]) / 2 + 0.17, -0.1] : [W[0][0] - 0.15, W[0][1] + 0.15, 0.42]} /> : null}
    </group>)}
    {L.map((p, i) => <Label compact key={i} text={i === 0 ? "P" : "Q"} at={[p[0] - 0.13, p[1], p[2]]} />)}
  </group>;
}

export function RelationCamera({ id }: { id: ConstantId | null }) {
  const { camera, controls, size } = useThree();
  const saved = useRef<{ position: THREE.Vector3; quaternion: THREE.Quaternion; target: THREE.Vector3 } | null>(null);
  useEffect(() => {
    if (!controls) return;
    const orbit = controls as unknown as { target: THREE.Vector3; update: () => void };
    if (id) {
      if (!saved.current) saved.current = { position: camera.position.clone(), quaternion: camera.quaternion.clone(), target: orbit.target.clone() };
      const def = RELATION_COMPARISONS[id];
      const copies = id !== "eggLW" && (def.numerator.length > 1 || def.denominator.length > 1);
      const mobile = size.width < 1024;
      const distance = copies ? mobile ? size.width < 360 ? 7.6 : 6.6 : 8.6 : id === "eggLW" ? mobile ? 6.2 : 8.6 : mobile ? 4.7 : 6.8;
      camera.position.set(3.3, id === "eggLW" ? 3.2 : 2.7, distance);
      orbit.target.set(0, id === "eggLW" ? 1.25 : copies ? mobile ? -0.18 : 0.05 : 0.58, id === "eggLW" ? 0 : 0.2);
      orbit.update();
    } else if (saved.current) {
      camera.position.copy(saved.current.position);
      orbit.target.copy(saved.current.target);
      camera.quaternion.copy(saved.current.quaternion);
      saved.current = null;
      orbit.update();
    }
  }, [id, camera, controls, size.width]);
  return null;
}
