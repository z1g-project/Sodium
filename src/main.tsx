// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import loadSettings from "@components/modules/settings"
import "../public/assets/css/home.css"
import { Route } from "dreamland-router"; 
import Notfound from "./404";
import Settings from "./settings";
import Apps from "./apps";
export default function Home() {
    loadSettings()
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
                    <p>Version 2.0.0 - The 2024 Refresh</p>
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
                    <img src="sodium.png" alt="Logo" width="125" height="125"></img>
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

export const router = (
    <Route path="/">
        <Route path="" show={<Home />} />
        <Route path="apps" show={<Apps />} />
        <Route regex path=".*" show={<Notfound />} />
    </Route>
).$
  
router.render(document.querySelector('.app'));