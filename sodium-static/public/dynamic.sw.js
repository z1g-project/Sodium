importScripts('/dynamic/dynamic.config.js');
importScripts('/dynamic/dynamic.worker.js');

const dynamic = new Dynamic();

self.dynamic = dynamic;

let bareServerUrl;

async function updateBareServerUrl() {
  const cache = await caches.open('bareServerCache');
  const response = await cache.match('bareServerKey');
  if (response) {
    bareServerUrl = await response.text();
  }
}

updateBareServerUrl();

self.addEventListener('fetch',
  event => {
    event.respondWith(
      (async function() {
        if (await dynamic.route(event)) {
          if (bareServerUrl) {
            const req = new Request(bareServerUrl, {
              method: 'GET',
              mode: 'cors',
              credentials: 'same-origin',
            });

            const res = await fetch(req);

            if (self.__dynamic$config) {
              self.__dynamic$config.bare.path = res.url;
            }
          }
          return await dynamic.fetch(event);
        }
        return await fetch(event.request);
      })()
    );
  }
);
