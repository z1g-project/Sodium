importScripts('/meteor/meteor.codecs.js')
importScripts('/meteor/meteor.config.js')
importScripts('/meteor/meteor.bundle.js')
importScripts('/meteor/meteor.worker.js')

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
