// firefox workaround
if (navigator.userAgent.includes("Firefox")) {
    Object.defineProperty(globalThis, "crossOriginIsolated", {
        value: true,
        writable: false,
    });
}

importScripts(
    "/sj/wasm.js",
    "/sj/shared.js",
    "/sj/worker.js"
);

const scramjet = new ScramjetServiceWorker();

async function handleRequest(event) {
    await scramjet.loadConfig();
    if (scramjet.route(event)) {
        return scramjet.fetch(event);
    }
    return fetch(event.request);
}

self.addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event));
});