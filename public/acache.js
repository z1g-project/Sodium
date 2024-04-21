self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('asset-cache').then((cache) => {
        const cachePaths = [];
        console.log('%c Sodium Cache Assistant ',`background: #e30d0d; color: white; font-weight: bold; border-radius: 5px;`, '' + 'Sodium Asset Cache will be deprecated soon. For more info read more on the z1g site.')
        cachePaths.push('https://cdn.z1g-project.pages.dev/sodium/swfs/awsomeplanes.swf');
        cachePaths.push('https://cdn.z1g-project.pages.dev/sodium/swfs/papalouie3.swf');
        cachePaths.push('https://cdn.z1g-project.pages.dev/sodium/swfs/run3.swf');
        cachePaths.push('https://cdn.z1g-project.pages.dev/sodium/swfs/run2.swf');
        cachePaths.push('https://cdn.z1g-project.pages.dev/sodium/swfs/run3-kong.swf');
        return cache.addAll(cachePaths);
      })
    );
  });

  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch((error) => {
          console.error(`Error: Couldn't fetch ${event.request.url} | ${error}`);
        });
      })
    );
  });
  