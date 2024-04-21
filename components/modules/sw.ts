// @ts-expect-error stfu
import { SetTransport } from "@mercuryworkshop/bare-mux"

export async function regSW() {
    navigator.serviceWorker.register('/sw.js', {scope: "/sw/"}).then(await updateTransports)
    navigator.serviceWorker.register('/dynsw.js', {scope: "/service/"})
}

export async function updateTransports() {
    let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
    let transport = localStorage.getItem('transport') || "EpxMod.EpoxyClient"
    SetTransport(transport, { wisp: wispUrl });
}