self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/ui.css',
        '/amoled.css',
        '/legacy.css',
        '/settings.js',
        '/bare.js',
        '/addons.js',
        '/404.html',
        '/appframe.html',
        '/iframe.html',
        '/credits.html',
        '/appx.json',
        '/debug.js',
        '/credits.js',
        '/register-sw.js',
        '/dynamic.sw.js',
        '/fade.js',
        '/error.js',
        '/favicon.ico',
        '/faq.html',
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
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
