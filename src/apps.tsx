// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import { AltFooter } from "@components/footer"
// @ts-expect-error stfu
import loadSettings from "@components/modules/settings"
import "../public/assets/css/home.css"
import "../public/assets/css/item-cards.css"
// @ts-expect-error stfu
import { fetch as bfetch } from "@components/modules/fetch";
// @ts-expect-error stfu
import { XOR as xor } from "@components/modules/xor"
export default function Apps() {
    if (window.location.href.includes("/apps")) {
    loadSettings()
    const appscss = document.createElement('link');
    appscss.rel = 'stylesheet';
    appscss.type = 'text/css';
    appscss.href = 'assets/css/item-cards.css';
    document.head.appendChild(appscss);
    async function getApps() {
        // @ts-expect-error stfu
        const appsContainer: HTMLElement = document.getElementById("apps-container");
        try {
            const appsResponse = await bfetch("https://api.z1g.top/api/apps");
            console.log(appsResponse.data)
            if (!appsResponse || appsResponse.status !== "success") {
                if (appsContainer) {
                    appsContainer.innerHTML = "<p>Failed to load apps</p>";
                }
                return;
            }
            const apps = appsResponse.data;
            console.log(apps)
            if (appsContainer) {
                appsContainer.innerHTML = "";
                apps.forEach(async (app: any) => {
                    console.log(app)
                    const column = document.createElement("div");
                    column.classList.add("column");
                    const a = document.createElement("a");
                    a.onclick = () => loadapp(app.url);
                    const img = document.createElement("img");
                    const image = await bfetch(app.icon).then((blob: any) => URL.createObjectURL(blob));
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
            }
        } catch (err) {
            console.warn(err);
            if (appsContainer) {
                appsContainer.innerHTML = "<p>Failed to load apps</p>";
            }
        }
    }
    console.log('run')
    getApps()

    function loadapp(value: any) {
        let url = value.trim();
        const proxyOption = localStorage.getItem("proxyOption");
        if (proxyOption && proxyOption.toLowerCase() === "meteor") {
            // @ts-expect-error stfu
            const dynamicURL = `${window.location.origin}/service/${self.encoder.encode(url)}`;
            sessionStorage.setItem("appUrl", dynamicURL);
        } else {
            if (!checkUrl(url)) {
                url = "https://www.google.com/search?q=" + url;
            } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
                url = "https://" + url;
            }
            sessionStorage.removeItem("appUrl");
            // @ts-expect-error stfu
            const encodedUrl = `${window.location.origin}/sw/${self.encoder.encode(url)}`;
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

    function searchgames() {
        let input: any = document.getElementById("gamesearch");
        let filter = input.value.toLowerCase();
        let games = document.getElementsByClassName("column");
        for (let i = 0; i < games.length; i++) {
            let game = games[i];
            // @ts-expect-error stfu
            let name = game.getElementsByTagName("p")[0].textContent.toLowerCase();
            if (name.includes(filter)) {
                // @ts-expect-error stfu
                game.style.display = "block";
            } else {
                // @ts-expect-error stfu
                game.style.display = "none";
            }
        }
    }
    }
    return (
        <div>
            <Nav />
            <h1 style="text-align: center;">Apps</h1>
            <h3 style="text-align: center;">Official Apps that are working and ready for use!</h3>
            <div class="input-container">
                <input class="config-input" type="text" id="gamesearch" on:input={() => {searchgames}} placeholder="Search" style="text-align: center; font-size: 16px;" />
            </div>
            <div id="apps-container" class="container-apps">
                <p id="loading-thing">Loading...</p>
            </div>
            <AltFooter />
        </div>
    )
}