const V='yehhicraft-v1';
const SHELL=['./','index.html','manifest.webmanifest','assets/css/style.css','assets/js/main.js','assets/js/i18n.js','assets/images/logo.svg','assets/images/bg.svg','assets/icons/icon-192.png','assets/icons/icon-512.png','launcher/menu.js','launcher/settings.js','launcher/storage.js','launcher/versions.js','launcher/servers.js','launcher/game-loader.js','mobile/controls.js','mobile/joystick.js','mobile/touch.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('yehhicraft-')&&x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url),base=new URL('./',self.registration.scope).pathname;
 if(r.method!=='GET'||u.origin!==location.origin||u.pathname.startsWith(base+'game/'))return; // klient gry nie jest cache'owany przez launcher
 e.respondWith(caches.match(r).then(c=>{const n=fetch(r).then(res=>{if(res.ok)caches.open(V).then(x=>x.put(r,res.clone()));return res}).catch(()=>c);return c||n}))});
