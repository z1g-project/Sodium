self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('offline-cache').then((cache) => {
        let resourcesToCache = [
            '/',
            '/ui.css',
            '/amoled.css',
            '/legacy.css',
            '/settings.js',
            '/bare.js',
            '/addons.js',
            '/appframe',
            '/appx.json',
            '/debug.js',
            '/credits.js',
            '/register-sw.js',
            '/dynamic.sw.js',
            '/fade.js',
            '/error.js',
            '/favicon.ico',
            '/settings/',
            '/settings/css-editor/',
            '/github/',
            '/apps/',
            '/games/',
            '/sodium.png',
            '/sodium-header-img.png',
            '/montserrat.css',
            '/assets/img/amoled-waves.svg',
            '/assets/img/license.svg',
            '/assets/img/bat-full.svg',
            '/assets/img/bat-full-charge.svg',
            '/assets/img/bat-med.svg',
            '/assets/img/bat-med-charge.svg',
            '/assets/img/bat-dead.svg',
            '/assets/img/bat-dead-charge.svg',
            '/assets/img/home.svg',
            '/assets/img/apps.svg',
            '/assets/img/games.svg',
            '/assets/img/settings.svg',
            '/assets/img/v2-waves.svg',
            '/assets/img/z1g.png',
            '/assets/img/discord.jpg',
            '/assets/img/github.png',
            '/time.js',
            '/updates.js',
            '/version.txt',
            '/assets/img/legacy-waves.svg',
            '/about/',
        ];
  
        if (event.request.url.includes('.pages.dev')) {
          resourcesToCache = resourcesToCache.concat([
            '/404',
            '/faq',
            '/credits',
            '/newtab',
            '/stealth',
            '/welcome',
          ]);
          console.log('CF Pages Detected Using Cache B');
        } else {
          resourcesToCache = resourcesToCache.concat([
            '/404.html',
            '/faq.html',
            '/credits.html',
            '/newtab.html',
            '/stealth.html',
            '/welcome.html',
          ]);
          console.log('Using Default Cache A');
        }
  
        return cache.addAll(resourcesToCache);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
  
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
  
          const responseToCache = networkResponse.clone();
          caches.open('offline-cache').then((cache) => {
            cache.put(event.request, responseToCache);
          });
  
          return networkResponse;
        });
      })
    );
  });
  