// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import runUtils from "@components/modules/utils"
export default function Iframe() {
    if (window.location.href.includes('/iframe')) {
        const cssthing = document.createElement("link")
        cssthing.href = "/assets/css/frames.css"
        cssthing.type = "stylesheet"
        const ing = document.createElement("script")
        ing.src = "/injectify/bundle.js"
        const ingcfg = document.createElement("script")
        ingcfg.src = "/injectify/config.js"
        document.head.appendChild(ingcfg)
        document.head.appendChild(cssthing)
        window.addEventListener('DOMContentLoaded', () => {
            runUtils('encodedUrl')
            // @ts-expect-error stfu
            const loadingOverlay: HTMLDivElement = document.getElementById("loading-overlay");
            loadingOverlay.style.display = "flex"
            // @ts-expect-error stfu
            const iframe: HTMLIFrameElement = document.getElementById('apploader')
            // @ts-expect-error stfu
            iframe.src = sessionStorage.getItem('encodedUrl')
            document.head.appendChild(ing)
        })
    }
    return (
        <div>
            <Nav />
            <div id="loading-overlay">
                <div class="loading-content">
                    <img src="/assets/img/logo.svg" alt="Logo" width="125" height="125" />
                    <h1 class="loading-title">Sodium is loading your content!</h1>
                    <img src="/assets/img/loader.svg" alt="Loading Animation" width="50" height="50" />
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
