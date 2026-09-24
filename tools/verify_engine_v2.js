const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const cfg=scripts.find(s=>s.includes('THEATER_GAME_CONFIG'));
const eng=scripts.find(s=>s.includes('THEATER_GAME_ENGINE')&&s.includes('function hardFilter'));
const master=scripts.find(s=>s.includes('window.ACTIVITY_MASTER='));
if(!cfg||!eng||!master) throw new Error('required scripts missing');
if(!eng.includes('function currentSpaceScore')) throw new Error('V2 helper missing');
const x={console,Math,JSON,Set,Map,globalThis:null,window:null};x.window=x;x.globalThis=x;vm.createContext(x);
vm.runInContext(cfg,x);vm.runInContext(eng,x);vm.runInContext(master,x);vm.runInContext(fs.readFileSync('curation-overrides.js','utf8'),x);
const A=x.ACTIVITY_MASTER.activities,E=x.THEATER_GAME_ENGINE,C=x.THEATER_GAME_CONFIG;
const scenarios=[
{grade:3,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['상상 열기','비언어 소통'],selCompetencies:['사회적 인식','관계 기술'],contact:'NONE'},
{grade:1,minutes:10,participants:24,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'TOO_QUIET',energy:'LOW',purposes:['몸 깨우기','상상 열기'],selCompetencies:[],contact:'NONE'},
{grade:5,minutes:15,participants:30,space:'CLASSROOM',materials:'NO_MATERIALS',mood:'BALANCED',energy:'MEDIUM',purposes:['협력하기','집중하기'],selCompetencies:['관계 기술'],contact:'NONE'}
];
for(const c of scenarios){const r=E.recommend(A,c,{config:C,rng:()=>0.0001});if(r.selected.length!==3)throw new Error('not enough selected');for(const y of r.selected){const h=E.hardFilter(y.activity,c);if(!h.pass)throw new Error('hard violation '+y.activity.activity_id+':'+h.reason)}}
const c=scenarios[0],r=E.recommend(A,c,{config:C,rng:()=>0.0001});
if(!r.selected.some(y=>y.activity.activity_id==='015')) throw new Error('015 not surfaced in target scenario');
const a015=A.find(a=>a.activity_id==='015');if(!E.hardFilter(a015,c).pass)throw new Error('015 still fails classroom hard filter');
if(x.THEATER_GAME_CONFIG.metadata.rule_version!=='1.3')throw new Error('rule version not 1.3');
console.log('ENGINE_V2_VERIFY_PASS');
console.log(r.selected.map(y=>y.activity.activity_id+' '+y.activity.source_preserved.title+' '+y.score).join('\n'));
