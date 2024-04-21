// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import { regSW } from "@components/modules/sw"
export default function NoSW() {
    return (
        <div>
            <Nav />
            <div class="box-error text-center">
                <h1>Service Worker Error</h1>
                <p style="text-align: center;">For whatever reason, The service worker seems to not have registered properly. Try refreshing or click the button bellow to fix it.</p>
                <div style="text-align: center;">
                    <button id="uv-register-sw" on:click={() => {regSW()}} value="Register service worker">Register Serviceworkers</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
