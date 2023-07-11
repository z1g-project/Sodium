(function() {
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
    }

    const searchEngine = localStorage.getItem("searchEngine");
    const searchEngineSelect = document.getElementById("search-engine-select");

    if (searchEngine) {
      searchEngineSelect.value = searchEngine;
    }

    const bareServer = localStorage.getItem("bareServer");
    const bareServerSelect = document.getElementById("bare-server-select");

    if (bareServer) {
      bareServerSelect.value = bareServer;
    }

    // Load and set the website title and icon inputs
    const titleInput = document.getElementById('title-input');
    const iconInput = document.getElementById('icon-input');
    if (titleInput && iconInput) {
      titleInput.value = title || '';
      iconInput.value = icon || '';
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
    const titleInput = document.getElementById("title-input");
    const title = titleInput.value.trim();
    localStorage.setItem("websiteTitle", title);
    console.log("Title saved:", title);

    // Save the icon
    const iconInput = document.getElementById("icon-input");
    const icon = iconInput.value.trim();
    localStorage.setItem("websiteIcon", icon);
    console.log("Icon saved:", icon);

    const searchEngineSelect = document.getElementById("search-engine-select");
    const searchEngine = searchEngineSelect.value;

    if (searchEngine === "custom") {
      const customSearchUrl = document.getElementById("custom-search-engine-input").value.trim();

      if (customSearchUrl !== "") {
        localStorage.setItem("searchEngine", customSearchUrl);
        console.log("Search engine saved:", customSearchUrl);
      }
    } else {
      localStorage.setItem("searchEngine", searchEngine);
      console.log("Search engine saved:", searchEngine);
    }

    const bareServerSelect = document.getElementById("bare-server-select");
    const bareServer = bareServerSelect.value;

    if (bareServer === "custom") {
      const customBareServerUrl = document.getElementById("custom-bare-server-input").value.trim();

      if (customBareServerUrl !== "") {
        localStorage.setItem("bareServer", customBareServerUrl);
        console.log("Bare server saved:", customBareServerUrl);
      }
    } else {
      localStorage.setItem("bareServer", bareServer);
      console.log("Bare server saved:", bareServer);
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
    });
  }

  const saveButton = document.getElementById('save-button');
  if (saveButton) {
    saveButton.addEventListener('click', function () {
      saveSettings();
    });
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

  // Event listener for the "Toggle about:blank" checkbox
  const toggleAboutBlank = document.getElementById('open-new-window');
  if (toggleAboutBlank) {
    toggleAboutBlank.addEventListener('change', function () {
      handleToggleAboutBlank();
    });
  }

  // Event listeners for custom search engine and custom bare server inputs
  const searchEngineSelect = document.getElementById('search-engine-select');
  const customSearchEngineInput = document.getElementById('custom-search-engine-input');

  searchEngineSelect.addEventListener('change', function () {
    if (searchEngineSelect.value === 'custom') {
      customSearchEngineInput.style.display = 'block';
    } else {
      customSearchEngineInput.style.display = 'none';
    }
  });

  const bareServerSelect = document.getElementById('bare-server-select');
  const customBareServerInput = document.getElementById('custom-bare-server-input');

  bareServerSelect.addEventListener('change', function () {
    if (bareServerSelect.value === 'custom') {
      customBareServerInput.style.display = 'block';
    } else {
      customBareServerInput.style.display = 'none';
    }
  });

})();
