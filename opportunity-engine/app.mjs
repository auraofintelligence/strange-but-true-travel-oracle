import {PATHWAYS,evaluate,rank,safeUrl,dayAge} from "./engine.mjs";
const $=id=>document.getElementById(id);
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n};
const link=(url,text)=>{const href=safeUrl(url);if(!href)return el("span",text||"Unverified source");const a=el("a",text||href);a.href=href;a.target="_blank";a.rel="noopener noreferrer";return a};
const label=s=>s.replaceAll("-"," ").replace(/\b\w/g,c=>c.toUpperCase());
const pct=x=>Math.round(x*100)+"%";
const today=new Date(Date.now()+10*3600*1000).toISOString().slice(0,10);
let dataset,projects=[],places=[],observations=[],weights={};
let selectedResult=null;
const controls=["direction","project","place","pathway","filter","display"];
function option(select,value,text){const o=el("option",text);o.value=value;select.append(o)}
function refreshWeights(){const box=$("weights");box.replaceChildren();weights={};for(const [pattern,w,gate] of PATHWAYS[$("pathway").value]||[]){const field=el("label",label(pattern)+(gate?" · required gate":""));const input=el("input");input.type="range";input.min="0";input.max="10";input.step="1";input.value=w;const value=el("small",String(w));input.addEventListener("input",()=>{weights[pattern]=Number(input.value);value.textContent=input.value;render()});field.append(input,value);box.append(field)}}
const project=()=>projects.find(p=>p.id===$("project").value);
const place=()=>places.find(p=>p.id===$("place").value);
function currentResult(p,j){return evaluate(p,j,$("pathway").value,observations,weights,today)}
function render(){
 if(!dataset||!project()||!place())return;
 const p=project(),j=place(),pathway=$("pathway").value,reverse=$("direction").value==="place",q=$("filter").value.trim().toLowerCase(),mode=$("display").value;
 $("profile").replaceChildren(el("span",p.title+" · "+p.profileStatus+" · Suggested pathways: "+p.suggestedPathways.map(label).join(", ")+" · "),link(p.publicPage||p.repositoryUrl,"Open project"));
 $("results-title").textContent=reverse?"Projects in "+j.name:"Jurisdictions for "+p.title;
 let rows=reverse?projects.map(pr=>({p:pr,j,r:currentResult(pr,j)})):rank(p,places,pathway,observations,weights,today).map(x=>({p,j:x.jurisdiction,r:x.result}));
 if(reverse)rows.sort((a,b)=>Number(b.r.eligibleForRanking)-Number(a.r.eligibleForRanking)||(a.r.eligibleForRanking&&b.r.eligibleForRanking?b.r.verifiedFit-a.r.verifiedFit:0)||Number(b.p.suggestedPathways.includes(pathway))-Number(a.p.suggestedPathways.includes(pathway))||a.p.title.localeCompare(b.p.title));
 rows=rows.filter(x=>{const searchable=reverse?x.p.title+" "+x.p.tags.join(" "):x.j.name+" "+(x.j.region||"");return searchable.toLowerCase().includes(q)&&(mode==="all"||(mode==="ranked"&&x.r.eligibleForRanking)||(mode==="research"&&x.r.reviewCoverage<1))});
 const ranked=rows.filter(x=>x.r.eligibleForRanking).length;
 $("result-note").textContent=rows.length+" results · "+ranked+" eligible for reviewed ranking. Unreviewed results are research leads, not recommendations.";
 const tbody=$("results");tbody.replaceChildren();
 for(const x of rows){const tr=el("tr");const name=el("td"),b=el("button",reverse?x.p.title:x.j.name);b.type="button";b.addEventListener("click",()=>{if(reverse)$("project").value=x.p.id;else $("place").value=x.j.id;render()});name.append(b);if(!reverse&&x.j.region)name.append(el("small"," "+x.j.region));tr.append(name,el("td",pct(x.r.researchCoverage),"metric"),el("td",x.r.verifiedFit===null?"Not reviewed":Math.round(x.r.verifiedFit)+"%"+(x.r.eligibleForRanking?"":" · provisional"),"metric"),el("td",x.r.gateState));tbody.append(tr)}
 selectedResult=currentResult(p,j);renderDetails(p,j,selectedResult);
 $("review-status").textContent=observations.length+" in-memory observations. Export before closing this page.";
}
function renderDetails(p,j,r){
 $("detail-title").textContent=p.title+" · "+j.name;
 const box=$("details");box.replaceChildren(el("p",label(r.pathway)+" · Research coverage "+pct(r.researchCoverage)+" · Reviewed coverage "+pct(r.reviewCoverage)+" · Gates "+r.gateState));
 box.append(el("p",r.eligibleForRanking?"Reviewed fit: "+Math.round(r.verifiedFit)+"%. This is a reviewed research assessment, not permission to operate.":"Not eligible for ranking yet. Complete the required gates and review sufficient specific evidence.","muted"));
 for(const row of r.rows){
   const rec=row.record,card=el("section",undefined,"record");
   card.append(el("h3",label(row.pattern)+(row.gate?" · required gate":"")),el("p",rec.summary),el("small","Status: "+rec.status+" · "+rec.confidence+" · Checked: "+(rec.checked||"unknown")+(rec.stale?" · stale":"")));
   for(const w of r.warnings.filter(w=>w.pattern===row.pattern))card.append(el("p",w.message,"warning"));
   if(rec.agency)card.append(el("p","Official starting point: "),link(rec.agency.url,rec.agency.name||rec.agency.url));
   if(rec.facts.length){const ul=el("ul");for(const f of rec.facts){const li=el("li",f.label+": "+f.text);if(f.source)li.append(" ",link(f.source,"Source"));if(f.checked)li.append(el("small"," · "+f.checked));ul.append(li)}card.append(ul)}
   if(rec.notes)card.append(el("p",rec.notes,"muted"));
   if(rec.sources.length){const list=el("ul");for(const s of rec.sources){const li=el("li");li.append(link(s.url,s.title),el("small",s.checked?" · "+s.checked:""));list.append(li)}card.append(el("h3","Sources"),list)}
   const form=el("form",undefined,"panel");
   const result=el("select");option(result,"","Choose reviewed outcome");for(const [v,t] of [["met","Requirement met"],["partial","Partly met / conditional"],["not-met","Requirement not met"]])option(result,v,t);
   const source=el("input");source.type="url";source.required=true;source.placeholder="https://official-source...";
   const checked=el("input");checked.type="date";checked.required=true;checked.value=today;checked.max=today;
   const note=el("textarea");note.required=true;note.rows=2;note.placeholder="Why does this source establish this project's exact requirement?";
   const button=el("button","Record reviewed evidence");button.type="submit";
   for(const [title,node] of [["Outcome",result],["Direct source URL",source],["Date reviewed",checked],["Evidence explanation",note]]){const field=el("label",title);field.append(node);form.append(field)}
   form.append(button);
   form.addEventListener("submit",e=>{e.preventDefault();if(!result.value||!safeUrl(source.value)||dayAge(checked.value,today)===null||!note.value.trim()){alert("Enter a valid outcome, direct HTTPS source, review date and explanation.");return}const key={projectId:p.id,placeId:j.id,pathway:r.pathway,pattern:row.pattern};observations=observations.filter(o=>!Object.keys(key).every(k=>o[k]===key[k]));observations.push({...key,result:result.value,source:source.value,checked:checked.value,reviewed:true,note:note.value.trim()});render()});
   if(row.reviewed){const msg=el("p","Reviewed: "+row.reviewed.result+" · "+row.reviewed.checked+" · ");msg.append(link(row.reviewed.source,"Evidence"));card.append(msg);if(row.reviewed.note)card.append(el("p",row.reviewed.note,"muted"))}
   card.append(form);box.append(card);
 }
 const costSection=el("section",undefined,"record");costSection.append(el("h3","Published cost items"));
 if(!r.costs.length)costSection.append(el("p","No cost amounts are recorded in the applicable patterns. This is unknown, not zero.","empty"));
 const total=el("p","Selected sourced AUD items: none");
 let selections=new Map();
 r.costs.forEach((c,i)=>{const row=el("div",undefined,"cost"),check=el("input");check.type="checkbox";check.disabled=!Number.isFinite(c.aud)||!c.source||!c.checked||dayAge(c.checked,today)===null||dayAge(c.checked,today)>180;const text=el("label",c.item+" · "+(c.amount===null?"Amount not recorded":c.amount+" "+(c.currency||""))+(c.aud===null?"":" · A$"+c.aud));if(c.source)text.append(" ",link(c.source,"Source"));if(c.checked)text.append(el("small"," · "+c.checked));check.addEventListener("change",()=>{if(check.checked)selections.set(i,c.aud);else selections.delete(i);total.textContent=selections.size?"Selected sourced AUD items: A$"+[...selections.values()].reduce((a,b)=>a+b,0).toLocaleString("en-AU",{maximumFractionDigits:2}):"Selected sourced AUD items: none"});row.append(check,text);costSection.append(row)});
 costSection.append(total,el("p","Select only comparable, non-overlapping fees for the same period. This is not an all-in establishment budget.","muted"));box.append(costSection);
}
$("export").addEventListener("click",()=>{const blob=new Blob([JSON.stringify({schemaVersion:1,observations},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob),a=el("a");a.href=url;a.download="coimas-review-"+today+".json";a.click();URL.revokeObjectURL(url)});
$("clear").addEventListener("click",()=>{if(confirm("Clear all in-memory observations? Export them first if needed.")){observations=[];render()}});
$("import").addEventListener("change",async e=>{try{const file=e.target.files[0];if(!file)return;const d=JSON.parse(await file.text());if(d.schemaVersion!==1||!Array.isArray(d.observations)||d.observations.length>100000)throw Error("Invalid review workbook");const valid=d.observations.filter(o=>o&&projects.some(p=>p.id===o.projectId)&&places.some(j=>j.id===o.placeId)&&PATHWAYS[o.pathway]?.some(x=>x[0]===o.pattern)&&o.reviewed===true&&safeUrl(o.source)&&["met","partial","not-met"].includes(o.result)&&dayAge(o.checked,today)!==null);observations=valid;render();$("review-status").textContent=valid.length+" observations imported; "+(d.observations.length-valid.length)+" invalid or unmatched rows ignored."}catch(err){$("review-status").textContent="Import failed: "+err.message}finally{e.target.value=""}});
for(const id of controls)$(id).addEventListener(id==="filter"?"input":"change",()=>{if(id==="pathway")refreshWeights();render()});
try{
 const response=await fetch("./generated/dataset.json",{cache:"no-cache"});if(!response.ok)throw Error("Generated dataset is not available yet (HTTP "+response.status+")");
 dataset=await response.json();if(dataset.schemaVersion!==1||!Array.isArray(dataset.projects)||!Array.isArray(dataset.jurisdictions))throw Error("Unexpected dataset schema");
 projects=[...dataset.projects].sort((a,b)=>a.title.localeCompare(b.title));places=[...dataset.jurisdictions].sort((a,b)=>a.name.localeCompare(b.name));
 for(const j of places)for(const rec of Object.values(j.records)){const age=dayAge(rec.checked,today);rec.stale=rec.stale||age===null||age>180}
 projects.forEach(p=>option($("project"),p.id,p.title));places.forEach(j=>option($("place"),j.id,j.name));Object.keys(PATHWAYS).forEach(p=>option($("pathway"),p,label(p)));
 if(places.some(x=>x.id==="ee"))$("place").value="ee";
 $("pathway").value="digital-identity";refreshWeights();
 $("source-status").textContent=projects.length+" public projects · "+places.length+" jurisdictions · 12 pathways · dataset "+dataset.generatedOn+" · Atlas "+(dataset.versions?.atlas||"unversioned").slice(0,12)+" · Travel "+(dataset.versions?.worldTravelPatterns||"unversioned").slice(0,12);
 render();
}catch(err){$("source-status").textContent=err.message+". Build the public dataset using the README instructions.";for(const id of controls)$(id).disabled=true;$("export").disabled=true;$("import").disabled=true;$("clear").disabled=true}
