import {t} from '../assets/js/i18n.js';
import {S} from './settings.js';
import {current,check} from './versions.js';
import {url} from './storage.js';
import {showHud,hideHud} from '../mobile/controls.js';
const $=id=>document.getElementById(id),frame=$('frame');
export async function status(){const v=current(),missing=await check(v);return{v,missing,ok:!missing.length}}
export async function launch(){const {v,missing,ok}=await status();
 if(!ok){const e=$('err');e.hidden=false;e.textContent=t('missing',S.lang)+missing.join(', ');document.getElementById('s-main')||0;return false}
 $('err').hidden=true;$('menu').hidden=true;$('game').hidden=false;frame.src=url(v.path+v.entry);showHud(frame);return true}
export function back(){hideHud();frame.src='about:blank';$('game').hidden=true;$('menu').hidden=false;if(document.fullscreenElement)document.exitFullscreen()}
export function restart(){const v=current();frame.src='about:blank';setTimeout(()=>{frame.src=url(v.path+v.entry)},60)}
export function fullscreen(){if(!document.documentElement.requestFullscreen)return false;document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{});return true}
