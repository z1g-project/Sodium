navigator.serviceWorker.register('./dipsw.js')
  .then(registration => {
    console.log('Service Worker registered with scope:', registration.scope);

    importScripts('./dip/dip.worker.js');

    const sw2 = new DIPServiceWorker('./dip/dip.worker.js');

    self.addEventListener('fetch', event => {
      if (event.request.url.startsWith(location.origin+'/dip/service/')) event.respondWith(sw2.fetch(event));
    });
  })
  .catch(error => {
    console.error('Service Worker registration failed:', error);
  });
