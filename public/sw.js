importScripts('ultra/uv.bundle.js');
importScripts('ultra/uv.config.js');
importScripts(__uv$config.sw || 'ultra/uv.sw.js');
importScripts('epoxy/index.js');
importScripts('libcurl/index.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
  event.respondWith(sw.fetch(event));
});

sw.on('request', (event) => {
  event.data.headers['user-agent'] =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Sodium/2.4.0';
});
