/*global UVServiceWorker,__uv$config*/
/*
 * Stock service worker script.
 * Users can provide their own sw.js if they need to extend the functionality of the service worker.
 * Ideally, this will be registered under the scope in uv.config.js so it will not need to be modified.
 * However, if a user changes the location of uv.bundle.js/uv.config.js or sw.js is not relative to them, they will need to modify this script locally.
 */
importScripts('uv.bundle.js');
importScripts('uv.config.js');
importScripts(__uv$config.sw || 'uv.sw.js');

const sw = new UVServiceWorker();

let bareServerUrl;

async function updateBareServerUrl() {
  const cache = await caches.open('bareServerCache');
  const response = await cache.match('bareServerKey');
  if (response) {
    bareServerUrl = await response.text();
  }
}

updateBareServerUrl();

self.addEventListener('fetch', async (event) => {
  if (bareServerUrl) {
    const req = new Request(bareServerUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
    });

    try {
      const res = await fetch(req);
    
      if (self.__uv$config) {
        self.__uv$config.bare = res.url;
      }
    } catch (error) {
      console.error('Error fetching bare server URL:', error);
    }    
  }

  event.respondWith(sw.fetch(event));
});

self.addEventListener('message', async (event) => {
  if (event.data && event.data.action === 'updateBareServerUrl') {
    updateBareServerUrl()
      .then(() => {
        console.log('Bare server URL updated');
      })
      .catch(error => {
        console.error('Error updating bare server URL:', error);
      });
  }
});

