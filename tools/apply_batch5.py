from pathlib import Path

path = Path('curation-overrides.js')
text = path.read_text(encoding='utf-8')

new_entries = {
    '055': ['관찰하기', '비언어 소통', '집중하기'],
    '056': ['비언어 소통', '협력하기', '신뢰 형성'],
    '065': ['상상 열기', '비언어 소통', '감각 열기'],
    '068': ['의사소통', '관찰하기', '상상 열기'],
    '072': ['관찰하기', '관계 열기', '문제 해결'],
    '073': ['관계 열기', '비언어 소통', '관찰하기'],
    '074': ['듣기', '비언어 소통', '상상 열기'],
    '075': ['비언어 소통', '관계 열기', '관찰하기'],
    '078': ['리듬 맞추기', '몸 깨우기', '협력하기'],
    '082': ['신체 인식', '자기표현', '상상 열기'],
    '088': ['듣기', '리듬 맞추기', '집중하기'],
    '090': ['관찰하기', '듣기', '집중하기'],
    '091': ['의사소통', '협력하기', '집중하기'],
    '094': ['듣기', '의사소통', '집중하기'],
    '095': ['의사소통', '상상 열기', '협력하기'],
    '096': ['비언어 소통', '상상 열기', '협력하기'],
    '097': ['비언어 소통', '의사소통', '듣기'],
    '115': ['목소리 열기', '듣기', '상상 열기'],
    '116': ['리듬 맞추기', '목소리 열기', '협력하기'],
    '117': ['듣기', '감각 열기', '협력하기'],
    '132': ['듣기', '상상 열기', '협력하기'],
    '136': ['관계 열기', '관찰하기', '집중하기'],
    '137': ['공간 인식', '관찰하기', '협력하기'],
}

start_marker = '  const recommendationOverrides = {'
end_marker = '\n};\n\n  const sourceEdits = {'
start = text.index(start_marker)
end = text.index(end_marker, start)
block = text[start:end]

missing = [aid for aid in new_entries if f'"{aid}":' not in block]
if missing:
    lines = []
    for aid in missing:
        purposes = ', '.join(f'"{p}"' for p in new_entries[aid])
        lines.append(f'  "{aid}": {{"purposes": [{purposes}]}},')
    insertion = '\n' + '\n'.join(lines) + '\n'
    # add before the recommendation object closing brace; make preceding last property comma-safe
    before = text[:end]
    after = text[end:]
    stripped = before.rstrip()
    if stripped.endswith('}') and not stripped.endswith('},'):
        pos = len(stripped)
        stripped = stripped + ','
        before = stripped + before[len(before.rstrip()):]
    text = before + insertion + after

path.write_text(text, encoding='utf-8')
print('Inserted recommendation overrides:', ', '.join(missing) if missing else 'none')
