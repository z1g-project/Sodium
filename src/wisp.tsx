// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
import { version, name } from "wisp-server-node/package.json"
export default function WispBG() {
    return (
        <div>
            <Nav />
            <div class="box-error text-center">
                <h1>About This Wisp Server: </h1>
                <p style="text-align: center;">Running: {name}</p>
                <p style="text-align: center;">Version: {version}</p>
                <p style="text-align: center;">If you see this from Ultraviolet, Than the Backends Wisp Server is up and working or if your static hosting and you see this, Ignore it.</p>
            </div>
            <Footer />
        </div>
    )
}
