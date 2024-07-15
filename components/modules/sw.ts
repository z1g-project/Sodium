import { SetTransport } from "@mercuryworkshop/bare-mux"

export async function regSW() {
    navigator.serviceWorker.register('/sw.js', {scope: "/sw/"}).then(await updateTransports)
    navigator.serviceWorker.register('/dyn.sw.js', {scope: "/service/"})
}

export async function updateTransports() {
    let wispUrl = import.meta.env.VITE_WISP_SERVER || (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
    let transport = localStorage.getItem('transport') || "EpxMod.EpoxyClient"
    SetTransport(transport, { wisp: wispUrl });
}