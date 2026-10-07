import { afterEach, describe, expect, it } from "vitest";
import { CONSTANTS, MODELS, PHI, geoFromBH, relationValue } from "./engine";
import { PHI_STEPS, RELATION_PRESENTATIONS, lessonGeo, phiSegments, relationMeasures, relationSteps, type Point3 } from "./relations";
import { pyramidSegments, angleArcs, ovalSection, comparisonChains } from "./relation-geometry";
import { useLabStore } from "../../store/lab-store";

describe("audited relation visualization", () => {
  it("covers exactly all 13 engine IDs with implemented scenes and bilingual lessons", () => {
    expect(Object.keys(RELATION_PRESENTATIONS).sort()).toEqual(CONSTANTS.map((r) => r.id).sort());
    for (const { id } of CONSTANTS) {
      expect(RELATION_PRESENTATIONS[id].renderer).toBeTruthy();
      expect(relationSteps(id)).toHaveLength(4);
      for (const step of relationSteps(id)) {
        expect(step.text.pl.length).toBeGreaterThan(30);
        expect(step.text.en.length).toBeGreaterThan(30);
      }
    }
    expect(RELATION_PRESENTATIONS.eggLW.scene).toBe("oval-section");
    expect(RELATION_PRESENTATIONS.e.scene).toBe("pyramid-angles");
  });

  it.each([11 / 7, 1.54, 1.62, MODELS[0].bh!])("draws the actual VOM triangle at B/H=%s", (bh) => {
    const { points, segments } = phiSegments(bh);
    const length = (id: string) => {
      const s = segments.find((r) => r.id === id)!;
      return Math.hypot(...s.from.map((v, i) => v - s.to[i]));
    };
    expect(points.V[0]).toBe(points.O[0]);
    expect(points.M[1]).toBe(0);
    expect(length("A")).toBe(1);
    expect(length("S") ** 2).toBeCloseTo(length("A") ** 2 + length("H") ** 2, 13);
    expect(length("S") / length("A")).toBeCloseTo(relationValue("phi", geoFromBH(bh)), 14);
    expect(lessonGeo(geoFromBH(bh)).S / lessonGeo(geoFromBH(bh)).A).toBeCloseTo(length("S") / length("A"), 14);
  });

  it("matches the independently audited 11:7 approximation rather than claiming equality", () => {
    const geo = lessonGeo(geoFromBH(11 / 7));
    expect(geo.H).toBe(7);
    expect(geo.A).toBe(5.5);
    expect(geo.S).toBeCloseTo(Math.sqrt(317) / 2, 14);
    const ratio = geo.S / geo.A;
    expect(ratio).toBeCloseTo(1.6185903467965, 12);
    expect(100 * Math.abs(ratio - PHI) / PHI).toBeCloseTo(0.034384818, 9);
    expect(ratio).not.toBe(PHI);
  });

  it("uses the same ratio at different scene scales", () => {
    for (const base of [1, 2, 11, 440]) {
      const s = phiSegments(11 / 7, base).segments;
      const distances = s.map((r) => Math.hypot(...r.from.map((v, i) => v - r.to[i])));
      expect(distances[2] / distances[0]).toBeCloseTo(Math.sqrt(317) / 11, 14);
    }
  });
});

describe("lesson lifecycle", () => {
  afterEach(() => useLabStore.setState(useLabStore.getInitialState(), true));

  it.each(CONSTANTS.map((r) => r.id))("%s pauses, resumes and finishes without a loop", (id) => {
    const s = () => useLabStore.getState();
    s().selectRelation(id); s().startLesson(); s().advanceLesson();
    expect(s().lessonStep).toBe(1);
    s().pauseLesson(); s().advanceLesson();
    expect(s().lessonStep).toBe(1);
    s().resumeLesson(); s().advanceLesson(); s().advanceLesson();
    expect(s().lessonStep).toBe(PHI_STEPS.length - 1);
    expect(s().lessonPlaying).toBe(false);
    s().advanceLesson(); s().resumeLesson();
    expect(s().lessonPlaying).toBe(false);
    s().startLesson();
    expect(s().lessonStep).toBe(0);
  });

  it("cancels on exit/selection and leaves normal scene preferences intact", () => {
    const s = () => useLabStore.getState();
    s().toggleAutoRotate(); s().toggleRainbow(); s().setPyramidOpacity(0.6);
    s().selectRelation("phi"); s().startLesson(); s().selectRelation(null); s().advanceLesson();
    expect(s().lessonStep).toBeNull();
    expect(s().lessonPlaying).toBe(false);
    expect(s().autoRotate).toBe(true);
    expect(s().showRainbow).toBe(false);
    expect(s().pyramidOpacity).toBe(0.6);
    s().selectRelation("eggLW"); s().startLesson();
    expect(s().lessonPlaying).toBe(true);
    expect(s().lessonStep).toBe(0);
    s().selectRelation("gamma");
    expect(s().lessonPlaying).toBe(false);
    expect(s().lessonStep).toBeNull();
  });

  it("resets stale explanations when geometry changes and pauses manual navigation", () => {
    const s = () => useLabStore.getState();
    s().selectRelation("phi"); s().startLesson(); s().setLessonStep(2);
    expect(s().lessonPlaying).toBe(false);
    s().setModel("phi");
    expect(s().relationId).toBe("phi");
    expect(s().lessonStep).toBeNull();
    s().startLesson(); s().setCustomBH(1.6);
    expect(s().lessonPlaying).toBe(false);
    expect(s().lessonStep).toBeNull();
  });
});

const distance = (a: Point3, b: Point3) => Math.hypot(...a.map((v, i) => v - b[i]));

describe("remaining audited geometry", () => {
  it.each([11 / 7, 1.54, 1.62])("all six segments have actual endpoint lengths at B/H=%s", (bh) => {
    for (const base of [2, 11, 440]) {
      const { geo, segments } = pyramidSegments(bh, base);
      for (const s of segments) expect(distance(s.from, s.to)).toBeCloseTo(geo[s.id], 11);
    }
  });

  it.each(CONSTANTS.map((r) => r.id))("%s comparison construction matches the engine at different shapes and scales", (id) => {
    for (const bh of [11 / 7, 1.54, 1.62]) for (const base of [2, 11, 440]) {
      const geo = geoFromBH(bh, base), m = relationMeasures(id, geo);
      expect(m.ratio).toBeCloseTo(relationValue(id, geo), id === "eggLW" ? 8 : 12);
      const chains = comparisonChains(m.rows, m.values);
      for (const chain of chains) chain.forEach((term, i) => {
        expect(distance(term.from, term.to)).toBeCloseTo(m.values[term.q] * term.scale, 12);
        if (i > 0) expect(term.from).toEqual(chain[i - 1].to);
      });
      const totals = chains.map((chain) => chain.reduce((sum, s) => sum + distance(s.from, s.to), 0));
      expect(totals[0] / totals[1] - m.subtract).toBeCloseTo(m.ratio, 12);
    }
  });

  it("theta and beta arcs meet the actual rays and are complementary", () => {
    for (const bh of [1.54, 11 / 7, 1.62]) {
      const { geo, points } = pyramidSegments(bh), arcs = angleArcs(bh);
      expect(arcs.theta.angle + arcs.beta.angle).toBeCloseTo(Math.PI / 2, 14);
      for (const arc of Object.values(arcs)) for (const p of arc.points) expect(distance(p, arc.centre)).toBeCloseTo(0.34, 13);
      const lastTheta = arcs.theta.points.at(-1)!;
      expect(lastTheta[1] / (points.M[2] - lastTheta[2])).toBeCloseTo(geo.H / geo.A, 13);
      const lastBeta = arcs.beta.points.at(-1)!;
      expect((geo.H - lastBeta[1]) / lastBeta[2]).toBeCloseTo(geo.H / geo.A, 13);
      const m = relationMeasures("e", geo);
      expect(2 * arcs.theta.angle / arcs.beta.angle).toBeCloseTo(m.ratio, 13);
    }
  });

  it("reconstructs the audited closed oval and its noncentral maximum width", () => {
    const o = ovalSection(geoFromBH(11 / 7).angleDeg);
    expect(o.zLo).toBeCloseTo(7.479845787071286, 12);
    expect(o.zHi).toBeCloseTo(7.812900735064411, 12);
    expect(o.zMax).toBeCloseTo(7.646376705533864, 12);
    expect(o.L).toBeCloseTo(0.423562482965745, 12);
    expect(o.W).toBeCloseTo(0.261499813984576, 12);
    expect(distance(...o.length)).toBeCloseTo(o.L, 13);
    expect(distance(...o.width)).toBeCloseTo(o.W, 13);
    expect(o.zMax).not.toBeCloseTo((o.zLo + o.zHi) / 2, 6);
    expect(o.zMax ** 3 * (o.z0 - o.zMax)).toBeCloseTo(o.t ** 2, 10);
    for (const [x, y, z] of o.contour) {
      expect(z * Math.hypot(x, y)).toBeCloseTo(1, 11);
      expect(z).toBeCloseTo(o.z0 + x * o.t, 13);
      expect(2 * Math.abs(y)).toBeLessThanOrEqual(o.W + 1e-12);
      expect(z).toBeGreaterThanOrEqual(o.zLo - 1e-12);
      expect(z).toBeLessThanOrEqual(o.zHi + 1e-12);
    }
    expect(o.contour[0]).toEqual(o.contour.at(-1));
    expect(() => ovalSection(89)).toThrow(RangeError);
  });
});
