from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')

if 'function currentSpaceScore(act,c)' not in s:
    helpers='''
  function currentSpaceScore(act,c){
    const types=(act.recommendation_normalized.space_types||[]);
    const map={CLASSROOM:0,CLEARED_CLASSROOM:0,MULTIPURPOSE_ROOM:0,OUTDOOR:0};
    const bump=(k,v)=>{map[k]=Math.max(map[k],v)};
    for(const t of types){
      if(t==="CLASSROOM"){bump("CLASSROOM",1);bump("CLEARED_CLASSROOM",1);bump("MULTIPURPOSE_ROOM",.9);}
      else if(t==="OPEN_ACTIVITY_SPACE"){bump("CLEARED_CLASSROOM",1);bump("MULTIPURPOSE_ROOM",1);bump("OUTDOOR",.9);}
      else if(t==="CLEARED_CLASSROOM"){bump("CLEARED_CLASSROOM",1);bump("MULTIPURPOSE_ROOM",1);}
      else if(t==="MULTIPURPOSE_ROOM"){bump("MULTIPURPOSE_ROOM",1);}
      else if(t==="OUTDOOR"){bump("OUTDOOR",1);}
      else if(t==="LARGE_OPEN_SPACE"){bump("CLEARED_CLASSROOM",.55);bump("MULTIPURPOSE_ROOM",1);bump("OUTDOOR",.9);}
      else if(t==="FLOOR_ACTIVITY_SPACE"){bump("CLEARED_CLASSROOM",.9);bump("MULTIPURPOSE_ROOM",1);}
      else if(t==="FLEXIBLE_FURNITURE_SPACE"){bump("CLEARED_CLASSROOM",1);bump("MULTIPURPOSE_ROOM",1);}
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
    if(p.contact_level==="LOW") s-=.15;
    if(p.movement_level==="HIGH") s-=.08;
    return clamp(s);
  }

  function currentConvenience(act){
    const p=act.recommendation_normalized;
    const complexity=act.program_derived.material_complexity;
    let s=!p.materials_required?1:(({LOW:.92,MEDIUM:.84,HIGH:.72,OPTIONAL:.98,NONE:1})[complexity]||.8);
    if(p.noise_level==="HIGH") s-=.12;
    if(p.movement_level==="HIGH") s-=.12;
    return clamp(s);
  }

  function currentDiversityGroup(act){
    const p=act.recommendation_normalized;
    return [p.participant_structure||"OTHER",p.movement_level||"MEDIUM",(p.purpose_tags||[])[0]||"기타"].join("|");
  }
'''
    s=s.replace('  function hardFilter(act,c){',helpers+'\n  function hardFilter(act,c){',1)

repls={
'if(((d.space_compatibility||{})[c.space]||0)<0.5)':'if(currentSpaceScore(act,c)<0.5)',
'energy:(d.energy_fit||{})[c.energy]??.5,':'energy:currentEnergyFit(act,c),',
'space:(d.space_compatibility||{})[c.space]||0,':'space:currentSpaceScore(act,c),',
'convenience:(d.recommendation_features||{}).classroom_convenience??.75':'convenience:currentConvenience(act)',
'let s=(act.program_derived.recommendation_features||{}).safety_score??.8;':'let s=currentSafetyBase(act);',
'if(x.activity.program_derived.diversity_group===y.activity.program_derived.diversity_group)':'if(currentDiversityGroup(x.activity)===currentDiversityGroup(y.activity))'
}
for old,new in repls.items():
    if old in s: s=s.replace(old,new,1)

old='''    candidates.sort((a,b)=>b.score-a.score);
    const selected=selectDiverse(candidates,3,config,options.rng);'''
new='''    let selectionCandidates=candidates;
    let purposeMatchedCount=0;
    if((criteria.purposes||[]).length){
      const purposeMatched=candidates.filter(x=>(criteria.purposes||[]).some(t=>(x.activity.recommendation_normalized.purpose_tags||[]).includes(t)));
      purposeMatchedCount=purposeMatched.length;
      if(purposeMatched.length>=3) selectionCandidates=purposeMatched;
    }
    selectionCandidates.sort((a,b)=>b.score-a.score);
    const selected=selectDiverse(selectionCandidates,3,config,options.rng);'''
if old in s: s=s.replace(old,new,1)

oldret='''      candidateCount:candidates.length,
      rejectCounts,
      reused:!!options.allowReuse'''
newret='''      candidateCount:candidates.length,
      purposeMatchedCount,
      purposeFallback:(criteria.purposes||[]).length>0 && purposeMatchedCount<3,
      rejectCounts,
      reused:!!options.allowReuse'''
if oldret in s: s=s.replace(oldret,newret,1)

oldreason='''    if(matchedPurpose.length) clauses.push(`${matchedPurpose.slice(0,2).join("·")} 목적과 직접 연결돼요.`);'''
newreason='''    if(matchedPurpose.length) clauses.push(`${matchedPurpose.slice(0,2).join("·")} 목적과 직접 연결돼요.`);
    else if((c.purposes||[]).length) clauses.push("선택한 목적의 정확 일치 활동이 부족해, 수업 조건이 가까운 활동을 함께 제안했어요.");'''
if oldreason in s: s=s.replace(oldreason,newreason,1)

s=s.replace('"rule_version":"1.2"','"rule_version":"1.3"',1)
p.write_text(s,encoding='utf-8')
print('engine v2 patch applied')
