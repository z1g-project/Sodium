const SETTINGS_CACHE_NAME = 'settingsCache';

async function getDynamicEncoder() {
  const cache = await caches.open(SETTINGS_CACHE_NAME);
  const response = await cache.match('dynamicEncoderKey');
  if (response) {
    return await response.text();
  }
  return null;
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Empty Lol
});

(async () => {
  const dynamicEncoder = await getDynamicEncoder();
  if (dynamicEncoder) {
    self.__dynamic$config.encoding = dynamicEncoder;
  }
})();
