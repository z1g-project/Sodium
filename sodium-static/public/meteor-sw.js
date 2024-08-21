await navigator.serviceWorker.register('m-sw.js', {
    scope: '/service/',
}).then(async () => {
    const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
    const wispServer = localStorage.getItem('wispServer') || "wss://tomp.app"
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispServer }]);
});