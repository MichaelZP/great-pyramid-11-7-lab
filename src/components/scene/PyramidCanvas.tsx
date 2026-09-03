import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useLabStore } from "@/store/lab-store";
import { useActiveSnapshot } from "@/hooks/use-lab";
import {
  CONSTANTS,
  RAINBOW_ANGLE,
  TARGET_RATIO,
} from "@/lib/pyramid/engine";
import { SCENE, PRIMARY_COLORS, SECONDARY_COLORS } from "./scene-colors";
import {
  drawHologram,
  makeHologramTexture,
  makeLimestoneTexture,
} from "./textures";
import { fmt, fmtDeg } from "@/lib/utils";
import { t, modelName } from "@/lib/i18n";
import { useI18n } from "@/hooks/use-i18n";

const BASE = 2;
const START_H = BASE / TARGET_RATIO;
const _normal = new THREE.Vector3();

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function CrossEyeStereo() {
  const enabled = useLabStore((s) => s.crossEye);
  const swap = useLabStore((s) => s.stereoSwap);
  const { gl, size } = useThree();
  const stereo = useMemo(() => {
    const cam = new THREE.StereoCamera();
    cam.aspect = 0.5;
    cam.eyeSep = 0.22;
    return cam;
  }, []);

  useEffect(() => {
    const restore = () => {
      gl.setScissorTest(false);
      gl.setViewport(0, 0, size.width, size.height);
      gl.setScissor(0, 0, size.width, size.height);
      gl.autoClear = true;
    };
    if (!enabled) restore();
    return restore;
  }, [enabled, gl, size.width, size.height]);

  useFrame(({ scene, camera, size: frameSize }) => {
    if (!enabled) return;
    const w = frameSize.width;
    const h = frameSize.height;
    camera.updateMatrixWorld();
    stereo.update(camera as THREE.PerspectiveCamera);

    const leftCam = swap ? stereo.cameraL : stereo.cameraR;
    const rightCam = swap ? stereo.cameraR : stereo.cameraL;

    gl.setScissorTest(true);
    gl.autoClear = false;

    gl.setViewport(0, 0, w / 2, h);
    gl.setScissor(0, 0, w / 2, h);
    gl.clear();
    gl.render(scene, leftCam);

    gl.setViewport(w / 2, 0, w / 2, h);
    gl.setScissor(w / 2, 0, w / 2, h);
    gl.clear();
    gl.render(scene, rightCam);

    gl.setScissorTest(false);
    gl.autoClear = true;
  }, enabled ? 1 : 0);

  return null;
}

function CrossEyeOverlay() {
  const { t } = useI18n();
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-px bg-white/25" />
      <span className="absolute bottom-[7%] left-1/4 size-3.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_5px_rgba(255,255,255,0.9)]" />
      <span className="absolute bottom-[7%] left-3/4 size-3.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_5px_rgba(255,255,255,0.9)]" />
      <p className="absolute inset-x-0 bottom-2 text-center font-mono text-[0.65rem] tracking-wide text-white/75">
        {t("crossEyeHint")}
      </p>
    </div>
  );
}

function PyramidRig() {
  const snap = useActiveSnapshot();
  const locale = useLabStore((s) => s.locale);
  const showRainbow = useLabStore((s) => s.showRainbow);
  const showHologram = useLabStore((s) => s.showHologram);
  const showGuides = useLabStore((s) => s.showGuides);
  const showTexture = useLabStore((s) => s.showTexture);
  const pyramidOpacity = useLabStore((s) => s.pyramidOpacity);
  const autoRotate = useLabStore((s) => s.autoRotate);
  const isGoldenEgg = snap.model.id === "goldenEgg";
  const targetH = BASE / snap.geo.bh;

  const limestone = useMemo(() => makeLimestoneTexture(), []);
  const holo = useMemo(() => makeHologramTexture(), []);

  useEffect(() => {
    return () => {
      limestone.dispose();
      holo.texture.dispose();
    };
  }, [limestone, holo]);

  useEffect(() => {
    drawHologram(
      holo.canvas,
      snap.results.map((r) => ({
        symbol: r.symbol,
        error: r.error,
        within: r.within,
        value: r.value,
      })),
      modelName(locale, snap.model.id),
      fmtDeg(snap.geo.angleDeg, 4, locale),
      t(locale, "holoScore", { n: fmt(snap.consensus.combined, 1, locale) }),
      snap.summary.matches,
      t(locale, "holoTitle"),
      t(locale, "holoTolerance", {
        n: snap.summary.matches,
        total: CONSTANTS.length,
      }),
      locale === "pl" ? "," : ".",
    );
    holo.texture.needsUpdate = true;
  }, [holo, snap, locale]);

  const match = Math.max(
    0,
    1 - Math.abs(snap.geo.angleDeg - RAINBOW_ANGLE) / 0.08,
  );

  return (
    <>
      <AnimatedPyramid
        targetH={targetH}
        texture={limestone}
        showHologram={showHologram}
        showTexture={showTexture}
        opacity={pyramidOpacity}
        holoTexture={holo.texture}
      />
      {showGuides ? <Guides targetH={targetH} /> : null}
      {showHologram ? <HologramStele texture={holo.texture} /> : null}
      <Rainbow visible={showRainbow} match={match} targetH={targetH} />
      <AngleGuides
        targetH={targetH}
        visible={showRainbow && !isGoldenEgg}
      />
      {isGoldenEgg ? <GoldenEggConstruct targetH={targetH} /> : null}
      <ArrisGuide targetH={targetH} visible={showRainbow} />
      <Plinth />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        autoRotate={autoRotate}
        autoRotateSpeed={0.35}
        minPolarAngle={0.12}
        maxPolarAngle={Math.PI * 0.52}
        minDistance={4}
        maxDistance={isGoldenEgg ? 40 : 32}
        target={[0, 0.65 * START_H, 0]}
        enablePan
        screenSpacePanning
        panSpeed={1.1}
        keyPanSpeed={14}
      />
    </>
  );
}

function AnimatedPyramid({
  targetH,
  texture,
  showHologram,
  showTexture,
  opacity,
  holoTexture,
}: {
  targetH: number;
  texture: THREE.CanvasTexture;
  showHologram: boolean;
  showTexture: boolean;
  opacity: number;
  holoTexture: THREE.CanvasTexture;
}) {
  const hRef = useRef(START_H);
  const faces = useRef<THREE.BufferGeometry[]>([]);
  const edge = useRef<THREE.BufferGeometry>(null);
  const built = useMemo(() => makeFaceGeometries(START_H), []);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    hRef.current = lerp(hRef.current, targetH, 1 - Math.exp(-d * 7));
    const H = hRef.current;
    const A = BASE / 2;
    const corners: Array<readonly [number, number, number]> = [
      [-A, 0, A],
      [A, 0, A],
      [A, 0, -A],
      [-A, 0, -A],
    ];
    faces.current.forEach((geom, i) => {
      const a = corners[i]!;
      const b = corners[(i + 1) % 4]!;
      const pos = geom.getAttribute("position");
      pos.setXYZ(0, 0, H, 0);
      pos.setXYZ(1, a[0], a[1], a[2]);
      pos.setXYZ(2, b[0], b[1], b[2]);
      pos.needsUpdate = true;
      geom.computeVertexNormals();
    });
    if (edge.current) {
      const pos = edge.current.getAttribute("position");
      const pts: Array<readonly [number, number, number]> = [
        [0, H, 0],
        corners[0]!,
        [0, H, 0],
        corners[1]!,
        [0, H, 0],
        corners[2]!,
        [0, H, 0],
        corners[3]!,
        corners[0]!,
        corners[1]!,
        corners[1]!,
        corners[2]!,
        corners[2]!,
        corners[3]!,
        corners[3]!,
        corners[0]!,
      ];
      pts.forEach((p, i) => pos.setXYZ(i, p[0], p[1], p[2]));
      pos.needsUpdate = true;
    }
  });

  return (
    <group>
      {built.faces.map((geom, i) => (
        <mesh
          key={i}
          geometry={geom}
          castShadow
          receiveShadow
          ref={(mesh) => {
            if (mesh) faces.current[i] = mesh.geometry;
          }}
        >
          <meshStandardMaterial
            map={showTexture ? texture : null}
            roughness={showTexture ? 0.82 : 0.55}
            metalness={0.03}
            color={showTexture ? "#ffffff" : "#c9b89a"}
            transparent={opacity < 0.98 || (showHologram && i === 0)}
            opacity={
              showHologram && i === 0 ? Math.min(0.88, opacity) : opacity
            }
            depthWrite={opacity > 0.72}
            depthTest
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      <lineSegments
        geometry={built.edges}
        ref={(obj) => {
          if (obj) edge.current = obj.geometry;
        }}
      >
        <lineBasicMaterial
          color={SCENE.edge}
          transparent
          opacity={Math.min(0.95, 0.45 + (1 - opacity) * 0.5)}
          depthTest={opacity > 0.72}
        />
      </lineSegments>
      {showHologram && opacity > 0.35 ? (
        <FaceHologram
          targetH={targetH}
          texture={holoTexture}
          opacity={Math.min(0.55, opacity * 0.55)}
        />
      ) : null}
    </group>
  );
}

function makeFaceGeometries(H: number) {
  const A = BASE / 2;
  const apex = new THREE.Vector3(0, H, 0);
  const corners = [
    new THREE.Vector3(-A, 0, A),
    new THREE.Vector3(A, 0, A),
    new THREE.Vector3(A, 0, -A),
    new THREE.Vector3(-A, 0, -A),
  ];
  const faces = corners.map((a, i) => {
    const b = corners[(i + 1) % 4]!;
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([
          apex.x,
          apex.y,
          apex.z,
          a.x,
          a.y,
          a.z,
          b.x,
          b.y,
          b.z,
        ]),
        3,
      ),
    );
    g.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array([0.5, 1, 0, 0, 1, 0]), 2),
    );
    g.computeVertexNormals();
    return g;
  });
  const edgePts: number[] = [];
  corners.forEach((c) => {
    edgePts.push(apex.x, apex.y, apex.z, c.x, c.y, c.z);
  });
  for (let i = 0; i < 4; i++) {
    const a = corners[i]!;
    const b = corners[(i + 1) % 4]!;
    edgePts.push(a.x, a.y, a.z, b.x, b.y, b.z);
  }
  const edges = new THREE.BufferGeometry();
  edges.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(edgePts), 3),
  );
  return { faces, edges };
}

function FaceHologram({
  targetH,
  texture,
  opacity,
}: {
  targetH: number;
  texture: THREE.CanvasTexture;
  opacity: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const hRef = useRef(START_H);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    const d = Math.min(delta, 0.1);
    hRef.current = lerp(hRef.current, targetH, 1 - Math.exp(-d * 7));
    const H = hRef.current;
    const A = BASE / 2;
    const y = H * 0.42;
    const z = A * (1 - y / H) + 0.012;
    mesh.current.position.set(0, y, z);
    _normal.set(0, A, H).normalize();
    mesh.current.lookAt(
      mesh.current.position.x + _normal.x,
      mesh.current.position.y + _normal.y,
      mesh.current.position.z + _normal.z,
    );
  });
  return (
    <mesh ref={mesh} renderOrder={2}>
      <planeGeometry args={[0.52, 0.7]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function HologramStele({ texture }: { texture: THREE.CanvasTexture }) {
  return (
    <group position={[1.15, 0.88, 1.35]} rotation={[0, -0.42, 0]}>
      <mesh position={[0, 0, -0.012]}>
        <planeGeometry args={[0.92, 1.42]} />
        <meshStandardMaterial
          color="#151a20"
          roughness={0.25}
          metalness={0.08}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.02, 0.012]} renderOrder={3}>
        <planeGeometry args={[0.84, 1.28]} />
        <meshBasicMaterial map={texture} transparent opacity={0.94} />
      </mesh>
    </group>
  );
}

function Guides({ targetH }: { targetH: number }) {
  const H = targetH;
  const A = BASE / 2;
  return (
    <group>
      <Line
        points={[
          [0, 0, 0],
          [0, H, 0],
        ]}
        color="#e8dcc4"
        lineWidth={2}
        depthTest={false}
        transparent
        opacity={0.95}
      />
      <Line
        points={[
          [0, 0, 0],
          [0, 0, A],
        ]}
        color="#e8dcc4"
        lineWidth={2}
        depthTest={false}
        transparent
        opacity={0.9}
      />
      <Line
        points={[
          [0, 0, 0],
          [A, 0, 0],
        ]}
        color="#e8dcc4"
        lineWidth={1.6}
        depthTest={false}
        transparent
        opacity={0.75}
      />
      <Line
        points={[
          [-A, 0.004, -A],
          [A, 0.004, A],
        ]}
        color="#d4c6aa"
        lineWidth={1.4}
        dashed
        dashSize={0.06}
        gapSize={0.04}
        depthTest={false}
        transparent
        opacity={0.8}
      />
      <Line
        points={[
          [-A, 0.004, A],
          [A, 0.004, -A],
        ]}
        color="#d4c6aa"
        lineWidth={1.4}
        dashed
        dashSize={0.06}
        gapSize={0.04}
        depthTest={false}
        transparent
        opacity={0.55}
      />
    </group>
  );
}

const SEMI_A0 = 0.02;
const SEMI_A1 = Math.PI - 0.02;

function primaryBands(H: number) {
  const step = 0.0284 * H;
  return PRIMARY_COLORS.map((color, i) => ({
    color,
    radius: H - (6 - i) * step,
  }));
}

function secondaryBands(H: number) {
  const green = 2 * H;
  const step = 0.043 * H;
  return SECONDARY_COLORS.map((color, i) => ({
    color,
    radius: green + (i - 3) * step,
  }));
}

function makeArcTube(
  radius: number,
  a0: number,
  a1: number,
  tubeR: number,
  segments = 96,
) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = a0 + ((a1 - a0) * i) / segments;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  return new THREE.TubeGeometry(curve, segments, tubeR, 8, false);
}

function makePolylineTube(points: THREE.Vector3[], radius: number) {
  const path = new THREE.CurvePath<THREE.Vector3>();
  for (let i = 0; i < points.length - 1; i++) {
    path.add(new THREE.LineCurve3(points[i]!, points[i + 1]!));
  }
  const segs = Math.max(8, (points.length - 1) * 24);
  return new THREE.TubeGeometry(path, segs, radius, 8, false);
}

function RainbowTubes({
  bands,
  tubeR,
}: {
  bands: readonly { color: string; radius: number }[];
  tubeR: number;
}) {
  const tubes = useMemo(
    () =>
      bands.map((band) => ({
        color: band.color,
        geometry: makeArcTube(band.radius, SEMI_A0, SEMI_A1, tubeR),
      })),
    [bands, tubeR],
  );

  useEffect(() => {
    return () => {
      tubes.forEach((t) => t.geometry.dispose());
    };
  }, [tubes]);

  return (
    <group>
      {tubes.map((t) => (
        <mesh key={t.color} geometry={t.geometry}>
          <meshStandardMaterial
            color={t.color}
            emissive={t.color}
            emissiveIntensity={0.35}
            roughness={0.28}
            metalness={0.04}
            transparent={false}
            depthTest
            depthWrite
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rainbow({
  visible,
  match: _match,
  targetH,
}: {
  visible: boolean;
  match: number;
  targetH: number;
}) {
  const A = BASE / 2;
  const pBands = useMemo(() => primaryBands(targetH), [targetH]);
  const sBands = useMemo(() => secondaryBands(targetH), [targetH]);
  if (!visible) return null;

  return (
    <group>
      <group position={[0, 0, 0]}>
        <RainbowTubes bands={pBands} tubeR={0.016} />
      </group>
      <group position={[0, 0, -A]}>
        <RainbowTubes bands={sBands} tubeR={0.018} />
      </group>
    </group>
  );
}

function GoldenEggConstruct({ targetH }: { targetH: number }) {
  const built = useMemo(() => {
    const A = BASE / 2;
    const H = targetH;
    const S = Math.hypot(H, A);
    const uHat = new THREE.Vector3(0, H / S, -A / S);
    const vHat = new THREE.Vector3(1, 0, 0);
    const nrm = new THREE.Vector3().crossVectors(vHat, uHat).normalize();
    const P0 = new THREE.Vector3(0, 0, A);

    const zc = -3.05;
    const yInt = (H / A) * (A - zc);
    const yOff = 1.43;
    const rCut = 0.5;
    const C = rCut * (yInt + yOff);

    const v2at = (u: number) => {
      const y = u * uHat.y;
      const z = A + u * uHat.z;
      if (y + yOff <= 0.08) return -1;
      const rhs = C / (y + yOff);
      const d = z - zc;
      return rhs * rhs - d * d;
    };

    const uInt = yInt / uHat.y;
    let uLo = uInt;
    let uHi = uInt;
    let seen = false;
    for (let i = 0; i <= 1000; i++) {
      const u = uInt - 4 + (i / 1000) * 8;
      const ok = v2at(u) >= 1e-8;
      if (ok && !seen) {
        uLo = u;
        seen = true;
      }
      if (ok) uHi = u;
      if (seen && !ok) break;
    }

    const N = 128;
    const upper: Array<[number, number]> = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const u = uLo + (uHi - uLo) * t;
      upper.push([u, Math.sqrt(Math.max(0, v2at(u)))]);
    }
    const loop2: Array<[number, number]> = [];
    for (let i = 0; i <= N; i++) loop2.push(upper[i]!);
    for (let i = N - 1; i >= 1; i--) {
      loop2.push([upper[i]![0], -upper[i]![1]]);
    }

    const uMid = 0.5 * (uLo + uHi);
    const shape = new THREE.Shape();
    loop2.forEach(([u, v], i) => {
      if (i === 0) shape.moveTo(v, u - uMid);
      else shape.lineTo(v, u - uMid);
    });
    shape.closePath();
    const eggFill = new THREE.ExtrudeGeometry(shape, {
      depth: 0.028,
      bevelEnabled: false,
      steps: 1,
      curveSegments: 1,
    });
    eggFill.translate(0, 0, -0.014);
    eggFill.computeVertexNormals();

    const rot = new THREE.Matrix4().makeBasis(vHat, uHat, nrm);
    const center = P0.clone().addScaledVector(uHat, uMid);

    const worldLoop = loop2.map(([u, v]) =>
      P0.clone().addScaledVector(uHat, u).addScaledVector(vHat, v),
    );
    worldLoop.push(worldLoop[0]!.clone());
    const eggPath = new THREE.CatmullRomCurve3(worldLoop, true, "centripetal");
    const ellipseTube = new THREE.TubeGeometry(eggPath, 200, 0.015, 10, true);

    const lathePts: THREE.Vector2[] = [];
    for (let i = 0; i <= N; i++) {
      const [u, v] = upper[i]!;
      lathePts.push(new THREE.Vector2(Math.max(v, 0.0008), u - uMid));
    }
    const eggSolid = new THREE.LatheGeometry(lathePts, 64);
    eggFill.applyMatrix4(rot);
    eggSolid.applyMatrix4(rot);

    const tFar = Math.max(2.7, uHi / S + 0.2);
    const apothem = makePolylineTube(
      [P0, P0.clone().addScaledVector(uHat, tFar * S)],
      0.016,
    );

    const profile: THREE.Vector2[] = [];
    const yMax = 8.6;
    for (let i = 0; i <= 80; i++) {
      const y = (i / 80) * yMax;
      profile.push(new THREE.Vector2(C / Math.max(y + yOff, 0.08), y));
    }
    const coneGeo = new THREE.LatheGeometry(profile, 96);

    const rBase = C / yOff;
    const baseLoop: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i++) {
      const a = (i / 80) * Math.PI * 2;
      baseLoop.push(
        new THREE.Vector3(Math.cos(a) * rBase, 0.004, zc + Math.sin(a) * rBase),
      );
    }
    const baseRing = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(baseLoop, true, "centripetal"),
      80,
      0.014,
      6,
      true,
    );

    return {
      ellipseTube,
      eggFill,
      eggSolid,
      apothem,
      coneGeo,
      baseRing,
      zc,
      center,
    };
  }, [targetH]);

  useEffect(() => {
    return () => {
      built.ellipseTube.dispose();
      built.eggFill.dispose();
      built.eggSolid.dispose();
      built.apothem.dispose();
      built.coneGeo.dispose();
      built.baseRing.dispose();
    };
  }, [built]);

  return (
    <group>
      <mesh geometry={built.coneGeo} position={[0, 0, built.zc]} renderOrder={1}>
        <meshStandardMaterial
          color={SCENE.cone}
          transparent
          opacity={0.18}
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={built.baseRing} renderOrder={4}>
        <meshBasicMaterial
          color={SCENE.eggSoft}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={built.eggSolid} position={built.center} renderOrder={2}>
        <meshStandardMaterial
          color={SCENE.egg}
          transparent
          opacity={0.28}
          roughness={0.22}
          metalness={0.28}
          side={THREE.DoubleSide}
          depthWrite={false}
          emissive={SCENE.egg}
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh geometry={built.eggFill} position={built.center} renderOrder={3}>
        <meshStandardMaterial
          color={SCENE.eggSoft}
          transparent
          opacity={0.22}
          roughness={0.35}
          metalness={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
          emissive={SCENE.egg}
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh geometry={built.ellipseTube} renderOrder={5}>
        <meshBasicMaterial
          color={SCENE.eggSoft}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={built.apothem} renderOrder={5}>
        <meshBasicMaterial
          color={SCENE.faceRay}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function AngleGuides({
  targetH,
  visible,
}: {
  targetH: number;
  visible: boolean;
}) {
  const geom = useMemo(() => {
    const A = BASE / 2;
    const H = targetH;
    const P0 = new THREE.Vector3(0, 0, A);
    const P2 = new THREE.Vector3(0, 2 * H, -A);
    return makePolylineTube([P0, P2], 0.016);
  }, [targetH]);

  useEffect(() => () => geom.dispose(), [geom]);

  if (!visible) return null;

  return (
    <mesh geometry={geom} renderOrder={4}>
      <meshBasicMaterial
        color={SCENE.faceRay}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function ArrisGuide({
  targetH,
  visible,
}: {
  targetH: number;
  visible: boolean;
}) {
  const geom = useMemo(() => {
    const A = BASE / 2;
    const H = targetH;
    const E0 = new THREE.Vector3(A, 0, A);
    const E1 = new THREE.Vector3(0, H, 0);
    const frontN = new THREE.Vector3(0, A, H).normalize();
    const rightN = new THREE.Vector3(H, A, 0).normalize();
    const out = frontN.add(rightN).normalize().multiplyScalar(0.003);
    return makePolylineTube([E0.clone().add(out), E1.clone().add(out)], 0.01);
  }, [targetH]);

  useEffect(() => () => geom.dispose(), [geom]);

  if (!visible) return null;

  return (
    <mesh geometry={geom} renderOrder={4}>
      <meshBasicMaterial
        color={SCENE.edgeRay}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function Plinth() {
  return (
    <group>
      <mesh position={[0, -0.07, 0]} receiveShadow>
        <boxGeometry args={[2.55, 0.14, 2.55]} />
        <meshStandardMaterial
          color={SCENE.plinth}
          roughness={0.7}
          metalness={0.08}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.141, 0]}
        receiveShadow
      >
        <circleGeometry args={[18, 64]} />
        <meshStandardMaterial color={SCENE.floor} roughness={0.95} />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <color attach="background" args={[SCENE.fog]} />
      <fog attach="fog" args={[SCENE.fog, 14, 36]} />
      <hemisphereLight args={[SCENE.sky, SCENE.ground, 0.7]} />
      <ambientLight intensity={0.32} />
      <directionalLight
        position={[4.5, 8.5, 3.2]}
        intensity={2.05}
        color={SCENE.sun}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={24}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <directionalLight position={[-4, 2.4, -2]} intensity={0.35} color="#9aa7b4" />
    </>
  );
}

export function PyramidCanvas() {
  const crossEye = useLabStore((s) => s.crossEye);
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 2.5 * START_H, 10 * (BASE / 2)],
          fov: 32,
          near: 0.1,
          far: 60,
        }}
        style={{ touchAction: "none", height: "100%", width: "100%" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.12;
        }}
      >
        <Lights />
        <PyramidRig />
        <ContactShadows
          position={[0, -0.138, 0]}
          opacity={0.45}
          scale={12}
          blur={2.4}
          far={4}
        />
        <CrossEyeStereo />
      </Canvas>
      {crossEye ? <CrossEyeOverlay /> : null}
    </div>
  );
}
