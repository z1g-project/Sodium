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
  event.respondWith(
    (async function () {
      try {
        const cache = await caches.open(CACHE_NAME);

        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        const fetchedResponse = await fetch(event.request);
        await cache.put(event.request, fetchedResponse.clone());
        return fetchedResponse;

      } catch (e) {
        console.error('Fetch error:', e);
        return new Response(e.toString(), { status: 500 });
      }
    })()
  );
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

function sendUpdateMessageToServiceWorker() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ action: 'updateBareServerUrl' });
  }
}

navigator.serviceWorker.addEventListener('controllerchange', sendUpdateMessageToServiceWorker);

sendUpdateMessageToServiceWorker();

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
