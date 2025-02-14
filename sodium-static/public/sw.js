importScripts('ultra/ultra.bundle.js');
importScripts('ultra/ultra.config.js');
importScripts(__uv$config.sw || 'ultra/ultra.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
  event.respondWith(sw.fetch(event));
});

sw.on('request', (event) => {
  event.data.headers['user-agent'] =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Sodium/2.7.0';
});
