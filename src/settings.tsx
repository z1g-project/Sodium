// @ts-expect-error stfu
import Nav from "@components/nav"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import loadSettings, { getSettings, applyCSS } from "@components/modules/settings"
// @ts-expect-error stfu
import populateAddons from "@components/modules/addons"
import "../public/assets/css/home.css"
import "../public/assets/css/settings.css"
export function exportCSS(editor: string) {
  // @ts-expect-error stfu
  const cssContent = editor.getValue();
  const blob = new Blob([cssContent], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'custom.css';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importCSS() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'text/css';
  fileInput.addEventListener('change', function (event) {
    // @ts-expect-error stfu
    const file = event.target.files[0];
    const reader = new FileReader();
    // @ts-expect-error stfu
    reader.onload = function (e: event) {
      const importedCSS = e.target.result;
      // @ts-expect-error stfu
      editor.setValue(importedCSS);
    };
  reader.readAsText(file);
  });
  fileInput.click();
}
export default function Settings() {
  if (window.location.href.includes('/settings')) {
    loadSettings()
    getSettings()   
  }

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
            populateAddons()
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

  function applyCustomCSS() {
    const customCSS = editor.getValue();
    const styleSheets = document.getElementsByTagName('link');
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      if (styleSheet.getAttribute('id') === 'custom-css') {
        styleSheet.href = 'data:text/css;charset=utf-8,' + encodeURIComponent(customCSS);
      }
    }
    // @ts-expect-error stfu
    const notification: HTMLDivElement = document.getElementById('notification');
    notification.textContent = 'Custom Theme Applied! Refresh to see changes';
    notification.classList.remove('hidden');
    setTimeout(() => {
      notification.style.top = '40px';
    }, 10);
    setTimeout(() => {
      notification.style.top = '-50px';
      setTimeout(() => {
        notification.classList.add('hidden');
      }, 500);
    }, 3000);    
    localStorage.setItem('websiteCSS', customCSS);
  }
  // @ts-expect-error stfu
  const applyButton: HTMLButtonElement = document.getElementById('apply-button');
  if (applyButton) {
    applyButton.addEventListener('click', function () {
      applyCustomCSS();
    });
  }
  // @ts-expect-error stfu
  const importButton: HTMLButtonElement = document.getElementById('import-button');
  if (importButton) {
    importButton.addEventListener('click', function () {
      importCSS();
    });
  }
  // @ts-expect-error stfu
  const exportButton: HTMLButtonElement = document.getElementById('export-button');
  if (exportButton) {
    exportButton.addEventListener('click', function () {
      exportCSS(editor);
    });
  }

  function saveUseProxySetting(useProxy: any) {
    localStorage.setItem('useProxy', useProxy);
    console.log(`Use Proxy setting saved: ${useProxy}`);
  }

  // @ts-ignore
  const cssEditorTextarea: HTMLDivElement = document.createElement('textarea');
  cssEditorTextarea.id = 'css-editor-textarea';
  // @ts-ignore
  const elm: HTMLDivElement = document.getElementById('css-editor')
  const editor: any = cssEditorTextarea
  if (elm) {
    elm.appendChild(cssEditorTextarea);
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
              <h2 style="margin-top: 24%">Settings</h2>
              <br />
              <label for="title-input" class="config-label">Title:</label>
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
            <h2 style="margin-top: -14%">Appearance</h2>
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
            {//<div class="editor-container">
            //<div class="editor-header">
            //  <button id="import-button">Import</button>
            //  <button id="export-button">Export</button>
            //  <button id="apply-button">Apply</button>
            //</div>
            //<div id="css-editor" class="css-editor"></div>
            //</div>
            //<select id="css-select" class="config-select">
            //  <option value="assets/css/ui.css">Refreshed (Defualt)</option>
            //  <option value="assets/css/generic.css">Generic Moddable Theme</option>
            //  <option value="assets/css/amoled.css">Amoled</option>
            //  <option value="assets/css/mocha.css">Mochoa</option>
            //  <option value="assets/css/dark.css">Dark</option>
            //  <option value="assets/css/legacy.css">Legacy Dark</option>
            //  <option value="assets/css/festive.css">Festive</option>
            //  <option value="custom">Custom CSS</option>
            //</select>
            <button id="apply-css-button" style="width: 150px; margin-left: 41%; z-index: 99999;" on:click={() => {applyCSS()}}>Apply CSS</button>
            // <br />    
            //</div>
            }
            </div>
            <div class="slide" id="proxy">
            <h2 style="margin-top: -42%">Proxy</h2>
            <label for="connection-status" class="config-label">Connection Status:</label>
            <p id="connection-status">Detecting...</p>
            <label for="bare-server-select" class="config-label">Custom Bare Server (Dynamic Only):</label>
            <input type="text" id="custom-bare-server-input" placeholder="Enter a url like so: https://bare.example.com" class="config-input" />
            <div id="ping-status">Checking wisp server status...</div>
            <label for="transport-type" class="config-label">Transport</label>
            <select class="config-select" id="transport-type">
              <option value="libcurl">Libcurl (Defualt)</option>
              <option value="epoxy">Epoxy</option>
              <option value="bare">Bare Transport</option>
            </select>
            </div>
            <div class="slide" id="addons">
            <h2 style="margin-top: -90px;">Addons</h2>
            <div class="addon-controls">
              <label for="addon-category">Category:</label>
              <select id="addon-category" name="addonCategory" class="config-select">
                <option value="all">All</option>
                <option value="plugins">Plugins</option>
                <option value="themes">Themes</option>
              </select>
              <input type="text" id="addon-search" class="config-input" placeholder="Search Addons" />
              <button onclick="window.open('https://forms.gle/QcnfUxXCc3UjChaG8', '_blank');">Submit New Addon</button>
              <div class="settings-item">
                <label for="use-proxy-checkbox">Use Proxy:</label>
                <input type="checkbox" id="use-proxy-checkbox" onchange={() => {// @ts-expect-error
                  saveUseProxySetting(this.checked)}
                } />
              </div>
            </div>
            <div class="addon-grid">
            </div>
            </div>
          <Footer />
        </div>
    )    
}