
// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import runUtils from "@components/modules/utils"
export default function StealthLoader() {
    if (window.location.href.includes('/stealth')) {
        const cssthing = document.createElement("link")
        cssthing.href = "/assets/css/frames.css"
        cssthing.type = "stylesheet"
        document.head.appendChild(cssthing)
        window.addEventListener('DOMContentLoaded', () => {
            runUtils('stealthurl')
            // @ts-expect-error stfu
            const loadingOverlay: HTMLDivElement = document.getElementById("loading-overlay");
            loadingOverlay.style.display = "flex"
        })
    }
    return (
        <div>
            <Nav />
            <div id="loading-overlay">
                <div class="loading-content">
                    <img src="sodium.png" alt="Logo" width="125" height="125" />
                    <h1 class="loading-title">Sodium is loading your content!</h1>
                    <img src="assets/img/loader.svg" alt="Loading Animation" width="50" height="50" />
                    <p class="loading-message">Please wait...</p>
                </div>
            </div>
            <div class="show-iframe">
                <iframe id="apploader"></iframe>
            </div>
            <Footer />
        </div>
    )
}
