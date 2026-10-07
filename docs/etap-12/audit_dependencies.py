"""Release inventory and verbatim package notices, using local installed packages.

Run from the application root after npm ci: python docs/etap-12/audit_dependencies.py
No project licence is assigned. No network calls or package changes.
"""
import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
lock = json.loads((ROOT / 'package-lock.json').read_text(encoding='utf-8'))
manifest = json.loads((ROOT / 'package.json').read_text(encoding='utf-8'))
rows, notices, problems = [], [], []
upstream_path = OUT / 'upstream-notices' / 'sources.json'
upstream = {r['name']: r for r in json.loads(upstream_path.read_text(encoding='utf-8')) if r['status'] == 'retrieved'} if upstream_path.exists() else {}
for key, entry in sorted(lock['packages'].items()):
    if not key:
        continue
    folder = ROOT / key
    installed = json.loads((folder / 'package.json').read_text(encoding='utf-8')) if (folder / 'package.json').exists() else {}
    name = installed.get('name') or key.rsplit('node_modules/', 1)[-1]
    version = entry['version']
    licence = installed.get('license') or entry.get('license') or 'UNRESOLVED'
    production = not entry.get('dev', False)
    if installed and installed.get('version') != version:
        problems.append(f'{key}: installed version differs from lock')
    files = []
    if folder.is_dir():
        files = sorted(p for p in folder.iterdir() if p.is_file() and p.name.lower().split('.')[0] in ('license', 'licence', 'copying', 'notice', 'license-mit', 'license-isc'))
    # This package vendors ISC-licensed d3 code inside its own archive.
    if name == 'victory-vendor':
        files += sorted((folder / 'lib-vendor').glob('*/LICENSE'))
    if licence == 'UNRESOLVED' and files and files[0].read_text(encoding='utf-8').startswith('MIT License'):
        licence = 'MIT'
    extra = upstream.get(name)
    if extra and extra['version'] != version:
        problems.append(f'{key}: upstream notice version differs from lock')
        extra = None
    row = dict(path=key, name=name, version=version, licence=licence,
               production=production, direct=key == f'node_modules/{name}' and name in {**manifest['dependencies'], **manifest['devDependencies']},
               installed=bool(installed), notices=[p.relative_to(folder).as_posix() for p in files],
               upstreamNotice=extra)
    rows.append(row)
    if production:
        if not installed or not (files or extra) or licence == 'UNRESOLVED':
            problems.append(f'{key}: missing production package or licence evidence')
        notices.append(f'===== {name} {version} | {licence} =====\n')
        for path in files:
            content = path.read_text(encoding='utf-8', errors='replace')
            notices.append(f'--- {key}/{path.name} ---\n{content}\n')
        if extra:
            path = OUT / 'upstream-notices' / extra['file']
            data = path.read_bytes()
            if hashlib.sha256(data).hexdigest() != extra['sha256']:
                raise ValueError(f'Upstream notice hash mismatch: {name}')
            notices.append(f"--- {extra['url']} ---\n{data.decode('utf-8')}\n")
        if not (files or extra):
            notices.append('Full notice absent from the npm archive; see the unresolved release inventory.\n')

report = dict(lockSha256=hashlib.sha256((ROOT / 'package-lock.json').read_bytes()).hexdigest(),
              scope='All lock entries; notices cover the non-dev package superset, not a tree-shaken bundle analysis. Native Maven/Gradle dependencies are outside this inventory.',
              productionCount=sum(r['production'] for r in rows),
              productionLicences=dict(Counter(str(r['licence']) for r in rows if r['production'])),
              problems=problems, packages=rows)
(OUT / 'dependencies.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
header = ('Third-party package notices — Pyramid 11:7 test review, 2026-10-06\n'
          'These licences apply only to the named third-party packages.\n'
          'No licence for the Pyramid 11:7 project is granted by this file.\n'
          'Generated from installed packages matching package-lock.json.\n'
          'Includes all non-dev dependencies, a superset of browser bundle contents.\n\n')
(ROOT / 'public' / 'third-party-notices.txt').write_text((header+'\n'.join(notices)).rstrip()+'\n', encoding='utf-8')
print(json.dumps({k: report[k] for k in ('productionCount', 'productionLicences', 'problems')}, ensure_ascii=False))
if problems:
    raise SystemExit(1)
