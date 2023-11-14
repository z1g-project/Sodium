const cacheName = 'offline-cache';
const resourcesToCache = [
  '/',
  '/apps/',
  '/games/',
  '/settings/',
  '/appframe.html',
  '/iframe.html',
  '/uv/',
  '/dynamic/',
  '/service/',
  '/credits.html',
  '/404.html',
  '/settings.js',
  '/addons.js',
  '/dynamicsw.js',
  '/registersw.js',
  '/proxhandler.js',
  '/search.js',
  '/updates.js',
  '/newtab.js',
  '/index.js',
  '/games.js',
  '/credits.js',
  '/changes.js',
  '/ui.css',
  '/sodium.css',
  '/light.css',
  '/halloween.css',
  '/amoled.css',
  '/immortal.css',
  '/item-cards.css',
  '/montserrat.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(resourcesToCache)
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );
    })
  );
});
