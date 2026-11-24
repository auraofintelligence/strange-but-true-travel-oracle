// Coimas: deterministic, source-backed matching. No network or private data.
export const PATTERNS=[
  "digital-residency",
  "physical-residency",
  "citizenship",
  "enterprise-establishment",
  "collective-ownership",
  "financial-infrastructure",
  "intellectual-property",
  "research-and-enterprise"
];
export const PATHWAYS={
  "digital-identity": [
    [
      "digital-residency",
      5,
      true
    ],
    [
      "financial-infrastructure",
      2,
      false
    ],
    [
      "intellectual-property",
      1,
      false
    ]
  ],
  "personal-residency": [
    [
      "physical-residency",
      5,
      true
    ],
    [
      "financial-infrastructure",
      3,
      false
    ],
    [
      "citizenship",
      2,
      false
    ]
  ],
  "incorporation": [
    [
      "enterprise-establishment",
      5,
      true
    ],
    [
      "financial-infrastructure",
      3,
      true
    ],
    [
      "intellectual-property",
      2,
      false
    ]
  ],
  "intellectual-property": [
    [
      "intellectual-property",
      5,
      true
    ],
    [
      "enterprise-establishment",
      2,
      false
    ]
  ],
  "research": [
    [
      "research-and-enterprise",
      5,
      false
    ],
    [
      "intellectual-property",
      3,
      false
    ],
    [
      "enterprise-establishment",
      2,
      true
    ]
  ],
  "manufacturing": [
    [
      "research-and-enterprise",
      5,
      false
    ],
    [
      "enterprise-establishment",
      3,
      true
    ],
    [
      "intellectual-property",
      2,
      false
    ]
  ],
  "funding": [
    [
      "research-and-enterprise",
      5,
      false
    ],
    [
      "financial-infrastructure",
      4,
      true
    ],
    [
      "enterprise-establishment",
      2,
      true
    ]
  ],
  "deployment": [
    [
      "enterprise-establishment",
      5,
      true
    ],
    [
      "intellectual-property",
      3,
      true
    ],
    [
      "research-and-enterprise",
      2,
      false
    ]
  ],
  "community": [
    [
      "collective-ownership",
      5,
      true
    ],
    [
      "financial-infrastructure",
      3,
      false
    ],
    [
      "research-and-enterprise",
      2,
      false
    ]
  ],
  "infrastructure": [
    [
      "enterprise-establishment",
      5,
      true
    ],
    [
      "research-and-enterprise",
      4,
      false
    ],
    [
      "financial-infrastructure",
      3,
      true
    ]
  ],
  "education": [
    [
      "research-and-enterprise",
      5,
      false
    ],
    [
      "enterprise-establishment",
      3,
      true
    ],
    [
      "intellectual-property",
      2,
      false
    ]
  ],
  "cultural-collaboration": [
    [
      "research-and-enterprise",
      4,
      false
    ],
    [
      "collective-ownership",
      3,
      false
    ],
    [
      "intellectual-property",
      3,
      true
    ]
  ]
};
export function safeUrl(v){return typeof v==="string"&&/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:[/?#][^\s]*)?$/i.test(v)?v:null}

export function dayAge(date,today){if(!/^\d{4}-\d{2}-\d{2}$/.test(date||"")||!/^\d{4}-\d{2}-\d{2}$/.test(today||""))return null;const n=(Date.parse(today)-Date.parse(date))/86400000;return Number.isFinite(n)&&n>=0?n:null}

export function normalizeRecord(raw,pattern,place,today,baseline=180){raw=raw||{};const checked=typeof raw.checked==="string"?raw.checked.slice(0,10):null;const age=dayAge(checked,today);return {pattern,place,status:["mapped","partly-mapped","none-found","unknown"].includes(raw.status)?raw.status:"unknown",checked,confidence:["read directly","search snapshot","unverified"].includes(raw.confidence)?raw.confidence:"unverified",stale:age===null||age>baseline,sources:(Array.isArray(raw.sources)?raw.sources:[]).filter(s=>safeUrl(s?.url)).map(s=>({title:String(s.title||s.authority||"Source"),url:s.url,checked:s.checked||null,supports:String(s.supports||"")})),facts:(Array.isArray(raw.facts)?raw.facts:[]).filter(f=>typeof f?.text==="string").map(f=>({label:String(f.label||""),text:f.text,source:safeUrl(f.source),checked:f.checked||null})),costs:(Array.isArray(raw.costs)?raw.costs:[]).filter(c=>typeof c?.item==="string").map(c=>({item:c.item,amount:Number.isFinite(c.amount)?c.amount:null,currency:typeof c.currency==="string"?c.currency:null,aud:Number.isFinite(c.aud)?c.aud:null,source:safeUrl(c.source),checked:c.checked||null})),agency:raw.agency&&safeUrl(raw.agency.url)?{name:String(raw.agency.name||""),url:raw.agency.url}:null,summary:String(raw.summary||"Not yet checked"),notes:String(raw.notes||"")}}

export function profileFor(p,id,override={}){const t=[p.name,p.title,p.description,...(p.families||[]).map(f=>f.title)].join(" ").toLowerCase();const tags=[],suggested=new Set(["research"]);const rules=[[/software|digital|ai |artificial intelligence|browser|web app|cognitive|data\b|platform/,"digital",["digital-identity","intellectual-property","deployment"]],[/manufactur|hardware|robot|semiconductor|satellite|material|engineering|wearable|geode/,"engineering",["manufacturing","intellectual-property"]],[/tunnel|energy|infrastructure|compute|construction|utility|water|land|solar/,"infrastructure",["infrastructure","funding"]],[/cooperativ|co-operative|mutual|community|volunteer|club|association/,"collective",["community"]],[/care|health|clinical|wellbeing|dementia|disability/,"care",["research","deployment"]],[/education|training|teacher|learning|school/,"education",["education"]],[/music|film|culture|tourism|artwork|festival/,"culture",["cultural-collaboration"]],[/venture capital|investment|finance|funding|grant/,"finance",["funding"]],[/travel|residenc|passport|migration/,"mobility",["personal-residency","digital-identity"]]];for(const [regex,tag,paths] of rules)if(regex.test(t)){tags.push(tag);paths.forEach(x=>suggested.add(x))}return {id,name:p.name,title:p.title||p.name,description:p.description||"",repositoryUrl:p.repositoryUrl,publicPage:safeUrl(p.publicPage),kind:override.kind||"unclassified public project",tags:override.tags||tags,profileStatus:override.reviewed===true?"reviewed":"inferred; review required",suggestedPathways:override.suggestedPathways?.filter(x=>PATHWAYS[x])||[...suggested]}}

export function buildDataset(atlas,spine,vetting,identity={},profiles={},today,versions={},baselines={}){if(!Array.isArray(atlas?.projects)||!Array.isArray(spine?.places))throw Error("Invalid inputs");const seen=new Set();const projects=atlas.projects.map(p=>{if(!p.name||!safeUrl(p.repositoryUrl)||p.repositoryUrl.toLowerCase()!==("https://github.com/auraofintelligence/"+p.name).toLowerCase())throw Error("Unexpected project URL");if(/command[-_ ]?cent(?:re|er)|(?:^|[-_])private(?:$|[-_])/i.test(p.name))throw Error("Sensitive project cannot enter public dataset");const key=p.name.toLowerCase(),rid=identity[key],id=rid?`github:${rid}`:`provisional:${key}`;if(seen.has(id))throw Error("Duplicate project identifier "+id);seen.add(id);return profileFor(p,id,profiles[id]||profiles[key]||{})});const places=new Set();const jurisdictions=spine.places.map(p=>{if(!p.id||places.has(p.id))throw Error("Missing or duplicate jurisdiction ID");places.add(p.id);const doc=vetting[p.id];if(doc&&doc.place!==p.id)throw Error("Vetting place mismatch "+p.id);return {id:p.id,name:p.name,kind:p.kind,region:p.region||null,records:Object.fromEntries(PATTERNS.map(pattern=>[pattern,normalizeRecord(doc?.patterns?.[pattern],pattern,p.id,today,baselines[pattern]||180)]))}});return {schemaVersion:1,generatedOn:today,versions,projectCount:projects.length,jurisdictionCount:jurisdictions.length,projects,jurisdictions}}

export function evaluate(project,jurisdiction,pathway,observations=[],weights={},today){const criteria=PATHWAYS[pathway];if(!criteria)throw Error("Unknown pathway "+pathway);const rows=criteria.map(([pattern,weight,gate])=>{const record=jurisdiction.records[pattern]||normalizeRecord(null,pattern,jurisdiction.id,today);const w=Number.isFinite(weights[pattern])&&weights[pattern]>=0?weights[pattern]:weight;const matches=observations.filter(o=>o.projectId===project.id&&o.placeId===jurisdiction.id&&o.pathway===pathway&&o.pattern===pattern&&o.reviewed===true&&["met","partial","not-met"].includes(o.result)&&safeUrl(o.source)&&dayAge(o.checked,today)!==null&&dayAge(o.checked,today)<=180);const outcomes=new Set(matches.map(o=>o.result));const reviewed=outcomes.size===1?matches.sort((a,b)=>b.checked.localeCompare(a.checked))[0]:null;return {pattern,weight:w,gate,record,reviewed,conflict:outcomes.size>1,score:reviewed?({"met":1,"partial":0.5,"not-met":0})[reviewed.result]:null}});const total=rows.reduce((s,r)=>s+r.weight,0),known=rows.filter(r=>r.reviewed),knownWeight=known.reduce((s,r)=>s+r.weight,0),researched=rows.filter(r=>!r.record.stale&&r.record.status!=="unknown"&&(r.record.sources.length||r.record.facts.some(f=>f.source))),researchWeight=researched.reduce((s,r)=>s+r.weight,0);const verifiedFit=knownWeight?100*known.reduce((s,r)=>s+r.weight*r.score,0)/knownWeight:null;const gateState=rows.some(r=>r.gate&&r.reviewed?.result==="not-met")?"blocked":rows.some(r=>r.gate&&r.reviewed?.result!=="met")?"unresolved":"confirmed";const reviewCoverage=total?knownWeight/total:0,researchCoverage=total?researchWeight/total:0;return {projectId:project.id,placeId:jurisdiction.id,pathway,gateState,verifiedFit,reviewCoverage,researchCoverage,eligibleForRanking:gateState==="confirmed"&&reviewCoverage>=0.6&&verifiedFit!==null&&!rows.some(r=>r.conflict),rows,costs:rows.flatMap(r=>r.record.costs.map(c=>({...c,pattern:r.pattern}))),warnings:rows.filter(r=>r.conflict||r.record.status==="none-found"||r.record.stale||r.record.confidence!=="read directly").map(r=>({pattern:r.pattern,message:r.conflict?"Conflicting reviewed observations; resolve before ranking.":r.record.status==="none-found"?"Nothing found in this pass; do not treat as legal ineligibility.":r.record.stale?"Record missing or stale.":"Source needs direct review."}))}}

export function rank(project,jurisdictions,pathway,observations=[],weights={},today){return jurisdictions.map(j=>({jurisdiction:j,result:evaluate(project,j,pathway,observations,weights,today)})).sort((a,b)=>Number(b.result.eligibleForRanking)-Number(a.result.eligibleForRanking)||(a.result.eligibleForRanking&&b.result.eligibleForRanking?b.result.verifiedFit-a.result.verifiedFit:0)||b.result.researchCoverage-a.result.researchCoverage||a.jurisdiction.name.localeCompare(b.jurisdiction.name))}
