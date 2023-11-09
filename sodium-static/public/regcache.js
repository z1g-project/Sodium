if (window.location.hostname.includes('.pages.dev')) {
  navigator.serviceWorker.register('static-cache.js')
    .then((registration) => {
      console.log('Static Cache Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Error registering Service Worker:', error);
    });
} else {
  navigator.serviceWorker.register('cache.js')
    .then((registration) => {
      console.log('Cache Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Error registering Service Worker:', error);
    });
}