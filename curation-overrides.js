/*
 * Curated recommendation metadata overrides
 * ----------------------------------------
 * This file changes recommendation-facing metadata only.
 * source_preserved remains untouched so the original PDF text is preserved.
 * Every change must also be recorded in CURATION_CHANGELOG.md.
 */
(function () {
  'use strict';

  const master = window.ACTIVITY_MASTER;
  if (!master || !Array.isArray(master.activities)) return;

  const overrides = {
    '003': {
      purposes: ['리듬 맞추기', '신체 인식', '상상 열기'],
      sel: ['자기 인식', '자기 조절']
    },
    '008': {
      purposes: ['관찰하기', '비언어 소통', '집중하기'],
      sel: ['자기 조절', '사회적 인식', '관계 기술']
    },
    '012': {
      purposes: ['목소리 열기', '관찰하기', '비언어 소통'],
      sel: ['사회적 인식', '관계 기술']
    },
    '013': {
      purposes: ['협력하기', '상상 열기', '문제 해결'],
      sel: ['관계 기술']
    },
    '018': {
      purposes: ['리듬 맞추기', '협력하기', '관계 열기'],
      sel: ['자기 조절', '관계 기술']
    },
    '020': {
      purposes: ['감각 열기', '자기 인식', '공간 인식'],
      sel: ['자기 인식', '사회적 인식']
    },
    '021': {
      purposes: ['신체 인식', '자기 인식', '긴장 완화'],
      sel: ['자기 인식', '자기 조절']
    },
    '022': {
      purposes: ['공간 인식', '감각 열기', '신체 인식'],
      sel: ['자기 인식', '자기 조절']
    },
    '025': {
      purposes: ['공간 인식', '감각 열기', '협력하기'],
      sel: ['자기 인식', '사회적 인식', '관계 기술']
    },
    '027': {
      purposes: ['협력하기', '비언어 소통', '상상 열기'],
      sel: ['사회적 인식', '관계 기술']
    },
    '029': {
      purposes: ['상상 열기', '협력하기', '몸 깨우기'],
      sel: ['자기 조절', '관계 기술']
    },
    '031': {
      purposes: ['협력하기', '비언어 소통', '상상 열기'],
      sel: ['사회적 인식', '관계 기술']
    },
    '033': {
      purposes: ['관찰하기', '상상 열기', '협력하기'],
      sel: ['사회적 인식', '관계 기술']
    },
    '038': {
      purposes: ['관찰하기', '협력하기', '상상 열기'],
      sel: ['사회적 인식', '관계 기술']
    },
    '104': {
      purposes: ['듣기', '집중하기', '기억'],
      sel: ['자기 조절', '사회적 인식']
    },
    '128': {
      purposes: ['목소리 열기', '감각 열기', '듣기'],
      sel: ['자기 인식', '자기 조절']
    }
  };

  master.activities.forEach((activity) => {
    const o = overrides[activity.activity_id];
    if (!o || !activity.recommendation_normalized) return;

    const p = activity.recommendation_normalized;

    if (!p.curation_original) {
      p.curation_original = {
        purpose_tags: Array.isArray(p.purpose_tags) ? [...p.purpose_tags] : [],
        sel_tags: Array.isArray(p.sel_tags) ? [...p.sel_tags] : []
      };
    }

    if (Array.isArray(o.purposes)) p.purpose_tags = [...o.purposes];
    if (Array.isArray(o.sel)) p.sel_tags = [...o.sel];
    p.curation_status = 'CURATED_V1';
  });
})();
