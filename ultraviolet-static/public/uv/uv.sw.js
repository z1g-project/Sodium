(() => {
    "use strict";
  
    const Ultraviolet = self.Ultraviolet;
  
    class UVServiceWorker extends Ultraviolet.EventEmitter {
      constructor(config = __uv$config) {
        super();
        this.config = config;
        this.address = config.bare;
        this.bareClient = new Ultraviolet.BareClient(this.address);
      }
  
      async fetch({ request }) {
        try {
          if (request.url.endsWith(".xor") || request.url.startsWith("http://google.xor")) {
            const errorPageHTML = `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8" />
                <title>Error</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    line-height: 1.5;
                  }
                  h1 {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                  }
                  p {
                    margin-bottom: 5px;
                  }
                  ul {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    padding-left: 20px;
                  }
                  button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 16px;
                    font-weight: bold;
                  }
                </style>
              </head>
              <body>
                <h1>This site can't be reached</h1>
                <hr />
                <p><strong>URL:</strong> ${request.url}</p>
                <p><strong>Error:</strong> This site can't be reached</p>
                <ul>
                  <li>Verifying you entered the correct address</li>
                  <li>Clearing the site data</li>
                  <li>Contacting the website's administrator</li>
                  <li>Verifying the Bare server isn't censored</li>
                </ul>
                <button onclick="location.reload()">Reload</button>
              </body>
              </html>
            `;
  
            const errorResponse = new Response(errorPageHTML, {
              headers: { "Content-Type": "text/html" },
              status: 200,
              statusText: "OK",
            });
  
            return errorResponse;
          }
  
          // Rest of the code remains the same
  
        } catch (error) {
          // Error handling code remains the same
        }
      }
  
      static get Ultraviolet() {
        return Ultraviolet;
      }
    }
  
    self.UVServiceWorker = UVServiceWorker;
  
    const config = {
      siteKey: "default",
      serviceWorker: "uv.sw.js",
    };
  
    const uvServiceWorker = new UVServiceWorker(config);
  
    uvServiceWorker.emit("install", new InstallEvent("install"));
  
    self.addEventListener("fetch", function (event) {
      event.respondWith(uvServiceWorker.fetch(event));
    });
  })();
  