import {key} from './touch.js';
export function joystick(el,knob){let id=null,cx=0,cy=0;const on={};
 const set=(c,v)=>{if(!!on[c]!==v){on[c]=v;key(c,v)}};
 const upd=(x,y)=>{const r=el.clientWidth/2,dx=x-cx,dy=y-cy,d=Math.min(Math.hypot(dx,dy),r),a=Math.atan2(dy,dx),kx=Math.cos(a)*d,ky=Math.sin(a)*d,th=r*.3;
  knob.style.transform=`translate(${kx}px,${ky}px)`;set('KeyA',kx<-th);set('KeyD',kx>th);set('KeyW',ky<-th);set('KeyS',ky>th)};
 const end=()=>{id=null;knob.style.transform='';['KeyW','KeyA','KeyS','KeyD'].forEach(c=>set(c,false))};
 el.addEventListener('pointerdown',e=>{if(el.dataset.edit||id!==null)return;id=e.pointerId;el.setPointerCapture(id);const b=el.getBoundingClientRect();cx=b.left+b.width/2;cy=b.top+b.height/2;upd(e.clientX,e.clientY);e.preventDefault()});
 el.addEventListener('pointermove',e=>{if(e.pointerId===id)upd(e.clientX,e.clientY)});
 ['pointerup','pointercancel','lostpointercapture'].forEach(n=>el.addEventListener(n,e=>{if(e.pointerId===id)end()}));
 return end}
