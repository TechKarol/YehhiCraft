import {get,set} from './storage.js';
export const DEF={nick:'Player',lang:'pl',volume:80,mouse:100,touch:100,hudSize:100,hudOpacity:70,touchOn:true,gfx:'medium',scale:100};
export const S={...DEF,...get('settings',{})};
export function apply(){const r=document.documentElement;r.style.setProperty('--hud',S.hudSize/100);r.style.setProperty('--hudo',S.hudOpacity/100);r.lang=S.lang}
export function save(){set('settings',S);apply()}
