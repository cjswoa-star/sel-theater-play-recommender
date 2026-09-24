from pathlib import Path

path = Path('curation-overrides.js')
text = path.read_text(encoding='utf-8')
marker = '// FINAL_FREEZE_CLEANUP_V1'
if marker not in text:
    block = r'''

// FINAL_FREEZE_CLEANUP_V1
(function () {
  'use strict';
  const master = window.ACTIVITY_MASTER;
  if (!master || !Array.isArray(master.activities)) return;

  const recEdits = {
    "150": {"purposes": ["집중하기", "신체 인식", "문제 해결"]}
  };
  const sourceEdits = {
    "150": {
      "activity_purpose_raw": "집중하기, 신체 인식, 문제 해결",
      "teacher_prompt_raw": "정한 조건을 억지로 버티기보다, 그 조건 때문에 몸이 어떤 다른 움직임을 찾아내는지 살펴봅시다."
    },
    "157": {
      "reflection_question_raw": "손이 계속 바닥에 닿는 낮은 자세로 이동할 때 평소 걷기와 가장 달랐던 점은 무엇이었나요?"
    },
    "159": {
      "reflection_question_raw": "같은 쪽 손과 발을 함께 움직였을 때 평소 걷기와 가장 다르게 느껴진 점은 무엇이었나요?"
    },
    "160": {
      "reflection_question_raw": "반대쪽 손과 발을 함께 움직였을 때 몸의 무게중심은 어떻게 달라졌나요?"
    }
  };

  master.activities.forEach((activity) => {
    const rec = recEdits[activity.activity_id];
    const p = activity.recommendation_normalized;
    if (rec && p) {
      if (!p.curation_original) {
        p.curation_original = {
          purpose_tags: Array.isArray(p.purpose_tags) ? [...p.purpose_tags] : [],
          sel_tags: Array.isArray(p.sel_tags) ? [...p.sel_tags] : []
        };
      }
      if (Array.isArray(rec.purposes)) p.purpose_tags = [...rec.purposes];
      p.curation_status = 'CURATED_V1';
    }

    const edit = sourceEdits[activity.activity_id];
    if (edit && activity.source_preserved) {
      const s = activity.source_preserved;
      if (!s.curation_original) s.curation_original = {};
      Object.entries(edit).forEach(([key, value]) => {
        if (!(key in s.curation_original)) s.curation_original[key] = s[key];
        s[key] = value;
      });
      s.curation_status = 'PDF_SYNC_PENDING';
    }
  });
})();
'''
    text += block
    path.write_text(text, encoding='utf-8')

queue = Path('PDF_SYNC_QUEUE.md')
q = queue.read_text(encoding='utf-8')
rows = [
'| 015 | 상상 물건 릴레이 (기존: 물건 릴레이) | 제목, 활동 목적, 수업 조건, 활동 프로필, SEL, 요약, 놀이 방법, 교사 발문, 마무리 질문, 안전 유의점 | 대기 |',
'| 062 | 지금 몇 시지? | 활동 목적, SEL, 교사 발문, 마무리 질문 | 대기 |',
'| 064 | 손을 쓰지 않고 장소 보여주기 | 교사 발문 | 대기 |',
'| 108 | 발과 다리만 1 | SEL, 교사 발문, 마무리 질문 | 대기 |',
'| 111 | 등을 위한 움직임 | 교사 발문, 마무리 질문 | 대기 |',
'| 113 | 줄인형 | 교사 발문, 마무리 질문 | 대기 |',
'| 114 | 신체 일부로 완성하는 장면 | 교사 발문, 마무리 질문 | 대기 |',
'| 143 | 몸이 바닥에 닿는 면적 줄이기 | 활동량, 이동량, 교사 발문 | 대기 |',
'| 147 | 의자와 리듬 | 활동 목적, SEL, 요약, 교사 발문 | 대기 |',
'| 150 | 움직임 조건 바꾸기 | 활동 목적, 교사 발문 | 대기 |',
'| 157 | 원숭이 걷기 | 마무리 질문 | 대기 |',
'| 159 | 낙타 걷기 | 마무리 질문 | 대기 |',
'| 160 | 코끼리 걷기 | 마무리 질문 | 대기 |',
'| 169 | 몸을 좌우로 풀어 움직이기 | 요약 | 대기 |',
'| 170 | 좌우 몸 번갈아 이동하기 | 요약 | 대기 |',
'| 171 | 직선과 곡선으로 움직이기 | 활동량, 이동량, 요약, 놀이 방법, 교사 발문, 마무리 질문, 안전 유의점 | 대기 |',
'| 197 | 음악과 춤 | 활동량, 이동량 | 대기 |',
'| 250 | 행동 이어 장면 만들기 | 교사 발문, 마무리 질문 | 대기 |'
]
insert = '\n'.join(r for r in rows if r not in q)
if insert:
    anchor = '\n## 4차 SEL 수정 핵심 판단'
    q = q.replace(anchor, '\n' + insert + '\n' + anchor, 1)
section = '''\n\n## 7차 잔여 이상치 및 FREEZE 직전 정리\n\n- 015: 일반 체육 릴레이 성격을 제거하고 상상 물건의 성질을 몸으로 이어 받는 연극놀이로 재구성\n- 143·197: 실제 절차에 맞게 활동량·이동량 과대 분류 수정\n- 147: 요약·SEL·목적을 실제 번호-정지자세 리듬 구조와 일치시킴\n- 169·170·171: 복제 요약을 분리하고 171의 제목·절차 불일치를 바로잡음\n- 150: 활동 설명에 명시된 문제 해결 성격을 활동 목적에 반영\n- 157·159·160: 실제 절차에 없는 ‘팔다리 순서 바꾸기’를 묻던 마무리 질문을 각 걷기 방식에 맞게 수정\n- 이 차수 이후 새로운 명확한 오류가 없으면 콘텐츠 FREEZE V1로 전환\n'''
if '## 7차 잔여 이상치 및 FREEZE 직전 정리' not in q:
    q += section
queue.write_text(q, encoding='utf-8')
print('freeze cleanup applied')
