import Nav from "@components/nav"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import { loadSettings } from "@components/modules/inject"
import "../public/assets/css/home.css"
export default function Settings() {
    const sections = document.querySelectorAll('.section');
    const sidebarItems = document.querySelectorAll('.sidebar li');
    sidebarItems.forEach(item => {
      item.addEventListener('click', () => {
        const sectionName = item.getAttribute('data-section');
        showSection(sectionName);
      });
    });
    function showSection(sectionName) {
      sections.forEach(section => {
        if (section.getAttribute('data-section') === sectionName) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    }
    const connectionStatusElem = document.getElementById('connection-status');
    function updateConnectionStatus() {
      connectionStatusElem.textContent = navigator.onLine ? '🟢Online' : '🔴Offline';
    }
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
    updateConnectionStatus();
    function checkServerStatus(url) {
      const startTime = performance.now();

      return fetch(url, { method: 'HEAD' })
        .then(response => {
          const endTime = performance.now();
          const ping = Math.round(endTime - startTime);

          if (response.status === 200) {
            return `🟢Online - ${ping}ms`;
          } else {
            return `🔴Offline - 0ms`;
          }
        })
      .catch(() => `🔴Offline - 0ms`);
    }

    const bareServerUrl = localStorage.getItem('bareServer') || 'https://tomp.app';
    checkServerStatus(bareServerUrl)
    .then(status => {
      const pingElement = document.getElementById('ping-status');
      if (pingElement) {
        pingElement.textContent = status;
      }
    });    
    return (
        <div>
            <Nav />
            <div id="notification" class="notification hidden">
                <p>Settings saved</p>
             </div>

            <div class="sidebar">
            <h1 style="text-align:left;">Settings</h1>
            <ul>
                <li data-section="general">General</li>
                <li data-section="appearance">Appearance</li>
                <li data-section="network">Network</li>
                <li data-section="account">Cache</li>
                <li data-section="addons">Addons</li>
            </ul>
            <div class="sidebar-buttons">
                <button id="save-button">Save Settings</button>
            <br></br>
            <br></br>
                <button class="reset-button" onclick="resetSettings();">Reset Settings</button>
            </div>
            </div>

            <div class="content">
                <div class="section active" data-section="general">
                <h2>General Settings</h2>
                <label for="title-input" class="config-label">Title:</label>
                <input type="text" id="title-input" class="config-input"></input>
                <br></br>
                <br></br>
                <label for="icon-input" class="config-label">Icon:</label>
                <input type="text" id="icon-input" class="config-input"></input>
                <br></br>
                <br></br>
                <label for="search-engine-select" class="config-label">Search Engine:</label>
                <select id="search-engine-select" class="config-select">
                    <option value="https://www.google.com/search?q=%s">Google</option>
                    <option value="https://www.bing.com/search?q=%s">Bing</option>
                    <option value="https://duckduckgo.com/?q=%s">DuckDuckGo</option>
                    <option value="https://search.yahoo.com/search?p=%s">Yahoo</option>
                    <option value="custom">Custom</option>
                </select>
                <input type="text" id="custom-search-engine-input" placeholder="Enter a URL like so: https://example.com/search?q=" class="config-input" style="display: none;"></input>
                <br></br>
                <br></br>
                <label for="emergency-switch-hotkey" class="config-label">Emergency Switch Hotkey:</label>
                <input type="text" id="emergency-switch-hotkey" class="config-input"></input>
                <br></br>
                <br></br>
                <label for="emergency-url-input" class="config-label">Emergency Switch URL:</label>
                <input type="text" id="emergency-url-input" placeholder="Enter emergency URL" class="config-input"></input>
                <br></br>
                <br></br>
                <label for="fallback-url-input" class="config-label">about:blank/blob Fallback URL:</label>
                <input type="text" id="fallback-url-input" class="config-input"></input>
                <br></br>
                <br></br>
                <label for="proxySelect" class="config-label">Default Proxy:</label>
                <select id="proxySelect" class="config-select">
                    <option value="ultraviolet">Ultraviolet (Default)</option>
                    <option value="dynamic">Dynamic (Beta)</option>
                </select>
                <br></br>
                <br></br>
                <label for="toggle-beta">Enable Tabs:</label>
                <input type="checkbox" id="toggle-beta"></input>
                <br></br>
                <br></br>
                <label for="open-new-window">Open in About:blank Tab:</label>
                <input type="checkbox" id="open-new-window"></input>
                <br></br>
                <br></br>
                <label for="open-blob-window">Open in blob Tab:</label>
                <input type="checkbox" id="open-blob-window"></input>
                <br></br>
                <br></br>
                <label for="title-randomizer">Cloak Name Randomizer:</label>
                <input type="checkbox" id="title-randomizer"></input>
                <br></br>
                <br></br>
                </div>

                <div class="section" data-section="appearance">
                <h2>Appearance Settings</h2>
                <label for="css-select" class="config-label">CSS:</label>
                <select id="css-select" class="config-select">
                    <option value="assets/css/ui.css">Refreshed (Defualt)</option>
                    <option value="assets/css/amoled.css">Amoled</option>
                    <option value="assets/css/mocha.css">Mocha</option>
                    <option value="assets/css/dark.css">Dark</option>
                    <option value="assets/css/legacy.css">Legacy Dark</option>
                    <option value="assets/css/festive.css">Festive</option>
                </select>
                <br></br>
                <br></br>
                <label class="config-label" for="meta-theme-color">Theme Color:</label>
                <input class="config-input" type="text" id="meta-theme-color" name="meta-theme-color"></input>
                <br></br>
                <br></br>
                <input type="checkbox" id="checkbox-24h"></input>
                <label for="checkbox-24h">Use 24-Hour Time</label>
                <br></br>
                <br></br>
                <input type="checkbox" id="checkbox-show-date"></input>
                <label for="checkbox-show-date">Include Date in Time Bar</label>
                <br></br>
                <br></br>
                <input type="checkbox" id="use-seconds-checkbox"></input>
                <label for="use-seconds-checkbox">Include Seconds in Time Bar</label>
                <br></br>
                <br></br>
                <input type="checkbox" id="disable-clock"></input>
                <label for="disable-clock">Disable Clock</label>
                <br></br>
                <br></br>
                <button id="apply-css-button">Apply CSS</button>
                <br></br>
                <br></br>
                <button onclick="openCSSEditor()">Open CSS Editor</button>
                </div>        

                <div class="section" data-section="network">
                  <h2>Network</h2>
                <label for="connection-status" class="config-label">Connection Status:</label>
                <p id="connection-status">Detecting...</p>
                <label for="bare-server-select" class="config-label">Custom Bare Server (Beta):</label>
                <input type="text" id="custom-bare-server-input" placeholder="Enter a url like so: https://bare.example.com" class="config-input"></input>
                <div id="ping-status">Checking server status...</div>
                </div>        

                <div class="section" data-section="account">
                  <h2>Cache Settings</h2>
                  <button onclick="clearCache()">Clear Local Storage Cache</button>
                  <input type="file" id="importFile" style="display: none;" accept=".json"></input>
                  <button onclick="openImportFile()">Import Cache</button>
                  <button onclick="exportCache()">Export Cache</button>
                  <button id="unregisterButton">Unregister Service Workers</button>
                  <button id="reregisterButton">ReRegister Service Workers</button>
                  <br></br>
                  <br></br>
                </div> 

                <div class="section" data-section="addons">
                <h2>Addons</h2>
                <div class="addon-controls">
                  <label for="addon-category">Category:</label>
                  <select id="addon-category" name="addonCategory" class="config-select">
                    <option value="all">All</option>
                    <option value="plugins">Plugins</option>
                    <option value="themes">Themes</option>
                  </select>
                  <input type="text" id="addon-search" class="config-input" placeholder="Search Addons"></input>
                  <button onclick="window.open('https://forms.gle/QcnfUxXCc3UjChaG8', '_blank');">Submit New Addon</button>
                  <div class="settings-item">
                    <label for="use-proxy-checkbox">Use Proxy:</label>
                    <input type="checkbox" id="use-proxy-checkbox" onchange="saveUseProxySetting(this.checked)"></input>
                  </div>            
                </div>
              <div class="addon-grid">
              </div>
              <script src="addons.js"></script>
                </div>
              </div>
            <Footer />
        </div>
    )    
}