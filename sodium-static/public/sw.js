const swAllowedHostnames = ["localhost", "127.0.0.1", "10.0.0.1"];

async function registerSW() {
  if (
    location.protocol !== "https:" &&
    !swAllowedHostnames.includes(location.hostname)
  )
    throw new Error("Service workers cannot be registered without https.");

  if (!navigator.serviceWorker)
    throw new Error("Your browser doesn't support service workers.");

  await navigator.serviceWorker.register("/violet/sw.js", {
    scope: '/violet/sw/',
  });
  console.log("Wisp UV Service Worker registered.");
  const CurlMod = window.CurlMod
  BareMux.registerRemoteListener(navigator.serviceWorker.controller);
  if (window.location.origin.includes('.pages.dev')) {
    const wispSrv = `wss://tomp.app/wisp/`
    BareMux.SetTransport("CurlMod.LibcurlClient", { wisp: `${wispSrv}`, wasm: "https://cdn.jsdelivr.net/npm/libcurl.js@v0.6.7/libcurl.wasm" });
  } else {
    const wispSrv = `${window.location.protocol.replace("http", "ws")}//${window.location.host}/wisp/`
    BareMux.SetTransport("CurlMod.LibcurlClient", { wisp: `${wispSrv}`, wasm: "https://cdn.jsdelivr.net/npm/libcurl.js@v0.6.7/libcurl.wasm" });
  }
}

registerSW();