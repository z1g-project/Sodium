export default async function loadSettings() {
  const title = localStorage.getItem('websiteTitle');
  const favicon = localStorage.getItem('websiteIcon');
  const useRandomize = localStorage.getItem('useRandomizer')
  const css = localStorage.getItem('websiteCSS');
  const webmetaThemeColor = localStorage.getItem('metaThemeColor');
  const iconInput = document.getElementById('icon-input');
  const customCSS = localStorage.getItem('websiteCSS');
  if (title) {
    document.title = title;
  }
  const icon = localStorage.getItem('websiteIcon');
  if (icon) {
    const favicon = document.getElementById('favicon');
    if (favicon) {
      // @ts-expect-error stfu
      favicon.href = icon;
      favicon.setAttribute('type', 'image/png');
    }
  }
  if (useRandomize) {
    const titles = ['Google', 'Google Classroom', 'SchoolTube', 'Kahoot', 'Bing Images', 'Microsoft Word', 'Google Docs', 'Microsoft Excel', 'Google Account', 'about:blank', 'Google Maps', 'Google Drive', 'gmail', 'Outlook Web'];
    const favicons = ['https://www.google.com/favicon.ico', 'https://cdn.z1g-project.pages.dev/', 'https://www.microsoft.com/favicon.ico', 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png', 'https://kahoot.it/favicon.ico', 'https://www.outlook.com/owa/favicon.ico'];
    const randomTitleIndex = Math.floor(Math.random() * titles.length);
    const randomFaviconIndex = Math.floor(Math.random() * favicons.length);
    document.title = titles[randomTitleIndex];
    const faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');
    // @ts-expect-error stfu
    faviconLink.type = 'image/x-icon';
    // @ts-expect-error stfu
    faviconLink.rel = 'icon';
    // @ts-expect-error stfu
    faviconLink.href = favicons[randomFaviconIndex];
    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(faviconLink);
    console.log('Randomized!')
  }
  if (css) {
    // @ts-expect-error stfu
    applyCSS(css);
    const cssSelect = document.getElementById('css-select');
    if (cssSelect) {
      // @ts-expect-error stfu
      for (let i = 0; i < cssSelect.options.length; i++) {
        // @ts-expect-error stfu
        if (cssSelect.options[i].value === css) {
          // @ts-expect-error stfu
          cssSelect.selectedIndex = i;
          break;
        }
      }
    }
  }
  if (customCSS) {
    if (window.location.pathname.includes('css-editor.html')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'custom-css';
      styleSheet.textContent = customCSS;
      document.head.appendChild(styleSheet);
    } else {
      // @ts-expect-error stfu
      applyCSS(customCSS);
    }
  } else {
    const defaultStyleSheet = document.createElement('link');
    defaultStyleSheet.rel = 'stylesheet';
    defaultStyleSheet.href = 'assets/css/ui.css';
    defaultStyleSheet.id = 'custom-css';
    document.head.appendChild(defaultStyleSheet);
  }
  const metaThemeColor = localStorage.getItem('metaThemeColor');
  if (metaThemeColor) {
    // @ts-expect-error stfu
    document.getElementById('meta-theme-color').value = metaThemeColor;
    const metaThemeColorTag = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColorTag) {
      metaThemeColorTag.setAttribute('content', metaThemeColor);
    }
  }
  if (metaThemeColor) {
    const metaThemeColorTag = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColorTag) {
      metaThemeColorTag.setAttribute('content', metaThemeColor);
    }
  }
  console.log('%c Sodium Settings Loader ',`background: #16d495; color: white; font-weight: bold; border-radius: 5px;`, '' + 'Sodium Settings have been loaded!')
}

export async function saveSettings() {
  const titleInput = document.getElementById('title-input');
  // @ts-expect-error stfu
  const title = titleInput.value.trim();
  const iconInput = document.getElementById('icon-input');
  // @ts-expect-error stfu
  const icon = iconInput.value.trim();
  const searchEngineSelect = document.getElementById('search-engine-select');
  // @ts-expect-error stfu
  const searchEngine = searchEngineSelect.value;
  const proxySelect = document.getElementById('proxySelect');
  // @ts-expect-error stfu
  const selectedOption = proxySelect.options[proxySelect.selectedIndex].value;
  const use24HourTimeCheckbox = document.getElementById('use-24hour-checkbox');
  const blobwindow = document.getElementById('open-blob-window');
  const toggleBeta = document.getElementById('toggle-beta');
  const titlerandomizer = document.getElementById('title-randomizer');
  const emergencyHotkeyInput = document.getElementById('emergency-switch-hotkey');
  const emergencyURLInput = document.getElementById('emergency-url-input');
  const fallbackUrlInput = document.getElementById('fallback-url-input');
  const useSecondsCheckbox = document.getElementById('use-seconds-checkbox');
  const clockCheckbox = document.getElementById('disable-clock');
  // @ts-expect-error stfu
  const metaThemeColor = document.getElementById('meta-theme-color').value.trim();
  const bareServerInput = document.getElementById('custom-bare-server-input');
  // @ts-expect-error stfu
  const localforage = window.localforage

  localStorage.setItem('websiteTitle', title);
  console.log('Title saved:', title);
  localStorage.setItem('websiteIcon', icon);
  console.log('Icon saved:', icon);
  if (searchEngine === 'custom') {
    // @ts-expect-error stfu
    const customSearchUrl = document.getElementById('custom-search-engine-input').value.trim();
    if (customSearchUrl !== '') {
      localStorage.setItem('searchEngine', customSearchUrl);
      console.log('Search engine saved:', customSearchUrl);
    }
  } else {
    localStorage.setItem('searchEngine', searchEngine);
    console.log('Search engine saved:', searchEngine);
  }
  localStorage.setItem('proxyOption', selectedOption);
  console.log('Default Proxy Saved:', selectedOption);
  // @ts-expect-error stfu
  if (toggleBeta.checked) {
    localStorage.setItem('betaMode', 'true');
  } else {
    localStorage.removeItem('betaMode');
  }
  // @ts-expect-error stfu
  if (blobwindow.checked) {
    localStorage.setItem('openblobwindow', 'true');
    localStorage.setItem('usingnewtab', 'true');
  } else {
    localStorage.removeItem('openblobwindow');
    localStorage.removeItem('usingnewtab');
  }
  // @ts-expect-error stfu
  if (titlerandomizer.checked) {
    // @ts-expect-error stfu
    localStorage.setItem('useRandomizer', true);
    console.log('Use Tab Randomizer: true')
  } else {
    localStorage.removeItem('useRandomizer');
    console.log('Use Tab Randomizer: false')
  }
  if (emergencyHotkeyInput) {
    // @ts-expect-error stfu
    const emergencyHotkey = emergencyHotkeyInput.value.trim().toLowerCase();
    localStorage.setItem('emergencyHotkey', emergencyHotkey);
    console.log('Emergency hotkey saved:', emergencyHotkey);
  }
  if (emergencyURLInput) {
    // @ts-expect-error stfu
    const emergencyURL = emergencyURLInput.value.trim();
    localStorage.setItem('emergencyURL', emergencyURL);
    console.log('Emergency URL saved:', emergencyURL);
  }
  if (fallbackUrlInput) {
    // @ts-expect-error stfu
    const fallbackUrl = fallbackUrlInput.value.trim();
    localStorage.setItem('fallbackUrl', fallbackUrl);
    console.log('Fallback URL saved:', fallbackUrl);
  }
  if (bareServerInput) {
    // @ts-expect-error stfu
    const bareServer = bareServerInput.value.trim();
    caches.open('bareServerCache').then(cache => {
      cache.put('bareServerKey', new Response(bareServer));
    });

    localforage.config({
      driver: localforage.INDEXEDDB,
      name: 'Sodium',
      version: 1.0,
      storeName: 'sodium_config',
      description: 'Sodiums Config for IndexedDB'
    })
    localforage.setItem('bare', bareServer);
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
          registration.update();
          console.log("Service Workers Updated");
      }
    });
    localStorage.setItem('bareServer', bareServer);
    console.log('BareServer URL saved:', bareServer);
  }
  if (use24HourTimeCheckbox) {
    // @ts-expect-error stfu
    localStorage.setItem('use24HourTime', use24HourTimeCheckbox.checked.toString());
    // @ts-expect-error stfu
    console.log('Use 24 Hour Time Saved:', use24HourTimeCheckbox.checked);
  }
  // @ts-expect-error stfu
  if (includeDateCheckbox) {
    // @ts-expect-error stfu
    localStorage.setItem('showDate', includeDateCheckbox.checked.toString());
    // @ts-expect-error stfu
    console.log('Show Date Saved:', includeDateCheckbox.checked);
  }
  if (useSecondsCheckbox) {
    // @ts-expect-error stfu
    localStorage.setItem('useSeconds', useSecondsCheckbox.checked);
    // @ts-expect-error stfu
    console.log('Include Seconds in TimeBar:', useSecondsCheckbox.checked);
  }
  if (clockCheckbox) {
    // @ts-expect-error stfu
    localStorage.setItem('noClock', clockCheckbox.checked);
    // @ts-expect-error stfu
    console.log('Disable Clock:', clockCheckbox.checked);
  }
  if (metaThemeColor) {
    localStorage.setItem('metaThemeColor', metaThemeColor);
    console.log('Meta Theme Color:', metaThemeColor);
  }

  setTimeout(function () {
    // @ts-expect-error stfu
    const notification: HTMLElement = document.getElementById('notification');
    notification.textContent = 'Settings Saved!';
    notification.classList.remove('hidden');
  
    setTimeout(() => {
      notification.style.top = '40px';
    }, 10);
  
    setTimeout(() => {
      notification.style.top = '-50px';
      setTimeout(() => {
        notification.classList.add('hidden');
        //location.reload();
      }, 500);
    }, 3000); 
  }, 100);
}

export async function exportSettings() {
  const cacheData = {};
  Object.keys(localStorage).forEach((key) => {
    cacheData[key] = localStorage.getItem(key);
  });
  const exportedData = JSON.stringify(cacheData);
  const blob = new Blob([exportedData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sodium_settings.json';
  link.click();
  URL.revokeObjectURL(url);
}

export async function importSettings() {
  const fileInput = document.getElementById('importFile');
  // @ts-expect-error stfu
  fileInput.addEventListener('change', impSets(), false);
  // @ts-expect-error stfu
  fileInput.click();
  const impSets = () => {
    // @ts-expect-error stfu
    const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          // @ts-expect-error stfu
          const importedData = JSON.parse(e.target.result);
          Object.keys(importedData).forEach((key) => {
            localStorage.setItem(key, importedData[key]);
          });
          // @ts-expect-error stfu
          const notification: HTMLElement = document.getElementById('notification');
          notification.textContent = 'Settings Imported Successfully';
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
          location.reload();
        } catch (error) {
          alert('Error importing cache data. Please check the file format.');
        }
      };
      reader.readAsText(file);
  }
}

export async function getSettings() {
  const websiteTitleElem = document.getElementById('website-title');
  const toggleBeta = document.getElementById('toggle-beta');
  const bareServerInput = document.getElementById('custom-bare-server-input');
  const titleInput = document.getElementById('title-input');
  const emergencyHotkey = localStorage.getItem('emergencyHotkey');
  const emergencyHotkeyInput = document.getElementById('emergency-switch-hotkey');
  const proxyOption = localStorage.getItem('proxyOption');
  const proxySelect = document.getElementById('proxySelect');
  // @ts-expect-error stfu
  const options = proxySelect.options;
  const emergencyURL = localStorage.getItem('emergencyURL');
  const emergencyURLInput = document.getElementById('emergency-url-input');
  const openNewWindow = localStorage.getItem('openNewWindow');
  const toggleAboutBlank = document.getElementById('open-new-window');
  const openblobWindow = localStorage.getItem('openblobwindow');
  const toggleblobBlank = document.getElementById('open-blob-window');
  const titlerandomizerls = localStorage.getItem('useRandomizer');
  const titlerandomizer = document.getElementById('title-randomizer');
  const debugging = localStorage.getItem('debugging');
  const toggleDebugging = document.getElementById('toggle-debugging');
  const fallbackUrl = localStorage.getItem('fallbackUrl');
  const fallbackUrlInput = document.getElementById('fallback-url-input');
  const searchEngine = localStorage.getItem('searchEngine');
  const searchEngineSelect = document.getElementById('search-engine-select');
  const customSearchEngineInput = document.getElementById('custom-search-engine-input');
  const use24HourTimeCheckbox = document.getElementById('use-24hour-checkbox');
  const includeDateCheckbox = document.getElementById('include-date-checkbox');
  const useSecondsCheckbox = document.getElementById('use-seconds-checkbox');
  const clockCheckbox = document.getElementById('disable-clock');
  if (websiteTitleElem) {
    // @ts-expect-error stfu
    websiteTitleElem.textContent = title;
  }
  if (toggleBeta) {
    const betaMode = localStorage.getItem('betaMode');
    // @ts-expect-error stfu
    toggleBeta.checked = betaMode === 'true';
  }
  if (bareServerInput) {
    // @ts-expect-error stfu
    bareServerInput.value = localStorage.getItem('bareServer') || '';
  }
  // @ts-expect-error stfu
  if (titleInput && iconInput) {
    // @ts-expect-error stfu
    titleInput.value = title || '';
    // @ts-expect-error stfu
    iconInput.value = icon || '';
  }
  if (emergencyHotkey && emergencyHotkeyInput) {
    // @ts-expect-error stfu
    emergencyHotkeyInput.value = emergencyHotkey;
  }
  if (emergencyHotkeyInput) {
    emergencyHotkeyInput.addEventListener('click', function (event) {
      event.preventDefault();
      document.addEventListener('keydown', function (keyEvent) {
        keyEvent.preventDefault();
        // @ts-expect-error stfu
        emergencyHotkeyInput.value = keyEvent.key.toLowerCase();
        // @ts-expect-error stfu
        document.removeEventListener('keydown', arguments.callee);
      });
    });
  }
  if (emergencyURL && emergencyURLInput) {
    // @ts-expect-error stfu
    emergencyURLInput.value = emergencyURL;
  }
  if (toggleAboutBlank) {
    // @ts-expect-error stfu
    toggleAboutBlank.checked = openNewWindow === 'true';
  }
  if (toggleblobBlank) {
    // @ts-expect-error stfu
    toggleblobBlank.checked = openblobWindow === 'true';
  }
  if (titlerandomizer) {
    // @ts-expect-error stfu
    titlerandomizer.checked = titlerandomizerls === 'true';
  }
  if (toggleDebugging) {
    // @ts-expect-error stfu
    toggleDebugging.checked = debugging === 'true';
  }
  if (fallbackUrl && fallbackUrlInput) {
    // @ts-expect-error stfu
    fallbackUrlInput.value = fallbackUrl;
  }
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === proxyOption) {
      options[i].selected = true;
      break;
    }
  }
  if (searchEngineSelect) {
    // @ts-expect-error stfu
    searchEngineSelect.value = searchEngine;
    if (searchEngine === 'custom') {
      if (customSearchEngineInput) {
        customSearchEngineInput.style.display = 'block';
        // @ts-expect-error stfu
        customSearchEngineInput.value = localStorage.getItem('customSearchEngineUrl') || '';
      }
    }
  }
  if (use24HourTimeCheckbox) {
    const use24HourTime = localStorage.getItem('use24HourTime');
    // @ts-expect-error stfu
    use24HourTimeCheckbox.checked = use24HourTime === 'true';
  }
  if (includeDateCheckbox) {
    const includeDate = localStorage.getItem('showDate');
    // @ts-expect-error stfu
    includeDateCheckbox.checked = includeDate === 'true';
  }
  if (useSecondsCheckbox) {
    const useSeconds = localStorage.getItem('useSeconds');
    // @ts-expect-error stfu
    useSecondsCheckbox.checked = useSeconds === 'true';
  }
  if (clockCheckbox) {
    const useSeconds = localStorage.getItem('noClock');
    // @ts-expect-error stfu
    clockCheckbox.checked = useSeconds === 'true';
  }  
}

export function applyCSS() {
  console.log('applyCSS Will be deprecated soon. This is simply a placeholder for the rewrite')
  const styleSheets = document.getElementsByTagName('link');
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      if (styleSheet.getAttribute('id') === 'custom-css') {
        // @ts-expect-error stfu
        styleSheet.href = selectedCSS;
      }
    }
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
      saveButton.addEventListener('click', function () {
        saveSettings();
      });
    }
}
