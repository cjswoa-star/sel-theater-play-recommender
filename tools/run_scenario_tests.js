const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html','utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const configScript = scripts.find(s=>s.includes('THEATER_GAME_CONFIG'));
const engineScript = scripts.find(s=>s.includes('THEATER_GAME_ENGINE') && s.includes('function hardFilter'));
const masterScript = scripts.find(s=>s.includes('window.ACTIVITY_MASTER='));
if(!configScript || !engineScript || !masterScript) throw new Error('Required inline scripts not found');

const context = { console, Math, JSON, Set, Map, globalThis:null, window:null };
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(configScript, context);
vm.runInContext(engineScript, context);
vm.runInContext(masterScript, context);
vm.runInContext(fs.readFileSync('curation-overrides.js','utf8'), context);

const activities = context.ACTIVITY_MASTER.activities;
const engine = context.THEATER_GAME_ENGINE;
const config = context.THEATER_GAME_CONFIG;

const scenarios = [
  {name:'S01 1학년·교실·5분·산만·비접촉·집중', c:{grade:1,minutes:5,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'VERY_DISTRACTED',energy:'HIGH',purposes:['집중하기','신체 인식'],selCompetencies:['자기 조절'],contact:'NONE'}},
  {name:'S02 1학년·교실·10분·조용함·몸깨우기', c:{grade:1,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'TOO_QUIET',energy:'LOW',purposes:['몸 깨우기','상상 열기'],selCompetencies:[],contact:'NONE'}},
  {name:'S03 3학년·교실·10분·상상+비언어+협력', c:{grade:3,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['상상 열기','비언어 소통','협력하기'],selCompetencies:['사회적 인식','관계 기술'],contact:'NONE'}},
  {name:'S04 3학년·교실·10분·긴장완화', c:{grade:3,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'TENSE',energy:'MEDIUM',purposes:['긴장 완화','집중하기'],selCompetencies:['자기 조절'],contact:'MINIMIZE'}},
  {name:'S05 3학년·책상치움·10분·들뜸·협력관찰', c:{grade:3,minutes:10,participants:24,space:'CLEARED_CLASSROOM',materials:'NO_MATERIALS',mood:'SLIGHTLY_EXCITED',energy:'HIGH',purposes:['협력하기','관찰하기'],selCompetencies:['사회적 인식'],contact:'NONE'}},
  {name:'S06 4학년·교실·5분·준비물없음·짧은활동', c:{grade:4,minutes:5,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['집중하기','관찰하기'],selCompetencies:[],contact:'NONE'}},
  {name:'S07 4학년·교실·15분·관계열기+비언어', c:{grade:4,minutes:15,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'TENSE',energy:'MEDIUM',purposes:['관계 열기','비언어 소통'],selCompetencies:['사회적 인식','관계 기술'],contact:'MINIMIZE'}},
  {name:'S08 5학년·교실·20분·즉흥+자기표현', c:{grade:5,minutes:20,participants:24,space:'CLASSROOM',materials:'AVAILABLE',mood:'BALANCED',energy:'MEDIUM',purposes:['즉흥 표현','자기표현','상상 열기'],selCompetencies:['자기 인식','관계 기술'],contact:'NONE'}},
  {name:'S09 5학년·교실·10분·매우산만·자기조절', c:{grade:5,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'VERY_DISTRACTED',energy:'HIGH',purposes:['집중하기','자기 조절'],selCompetencies:['자기 조절'],contact:'NONE'}},
  {name:'S10 5학년·다목적실·10분·처짐·에너지높이기', c:{grade:5,minutes:10,participants:24,space:'MULTIPURPOSE_ROOM',materials:'NO_MATERIALS',mood:'LOW',energy:'LOW',purposes:['몸 깨우기','에너지 높이기'],selCompetencies:['자기 조절'],contact:'MINIMIZE'}},
  {name:'S11 6학년·교실·15분·관계탐색+의사소통', c:{grade:6,minutes:15,participants:24,space:'CLASSROOM',materials:'AVAILABLE',mood:'TENSE',energy:'MEDIUM',purposes:['관계 탐색','의사소통'],selCompetencies:['사회적 인식','관계 기술'],contact:'NONE'}},
  {name:'S12 6학년·교실·15분·문제해결+의사소통', c:{grade:6,minutes:15,participants:24,space:'CLASSROOM',materials:'AVAILABLE',mood:'BALANCED',energy:'MEDIUM',purposes:['문제 해결','의사소통'],selCompetencies:['문제 해결·선택'],contact:'NONE'}},
  {name:'S13 5학년·교실·30명·준비물없음·비접촉', c:{grade:5,minutes:15,participants:30,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['협력하기','집중하기'],selCompetencies:['관계 기술'],contact:'NONE'}},
  {name:'S14 6학년·책상치움·12명·리듬+협력', c:{grade:6,minutes:15,participants:12,space:'CLEARED_CLASSROOM',materials:'NO_MATERIALS',mood:'TOO_QUIET',energy:'LOW',purposes:['리듬 맞추기','협력하기'],selCompetencies:['관계 기술'],contact:'NONE'}},
  {name:'S15 3학년·교실·10분·상상물건릴레이표적', c:{grade:3,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['상상 열기','비언어 소통'],selCompetencies:['사회적 인식','관계 기술'],contact:'NONE'}}
];

function rawTop(criteria, n=10){
  return activities.map(a=>{
    const h=engine.hardFilter(a,criteria);
    if(!h.pass) return null;
    const s=engine.scoreActivity(a,criteria,config);
    return {activity:a, ...s};
  }).filter(Boolean).sort((a,b)=>b.score-a.score).slice(0,n);
}

const lines = ['# 추천 시나리오 테스트 V1','',`실행 시각: ${new Date().toISOString()}`,'',`활동 수: ${activities.length}`,'','## 요약'];
let warningCount=0;
let hardViolationCount=0;
let noPurposeMatchCount=0;
let zeroCandidateCount=0;
let target015Rank=null;
const rows=[];

for(const s of scenarios){
  const r=engine.recommend(activities,s.c,{config,rng:()=>0.0001});
  const top=rawTop(s.c,10);
  const selected=r.selected;
  const warns=[];
  if(r.candidateCount===0){warns.push('후보 0'); zeroCandidateCount++;}
  for(const x of selected){
    const h=engine.hardFilter(x.activity,s.c);
    if(!h.pass){warns.push(`HARD 위반 ${x.activity.activity_id}:${h.reason}`); hardViolationCount++;}
    const pt=x.activity.recommendation_normalized.purpose_tags||[];
    if((s.c.purposes||[]).length && !s.c.purposes.some(p=>pt.includes(p))){
      warns.push(`목적 불일치 ${x.activity.activity_id}`); noPurposeMatchCount++;
    }
  }
  const groups=selected.map(x=>x.activity.program_derived.diversity_group);
  if(groups.length===3 && new Set(groups).size===1) warns.push('상위3 동일 diversity_group');
  if(warns.length){warningCount+=warns.length;}
  if(s.name.startsWith('S15')){
    const idx=top.findIndex(x=>x.activity.activity_id==='015');
    target015Rank=idx<0?'>10':idx+1;
  }
  rows.push({s,r,top,warns});
}

lines.push(`- 시나리오: ${scenarios.length}개`);
lines.push(`- 후보 0건: ${zeroCandidateCount}`);
lines.push(`- HARD 조건 위반: ${hardViolationCount}`);
lines.push(`- 선택 결과 중 목적 완전 불일치: ${noPurposeMatchCount}`);
lines.push(`- 경고 합계: ${warningCount}`);
lines.push(`- S15에서 015 상상 물건 릴레이 raw rank: ${target015Rank}`);
lines.push('');

for(const {s,r,top,warns} of rows){
  lines.push(`## ${s.name}`);
  lines.push('');
  lines.push(`- 조건: 학년 ${s.c.grade} / ${s.c.minutes}분 / ${s.c.participants}명 / ${s.c.space} / ${s.c.materials} / 분위기 ${s.c.mood} / 에너지 ${s.c.energy} / 접촉 ${s.c.contact}`);
  lines.push(`- 목적: ${(s.c.purposes||[]).join(' · ')||'없음'} / SEL: ${(s.c.selCompetencies||[]).join(' · ')||'없음'}`);
  lines.push(`- 통과 후보: ${r.candidateCount}개`);
  lines.push(`- 선택: ${r.selected.map((x,i)=>`${i+1}) ${x.activity.activity_id} ${x.activity.source_preserved.title} (${x.score})`).join(' / ')}`);
  lines.push(`- raw top10: ${top.map((x,i)=>`${i+1}.${x.activity.activity_id} ${x.activity.source_preserved.title} ${x.score}`).join(' | ')}`);
  lines.push(`- 경고: ${warns.length?warns.join('; '):'없음'}`);
  lines.push('');
}

fs.writeFileSync('SCENARIO_TEST_REPORT.md', lines.join('\n'));
console.log(lines.slice(0,12).join('\n'));
