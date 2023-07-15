(function () {
  // Function to load and apply the saved settings
  function loadSavedSettings() {
    // Load and set the title
    const title = localStorage.getItem('websiteTitle');
    if (title) {
      document.title = title;
      const websiteTitleElem = document.getElementById('website-title');
      if (websiteTitleElem) {
        websiteTitleElem.textContent = title;
      }
    }

    // Load and set the icon
    const icon = localStorage.getItem('websiteIcon');
    if (icon) {
      const favicon = document.getElementById('favicon');
      if (favicon) {
        favicon.href = icon;
        favicon.setAttribute('type', 'image/png');
      }
    }

    // Load and apply the CSS
    const css = localStorage.getItem('websiteCSS');
    if (css) {
      applyCSS(css);

      // Set the selected option in the CSS dropdown
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
      // Check if the current page URL is "/"
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        // Load the "/beta.html" page instead
        window.location.href = '/beta.html';
        return;
      }
    } else {
      toggleBeta.checked = false;
    }

    // Load and set the website title and icon inputs
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

    // Add event listener to capture the emergency hotkey
    if (emergencyHotkeyInput) {
      emergencyHotkeyInput.addEventListener('click', function (event) {
        event.preventDefault();

        // Capture the key press event
        document.addEventListener('keydown', function (keyEvent) {
          // Prevent the default behavior of the key press event
          keyEvent.preventDefault();

          // Update the input field value with the selected key
          emergencyHotkeyInput.value = keyEvent.key.toLowerCase();

          // Remove the event listener after capturing the key press
          document.removeEventListener('keydown', arguments.callee);
        });
      });
    }

    // Load and set the emergency URL
    const emergencyURL = localStorage.getItem('emergencyURL');
    const emergencyURLInput = document.getElementById('emergency-url-input');
    if (emergencyURL && emergencyURLInput) {
      emergencyURLInput.value = emergencyURL;
    }

    // Check if about:blank mode is enabled
    const openNewWindow = localStorage.getItem('openNewWindow');
    const toggleAboutBlank = document.getElementById('open-new-window');
    if (toggleAboutBlank) {
      toggleAboutBlank.checked = openNewWindow === 'true';
    }

    // Check the debugging checkbox
    const debugging = localStorage.getItem('debugging');
    const toggleDebugging = document.getElementById('toggle-debugging');
    if (toggleDebugging) {
      toggleDebugging.checked = debugging === 'true';
    }

    // Check if fallback URL is set and apply it
    const fallbackUrl = localStorage.getItem('fallbackUrl');
    if (fallbackUrl && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
      localStorage.removeItem('fallbackUrl');
      window.location.href = fallbackUrl;
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

  // Function to save the settings
  function saveSettings() {
    // Save the title
    const titleInput = document.getElementById('title-input');
    const title = titleInput.value.trim();
    localStorage.setItem('websiteTitle', title);
    console.log('Title saved:', title);

    // Save the icon
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

    // Save the beta mode state
    handleToggleBeta();

    // Save the emergency hotkey
    const emergencyHotkeyInput = document.getElementById('emergency-switch-hotkey');
    const emergencyHotkey = emergencyHotkeyInput.value.trim().toLowerCase();
    localStorage.setItem('emergencyHotkey', emergencyHotkey);
    console.log('Emergency hotkey saved:', emergencyHotkey);

    // Save the emergency URL
    const emergencyURLInput = document.getElementById('emergency-url-input');
    const emergencyURL = emergencyURLInput.value.trim();
    localStorage.setItem('emergencyURL', emergencyURL);
    console.log('Emergency URL saved:', emergencyURL);

    handleToggleAboutBlank();

    //handleToggleDebugging();

    const fallbackUrlInput = document.getElementById('fallback-url-input');
    const fallbackUrl = fallbackUrlInput.value.trim();
    if (fallbackUrl) {
      localStorage.setItem('fallbackUrl', fallbackUrl);
      console.log('Fallback URL saved:', fallbackUrl);
    }

    setTimeout(function () {
      location.reload();
    }, 100);
  }

  function handleToggleBeta() {
    const toggleBeta = document.getElementById('toggle-beta');

    if (toggleBeta.checked) {
      // Set the state in localStorage to indicate that beta mode is enabled
      localStorage.setItem('betaMode', 'true');
    } else {
      // Remove the state from localStorage
      localStorage.removeItem('betaMode');
    }
  }

  function handleToggleAboutBlank() {
    const toggleAboutBlank = document.getElementById('open-new-window');

    if (toggleAboutBlank.checked) {
      // Set the state in localStorage to indicate about:blank mode
      localStorage.setItem('openNewWindow', 'true');
    } else {
      // Remove the state from localStorage
      localStorage.removeItem('openNewWindow');
    }
  }

  function handleToggleDebugging() {
    const toggleDebugging = document.getElementById('toggle-debugging');

    if (toggleDebugging.checked) {
      // Set the state in localStorage to indicate debugging mode
      localStorage.setItem('debugging', 'true');
    } else {
      // Remove the state from localStorage
      localStorage.removeItem('debugging');
    }
  }

  // Load the saved settings when the script is executed
  loadSavedSettings();

  const applyCSSButton = document.getElementById('apply-css-button');
  if (applyCSSButton) {
    applyCSSButton.addEventListener('click', function () {
      const cssSelect = document.getElementById('css-select');
      const selectedCSS = cssSelect.value;
      applyCSS(selectedCSS);

      // Save the selected CSS in localStorage
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

  // Event listeners for custom search engine input
  const searchEngineSelect = document.getElementById('search-engine-select');
  const customSearchEngineInput = document.getElementById('custom-search-engine-input');

  searchEngineSelect.addEventListener('change', function () {
    if (searchEngineSelect.value === 'custom') {
      customSearchEngineInput.style.display = 'block';
    } else {
      customSearchEngineInput.style.display = 'none';
    }
  });

  // Event listener for "Open in about:blank Window" checkbox
  const toggleAboutBlank = document.getElementById('open-new-window');
  if (toggleAboutBlank) {
    toggleAboutBlank.addEventListener('change', function () {
      handleToggleAboutBlank();
    });
  }

  // Event listener for "Debugging" checkbox
  const toggleDebugging = document.getElementById('toggle-debugging');
  if (toggleDebugging) {
    toggleDebugging.addEventListener('change', function () {
      handleToggleDebugging();
    });
  }

  // Execute code on visiting /
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
        localStorage.removeItem('fallbackUrl');
        window.location.href = fallbackUrl;
      }
    }
  }

  // Add an event listener to detect keydown events
  document.addEventListener('keydown', function (event) {
    console.log('Keydown event:', event); // Added console.log statement
    const pressedKey = event.key.toLowerCase();
    const emergencyHotkey = localStorage.getItem('emergencyHotkey');

    // Check if the pressed key matches the saved emergency hotkey
    if (pressedKey === emergencyHotkey) {
      // Retrieve the emergency URL
      const emergencyURL = localStorage.getItem('emergencyURL');

      // Redirect to the emergency URL
      if (emergencyURL) {
        window.location.href = emergencyURL;
      }
    }
  });
})();
