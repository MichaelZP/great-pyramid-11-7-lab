// Build the accepted web release for the existing GitHub Pages root.
import { build } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const out = process.argv[2];
if (!out || !path.isAbsolute(out)) throw new Error('Pass a new absolute output directory');
await fs.mkdir(out, { recursive: false });
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const version = JSON.parse(await fs.readFile('package.json', 'utf8')).version;
const emittedModules = [];
const base = '/great-pyramid-11-7-lab/';
await build({
  root, base,
  build: { outDir: out, emptyOutDir: false },
  plugins: [{
    name: 'release-artifact-inventory',
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
const missingNoticePackages = gaps.map(name => ({ name, emittedModules: emittedModules.filter(row => row.module.includes(`node_modules/${name}/`)).length }));
if (missingNoticePackages.some(row => row.emittedModules)) throw new Error('Unresolved notice package emits code; resolve before deployment');
const runtimeFiles = {
  'etap-7': ['podglad.html', 'animation.js', 'section.js'],
  'etap-10': ['podglad.html', 'style.css', 'vortex.js', 'preview.js'],
  'etap-11': ['podglad.html', 'particles.js', 'extension.js', 'odbior.md'],
};
for (const [folder, files] of Object.entries(runtimeFiles)) {
  await fs.mkdir(path.join(out, folder));
  for (const file of files) await fs.copyFile(path.join(root, 'docs', folder, file), path.join(out, folder, file));
}
await fs.mkdir(path.join(out, 'wydanie'));
const hub = (await fs.readFile('docs/etap-13/index.html', 'utf8')).replaceAll('{{VERSION}}', version);
await fs.writeFile(path.join(out, 'wydanie/index.html'), hub);
await fs.writeFile(path.join(out, '.nojekyll'), '');
await fs.writeFile(path.join(out, 'release.json'), JSON.stringify({ version, sourceCommit, base, missingNoticePackages }, null, 2) + '\n');
await fs.writeFile(path.join(out, 'bundle-inventory.json'), JSON.stringify({ sourceCommit, base, missingNoticePackages, emittedModules }, null, 2) + '\n');
console.log(JSON.stringify({ out, version, sourceCommit, missingNoticePackages }));
