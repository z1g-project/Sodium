self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('offline-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/assets/css/ui.css',
          '/assets/css/amoled.css',
          '/assets/css/legacy.css',
          '/404',
          '/appframe',
          '/iframe',
          '/credits',
          '/dyn.sw.js',
          '/favicon.ico',
          '/faq',
          '/settings',
          '/apps',
          '/games',
          '/epoxy/index.js',
          '/libcurl/index.js',
          '/sodium.png',
          '/assets/css/montserrat.css',
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
          '/assets/img/legacy-waves.svg',
          '/about',
          '/assets/css/item-cards.css',
          '/manifest.webmanifest',
          '/assets/css/mocha.css',
          '/assets/img/mocha-waves.svg',
          '/assets/css/dark.css',
          '/assets/img/dark-waves.svg',
          '/assets/img/loader.svg',
          '/ultra/uv.config.js',
          '/ultra/uv.bundle.js',
          '/dyn/dynamic.config.js',
          '/assets/font/montserrat/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch((error) => {
          console.error(`Error: Couldn't fetch ${event.request.url} | ${error}`);
        });
      })
    );
  });
  