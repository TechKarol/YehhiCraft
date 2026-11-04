import {S} from '../launcher/settings.js';
import {get,set} from '../launcher/storage.js';
import {joystick} from './joystick.js';
import {setFrame,key,mouse,look} from './touch.js';
const hud=document.getElementById('hud');
const B=[['jump','⤒','k','Space'],['sneak','⇩','t','ShiftLeft'],['atk','⚔','m',0],['use','✋','m',2],['inv','▦','k','KeyE']];
let built=false,edit=false,pos=get('hudpos',{});
const place=(el,id)=>{const p=pos[id];if(p){el.style.left=p[0]*100+'%';el.style.top=p[1]*100+'%';el.style.right=el.style.bottom='auto'}};
function drag(el,id){let sx,sy,pid=null;
 el.addEventListener('pointerdown',e=>{if(!edit)return;pid=e.pointerId;el.setPointerCapture(pid);const b=el.getBoundingClientRect();sx=e.clientX-b.left;sy=e.clientY-b.top;e.stopImmediatePropagation()},true);
 el.addEventListener('pointermove',e=>{if(!edit||e.pointerId!==pid)return;const x=(e.clientX-sx)/innerWidth,y=(e.clientY-sy)/innerHeight;pos[id]=[Math.max(0,Math.min(.9,x)),Math.max(0,Math.min(.9,y))];place(el,id)});
 el.addEventListener('pointerup',e=>{if(e.pointerId===pid){pid=null;set('hudpos',pos)}})}
function build(){built=true;
 hud.innerHTML='<div id="joy" class="hb"><i></i></div><div id="cam"></div>'+B.map(b=>`<button class="hb" id="b-${b[0]}">${b[1]}</button>`).join('')+'<button class="hb" id="b-hide">👁</button><button class="hb" id="b-edit">✥</button>';
 const joy=hud.querySelector('#joy');joystick(joy,joy.querySelector('i'));drag(joy,'joy');
 for(const [id,,type,v] of B){const el=hud.querySelector('#b-'+id);drag(el,id);let held=false;
  const up=e=>{if(type==='m')mouse(v,false);else if(type==='k')key(v,false)};
  el.addEventListener('pointerdown',e=>{if(edit)return;el.setPointerCapture(e.pointerId);e.preventDefault();
   if(type==='m')mouse(v,true);else if(type==='k')key(v,true);else{held=!held;key(v,held);el.style.filter=held?'brightness(1.6)':''}});
  if(type!=='t')['pointerup','pointercancel'].forEach(n=>el.addEventListener(n,e=>{if(!edit)up(e)}))}
 const cam=hud.querySelector('#cam');let cid=null,lx=0,ly=0;
 cam.addEventListener('pointerdown',e=>{if(cid!==null)return;cid=e.pointerId;cam.setPointerCapture(cid);lx=e.clientX;ly=e.clientY;e.preventDefault()});
 cam.addEventListener('pointermove',e=>{if(e.pointerId!==cid)return;const k=S.touch/100*1.5;look((e.clientX-lx)*k,(e.clientY-ly)*k);lx=e.clientX;ly=e.clientY});
 ['pointerup','pointercancel'].forEach(n=>cam.addEventListener(n,e=>{if(e.pointerId===cid)cid=null}));
 hud.querySelector('#b-hide').onclick=()=>hud.classList.toggle('min');
 hud.querySelector('#b-edit').onclick=()=>{edit=!edit;hud.classList.toggle('edit',edit);hud.querySelector('#joy').dataset.edit=edit?'1':''};
 for(const el of hud.querySelectorAll('.hb'))place(el,el.id.replace('b-',''))}
export function showHud(frame){setFrame(frame);if(!built)build();hud.hidden=!S.touchOn}
export function hideHud(){hud.hidden=true}
