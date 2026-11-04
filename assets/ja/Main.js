import {init,toast} from '../launcher/menu.js';
import {t} from './i18n.js';
import {S} from '../../launcher/settings.js';
init();
addEventListener('offline',()=>toast(t('offline',S.lang)));
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').then(r=>r.addEventListener('updatefound',()=>{const w=r.installing;w&&w.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller)toast(t('update',S.lang))})})).catch(e=>console.warn('SW',e));
