// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
export default function Notfound() {
    return (
        <div>
            <Nav />
            <div class="box-error text-center">
                <h1>404 Error</h1>
                <p style="text-align: center;">The requested file was not found on this server!</p>
                <div style="text-align: center;">
                    <button id="uv-register-sw" onclick={() => {window.location.href = "/"}}>Back to Home</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
