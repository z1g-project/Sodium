// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import loadSettings from "@components/modules/settings"
// @ts-expect-error stfu
import search from "@components/modules/search"
// @ts-expect-error stfu
import { XOR } from "@components/modules/xor"
// @ts-expect-error stfu
import { regSW } from "@components/modules/sw"
import "../public/assets/css/home.css"
export default function Home() {
    loadSettings()
    regSW()
    window.addEventListener("DOMContentLoaded", () => {
        // @ts-expect-error stfu
        const form: HTMLFormElement = document.getElementById("uv-form");
        // @ts-expect-error stfu
        const address: HTMLInputElement = document.getElementById("uv-address");
        // @ts-expect-error stfu
        const searchEngine: HTMLInputElement = document.getElementById("uv-search-engine");
        // @ts-expect-error stfu
        const loadingOverlay: HTMLDivElement = document.getElementById("loading-overlay");
        // @ts-expect-error stfu
        const iframe: HTMLIFrameElement = document.getElementById("apploader");
        if (form) {
            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const url = search(address.value, searchEngine.value);
                // @ts-ignore
                const encodedURL = self.encoder.encode(url);
                loadingOverlay.style.display = "flex";
                iframe.style.display = "none";
                iframe.src = `${window.location.origin}/sw/${encodedURL}`;
            });
        }
        if (iframe) {
            iframe.addEventListener("unload", () => {
                iframe.style.display = "none";
                loadingOverlay.style.display = "flex";
            });
            iframe.addEventListener("load", () => {
                loadingOverlay.style.display = "none";
                iframe.style.display = "block"; 
            });
        }
    })
    return (
        <div>
            <Nav />
            <div id="changelogModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 style="font-weight: 700;">What's New</h2>
                <p class="release-date">Release Date: Feburary 4th, 2023</p>
                    <ul class="changes-list">
                        <li>Add Bare switching to UV</li>
                        <li>Refresh some older UI Elements</li>
                        <li>Fix weird radius color issue</li>
                        <li>Fix slow load times</li>
                        <li>More Minor Changes & Bug Fixes view <a style="color:white;" href="https://github.com/z1g-project/sodium">here</a></li>
                    </ul>
                    <p>Version 2.4.0 - The AliceJS Reboot</p>
                    <button class="ok-button">OK</button>
                </div>
                </div>

                <div title="Sodium Logo" class="flex-center logo-wrapper header-center">
                    <img class="logo" src="assets/img/logo.svg" alt="Sodium" />
                    <h1>Sodium</h1>
                </div>
                <div class="flex-center desc">
                    <p>Sodium is a site used for evading internet censorship</p>
                </div>
                <form id="uv-form" class="flex-center">
                    <input id="uv-search-engine" value="https://www.google.com/search?q=%s" type="hidden" />
                    <input id="uv-address" type="text" placeholder="Search the web freely" />
                </form>

                <div class="desc left-margin">
                    <p id="uv-error"></p>
                    <pre id="uv-error-code"></pre>
                </div>

                <div id="loading-overlay">
                    <div class="loading-content">
                    <img src="/assets/img/logo.svg" alt="Logo" width="125" height="125"></img>
                    <h1 class="loading-title">Sodium is loading your content!</h1>
                    <img src="assets/img/loader.svg" alt="Loading Animation" width="50" height="50"></img>
                    <p class="loading-message">Please wait...</p>
                </div>
            </div>

            <iframe id="apploader"></iframe>
            <Footer />
        </div>
    )
}
