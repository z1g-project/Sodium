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
  BareMux.SetTransport("CurlMod.LibcurlClient", { wisp: 'https://tomp.app/wisp', wasm: "https://cdn.jsdelivr.net/npm/libcurl.js@v0.5.3/libcurl.wasm" });
}

registerSW();