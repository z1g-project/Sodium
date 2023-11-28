importScripts('ultra/ultra.bundle.js');
importScripts('ultra/ultra.config.js');
importScripts(__uv$config.sw || 'ultra/ultra.sw.js');

const sw = new UVServiceWorker();

const dbPromise = Ultraviolet.openDB('bareServerDB', 1, {
  upgrade(db) {
    db.createObjectStore('bareServerStore');
  },
});

async function updateBareServerUrl() {
  try {
    const db = await dbPromise;
    const transaction = db.transaction(['bareServerStore'], 'readonly');
    const objectStore = transaction.objectStore('bareServerStore');
    const request = objectStore.get('bareServerKey');
    console.log('Fetching Cache...');

    request.onsuccess = () => {
      const bareServerUrl = request.result;
      console.log('Reading Cache Please Wait...');
      if (bareServerUrl) {
        self.__uv$config.bare = bareServerUrl
        console.log('Updated Bare URL!');
      } else {
        console.log('No Custom Bare URL Specified: Using Normal')
      }
    };

    request.onerror = (error) => {
      console.error('Error fetching bare server URL:', error);
    };
  } catch (error) {
    console.error('Error updating bare server URL:', error);
  }
}

self.addEventListener('fetch', (event) => {
  updateBareServerUrl();
  event.respondWith(sw.fetch(event));
});

self.addEventListener('message', async (event) => {
  if (event.data && event.data.action === 'updateBareServerUrl') {
    updateBareServerUrl()
      .then(() => {
        console.log('Bare server URL updated');
      })
      .catch((error) => {
        console.error('Error updating bare server URL:', error);
      });
  }
});

sw.on('request', (event) => {
  event.data.headers['user-agent'] =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Sodium/2.0.0';
});
