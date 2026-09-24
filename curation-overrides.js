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
    '003': { purposes: ['리듬 맞추기', '신체 인식', '상상 열기'], sel: ['자기 인식', '자기 조절'] },
    '007': { purposes: ['협력하기', '관찰하기', '비언어 소통'] },
    '008': { purposes: ['관찰하기', '비언어 소통', '집중하기'], sel: ['자기 조절', '사회적 인식', '관계 기술'] },
    '012': { purposes: ['목소리 열기', '관찰하기', '비언어 소통'], sel: ['사회적 인식', '관계 기술'] },
    '013': { purposes: ['협력하기', '상상 열기', '문제 해결'], sel: ['관계 기술'] },
    '014': { purposes: ['듣기', '감각 열기', '상상 열기'], sel: ['사회적 인식'] },
    '018': { purposes: ['리듬 맞추기', '협력하기', '관계 열기'], sel: ['자기 조절', '관계 기술'] },
    '020': { purposes: ['감각 열기', '자기 인식', '공간 인식'], sel: ['자기 인식', '사회적 인식'] },
    '021': { purposes: ['신체 인식', '자기 인식', '긴장 완화'], sel: ['자기 인식', '자기 조절'] },
    '022': { purposes: ['공간 인식', '감각 열기', '신체 인식'], sel: ['자기 인식', '자기 조절'] },
    '025': { purposes: ['공간 인식', '감각 열기', '협력하기'], sel: ['자기 인식', '사회적 인식', '관계 기술'] },
    '027': { purposes: ['협력하기', '비언어 소통', '상상 열기'], sel: ['사회적 인식', '관계 기술'] },
    '029': { purposes: ['상상 열기', '협력하기', '몸 깨우기'], sel: ['자기 조절', '관계 기술'] },
    '031': { purposes: ['협력하기', '비언어 소통', '상상 열기'], sel: ['사회적 인식', '관계 기술'] },
    '032': { purposes: ['협력하기', '비언어 소통', '문제 해결'] },
    '033': { purposes: ['관찰하기', '상상 열기', '협력하기'], sel: ['사회적 인식', '관계 기술'] },
    '038': { purposes: ['관찰하기', '협력하기', '상상 열기'], sel: ['사회적 인식', '관계 기술'] },
    '051': { purposes: ['협력하기', '상상 열기', '비언어 소통'] },
    '052': { purposes: ['관찰하기', '협력하기', '상상 열기'] },
    '053': { purposes: ['관계 열기', '비언어 소통', '협력하기'], sel: ['사회적 인식', '관계 기술'] },
    '058': { purposes: ['공간 인식', '관찰하기', '협력하기'] },
    '059': { purposes: ['관찰하기', '관계 열기', '상상 열기'] },
    '060': { purposes: ['상상 열기', '문제 해결', '협력하기'] },
    '061': { purposes: ['관찰하기', '상상 열기', '협력하기'] },
    '099': { purposes: ['의사소통', '듣기', '비언어 소통'] },
    '100': { purposes: ['듣기', '리듬 맞추기', '집중하기'] },
    '102': { purposes: ['비언어 소통', '듣기', '의사소통'] },
    '103': { purposes: ['듣기', '목소리 열기', '비언어 소통'] },
    '104': { purposes: ['듣기', '집중하기', '기억'], sel: ['자기 조절'] },
    '109': { purposes: ['비언어 소통', '관계 열기', '신체 인식'] },
    '118': { purposes: ['상상 열기', '협력하기', '자기표현'] },
    '120': { purposes: ['듣기', '협력하기', '비언어 소통'], sel: ['사회적 인식', '관계 기술'] },
    '121': { purposes: ['듣기', '목소리 열기', '협력하기'] },
    '122': { purposes: ['듣기', '비언어 소통', '협력하기'] },
    '125': { purposes: ['상상 열기', '문제 해결', '협력하기'] },
    '126': { purposes: ['비언어 소통', '상상 열기', '문제 해결'] },
    '128': { purposes: ['목소리 열기', '감각 열기', '듣기'], sel: ['자기 인식', '자기 조절'] },
    '129': { purposes: ['듣기', '상상 열기', '협력하기'] },
    '130': { purposes: ['듣기', '집중하기', '상상 열기'] },
    '140': { purposes: ['공간 인식', '관찰하기', '협력하기'] }
  };

  const sourceEdits = {
    '007': {
      reflection_question_raw: '다른 사람의 행동을 보고 내가 들어가야 할 역할을 알아차린 순간은 언제였나요?'
    },
    '014': {
      teacher_prompt_raw: '이야기 내용은 바꾸지 말고, 상대가 들려준 장면에 색·소리·냄새·질감 같은 감각 단서를 하나씩 더해 봅시다.',
      reflection_question_raw: '어떤 감각 정보를 더했을 때 이야기 장면이 가장 선명하게 떠올랐나요?'
    },
    '032': {
      teacher_prompt_raw: '누가 이끌려고 하지 말고, 보이지 않는 물건의 무게나 방향이 바뀌면 모두가 같은 순간에 반응해 봅시다.',
      reflection_question_raw: '같은 보이지 않는 물건의 무게와 위치를 함께 유지하려면 누구의 어떤 움직임을 가장 많이 읽었나요?'
    },
    '051': {
      reflection_question_raw: '전체가 무엇인지 확실하지 않은 상태에서 새 부분을 더할 때 무엇을 보고 결정했나요?'
    },
    '059': {
      teacher_prompt_raw: '첫 사람이 만든 장소의 물건과 위치를 먼저 읽고, 그 장소에 필요한 인물과 행동으로 들어가 봅시다.',
      reflection_question_raw: '다른 사람이 만든 장소를 읽고 들어갈 때 가장 결정적인 단서는 무엇이었나요?'
    },
    '061': {
      teacher_prompt_raw: '앞사람이 만든 물건을 같은 자리에서 먼저 사용한 뒤, 장소에 어울리는 새 물건 하나를 더해 봅시다.',
      reflection_question_raw: '앞사람들이 만든 공간을 기억하면서 새 물건을 더할 때 무엇을 가장 많이 살폈나요?'
    },
    '100': {
      teacher_prompt_raw: '앞사람의 말과 소리 크기를 정확히 받아, 한 칸씩 멀어지는 메아리처럼 조금씩 작게 이어 봅시다.',
      reflection_question_raw: '소리가 점점 작아져도 같은 말과 리듬으로 이어지게 한 것은 무엇이었나요?'
    },
    '103': {
      teacher_prompt_raw: '소리를 보내기 전에 상대를 정하고, 길이·속도·방향이 두 사람 사이의 공간을 건너간다는 느낌으로 전달해 봅시다.',
      reflection_question_raw: '소리가 한 사람에게서 다른 사람에게 실제로 이동한다고 느껴진 순간은 언제였나요?'
    },
    '104': {
      sel_connections_raw: [
        { sel_category: '자기 조절', explanation: '읽기와 듣기를 동시에 하면서 주의가 어느 한쪽에만 쏠리지 않도록 스스로 조절합니다.' }
      ]
    },
    '109': {
      teacher_prompt_raw: '말 대신 발의 방향·거리·속도만으로 두 사람의 관계가 보이게 해 봅시다.',
      reflection_question_raw: '두 사람의 관계를 가장 분명하게 보여 준 발의 거리나 방향 변화는 무엇이었나요?'
    },
    '118': {
      teacher_prompt_raw: '채널이 바뀌면 설명하거나 상의하느라 멈추지 말고, 첫 행동으로 새 장면을 함께 시작해 봅시다.'
    },
    '120': {
      teacher_prompt_raw: '무대 장면을 먼저 듣고 보고, 지금 장면에 필요한 소리만 골라 들어가 봅시다.',
      reflection_question_raw: '효과음이 장면을 도운 순간과 오히려 방해한 순간은 무엇이 달랐나요?'
    },
    '126': {
      teacher_prompt_raw: '비밀 단어나 음절을 말하지 않고, 각 장면의 행동이 관객에게 단서가 되게 보여 주세요.',
      reflection_question_raw: '관객이 비밀 단어를 떠올리게 한 몸짓이나 장면의 단서는 무엇이었나요?'
    },
    '128': {
      sel_connections_raw: [
        { sel_category: '자기 인식', explanation: '말할 때 입·혀·턱에서 모음과 자음이 만들어지는 감각과 내 목소리의 변화를 알아차립니다.' },
        { sel_category: '자기 조절', explanation: '거리 변화에 따라 목소리의 크기와 힘을 조절하며 무리하지 않는 발성을 유지합니다.' }
      ]
    },
    '130': {
      reflection_question_raw: '앞사람이 멈춘 낱말과 이야기 흐름을 놓치지 않기 위해 무엇을 가장 집중해서 들었나요?'
    },
    '137': {
      teacher_prompt_raw: '멈춘 순간 모든 사람이 관객에게 보이는지 주변의 높이·방향·간격을 함께 살펴봅시다.',
      reflection_question_raw: '신호에 멈춘 뒤 한두 사람의 위치 조절만으로 전체 무대 그림이 달라진 순간은 언제였나요?'
    },
    '140': {
      teacher_prompt_raw: '사람을 한쪽으로 몰지 않고 몸의 방향·높이·시선만 바꿔 무대의 무게중심을 움직여 봅시다.'
    }
  };

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
