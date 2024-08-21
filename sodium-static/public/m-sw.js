importScripts('/m/m.codecs.js')
importScripts('/m/m.config.js')
importScripts('/m/m.bundle.js')
importScripts('/m/m.worker.js')

const meteor = new MeteorServiceWorker()
function handleRequest(event) {
  if (meteor.shouldRoute(event)) {
    return meteor.handleFetch(event)
  }

  return fetch(event.request)
}
self.addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})
