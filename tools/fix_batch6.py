from pathlib import Path

path = Path('curation-overrides.js')
text = path.read_text(encoding='utf-8')
needle = '무대의 무게중심을 움직여 봅시다."}\n  "144":'
replacement = '무대의 무게중심을 움직여 봅시다."},\n  "144":'
if needle not in text:
    raise SystemExit('batch6 source boundary not found')
text = text.replace(needle, replacement, 1)
path.write_text(text, encoding='utf-8')
print('batch6 source comma fixed')
