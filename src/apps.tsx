// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import loadSettings from "@components/modules/settings"
import "../public/assets/css/home.css"
import "../public/assets/css/item-cards.css"
// @ts-expect-error stfu
import { libcurl } from "libcurl.js/bundled"
export default function Apps() {
    loadSettings()
    const wispSrv = `${window.location.protocol.replace("http", "ws")}//${window.location.host}/wisp/`
    libcurl.set_websocket(`${wispSrv}`)
    console.log(libcurl)
    document.addEventListener("libcurl_load", async () => {
        console.log('Libcurl is Ready')
        getApps()
    })

    async function getApps() {
        //if (window.location.origin.includes('.pages.dev')) {
        //    const wispSrv = `wss://tomp.app/wisp/`
        //    libcurl.set_websocket(`${wispSrv}`)
        //} else {
            
        //}
        // @ts-expect-error stfu
        const appsContainer: HTMLElement = document.getElementById("apps-container");
        try {
            const apps = await libcurl.fetch("https://api.z1g.top/api/apps").then((req: any) => req.json()).catch((err: any) => {
                console.error(err)
                console.log(apps)
                return null;
            });
            if (!apps) {
                appsContainer.innerHTML = "<p>Failed to load apps</p>";
                return;
            }
            apps.forEach(async (app: any) => {
                const column = document.createElement("div");
                column.classList.add("column");
                const a = document.createElement("a");
                a.onclick = () => loadapp(app.url);
                const img = document.createElement("img");
                const image = await libcurl.fetch(app.icon).then((req: any) => req.blob()).then((blob: any) => URL.createObjectURL(blob));
                img.src = image;
                img.width = 150;
                img.height = 75;
                const p = document.createElement("p");
                p.textContent = app.name;
                a.appendChild(img);
                a.appendChild(p);
                column.appendChild(a);
                appsContainer.appendChild(column);
            });
        } catch (err) {
            console.error(err);
            appsContainer.innerHTML = "<p>Failed to load apps</p>";
        }
    }

    function loadapp(value: any) {
        let url = value.trim();
        const proxyOption = localStorage.getItem("proxyOption");
        if (proxyOption && proxyOption.toLowerCase() === "dynamic") {
            // @ts-expect-error stfu
            const dynamicURL = `${window.location.origin}/service/${Ultraviolet.codec.xor.encode(url)}`;
            sessionStorage.setItem("appUrl", dynamicURL);
        } else {
            if (!checkUrl(url)) {
                url = "https://www.google.com/search?q=" + url;
            } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
                url = "https://" + url;
            }
            sessionStorage.removeItem("appUrl");
            // @ts-expect-error stfu
            const encodedUrl = `${window.location.origin}/sw/${Ultraviolet.codec.xor.encode(url)}`;
            sessionStorage.setItem("appUrl", encodedUrl);
        }
        location.href = "appframe";
    };
    
    function checkUrl(val = "") {
        if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) {
            return true;
        }
        return false;
    }
    if (navigator.onLine) {
        navigator.serviceWorker.register('acache.js')
        .then((registration) => {
            console.log('Game/Asset Cache Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Error registering Service Worker:', error);
        });
    } else {
        console.warn('Your Offline: Using existing Cache')
    }
    return (
        <div>
            <Nav />
            <h1 style="text-align: center;">Apps</h1>
            <h3 style="text-align: center;">Official Apps that are working and ready for use!</h3>

            <div class="input-container">
                <input class="config-input" type="text" id="gamesearch" onkeyup="searchgames()" placeholder="Search" style="text-align: center;font-size: 16px;"></input>
                <select class="config-select" id="category" name="category" onchange="showImages()" style="font-size: 16px;">
                    <option value="general">General</option>
                    <option value="media">Media</option>
                    <option value="social">Social</option>
                    <option value="cloud">Cloud</option>
                </select>
            </div>

            <div id="apps-container"></div>
            <Footer />
        </div>
    )
}