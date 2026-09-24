from pathlib import Path
import re
from collections import Counter, defaultdict

text = Path('index.html').read_text(encoding='utf-8')
activity_matches = list(re.finditer(r'"activity_id"\s*:\s*"(\d{3})"', text))
rows = []

for i, m in enumerate(activity_matches):
    aid = m.group(1)
    start = m.start()
    end = activity_matches[i + 1].start() if i + 1 < len(activity_matches) else min(len(text), start + 30000)
    chunk = text[start:end]

    title = ''
    for key in ['title_raw', 'activity_name_raw', 'activity_name', 'title', 'name_raw', 'name']:
        tm = re.search(r'"' + re.escape(key) + r'"\s*:\s*"((?:\\.|[^"\\])*)"', chunk)
        if tm:
            title = bytes(tm.group(1), 'utf-8').decode('unicode_escape') if '\\u' in tm.group(1) else tm.group(1)
            break

    sm = re.search(r'"sel_connections_raw"\s*:\s*\[(.*?)\]\s*(?:,|})', chunk, re.S)
    if not sm:
        continue
    block = sm.group(1)
    pairs = re.findall(r'"sel_category"\s*:\s*"((?:\\.|[^"\\])*)"\s*,\s*"explanation"\s*:\s*"((?:\\.|[^"\\])*)"', block, re.S)
    for cat, expl in pairs:
        rows.append((aid, title, cat, expl))

counts = Counter(expl for _, _, _, expl in rows)
by_expl = defaultdict(list)
for aid, title, cat, expl in rows:
    by_expl[expl].append((aid, title, cat))

out = []
out.append('# SEL explanation audit')
out.append('')
out.append(f'- activities detected: {len(activity_matches)}')
out.append(f'- SEL explanation rows: {len(rows)}')
out.append(f'- unique explanations: {len(counts)}')
out.append('')
out.append('## Repeated explanations')
out.append('')
for expl, count in counts.most_common():
    if count < 2:
        continue
    out.append(f'### {count}× — {expl}')
    for aid, title, cat in by_expl[expl]:
        out.append(f'- {aid} | {title} | {cat}')
    out.append('')

out.append('## All SEL explanations by activity')
out.append('')
for aid, title, cat, expl in rows:
    out.append(f'- {aid} | {title} | {cat} | {expl}')

Path('sel-audit-report.md').write_text('\n'.join(out), encoding='utf-8')
print(f'Wrote {len(rows)} rows, {len(counts)} unique explanations')
