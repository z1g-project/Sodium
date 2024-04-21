// @ts-expect-error stfu
import Nav from "@components/nav"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import { loadSettings } from "@components/modules/inject"
import "../public/assets/css/home.css"
import "../public/assets/css/settings.css"
export default function Settings() {
    return (
        <div>
            <Nav />
            <div id="notification" class="notification hidden">
              <p>Settings saved</p>
            </div>
            <div class="topnav">
              <h1 class="nav-header">Settings</h1>
              <div class="nav-item active">
                <p>General</p>
              </div>
              <div class="nav-item">
                <p>Appearence</p>
              </div>
              <div class="nav-item">
                <p>Proxy</p>
              </div>
              <div class="nav-item">
                <p>Addons</p>
              </div>
            </div>
            <div class="slide loaded">
              <h2>Settings</h2>
              <br />
              <label style="margin-top: 50px;" for="title-input" class="config-label">Title:</label>
              <input type="text" id="title-input" class="config-input" />
              <br />
              <label for="icon-input" class="config-label">Icon:</label>
              <input type="text" id="icon-input" class="config-input" />
              <br />
              <label for="search-engine-select" class="config-label">Search Engine:</label>
              <select id="search-engine-select" class="config-select">
                <option value="https://www.google.com/search?q=%s">Google</option>
                <option value="https://www.bing.com/search?q=%s">Bing</option>
                <option value="https://duckduckgo.com/?q=%s">DuckDuckGo</option>
                <option value="https://search.yahoo.com/search?p=%s">Yahoo</option>
                <option value="custom">Custom</option>
              </select>
              <input type="text" id="custom-search-engine-input" placeholder="Enter a URL like so: https://example.com/search?q=" class="config-input" style="display: none;" />
              <br />
              <label for="emergency-switch-hotkey" class="config-label">Emergency Switch Hotkey:</label>
              <input type="text" id="emergency-switch-hotkey" class="config-input" />
              <br />
              <label for="emergency-url-input" class="config-label">Emergency Switch URL:</label>
              <input type="text" id="emergency-url-input" placeholder="Enter emergency URL" class="config-input" />
              <br />
              <label for="fallback-url-input" class="config-label">about:blank/blob Fallback URL:</label>
              <input type="text" id="fallback-url-input" class="config-input" />
              <br />
              <label for="proxySelect" class="config-label">Default Proxy:</label>
              <select id="proxySelect" class="config-select">
                <option value="ultraviolet">Ultraviolet (Default)</option>
                <option value="dynamic">Dynamic (Beta)</option>
              </select>
              <br />
              <label for="toggle-beta">Enable Tabs:</label>
                <input type="checkbox" id="toggle-beta" />
                <br />
                <label for="open-new-window">Open in About:blank Tab:</label>
                <input type="checkbox" id="open-new-window" />
                <br />
                <label for="open-blob-window">Open in blob Tab:</label>
                <input type="checkbox" id="open-blob-window"></input>
                <br />
                <label for="title-randomizer">Cloak Name Randomizer:</label>
                <input type="checkbox" id="title-randomizer" />
                <br />
            </div>
          <Footer />
        </div>
    )    
}