function updateCache() {
  if (navigator.onLine) {
      console.log('Updating Cache Please Wait...')
      regCache()
  } else {
      console.log('Your Offline! Cache wont be updated untill your online')
  }
}

function regCache() {
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
}

window.addEventListener('online', updateCache());
window.addEventListener('offline', updateCache());
updateCache()
