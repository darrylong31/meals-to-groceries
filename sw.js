var C='picks-v2',F=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','icon-maskable-512.png','config.js'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){var u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return r}).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match('index.html')})}))});
