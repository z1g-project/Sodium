export default async function loadSettings() {
   
}

export async function saveSettings() {
    
}

export async function exportSettings() {
    
}

export async function importSettings() {
    
}

export async function getSettings() {
    const titleInput = document.getElementById('title-input');
    const title = titleInput.value.trim();
    const iconInput = document.getElementById('icon-input');
    const icon = iconInput.value.trim();
    const searchEngineSelect = document.getElementById('search-engine-select');
    const searchEngine = searchEngineSelect.value;
    const proxySelect = document.getElementById('proxySelect');
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
    const metaThemeColor = document.getElementById('meta-theme-color').value.trim();
    const bareServerInput = document.getElementById('custom-bare-server-input');

    localStorage.setItem('websiteTitle', title);
    console.log('Title saved:', title);
    localStorage.setItem('websiteIcon', icon);
    console.log('Icon saved:', icon);
    if (searchEngine === 'custom') {
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
    if (toggleBeta.checked) {
      localStorage.setItem('betaMode', 'true');
    } else {
      localStorage.removeItem('betaMode');
    }
    if (blobwindow.checked) {
      localStorage.setItem('openblobwindow', 'true');
      localStorage.setItem('usingnewtab', 'true');
    } else {
      localStorage.removeItem('openblobwindow');
      localStorage.removeItem('usingnewtab');
    }
    if (titlerandomizer.checked) {
      localStorage.setItem('useRandomizer', true);
      console.log('Use Tab Randomizer: true')
    } else {
      localStorage.removeItem('useRandomizer');
      console.log('Use Tab Randomizer: false')
    }
    if (emergencyHotkeyInput) {
      const emergencyHotkey = emergencyHotkeyInput.value.trim().toLowerCase();
      localStorage.setItem('emergencyHotkey', emergencyHotkey);
      console.log('Emergency hotkey saved:', emergencyHotkey);
    }
    if (emergencyURLInput) {
      const emergencyURL = emergencyURLInput.value.trim();
      localStorage.setItem('emergencyURL', emergencyURL);
      console.log('Emergency URL saved:', emergencyURL);
    }
    if (fallbackUrlInput) {
      const fallbackUrl = fallbackUrlInput.value.trim();
      localStorage.setItem('fallbackUrl', fallbackUrl);
      console.log('Fallback URL saved:', fallbackUrl);
    }
    if (bareServerInput) {
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
      localStorage.setItem('use24HourTime', use24HourTimeCheckbox.checked.toString());
      console.log('Use 24 Hour Time Saved:', use24HourTimeCheckbox.checked);
    }
    if (includeDateCheckbox) {
      localStorage.setItem('showDate', includeDateCheckbox.checked.toString());
      console.log('Show Date Saved:', includeDateCheckbox.checked);
    }
    if (useSecondsCheckbox) {
      localStorage.setItem('useSeconds', useSecondsCheckbox.checked);
      console.log('Include Seconds in TimeBar:', useSecondsCheckbox.checked);
    }
    if (clockCheckbox) {
      localStorage.setItem('noClock', clockCheckbox.checked);
      console.log('Disable Clock:', clockCheckbox.checked);
    }
    if (metaThemeColor) {
      localStorage.setItem('metaThemeColor', metaThemeColor);
      console.log('Meta Theme Color:', metaThemeColor);
    }

    setTimeout(function () {
      const notification = document.getElementById('notification');
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
