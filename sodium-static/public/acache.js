  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('asset-cache').then((cache) => {
        const cachePaths = [];
        for (let i = 1; i <= 58; i++) {
          cachePaths.push(`/games/assets/game${i}.jpg`);
        }
        for (let i = 1; i <= 23; i++) {
          cachePaths.push(`/apps/assets/app${i}.jpg`);
        }
        cachePaths.push('/games/run3/');
        cachePaths.push('/games/run3/ruffle/core.ruffle.9319559a195fae019006.js');
        cachePaths.push('/games/run3/ruffle/core.ruffle.9319559a195fae019006.js.map');
        cachePaths.push('/games/run3/ruffle/core.ruffle.f0662c3f97bfa45134e9.js');
        cachePaths.push('/games/run3/ruffle/core.ruffle.f0662c3f97bfa45134e9.js.map');
        cachePaths.push('/games/run3/ruffle/c1c1a8b2293497a31e49.wasm');
        cachePaths.push('/games/run3/ruffle/dd0be85ee9c2092132d1.wasm');
        cachePaths.push('/games/run3/ruffle/ruffle.js');
        cachePaths.push('/games/run3/ruffle/ruffle.js.map');
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
  