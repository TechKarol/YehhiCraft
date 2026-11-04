import {get,set,url} from './storage.js';
// required: typowe pliki EaglercraftX 1.8.x – dostosuj do posiadanego buildu
export const VERSIONS=[{id:'eaglerx-1.8.8',name:'EaglercraftX 1.8.8',path:'game/',entry:'index.html',required:['index.html','assets.epk','classes.js']}];
export const current=()=>VERSIONS.find(v=>v.id===get('version'))||VERSIONS[0];
export const select=id=>set('version',id);
export async function check(v){const miss=[];
 for(const f of v.required){try{const r=await fetch(url(v.path+f),{method:'HEAD',cache:'no-store'});
  const ct=r.headers.get('content-type')||'';if(!r.ok||(!f.endsWith('.html')&&ct.includes('text/html')))miss.push(f)}catch{miss.push(f)}}
 return miss}
