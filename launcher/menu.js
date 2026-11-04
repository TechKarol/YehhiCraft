import {S,save,apply} from './settings.js';
import {t,translate} from '../assets/js/i18n.js';
import * as V from './versions.js';
import * as SV from './servers.js';
import * as G from './game-loader.js';
const $=id=>document.getElementById(id),L=()=>S.lang;
let editId=null;
const toast=m=>{const e=$('toast');e.textContent=m;e.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>e.hidden=true,3500)};
export{toast};
const F=[['nick','text'],['lang',['pl','en']],['volume','range',0,100],['mouse','range',20,200],['touch','range',20,200],['hudSize','range',50,150],['hudOpacity','range',20,100],['touchOn','check'],['gfx',['low','medium','high']],['scale','range',50,100]];
function form(){const f=$('form');f.textContent='';
 for(const [k,ty,a,b] of F){const row=document.createElement('label');row.className='row';const s=document.createElement('span');s.textContent=t('f_'+k,L());let i;
  if(Array.isArray(ty)){i=document.createElement('select');ty.forEach(o=>{const op=new Option(o,o);i.add(op)});i.value=S[k]}
  else{i=document.createElement('input');i.type=ty==='check'?'checkbox':ty;if(ty==='range'){i.min=a;i.max=b}if(ty==='text')i.maxLength=16;ty==='check'?i.checked=S[k]:i.value=S[k]}
  i.onchange=i.oninput=()=>{S[k]=ty==='check'?i.checked:ty==='range'?+i.value:i.value;save();if(k==='lang'){translate(S.lang);form()}};
  row.append(s,i);f.append(row)}}
async function refresh(){translate(L());const v=V.current();$('verInfo').textContent=t('ver',L())+': '+v.name;
 const m=await V.check(v);$('clientInfo').textContent=t('client',L())+': '+(m.length?t('noclient',L()):t('ready',L()))}
function renderVer(){const u=$('verList');u.textContent='';for(const v of V.VERSIONS){const li=document.createElement('li'),b=document.createElement('button');b.textContent=(v.id===V.current().id?'✔ ':'')+v.name;b.style.flex=1;b.onclick=()=>{V.select(v.id);renderVer()};li.append(b);u.append(li)}}
function renderSrv(){const u=$('srvList');u.textContent='';for(const s of SV.list()){const li=document.createElement('li'),n=document.createElement('span');n.textContent=s.name+' — '+s.addr;
 const mk=(tx,fn)=>{const b=document.createElement('button');b.textContent=tx;b.onclick=fn;return b};
 li.append(n,mk(s.fav?'★':'☆',()=>{SV.fav(s.id);renderSrv()}),mk('✎',()=>{editId=s.id;$('sName').value=s.name;$('sAddr').value=s.addr}),
  mk('▶',async()=>{try{await navigator.clipboard.writeText(s.addr)}catch{}toast(t('srvhint',L()));G.launch()}),mk('✕',()=>{SV.del(s.id);renderSrv()}));u.append(li)}}
export function go(n){document.querySelectorAll('.scr').forEach(s=>s.hidden=s.id!=='s-'+n);if(n==='main')refresh();if(n==='settings')form();if(n==='servers')renderSrv();if(n==='versions')renderVer()}
const A={play:()=>G.launch().then(ok=>{if(!ok)go('main')}),back:G.back,restart:G.restart,full:()=>{if(!G.fullscreen())toast(t('nofe',L()))},
 savesrv:()=>{const n=$('sName').value.trim(),a=$('sAddr').value.trim();const ok=editId?SV.edit(editId,n,a):SV.add(n,a);
  $('sMsg').textContent=t(ok?'saved':'badaddr',L());if(ok){editId=null;$('sName').value=$('sAddr').value='';renderSrv()}}};
export function init(){apply();document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.go)go(b.dataset.go);else if(b.dataset.act)A[b.dataset.act]()});
 document.addEventListener('contextmenu',e=>{if(!$('game').hidden)e.preventDefault()});go('main')}
