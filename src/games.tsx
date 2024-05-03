// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import { AltFooter } from "@components/footer"
// @ts-expect-error stfu
import loadSettings from "@components/modules/settings"
import "../public/assets/css/home.css"
import "../public/assets/css/item-cards.css"
// @ts-expect-error stfu
import { libcurl } from "libcurl.js/bundled"
// @ts-expect-error stfu
import { XOR as xor } from "@components/modules/xor"
export default function Games() {
    if (window.location.href.includes("/games")) {
    loadSettings()
    const appscss = document.createElement('link');
    appscss.rel = 'stylesheet';
    appscss.type = 'text/css';
    appscss.href = 'assets/css/item-cards.css';
    document.head.appendChild(appscss);
    const wispSrv = `${window.location.protocol.replace("http", "ws")}//${window.location.host}/wisp/`
    libcurl.set_websocket(`${wispSrv}`)
    document.addEventListener("libcurl_load", async () => {
        console.log('Libcurl is Ready')
        getApps()
    })

    async function getApps() {
        // @ts-expect-error stfu
        const gamesContainer: HTMLDivElement = document.getElementById('games-container');
        fetch(`${window.location.origin}/assets/json/games.json`)
            .then(response => response.json())
            .then(games => {
                if (gamesContainer) {
                    gamesContainer.innerHTML = ``
                    // @ts-expect-error stfu
                    games.forEach(game => {
                        const column = document.createElement('div');
                        column.classList.add('column');
                        column.setAttribute('data-category', game.category);
                        const link = document.createElement('a');
                        if (game.category.includes('flash')) {
                            link.onclick = () => loadswf(game.url);
                        } else {
                            link.onclick = () => loadapp(game.url);
                        }
                        const image = document.createElement('img');
                        image.width = 145;
                        image.height = 145;
                        image.src = game.image;
                        const paragraph = document.createElement('p');
                        paragraph.textContent = game.name;
                        link.appendChild(image);
                        link.appendChild(paragraph);
                        column.appendChild(link);
                        gamesContainer.appendChild(column);
                    });        
                }
        })
    }

    function loadswf(value: any) {
        let url = value.trim(); 
        sessionStorage.removeItem('flashswf');
        sessionStorage.setItem('flashswf', url)
        location.href = "ruffleplayer";
    }

    function loadapp(value: any) {
        let url = value.trim();
        const proxyOption = localStorage.getItem("proxyOption");
        if (proxyOption && proxyOption.toLowerCase() === "dynamic") {
            const dynamicURL = `${window.location.origin}/service/${xor.encode(url)}`;
            sessionStorage.setItem("encodedUrl", dynamicURL);
        } else {
            if (!checkUrl(url)) {
                url = "https://www.google.com/search?q=" + url;
            } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
                url = "https://" + url;
            }
            sessionStorage.removeItem("encodedUrl");
            const encodedUrl = `${window.location.origin}/sw/${xor.encode(url)}`;
            sessionStorage.setItem("encodedUrl", encodedUrl);
        }
        location.href = "iframe";
    };
    
    function checkUrl(val = "") {
        if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) {
            return true;
        }
        return false;
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
            <h1 style="text-align: center;">Games</h1>
            <h3 style="text-align: center;">Official Games that are working and ready for use!</h3>
            <div class="input-container">
                <input class="config-input" type="text" id="gamesearch" on:input={() => {searchgames}} placeholder="Search" style="text-align: center; font-size: 16px;" />
            </div>
            <div id="games-container" class="container-apps">
                <p id="loading-thing">Loading...</p>
            </div>
            <AltFooter />
        </div>
    )
}