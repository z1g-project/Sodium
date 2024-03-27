importScripts('ultra/ultra.bundle.js');
importScripts('ultra/ultra.config.js');
importScripts(__uv$config.sw || 'ultra/ultra.sw.js');
importScripts('/assets/js/localforge.js');
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'Sodium',
  version: 1.0,
  storeName: 'sodium_config',
  description: 'Sodiums Config for IndexedDB'
})

const sw = new UVServiceWorker();

const uvPromise = new Promise(async (resolve) => {
  try {
      const bare = await localforage.getItem('bare') || __uv$config.bare
      console.log(bare)
      self.__uv$config.bare = bare;
      self.uv = new UVServiceWorker(self.__uv$config);
  }
  catch (error) { console.log(error); }
  resolve();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(sw.fetch(event));
});

sw.on('request', (event) => {
  event.data.headers['user-agent'] =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Sodium/2.0.0';
});
