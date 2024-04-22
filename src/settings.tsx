// @ts-expect-error stfu
import Nav from "@components/nav"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import loadSettings, { getSettings, applyCSS } from "@components/modules/settings"
import "../public/assets/css/home.css"
import "../public/assets/css/settings.css"
export default function Settings() {
  loadSettings()
  getSettings()

  function switchSlide(slide: string) {
    const currentSlide: HTMLDivElement | null = document.querySelector('.loaded');
    const current: HTMLDivElement | null = document.querySelector('.active');
    if (currentSlide) {
        currentSlide.classList.remove('loaded');
    }
    if (current) {
        current.classList.remove('active');
    }
    console.log(slide);
    if (slide === 'General') {
        // @ts-expect-error stfu
        const slideElement: HTMLDivElement | null = document.getElementById('general');
        if (slideElement) {
            slideElement.classList.add('loaded');
            console.log('slide: general');
        }
        // @ts-expect-error stfu
        const selected: HTMLDivElement | null = document.getElementById('general-tab');
        if (selected) {
          selected.classList.add('active');
        }
    } else if (slide === 'Appearance') {
        // @ts-expect-error stfu
        const slideElement: HTMLDivElement | null = document.getElementById('appearance');
        if (slideElement) {
            slideElement.classList.add('loaded');
            console.log('slide: appearance');
        }
        // @ts-expect-error stfu
        const selected: HTMLDivElement | null = document.getElementById('appearance-tab');
        if (selected) {
          selected.classList.add('active');
        }
    } else if (slide === 'Proxy') {
        // @ts-expect-error stfu
        const slideElement: HTMLDivElement | null = document.getElementById('proxy');
        if (slideElement) {
            slideElement.classList.add('loaded');
            console.log('slide: proxy');
        }
        // @ts-expect-error stfu
        const selected: HTMLDivElement | null = document.getElementById('proxy-tab');
        if (selected) {
          selected.classList.add('active');
        }
    } else if (slide === 'Addons') {
        // @ts-expect-error stfu
        const slideElement: HTMLDivElement | null = document.getElementById('addons');
        if (slideElement) {
            slideElement.classList.add('loaded');
            console.log('slide: addons');
        }
        // @ts-expect-error stfu
        const selected: HTMLDivElement | null = document.getElementById('addons-tab');
        if (selected) {
          selected.classList.add('active');
        }
    } else {
        console.error("Invalid slide:", slide);
    }
  }
    return (
        <div>
            <Nav />
            <div id="notification" class="notification hidden">
              <p>Settings saved</p>
            </div>
            <div class="topnav">
              <h1 class="nav-header">Settings</h1>
              <div class="nav-item active" id="general-tab" on:click={() => {switchSlide('General')}}>
                <p>General</p>
              </div>
              <div class="nav-item" id="appearance-tab" on:click={() => {switchSlide('Appearance')}}>
                <p>Appearance</p>
              </div>
              <div class="nav-item" id="proxy-tab" on:click={() => {switchSlide('Proxy')}}>
                <p>Proxy</p>
              </div>
              <div class="nav-item" id="addons-tab" on:click={() => {switchSlide('Addons')}}>
                <p>Addons</p>
              </div>
            </div>
            <div class="slide loaded" id="general">
              <h2 style="margin-top: 160px;">Settings</h2>
              <br />
              <label style="margin-top: -25px;" for="title-input" class="config-label">Title:</label>
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
            <div class="slide" id="appearance">
            <h2 style="margin-top: -90px;">Appearance</h2>
            <label for="css-select" class="config-label">CSS:</label>
            <select id="css-select" class="config-select">
              <option value="assets/css/ui.css">Refreshed (Defualt)</option>
              <option value="assets/css/amoled.css">Amoled</option>
              <option value="assets/css/mocha.css">Mocha</option>
              <option value="assets/css/dark.css">Dark</option>
              <option value="assets/css/legacy.css">Legacy Dark</option>
              <option value="assets/css/festive.css">Festive</option>
            </select>
            <br />
            <label class="config-label" for="meta-theme-color">Theme Color:</label>
            <input class="config-input" type="text" id="meta-theme-color" name="meta-theme-color" />
            <br />
            <input type="checkbox" id="checkbox-24h" />
            <label for="checkbox-24h">Use 24-Hour Time</label>
            <br />
            <input type="checkbox" id="checkbox-show-date" />
            <label for="checkbox-show-date">Include Date in Time Bar</label>
            <br />
            <input type="checkbox" id="use-seconds-checkbox" />
            <label for="use-seconds-checkbox">Include Seconds in Time Bar</label>
            <br />
            <input type="checkbox" id="disable-clock" />
            <label for="disable-clock">Disable Clock</label>
            <br />
            <button id="apply-css-button" style="width: 150px; margin-left: 41%;" on:click={() => {applyCSS()}}>Apply CSS</button>
            <br />    
            </div>
          <Footer />
        </div>
    )    
}