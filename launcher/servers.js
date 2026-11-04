import {get,set} from './storage.js';
let L=get('servers',[]);const sv=()=>set('servers',L);
export const list=()=>[...L].sort((a,b)=>b.fav-a.fav);
export const valid=a=>/^wss?:\/\/[^\s/]+(:\d+)?(\/\S*)?$/i.test(a);
export function add(name,addr){if(!valid(addr))return false;L.push({id:Date.now().toString(36),name:name||addr,addr,fav:0});sv();return true}
export function edit(id,name,addr){const s=L.find(x=>x.id===id);if(!s||!valid(addr))return false;s.name=name||addr;s.addr=addr;sv();return true}
export const del=id=>{L=L.filter(x=>x.id!==id);sv()};
export const fav=id=>{const s=L.find(x=>x.id===id);if(s){s.fav=s.fav?0:1;sv()}};
