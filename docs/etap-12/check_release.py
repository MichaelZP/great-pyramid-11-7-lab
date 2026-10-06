"""Bounded repository secret/file/link check; prints findings without matched values.

Heuristic inspection, not a guarantee that arbitrary secrets cannot exist.
Run from the application root before staging/pushing. Ignores Git-ignored files.
"""
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[2]
paths = subprocess.check_output(
    ['git', 'ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    cwd=ROOT).decode('utf-8').split('\0')
patterns = {
    'private-key': re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'),
    'github-token': re.compile(r'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b'),
    'aws-access-key': re.compile(r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b'),
    'credential-assignment': re.compile(r'(?im)^\s*(?:api[_-]?key|secret|password|access[_-]?token)\s*[:=]\s*[\"\x27][A-Za-z0-9_+/=-]{20,}[\"\x27]'),
}
findings, checked = [], 0
for relative in sorted(set(paths)):
    if not relative:
        continue
    path = ROOT / relative
    if not path.is_file():
        continue
    if (path.name == '.env' or path.name.startswith('.env.') or
            path.name == 'local.properties' or path.suffix.lower() in
            ('.apk', '.aab', '.jks', '.keystore', '.p12', '.pfx', '.pem')):
        findings.append({'file': relative, 'kind': 'unexpected-sensitive-or-generated-file'})
    data = path.read_bytes()
    if b'\0' in data:
        continue
    content = data.decode('utf-8', errors='replace')
    checked += 1
    for name, regex in patterns.items():
        for match in regex.finditer(content):
            findings.append({'file': relative, 'line': content.count('\n', 0, match.start()) + 1, 'kind': name})

links = []
for relative in ('docs/ETAP-12.md', 'docs/RELEASE_NOTES.md',
                 'docs/MANUAL_ACCEPTANCE.md', 'docs/THIRD_PARTY.md'):
    path = ROOT / relative
    for target in re.findall(r'\]\(([^)]+)\)', path.read_text(encoding='utf-8')):
        if '://' in target or target.startswith('#'):
            continue
        resolved = path.parent / unquote(target.split('#')[0])
        if not resolved.exists():
            links.append({'file': relative, 'target': target})
result = {'scope': 'Git tracked and non-ignored untracked app-repository files; heuristic scan, no matched secret values stored',
          'textFilesChecked': checked, 'findings': findings, 'brokenReleaseLinks': links}
output = Path(__file__).with_name('release-check.json')
output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(json.dumps(result, indent=2))
raise SystemExit(1 if findings or links else 0)
