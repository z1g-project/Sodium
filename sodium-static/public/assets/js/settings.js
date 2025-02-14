(function () {
  function loadSavedSettings() {
    const title = localStorage.getItem('websiteTitle');
    if (title) {
      document.title = title;
      const websiteTitleElem = document.getElementById('website-title');
      if (websiteTitleElem) {
        websiteTitleElem.textContent = title;
      }
    }

    const icon = localStorage.getItem('websiteIcon');
    if (icon) {
      const favicon = document.getElementById('favicon');
      if (favicon) {
        favicon.href = icon;
        favicon.setAttribute('type', 'image/png');
      }
    }

    const useRandomize = localStorage.getItem('useRandomizer')
    if (useRandomize) {
      const titles = ['Google', 'Google Classroom', 'SchoolTube', 'Kahoot', 'Bing Images', 'Microsoft Word', 'Google Docs', 'Microsoft Excel', 'Google Account', 'about:blank', 'Google Maps', 'Google Drive', 'gmail', 'Outlook Web'];
      const favicons = ['https://www.google.com/favicon.ico', 'https://cdn.z1g-project.pages.dev/', 'https://www.microsoft.com/favicon.ico', 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png', 'https://kahoot.it/favicon.ico', 'https://www.outlook.com/owa/favicon.ico'];
      const randomTitleIndex = Math.floor(Math.random() * titles.length);
      const randomFaviconIndex = Math.floor(Math.random() * favicons.length);
      document.title = titles[randomTitleIndex];
      const faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');
      faviconLink.type = 'image/x-icon';
      faviconLink.rel = 'icon';
      faviconLink.href = favicons[randomFaviconIndex];
      const head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(faviconLink);
      console.log('Randomized!')
    }

    const css = localStorage.getItem('websiteCSS');
    if (css) {
      applyCSS(css);

      const cssSelect = document.getElementById('css-select');
      if (cssSelect) {
        for (let i = 0; i < cssSelect.options.length; i++) {
          if (cssSelect.options[i].value === css) {
            cssSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    if (window.location.pathname.includes('/settings/') || window.location.pathname.includes('/welcome.html')) {
      const searchEngine = localStorage.getItem('searchEngine');
      const searchEngineSelect = document.getElementById('search-engine-select');

      if (searchEngineSelect) {
        searchEngineSelect.value = searchEngine;
        if (searchEngine === 'custom') {
          const customSearchEngineInput = document.getElementById('custom-search-engine-input');
          if (customSearchEngineInput) {
            customSearchEngineInput.style.display = 'block';
            customSearchEngineInput.value = localStorage.getItem('customSearchEngineUrl') || '';
          }
        }
      }

      const bareServerInput = document.getElementById('custom-bare-server-input');
      if (bareServerInput) {
        bareServerInput.value = localStorage.getItem('wispServer') || '';
      }
      
      const toggleBeta = document.getElementById('toggle-beta');
      if (toggleBeta) {
        const betaMode = localStorage.getItem('betaMode');
        toggleBeta.checked = betaMode === 'true';
      }

      const titleInput = document.getElementById('title-input');
      const iconInput = document.getElementById('icon-input');
      if (titleInput && iconInput) {
        titleInput.value = title || '';
        iconInput.value = icon || '';
      }

      const emergencyHotkey = localStorage.getItem('emergencyHotkey');
      const emergencyHotkeyInput = document.getElementById('emergency-switch-hotkey');
      if (emergencyHotkey && emergencyHotkeyInput) {
        emergencyHotkeyInput.value = emergencyHotkey;
      }

      if (emergencyHotkeyInput) {
        emergencyHotkeyInput.addEventListener('click', function (event) {
          event.preventDefault();

          document.addEventListener('keydown', function (keyEvent) {
            keyEvent.preventDefault();

            emergencyHotkeyInput.value = keyEvent.key.toLowerCase();

            document.removeEventListener('keydown', arguments.callee);
          });
        });
      }   

      const emergencyURL = localStorage.getItem('emergencyURL');
      const emergencyURLInput = document.getElementById('emergency-url-input');
      if (emergencyURL && emergencyURLInput) {
        emergencyURLInput.value = emergencyURL;
      }

      const openNewWindow = localStorage.getItem('openNewWindow');
      const toggleAboutBlank = document.getElementById('open-new-window');
      if (toggleAboutBlank) {
        toggleAboutBlank.checked = openNewWindow === 'true';
      }

      const openblobWindow = localStorage.getItem('openblobwindow');
      const toggleblobBlank = document.getElementById('open-blob-window');
      if (toggleblobBlank) {
        toggleblobBlank.checked = openblobWindow === 'true';
      }

      const titlerandomizerls = localStorage.getItem('useRandomizer');
      const titlerandomizer = document.getElementById('title-randomizer');
      if (titlerandomizer) {
        titlerandomizer.checked = titlerandomizerls === 'true';
      }

      const debugging = localStorage.getItem('debugging');
      const toggleDebugging = document.getElementById('toggle-debugging');
      if (toggleDebugging) {
        toggleDebugging.checked = debugging === 'true';
      }

      const fallbackUrl = localStorage.getItem('fallbackUrl');
      const fallbackUrlInput = document.getElementById('fallback-url-input');
      if (fallbackUrl && fallbackUrlInput) {
        fallbackUrlInput.value = fallbackUrl;
      }

      const proxyOption = localStorage.getItem('proxyOption');
      const proxySelect = document.getElementById('proxySelect');
      const options = proxySelect.options;

      for (let i = 0; i < options.length; i++) {
        if (options[i].value === proxyOption) {
          options[i].selected = true;
          break;
        }
      }
    }

    const customCSS = localStorage.getItem('websiteCSS');
    if (customCSS) {
      if (window.location.pathname.includes('css-editor.html')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'custom-css';
        styleSheet.textContent = customCSS;
        document.head.appendChild(styleSheet);
      } else {
        applyCSS(customCSS);
      }
    } else {
      const defaultStyleSheet = document.createElement('link');
      defaultStyleSheet.rel = 'stylesheet';
      defaultStyleSheet.href = 'assets/css/ui.css';
      defaultStyleSheet.id = 'custom-css';
      document.head.appendChild(defaultStyleSheet);
    }

    const use24HourTimeCheckbox = document.getElementById('use-24hour-checkbox');
    if (use24HourTimeCheckbox) {
      const use24HourTime = localStorage.getItem('use24HourTime');
      use24HourTimeCheckbox.checked = use24HourTime === 'true';
    }

    const includeDateCheckbox = document.getElementById('include-date-checkbox');
    if (includeDateCheckbox) {
      const includeDate = localStorage.getItem('showDate');
      includeDateCheckbox.checked = includeDate === 'true';
    }

    const useSecondsCheckbox = document.getElementById('use-seconds-checkbox');
    if (useSecondsCheckbox) {
      const useSeconds = localStorage.getItem('useSeconds');
      useSecondsCheckbox.checked = useSeconds === 'true';
    }

    const clockCheckbox = document.getElementById('disable-clock');
    if (clockCheckbox) {
      const useSeconds = localStorage.getItem('noClock');
      clockCheckbox.checked = useSeconds === 'true';
    }

    if (window.location.pathname.includes('/settings/')) {
      const metaThemeColor = localStorage.getItem('metaThemeColor');
      if (metaThemeColor) {
        document.getElementById('meta-theme-color').value = metaThemeColor;
        const metaThemeColorTag = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColorTag) {
          metaThemeColorTag.setAttribute('content', metaThemeColor);
        }
      }
    }

    const metaThemeColor = localStorage.getItem('metaThemeColor');
    if (metaThemeColor) {
      const metaThemeColorTag = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColorTag) {
        metaThemeColorTag.setAttribute('content', metaThemeColor);
      }
    }
  }

  function applyCSS(selectedCSS) {
    const styleSheets = document.getElementsByTagName('link');

    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      if (styleSheet.getAttribute('id') === 'custom-css') {
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

  function saveSettings() {
    const titleInput = document.getElementById('title-input');
    const title = titleInput.value.trim();
    localStorage.setItem('websiteTitle', title);
    console.log('Title saved:', title);

    const iconInput = document.getElementById('icon-input');
    const icon = iconInput.value.trim();
    localStorage.setItem('websiteIcon', icon);
    console.log('Icon saved:', icon);

    const searchEngineSelect = document.getElementById('search-engine-select');
    const searchEngine = searchEngineSelect.value;

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

    let proxySelect = document.getElementById('proxySelect');
    let selectedOption = proxySelect.options[proxySelect.selectedIndex].value;

    localStorage.setItem('proxyOption', selectedOption);
    console.log('Default Proxy Saved:', selectedOption);

    const toggleBeta = document.getElementById('toggle-beta');

    if (toggleBeta.checked) {
      localStorage.setItem('betaMode', 'true');
    } else {
      localStorage.removeItem('betaMode');
    }
    
    const blobwindow = document.getElementById('open-blob-window');
    if (blobwindow.checked) {
      localStorage.setItem('openblobwindow', 'true');
      localStorage.setItem('usingnewtab', 'true');
    } else {
      localStorage.removeItem('openblobwindow');
      localStorage.removeItem('usingnewtab');
    }

    const titlerandomizer = document.getElementById('title-randomizer');
    if (titlerandomizer.checked) {
      localStorage.setItem('useRandomizer', true);
      console.log('Use Tab Randomizer: true')
    } else {
      localStorage.removeItem('useRandomizer');
      console.log('Use Tab Randomizer: false')
    }

    const emergencyHotkeyInput = document.getElementById('emergency-switch-hotkey');
    if (emergencyHotkeyInput) {
      const emergencyHotkey = emergencyHotkeyInput.value.trim().toLowerCase();
      localStorage.setItem('emergencyHotkey', emergencyHotkey);
      console.log('Emergency hotkey saved:', emergencyHotkey);
    }

    const emergencyURLInput = document.getElementById('emergency-url-input');
    if (emergencyURLInput) {
      const emergencyURL = emergencyURLInput.value.trim();
      localStorage.setItem('emergencyURL', emergencyURL);
      console.log('Emergency URL saved:', emergencyURL);
    }

    const fallbackUrlInput = document.getElementById('fallback-url-input');
    if (fallbackUrlInput) {
      const fallbackUrl = fallbackUrlInput.value.trim();
      localStorage.setItem('fallbackUrl', fallbackUrl);
      console.log('Fallback URL saved:', fallbackUrl);
    }

    const bareServerInput = document.getElementById('custom-bare-server-input');
    if (bareServerInput) {
      const bareServer = bareServerInput.value.trim();
      localStorage.setItem('wispServer', bareServer);
      console.log('BareServer URL saved:', bareServer);

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
           if (registration.active && registration.active.scriptURL.includes('sjw.js')) {
            registration.unregister().then(() => {
              navigator.serviceWorker.register('/sjw.js', {
                scope: '/service',
              }).then(async () => {
                const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
                const wispServer = localStorage.getItem('wispServer') || "wss://terbiumon.top/wisp/"
                const scramjet = new window.ScramjetController({
                  prefix: "/service/",
                  files: {
                      wasm: "/sj/wasm.js",
                      worker: "/sj/worker.js",
                      client: "/sj/client.js",
                      shared: "/sj/shared.js",
                      sync: "/sj/sync.js",
                  },
                  defaultFlags: {
                      serviceworker: true,
                      rewriterLogs: false,
                  },
                  codec: {
                      encode: `
                          if (!url) return Promise.resolve(url);
                          let result = "";
                        let len = url.length;
                            for (let i = 0; i < len; i++) {
                                const char = url[i];
                                result += i % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char;
                              }
                        return encodeURIComponent(result);
                      `,
                      decode: `
                          if (!url) return Promise.resolve(url);
                        url = decodeURIComponent(url);
                        let result = "";
                        let len = url.length;
                        for (let i = 0; i < len; i++) {
                            const char = url[i];
                            result += i % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char;
                        }
                      return result;
                      `,
                  }
                });
                scramjet.init()
                await connection.setTransport("/epx/index.mjs", [{ wisp: wispServer }]);
              });
                console.log('Scramjet service worker re-registered.');
              });
            }
          }
        });
      }
    }

    const use24HourTimeCheckbox = document.getElementById('use-24hour-checkbox');
    if (use24HourTimeCheckbox) {
      localStorage.setItem('use24HourTime', use24HourTimeCheckbox.checked.toString());
      console.log('Use 24 Hour Time Saved:', use24HourTimeCheckbox.checked);
    }

    const includeDateCheckbox = document.getElementById('include-date-checkbox');
    if (includeDateCheckbox) {
      localStorage.setItem('showDate', includeDateCheckbox.checked.toString());
      console.log('Show Date Saved:', includeDateCheckbox.checked);
    }

    const useSecondsCheckbox = document.getElementById('use-seconds-checkbox');
    if (useSecondsCheckbox) {
      localStorage.setItem('useSeconds', useSecondsCheckbox.checked);
      console.log('Include Seconds in TimeBar:', useSecondsCheckbox.checked);
    }

    const clockCheckbox = document.getElementById('disable-clock');
    if (clockCheckbox) {
      localStorage.setItem('noClock', clockCheckbox.checked);
      console.log('Disable Clock:', clockCheckbox.checked);
    }
  
    const metaThemeColor = document.getElementById('meta-theme-color').value.trim();
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

  function handleToggleAboutBlank() {
    const toggleAboutBlank = document.getElementById('open-new-window');

    if (toggleAboutBlank.checked) {
      localStorage.setItem('openNewWindow', 'true');
      localStorage.setItem('usingnewtab', 'true');
    } else {
      localStorage.removeItem('openNewWindow');
      localStorage.removeItem('usingnewtab');
    }
  }

  loadSavedSettings();

  const applyCSSButton = document.getElementById('apply-css-button');
  if (applyCSSButton) {
    applyCSSButton.addEventListener('click', function () {
      document.body.classList.add('fade-out');
      setTimeout(() => {
        const cssSelect = document.getElementById('css-select');
        const selectedCSS = cssSelect.value;
        applyCSS(selectedCSS);
  
        localStorage.setItem('websiteCSS', selectedCSS);
        console.log('CSS saved:', selectedCSS);
      }, 10);
  
      setTimeout(() => {
        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');
      }, 10);
    });
  }

  const saveButton = document.getElementById('save-button');
  if (saveButton) {
    saveButton.addEventListener('click', function () {
      saveSettings();
    });
  }

  const searchEngineSelect = document.getElementById('search-engine-select');
  const customSearchEngineInput = document.getElementById('custom-search-engine-input');

  if (searchEngineSelect && customSearchEngineInput) {
    searchEngineSelect.addEventListener('change', function () {
      if (searchEngineSelect.value === 'custom') {
        customSearchEngineInput.style.display = 'block';
      } else {
        customSearchEngineInput.style.display = 'none';
      }
    });
  }

  const toggleAboutBlank = document.getElementById('open-new-window');
  if (toggleAboutBlank) {
    toggleAboutBlank.addEventListener('change', function () {
      handleToggleAboutBlank(); 
    });
  }

  const toggleDebugging = document.getElementById('toggle-debugging');
  if (toggleDebugging) {
    toggleDebugging.addEventListener('change', function () {
      handleToggleDebugging();
    });
  }

})();
