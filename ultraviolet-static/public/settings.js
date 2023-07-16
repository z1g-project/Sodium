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

    const searchEngine = localStorage.getItem('searchEngine');
    const searchEngineSelect = document.getElementById('search-engine-select');

    if (searchEngine) {
      searchEngineSelect.value = searchEngine;
      if (searchEngine === 'custom') {
        const customSearchEngineInput = document.getElementById('custom-search-engine-input');
        customSearchEngineInput.style.display = 'block';
        customSearchEngineInput.value = localStorage.getItem('customSearchEngineUrl') || '';
      }
    }

    const betaMode = localStorage.getItem('betaMode');
    const toggleBeta = document.getElementById('toggle-beta');

    if (betaMode === 'true') {
      toggleBeta.checked = true;
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        window.location.href = '/beta.html';
        return;
      }
    } else {
      toggleBeta.checked = false;
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
      defaultStyleSheet.href = 'ui.css';
      defaultStyleSheet.id = 'custom-css';
      document.head.appendChild(defaultStyleSheet);
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

    var proxySelect = document.getElementById('proxySelect');
    var selectedOption = proxySelect.options[proxySelect.selectedIndex].value;
  
    localStorage.setItem('proxyOption', selectedOption);
    console.log('Defualt Proxy Saved:', selectedOption)

    handleToggleBeta();

    const emergencyHotkeyInput = document.getElementById('emergency-switch-hotkey');
    const emergencyHotkey = emergencyHotkeyInput.value.trim().toLowerCase();
    localStorage.setItem('emergencyHotkey', emergencyHotkey);
    console.log('Emergency hotkey saved:', emergencyHotkey);

    const emergencyURLInput = document.getElementById('emergency-url-input');
    const emergencyURL = emergencyURLInput.value.trim();
    localStorage.setItem('emergencyURL', emergencyURL);
    console.log('Emergency URL saved:', emergencyURL);

    const fallbackUrlInput = document.getElementById('fallback-url-input');
    const fallbackUrl = fallbackUrlInput.value.trim();
    localStorage.setItem('fallbackUrl', fallbackUrl);
    console.log('Fallback URL saved:', fallbackUrl);
    
    handleToggleAboutBlank();

    setTimeout(function () {
      location.reload();
    }, 100);
  }

  function handleToggleBeta() {
    const toggleBeta = document.getElementById('toggle-beta');

    if (toggleBeta.checked) {
      localStorage.setItem('betaMode', 'true');
    } else {
      localStorage.removeItem('betaMode');
    }
  }

  function handleToggleAboutBlank() {
    const toggleAboutBlank = document.getElementById('open-new-window');

    if (toggleAboutBlank.checked) {
      localStorage.setItem('openNewWindow', 'true');
    } else {
      localStorage.removeItem('openNewWindow');
    }
  }

  loadSavedSettings();

  const applyCSSButton = document.getElementById('apply-css-button');
  if (applyCSSButton) {
    applyCSSButton.addEventListener('click', function () {
      const cssSelect = document.getElementById('css-select');
      const selectedCSS = cssSelect.value;
      applyCSS(selectedCSS);

      localStorage.setItem('websiteCSS', selectedCSS);
      console.log('CSS saved:', selectedCSS);
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

  searchEngineSelect.addEventListener('change', function () {
    if (searchEngineSelect.value === 'custom') {
      customSearchEngineInput.style.display = 'block';
    } else {
      customSearchEngineInput.style.display = 'none';
    }
  });

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

  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const openNewWindow = localStorage.getItem('openNewWindow');

    if (openNewWindow === 'true') {
      const iframe = document.createElement('iframe');
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100vh';
      iframe.src = '/newtab.html';

      document.body.innerHTML = '';
      document.body.appendChild(iframe);
    } else {
      const fallbackUrl = localStorage.getItem('fallbackUrl');

      if (fallbackUrl) {
        window.location.href = fallbackUrl;
      }
    }
  }

  document.addEventListener('keydown', function (event) {
    console.log('Keydown event:', event);
    const pressedKey = event.key.toLowerCase();
    const emergencyHotkey = localStorage.getItem('emergencyHotkey');

    if (pressedKey === emergencyHotkey) {
      const emergencyURL = localStorage.getItem('emergencyURL');

      if (emergencyURL) {
        window.location.href = emergencyURL;
      }
    }
  });
})();
