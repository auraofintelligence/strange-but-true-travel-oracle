import {readFile,mkdir,writeFile} from "node:fs/promises";
import {resolve,dirname,join} from "node:path";
import {fileURLToPath} from "node:url";
import {execFileSync} from "node:child_process";
import {buildDataset,PATTERNS} from "./engine.mjs";

const here=dirname(fileURLToPath(import.meta.url));
const args=process.argv.slice(2);
const option=(flag,fallback)=>{const i=args.indexOf(flag);if(i<0)return fallback;if(!args[i+1]||args[i+1].startsWith("--"))throw Error("Missing value for "+flag);return args[i+1]};
const atlasRoot=resolve(option("--atlas",join(here,"../../project-atlas")));
const travelRoot=resolve(option("--travel",join(here,"../../world-travel-patterns")));
const out=resolve(option("--out",join(here,"generated/dataset.json")));
const today=new Date(Date.now()+10*3600*1000).toISOString().slice(0,10);
const read=async path=>JSON.parse(await readFile(path,"utf8"));
const optional=async path=>{try{return await read(path)}catch(e){if(e.code==="ENOENT")return null;throw e}};
const revision=path=>{try{return execFileSync("git",["-C",path,"rev-parse","HEAD"],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}};
const atlas=await read(join(atlasRoot,"data/projects.json"));
const spine=await read(join(travelRoot,"data/places/spine.json"));
const vetting={};
const baselines={};
for(const p of PATTERNS){const definition=await read(join(travelRoot,"patterns",p+".json"));if(definition.id!==p)throw Error("Pattern ID mismatch "+p);baselines[p]=definition.baseline_days}
for(const p of spine.places){if(!/^[a-z0-9][a-z0-9/_-]*$/i.test(p.id))throw Error("Unsafe place identifier");const record=await optional(join(travelRoot,"data/vetting",p.id.replaceAll("/","__")+".json"));if(record)vetting[p.id]=record}
let identity={};
if(args.includes("--refresh-ids")){
  const inventory=new Map();
  for(let page=1;page<=100;page++){
    const headers={"Accept":"application/vnd.github+json","User-Agent":"Coimas-public-identity-audit"};
    if(process.env.GITHUB_TOKEN)headers.Authorization="Bearer "+process.env.GITHUB_TOKEN;
    const response=await fetch("https://api.github.com/users/auraofintelligence/repos?type=owner&per_page=100&page="+page,{headers});
    if(!response.ok)throw Error("GitHub public inventory failed: "+response.status);
    const batch=await response.json();if(!Array.isArray(batch))throw Error("Invalid GitHub inventory");
    for(const r of batch)if(r.owner?.login?.toLowerCase()==="auraofintelligence"&&!r.private&&r.visibility==="public"&&!r.archived&&!r.disabled)inventory.set(r.name.toLowerCase(),r);
    if(batch.length<100)break;
    if(page===100)throw Error("Inventory pagination incomplete");
  }
  for(const p of atlas.projects){const r=inventory.get(p.name.toLowerCase());if(!r||!r.id||r.html_url.toLowerCase()!==p.repositoryUrl.toLowerCase())throw Error("Atlas record no longer matches an active public repository; stop publication");identity[p.name.toLowerCase()]=String(r.id)}
}else{
  const idPath=option("--identity",join(here,"public-repo-ids.json"));
  const previous=await optional(resolve(idPath));identity=previous?.ids||{};
}
const profilesPath=option("--profiles",null);
if(profilesPath&&!args.includes("--local-only"))throw Error("Custom project profiles are only permitted in a local-only build");
if(args.includes("--local-only")&&!args.includes("--out"))throw Error("Local-only build requires an explicit output path outside any published directory");
if(args.includes("--local-only")&&out.startsWith(join(here,"generated")))throw Error("Local-only output cannot be placed in the public generated directory");
const profiles=profilesPath?await read(resolve(profilesPath)):{};
const dataset=buildDataset(atlas,spine,vetting,identity,profiles,today,{atlas:revision(atlasRoot),worldTravelPatterns:revision(travelRoot)},baselines);
if(dataset.projectCount<1||dataset.jurisdictionCount<1)throw Error("Empty source dataset");
await mkdir(dirname(out),{recursive:true});
await writeFile(out,JSON.stringify(dataset)+"\n","utf8");
console.log(JSON.stringify({projects:dataset.projectCount,jurisdictions:dataset.jurisdictionCount,patterns:PATTERNS.length,records:dataset.jurisdictions.reduce((n,j)=>n+Object.values(j.records).filter(r=>r.status!=="unknown").length,0),stableIds:dataset.projects.filter(p=>p.id.startsWith("github:")).length,sourceRevisions:dataset.versions,out},null,2));
