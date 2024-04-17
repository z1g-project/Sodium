// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import loadSettings from "@components/modules/settings"
import "../public/assets/css/home.css"
export default function Apps() {
    loadSettings()
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

            <div class="container-apps">

            </div>
            <Footer />
        </div>
    )
}