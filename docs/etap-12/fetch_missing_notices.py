"""Read version-pinned upstream licences omitted by the installed npm archives.
Run only for this audit's fixed dependency versions; no dependency installation.
"""
import hashlib
import json
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parent / 'upstream-notices'
OUT.mkdir(exist_ok=True)
sources = [
    ('@react-three/fiber', '9.7.0', 'MIT', 'https://raw.githubusercontent.com/pmndrs/react-three-fiber/v9.7.0/LICENSE'),
    ('maath', '0.10.8', 'MIT', 'https://raw.githubusercontent.com/pmndrs/maath/v0.10.8/LICENSE'),
    ('stats-gl', '2.4.2', 'MIT', 'https://raw.githubusercontent.com/RenaudRohlinger/stats-gl/v2.4.2/LICENSE'),
    ('draco3d', '1.5.7', 'Apache-2.0', 'https://raw.githubusercontent.com/google/draco/1.5.7/LICENSE'),
    ('@mediapipe/tasks-vision', '0.10.17', 'Apache-2.0', 'https://raw.githubusercontent.com/google-ai-edge/mediapipe/v0.10.17/LICENSE'),
    ('victory-vendor', '36.9.2', 'MIT AND ISC', 'https://raw.githubusercontent.com/FormidableLabs/victory/v36.9.2/LICENSE.txt'),
]
rows = []
for name, version, licence, url in sources:
    row = dict(name=name, version=version, licence=licence, url=url)
    try:
        data = urllib.request.urlopen(url, timeout=20).read()
        if len(data) < 500 or b'<html' in data.lower():
            raise ValueError('Unexpected licence response')
        filename = name.replace('@', '').replace('/', '-') + '.txt'
        (OUT / filename).write_bytes(data)
        row.update(file=filename, sha256=hashlib.sha256(data).hexdigest(), status='retrieved')
    except Exception as error:
        row.update(status='unverified', error=str(error))
    rows.append(row)
    print(name, row['status'])
(OUT / 'sources.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
