// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
import { version, name } from "wisp-server-node/package.json"
export default function WispBG() {
    function setInfo(txt: string) {
        // @ts-expect-error stfu
        const inf: HTMLElement = document.getElementById("server-info")
            inf.innerHTML = txt;
    }
    async function ping() {
        try {
            const response = await fetch(process.env.VITE_WISP_SERVER || `${window.location.protocol.replace("http", "ws")}//${window.location.host}/wisp/`)
            if (response.ok) {
                setInfo("If you see this from Ultraviolet, Then the Backend's Wisp Server is up and working.")
            } else {
                setInfo("Ping failed. Please ignore this message if you are viewing this from static hosting.")
            }
        } catch (error) {
            setInfo("Error pinging server. Please ignore this message if you are viewing this from static hosting.")
        }
    }

    if (window.location.href.includes('/wisp')) {
        ping()
    }
    return (
        <div>
            <div class="box-error text-center">
                <h1>About This Wisp Server: </h1>
                <p style="text-align: center;">Running: {name}</p>
                <p style="text-align: center;">Version: {version}</p>
                <p style="text-align: center;" id="server-info"></p>
            </div>
        </div>
    )
}
