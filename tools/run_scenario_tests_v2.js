const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync('index.html','utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const configScript = scripts.find(s=>s.includes('THEATER_GAME_CONFIG'));
let engineScript = scripts.find(s=>s.includes('THEATER_GAME_ENGINE') && s.includes('function hardFilter'));
const masterScript = scripts.find(s=>s.includes('window.ACTIVITY_MASTER='));
if(!configScript||!engineScript||!masterScript) throw new Error('required scripts missing');

const helpers = `
  function currentSpaceScore(act,c){
    const types=(act.recommendation_normalized.space_types||[]);
    const map={CLASSROOM:0,CLEARED_CLASSROOM:0,MULTIPURPOSE_ROOM:0,OUTDOOR:0};
    const bump=(k,v)=>{map[k]=Math.max(map[k],v)};
    for(const t of types){
      if(t==='CLASSROOM'){bump('CLASSROOM',1);bump('CLEARED_CLASSROOM',1);bump('MULTIPURPOSE_ROOM',.9);}
      else if(t==='OPEN_ACTIVITY_SPACE'){bump('CLEARED_CLASSROOM',1);bump('MULTIPURPOSE_ROOM',1);bump('OUTDOOR',.9);}
      else if(t==='CLEARED_CLASSROOM'){bump('CLEARED_CLASSROOM',1);bump('MULTIPURPOSE_ROOM',1);}
      else if(t==='MULTIPURPOSE_ROOM'){bump('MULTIPURPOSE_ROOM',1);}
      else if(t==='OUTDOOR'){bump('OUTDOOR',1);}
      else if(t==='LARGE_OPEN_SPACE'){bump('CLEARED_CLASSROOM',.55);bump('MULTIPURPOSE_ROOM',1);bump('OUTDOOR',.9);}
      else if(t==='FLOOR_ACTIVITY_SPACE'){bump('CLEARED_CLASSROOM',.9);bump('MULTIPURPOSE_ROOM',1);}
      else if(t==='FLEXIBLE_FURNITURE_SPACE'){bump('CLEARED_CLASSROOM',1);bump('MULTIPURPOSE_ROOM',1);}
    }
    return map[c.space]||0;
  }
  function currentEnergyFit(act,c){
    const level=act.recommendation_normalized.activity_level;
    const table={HIGH:{LOW:1,MEDIUM:.75,HIGH:.2},MEDIUM:{LOW:.8,MEDIUM:1,HIGH:.8},LOW:{LOW:.25,MEDIUM:.75,HIGH:1}};
    return (table[level]||{})[c.energy]??.5;
  }
  function currentSafetyBase(act){
    const p=act.recommendation_normalized;
    let s=({LOW:1,MEDIUM:.82,HIGH:.47})[p.collision_risk]??.8;
    if(p.contact_level==='LOW') s-=.15;
    if(p.movement_level==='HIGH') s-=.08;
    return clamp(s);
  }
  function currentConvenience(act){
    const p=act.recommendation_normalized;
    const complexity=act.program_derived.material_complexity;
    let s=!p.materials_required?1:(({LOW:.92,MEDIUM:.84,HIGH:.72,OPTIONAL:.98,NONE:1})[complexity]||.8);
    if(p.noise_level==='HIGH') s-=.12;
    if(p.movement_level==='HIGH') s-=.12;
    return clamp(s);
  }
  function currentDiversityGroup(act){
    const p=act.recommendation_normalized;
    return [p.participant_structure||'OTHER',p.movement_level||'MEDIUM',(p.purpose_tags||[])[0]||'기타'].join('|');
  }
`;
engineScript=engineScript.replace('  function hardFilter(act,c){',helpers+'\n  function hardFilter(act,c){');
engineScript=engineScript.replace("if(((d.space_compatibility||{})[c.space]||0)<0.5)","if(currentSpaceScore(act,c)<0.5)");
engineScript=engineScript.replace("energy:(d.energy_fit||{})[c.energy]??.5,","energy:currentEnergyFit(act,c),");
engineScript=engineScript.replace("space:(d.space_compatibility||{})[c.space]||0,","space:currentSpaceScore(act,c),");
engineScript=engineScript.replace("convenience:(d.recommendation_features||{}).classroom_convenience??.75","convenience:currentConvenience(act)");
engineScript=engineScript.replace("let s=(act.program_derived.recommendation_features||{}).safety_score??.8;","let s=currentSafetyBase(act);");
engineScript=engineScript.replace("if(x.activity.program_derived.diversity_group===y.activity.program_derived.diversity_group)","if(currentDiversityGroup(x.activity)===currentDiversityGroup(y.activity))");
engineScript=engineScript.replace("    candidates.sort((a,b)=>b.score-a.score);\n    const selected=selectDiverse(candidates,3,config,options.rng);","    let selectionCandidates=candidates;\n    if((criteria.purposes||[]).length){\n      const purposeMatched=candidates.filter(x=>(criteria.purposes||[]).some(t=>(x.activity.recommendation_normalized.purpose_tags||[]).includes(t)));\n      if(purposeMatched.length>=3) selectionCandidates=purposeMatched;\n    }\n    selectionCandidates.sort((a,b)=>b.score-a.score);\n    const selected=selectDiverse(selectionCandidates,3,config,options.rng);");

const context={console,Math,JSON,Set,Map,globalThis:null,window:null};context.window=context;context.globalThis=context;vm.createContext(context);
vm.runInContext(configScript,context);vm.runInContext(engineScript,context);vm.runInContext(masterScript,context);vm.runInContext(fs.readFileSync('curation-overrides.js','utf8'),context);
const A=context.ACTIVITY_MASTER.activities,E=context.THEATER_GAME_ENGINE,C=context.THEATER_GAME_CONFIG;
const scenarios=[
{name:'S01 1학년·교실·5분·산만·비접촉·집중',c:{grade:1,minutes:5,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'VERY_DISTRACTED',energy:'HIGH',purposes:['집중하기','신체 인식'],selCompetencies:['자기 조절'],contact:'NONE'}},
{name:'S02 1학년·교실·10분·조용함·몸깨우기',c:{grade:1,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'TOO_QUIET',energy:'LOW',purposes:['몸 깨우기','상상 열기'],selCompetencies:[],contact:'NONE'}},
{name:'S03 3학년·교실·10분·상상+비언어+협력',c:{grade:3,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['상상 열기','비언어 소통','협력하기'],selCompetencies:['사회적 인식','관계 기술'],contact:'NONE'}},
{name:'S04 3학년·교실·10분·긴장완화',c:{grade:3,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'TENSE',energy:'MEDIUM',purposes:['긴장 완화','집중하기'],selCompetencies:['자기 조절'],contact:'MINIMIZE'}},
{name:'S05 3학년·책상치움·10분·들뜸·협력관찰',c:{grade:3,minutes:10,participants:24,space:'CLEARED_CLASSROOM',materials:'NO_MATERIALS',mood:'SLIGHTLY_EXCITED',energy:'HIGH',purposes:['협력하기','관찰하기'],selCompetencies:['사회적 인식'],contact:'NONE'}},
{name:'S06 4학년·교실·5분·준비물없음·짧은활동',c:{grade:4,minutes:5,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['집중하기','관찰하기'],selCompetencies:[],contact:'NONE'}},
{name:'S07 4학년·교실·15분·관계열기+비언어',c:{grade:4,minutes:15,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'TENSE',energy:'MEDIUM',purposes:['관계 열기','비언어 소통'],selCompetencies:['사회적 인식','관계 기술'],contact:'MINIMIZE'}},
{name:'S08 5학년·교실·20분·즉흥+자기표현',c:{grade:5,minutes:20,participants:24,space:'CLASSROOM',materials:'AVAILABLE',mood:'BALANCED',energy:'MEDIUM',purposes:['즉흥 표현','자기표현','상상 열기'],selCompetencies:['자기 인식','관계 기술'],contact:'NONE'}},
{name:'S09 5학년·교실·10분·매우산만·자기조절',c:{grade:5,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'VERY_DISTRACTED',energy:'HIGH',purposes:['집중하기','자기 조절'],selCompetencies:['자기 조절'],contact:'NONE'}},
{name:'S10 5학년·다목적실·10분·처짐·에너지높이기',c:{grade:5,minutes:10,participants:24,space:'MULTIPURPOSE_ROOM',materials:'NO_MATERIALS',mood:'LOW',energy:'LOW',purposes:['몸 깨우기','에너지 높이기'],selCompetencies:['자기 조절'],contact:'MINIMIZE'}},
{name:'S11 6학년·교실·15분·관계탐색+의사소통',c:{grade:6,minutes:15,participants:24,space:'CLASSROOM',materials:'AVAILABLE',mood:'TENSE',energy:'MEDIUM',purposes:['관계 탐색','의사소통'],selCompetencies:['사회적 인식','관계 기술'],contact:'NONE'}},
{name:'S12 6학년·교실·15분·문제해결+의사소통',c:{grade:6,minutes:15,participants:24,space:'CLASSROOM',materials:'AVAILABLE',mood:'BALANCED',energy:'MEDIUM',purposes:['문제 해결','의사소통'],selCompetencies:['문제 해결·선택'],contact:'NONE'}},
{name:'S13 5학년·교실·30명·준비물없음·비접촉',c:{grade:5,minutes:15,participants:30,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['협력하기','집중하기'],selCompetencies:['관계 기술'],contact:'NONE'}},
{name:'S14 6학년·책상치움·12명·리듬+협력',c:{grade:6,minutes:15,participants:12,space:'CLEARED_CLASSROOM',materials:'NO_MATERIALS',mood:'TOO_QUIET',energy:'LOW',purposes:['리듬 맞추기','협력하기'],selCompetencies:['관계 기술'],contact:'NONE'}},
{name:'S15 3학년·교실·10분·상상물건릴레이표적',c:{grade:3,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['상상 열기','비언어 소통'],selCompetencies:['사회적 인식','관계 기술'],contact:'NONE'}}];
function rawTop(c,n=10){return A.map(a=>{const h=E.hardFilter(a,c);if(!h.pass)return null;return {activity:a,...E.scoreActivity(a,c,C)}}).filter(Boolean).sort((a,b)=>b.score-a.score).slice(0,n)}
const lines=['# 추천 시나리오 테스트 V2 (엔진 개선안)','',`활동 수: ${A.length}`,''];let warnings=0,hard=0,noMatch=0,zero=0,target='>10';
for(const s of scenarios){const r=E.recommend(A,s.c,{config:C,rng:()=>0.0001});const top=rawTop(s.c);const w=[];if(!r.candidateCount)zero++;for(const x of r.selected){const h=E.hardFilter(x.activity,s.c);if(!h.pass){hard++;w.push('HARD '+x.activity.activity_id)}const tags=x.activity.recommendation_normalized.purpose_tags||[];if(s.c.purposes.length&&!s.c.purposes.some(t=>tags.includes(t))){noMatch++;w.push('목적불일치 '+x.activity.activity_id)}}if(s.name.startsWith('S15')){const i=top.findIndex(x=>x.activity.activity_id==='015');target=i<0?'>10':String(i+1)}warnings+=w.length;lines.push(`## ${s.name}`,'',`- 후보: ${r.candidateCount}`,`- 선택: ${r.selected.map((x,i)=>`${i+1}) ${x.activity.activity_id} ${x.activity.source_preserved.title} (${x.score})`).join(' / ')}`,`- raw top10: ${top.map((x,i)=>`${i+1}.${x.activity.activity_id} ${x.activity.source_preserved.title} ${x.score}`).join(' | ')}`,`- 경고: ${w.length?w.join('; '):'없음'}`,'')}
lines.splice(4,0,'## 요약',`- 시나리오: ${scenarios.length}`,`- 후보 0건: ${zero}`,`- HARD 위반: ${hard}`,`- 선택 결과 목적 완전 불일치: ${noMatch}`,`- 경고 합계: ${warnings}`,`- S15에서 015 raw rank: ${target}`,'');
fs.writeFileSync('SCENARIO_TEST_REPORT_V2.md',lines.join('\n'));console.log(lines.slice(0,12).join('\n'));
