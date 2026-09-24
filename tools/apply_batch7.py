from pathlib import Path

path = Path('curation-overrides.js')
text = path.read_text(encoding='utf-8')

marker = '  // BATCH7_RESIDUAL_ANOMALY_FIXES\n'
if marker in text:
    print('batch7 already present')
    raise SystemExit(0)

batch7_block = r'''  // BATCH7_RESIDUAL_ANOMALY_FIXES
  const batch7RecommendationOverrides = {
    "015": {
      "purposes": ["상상 열기", "비언어 소통", "협력하기"],
      "sel": ["사회적 인식", "관계 기술"],
      "space_types": ["CLASSROOM", "CLEARED_CLASSROOM", "MULTIPURPOSE_ROOM"],
      "materials_required": false,
      "materials_optional": false,
      "materials_detail": "없음",
      "participant_structure": "GROUPS",
      "activity_level": "LOW",
      "movement_level": "LOW",
      "noise_level": "LOW",
      "collision_risk": "LOW"
    },
    "062": {"purposes": ["상상 열기", "신체 인식", "자기표현"], "sel": ["자기 인식"]},
    "108": {"sel": ["자기 인식", "사회적 인식"]},
    "143": {"activity_level": "LOW", "movement_level": "LOW"},
    "147": {"purposes": ["리듬 맞추기", "집중하기", "협력하기"], "sel": ["자기 조절", "관계 기술"]},
    "171": {"activity_level": "MEDIUM", "movement_level": "MEDIUM"},
    "197": {"activity_level": "MEDIUM", "movement_level": "MEDIUM"}
  };

  const batch7SourceEdits = {
    "015": {
      "title": "상상 물건 릴레이",
      "activity_purpose_raw": "상상 열기, 비언어 소통, 협력하기",
      "class_conditions": {
        "grade_raw": "3~6학년",
        "time_raw": "5~10분",
        "participants_raw": "4~6명씩 소모둠",
        "space_raw": "일반 교실 · 책상 일부를 치운 교실 · 다목적실",
        "materials_raw": "없음"
      },
      "activity_profile": {
        "activity_level_raw": "낮음",
        "movement_level_raw": "낮음",
        "noise_level_raw": "낮음",
        "contact_level_raw": "없음",
        "collision_risk_raw": "낮음"
      },
      "sel_connections_raw": [
        {"sel_category": "사회적 인식", "explanation": "앞사람의 손 모양·자세·속도를 살펴 보이지 않는 물건의 크기와 무게, 성질을 읽습니다."},
        {"sel_category": "관계 기술", "explanation": "앞사람이 만든 물건의 조건을 바꾸지 않고 받아 다음 사람에게 같은 방식으로 이어 줍니다."}
      ],
      "summary_raw": "한 사람이 보이지 않는 물건의 크기·무게·온도·질감을 몸으로 만들고, 다음 사람이 그 성질을 받아 이어 가는 상상 릴레이입니다.",
      "procedure_raw": [
        {"step_number": 1, "text": "4~6명이 한 모둠이 되어 짧은 줄이나 반원을 만듭니다."},
        {"step_number": 2, "text": "첫 사람은 말하지 않고 보이지 않는 물건 하나를 듭니다. 무겁다, 아주 가볍다, 뜨겁다, 차갑다, 크다, 깨지기 쉽다처럼 한두 가지 성질을 몸으로 분명하게 만듭니다."},
        {"step_number": 3, "text": "두세 걸음 안에서 다음 사람에게 물건을 건넵니다. 다음 사람은 손의 간격·몸의 힘·속도를 보고 같은 물건으로 받아 이어 갑니다."},
        {"step_number": 4, "text": "모둠 끝까지 같은 물건의 성질이 유지되는지 살펴본 뒤, 두 번째 라운드에서는 한 사람이 성질 하나만 바꾸고 뒤의 사람들이 그 변화를 받아 이어 갑니다."}
      ],
      "teacher_prompt_raw": "물건 이름을 말하지 말고, 다음 사람이 같은 크기와 무게로 받을 수 있도록 손의 간격·몸의 힘·속도를 분명하게 보여 줍시다.",
      "reflection_question_raw": "다음 사람이 같은 물건이라고 알아차리게 만든 몸의 단서는 무엇이었나요?",
      "safety_notes_raw": [
        {"text": "실제 물건을 던지거나 주고받지 않고 보이지 않는 물건으로 진행합니다."},
        {"text": "이동은 두세 걸음의 걷기로 제한하고 모둠 사이 간격을 충분히 둡니다."}
      ]
    },
    "062": {
      "activity_purpose_raw": "상상 열기, 신체 인식, 자기표현",
      "sel_connections_raw": [
        {"sel_category": "자기 인식", "explanation": "이른 아침·점심·늦은 밤을 떠올리며 그 시간대에 나타나는 몸의 자세·속도·에너지 차이를 알아차립니다."}
      ],
      "teacher_prompt_raw": "시계 모양을 만들지 말고, 그 시간대에 몸이 얼마나 깨어 있는지 자세·속도·시선으로 보여 줍시다.",
      "reflection_question_raw": "아침·점심·밤을 다르게 보이게 한 몸의 자세나 움직임은 무엇이었나요?"
    },
    "064": {
      "teacher_prompt_raw": "손을 쓰지 않는 데만 집중하지 말고, 발·팔꿈치·어깨·등으로 보이지 않는 물건의 위치와 크기가 보이게 사용해 봅시다."
    },
    "104": {
      "activity_purpose_raw": "듣기, 집중하기, 기억하기, 의사소통"
    },
    "108": {
      "sel_connections_raw": [
        {"sel_category": "자기 인식", "explanation": "얼굴과 말을 쓰지 않을 때 발의 방향·보폭·무게 중심이 내 표현을 어떻게 바꾸는지 알아차립니다."},
        {"sel_category": "사회적 인식", "explanation": "다른 사람의 발과 다리 움직임만 보고 인물·행동·감정을 짐작하며 보이는 단서를 구체적으로 살핍니다."}
      ],
      "teacher_prompt_raw": "얼굴과 말 없이 발의 방향·보폭·멈춤만으로 인물이나 감정이 보이게 해 봅시다.",
      "reflection_question_raw": "관객에게 뜻이 가장 분명하게 전달된 발이나 다리의 움직임은 무엇이었나요?"
    },
    "111": {
      "teacher_prompt_raw": "얼굴을 보여 주지 않은 채 등의 기울기·긴장·호흡·속도만으로 감정이나 태도가 보이게 해 봅시다.",
      "reflection_question_raw": "등의 어떤 변화가 감정이나 태도를 가장 분명하게 보여 주었나요?"
    },
    "113": {
      "teacher_prompt_raw": "줄에 매달린 인형처럼 관절마다 움직임이 조금 늦게 이어진다고 상상하며, 장면 끝까지 그 움직임의 규칙을 유지해 봅시다.",
      "reflection_question_raw": "줄인형처럼 보이게 만든 움직임의 규칙을 장면 속에서 어떻게 유지했나요?"
    },
    "114": {
      "teacher_prompt_raw": "교사가 정한 신체 부위가 장면을 이끌게 하되, 그 부위만 흔드는 것이 아니라 인물의 행동과 관계까지 함께 바꾸어 봅시다.",
      "reflection_question_raw": "한 신체 부위에 집중했을 때 인물의 행동이나 장면의 관계가 어떻게 달라졌나요?"
    },
    "143": {
      "activity_profile": {
        "activity_level_raw": "낮음",
        "movement_level_raw": "낮음",
        "noise_level_raw": "낮음",
        "contact_level_raw": "없음",
        "collision_risk_raw": "낮음"
      },
      "teacher_prompt_raw": "바닥에 닿는 지점을 억지로 줄이지 말고, 지지점이 하나 줄 때마다 몸의 어느 부분이 균형을 맡는지 천천히 느껴봅시다."
    },
    "147": {
      "sel_connections_raw": [
        {"sel_category": "자기 조절", "explanation": "번호 신호를 듣고 걷기에서 정지 자세로 바뀌는 순간을 놓치지 않도록 주의와 움직임을 조절합니다."},
        {"sel_category": "관계 기술", "explanation": "모둠이 같은 번호 순서를 공유하며 자세 전환의 타이밍을 맞춰 하나의 흐름을 만듭니다."}
      ],
      "summary_raw": "의자 옆에서 만든 정지 자세에 번호를 붙이고, 번호 신호에 따라 자세를 차례로 연결해 집단의 움직임 리듬을 만드는 활동입니다.",
      "teacher_prompt_raw": "번호를 빨리 맞히는 것보다 걷기에서 정지 자세로 바뀌는 순간과 모둠의 전환 타이밍을 함께 맞춰 봅시다."
    },
    "169": {
      "summary_raw": "머리·어깨·가슴·골반을 작은 범위로 좌우·앞뒤·원형으로 움직이며 힘을 빼고 각 부위의 움직임 차이를 느껴보는 활동입니다."
    },
    "170": {
      "summary_raw": "앉은 자세에서 몸의 오른쪽과 왼쪽을 번갈아 사용해 조금씩 이동하며 좌우의 무게 이동과 협응을 느껴보는 활동입니다."
    },
    "171": {
      "activity_profile": {
        "activity_level_raw": "보통",
        "movement_level_raw": "보통",
        "noise_level_raw": "낮음",
        "contact_level_raw": "없음",
        "collision_risk_raw": "낮음"
      },
      "summary_raw": "몸과 이동 경로를 직선과 곡선으로 바꾸어 보며 두 움직임의 방향·속도·긴장감 차이를 탐색하는 활동입니다.",
      "procedure_raw": [
        {"step_number": 1, "text": "개인 공간에서 팔·등·다리로 각진 직선 모양과 둥근 곡선 모양을 번갈아 만들어 봅니다."},
        {"step_number": 2, "text": "넓은 통로에서 네다섯 걸음은 직선 경로로, 다음 네다섯 걸음은 부드러운 곡선 경로로 천천히 이동합니다."},
        {"step_number": 3, "text": "같은 속도에서도 몸의 모양과 시선 방향을 바꾸어 직선과 곡선의 느낌이 어떻게 달라지는지 비교합니다."},
        {"step_number": 4, "text": "직선 한 구간과 곡선 한 구간을 이어 짧은 움직임 순서를 만들고, 달리거나 급회전하지 않은 채 반복합니다."}
      ],
      "teacher_prompt_raw": "직선은 어디가 각지고 곧게 보이는지, 곡선은 어디가 이어지고 휘어 보이는지 몸과 이동 경로를 비교해 봅시다.",
      "reflection_question_raw": "같은 몸으로 움직였는데 직선과 곡선이 다르게 보이게 만든 가장 큰 차이는 무엇이었나요?",
      "safety_notes_raw": [
        {"text": "넓은 통로를 확보하고 이동은 걷기로만 진행합니다."},
        {"text": "급회전·달리기·관절을 끝까지 꺾는 동작은 사용하지 않습니다."}
      ]
    },
    "197": {
      "activity_profile": {
        "activity_level_raw": "보통",
        "movement_level_raw": "보통",
        "noise_level_raw": "보통",
        "contact_level_raw": "없음",
        "collision_risk_raw": "낮음"
      }
    },
    "250": {
      "teacher_prompt_raw": "앞사람의 행동을 설명하거나 맞히려 하기보다, 그 행동이 놓인 장면에 필요한 다음 행동 하나를 몸으로 이어 붙여 봅시다.",
      "reflection_question_raw": "새 행동이 들어왔을 때 여러 사람의 행동이 하나의 장면으로 보이게 만든 연결 단서는 무엇이었나요?"
    }
  };

  Object.assign(recommendationOverrides, batch7RecommendationOverrides);
  Object.assign(sourceEdits, batch7SourceEdits);
'''

needle = '  master.activities.forEach((activity) => {'
if needle not in text:
    raise SystemExit('master.activities loop marker not found')
text = text.replace(needle, batch7_block + '\n' + needle, 1)

old_keys = "['activity_level','movement_level','noise_level','contact_level','collision_risk'].forEach((key) => {"
new_keys = "['activity_level','movement_level','noise_level','contact_level','collision_risk','space_types','materials_required','materials_optional','materials_detail','participant_structure'].forEach((key) => {"
if old_keys in text:
    text = text.replace(old_keys, new_keys, 1)
elif new_keys not in text:
    raise SystemExit('recommendation profile override key list not found')

path.write_text(text, encoding='utf-8')
print('batch7 applied')
