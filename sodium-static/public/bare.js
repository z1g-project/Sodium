const CACHE_NAME = 'bareServerCache';

async function getBareServerUrl() {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match('bareServerKey');
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
  // Empty
});

self.addEventListener('message', async e => {
  if (e.data === 'updateBareServer') {
    const bareServer = await getBareServerUrl();
    if (bareServer) {
      const req = await fetch(bareServer + "/", {
        redirect: "follow"
      });

      if (self.__uv$config)
        self.__uv$config.bare = req.url;

      if (self.__dynamic$config)
        self.__dynamic$config.bare.path = req.url;
    }
  }
});

(async () => {
  const bareServer = await getBareServerUrl();
  if (bareServer) {
    const req = await fetch(bareServer + "/", {
      redirect: "follow"
    });

    if (self.__uv$config)
      self.__uv$config.bare = req.url;

    if (self.__dynamic$config)
      self.__dynamic$config.bare.path = req.url;
  }
})();
