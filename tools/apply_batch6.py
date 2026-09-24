from pathlib import Path
import json
import re

path = Path('curation-overrides.js')
text = path.read_text(encoding='utf-8')

recommendation_edits = {
    '104': {'purposes': ['듣기', '집중하기', '기억하기'], 'sel': ['자기 조절']},
    '142': {'purposes': ['관찰하기', '비언어 소통', '신체 인식']},
    '144': {'purposes': ['협력하기', '문제 해결', '비언어 소통'], 'sel': ['자기 조절', '관계 기술', '문제 해결·선택']},
    '145': {'purposes': ['신체 인식', '감각 열기', '집중하기']},
    '164': {'purposes': ['신체 인식', '비언어 소통', '관계 열기']},
    '166': {'purposes': ['협력하기', '비언어 소통', '신체 인식'], 'activity_level': 'MEDIUM', 'movement_level': 'MEDIUM'},
    '167': {'purposes': ['협력하기', '비언어 소통', '신체 인식']},
    '168': {'purposes': ['집중하기', '공간 인식', '비언어 소통'], 'sel': ['자기 조절', '사회적 인식']},
    '174': {'purposes': ['리듬 맞추기', '자기표현', '협력하기']},
    '176': {'purposes': ['리듬 맞추기', '관찰하기', '상상 열기']},
    '183': {'purposes': ['관찰하기', '집중하기', '리듬 맞추기'], 'sel': ['자기 조절', '사회적 인식']},
    '184': {'purposes': ['듣기', '리듬 맞추기', '협력하기']},
    '187': {'purposes': ['관찰하기', '리듬 맞추기', '상상 열기']},
    '189': {'purposes': ['관찰하기', '비언어 소통', '리듬 맞추기']},
    '190': {'purposes': ['상상 열기', '자기표현', '즉흥 표현']},
    '191': {'purposes': ['듣기', '협력하기', '리듬 맞추기']},
    '192': {'purposes': ['신체 인식', '리듬 맞추기', '자기표현'], 'sel': ['자기 인식', '자기 조절']},
    '194': {'purposes': ['리듬 맞추기', '집중하기', '자기표현']},
    '222': {'purposes': ['집중하기', '비언어 소통', '신체 인식']},
    '226': {'purposes': ['상상 열기', '협력하기', '의사소통'], 'sel': ['관계 기술', '문제 해결·선택']},
    '230': {'purposes': ['관찰하기', '집중하기', '비언어 소통'], 'sel': ['자기 조절', '사회적 인식']},
    '231': {'purposes': ['공간 인식', '관찰하기', '협력하기']},
    '232': {'purposes': ['공간 인식', '관찰하기', '협력하기']},
    '233': {'purposes': ['공간 인식', '관찰하기', '비언어 소통']},
    '234': {'purposes': ['관계 열기', '비언어 소통', '관찰하기']},
    '235': {'purposes': ['관찰하기', '자기표현', '상상 열기'], 'sel': ['자기 인식', '사회적 인식']},
    '236': {'purposes': ['리듬 맞추기', '관찰하기', '비언어 소통']},
    '237': {'purposes': ['리듬 맞추기', '협력하기', '관찰하기']},
    '247': {'purposes': ['비언어 소통', '관찰하기', '관계 탐색']},
}

source_edits = {
    '144': {
        'activity_purpose_raw': '협력하기, 문제 해결, 비언어 소통',
        'teacher_prompt_raw': '손을 놓지 않아도 되는 길을 함께 찾되, 팔이 꺾이거나 몸이 눌리면 바로 멈추고 다른 경로를 찾아봅시다.',
        'sel_connections_raw': [
            {'sel_category': '자기 조절', 'explanation': '움직임이 복잡해지거나 불편함이 생기면 즉시 멈추고 속도와 힘을 조절합니다.'},
            {'sel_category': '관계 기술', 'explanation': '서로의 위치와 움직임을 확인하며 누구도 끌거나 밀지 않고 함께 원을 풀어 갑니다.'},
            {'sel_category': '문제 해결·선택', 'explanation': '얽힌 상태를 풀 수 있는 여러 이동 경로를 살펴보고 모두가 안전한 방법을 선택합니다.'}
        ]
    },
    '145': {
        'activity_purpose_raw': '신체 인식, 감각 열기, 집중하기',
        'teacher_prompt_raw': '물체를 억지로 붙잡기보다 물체가 기울거나 움직이는 작은 변화를 느끼면서 몸의 무게중심을 천천히 조절해봅시다.'
    },
    '166': {
        'activity_purpose_raw': '협력하기, 비언어 소통, 신체 인식',
        'activity_profile': {
            'activity_level_raw': '보통',
            'movement_level_raw': '보통',
            'noise_level_raw': '낮음',
            'contact_level_raw': '선택(비접촉 가능)',
            'collision_risk_raw': '낮음'
        }
    },
    '168': {
        'activity_purpose_raw': '집중하기, 공간 인식, 비언어 소통',
        'sel_connections_raw': [
            {'sel_category': '자기 조절', 'explanation': '방향 신호를 본 뒤 뛰거나 몸을 던지지 않고 약속한 범위 안에서 속도와 움직임을 조절합니다.'},
            {'sel_category': '사회적 인식', 'explanation': '리더의 방향 신호와 주변 친구의 위치를 함께 살피며 안전한 이동 공간을 읽습니다.'}
        ]
    },
    '174': {
        'teacher_prompt_raw': '처음 만든 리듬을 충분히 반복한 뒤, 소리·속도·움직임 중 한 요소만 바꾸어 새 리듬으로 넘어가 봅시다.',
        'reflection_question_raw': '처음 리듬에서 무엇을 바꾸었을 때 새로운 리듬으로 느껴졌나요?'
    },
    '177': {
        'teacher_prompt_raw': '옆 사람과 동시에 박수치는 순간을 정확히 맞추고, 내 차례가 지나간 뒤에도 원 전체의 박자를 계속 들어봅시다.',
        'reflection_question_raw': '연속 박수가 끊기지 않게 하려면 내 앞사람과 뒷사람의 어떤 신호를 들어야 했나요?'
    },
    '181': {
        'teacher_prompt_raw': '내가 받은 리듬을 먼저 정확히 확인한 뒤, 모양과 박자를 바꾸지 않고 반대쪽 끝까지 보내봅시다.',
        'reflection_question_raw': '양쪽 끝에서 온 리듬을 헷갈리지 않고 이어 보내기 위해 무엇에 집중했나요?'
    },
    '182': {
        'teacher_prompt_raw': '앞사람의 리듬을 한 번 정확히 받아 같은 모양으로 옆 사람에게 보내고, 원을 한 바퀴 도는 변화를 살펴봅시다.',
        'reflection_question_raw': '한 바퀴 돌아온 리듬은 처음과 무엇이 같고 무엇이 달라졌나요?'
    },
    '184': {
        'teacher_prompt_raw': '지휘자의 시작·멈춤·강약 신호를 보고, 내 소리를 정해진 순간에만 내며 전체 소리를 함께 들어봅시다.',
        'reflection_question_raw': '지휘자의 어떤 움직임이 소리의 시작·멈춤·강약을 가장 분명하게 알려 주었나요?'
    },
    '187': {
        'teacher_prompt_raw': '앞사람이 만든 상상 환경의 리듬과 소리를 먼저 정확히 받아, 그 장소의 느낌이 이어지도록 따라가 봅시다.',
        'reflection_question_raw': '상상한 환경이 달라지자 리듬의 속도·크기·소리는 어떻게 달라졌나요?'
    },
    '190': {
        'activity_purpose_raw': '신체 인식, 상상 열기, 자기표현, 즉흥 표현'
    },
    '191': {
        'teacher_prompt_raw': '지금 리더의 리듬을 먼저 정확히 받아 셋이 하나로 맞춘 뒤, 다음 리더의 변화 신호를 들어봅시다.'
    },
    '194': {
        'teacher_prompt_raw': '1·2·3 중 하나를 소리와 동작으로 바꾸어도 순서가 끊기지 않게 같은 자리를 계속 이어봅시다.',
        'reflection_question_raw': '숫자가 모두 사라진 뒤에도 1·2·3의 순서를 유지하게 한 단서는 무엇이었나요?'
    },
    '222': {
        'activity_purpose_raw': '집중하기, 비언어 소통, 신체 인식'
    },
    '226': {
        'activity_purpose_raw': '상상 열기, 협력하기, 의사소통',
        'teacher_prompt_raw': '앞사람의 전체 의도를 맞히려 하지 말고, 지금 보이는 작은 그림이나 문장 단서 하나를 받아 내 방식으로 이어봅시다.',
        'reflection_question_raw': '처음 의도와 달라도 공동 결과가 이어지게 만든 단서는 무엇이었나요?',
        'sel_connections_raw': [
            {'sel_category': '관계 기술', 'explanation': '앞사람이 남긴 단서를 지우지 않고 받아들인 뒤 자신의 아이디어를 더해 공동 결과물을 이어갑니다.'},
            {'sel_category': '문제 해결·선택', 'explanation': '제한된 단서에서 가능한 다음 그림이나 문장을 선택하고 결과가 이어지도록 조정합니다.'}
        ]
    },
    '228': {
        'teacher_prompt_raw': '역할 바꾸기 신호가 와도 움직임을 끊지 말고, 주도권만 자연스럽게 상대에게 넘겨봅시다.',
        'reflection_question_raw': '이끄는 사람이 바뀌었는데도 움직임의 흐름이 끊기지 않았던 순간에는 무엇이 달랐나요?'
    },
    '229': {
        'teacher_prompt_raw': '누가 계속 이끌지 정하지 말고, 상대의 제안을 받아들이면서 내 움직임도 작게 제안해봅시다.',
        'reflection_question_raw': '내가 이끈다거나 따라간다는 구분이 잠시 사라진 순간은 언제였나요?'
    },
    '230': {
        'activity_purpose_raw': '관찰하기, 집중하기, 비언어 소통'
    },
    '236': {
        'teacher_prompt_raw': '움직임의 모양만 따라 하지 말고 상대의 속도와 박자까지 같은 순간에 맞춰봅시다.',
        'reflection_question_raw': '두 사람의 리듬이 맞기 시작했다는 것을 알려 준 시각적 신호는 무엇이었나요?'
    },
    '237': {
        'teacher_prompt_raw': '내 리듬을 갑자기 버리기보다 주변 리듬과 겹치는 부분을 찾아 전체 흐름에 조금씩 맞춰봅시다.',
        'reflection_question_raw': '서로 다른 리듬이 하나로 모이거나 어울리기 시작한 순간에는 무엇이 변했나요?'
    },
    '247': {
        'activity_purpose_raw': '비언어 소통, 관찰하기, 관계 탐색'
    }
}

# Upsert recommendation entries. Entries in this object are formatted one per line for curated IDs.
rec_start = text.index('  const recommendationOverrides = {')
rec_end = text.index('\n};\n\n  const sourceEdits = {', rec_start)
rec_block = text[rec_start:rec_end]

for aid, edit in recommendation_edits.items():
    payload = json.dumps(edit, ensure_ascii=False, separators=(',', ':'))
    new_line = f'  "{aid}": {payload},'
    pattern = re.compile(rf'^  "{re.escape(aid)}": .*?(?:,)?$', re.M)
    if pattern.search(rec_block):
        rec_block = pattern.sub(new_line, rec_block, count=1)
    else:
        rec_block += '\n' + new_line

# Remove trailing comma before object close only by leaving it valid JS (trailing comma is allowed).
text = text[:rec_start] + rec_block + text[rec_end:]

# Add support for profile-level recommendation overrides once.
needle = "      if (Array.isArray(recommendationEdit.sel)) p.sel_tags = [...recommendationEdit.sel];\n      p.curation_status = 'CURATED_V1';"
if needle in text and "recommendationEdit.activity_level" not in text:
    replacement = "      if (Array.isArray(recommendationEdit.sel)) p.sel_tags = [...recommendationEdit.sel];\n      ['activity_level','movement_level','noise_level','contact_level','collision_risk'].forEach((key) => {\n        if (recommendationEdit[key] !== undefined) {\n          if (!(key in p.curation_original)) p.curation_original[key] = p[key];\n          p[key] = recommendationEdit[key];\n        }\n      });\n      p.curation_status = 'CURATED_V1';"
    text = text.replace(needle, replacement, 1)

# Existing source edit 104: add canonical purpose wording without disturbing its SEL edit.
old104 = '  "104": {\n      sel_connections_raw: ['
new104 = '  "104": {\n      activity_purpose_raw: \'듣기, 집중하기, 기억하기, 의사소통\',\n      sel_connections_raw: ['
if old104 in text and 'activity_purpose_raw: \'듣기, 집중하기, 기억하기, 의사소통\'' not in text:
    text = text.replace(old104, new104, 1)

# Append new source edits before sourceEdits object closes.
src_start = text.index('  const sourceEdits = {')
src_end = text.index('\n};\n\n  master.activities.forEach', src_start)
src_block = text[src_start:src_end]
for aid, edit in source_edits.items():
    if re.search(rf'^  ["\']{re.escape(aid)}["\']\s*:', src_block, re.M):
        continue
    payload = json.dumps(edit, ensure_ascii=False, indent=2)
    payload = '\n'.join('  ' + line for line in payload.splitlines())
    src_block += f'\n  "{aid}": ' + payload.strip() + ','
text = text[:src_start] + src_block + text[src_end:]

path.write_text(text, encoding='utf-8')
print('batch6 applied')
