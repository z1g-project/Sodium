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

  // Load and set the search engine
  const searchEngine = localStorage.getItem('searchEngine');
  if (searchEngine) {
    const searchEngineSelect = document.getElementById('search-engine-select');
    if (searchEngineSelect) {
      searchEngineSelect.value = searchEngine;
    }
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

function saveWebsiteSettings() {
  const titleInput = document.getElementById('title-input');
  const iconInput = document.getElementById('icon-input');

  const title = titleInput.value;
  const icon = iconInput.value;

  const toggleBeta = document.getElementById('toggle-beta');
  const betaMode = toggleBeta.checked;

  // Save the settings in localStorage
  localStorage.setItem('websiteTitle', title);
  localStorage.setItem('websiteIcon', icon);
  localStorage.setItem('betaMode', betaMode ? 'true' : 'false');

  // Apply the saved settings
  document.title = title;
  const websiteTitleElem = document.getElementById('website-title');
  if (websiteTitleElem) {
    websiteTitleElem.textContent = title;
  }
  const favicon = document.getElementById('favicon');
  if (favicon) {
    favicon.href = icon;
    favicon.setAttribute('type', 'image/png');
  }

  console.log('Settings saved:');
  console.log('Title:', title);
  console.log('Icon:', icon);
  console.log('Beta Mode:', betaMode);
}

// Load the saved settings when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  loadSavedSettings();
});

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
    saveWebsiteSettings();
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