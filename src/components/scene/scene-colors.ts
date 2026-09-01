export const SCENE = {
  limestone: "#b7a890",
  limestoneDark: "#8f816c",
  edge: "#e4d9c6",
  plinth: "#1c2026",
  floor: "#0e1115",
  fog: "#090b0d",
  sun: "#fff1d6",
  sky: "#6d7c8c",
  ground: "#2a261f",
  hologram: "#c5ccd4",
  guide: "#c5ccd4",
  edgeRay: "#ff6d7a",
  faceRay: "#7dff8a",
  heightRay: "#e35dff",
  egg: "#e6c36a",
  eggSoft: "#f3dd9a",
  cone: "#c4a15a",
} as const;

/** Primary: violet inner → red outer. Radii are assigned from H at runtime. */
export const PRIMARY_COLORS = [
  "#6d3ec9",
  "#3a4fd4",
  "#1b86e0",
  "#1fa85a",
  "#e2c83c",
  "#ef7c24",
  "#e23b32",
] as const;

/** Secondary: red inner → violet outer. Green (index 3) is the 2H reference. */
export const SECONDARY_COLORS = [
  "#e23b32",
  "#ef7c24",
  "#e2c83c",
  "#1fa85a",
  "#1b86e0",
  "#3a4fd4",
  "#6d3ec9",
] as const;
