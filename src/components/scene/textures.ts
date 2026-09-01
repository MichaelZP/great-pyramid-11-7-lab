import * as THREE from "three";

export function makeLimestoneTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d context");

  ctx.fillStyle = "#b7a890";
  ctx.fillRect(0, 0, size, size);

  const course = 36;
  for (let y = 0, row = 0; y < size; y += course, row++) {
    const even = row % 2 === 0;
    ctx.fillStyle = even ? "#c3b39a" : "#a9957c";
    ctx.fillRect(0, y, size, course);
    ctx.strokeStyle = "rgba(48, 40, 30, 0.28)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(size, y + 0.5);
    ctx.stroke();
    const block = 92;
    const offset = even ? 0 : block / 2;
    for (let x = offset; x < size; x += block) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, y);
      ctx.lineTo(x + 0.5, y + course);
      ctx.stroke();
    }
  }

  const img = ctx.getImageData(0, 0, size, size);
  const data = img.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 22;
    data[i] = clampByte(data[i]! + n);
    data[i + 1] = clampByte(data[i + 1]! + n * 0.92);
    data[i + 2] = clampByte(data[i + 2]! + n * 0.8);
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

function clampByte(v: number): number {
  return Math.max(0, Math.min(255, v));
}

export function makeHologramTexture(): {
  canvas: HTMLCanvasElement;
  texture: THREE.CanvasTexture;
} {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 1024;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return { canvas, texture };
}

export type HoloRow = {
  symbol: string;
  error: number;
  within: boolean;
  value: number;
};

export function drawHologram(
  canvas: HTMLCanvasElement,
  rows: HoloRow[],
  title: string,
  angleLabel: string,
  scoreLabel: string,
  matches: number,
  heading: string,
  toleranceLabel: string,
  decimal = ".",
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(10, 14, 18, 0.72)";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(197, 204, 212, 0.35)";
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, w - 36, h - 36);

  ctx.fillStyle = "#ece8e1";
  ctx.font = "500 42px 'IBM Plex Mono', ui-monospace, monospace";
  ctx.fillText(heading, 48, 78);

  ctx.fillStyle = "#9a958c";
  ctx.font = "400 24px Outfit, sans-serif";
  ctx.fillText(title, 48, 114);
  ctx.fillText(angleLabel, 48, 146);

  ctx.fillStyle = matches >= rows.length ? "#7d9a7c" : matches >= rows.length - 3 ? "#c4a574" : "#c47a72";
  ctx.font = "500 28px 'IBM Plex Mono', ui-monospace, monospace";
  ctx.fillText(toleranceLabel, 48, 186);
  ctx.fillStyle = "#c5ccd4";
  ctx.font = "400 22px Outfit, sans-serif";
  ctx.fillText(scoreLabel, 48, 218);

  const startY = 248;
  const rowH = rows.length > 12 ? 50 : 58;
  rows.forEach((row, i) => {
    const y = startY + i * rowH;
    const tone = row.within
      ? row.error < 0.00035
        ? "#7d9a7c"
        : "#c4a574"
      : "#c47a72";
    ctx.fillStyle = "rgba(236, 232, 225, 0.04)";
    ctx.fillRect(40, y - 22, w - 80, 50);

    ctx.fillStyle = "#ece8e1";
    ctx.font = "500 26px 'IBM Plex Mono', ui-monospace, monospace";
    ctx.fillText(row.symbol, 56, y + 10);

    const barW = 280;
    const barX = 200;
    const filled = Math.min(1, row.error / 0.0012);
    ctx.fillStyle = "rgba(236,232,225,0.08)";
    ctx.fillRect(barX, y - 6, barW, 10);
    ctx.fillStyle = tone;
    ctx.fillRect(barX, y - 6, Math.max(4, barW * filled), 10);

    ctx.fillStyle = tone;
    ctx.font = "400 20px 'IBM Plex Mono', ui-monospace, monospace";
    const err = (row.error * 100).toFixed(3).replace(".", decimal) + " %";
    ctx.fillText(err, barX + barW + 24, y + 8);

    ctx.beginPath();
    ctx.arc(w - 70, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = row.within ? "#7d9a7c" : "#c47a72";
    ctx.fill();
  });
}
