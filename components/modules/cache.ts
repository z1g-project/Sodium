export default async function updateCache() {
    if (navigator.onLine) {
        console.log('%c Sodium Cache ',`background: #16d495; color: white; font-weight: bold; border-radius: 5px;`, '' + 'Updating Cache Please Wait...')
        regCache()
    } else {
        console.log('%c Sodium Cache ',`background: #16d495; color: white; font-weight: bold; border-radius: 5px;`, '' + 'Your Offline! Cache wont be updated untill your online')
    }
}
  
export function regCache() {
    navigator.serviceWorker.register('cache.js')
    .then((registration) => {
        console.log('%c Sodium Cache ',`background: #16d495; color: white; font-weight: bold; border-radius: 5px;`, '' + 'Cache Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
        console.error('%c Sodium Cache ',`background: #16d495; color: white; font-weight: bold; border-radius: 5px;`, '' + 'Error registering Service Worker:', error);
    });
}
  
window.addEventListener('online', updateCache);
window.addEventListener('offline', updateCache);
  