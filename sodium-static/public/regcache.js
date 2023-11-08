navigator.serviceWorker.register('cache.js')
    .then((registration) => {
      console.log('Cache Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Error registering Service Worker:', error);
    });