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
    const wispServer = localStorage.getItem('wispServer') || "wss://anura.pro"
    await connection.setTransport("/epx/index.mjs", [{ wisp: wispServer }]);
  });
  await navigator.serviceWorker.register('meteor-sw.js', {
    scope: '/service/',
  }).then(async () => {
    const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
    const wispServer = localStorage.getItem('wispServer') || "wss://anura.pro"
    await connection.setTransport("/epx/index.mjs", [{ wisp: wispServer }]);
  });
}
