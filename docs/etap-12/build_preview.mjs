// Build a separate Pages test preview. Never updates the existing site's root.
import { build } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const out = process.argv[2];
if (!out || !path.isAbsolute(out)) throw new Error('Pass a new absolute output directory');
await fs.mkdir(out, { recursive: false });
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const emittedModules = [];
await build({
  root,
  base: '/great-pyramid-11-7-lab/preview/etap-12/lab/',
  build: { outDir: path.join(out, 'lab'), emptyOutDir: false },
  plugins: [{
    name: 'test-preview-artifact-inventory',
    generateBundle(_, bundle) {
      for (const [file, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk') continue;
        for (const [id, info] of Object.entries(chunk.modules)) {
          if (info.renderedLength <= 0) continue;
          emittedModules.push({ file, module: id.replaceAll('\\', '/').replace(root.replaceAll('\\', '/') + '/', ''), renderedLength: info.renderedLength });
        }
      }
    },
  }],
});
const gaps = ['@mediapipe/tasks-vision', 'maath', 'stats-gl'];
const gapResults = gaps.map(name => ({ name, emittedModules: emittedModules.filter(row => row.module.includes(`node_modules/${name}/`)).length }));
const report = { sourceCommit, base: '/great-pyramid-11-7-lab/preview/etap-12/', missingNoticePackages: gapResults, emittedModules };
await fs.writeFile(path.join(out, 'bundle-inventory.json'), JSON.stringify(report, null, 2) + '\n');
if (gapResults.some(row => row.emittedModules)) throw new Error('Unresolved notice package emits code; resolve before deployment');
const runtimeFiles = {
  'etap-7': ['podglad.html', 'animation.js', 'section.js'],
  'etap-10': ['podglad.html', 'style.css', 'vortex.js', 'preview.js'],
  'etap-11': ['podglad.html', 'particles.js', 'extension.js', 'odbior.md'],
};
for (const [folder, files] of Object.entries(runtimeFiles)) {
  await fs.mkdir(path.join(out, folder));
  for (const file of files) await fs.copyFile(path.join(root, 'docs', folder, file), path.join(out, folder, file));
}
await fs.copyFile(path.join(root, 'docs', 'etap-12', 'preview-index.html'), path.join(out, 'index.html'));
console.log(JSON.stringify({ out, sourceCommit, missingNoticePackages: gapResults }));
