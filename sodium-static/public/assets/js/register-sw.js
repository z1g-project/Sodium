"use strict";
const stockSW = "/sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
  if (
    location.protocol !== "https:" &&
    !swAllowedHostnames.includes(location.hostname)
  )
    throw new Error("Service workers cannot be registered without https.");

  if (!navigator.serviceWorker)
    throw new Error("Your browser doesn't support service workers.");

  await navigator.serviceWorker.register(stockSW, {
    scope: __uv$config.prefix,
  }).then(async () => {
    const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
    const wispServer = localStorage.getItem('wispServer') || "wss://terbiumon.top/wisp/"
    await connection.setTransport("/epx/index.mjs", [{ wisp: wispServer }]);
  });
  await navigator.serviceWorker.register('sjw.js', {
    scope: '/service/',
  }).then(async () => {
    const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
    const wispServer = localStorage.getItem('wispServer') || "wss://terbiumon.top/wisp/"
    const scramjet = new window.ScramjetController({
      prefix: "/service/",
      files: {
          wasm: "/sj/wasm.js",
          worker: "/sj/worker.js",
          client: "/sj/client.js",
          shared: "/sj/shared.js",
          sync: "/sj/sync.js",
      },
      defaultFlags: {
          serviceworker: true,
          rewriterLogs: false,
      },
      codec: {
          encode: `
              if (!url) return Promise.resolve(url);
              let result = "";
            let len = url.length;
                for (let i = 0; i < len; i++) {
                    const char = url[i];
                    result += i % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char;
                  }
            return encodeURIComponent(result);
          `,
          decode: `
              if (!url) return Promise.resolve(url);
            url = decodeURIComponent(url);
            let result = "";
            let len = url.length;
            for (let i = 0; i < len; i++) {
                const char = url[i];
                result += i % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char;
            }
          return result;
          `,
      }
    });
    scramjet.init()
    await connection.setTransport("/epx/index.mjs", [{ wisp: wispServer }]);
  });
}
