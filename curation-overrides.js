/*
 * Curated recommendation/content overrides
 * -----------------------------------------
 * A-grade changes affect recommendation-facing metadata only.
 * B-grade changes affect source_preserved and must later be reflected in the PDF.
 * Every change must also be recorded in CURATION_CHANGELOG.md.
 */
(function () {
  'use strict';

  const master = window.ACTIVITY_MASTER;
  if (!master || !Array.isArray(master.activities)) return;

  const recommendationOverrides = {
  "003": {
    "purposes": ["리듬 맞추기", "신체 인식", "상상 열기"],
    "sel": ["자기 인식", "자기 조절"]
  },
  "007": {"purposes": ["협력하기", "관찰하기", "비언어 소통"]},
  "008": {
    "purposes": ["관찰하기", "비언어 소통", "집중하기"],
    "sel": ["자기 조절", "사회적 인식", "관계 기술"]
  },
  "012": {
    "purposes": ["목소리 열기", "관찰하기", "비언어 소통"],
    "sel": ["사회적 인식", "관계 기술"]
  },
  "013": {"purposes": ["협력하기", "상상 열기", "문제 해결"], "sel": ["관계 기술"]},
  "014": {"purposes": ["듣기", "감각 열기", "상상 열기"], "sel": ["사회적 인식"]},
  "018": {"purposes": ["리듬 맞추기", "협력하기", "관계 열기"], "sel": ["자기 조절", "관계 기술"]},
  "020": {"purposes": ["감각 열기", "자기 인식", "공간 인식"], "sel": ["자기 인식", "사회적 인식"]},
  "021": {"purposes": ["신체 인식", "자기 인식", "긴장 완화"], "sel": ["자기 인식", "자기 조절"]},
  "022": {"purposes": ["공간 인식", "감각 열기", "신체 인식"], "sel": ["자기 인식", "자기 조절"]},
  "025": {"purposes": ["공간 인식", "감각 열기", "협력하기"], "sel": ["자기 인식", "사회적 인식", "관계 기술"]},
  "027": {"purposes": ["협력하기", "비언어 소통", "상상 열기"], "sel": ["사회적 인식", "관계 기술"]},
  "028": {"purposes": ["협력하기", "리듬 맞추기", "비언어 소통"], "sel": ["자기 조절", "사회적 인식", "관계 기술"]},
  "029": {"purposes": ["상상 열기", "협력하기", "몸 깨우기"], "sel": ["자기 조절", "관계 기술"]},
  "030": {"purposes": ["집중하기", "비언어 소통", "신체 인식"], "sel": ["자기 조절", "사회적 인식"]},
  "031": {"purposes": ["협력하기", "비언어 소통", "상상 열기"], "sel": ["사회적 인식", "관계 기술"]},
  "032": {"purposes": ["협력하기", "비언어 소통", "문제 해결"]},
  "033": {"purposes": ["관찰하기", "상상 열기", "협력하기"], "sel": ["사회적 인식", "관계 기술"]},
  "034": {"purposes": ["신체 인식", "상상 열기", "협력하기"], "sel": ["자기 인식", "관계 기술"]},
  "035": {"purposes": ["상상 열기", "비언어 소통", "자기표현"], "sel": ["사회적 인식", "관계 기술"]},
  "037": {"purposes": ["신체 인식", "상상 열기", "협력하기"], "sel": ["자기 인식", "관계 기술"]},
  "038": {"purposes": ["관찰하기", "협력하기", "상상 열기"], "sel": ["사회적 인식", "관계 기술"]},
  "039": {"purposes": ["관찰하기", "집중하기", "협력하기"], "sel": ["자기 조절", "사회적 인식"]},
  "040": {"purposes": ["리듬 맞추기", "관찰하기", "관계 열기"], "sel": ["자기 조절", "사회적 인식", "관계 기술"]},
  "041": {"purposes": ["집중하기", "관찰하기", "듣기"], "sel": ["자기 조절"]},
  "045": {"purposes": ["관찰하기", "집중하기", "비언어 소통"], "sel": ["자기 조절", "사회적 인식"]},
  "051": {"purposes": ["협력하기", "상상 열기", "비언어 소통"]},
  "052": {"purposes": ["관찰하기", "협력하기", "상상 열기"]},
  "053": {"purposes": ["관계 열기", "비언어 소통", "협력하기"], "sel": ["사회적 인식", "관계 기술"]},
  "054": {"purposes": ["리듬 맞추기", "관찰하기", "관계 열기"], "sel": ["자기 조절", "사회적 인식", "관계 기술"]},
  "058": {"purposes": ["공간 인식", "관찰하기", "협력하기"]},
  "059": {"purposes": ["관찰하기", "관계 열기", "상상 열기"]},
  "060": {"purposes": ["상상 열기", "문제 해결", "협력하기"]},
  "061": {"purposes": ["관찰하기", "상상 열기", "협력하기"]},
  "099": {"purposes": ["의사소통", "듣기", "비언어 소통"]},
  "100": {"purposes": ["듣기", "리듬 맞추기", "집중하기"]},
  "102": {"purposes": ["비언어 소통", "듣기", "의사소통"]},
  "103": {"purposes": ["듣기", "목소리 열기", "비언어 소통"]},
  "104": {"purposes":["듣기","집중하기","기억하기"],"sel":["자기 조절"]},
  "109": {"purposes": ["비언어 소통", "관계 열기", "신체 인식"]},
  "118": {"purposes": ["상상 열기", "협력하기", "자기표현"]},
  "120": {"purposes": ["듣기", "협력하기", "비언어 소통"], "sel": ["사회적 인식", "관계 기술"]},
  "121": {"purposes": ["듣기", "목소리 열기", "협력하기"]},
  "122": {"purposes": ["듣기", "비언어 소통", "협력하기"]},
  "125": {"purposes": ["상상 열기", "문제 해결", "협력하기"]},
  "126": {"purposes": ["비언어 소통", "상상 열기", "문제 해결"]},
  "128": {"purposes": ["목소리 열기", "감각 열기", "듣기"], "sel": ["자기 인식", "자기 조절"]},
  "129": {"purposes": ["듣기", "상상 열기", "협력하기"]},
  "130": {"purposes": ["듣기", "집중하기", "상상 열기"]},
  "140": {"purposes": ["공간 인식", "관찰하기", "협력하기"]},
  "055": {"purposes": ["관찰하기", "비언어 소통", "집중하기"]},
  "056": {"purposes": ["비언어 소통", "협력하기", "신뢰 형성"]},
  "065": {"purposes": ["상상 열기", "비언어 소통", "감각 열기"]},
  "068": {"purposes": ["의사소통", "관찰하기", "상상 열기"]},
  "072": {"purposes": ["관찰하기", "관계 열기", "문제 해결"]},
  "073": {"purposes": ["관계 열기", "비언어 소통", "관찰하기"]},
  "074": {"purposes": ["듣기", "비언어 소통", "상상 열기"]},
  "075": {"purposes": ["비언어 소통", "관계 열기", "관찰하기"]},
  "078": {"purposes": ["리듬 맞추기", "몸 깨우기", "협력하기"]},
  "082": {"purposes": ["신체 인식", "자기표현", "상상 열기"]},
  "088": {"purposes": ["듣기", "리듬 맞추기", "집중하기"]},
  "090": {"purposes": ["관찰하기", "듣기", "집중하기"]},
  "091": {"purposes": ["의사소통", "협력하기", "집중하기"]},
  "094": {"purposes": ["듣기", "의사소통", "집중하기"]},
  "095": {"purposes": ["의사소통", "상상 열기", "협력하기"]},
  "096": {"purposes": ["비언어 소통", "상상 열기", "협력하기"]},
  "097": {"purposes": ["비언어 소통", "의사소통", "듣기"]},
  "115": {"purposes": ["목소리 열기", "듣기", "상상 열기"]},
  "116": {"purposes": ["리듬 맞추기", "목소리 열기", "협력하기"]},
  "117": {"purposes": ["듣기", "감각 열기", "협력하기"]},
  "132": {"purposes": ["듣기", "상상 열기", "협력하기"]},
  "136": {"purposes": ["관계 열기", "관찰하기", "집중하기"]},
  "137": {"purposes": ["공간 인식", "관찰하기", "협력하기"]},

  "142": {"purposes":["관찰하기","비언어 소통","신체 인식"]},
  "144": {"purposes":["협력하기","문제 해결","비언어 소통"],"sel":["자기 조절","관계 기술","문제 해결·선택"]},
  "145": {"purposes":["신체 인식","감각 열기","집중하기"]},
  "164": {"purposes":["신체 인식","비언어 소통","관계 열기"]},
  "166": {"purposes":["협력하기","비언어 소통","신체 인식"],"activity_level":"MEDIUM","movement_level":"MEDIUM"},
  "167": {"purposes":["협력하기","비언어 소통","신체 인식"]},
  "168": {"purposes":["집중하기","공간 인식","비언어 소통"],"sel":["자기 조절","사회적 인식"]},
  "174": {"purposes":["리듬 맞추기","자기표현","협력하기"]},
  "176": {"purposes":["리듬 맞추기","관찰하기","상상 열기"]},
  "183": {"purposes":["관찰하기","집중하기","리듬 맞추기"],"sel":["자기 조절","사회적 인식"]},
  "184": {"purposes":["듣기","리듬 맞추기","협력하기"]},
  "187": {"purposes":["관찰하기","리듬 맞추기","상상 열기"]},
  "189": {"purposes":["관찰하기","비언어 소통","리듬 맞추기"]},
  "190": {"purposes":["상상 열기","자기표현","즉흥 표현"]},
  "191": {"purposes":["듣기","협력하기","리듬 맞추기"]},
  "192": {"purposes":["신체 인식","리듬 맞추기","자기표현"],"sel":["자기 인식","자기 조절"]},
  "194": {"purposes":["리듬 맞추기","집중하기","자기표현"]},
  "222": {"purposes":["집중하기","비언어 소통","신체 인식"]},
  "226": {"purposes":["상상 열기","협력하기","의사소통"],"sel":["관계 기술","문제 해결·선택"]},
  "230": {"purposes":["관찰하기","집중하기","비언어 소통"],"sel":["자기 조절","사회적 인식"]},
  "231": {"purposes":["공간 인식","관찰하기","협력하기"]},
  "232": {"purposes":["공간 인식","관찰하기","협력하기"]},
  "233": {"purposes":["공간 인식","관찰하기","비언어 소통"]},
  "234": {"purposes":["관계 열기","비언어 소통","관찰하기"]},
  "235": {"purposes":["관찰하기","자기표현","상상 열기"],"sel":["자기 인식","사회적 인식"]},
  "236": {"purposes":["리듬 맞추기","관찰하기","비언어 소통"]},
  "237": {"purposes":["리듬 맞추기","협력하기","관찰하기"]},
  "247": {"purposes":["비언어 소통","관찰하기","관계 탐색"]},
};

  const sourceEdits = {
  "007": {"reflection_question_raw": "다른 사람의 행동을 보고 내가 들어가야 할 역할을 알아차린 순간은 언제였나요?"},
  "014": {"teacher_prompt_raw": "이야기 내용은 바꾸지 말고, 상대가 들려준 장면에 색·소리·냄새·질감 같은 감각 단서를 하나씩 더해 봅시다.", "reflection_question_raw": "어떤 감각 정보를 더했을 때 이야기 장면이 가장 선명하게 떠올랐나요?"},
  "028": {"sel_connections_raw": [
    {"sel_category": "자기 조절", "explanation": "보이지 않는 줄의 속도와 들어가는 타이밍에 맞춰 점프의 크기와 시작·멈춤을 조절합니다."},
    {"sel_category": "사회적 인식", "explanation": "줄을 돌리는 사람과 뛰는 사람의 몸짓을 보며 서로가 가정한 줄의 높이와 리듬이 같은지 살핍니다."},
    {"sel_category": "관계 기술", "explanation": "말로 설명하지 않아도 같은 보이지 않는 줄을 공유하도록 위치와 박자를 맞춥니다."}
  ]},
  "030": {"sel_connections_raw": [
    {"sel_category": "자기 조절", "explanation": "보이지 않는 공의 궤적을 놓치지 않으면서 작은 범위 안에서 피하는 움직임의 크기와 속도를 조절합니다."},
    {"sel_category": "사회적 인식", "explanation": "다른 친구들이 바라보고 던지는 방향을 단서로 공의 현재 위치와 움직임을 읽습니다."}
  ]},
  "032": {"teacher_prompt_raw": "누가 이끌려고 하지 말고, 보이지 않는 물건의 무게나 방향이 바뀌면 모두가 같은 순간에 반응해 봅시다.", "reflection_question_raw": "같은 보이지 않는 물건의 무게와 위치를 함께 유지하려면 누구의 어떤 움직임을 가장 많이 읽었나요?"},
  "034": {"sel_connections_raw": [
    {"sel_category": "자기 인식", "explanation": "용기가 가벼울 때와 무거워질 때 팔·다리·등에 들어가는 힘과 자세의 변화를 알아차립니다."},
    {"sel_category": "관계 기술", "explanation": "여럿이 같은 보이지 않는 물건을 들 때 높이와 무게중심이 어긋나지 않도록 서로의 움직임을 맞춥니다."}
  ]},
  "035": {"sel_connections_raw": [
    {"sel_category": "사회적 인식", "explanation": "앞사람이 보이지 않는 물건을 어떻게 잡고 쓰는지 관찰해 그 물건의 크기·무게·성질을 읽습니다."},
    {"sel_category": "관계 기술", "explanation": "앞사람이 만든 물건의 조건을 먼저 받아들인 뒤 자신의 사용을 더해 다음 사람에게 이어 줍니다."}
  ]},
  "037": {"sel_connections_raw": [
    {"sel_category": "자기 인식", "explanation": "상상한 탈것의 기울기·흔들림·속도 변화가 내 몸의 중심과 자세를 어떻게 바꾸는지 알아차립니다."},
    {"sel_category": "관계 기술", "explanation": "서로를 그대로 따라 하기보다 같은 탈것 안에 있다는 가정을 공유하며 움직임의 흐름을 함께 유지합니다."}
  ]},
  "039": {"sel_connections_raw": [
    {"sel_category": "자기 조절", "explanation": "첫 번째 줄의 순서를 짧은 시간 안에 기억하기 위해 시선을 분산하지 않고 관찰의 초점을 유지합니다."},
    {"sel_category": "사회적 인식", "explanation": "친구들의 위치·옷차림·키·움직임 같은 단서를 살펴 각 사람의 자리를 구분합니다."}
  ]},
  "040": {"sel_connections_raw": [
    {"sel_category": "자기 조절", "explanation": "노래의 박자를 들으며 보기·이동·회전·역할 교대의 순서를 놓치지 않도록 움직임을 조절합니다."},
    {"sel_category": "사회적 인식", "explanation": "짝과 반대편 학생의 위치를 동시에 살피며 이동할 공간과 회전 시점을 읽습니다."},
    {"sel_category": "관계 기술", "explanation": "짝과 중앙에서 만난 학생이 같은 박자 안에서 이동과 회전을 맞추고 역할을 자연스럽게 교대합니다."}
  ]},
  "041": {"sel_connections_raw": [
    {"sel_category": "자기 조절", "explanation": "앞사람들이 말하거나 보여 준 항목의 순서를 유지하면서 내 차례에 새 항목 하나만 더하도록 주의와 기억을 조절합니다."}
  ]},
  "045": {"sel_connections_raw": [
    {"sel_category": "자기 조절", "explanation": "시작 역할 한 사람에게 시선이 고정되지 않도록 원 전체에 주의를 넓게 두고 동작 변화를 따라갑니다."},
    {"sel_category": "사회적 인식", "explanation": "여러 친구의 작은 움직임 변화와 반응 시차를 살피며 누가 동작을 시작했는지 추론합니다."}
  ]},
  "051": {"reflection_question_raw": "전체가 무엇인지 확실하지 않은 상태에서 새 부분을 더할 때 무엇을 보고 결정했나요?"},
  "054": {"sel_connections_raw": [
    {"sel_category": "자기 조절", "explanation": "8박 구조를 유지하면서 걷기와 모방의 시점을 바꾸고 동작의 크기와 속도를 박자에 맞춥니다."},
    {"sel_category": "사회적 인식", "explanation": "가운데 학생의 동작을 평가하지 않고 움직임의 방향·크기·속도를 자세히 관찰합니다."},
    {"sel_category": "관계 기술", "explanation": "여러 학생이 가운데 역할을 차례로 맡을 때 각자의 동작을 함께 받아 주며 같은 리듬을 이어 갑니다."}
  ]},
  "059": {"teacher_prompt_raw": "첫 사람이 만든 장소의 물건과 위치를 먼저 읽고, 그 장소에 필요한 인물과 행동으로 들어가 봅시다.", "reflection_question_raw": "다른 사람이 만든 장소를 읽고 들어갈 때 가장 결정적인 단서는 무엇이었나요?"},
  "061": {"teacher_prompt_raw": "앞사람이 만든 물건을 같은 자리에서 먼저 사용한 뒤, 장소에 어울리는 새 물건 하나를 더해 봅시다.", "reflection_question_raw": "앞사람들이 만든 공간을 기억하면서 새 물건을 더할 때 무엇을 가장 많이 살폈나요?"},
  "100": {"teacher_prompt_raw": "앞사람의 말과 소리 크기를 정확히 받아, 한 칸씩 멀어지는 메아리처럼 조금씩 작게 이어 봅시다.", "reflection_question_raw": "소리가 점점 작아져도 같은 말과 리듬으로 이어지게 한 것은 무엇이었나요?"},
  "103": {"teacher_prompt_raw": "소리를 보내기 전에 상대를 정하고, 길이·속도·방향이 두 사람 사이의 공간을 건너간다는 느낌으로 전달해 봅시다.", "reflection_question_raw": "소리가 한 사람에게서 다른 사람에게 실제로 이동한다고 느껴진 순간은 언제였나요?"},
  "104": {"sel_connections_raw": [{"sel_category": "자기 조절", "explanation": "읽기와 듣기를 동시에 하면서 주의가 어느 한쪽에만 쏠리지 않도록 스스로 조절합니다."}]},
  "109": {"teacher_prompt_raw": "말 대신 발의 방향·거리·속도만으로 두 사람의 관계가 보이게 해 봅시다.", "reflection_question_raw": "두 사람의 관계를 가장 분명하게 보여 준 발의 거리나 방향 변화는 무엇이었나요?"},
  "118": {"teacher_prompt_raw": "채널이 바뀌면 설명하거나 상의하느라 멈추지 말고, 첫 행동으로 새 장면을 함께 시작해 봅시다."},
  "120": {"teacher_prompt_raw": "무대 장면을 먼저 듣고 보고, 지금 장면에 필요한 소리만 골라 들어가 봅시다.", "reflection_question_raw": "효과음이 장면을 도운 순간과 오히려 방해한 순간은 무엇이 달랐나요?"},
  "126": {"teacher_prompt_raw": "비밀 단어나 음절을 말하지 않고, 각 장면의 행동이 관객에게 단서가 되게 보여 주세요.", "reflection_question_raw": "관객이 비밀 단어를 떠올리게 한 몸짓이나 장면의 단서는 무엇이었나요?"},
  "128": {"sel_connections_raw": [
    {"sel_category": "자기 인식", "explanation": "말할 때 입·혀·턱에서 모음과 자음이 만들어지는 감각과 내 목소리의 변화를 알아차립니다."},
    {"sel_category": "자기 조절", "explanation": "거리 변화에 따라 목소리의 크기와 힘을 조절하며 무리하지 않는 발성을 유지합니다."}
  ]},
  "130": {"reflection_question_raw": "앞사람이 멈춘 낱말과 이야기 흐름을 놓치지 않기 위해 무엇을 가장 집중해서 들었나요?"},
  "137": {"teacher_prompt_raw": "멈춘 순간 모든 사람이 관객에게 보이는지 주변의 높이·방향·간격을 함께 살펴봅시다.", "reflection_question_raw": "신호에 멈춘 뒤 한두 사람의 위치 조절만으로 전체 무대 그림이 달라진 순간은 언제였나요?"},
  "140": {"teacher_prompt_raw": "사람을 한쪽으로 몰지 않고 몸의 방향·높이·시선만 바꿔 무대의 무게중심을 움직여 봅시다."},
  "144": {
    "activity_purpose_raw": "협력하기, 문제 해결, 비언어 소통",
    "teacher_prompt_raw": "손을 놓지 않아도 되는 길을 함께 찾되, 팔이 꺾이거나 몸이 눌리면 바로 멈추고 다른 경로를 찾아봅시다.",
    "sel_connections_raw": [
      {
        "sel_category": "자기 조절",
        "explanation": "움직임이 복잡해지거나 불편함이 생기면 즉시 멈추고 속도와 힘을 조절합니다."
      },
      {
        "sel_category": "관계 기술",
        "explanation": "서로의 위치와 움직임을 확인하며 누구도 끌거나 밀지 않고 함께 원을 풀어 갑니다."
      },
      {
        "sel_category": "문제 해결·선택",
        "explanation": "얽힌 상태를 풀 수 있는 여러 이동 경로를 살펴보고 모두가 안전한 방법을 선택합니다."
      }
    ]
  },
  "145": {
    "activity_purpose_raw": "신체 인식, 감각 열기, 집중하기",
    "teacher_prompt_raw": "물체를 억지로 붙잡기보다 물체가 기울거나 움직이는 작은 변화를 느끼면서 몸의 무게중심을 천천히 조절해봅시다."
  },
  "166": {
    "activity_purpose_raw": "협력하기, 비언어 소통, 신체 인식",
    "activity_profile": {
      "activity_level_raw": "보통",
      "movement_level_raw": "보통",
      "noise_level_raw": "낮음",
      "contact_level_raw": "선택(비접촉 가능)",
      "collision_risk_raw": "낮음"
    }
  },
  "168": {
    "activity_purpose_raw": "집중하기, 공간 인식, 비언어 소통",
    "sel_connections_raw": [
      {
        "sel_category": "자기 조절",
        "explanation": "방향 신호를 본 뒤 뛰거나 몸을 던지지 않고 약속한 범위 안에서 속도와 움직임을 조절합니다."
      },
      {
        "sel_category": "사회적 인식",
        "explanation": "리더의 방향 신호와 주변 친구의 위치를 함께 살피며 안전한 이동 공간을 읽습니다."
      }
    ]
  },
  "174": {
    "teacher_prompt_raw": "처음 만든 리듬을 충분히 반복한 뒤, 소리·속도·움직임 중 한 요소만 바꾸어 새 리듬으로 넘어가 봅시다.",
    "reflection_question_raw": "처음 리듬에서 무엇을 바꾸었을 때 새로운 리듬으로 느껴졌나요?"
  },
  "177": {
    "teacher_prompt_raw": "옆 사람과 동시에 박수치는 순간을 정확히 맞추고, 내 차례가 지나간 뒤에도 원 전체의 박자를 계속 들어봅시다.",
    "reflection_question_raw": "연속 박수가 끊기지 않게 하려면 내 앞사람과 뒷사람의 어떤 신호를 들어야 했나요?"
  },
  "181": {
    "teacher_prompt_raw": "내가 받은 리듬을 먼저 정확히 확인한 뒤, 모양과 박자를 바꾸지 않고 반대쪽 끝까지 보내봅시다.",
    "reflection_question_raw": "양쪽 끝에서 온 리듬을 헷갈리지 않고 이어 보내기 위해 무엇에 집중했나요?"
  },
  "182": {
    "teacher_prompt_raw": "앞사람의 리듬을 한 번 정확히 받아 같은 모양으로 옆 사람에게 보내고, 원을 한 바퀴 도는 변화를 살펴봅시다.",
    "reflection_question_raw": "한 바퀴 돌아온 리듬은 처음과 무엇이 같고 무엇이 달라졌나요?"
  },
  "184": {
    "teacher_prompt_raw": "지휘자의 시작·멈춤·강약 신호를 보고, 내 소리를 정해진 순간에만 내며 전체 소리를 함께 들어봅시다.",
    "reflection_question_raw": "지휘자의 어떤 움직임이 소리의 시작·멈춤·강약을 가장 분명하게 알려 주었나요?"
  },
  "187": {
    "teacher_prompt_raw": "앞사람이 만든 상상 환경의 리듬과 소리를 먼저 정확히 받아, 그 장소의 느낌이 이어지도록 따라가 봅시다.",
    "reflection_question_raw": "상상한 환경이 달라지자 리듬의 속도·크기·소리는 어떻게 달라졌나요?"
  },
  "190": {
    "activity_purpose_raw": "신체 인식, 상상 열기, 자기표현, 즉흥 표현"
  },
  "191": {
    "teacher_prompt_raw": "지금 리더의 리듬을 먼저 정확히 받아 셋이 하나로 맞춘 뒤, 다음 리더의 변화 신호를 들어봅시다."
  },
  "194": {
    "teacher_prompt_raw": "1·2·3 중 하나를 소리와 동작으로 바꾸어도 순서가 끊기지 않게 같은 자리를 계속 이어봅시다.",
    "reflection_question_raw": "숫자가 모두 사라진 뒤에도 1·2·3의 순서를 유지하게 한 단서는 무엇이었나요?"
  },
  "222": {
    "activity_purpose_raw": "집중하기, 비언어 소통, 신체 인식"
  },
  "226": {
    "activity_purpose_raw": "상상 열기, 협력하기, 의사소통",
    "teacher_prompt_raw": "앞사람의 전체 의도를 맞히려 하지 말고, 지금 보이는 작은 그림이나 문장 단서 하나를 받아 내 방식으로 이어봅시다.",
    "reflection_question_raw": "처음 의도와 달라도 공동 결과가 이어지게 만든 단서는 무엇이었나요?",
    "sel_connections_raw": [
      {
        "sel_category": "관계 기술",
        "explanation": "앞사람이 남긴 단서를 지우지 않고 받아들인 뒤 자신의 아이디어를 더해 공동 결과물을 이어갑니다."
      },
      {
        "sel_category": "문제 해결·선택",
        "explanation": "제한된 단서에서 가능한 다음 그림이나 문장을 선택하고 결과가 이어지도록 조정합니다."
      }
    ]
  },
  "228": {
    "teacher_prompt_raw": "역할 바꾸기 신호가 와도 움직임을 끊지 말고, 주도권만 자연스럽게 상대에게 넘겨봅시다.",
    "reflection_question_raw": "이끄는 사람이 바뀌었는데도 움직임의 흐름이 끊기지 않았던 순간에는 무엇이 달랐나요?"
  },
  "229": {
    "teacher_prompt_raw": "누가 계속 이끌지 정하지 말고, 상대의 제안을 받아들이면서 내 움직임도 작게 제안해봅시다.",
    "reflection_question_raw": "내가 이끈다거나 따라간다는 구분이 잠시 사라진 순간은 언제였나요?"
  },
  "230": {
    "activity_purpose_raw": "관찰하기, 집중하기, 비언어 소통"
  },
  "236": {
    "teacher_prompt_raw": "움직임의 모양만 따라 하지 말고 상대의 속도와 박자까지 같은 순간에 맞춰봅시다.",
    "reflection_question_raw": "두 사람의 리듬이 맞기 시작했다는 것을 알려 준 시각적 신호는 무엇이었나요?"
  },
  "237": {
    "teacher_prompt_raw": "내 리듬을 갑자기 버리기보다 주변 리듬과 겹치는 부분을 찾아 전체 흐름에 조금씩 맞춰봅시다.",
    "reflection_question_raw": "서로 다른 리듬이 하나로 모이거나 어울리기 시작한 순간에는 무엇이 변했나요?"
  },
  "247": {
    "activity_purpose_raw": "비언어 소통, 관찰하기, 관계 탐색"
  },
};

  // BATCH7_RESIDUAL_ANOMALY_FIXES
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

  master.activities.forEach((activity) => {
    const p = activity.recommendation_normalized;
    const recommendationEdit = recommendationOverrides[activity.activity_id];

    if (recommendationEdit && p) {
      if (!p.curation_original) {
        p.curation_original = {
          purpose_tags: Array.isArray(p.purpose_tags) ? [...p.purpose_tags] : [],
          sel_tags: Array.isArray(p.sel_tags) ? [...p.sel_tags] : []
        };
      }
      if (Array.isArray(recommendationEdit.purposes)) p.purpose_tags = [...recommendationEdit.purposes];
      if (Array.isArray(recommendationEdit.sel)) p.sel_tags = [...recommendationEdit.sel];
      ['activity_level','movement_level','noise_level','contact_level','collision_risk','space_types','materials_required','materials_optional','materials_detail','participant_structure'].forEach((key) => {
        if (recommendationEdit[key] !== undefined) {
          if (!(key in p.curation_original)) p.curation_original[key] = p[key];
          p[key] = recommendationEdit[key];
        }
      });
      p.curation_status = 'CURATED_V1';
    }

    const sourceEdit = sourceEdits[activity.activity_id];
    if (sourceEdit && activity.source_preserved) {
      const s = activity.source_preserved;
      if (!s.curation_original) s.curation_original = {};

      Object.entries(sourceEdit).forEach(([key, value]) => {
        if (!(key in s.curation_original)) {
          const original = s[key];
          s.curation_original[key] = Array.isArray(original)
            ? JSON.parse(JSON.stringify(original))
            : original;
        }
        s[key] = Array.isArray(value)
          ? JSON.parse(JSON.stringify(value))
          : value;
      });
      s.curation_status = 'PDF_SYNC_PENDING';
    }
  });
})();
